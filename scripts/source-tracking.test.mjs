import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const code = ts.transpileModule(readFileSync(new URL('../src/lib/source-tracking.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const saved = { referrer: 'chatgpt.com', referrerPath: '/', utmSource: '', utmMedium: '', utmCampaign: '', landingPage: '/es/custom/running-caps', firstVisit: '2026-10-01T00:00:00.000Z' };
function browser({ local = null, cookie = '', blockedLocal = false, blockedCookie = false, referrer = 'https://chatgpt.com/', search = '', pathname = '/' } = {}) {
  let stored = local, cookies = cookie;
  const document = { referrer };
  Object.defineProperty(document, 'cookie', {
    get() { if (blockedCookie) throw Error('cookie denied'); return cookies; },
    set(value) { if (blockedCookie) throw Error('cookie denied'); cookies = value.split(';')[0]; },
  });
  const window = { location: { search, pathname }, localStorage: {
    getItem() { if (blockedLocal) throw Error('storage denied'); return stored; },
    setItem(key, value) { if (blockedLocal) throw Error('storage denied'); stored = value; },
  } };
  const context = { exports: {}, window, document, URL, URLSearchParams };
  vm.runInNewContext(code, context);
  return { api: context.exports, window, document, local: () => stored, cookie: () => cookies };
}
const json = (value) => JSON.parse(JSON.stringify(value));

test('external first touch, UTM and landing survive cross-page and all four languages', () => {
  const b = browser({ search: '?utm_source=chatgpt.com&utm_medium=referral&utm_campaign=caps', pathname: '/custom/running-caps' });
  b.api.captureFirstTouchSource();
  const first = json(b.api.readStoredSource());
  assert.equal(first.referrer, 'chatgpt.com');
  assert.equal(first.utmSource, 'chatgpt.com');
  assert.equal(first.utmMedium, 'referral');
  assert.equal(first.utmCampaign, 'caps');
  assert.equal(first.landingPage, '/custom/running-caps');
  for (const path of ['/contact', '/es/contact', '/fr/contact', '/de/contact', '/?home=a', '/?home=b']) {
    b.window.location = { search: '', pathname: path };
    b.document.referrer = 'https://nancrown.com/';
    b.api.captureFirstTouchSource();
    assert.deepEqual(json(b.api.readStoredSource()), first);
  }
});
test('blocked localStorage preserves pre-existing cookie on later page', () => {
  const b = browser({ blockedLocal: true, cookie: `nc_src=${encodeURIComponent(JSON.stringify(saved))}`, referrer: 'https://nancrown.com/es', pathname: '/fr/contact' });
  b.api.captureFirstTouchSource();
  assert.deepEqual(json(b.api.readStoredSource()), saved);
  assert.equal(decodeURIComponent(b.cookie().split('=')[1]), JSON.stringify(saved));
});
test('corrupt local storage falls back to valid cookie and repairs local', () => {
  for (const local of ['broken', '{}', '[]', JSON.stringify({ ...saved, referrer: 42 })]) {
    const b = browser({ local, cookie: `nc_src=${encodeURIComponent(JSON.stringify(saved))}` });
    b.api.captureFirstTouchSource();
    assert.deepEqual(json(b.api.readStoredSource()), saved);
    assert.deepEqual(JSON.parse(b.local()), saved);
  }
});
test('corrupt cookies and blocked cookie access never throw or stop capture', () => {
  for (const options of [{ cookie: 'nc_src=%E0%A4%A' }, { blockedCookie: true }]) {
    const b = browser(options);
    assert.doesNotThrow(() => b.api.captureFirstTouchSource());
    assert.equal(b.api.readStoredSource().referrer, 'chatgpt.com');
  }
});
test('all persistent storage blocked: memory retains first touch through client navigation', () => {
  const b = browser({ blockedLocal: true, blockedCookie: true, pathname: '/de', search: '?utm_source=chatgpt.com' });
  b.api.captureFirstTouchSource();
  b.window.location = { pathname: '/de/contact', search: '' };
  b.document.referrer = 'https://nancrown.com/de';
  b.api.captureFirstTouchSource();
  assert.equal(b.api.readStoredSource().landingPage, '/de');
  assert.equal(b.api.readStoredSource().utmSource, 'chatgpt.com');
});
test('new tab/document can recover shared local or cookie; full reload without storage cannot', () => {
  const b = browser(); b.api.captureFirstTouchSource();
  for (const options of [{ local: b.local() }, { cookie: b.cookie() }]) {
    const tab = browser({ ...options, referrer: 'https://nancrown.com/', pathname: '/contact' });
    tab.api.captureFirstTouchSource();
    assert.deepEqual(json(tab.api.readStoredSource()), json(b.api.readStoredSource()));
  }
  const empty = browser({ blockedLocal: true, blockedCookie: true, referrer: 'https://nancrown.com/', pathname: '/contact' });
  empty.api.captureFirstTouchSource();
  assert.equal(empty.api.readStoredSource().referrer, '');
});
test('ChatGPT without referrer uses UTM if supplied, otherwise remains unknown; own subdomains ignored', () => {
  const b = browser({ referrer: '', search: '?utm_source=chatgpt.com' }); b.api.captureFirstTouchSource();
  assert.equal(b.api.classifySource('', '', b.api.readStoredSource().utmSource).label, 'ChatGPT');
  for (const referrer of ['', 'https://www.nancrown.com/es', 'https://shop.nancrown.com/']) {
    const b = browser({ referrer }); b.api.captureFirstTouchSource();
    assert.equal(b.api.readStoredSource().referrer, '');
    assert.equal(b.api.classifySource('', '', '').label, 'Direct / unknown');
  }
});
test('submit-time capture recovers when tracker has not run; server import has no browser effects', () => {
  const b = browser();
  assert.equal(b.api.readStoredSource(), null);
  b.api.captureFirstTouchSource();
  assert.equal(b.api.readStoredSource().referrer, 'chatgpt.com');
  const server = { exports: {} }; vm.runInNewContext(code, server);
  assert.doesNotThrow(() => server.exports.captureFirstTouchSource());
  assert.equal(server.exports.readStoredSource(), null);
});

test('optional A/B cookie cannot stop form submission when blocked or malformed', () => {
  const source = readFileSync(new URL('../src/app/[locale]/contact/ContactForm.tsx', import.meta.url), 'utf8');
  const ast = ts.createSourceFile('ContactForm.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const fn = ast.statements.find((n) => ts.isFunctionDeclaration(n) && n.name?.text === 'readHomeVariantCookie');
  assert.ok(fn);
  const js = ts.transpileModule(fn.getText(ast), { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
  for (const cookie of ['nc_home=%E0%A4%A', 'nc_home=b', null]) {
    const document = {};
    Object.defineProperty(document, 'cookie', { get() { if (cookie === null) throw Error('denied'); return cookie; } });
    const context = { document, HOME_AB_COOKIE: 'nc_home' };
    vm.runInNewContext(js, context);
    assert.equal(context.readHomeVariantCookie(), cookie === 'nc_home=b' ? 'b' : undefined);
  }
});
