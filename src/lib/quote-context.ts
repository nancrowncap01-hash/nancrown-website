export type QuoteProduct = { slug: string; name: string; code?: string; category: string };
export const productOptionByCategory: Record<string, string> = {
  "Baseball Caps": "baseball", "Trucker Hats": "trucker", "Bucket Hats": "bucket",
  Visors: "visor", "Camp Caps": "camp", "Running Caps": "running",
  "Cadet Caps": "cadet", "Outdoor Caps": "outdoor", "Winter Hats": "winter",
};

export const quoteCopy = {
  en: {
    selected: "Style reference", running: "Running caps", dad: "Dad hats", club: "Run club",
    prompt: "Please describe the colours, quantities and changes you would like.",
    targetDate: "Target arrival date (optional)", purpose: "Intended use (optional)",
    purposeHint: "For example: club training, race day or retail",
    dateHint: "Your requested date is a planning target, not a confirmed delivery promise.",
    draftHint: "Inquiry details are kept in this tab for up to 24 hours. Name, email and company fields, and attached files, are not saved. Reattach files after reopening or refreshing.",
    clearDraft: "Clear form and saved text", details: "Additional requirements",
  },
  es: {
    selected: "Modelo de referencia", running: "Gorras de running", dad: "Gorras dad hat", club: "Club de running",
    prompt: "Indica los colores, las cantidades y los cambios que necesitas.",
    targetDate: "Fecha de llegada deseada (opcional)", purpose: "Uso previsto (opcional)",
    purposeHint: "Por ejemplo: entrenamientos, competición o venta",
    dateHint: "La fecha solicitada sirve para planificar; no es una promesa de entrega confirmada.",
    draftHint: "Los detalles de la consulta se guardan en esta pestaña hasta 24 horas. No se guardan los campos de nombre, email y empresa ni los archivos. Vuelve a adjuntar los archivos al reabrir o actualizar.",
    clearDraft: "Borrar formulario y texto guardado", details: "Requisitos adicionales",
  },
  fr: {
    selected: "Modèle de référence", running: "Casquettes de running", dad: "Casquettes dad hat", club: "Club de course",
    prompt: "Précisez les couleurs, les quantités et les modifications souhaitées.",
    targetDate: "Date d’arrivée souhaitée (facultatif)", purpose: "Usage prévu (facultatif)",
    purposeHint: "Exemple : entraînement, course ou vente en boutique",
    dateHint: "La date souhaitée sert à la planification ; elle ne constitue pas un engagement de livraison confirmé.",
    draftHint: "Les détails de la demande sont conservés dans cet onglet pendant 24 heures maximum. Les champs nom, e-mail et société, ainsi que les fichiers, ne sont pas enregistrés. Joignez à nouveau les fichiers après réouverture ou actualisation.",
    clearDraft: "Effacer le formulaire et le texte enregistré", details: "Exigences complémentaires",
  },
  de: {
    selected: "Modellreferenz", running: "Laufcaps", dad: "Dad Hats", club: "Laufverein",
    prompt: "Bitte nennen Sie die gewünschten Farben, Mengen und Änderungen.",
    targetDate: "Gewünschter Ankunftstermin (optional)", purpose: "Verwendungszweck (optional)",
    purposeHint: "Zum Beispiel: Vereinstraining, Wettkampf oder Einzelhandel",
    dateHint: "Der Wunschtermin dient der Planung und ist keine bestätigte Lieferzusage.",
    draftHint: "Anfragedetails bleiben bis zu 24 Stunden in diesem Tab gespeichert. Die Felder Name, E-Mail und Firma sowie Dateien werden nicht gespeichert. Dateien nach erneutem Öffnen oder Aktualisieren bitte erneut anhängen.",
    clearDraft: "Formular und gespeicherten Text löschen", details: "Zusätzliche Anforderungen",
  },
} as const;

export function getQuoteCopy(locale: string) {
  return quoteCopy[locale as keyof typeof quoteCopy] ?? quoteCopy.en;
}

// Only references in the current catalogue and the two linked categories are accepted.
// Arbitrary query text (including names, HTML, URLs and quantities) is never copied.
export function resolveQuoteContext(search: string, products: QuoteProduct[], locale: string) {
  const params = new URLSearchParams(search);
  const copy = getQuoteCopy(locale);
  const product = products.find((p) => p.slug === params.get("product"));
  if (product) {
    const name = product.code ? `${product.name} (${product.code})` : product.name;
    return {
      key: `product:${product.slug}`, product: productOptionByCategory[product.category] ?? "other",
      message: `${copy.selected}: ${name}\nhttps://nancrown.com${locale === "en" ? "" : `/${locale}`}/products/${product.slug}\n\n${copy.prompt}`,
      purpose: "",
    };
  }
  const category = params.get("category");
  if (category === "running-caps" || category === "dad-hats") {
    const club = category === "running-caps" && params.get("use") === "run-club";
    const label = category === "running-caps" ? copy.running : copy.dad;
    return {
      key: `category:${category}${club ? ":run-club" : ""}`,
      product: category === "running-caps" ? "running" : "baseball",
      message: `${copy.selected}: ${label}\n\n${copy.prompt}`,
      purpose: club ? copy.club : "",
    };
  }
  return { key: "direct", product: "", message: "", purpose: "" };
}

export const DRAFT_FIELDS = ["country", "product", "quantity", "message", "foundVia", "targetDate", "purpose"] as const;
export const DRAFT_TTL = 24 * 60 * 60 * 1000;
export type QuoteDraft = { savedAt: number; values: Partial<Record<(typeof DRAFT_FIELDS)[number], string>> };
export function readQuoteDraft(raw: string | null, now: number): QuoteDraft | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (!Number.isFinite(data.savedAt) || now < data.savedAt || now - data.savedAt > DRAFT_TTL || !data.values || typeof data.values !== "object") return null;
    const values: QuoteDraft["values"] = {};
    for (const key of DRAFT_FIELDS) {
      if (typeof data.values[key] === "string") values[key] = data.values[key].slice(0, key === "message" ? 18000 : 500);
    }
    return { savedAt: data.savedAt, values };
  } catch { return null; }
}

export function appendQuoteRequirements(message: string, date: string, purpose: string, locale: string) {
  const copy = getQuoteCopy(locale);
  const rows = [];
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) rows.push(`${copy.targetDate}: ${date}`);
  if (purpose.trim()) rows.push(`${copy.purpose}: ${purpose.trim().slice(0, 300)}`);
  return rows.length ? `${message}\n\n${copy.details}\n${rows.join("\n")}` : message;
}
