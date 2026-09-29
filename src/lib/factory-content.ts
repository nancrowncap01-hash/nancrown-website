// 「车间实拍」独立页面 /factory 的四语言文案数据源
// 目标:用 2023 年拍摄的真实车间视频 + 8 张实拍照片,证明 NanCrown 有自己的车间、不是纯贸易商
//
// 🔴 文案一字不改照抄自 /private/tmp/claude-501/.../scratchpad/batch4/copy_factory_winter.md 的「A. 车间页 /factory」段落
// (主脑写,不许润色/加句子/自己编 alt 文字)

import type { Locale } from "@/i18n/routing";

export interface FactoryStep {
  title: string;
  text: string;
}

export interface FactoryLocaleContent {
  metaTitle: string; // 已自带 "| NanCrown" 后缀,generateMetadata 里要用 absolute:true,不能再让全局模板拼一次
  metaDescription: string;
  h1: string;
  lead: string;
  videoCaption: string;
  stepsHeading: string;
  steps: FactoryStep[]; // 5 条,来自文案 step1Title/step1Text ... step5Title/step5Text
  photosHeading: string;
  photos: string[]; // 8 条说明文字,来自文案 photo1...photo8,顺序对应下面 factoryPhotoFiles 的顺序
  inhouseHeading: string;
  inhouseText: string;
  liveHeading: string;
  liveText: string;
  ctaQuote: string;
  ctaPricing: string;
  videoName: string;
  videoDescription: string;
}

// 视频/封面的固定信息(跟语言无关)
export const factoryVideo = {
  src: "/videos/nancrown-workshop-2023.mp4",
  poster: "/images/factory/workshop-poster-2023.jpg",
  // 时长:73.24 秒,JSON-LD 用 ISO 8601 "PT1M13S",sitemap videos 字段用秒数(number)73
  durationIso: "PT1M13S",
  durationSeconds: 73,
  uploadDate: "2026-09-30",
};

// 8 张照片的文件名,顺序固定,和四语言 content.photos[i] 一一对应
export const factoryPhotoFiles = [
  "workshop-fabric-inspection.jpg",
  "workshop-die-cutting-press.jpg",
  "workshop-sewing.jpg",
  "workshop-steam-shaping.jpg",
  "workshop-snap-press.jpg",
  "workshop-cartons-ready.jpg",
  "workshop-packed-orders.jpg",
  "workshop-loading.jpg",
];

export const factoryContent: Record<Locale, FactoryLocaleContent> = {
  en: {
    metaTitle: "Inside Our Cap Workshop: Real Factory Video | NanCrown",
    metaDescription:
      "73 seconds inside NanCrown's cap workshop: fabric inspection, die cutting, sewing, steam shaping and packing. Real footage from our own workshop.",
    h1: "Inside our workshop",
    lead: "Real footage from our cap workshop, filmed in 2023: fabric inspection, die cutting, sewing, steam shaping and packing. There is no stock footage and nothing is rendered. We cut every shot that showed a customer's logo.",
    videoCaption: "73 seconds, no sound. Filmed in our workshop in 2023.",
    stepsHeading: "What you see in the video",
    steps: [
      {
        title: "Fabric inspection",
        text: "Fabric runs over an inspection machine with a light table before it is cut, so flaws are caught before they become panels.",
      },
      {
        title: "Die cutting",
        text: "Panels and brims are cut on a cutting press with steel dies, so every panel in a size comes out the same.",
      },
      {
        title: "Sewing",
        text: "Crowns, taping, sweatbands and brims are stitched together on our sewing floor.",
      },
      {
        title: "Steam shaping",
        text: "Finished caps are shaped on heated moulds so the crown holds its curve.",
      },
      {
        title: "Checking and packing",
        text: "Caps are checked, bagged and packed into export cartons.",
      },
    ],
    photosHeading: "Photos from the floor",
    photos: [
      "Fabric inspection before cutting",
      "Die cutting panels on the cutting press",
      "Stitching on the sewing floor",
      "Steam shaping a finished cap",
      "Snap and button press",
      "Cartons ready for shipping",
      "Packed orders waiting for pickup",
      "Loading an order for the forwarder",
    ],
    inhouseHeading: "What we do ourselves",
    inhouseText:
      "Pattern making, cutting, sewing, shaping and packing happen in our own workshop. Embroidery, printing and washing are done by partner workshops we have worked with for years, and every batch is checked when it comes back to us.",
    liveHeading: "See your own order",
    liveText:
      "We do live video calls of the workshop on request, so you can see your caps on the line. Third-party inspection is welcome before the balance is paid.",
    ctaQuote: "Get a quote",
    ctaPricing: "See prices and lead times",
    videoName: "Inside NanCrown's cap workshop",
    videoDescription:
      "Real footage from NanCrown's cap workshop, filmed in 2023: fabric inspection, die cutting, sewing, steam shaping and packing.",
  },
  es: {
    metaTitle: "Dentro de nuestro taller de gorras: vídeo real | NanCrown",
    metaDescription:
      "73 segundos dentro del taller de gorras de NanCrown: revisión de tela, corte con troquel, costura, planchado a vapor y embalaje. Imágenes reales.",
    h1: "Dentro de nuestro taller",
    lead: "Imágenes reales de nuestro taller de gorras, grabadas en 2023: revisión de tela, corte con troquel, costura, planchado a vapor y embalaje. No hay imágenes de archivo ni nada generado por ordenador. Quitamos todas las tomas en las que se veía el logo de un cliente.",
    videoCaption: "73 segundos, sin sonido. Grabado en nuestro taller en 2023.",
    stepsHeading: "Qué se ve en el vídeo",
    steps: [
      {
        title: "Revisión de tela",
        text: "La tela pasa por una máquina de revisión con mesa de luz antes del corte, para detectar defectos antes de que se conviertan en paneles.",
      },
      {
        title: "Corte con troquel",
        text: "Los paneles y las viseras se cortan en una prensa con troqueles de acero, así todos los paneles de una talla salen iguales.",
      },
      {
        title: "Costura",
        text: "Copas, cintas, tafiletes y viseras se cosen en nuestra sala de costura.",
      },
      {
        title: "Planchado a vapor",
        text: "Las gorras terminadas se moldean en hormas calientes para que la copa mantenga su forma.",
      },
      {
        title: "Control y embalaje",
        text: "Las gorras se revisan, se embolsan y se empaquetan en cajas de exportación.",
      },
    ],
    photosHeading: "Fotos del taller",
    photos: [
      "Revisión de la tela antes del corte",
      "Corte de paneles en la prensa de troquelado",
      "Costura en la sala de costura",
      "Planchado a vapor de una gorra terminada",
      "Prensa para broches y botones",
      "Cajas listas para el envío",
      "Pedidos embalados esperando la recogida",
      "Carga de un pedido para el transitario",
    ],
    inhouseHeading: "Lo que hacemos nosotros",
    inhouseText:
      "El patronaje, el corte, la costura, el moldeado y el embalaje se hacen en nuestro propio taller. El bordado, la estampación y el lavado los hacen talleres asociados con los que trabajamos desde hace años, y cada lote se revisa cuando vuelve a nosotros.",
    liveHeading: "Vea su propio pedido",
    liveText:
      "Si lo solicita, hacemos videollamadas en directo desde el taller para que vea sus gorras en la línea de producción. Se aceptan inspecciones de terceros antes del pago final.",
    ctaQuote: "Pedir presupuesto",
    ctaPricing: "Ver precios y plazos",
    videoName: "Dentro del taller de gorras de NanCrown",
    videoDescription:
      "Imágenes reales del taller de gorras de NanCrown, grabadas en 2023: revisión de tela, corte con troquel, costura, planchado a vapor y embalaje.",
  },
  fr: {
    metaTitle: "Dans notre atelier de casquettes : vidéo réelle | NanCrown",
    metaDescription:
      "73 secondes dans l'atelier de casquettes NanCrown : contrôle du tissu, découpe à l'emporte-pièce, couture, mise en forme vapeur et emballage.",
    h1: "Dans notre atelier",
    lead: "Des images réelles de notre atelier de casquettes, tournées en 2023 : contrôle du tissu, découpe à l'emporte-pièce, couture, mise en forme à la vapeur et emballage. Aucune image d'archive, rien n'est généré par ordinateur. Nous avons retiré tous les plans où l'on voyait le logo d'un client.",
    videoCaption: "73 secondes, sans son. Tourné dans notre atelier en 2023.",
    stepsHeading: "Ce que montre la vidéo",
    steps: [
      {
        title: "Contrôle du tissu",
        text: "Le tissu passe sur une machine de contrôle à table lumineuse avant la découpe, pour repérer les défauts avant qu'ils ne deviennent des panneaux.",
      },
      {
        title: "Découpe à l'emporte-pièce",
        text: "Les panneaux et les visières sont découpés sur une presse avec des emporte-pièces en acier, pour que tous les panneaux d'une taille soient identiques.",
      },
      {
        title: "Couture",
        text: "Calottes, bandes de propreté, bandeaux de transpiration et visières sont assemblés dans notre atelier de couture.",
      },
      {
        title: "Mise en forme à la vapeur",
        text: "Les casquettes terminées sont mises en forme sur des moules chauffants pour que la calotte garde sa courbe.",
      },
      {
        title: "Contrôle et emballage",
        text: "Les casquettes sont contrôlées, mises en sachet et emballées dans des cartons d'export.",
      },
    ],
    photosHeading: "Photos de l'atelier",
    photos: [
      "Contrôle du tissu avant la découpe",
      "Découpe des panneaux sur la presse",
      "Couture dans l'atelier",
      "Mise en forme à la vapeur d'une casquette terminée",
      "Presse pour boutons-pression et boutons",
      "Cartons prêts à l'expédition",
      "Commandes emballées en attente d'enlèvement",
      "Chargement d'une commande pour le transitaire",
    ],
    inhouseHeading: "Ce que nous faisons nous-mêmes",
    inhouseText:
      "Le patronage, la découpe, la couture, la mise en forme et l'emballage se font dans notre propre atelier. La broderie, l'impression et le délavage sont confiés à des ateliers partenaires avec qui nous travaillons depuis des années, et chaque lot est contrôlé à son retour chez nous.",
    liveHeading: "Voir votre propre commande",
    liveText:
      "Nous faisons des appels vidéo en direct depuis l'atelier sur demande, pour que vous voyiez vos casquettes en production. Les inspections par un tiers sont les bienvenues avant le paiement du solde.",
    ctaQuote: "Demander un devis",
    ctaPricing: "Voir les prix et délais",
    videoName: "Dans l'atelier de casquettes NanCrown",
    videoDescription:
      "Images réelles de l'atelier de casquettes NanCrown, tournées en 2023 : contrôle du tissu, découpe, couture, mise en forme à la vapeur et emballage.",
  },
  de: {
    metaTitle: "Einblick in unsere Cap-Werkstatt: echtes Video | NanCrown",
    metaDescription:
      "73 Sekunden in der Cap-Werkstatt von NanCrown: Stoffprüfung, Stanzen, Nähen, Dampfformen und Verpacken. Echte Aufnahmen aus unserer Werkstatt.",
    h1: "Ein Blick in unsere Werkstatt",
    lead: "Echte Aufnahmen aus unserer Cap-Werkstatt, gefilmt 2023: Stoffprüfung, Stanzen, Nähen, Dampfformen und Verpacken. Kein Archivmaterial, nichts ist computergeneriert. Alle Szenen, in denen das Logo eines Kunden zu sehen war, haben wir herausgeschnitten.",
    videoCaption: "73 Sekunden, ohne Ton. Gefilmt 2023 in unserer Werkstatt.",
    stepsHeading: "Was Sie im Video sehen",
    steps: [
      {
        title: "Stoffprüfung",
        text: "Der Stoff läuft vor dem Zuschnitt über eine Prüfmaschine mit Leuchttisch, damit Fehler auffallen, bevor daraus Panels werden.",
      },
      {
        title: "Stanzen",
        text: "Panels und Schirme werden auf einer Stanzpresse mit Stahlmessern zugeschnitten, sodass jedes Panel einer Größe gleich ausfällt.",
      },
      {
        title: "Nähen",
        text: "Kopfteile, Einfassbänder, Schweißbänder und Schirme werden in unserer Näherei zusammengenäht.",
      },
      {
        title: "Dampfformen",
        text: "Fertige Caps werden auf beheizten Formen in Form gebracht, damit das Kopfteil seine Wölbung hält.",
      },
      {
        title: "Prüfen und Verpacken",
        text: "Die Caps werden geprüft, einzeln verpackt und in Exportkartons gepackt.",
      },
    ],
    photosHeading: "Fotos aus der Werkstatt",
    photos: [
      "Stoffprüfung vor dem Zuschnitt",
      "Zuschnitt der Panels an der Stanzpresse",
      "Nähen in der Näherei",
      "Dampfformen einer fertigen Cap",
      "Presse für Druckknöpfe und Knöpfe",
      "Kartons bereit für den Versand",
      "Verpackte Aufträge warten auf die Abholung",
      "Verladen eines Auftrags für den Spediteur",
    ],
    inhouseHeading: "Was wir selbst machen",
    inhouseText:
      "Schnittmuster, Zuschnitt, Nähen, Formen und Verpacken erledigen wir in unserer eigenen Werkstatt. Stickerei, Druck und Waschung übernehmen Partnerwerkstätten, mit denen wir seit Jahren arbeiten, und jede Charge wird geprüft, wenn sie zu uns zurückkommt.",
    liveHeading: "Ihren eigenen Auftrag sehen",
    liveText:
      "Auf Wunsch machen wir Live-Videocalls aus der Werkstatt, damit Sie Ihre Caps in der Produktion sehen. Eine Prüfung durch Dritte vor der Restzahlung ist willkommen.",
    ctaQuote: "Angebot anfordern",
    ctaPricing: "Preise und Lieferzeiten ansehen",
    videoName: "Einblick in die Cap-Werkstatt von NanCrown",
    videoDescription:
      "Echte Aufnahmen aus der Cap-Werkstatt von NanCrown, gefilmt 2023: Stoffprüfung, Stanzen, Nähen, Dampfformen und Verpacken.",
  },
};
