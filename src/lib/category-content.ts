// 9 个「帽型分类落地页」(/custom/[category])的四语言文案数据源
// 目标:让海外 B2B 客户(品牌方/零售商/礼品公司/球队)搜"custom XX manufacturer/factory/wholesale"时能找到对应帽型的落地页
//
// 🔴 事实红线(只能用下面这些、以及 sample-data.ts 里各产品已写的 material/features,禁止新写):
//   - 起订量:每色 50 顶起订(MOQ 50 pieces per colour)
//   - 大货前先做产前样确认(pre-production sample),确认后再生产
//   - 定制/装饰工艺:刺绣(logo embroidery)、丝印(screen printing)、织唛(woven labels)、布贴(patches);可定制面料/颜色/尺寸
//   - 工厂在中国广州,自有工厂,做 OEM/ODM
//   - 不写:交期天数、打样天数、价格、产能数字、员工人数、面积、成立年份、任何认证(ISO/BSCI/SEDEX等)、克重、防晒系数、竞品品牌名、中文字
//
// 命名/大小写约定(参照 messages/*.json 已有译法 + 老板任务里给的示例):
//   - name 字段(面包屑/其它帽型链接用的短名):照抄 messages/*.json 里 Contact.productOptions 已有的译法,保证和全站术语一致
//   - h1/描述性标题:英文 Title Case;西/法语句首大写、其余小写(更地道,不是机翻腔);德语按语法只大写名词
//   - meta 标题:直接复用 h1 文本传给 pageMetadata() 的 title 参数——根布局 src/app/layout.tsx 的 title.template 是 "%s | NanCrown",
//     会自动在结尾补上"| NanCrown",这里不能再手动拼一次,不然会变成"...| NanCrown | NanCrown"

import type { Locale } from "@/i18n/routing";

// 分类页 slug(和 sample-data.ts 里 categories 数组的 9 个值一一对应)
export type CategorySlug =
  | "baseball-caps"
  | "trucker-hats"
  | "bucket-hats"
  | "visors"
  | "camp-caps"
  | "running-caps"
  | "cadet-caps"
  | "outdoor-caps"
  | "winter-hats";

export const categorySlugs: CategorySlug[] = [
  "baseball-caps",
  "trucker-hats",
  "bucket-hats",
  "visors",
  "camp-caps",
  "running-caps",
  "cadet-caps",
  "outdoor-caps",
  "winter-hats",
];

export interface CategoryFaqItem {
  q: string;
  a: string;
}

export interface CategoryLocaleContent {
  // 短名:面包屑 / "其它帽型"链接 / 分类产品区标题里用
  name: string;
  // 页面 H1,同时也直接当 meta 标题传给 pageMetadata(见文件头说明)
  h1: string;
  // meta 描述(≤155 字符左右)
  metaDescription: string;
  // 开头介绍,固定两小段
  intro: [string, string];
  // 定制选项 4~6 条
  customOptions: string[];
  // FAQ 固定三条
  faq: [CategoryFaqItem, CategoryFaqItem, CategoryFaqItem];
}

export interface CategoryDefinition {
  slug: CategorySlug;
  // 对应 sample-data.ts 里 Product.category 的值,用来筛选该分类下的产品
  categoryValue: string;
  content: Record<Locale, CategoryLocaleContent>;
}

// 分类页上和具体产品无关的通用界面文案(四语言各一份),尽量复用 messages/*.json 里已经出现过的同义译法,
// 保持和全站其它按钮/标题用词一致(不从 messages 里 import,是因为本任务不允许改 messages/*.json;这里手写一份同义文本)
interface CategoryUiStrings {
  home: string;
  custom: string;
  requestQuote: string;
  customOptionsHeading: string;
  collectionHeading: (name: string) => string;
  viewAllProducts: string;
  otherStylesHeading: string;
  faqHeading: string;
  faqSubtitle: string;
  // 底部 CTA 大标题(和按钮文字 requestQuote 区分开,避免标题和按钮重复同一句话)
  ctaHeading: string;
  // /custom 总览页新增的"我们做的帽型"区块标题,链到 9 个分类页
  browseByStyleHeading: string;
}

export const categoryUi: Record<Locale, CategoryUiStrings> = {
  en: {
    home: "Home",
    custom: "Custom Orders",
    requestQuote: "Request a Quote",
    customOptionsHeading: "Customization Options",
    collectionHeading: (name) => `Our ${name} Collection`,
    viewAllProducts: "View All Products",
    otherStylesHeading: "Explore Other Hat Styles",
    faqHeading: "Frequently Asked Questions",
    faqSubtitle: "Common questions from brands and wholesale buyers",
    ctaHeading: "Ready to Start Your Custom Order?",
    browseByStyleHeading: "Browse by Hat Style",
  },
  es: {
    home: "Inicio",
    custom: "Pedidos Personalizados",
    requestQuote: "Solicitar Cotización",
    customOptionsHeading: "Opciones de Personalización",
    collectionHeading: (name) => `Nuestra Colección de ${name}`,
    viewAllProducts: "Ver Todos los Productos",
    otherStylesHeading: "Explora Otros Estilos de Gorras",
    faqHeading: "Preguntas Frecuentes",
    faqSubtitle: "Dudas habituales de marcas y compradores mayoristas",
    ctaHeading: "¿Listo para Iniciar tu Pedido Personalizado?",
    browseByStyleHeading: "Explora por Estilo de Gorra",
  },
  fr: {
    home: "Accueil",
    custom: "Commandes Sur Mesure",
    requestQuote: "Demander un Devis",
    customOptionsHeading: "Options de Personnalisation",
    collectionHeading: (name) => `Notre Collection de ${name}`,
    viewAllProducts: "Voir Tous les Produits",
    otherStylesHeading: "Découvrez Nos Autres Styles",
    faqHeading: "Questions Fréquentes",
    faqSubtitle: "Questions courantes des marques et acheteurs grossistes",
    ctaHeading: "Prêt à Lancer Votre Commande Personnalisée ?",
    browseByStyleHeading: "Parcourir par Style de Casquette",
  },
  de: {
    home: "Startseite",
    custom: "Sonderanfertigungen",
    requestQuote: "Angebot Anfordern",
    customOptionsHeading: "Optionen zur Individualisierung",
    collectionHeading: (name) => `Unsere ${name}-Kollektion`,
    viewAllProducts: "Alle Produkte Ansehen",
    otherStylesHeading: "Entdecken Sie Weitere Cap-Stile",
    faqHeading: "Häufig Gestellte Fragen",
    faqSubtitle: "Häufige Fragen von Marken und Großhandelskunden",
    ctaHeading: "Bereit für Ihre Individuelle Bestellung?",
    browseByStyleHeading: "Nach Cap-Stil Durchsuchen",
  },
};

export const categoryDefinitions: CategoryDefinition[] = [
  // ────────────────────────────────────────────────────────────
  // 1. Baseball Caps
  // ────────────────────────────────────────────────────────────
  {
    slug: "baseball-caps",
    categoryValue: "Baseball Caps",
    content: {
      en: {
        name: "Baseball Caps",
        h1: "Custom Baseball Caps Manufacturer",
        metaDescription:
          "Custom baseball caps from our own Guangzhou factory — embroidered logos, washed cotton or denim builds, OEM/ODM welcome. MOQ 50 pcs per colour.",
        intro: [
          "NanCrown manufactures custom baseball caps for brands, streetwear labels, teams and promotional buyers who need a factory partner, not just a supplier. Our 6-panel builds range from soft, unstructured washed-cotton caps to raw-edge appliqué and denim styles with distressed finishes, so you can match a cap silhouette to your collection instead of picking from a generic blank.",
          "Every cap is built to carry your own branding: embroidered wordmarks, appliqué letters, woven labels or patches, in the fabric and colourway you choose. As a factory-direct manufacturer offering OEM/ODM, we work from your logo and reference images, confirm the build with a pre-production sample, and keep the minimum order at 50 pieces per colour so smaller brands can order alongside larger wholesale buyers.",
        ],
        customOptions: [
          "Fabric: washed cotton twill, garment-washed cotton, wool-blend felt or washed denim.",
          "Crown & brim: structured or unstructured 6-panel crowns, curved or near-flat brims.",
          "Decoration: flat or appliqué embroidery, screen printing, woven labels and patches.",
          "Hardware: antique brass or silver metal sliders, eyelets and studs in your finish of choice.",
          "Closure: adjustable webbing strap or metal slider, sized to fit most head sizes.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom baseball caps?",
            a: "Our MOQ is 50 pieces per colour, so you can start with a manageable first order and scale up once you've tested the style with your customers.",
          },
          {
            q: "Can you put our logo on the cap?",
            a: "Yes — we apply embroidery, screen printing, woven labels or patches to your artwork, and can match the cap fabric and colours to your brand.",
          },
          {
            q: "Can I choose the crown style and closure?",
            a: "Yes. We build both structured and unstructured 6-panel crowns with curved or near-flat brims, closed with an adjustable webbing strap or metal slider depending on the style.",
          },
        ],
      },
      es: {
        name: "Gorras de Béisbol",
        h1: "Fabricante de gorras de béisbol personalizadas",
        metaDescription:
          "Gorras de béisbol personalizadas hechas en nuestra propia fábrica de Guangzhou: bordado, algodón lavado o denim, OEM/ODM. Pedido mínimo 50 uds/color.",
        intro: [
          "En NanCrown fabricamos gorras de béisbol personalizadas para marcas, sellos urbanos, equipos y compradores de artículos promocionales que buscan un socio de fábrica, no solo un proveedor. Nuestros modelos de 6 paneles van desde gorras suaves y sin estructura en algodón lavado hasta modelos de denim con apliques de borde crudo y acabados envejecidos, para que elijas una silueta acorde a tu colección en vez de partir de una gorra genérica.",
          "Cada gorra está pensada para llevar tu propia marca: logotipos bordados, letras aplicadas, etiquetas tejidas o parches, en el tejido y color que elijas. Como fabricante directo con servicio OEM/ODM, trabajamos a partir de tu logo e imágenes de referencia, confirmamos el modelo con una muestra de preproducción y mantenemos el pedido mínimo en 50 piezas por color, para que marcas pequeñas puedan pedir junto a compradores mayoristas más grandes.",
        ],
        customOptions: [
          "Tejido: sarga de algodón lavado, algodón lavado a prenda, fieltro mezcla de lana o denim lavado.",
          "Copa y visera: copas de 6 paneles estructuradas o sin estructura, viseras curvas o casi planas.",
          "Personalización: bordado plano o de aplique, serigrafía, etiquetas tejidas y parches.",
          "Herrería: hebillas metálicas en acabado bronce antiguo o plateado, ojetes y tachuelas a elegir.",
          "Cierre: correa de cincha ajustable o hebilla metálica, en talla única para la mayoría de cabezas.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo para gorras de béisbol personalizadas?",
            a: "Nuestro pedido mínimo es de 50 piezas por color, así puedes empezar con un primer pedido manejable y crecer una vez que hayas probado el modelo con tus clientes.",
          },
          {
            q: "¿Pueden poner nuestro logo en la gorra?",
            a: "Sí — aplicamos bordado, serigrafía, etiquetas tejidas o parches con tu diseño, y podemos ajustar el tejido y los colores de la gorra a tu marca.",
          },
          {
            q: "¿Puedo elegir el estilo de copa y el cierre?",
            a: "Sí. Fabricamos copas de 6 paneles estructuradas y sin estructura, con visera curva o casi plana, cerradas con correa de cincha ajustable o hebilla metálica según el modelo.",
          },
        ],
      },
      fr: {
        name: "Casquettes de Baseball",
        h1: "Fabricant de casquettes de baseball personnalisées",
        metaDescription:
          "Casquettes de baseball personnalisées fabriquées dans notre usine à Guangzhou : broderie, coton délavé ou denim, OEM/ODM. Commande min. 50 pièces/couleur.",
        intro: [
          "NanCrown fabrique des casquettes de baseball personnalisées pour les marques, les labels streetwear, les équipes et les acheteurs de goodies qui cherchent un partenaire de fabrication, pas seulement un fournisseur. Nos modèles à 6 panneaux vont de la casquette souple et non structurée en coton délavé aux modèles en denim avec appliqués à bord brut et finitions vieillies, pour choisir une silhouette adaptée à votre collection plutôt qu'un modèle générique.",
          "Chaque casquette est conçue pour porter votre propre marque : logo brodé, lettres appliquées, étiquettes tissées ou patchs, dans le tissu et le coloris de votre choix. En tant que fabricant direct proposant l'OEM/ODM, nous travaillons à partir de votre logo et de vos visuels de référence, validons le modèle avec un échantillon de pré-production, et maintenons la commande minimale à 50 pièces par couleur pour que les petites marques puissent commander aux côtés des acheteurs grossistes.",
        ],
        customOptions: [
          "Tissu : sergé de coton délavé, coton délavé façon vêtement, feutre mélangé laine ou denim délavé.",
          "Calotte et visière : calottes 6 panneaux structurées ou non structurées, visières courbées ou quasi plates.",
          "Personnalisation : broderie plate ou appliquée, sérigraphie, étiquettes tissées et patchs.",
          "Quincaillerie : boucles métalliques finition laiton vieilli ou argenté, œillets et clous au choix.",
          "Fermeture : sangle réglable ou boucle métallique, taille unique adaptée à la plupart des tours de tête.",
        ],
        faq: [
          {
            q: "Quelle est la commande minimale pour des casquettes de baseball personnalisées ?",
            a: "Notre commande minimale est de 50 pièces par couleur, pour démarrer avec une première commande raisonnable et augmenter les volumes une fois le modèle testé auprès de vos clients.",
          },
          {
            q: "Pouvez-vous mettre notre logo sur la casquette ?",
            a: "Oui — nous appliquons broderie, sérigraphie, étiquettes tissées ou patchs à partir de votre visuel, et pouvons adapter le tissu et les coloris de la casquette à votre marque.",
          },
          {
            q: "Puis-je choisir le style de calotte et la fermeture ?",
            a: "Oui. Nous fabriquons des calottes 6 panneaux structurées et non structurées, avec visière courbée ou quasi plate, fermées par une sangle réglable ou une boucle métallique selon le modèle.",
          },
        ],
      },
      de: {
        name: "Baseballkappen",
        h1: "Hersteller für individuelle Baseballkappen",
        metaDescription:
          "Individuelle Baseballkappen aus unserer eigenen Fabrik in Guangzhou — Logo-Stickerei, gewaschene Baumwolle oder Denim. Mind. 50 Stk/Farbe.",
        intro: [
          "NanCrown fertigt individuelle Baseballkappen für Marken, Streetwear-Labels, Teams und Werbeartikel-Einkäufer, die einen Fabrikpartner suchen und keinen reinen Zwischenhändler. Unsere 6-Panel-Modelle reichen von weichen, unstrukturierten Kappen aus gewaschener Baumwolle bis zu Denim-Modellen mit Rohkanten-Applikationen und Used-Optik — so wählen Sie eine Silhouette passend zu Ihrer Kollektion statt eines Standardmodells.",
          "Jede Kappe ist für Ihr eigenes Branding ausgelegt: gestickte Schriftzüge, applizierte Buchstaben, gewebte Etiketten oder Aufnäher, in Stoff und Farbe Ihrer Wahl. Als Hersteller mit eigener Fabrik und OEM/ODM-Service arbeiten wir mit Ihrer Logodatei und Referenzbildern, bestätigen das Modell mit einem Vorproduktionsmuster und halten die Mindestbestellmenge bei 50 Stück pro Farbe — so können auch kleinere Marken neben großen Großhandelskunden bestellen.",
        ],
        customOptions: [
          "Material: gewaschener Baumwolltwill, garment-washed Baumwolle, Wollfilz-Mix oder gewaschener Denim.",
          "Kopfteil & Schirm: strukturierte oder unstrukturierte 6-Panel-Kappen, gebogener oder nahezu flacher Schirm.",
          "Veredelung: flache oder applizierte Stickerei, Siebdruck, gewebte Etiketten und Aufnäher.",
          "Beschläge: Metallschnallen in Altmessing oder Silber, Ösen und Nieten nach Wahl.",
          "Verschluss: verstellbarer Gurtband-Verschluss oder Metallschnalle, One Size für die meisten Kopfgrößen.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestbestellmenge für individuelle Baseballkappen?",
            a: "Unsere Mindestbestellmenge liegt bei 50 Stück pro Farbe — so starten Sie mit einer überschaubaren ersten Bestellung und bauen die Menge aus, sobald sich das Modell bei Ihren Kunden bewährt hat.",
          },
          {
            q: "Können Sie unser Logo auf die Kappe bringen?",
            a: "Ja — wir setzen Ihr Design per Stickerei, Siebdruck, gewebtem Etikett oder Aufnäher um und passen Stoff und Farben der Kappe an Ihre Marke an.",
          },
          {
            q: "Kann ich Kopfform und Verschluss wählen?",
            a: "Ja. Wir fertigen strukturierte und unstrukturierte 6-Panel-Kappen mit gebogenem oder nahezu flachem Schirm, je nach Modell mit verstellbarem Gurtband-Verschluss oder Metallschnalle.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 2. Trucker Hats
  // ────────────────────────────────────────────────────────────
  {
    slug: "trucker-hats",
    categoryValue: "Trucker Hats",
    content: {
      en: {
        name: "Trucker Hats",
        h1: "Custom Trucker Hats Manufacturer",
        metaDescription:
          "Custom trucker hats factory-direct from Guangzhou — structured front panel, mesh back, colour-matched snapback. Embroidery/print, MOQ 50 pcs/colour.",
        intro: [
          "Trucker hats are the easiest style for a brand to wear every day — a structured front panel for your logo and an open hex-mesh back that keeps the build light. NanCrown makes trucker hats for streetwear labels, event merch and team stores that want a cap people actually reach for, not a giveaway that sits in a drawer.",
          "The front panel is where your artwork lives: embroidery or screen print on a structured shell, with the mesh back and snapback closure colour-matched to your palette. We work from your logo file, confirm the build with a pre-production sample, and produce from our own factory in Guangzhou with a minimum order of 50 pieces per colour — OEM and ODM orders both welcome.",
        ],
        customOptions: [
          "Fabric: structured woven or foam front panels with a breathable hex-mesh back.",
          "Closure: colour-matched plastic snapback, adjustable to fit most head sizes.",
          "Decoration: embroidered or screen-printed logos on the front panel, plus woven labels or patches.",
          "Brim: curved brim with multi-row topstitch detailing.",
          "Custom colourways across the front panel, mesh back and snapback to match your brand.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom trucker hats?",
            a: "Our MOQ is 50 pieces per colour, so you can order a manageable first run and reorder once you know what sells.",
          },
          {
            q: "Can you embroider or print our logo on the front panel?",
            a: "Yes — the structured front panel is built for embroidery or screen printing, and we can also add woven labels or patches.",
          },
          {
            q: "What makes a trucker hat different from a baseball cap?",
            a: "A trucker hat pairs a structured front panel with a breathable hex-mesh back and a snapback closure, while a baseball cap is usually one fabric all the way round with a strap or slider.",
          },
        ],
      },
      es: {
        name: "Gorras Trucker",
        h1: "Fabricante de gorras trucker personalizadas",
        metaDescription:
          "Gorras trucker personalizadas de fábrica en Guangzhou: panel frontal estructurado, malla trasera y snapback a juego. Mínimo 50 uds/color.",
        intro: [
          "Las gorras trucker son el estilo que una marca puede llevar todos los días: un panel frontal estructurado para tu logo y una parte trasera de malla hexagonal abierta que mantiene la gorra ligera. En NanCrown fabricamos gorras trucker para marcas urbanas, merchandising de eventos y equipos deportivos que buscan una gorra que la gente realmente use, no un regalo que termine en un cajón.",
          "El panel frontal es donde va tu diseño: bordado o serigrafía sobre una estructura firme, con la malla trasera y el cierre snapback a juego con tu paleta de colores. Trabajamos a partir de tu logo, confirmamos el modelo con una muestra de preproducción y fabricamos en nuestra propia fábrica en Guangzhou, con un pedido mínimo de 50 piezas por color — aceptamos pedidos OEM y ODM.",
        ],
        customOptions: [
          "Tejido: panel frontal estructurado o de espuma con malla hexagonal transpirable en la parte trasera.",
          "Cierre: snapback de plástico a juego con el color, ajustable a la mayoría de tallas.",
          "Personalización: bordado o serigrafía en el panel frontal, además de etiquetas tejidas o parches.",
          "Visera curva con pespunte de varias líneas.",
          "Combinaciones de color a medida en el panel frontal, la malla trasera y el snapback.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo para gorras trucker personalizadas?",
            a: "Nuestro pedido mínimo es de 50 piezas por color, así puedes empezar con una primera producción manejable y repetir pedido cuando sepas qué funciona.",
          },
          {
            q: "¿Pueden bordar o imprimir nuestro logo en el panel frontal?",
            a: "Sí — el panel frontal estructurado está pensado para bordado o serigrafía, y también podemos añadir etiquetas tejidas o parches.",
          },
          {
            q: "¿Qué diferencia una gorra trucker de una gorra de béisbol?",
            a: "La gorra trucker combina un panel frontal estructurado con una malla trasera transpirable y cierre snapback, mientras que la gorra de béisbol suele ser de una sola tela con correa ajustable o hebilla metálica.",
          },
        ],
      },
      fr: {
        name: "Casquettes Trucker",
        h1: "Fabricant de casquettes trucker personnalisées",
        metaDescription:
          "Casquettes trucker personnalisées, fabriquées à Guangzhou : panneau avant structuré, dos en maille, snapback assorti. Min. 50 pièces/couleur.",
        intro: [
          "La casquette trucker est le modèle qu'une marque peut porter au quotidien : un panneau avant structuré prêt pour votre logo et un dos en maille hexagonale ajourée qui garde la casquette légère. NanCrown fabrique des casquettes trucker pour les marques streetwear, le merchandising événementiel et les équipes sportives qui veulent une casquette que l'on porte vraiment, pas un goodie oublié dans un tiroir.",
          "Le panneau avant accueille votre visuel : broderie ou sérigraphie sur une structure rigide, avec le dos en maille et le bouton-pression assortis à votre palette. Nous travaillons à partir de votre logo, validons le modèle avec un échantillon de pré-production et fabriquons dans notre propre usine à Guangzhou, avec une commande minimale de 50 pièces par couleur — commandes OEM et ODM bienvenues.",
        ],
        customOptions: [
          "Tissu : panneau avant structuré ou en mousse, dos en maille hexagonale respirante.",
          "Fermeture : bouton-pression plastique assorti à la couleur, ajustable à la plupart des tours de tête.",
          "Personnalisation : broderie ou sérigraphie sur le panneau avant, étiquettes tissées ou patchs en option.",
          "Visière courbée avec surpiqûres sur plusieurs rangs.",
          "Coloris personnalisés sur le panneau avant, le dos en maille et le bouton-pression.",
        ],
        faq: [
          {
            q: "Quelle est la commande minimale pour des casquettes trucker personnalisées ?",
            a: "Notre commande minimale est de 50 pièces par couleur, pour démarrer avec une première production raisonnable avant de recommander selon les ventes.",
          },
          {
            q: "Pouvez-vous broder ou imprimer notre logo sur le panneau avant ?",
            a: "Oui — le panneau avant structuré est conçu pour la broderie ou la sérigraphie, et nous pouvons aussi ajouter des étiquettes tissées ou des patchs.",
          },
          {
            q: "Quelle est la différence entre une casquette trucker et une casquette de baseball ?",
            a: "La casquette trucker associe un panneau avant structuré à un dos en maille respirante et une fermeture bouton-pression, alors que la casquette de baseball est généralement dans un seul tissu avec une sangle réglable ou une boucle métallique.",
          },
        ],
      },
      de: {
        name: "Trucker-Kappen",
        h1: "Hersteller für individuelle Trucker-Kappen",
        metaDescription:
          "Individuelle Trucker-Kappen direkt ab Fabrik in Guangzhou — stabiles Vorderteil, Mesh-Rücken, farblich passender Snapback. Ab 50 Stk/Farbe.",
        intro: [
          "Die Trucker-Kappe ist der Stil, den eine Marke jeden Tag tragen kann — ein stabiles Vorderteil für Ihr Logo und ein luftiger Netzrücken aus Hex-Mesh, der die Kappe leicht hält. Der gebogene Schirm mit mehrreihiger Steppnaht rundet die Silhouette ab, ohne vom Logo auf der Vorderseite abzulenken. NanCrown fertigt Trucker-Kappen für Streetwear-Marken, Event-Merchandise und Sportteams, die eine Kappe wollen, die wirklich getragen wird — kein Werbegeschenk, das in der Schublade landet.",
          "Das Vorderteil trägt Ihr Design: Stickerei oder Siebdruck auf stabilem Material, mit farblich abgestimmtem Mesh-Rücken und Snapback-Verschluss. Wir arbeiten mit Ihrer Logo-Datei, bestätigen das Modell mit einem Vorproduktionsmuster und fertigen in unserer eigenen Fabrik in Guangzhou — Mindestbestellmenge 50 Stück pro Farbe, OEM- und ODM-Aufträge willkommen.",
        ],
        customOptions: [
          "Material: strukturiertes Gewebe oder Schaumstoff-Vorderteil mit atmungsaktivem Hex-Mesh-Rücken.",
          "Verschluss: farblich abgestimmter Kunststoff-Snapback, verstellbar für die meisten Kopfgrößen.",
          "Veredelung: Stickerei oder Siebdruck auf dem Vorderteil, dazu gewebte Etiketten oder Aufnäher.",
          "Gebogener Schirm mit mehrreihiger Steppnaht.",
          "Individuelle Farbkombinationen für Vorderteil, Mesh-Rücken und Snapback.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestbestellmenge für individuelle Trucker-Kappen?",
            a: "Unsere Mindestbestellmenge liegt bei 50 Stück pro Farbe — so starten Sie mit einer überschaubaren ersten Charge und bestellen nach, sobald Sie wissen, was sich verkauft.",
          },
          {
            q: "Können Sie unser Logo auf das Vorderteil sticken oder drucken?",
            a: "Ja — das stabile Vorderteil ist für Stickerei oder Siebdruck ausgelegt, zusätzlich können wir gewebte Etiketten oder Aufnäher anbringen.",
          },
          {
            q: "Was unterscheidet eine Trucker-Kappe von einer Baseballkappe?",
            a: "Die Trucker-Kappe kombiniert ein stabiles Vorderteil mit einem atmungsaktiven Mesh-Rücken und Snapback-Verschluss, während die Baseballkappe meist durchgehend aus einem Material mit verstellbarem Riemen oder Metallschnalle besteht.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 3. Bucket Hats
  // ────────────────────────────────────────────────────────────
  {
    slug: "bucket-hats",
    categoryValue: "Bucket Hats",
    content: {
      en: {
        name: "Bucket Hats",
        h1: "Custom Bucket Hats Manufacturer",
        metaDescription:
          "Custom bucket hats from our Guangzhou factory — polyester or soft woven builds, sherpa trim, contrast panels. Embroidery/print, MOQ 50 pcs per colour.",
        intro: [
          "Bucket hats move fast in streetwear, festival merch and sun-season retail, and NanCrown builds them in two directions: a low flat-top crown with a short outward brim for an everyday silhouette, and a wide, gathered-crown sun hat for buyers who want more brim coverage. Both start from a blank shell, so the finished hat carries only the branding you add.",
          "Trim and stitching do the styling work — sherpa panels, contrast brim undersides with piped edges, or rings of topstitching around a wide brim — and every surface is open for embroidery, screen printing, woven labels or patches. We build from your logo and colour references, confirm the fit and construction with a pre-production sample, and keep production factory-direct in Guangzhou with a 50-piece-per-colour minimum, OEM/ODM welcome.",
        ],
        customOptions: [
          "Fabric: 100% polyester or soft woven builds, with sherpa trim available on select styles.",
          "Crown & brim: low flat-top crown with a short outward brim, or a wide, gathered-crown sun-hat silhouette.",
          "Trim: contrast-colour brim underside with piped edging, or concentric topstitch rings across the brim.",
          "Closure: removable flat webbing chin cord, or an adjustable cord chin strap with a toggle.",
          "Decoration: embroidery, screen printing, woven labels or patches on the crown or brim.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom bucket hats?",
            a: "Our MOQ is 50 pieces per colour, which is enough to test a colourway in-store or online before committing to a larger run.",
          },
          {
            q: "Can you add our logo to a bucket hat?",
            a: "Yes — the crown and brim are left blank on our base builds specifically so we can add your embroidery, print, woven label or patch.",
          },
          {
            q: "What brim styles do you offer?",
            a: "We build a low flat-top crown with a short outward brim for an everyday look, and a wider gathered-crown sun hat with more brim coverage — both can take a removable or adjustable chin cord.",
          },
        ],
      },
      es: {
        name: "Sombreros de Pescador",
        h1: "Fabricante de sombreros de pescador personalizados",
        metaDescription:
          "Sombreros de pescador personalizados de fábrica en Guangzhou: poliéster o tejido suave, ribete sherpa. Mínimo 50 uds/color.",
        intro: [
          "Los sombreros de pescador se mueven rápido en moda urbana, merchandising de festivales y la temporada de sol, y en NanCrown los fabricamos en dos direcciones: una copa baja y plana con visera corta hacia afuera para un uso diario, y un modelo tipo pamela con copa fruncida para quienes buscan más sombra. Ambos parten de un modelo en blanco, así que el sombrero final solo lleva la marca que tú añadas.",
          "El ribete y las costuras hacen el trabajo de estilo: paneles sherpa, la parte interior de la visera en color de contraste con borde vivo, o anillos de pespunte alrededor de una visera ancha — y cada superficie está lista para bordado, serigrafía, etiquetas tejidas o parches. Fabricamos a partir de tu logo y referencias de color, confirmamos el ajuste y la construcción con una muestra de preproducción, y mantenemos la producción en nuestra propia fábrica de Guangzhou con un mínimo de 50 piezas por color — aceptamos OEM/ODM.",
        ],
        customOptions: [
          "Tejido: 100% poliéster o tejido suave, con ribete sherpa disponible en modelos seleccionados.",
          "Copa y visera: copa baja y plana con visera corta hacia afuera, o silueta tipo pamela con copa fruncida.",
          "Ribete: interior de la visera en color de contraste con borde vivo, o anillos de pespunte concéntricos en la visera.",
          "Cierre: cordón de cincha plano y desmontable, o cordón ajustable con regulador.",
          "Personalización: bordado, serigrafía, etiquetas tejidas o parches en la copa o la visera.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo para sombreros de pescador personalizados?",
            a: "Nuestro pedido mínimo es de 50 piezas por color, suficiente para probar un color en tienda o en línea antes de comprometerte con una producción mayor.",
          },
          {
            q: "¿Pueden añadir nuestro logo a un sombrero de pescador?",
            a: "Sí — la copa y la visera se dejan en blanco en nuestros modelos base justamente para poder añadir tu bordado, estampado, etiqueta tejida o parche.",
          },
          {
            q: "¿Qué estilos de visera ofrecen?",
            a: "Fabricamos una copa baja y plana con visera corta hacia afuera para uso diario, y un modelo tipo pamela más ancho con copa fruncida y más sombra — ambos admiten cordón desmontable o ajustable.",
          },
        ],
      },
      fr: {
        name: "Bobs",
        h1: "Fabricant de bobs personnalisés",
        metaDescription:
          "Bobs personnalisés fabriqués à Guangzhou : polyester ou tissu souple, bordure sherpa. Commande min. 50 pièces/couleur.",
        intro: [
          "Le bob se vend vite en streetwear, en merchandising de festival et en saison estivale, et NanCrown le fabrique selon deux approches : une calotte basse et plate avec une visière courte tournée vers l'extérieur pour un usage quotidien, et un modèle façon chapeau de soleil à calotte froncée pour plus de couvrance. Les deux partent d'un modèle vierge, si bien que le bob fini ne porte que votre propre marque.",
          "La finition et les surpiqûres font le style : bordure sherpa, dessous de visière en couleur contrastée avec liseré passepoilé, ou anneaux de surpiqûres concentriques sur une visière large — chaque surface est prête pour la broderie, la sérigraphie, les étiquettes tissées ou les patchs. Nous fabriquons à partir de votre logo et de vos références de couleur, validons l'ajustement et la construction avec un échantillon de pré-production, et gardons une production en direct depuis notre usine de Guangzhou, commande minimale de 50 pièces par couleur, OEM/ODM bienvenus.",
        ],
        customOptions: [
          "Tissu : 100 % polyester ou tissu souple, bordure sherpa disponible sur certains modèles.",
          "Calotte et visière : calotte basse et plate avec visière courte tournée vers l'extérieur, ou silhouette façon chapeau de soleil à calotte froncée.",
          "Finition : dessous de visière en couleur contrastée avec liseré passepoilé, ou anneaux de surpiqûres concentriques sur la visière.",
          "Fermeture : cordon plat amovible, ou cordon réglable avec bloqueur.",
          "Personnalisation : broderie, sérigraphie, étiquettes tissées ou patchs sur la calotte ou la visière.",
        ],
        faq: [
          {
            q: "Quelle est la commande minimale pour des bobs personnalisés ?",
            a: "Notre commande minimale est de 50 pièces par couleur, suffisant pour tester un coloris en boutique ou en ligne avant de passer à une production plus large.",
          },
          {
            q: "Pouvez-vous ajouter notre logo sur un bob ?",
            a: "Oui — la calotte et la visière restent vierges sur nos modèles de base précisément pour y ajouter votre broderie, impression, étiquette tissée ou patch.",
          },
          {
            q: "Quels styles de visière proposez-vous ?",
            a: "Nous fabriquons une calotte basse et plate avec visière courte pour un usage quotidien, et un modèle plus large façon chapeau de soleil à calotte froncée pour plus de couvrance — les deux peuvent recevoir un cordon amovible ou réglable.",
          },
        ],
      },
      de: {
        name: "Fischerhüte",
        h1: "Hersteller für individuelle Fischerhüte",
        metaDescription:
          "Individuelle Fischerhüte aus unserer Fabrik in Guangzhou — Polyester oder weiches Gewebe, Sherpa-Besatz, Kontrastpanels. Stickerei/Druck, ab 50 Stk/Farbe.",
        intro: [
          "Fischerhüte verkaufen sich schnell in Streetwear, Festival-Merchandise und der Sommersaison. NanCrown fertigt sie in zwei Richtungen: eine flache, niedrige Kopfform mit kurzer, nach außen stehender Krempe für den Alltag, und ein breiterer Sonnenhut mit gerafftem Kopfteil für mehr Schatten. Beide starten als unbedrucktes Grundmodell, sodass der fertige Hut ausschließlich Ihr eigenes Branding trägt.",
          "Besatz und Steppnähte machen den Stil aus — Sherpa-Panels, eine farblich abgesetzte Krempenunterseite mit Paspel-Kante oder konzentrische Steppnaht-Ringe auf einer breiten Krempe — und jede Fläche ist offen für Stickerei, Siebdruck, gewebte Etiketten oder Aufnäher. Wir arbeiten mit Ihrer Logodatei und Farbvorgaben, bestätigen Passform und Verarbeitung mit einem Vorproduktionsmuster und fertigen direkt in unserer eigenen Fabrik in Guangzhou — Mindestbestellmenge 50 Stück pro Farbe, OEM/ODM willkommen.",
        ],
        customOptions: [
          "Material: 100 % Polyester oder weiches Gewebe, Sherpa-Besatz bei ausgewählten Modellen verfügbar.",
          "Kopfform & Krempe: flache, niedrige Kopfform mit kurzer, nach außen stehender Krempe, oder breiter Sonnenhut mit gerafftem Kopfteil.",
          "Besatz: farblich abgesetzte Krempenunterseite mit Paspel-Kante, oder konzentrische Steppnaht-Ringe auf der Krempe.",
          "Verschluss: abnehmbare, flache Kordel aus Gurtband, oder verstellbare Kordel mit Stopper.",
          "Veredelung: Stickerei, Siebdruck, gewebte Etiketten oder Aufnäher auf Kopfteil oder Krempe.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestbestellmenge für individuelle Fischerhüte?",
            a: "Unsere Mindestbestellmenge liegt bei 50 Stück pro Farbe — genug, um eine Farbe im Laden oder online zu testen, bevor Sie eine größere Charge bestellen.",
          },
          {
            q: "Können Sie unser Logo auf einen Fischerhut bringen?",
            a: "Ja — Kopfteil und Krempe bleiben bei unseren Grundmodellen bewusst unbedruckt, damit wir Ihre Stickerei, Ihren Druck, Ihr gewebtes Etikett oder Ihren Aufnäher anbringen können.",
          },
          {
            q: "Welche Krempenstile bieten Sie an?",
            a: "Wir fertigen eine flache, niedrige Kopfform mit kurzer Krempe für den Alltag sowie einen breiteren Sonnenhut mit gerafftem Kopfteil und mehr Schatten — beide lassen sich mit abnehmbarer oder verstellbarer Kordel ausstatten.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 4. Visors
  // ────────────────────────────────────────────────────────────
  {
    slug: "visors",
    categoryValue: "Visors",
    content: {
      en: {
        name: "Visors",
        h1: "Custom Visors Manufacturer",
        metaDescription:
          "Custom sport visors from our Guangzhou factory — mesh knit or stretch woven builds, open crown, embroidered or printed logos. MOQ 50 pcs per colour.",
        intro: [
          "A visor keeps the shade of a cap without the crown, which is exactly why golf, tennis, running and event-merch buyers ask for them: cooler on the head, and the whole front band is open real estate for a logo. NanCrown builds visors in mesh knit and stretch woven fabrics, from a simple open-crown band to a sport style with a side slot that holds a pair of sunglasses.",
          "Because there's no crown to compete with your artwork, the front band and brim take embroidery or print cleanly, and we can colour-match the mesh interior and rear closure to your palette. We work from your logo file, confirm the build with a pre-production sample, and produce factory-direct in Guangzhou with a 50-piece-per-colour minimum — OEM/ODM orders welcome.",
        ],
        customOptions: [
          "Fabric: mesh knit, or a stretch woven blend of recycled polyester and elastane.",
          "Construction: open-crown band with a curved, self-fabric covered brim.",
          "Closure: hook-and-loop rear strap, or a dual elastic loop adjuster.",
          "Function: side slot sized to hold a pair of sunglasses, available on select styles.",
          "Decoration: embroidery or screen printing on the front band, matched to a black or colour mesh interior.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom visors?",
            a: "Our MOQ is 50 pieces per colour, so you can order a small first batch for a club, event or retail test before committing to more.",
          },
          {
            q: "Can our logo go on the front band?",
            a: "Yes — with no crown in the way, the front band is a clean, wide surface for embroidery or screen printing.",
          },
          {
            q: "Why choose a visor instead of a full cap?",
            a: "A visor's open crown keeps the head cooler than a full cap, and the closure — hook-and-loop or a dual elastic loop — adjusts easily, which is why they're popular for golf, tennis and running.",
          },
        ],
      },
      es: {
        name: "Viseras",
        h1: "Fabricante de viseras personalizadas",
        metaDescription:
          "Viseras deportivas personalizadas de fábrica en Guangzhou: malla o tejido elástico, copa abierta, logo bordado o estampado. Pedido mínimo 50 uds/color.",
        intro: [
          "Una visera da la sombra de una gorra sin la copa, por eso la piden tanto en golf, tenis, running como en merchandising de eventos: la cabeza va más fresca y toda la banda frontal queda libre para un logo. En NanCrown fabricamos viseras en malla o tejido elástico, desde una banda simple de copa abierta hasta un modelo deportivo con una ranura lateral para sujetar unas gafas de sol.",
          "Al no haber copa que compita con tu diseño, la banda frontal y la visera admiten bordado o estampado con buen acabado, y podemos ajustar el color de la malla interior y el cierre trasero a tu paleta. Trabajamos a partir de tu logo, confirmamos el modelo con una muestra de preproducción y fabricamos en nuestra propia fábrica de Guangzhou, con un pedido mínimo de 50 piezas por color — aceptamos OEM/ODM.",
        ],
        customOptions: [
          "Tejido: malla, o mezcla elástica de poliéster reciclado y elastano.",
          "Construcción: banda de copa abierta con visera curva forrada en el mismo tejido.",
          "Cierre: tira trasera de velcro, o regulador de doble lazo elástico.",
          "Función: ranura lateral para sujetar unas gafas de sol, disponible en modelos seleccionados.",
          "Personalización: bordado o serigrafía en la banda frontal, a juego con la malla interior en negro o en color.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo para viseras personalizadas?",
            a: "Nuestro pedido mínimo es de 50 piezas por color, así puedes pedir un primer lote pequeño para un club, un evento o probar en tienda antes de comprometerte con más.",
          },
          {
            q: "¿Puede ir nuestro logo en la banda frontal?",
            a: "Sí — al no haber copa de por medio, la banda frontal es una superficie amplia y limpia, ideal para bordado o serigrafía.",
          },
          {
            q: "¿Por qué elegir una visera en vez de una gorra completa?",
            a: "La copa abierta de la visera mantiene la cabeza más fresca que una gorra completa, y el cierre — velcro o doble lazo elástico — se ajusta con facilidad, por eso son populares en golf, tenis y running.",
          },
        ],
      },
      fr: {
        name: "Visières",
        h1: "Fabricant de visières personnalisées",
        metaDescription:
          "Visières de sport personnalisées, fabriquées à Guangzhou : maille ou tissu stretch, calotte ouverte. Commande min. 50 pièces/couleur.",
        intro: [
          "Une visière apporte l'ombre d'une casquette sans la calotte, c'est pourquoi le golf, le tennis, le running et le merchandising événementiel en redemandent : la tête reste plus fraîche, et toute la bande avant devient un espace libre pour un logo. NanCrown fabrique des visières en maille ou en tissu stretch, du modèle simple à calotte ouverte au modèle sport avec une fente latérale pour glisser des lunettes de soleil.",
          "Sans calotte pour concurrencer votre visuel, la bande avant et la visière accueillent broderie ou impression avec un rendu net, et nous pouvons assortir la maille intérieure et la fermeture arrière à votre palette. Nous travaillons à partir de votre logo, validons le modèle avec un échantillon de pré-production, et fabriquons en direct depuis notre usine de Guangzhou, commande minimale de 50 pièces par couleur — OEM/ODM bienvenus.",
        ],
        customOptions: [
          "Tissu : maille, ou mélange stretch de polyester recyclé et d'élasthanne.",
          "Construction : bande à calotte ouverte avec visière courbée recouverte du même tissu.",
          "Fermeture : sangle arrière auto-agrippante, ou régulateur à double boucle élastique.",
          "Fonction : fente latérale pour glisser des lunettes de soleil, disponible sur certains modèles.",
          "Personnalisation : broderie ou sérigraphie sur la bande avant, assortie à une maille intérieure noire ou en couleur.",
        ],
        faq: [
          {
            q: "Quelle est la commande minimale pour des visières personnalisées ?",
            a: "Notre commande minimale est de 50 pièces par couleur, pour commander un petit premier lot pour un club, un événement ou un test en boutique avant d'aller plus loin.",
          },
          {
            q: "Notre logo peut-il figurer sur la bande avant ?",
            a: "Oui — sans calotte pour gêner, la bande avant offre une surface large et nette, idéale pour la broderie ou la sérigraphie.",
          },
          {
            q: "Pourquoi choisir une visière plutôt qu'une casquette complète ?",
            a: "La calotte ouverte de la visière garde la tête plus fraîche qu'une casquette complète, et la fermeture — auto-agrippante ou double boucle élastique — s'ajuste facilement, ce qui en fait un choix populaire au golf, au tennis et en running.",
          },
        ],
      },
      de: {
        name: "Schirmmützen",
        h1: "Hersteller für individuelle Schirmmützen",
        metaDescription:
          "Individuelle Schirmmützen aus unserer Fabrik in Guangzhou — Mesh oder Stretch-Gewebe, offenes Kopfteil, Logo gestickt oder gedruckt. Ab 50 Stk pro Farbe.",
        intro: [
          "Eine Schirmmütze spendet Schatten wie eine Kappe, aber ohne geschlossenes Kopfteil — deshalb greifen Golf, Tennis, Laufsport und Event-Merchandise gerne darauf zurück: der Kopf bleibt kühler, und das gesamte Stirnband ist freie Fläche für ein Logo. Der Verschluss — Klettband oder eine doppelte Gummischlaufe — passt sich unterwegs schnell an unterschiedliche Kopfgrößen an. NanCrown fertigt Schirmmützen aus Mesh oder Stretch-Gewebe, vom einfachen offenen Band bis zum Sportmodell mit seitlichem Schlitz für eine Sonnenbrille.",
          "Da kein Kopfteil mit Ihrem Design konkurriert, nehmen Stirnband und Schirm Stickerei oder Druck sauber auf, und wir stimmen Mesh-Innenfutter und rückwärtigen Verschluss auf Ihre Farbpalette ab. Wir arbeiten mit Ihrer Logodatei, bestätigen das Modell mit einem Vorproduktionsmuster und fertigen direkt in unserer eigenen Fabrik in Guangzhou — Mindestbestellmenge 50 Stück pro Farbe, OEM/ODM-Aufträge willkommen.",
        ],
        customOptions: [
          "Material: Mesh, oder Stretch-Mix aus recyceltem Polyester und Elasthan.",
          "Konstruktion: offenes Stirnband mit gebogenem, stoffbezogenem Schirm.",
          "Verschluss: rückwärtiger Klettverschluss, oder Regler mit doppelter Gummischlaufe.",
          "Funktion: seitlicher Schlitz für eine Sonnenbrille, bei ausgewählten Modellen verfügbar.",
          "Veredelung: Stickerei oder Siebdruck auf dem Stirnband, abgestimmt auf schwarzes oder farbiges Mesh-Innenfutter.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestbestellmenge für individuelle Schirmmützen?",
            a: "Unsere Mindestbestellmenge liegt bei 50 Stück pro Farbe — genug für eine kleine erste Charge für einen Verein, ein Event oder einen Verkaufstest, bevor Sie mehr bestellen.",
          },
          {
            q: "Kann unser Logo auf das Stirnband?",
            a: "Ja — ohne Kopfteil im Weg ist das Stirnband eine breite, saubere Fläche für Stickerei oder Siebdruck.",
          },
          {
            q: "Warum eine Schirmmütze statt einer vollen Kappe wählen?",
            a: "Das offene Kopfteil der Schirmmütze hält den Kopf kühler als eine volle Kappe, und der Verschluss — Klett oder doppelte Gummischlaufe — lässt sich leicht anpassen, weshalb sie bei Golf, Tennis und Laufsport beliebt ist.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 5. Camp Caps
  // ────────────────────────────────────────────────────────────
  {
    slug: "camp-caps",
    categoryValue: "Camp Caps",
    content: {
      en: {
        name: "Camp Caps",
        h1: "Custom Camp Caps Manufacturer",
        metaDescription:
          "Custom camp caps from our Guangzhou factory — 5-panel low crown, flat brim, windproof woven fabric, functional flap pocket. MOQ 50 pcs per colour.",
        intro: [
          "Camp caps read as outdoor and heritage rather than sport, which is why outfitters, coffee brands and lifestyle labels reach for the style: a low 5-panel crown, a flat brim, and a build that looks at home next to a flannel shirt. NanCrown's camp cap carries a working flap pocket on the front panel — a detail that reads as tool, not logo, and gives you a second surface for branding beyond the crown.",
          "The windproof woven shell, metal eyelets and webbing strap adjuster are all part of the base build, ready for your embroidery, print, woven label or patch on the crown or the pocket flap. We work from your logo and colour references, confirm the build with a pre-production sample, and manufacture factory-direct in Guangzhou with a minimum of 50 pieces per colour — OEM/ODM welcome.",
        ],
        customOptions: [
          "Fabric: windproof woven shell built for a low, structured 5-panel crown.",
          "Construction: low crown with a flat brim, for a heritage outdoor silhouette.",
          "Detail: functional front flap pocket that opens and closes, an extra spot for a woven label.",
          "Hardware: metal eyelets on the side panels for ventilation and detail.",
          "Closure: webbing strap adjuster at the back, sized to fit most head sizes.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom camp caps?",
            a: "Our MOQ is 50 pieces per colour, a manageable size for a first run of a heritage or outdoor-styled cap.",
          },
          {
            q: "Can you brand the flap pocket as well as the crown?",
            a: "Yes — the pocket flap is a natural spot for a woven label or a small embroidered mark, in addition to embroidery or print on the crown.",
          },
          {
            q: "What makes a camp cap different from a baseball cap?",
            a: "A camp cap sits lower with a flat brim and a 5-panel construction, plus the front flap pocket — a more workwear-inspired build than a rounded 6-panel baseball cap.",
          },
        ],
      },
      es: {
        name: "Gorras Camp",
        h1: "Fabricante de gorras camp personalizadas",
        metaDescription:
          "Gorras camp personalizadas de fábrica en Guangzhou: 5 paneles, copa baja, visera plana, con bolsillo funcional. Mínimo 50 uds/color.",
        intro: [
          "La gorra camp transmite un aire outdoor y clásico más que deportivo, por eso las marcas de estilo de vida, cafeterías y tiendas de equipamiento la eligen: copa baja de 5 paneles, visera plana y una construcción que combina bien con una camisa de cuadros. La gorra camp de NanCrown lleva un bolsillo funcional con solapa en el panel frontal — un detalle que se lee como herramienta, no como logo, y da una segunda superficie para tu marca además de la copa.",
          "El tejido cortaviento, los ojetes metálicos y el ajustador de cincha trasero forman parte del modelo base, listos para tu bordado, estampado, etiqueta tejida o parche en la copa o en la solapa del bolsillo. Trabajamos a partir de tu logo y referencias de color, confirmamos el modelo con una muestra de preproducción y fabricamos en nuestra propia fábrica de Guangzhou, con un mínimo de 50 piezas por color — aceptamos OEM/ODM.",
        ],
        customOptions: [
          "Tejido: exterior cortaviento pensado para una copa de 5 paneles baja y estructurada.",
          "Construcción: copa baja con visera plana, para una silueta outdoor clásica.",
          "Detalle: bolsillo funcional con solapa en el panel frontal, un lugar extra para una etiqueta tejida.",
          "Herrería: ojetes metálicos en los paneles laterales para ventilación y detalle.",
          "Cierre: ajustador de cincha en la parte trasera, en talla única para la mayoría de cabezas.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo para gorras camp personalizadas?",
            a: "Nuestro pedido mínimo es de 50 piezas por color, un tamaño manejable para una primera producción de una gorra de estilo outdoor.",
          },
          {
            q: "¿Pueden personalizar la solapa del bolsillo además de la copa?",
            a: "Sí — la solapa del bolsillo es un lugar natural para una etiqueta tejida o un pequeño bordado, además del bordado o estampado en la copa.",
          },
          {
            q: "¿Qué diferencia una gorra camp de una gorra de béisbol?",
            a: "La gorra camp tiene una copa más baja de 5 paneles con visera plana, además del bolsillo frontal con solapa — una construcción de inspiración workwear, distinta a la copa redondeada de 6 paneles de una gorra de béisbol.",
          },
        ],
      },
      fr: {
        name: "Casquettes Camp",
        h1: "Fabricant de casquettes camp personnalisées",
        metaDescription:
          "Casquettes camp personnalisées, fabriquées à Guangzhou : 5 panneaux, visière plate, poche à rabat fonctionnelle. Min. 50 pièces/couleur.",
        intro: [
          "La casquette camp évoque l'outdoor et l'héritage plus que le sport, c'est pourquoi les marques lifestyle, les torréfacteurs et les équipementiers s'y intéressent : calotte basse à 5 panneaux, visière plate, une construction qui s'accorde avec une chemise en flanelle. La casquette camp de NanCrown porte une poche à rabat fonctionnelle sur le panneau avant — un détail qui se lit comme un outil, pas comme un logo, et offre une deuxième surface pour votre marque en plus de la calotte.",
          "Le tissu extérieur coupe-vent, les œillets métalliques et la sangle de réglage arrière font partie du modèle de base, prêts pour votre broderie, impression, étiquette tissée ou patch sur la calotte ou le rabat de la poche. Nous travaillons à partir de votre logo et de vos références de couleur, validons le modèle avec un échantillon de pré-production, et fabriquons en direct depuis notre usine de Guangzhou, commande minimale de 50 pièces par couleur — OEM/ODM bienvenus.",
        ],
        customOptions: [
          "Tissu : extérieur coupe-vent conçu pour une calotte 5 panneaux basse et structurée.",
          "Construction : calotte basse à visière plate, pour une silhouette outdoor intemporelle.",
          "Détail : poche à rabat fonctionnelle sur le panneau avant, un emplacement supplémentaire pour une étiquette tissée.",
          "Quincaillerie : œillets métalliques sur les panneaux latéraux, pour l'aération et le détail.",
          "Fermeture : sangle de réglage à l'arrière, taille unique adaptée à la plupart des tours de tête.",
        ],
        faq: [
          {
            q: "Quelle est la commande minimale pour des casquettes camp personnalisées ?",
            a: "Notre commande minimale est de 50 pièces par couleur, une quantité raisonnable pour une première production d'une casquette de style outdoor.",
          },
          {
            q: "Pouvez-vous personnaliser le rabat de la poche en plus de la calotte ?",
            a: "Oui — le rabat de la poche est un emplacement naturel pour une étiquette tissée ou une petite broderie, en plus de la broderie ou de l'impression sur la calotte.",
          },
          {
            q: "Quelle est la différence entre une casquette camp et une casquette de baseball ?",
            a: "La casquette camp a une calotte plus basse à 5 panneaux avec visière plate, plus la poche avant à rabat — une construction d'inspiration workwear, différente de la calotte arrondie à 6 panneaux d'une casquette de baseball.",
          },
        ],
      },
      de: {
        name: "Camp-Kappen",
        h1: "Hersteller für individuelle Camp-Kappen",
        metaDescription:
          "Individuelle Camp-Kappen aus unserer Fabrik in Guangzhou — 5-Panel, niedriges Kopfteil, funktionale Klappentasche. Ab 50 Stk/Farbe.",
        intro: [
          "Die Camp-Kappe wirkt eher outdoor- und heritage-geprägt als sportlich, weshalb Lifestyle-Marken, Kaffeeröstereien und Outdoor-Ausstatter gerne darauf zurückgreifen: niedriges 5-Panel-Kopfteil, flacher Schirm und eine Machart, die gut zu einem Flanellhemd passt. Die Camp-Kappe von NanCrown trägt eine funktionale Klappentasche auf dem Vorderpanel — ein Detail, das wie ein Werkzeug wirkt, nicht wie ein Logo, und Ihnen neben dem Kopfteil eine zweite Fläche fürs Branding gibt.",
          "Das winddichte Obermaterial, die Metallösen und der Gurtband-Verschluss hinten gehören zum Grundmodell und sind bereit für Ihre Stickerei, Ihren Druck, Ihr gewebtes Etikett oder Ihren Aufnäher auf Kopfteil oder Taschenklappe. Wir arbeiten mit Ihrer Logodatei und Ihren Farbvorgaben, bestätigen das Modell mit einem Vorproduktionsmuster und fertigen direkt in unserer eigenen Fabrik in Guangzhou — Mindestbestellmenge 50 Stück pro Farbe, OEM/ODM willkommen.",
        ],
        customOptions: [
          "Material: winddichtes Obergewebe für ein niedriges, strukturiertes 5-Panel-Kopfteil.",
          "Konstruktion: niedriges Kopfteil mit flachem Schirm, für eine klassische Outdoor-Silhouette.",
          "Detail: funktionale Klappentasche auf dem Vorderpanel, zusätzlicher Platz für ein gewebtes Etikett.",
          "Beschläge: Metallösen an den Seitenpanels für Belüftung und Optik.",
          "Verschluss: Gurtband-Verschluss hinten, One Size für die meisten Kopfgrößen.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestbestellmenge für individuelle Camp-Kappen?",
            a: "Unsere Mindestbestellmenge liegt bei 50 Stück pro Farbe — eine überschaubare Größe für eine erste Charge einer Outdoor-Kappe.",
          },
          {
            q: "Können Sie auch die Taschenklappe branden, nicht nur das Kopfteil?",
            a: "Ja — die Taschenklappe eignet sich hervorragend für ein gewebtes Etikett oder eine kleine Stickerei, zusätzlich zu Stickerei oder Druck auf dem Kopfteil.",
          },
          {
            q: "Was unterscheidet eine Camp-Kappe von einer Baseballkappe?",
            a: "Die Camp-Kappe sitzt niedriger, hat einen flachen Schirm und eine 5-Panel-Konstruktion plus die vordere Klappentasche — eine workwear-inspirierte Machart, anders als das gerundete 6-Panel-Kopfteil einer Baseballkappe.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 6. Running Caps
  // ────────────────────────────────────────────────────────────
  {
    slug: "running-caps",
    categoryValue: "Running Caps",
    content: {
      en: {
        name: "Running Caps",
        h1: "Custom Running Caps Manufacturer",
        metaDescription:
          "Custom running caps from our Guangzhou factory — lightweight stretch woven or nylon builds, elastic cord adjuster, blank front panel. MOQ 50 pcs/colour.",
        intro: [
          "A running cap has to disappear on the head — light fabric, a brim that won't fight the wind, and a closure that stays put through a race or a training block. NanCrown builds running caps in stretch woven polyester and lightweight nylon, from a soft roll-brim style to a longer-brim sport cap with side mesh windows that hold a pair of sunglasses.",
          "Both styles ship with a blank front panel, ready for your team crest, race logo or brand mark in embroidery or print. We work from your artwork and colour references, confirm the build with a pre-production sample, and produce factory-direct in Guangzhou with a minimum order of 50 pieces per colour — OEM/ODM orders welcome for clubs, race organizers and activewear brands alike.",
        ],
        customOptions: [
          "Fabric: lightweight stretch woven polyester, or quick-dry nylon woven.",
          "Brim: soft brim that rolls and recovers, or a longer brim for extra shade.",
          "Closure: elastic cord rear adjuster, with reflective trim available on select styles.",
          "Function: side mesh windows sized to hold sunglasses, available on select styles.",
          "Decoration: embroidery or screen printing on a blank front panel.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom running caps?",
            a: "Our MOQ is 50 pieces per colour, which suits a club kit run, a race-day order or a first activewear drop.",
          },
          {
            q: "Can you add our race or team logo to the front panel?",
            a: "Yes — the front panel ships blank on our base builds so we can add your embroidery or print in the position you specify.",
          },
          {
            q: "What performance details do the running caps include?",
            a: "Lightweight stretch woven or nylon fabric, a brim that rolls and recovers or runs longer for shade, and an elastic cord adjuster — one style also adds reflective trim and side mesh windows for sunglasses.",
          },
        ],
      },
      es: {
        name: "Gorras Running",
        h1: "Fabricante de gorras de running personalizadas",
        metaDescription:
          "Gorras de running personalizadas de fábrica en Guangzhou: tejido elástico o nylon ligero, ajustador de cordón. Mínimo 50 uds/color.",
        intro: [
          "Una gorra de running tiene que pasar desapercibida en la cabeza: tejido ligero, una visera que no haga resistencia al viento y un cierre que aguante toda una carrera o temporada de entrenamiento. En NanCrown fabricamos gorras de running en poliéster elástico y nylon ligero, desde un modelo de visera suave que se enrolla hasta una gorra deportiva de visera más larga con ventanas de malla laterales para sujetar unas gafas de sol.",
          "Ambos modelos salen con el panel frontal en blanco, listo para el escudo de tu equipo, el logo de la carrera o tu marca en bordado o estampado. Trabajamos a partir de tu diseño y referencias de color, confirmamos el modelo con una muestra de preproducción y fabricamos en nuestra propia fábrica de Guangzhou, con un pedido mínimo de 50 piezas por color — aceptamos pedidos OEM/ODM de clubes, organizadores de carreras y marcas deportivas.",
        ],
        customOptions: [
          "Tejido: poliéster elástico ligero, o nylon de secado rápido.",
          "Visera: visera suave que se enrolla y recupera su forma, o visera más larga para más sombra.",
          "Cierre: ajustador de cordón elástico trasero, con vivo reflectante disponible en modelos seleccionados.",
          "Función: ventanas de malla laterales para sujetar gafas de sol, disponibles en modelos seleccionados.",
          "Personalización: bordado o serigrafía sobre un panel frontal en blanco.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo para gorras de running personalizadas?",
            a: "Nuestro pedido mínimo es de 50 piezas por color, ideal para el kit de un club, un pedido para el día de la carrera o un primer lanzamiento deportivo.",
          },
          {
            q: "¿Pueden añadir el logo de nuestra carrera o equipo en el panel frontal?",
            a: "Sí — el panel frontal sale en blanco en nuestros modelos base para poder añadir tu bordado o estampado en la posición que indiques.",
          },
          {
            q: "¿Qué detalles de rendimiento incluyen las gorras de running?",
            a: "Tejido ligero elástico o de nylon, una visera que se enrolla y recupera su forma o una visera más larga para dar sombra, y un ajustador de cordón elástico — un modelo suma además vivo reflectante y ventanas de malla laterales para gafas de sol.",
          },
        ],
      },
      fr: {
        name: "Casquettes de Running",
        h1: "Fabricant de casquettes de running personnalisées",
        metaDescription:
          "Casquettes de running personnalisées, fabriquées à Guangzhou : tissu stretch ou nylon léger, cordon élastique réglable. Min. 50 pièces/couleur.",
        intro: [
          "Une casquette de running doit se faire oublier sur la tête : tissu léger, une visière qui ne résiste pas au vent, et une fermeture qui tient bon sur toute une course ou un cycle d'entraînement. NanCrown fabrique des casquettes de running en polyester stretch et en nylon léger, du modèle à visière souple qui s'enroule jusqu'à la casquette de sport à visière plus longue avec fenêtres en maille latérales pour glisser des lunettes de soleil.",
          "Les deux modèles sortent avec un panneau avant vierge, prêt pour l'écusson de votre équipe, le logo de la course ou votre marque, en broderie ou en impression. Nous travaillons à partir de votre visuel et de vos références de couleur, validons le modèle avec un échantillon de pré-production, et fabriquons en direct depuis notre usine de Guangzhou, commande minimale de 50 pièces par couleur — OEM/ODM bienvenus pour les clubs, organisateurs de courses et marques de sport.",
        ],
        customOptions: [
          "Tissu : polyester stretch léger, ou nylon à séchage rapide.",
          "Visière : visière souple qui s'enroule et reprend sa forme, ou visière plus longue pour plus d'ombre.",
          "Fermeture : cordon élastique réglable à l'arrière, liseré réfléchissant disponible sur certains modèles.",
          "Fonction : fenêtres en maille latérales pour glisser des lunettes de soleil, disponibles sur certains modèles.",
          "Personnalisation : broderie ou sérigraphie sur un panneau avant vierge.",
        ],
        faq: [
          {
            q: "Quelle est la commande minimale pour des casquettes de running personnalisées ?",
            a: "Notre commande minimale est de 50 pièces par couleur, adaptée à un kit de club, une commande pour le jour d'une course ou un premier lancement sport.",
          },
          {
            q: "Pouvez-vous ajouter le logo de notre course ou de notre équipe sur le panneau avant ?",
            a: "Oui — le panneau avant sort vierge sur nos modèles de base afin d'y ajouter votre broderie ou impression, à la position que vous indiquez.",
          },
          {
            q: "Quels détails techniques incluent les casquettes de running ?",
            a: "Un tissu léger stretch ou en nylon, une visière qui s'enroule et reprend sa forme ou une visière plus longue pour l'ombre, et un cordon élastique réglable — un modèle ajoute aussi un liseré réfléchissant et des fenêtres en maille latérales pour lunettes.",
          },
        ],
      },
      de: {
        name: "Running-Kappen",
        h1: "Hersteller für individuelle Running-Kappen",
        metaDescription:
          "Individuelle Running-Kappen aus unserer Fabrik in Guangzhou — leichtes Stretch-Gewebe oder Nylon, elastischer Kordelzug. Ab 50 Stk/Farbe.",
        intro: [
          "Eine Running-Kappe soll auf dem Kopf kaum auffallen — leichtes Material, ein Schirm, der dem Wind nicht viel Angriffsfläche bietet, und ein Verschluss, der über einen ganzen Lauf oder eine Trainingsphase hält. Der elastische Kordelzug am Hinterkopf passt sich unterwegs von selbst an, bei einem Modell zusätzlich mit reflektierendem Besatz für schlechte Sicht. NanCrown fertigt Running-Kappen aus Stretch-Polyester und leichtem Nylongewebe, vom weichen Roll-Schirm-Modell bis zur Sportkappe mit längerem Schirm und seitlichen Mesh-Fenstern für eine Sonnenbrille.",
          "Beide Modelle kommen mit unbedrucktem Vorderpanel, bereit für Ihr Vereinswappen, Ihr Race-Logo oder Ihre Marke per Stickerei oder Druck. Wir arbeiten mit Ihrer Vorlage und Ihren Farbvorgaben, bestätigen das Modell mit einem Vorproduktionsmuster und fertigen direkt in unserer eigenen Fabrik in Guangzhou — Mindestbestellmenge 50 Stück pro Farbe, OEM/ODM-Aufträge willkommen für Vereine, Veranstalter und Sportmarken.",
        ],
        customOptions: [
          "Material: leichtes Stretch-Polyester, oder schnelltrocknendes Nylongewebe.",
          "Schirm: weicher Schirm, der sich rollen lässt und die Form zurückgewinnt, oder ein längerer Schirm für mehr Schatten.",
          "Verschluss: elastischer Kordelzug hinten, bei ausgewählten Modellen mit reflektierendem Besatz.",
          "Funktion: seitliche Mesh-Fenster für eine Sonnenbrille, bei ausgewählten Modellen verfügbar.",
          "Veredelung: Stickerei oder Siebdruck auf dem unbedruckten Vorderpanel.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestbestellmenge für individuelle Running-Kappen?",
            a: "Unsere Mindestbestellmenge liegt bei 50 Stück pro Farbe — passend für eine Vereinsausstattung, eine Bestellung zum Renntag oder einen ersten Sportartikel-Drop.",
          },
          {
            q: "Können Sie unser Race- oder Vereinslogo auf das Vorderpanel bringen?",
            a: "Ja — das Vorderpanel bleibt bei unseren Grundmodellen unbedruckt, damit wir Ihre Stickerei oder Ihren Druck genau an der gewünschten Stelle anbringen können.",
          },
          {
            q: "Welche Funktionsdetails bieten die Running-Kappen?",
            a: "Leichtes Stretch- oder Nylongewebe, einen Schirm, der sich rollen lässt oder länger für mehr Schatten sorgt, sowie einen elastischen Kordelzug — ein Modell bietet zusätzlich reflektierenden Besatz und seitliche Mesh-Fenster für eine Sonnenbrille.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 7. Cadet Caps
  // ────────────────────────────────────────────────────────────
  {
    slug: "cadet-caps",
    categoryValue: "Cadet Caps",
    content: {
      en: {
        name: "Cadet Caps",
        h1: "Custom Cadet Caps Manufacturer",
        metaDescription:
          "Custom cadet caps from our Guangzhou factory — flat-top military silhouette, washed denim or cotton, appliqué lettering. MOQ 50 pcs per colour, OEM/ODM.",
        intro: [
          "The cadet cap's flat top and straight wall read military-inspired without trying too hard, which makes it a favourite for streetwear drops and heritage-leaning brands that want something other than a rounded crown. NanCrown builds cadet caps in washed denim and cotton, with a distressed brim that shows the fabric's texture rather than a clean factory edge.",
          "Raw-edge appliqué lettering with outline embroidery is the signature decoration on our base build, and it's a placeholder for your own wordmark or logo — swap the artwork and keep the construction. We work from your design files, confirm the fit and finish with a pre-production sample, and manufacture factory-direct in Guangzhou with a 50-piece-per-colour minimum — OEM/ODM welcome.",
        ],
        customOptions: [
          "Fabric: washed denim or garment-washed cotton, for a broken-in, worn look.",
          "Construction: flat military-style crown with a straight cap wall.",
          "Decoration: raw-edge appliqué lettering with outline embroidery on the front panel.",
          "Finish: distressed brim edge that shows the fabric's warp threads.",
          "Closure: adjustable strap sized to fit most head sizes.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom cadet caps?",
            a: "Our MOQ is 50 pieces per colour, a practical size for a streetwear drop or a first run of a heritage-styled cap.",
          },
          {
            q: "Can you replace the lettering with our own logo?",
            a: "Yes — the appliqué lettering on our base build is a placeholder. We rebuild it with your wordmark or logo, using the same raw-edge appliqué and outline embroidery technique.",
          },
          {
            q: "What gives the cadet cap its worn-in look?",
            a: "The washed denim or cotton fabric and a distressed brim edge that shows the warp threads underneath — both part of the base construction, not an added print effect.",
          },
        ],
      },
      es: {
        name: "Gorras Cadete",
        h1: "Fabricante de gorras cadete personalizadas",
        metaDescription:
          "Gorras cadete personalizadas de fábrica en Guangzhou: copa plana estilo militar, denim o algodón lavado, letras apliqué. Mínimo 50 uds/color.",
        intro: [
          "La copa plana y la pared recta de la gorra cadete tienen un aire militar sin resultar forzado, por eso es una favorita en colecciones urbanas y marcas de estilo clásico que buscan algo distinto a la copa redondeada. En NanCrown fabricamos gorras cadete en denim y algodón lavado, con una visera envejecida que muestra la textura del tejido en vez de un borde de fábrica limpio.",
          "Las letras de aplique de borde crudo con bordado de contorno son la decoración característica de nuestro modelo base, y funcionan como referencia para tu propio logo o texto — cambiamos el diseño y mantenemos la construcción. Trabajamos a partir de tus archivos de diseño, confirmamos el ajuste y el acabado con una muestra de preproducción y fabricamos en nuestra propia fábrica de Guangzhou, con un mínimo de 50 piezas por color — aceptamos OEM/ODM.",
        ],
        customOptions: [
          "Tejido: denim lavado o algodón lavado a prenda, para un aspecto desgastado y auténtico.",
          "Construcción: copa plana estilo militar con pared recta.",
          "Personalización: letras de aplique de borde crudo con bordado de contorno en el panel frontal.",
          "Acabado: borde de visera envejecido que deja ver los hilos de la trama del tejido.",
          "Cierre: correa ajustable en talla única para la mayoría de cabezas.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo para gorras cadete personalizadas?",
            a: "Nuestro pedido mínimo es de 50 piezas por color, un tamaño práctico para una colección urbana o una primera producción de estilo clásico.",
          },
          {
            q: "¿Pueden cambiar las letras por nuestro propio logo?",
            a: "Sí — las letras de aplique del modelo base son una referencia. Las rehacemos con tu texto o logo, usando la misma técnica de aplique de borde crudo y bordado de contorno.",
          },
          {
            q: "¿Qué le da a la gorra cadete ese aspecto desgastado?",
            a: "El tejido de denim o algodón lavado y el borde de la visera envejecido, que deja ver los hilos de la trama — ambos forman parte de la construcción base, no son un efecto de estampado añadido.",
          },
        ],
      },
      fr: {
        name: "Casquettes Cadet",
        h1: "Fabricant de casquettes cadet personnalisées",
        metaDescription:
          "Casquettes cadet personnalisées, fabriquées à Guangzhou : calotte plate style militaire, denim ou coton délavé. Min. 50 pièces/couleur.",
        intro: [
          "La calotte plate et la paroi droite de la casquette cadet évoquent le style militaire sans forcer le trait, ce qui en fait une favorite des collections streetwear et des marques au style intemporel qui cherchent autre chose qu'une calotte arrondie. NanCrown fabrique des casquettes cadet en denim et coton délavés, avec une visière vieillie qui laisse voir la texture du tissu plutôt qu'un bord d'usine trop net.",
          "Le lettrage appliqué à bord brut avec broderie de contour est la décoration signature de notre modèle de base, à utiliser comme repère pour votre propre texte ou logo — on change le visuel, on garde la construction. Nous travaillons à partir de vos fichiers de design, validons l'ajustement et la finition avec un échantillon de pré-production, et fabriquons en direct depuis notre usine de Guangzhou, commande minimale de 50 pièces par couleur — OEM/ODM bienvenus.",
        ],
        customOptions: [
          "Tissu : denim délavé ou coton délavé façon vêtement, pour un rendu porté et authentique.",
          "Construction : calotte plate façon militaire avec paroi droite.",
          "Personnalisation : lettrage appliqué à bord brut avec broderie de contour sur le panneau avant.",
          "Finition : bord de visière vieilli qui laisse apparaître les fils de trame du tissu.",
          "Fermeture : sangle réglable, taille unique adaptée à la plupart des tours de tête.",
        ],
        faq: [
          {
            q: "Quelle est la commande minimale pour des casquettes cadet personnalisées ?",
            a: "Notre commande minimale est de 50 pièces par couleur, une quantité pratique pour une collection streetwear ou une première production de style intemporel.",
          },
          {
            q: "Pouvez-vous remplacer le lettrage par notre propre logo ?",
            a: "Oui — le lettrage appliqué du modèle de base sert de repère. Nous le refaisons avec votre texte ou logo, avec la même technique d'appliqué à bord brut et de broderie de contour.",
          },
          {
            q: "Qu'est-ce qui donne à la casquette cadet son aspect porté ?",
            a: "Le tissu en denim ou coton délavé et le bord de visière vieilli qui laisse apparaître les fils de trame — les deux font partie de la construction de base, ce n'est pas un effet d'impression ajouté.",
          },
        ],
      },
      de: {
        name: "Cadet-Kappen",
        h1: "Hersteller für individuelle Cadet-Kappen",
        metaDescription:
          "Individuelle Cadet-Kappen aus unserer Fabrik in Guangzhou — flaches Militär-Kopfteil, gewaschener Denim oder Baumwolle. Ab 50 Stk/Farbe.",
        intro: [
          "Das flache Kopfteil und die gerade Seitenwand der Cadet-Kappe wirken militärisch inspiriert, ohne aufgesetzt zu sein — deshalb ist sie bei Streetwear-Drops und traditionsbewussten Marken beliebt, die etwas anderes als ein gerundetes Kopfteil suchen. NanCrown fertigt Cadet-Kappen aus gewaschenem Denim und Baumwolle, mit einem ausgewaschenen Schirmrand, der die Struktur des Stoffs statt einer glatten Fabrikkante zeigt.",
          "Applizierte Buchstaben mit Rohkante und Umriss-Stickerei sind die charakteristische Veredelung unseres Grundmodells und dienen als Platzhalter für Ihren eigenen Schriftzug oder Ihr Logo — das Design wird getauscht, die Konstruktion bleibt gleich. Wir arbeiten mit Ihren Designdateien, bestätigen Passform und Verarbeitung mit einem Vorproduktionsmuster und fertigen direkt in unserer eigenen Fabrik in Guangzhou — Mindestbestellmenge 50 Stück pro Farbe, OEM/ODM willkommen.",
        ],
        customOptions: [
          "Material: gewaschener Denim oder garment-washed Baumwolle, für einen getragenen, authentischen Look.",
          "Konstruktion: flaches, militärisch inspiriertes Kopfteil mit gerader Seitenwand.",
          "Veredelung: applizierte Buchstaben mit Rohkante und Umriss-Stickerei auf dem Vorderpanel.",
          "Finish: ausgewaschener Schirmrand, der die Kettfäden des Stoffs sichtbar macht.",
          "Verschluss: verstellbarer Riemen, One Size für die meisten Kopfgrößen.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestbestellmenge für individuelle Cadet-Kappen?",
            a: "Unsere Mindestbestellmenge liegt bei 50 Stück pro Farbe — eine praktische Größe für einen Streetwear-Drop oder eine erste Charge im traditionellen Stil.",
          },
          {
            q: "Können Sie die Buchstaben durch unser eigenes Logo ersetzen?",
            a: "Ja — die applizierten Buchstaben im Grundmodell dienen als Platzhalter. Wir setzen sie mit Ihrem Schriftzug oder Logo neu um, mit derselben Rohkanten-Applikation und Umriss-Stickerei.",
          },
          {
            q: "Was verleiht der Cadet-Kappe ihren getragenen Look?",
            a: "Der gewaschene Denim- oder Baumwollstoff und der ausgewaschene Schirmrand, der die Kettfäden zeigt — beides Teil der Grundkonstruktion, kein nachträglicher Druckeffekt.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 8. Outdoor Caps
  // ────────────────────────────────────────────────────────────
  {
    slug: "outdoor-caps",
    categoryValue: "Outdoor Caps",
    content: {
      en: {
        name: "Outdoor Caps",
        h1: "Custom Outdoor Caps Manufacturer",
        metaDescription:
          "Custom outdoor caps from our Guangzhou factory — water-repellent woven fabric, detachable neck shade, laser perforation venting. MOQ 50 pcs per colour.",
        intro: [
          "An outdoor cap has to work harder than a fashion cap — shade for the neck on the water or the trail, ventilation that doesn't trap heat, and a build that survives being packed away wet. NanCrown's outdoor cap is a 5-panel jet crown in matte water-repellent woven fabric, with graduated laser perforation down each side panel and a detachable neck shade for when the sun gets low.",
          "The neck shade comes off with a 3-point hook-and-loop attachment, so the same cap works as a full sun shield or a plain jet cap — either way, the front and side panels stay blank for your embroidery or print. We build from your logo and colour references, confirm the construction with a pre-production sample, and manufacture factory-direct in Guangzhou with a minimum of 50 pieces per colour — OEM/ODM welcome.",
        ],
        customOptions: [
          "Fabric: matte, water-repellent woven shell built for a soft-top 5-panel jet crown.",
          "Ventilation: graduated laser perforation running down each side panel, large to small.",
          "Function: detachable neck shade with a 3-point hook-and-loop attachment.",
          "Closure: rear drawcord with a barrel adjuster.",
          "Decoration: embroidery or screen printing on the front and side panels.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom outdoor caps?",
            a: "Our MOQ is 50 pieces per colour, workable for an outfitter's first seasonal run or a trail-event merchandise order.",
          },
          {
            q: "Can the neck shade be removed?",
            a: "Yes — it attaches with a 3-point hook-and-loop closure, so the cap works as a full sun shield or a plain jet cap depending on conditions.",
          },
          {
            q: "How does the cap stay ventilated in the heat?",
            a: "Graduated laser perforation runs down each side panel, large holes near the crown tapering to small ones lower down, paired with a water-repellent shell that still breathes.",
          },
        ],
      },
      es: {
        name: "Gorras Outdoor",
        h1: "Fabricante de gorras outdoor personalizadas",
        metaDescription:
          "Gorras outdoor personalizadas de fábrica en Guangzhou: tejido repelente al agua, protector de cuello desmontable. Mínimo 50 uds/color.",
        intro: [
          "Una gorra outdoor tiene que rendir más que una gorra de moda: sombra para el cuello en el agua o el sendero, ventilación que no atrape el calor y una construcción que aguante guardarse mojada. La gorra outdoor de NanCrown es una copa jet de 5 paneles en tejido mate repelente al agua, con perforación láser progresiva en cada panel lateral y un protector de cuello desmontable para cuando el sol pega bajo.",
          "El protector de cuello se quita con un cierre de velcro de 3 puntos, así que la misma gorra funciona como protección solar completa o como gorra jet sencilla — en ambos casos, los paneles frontal y laterales quedan en blanco para tu bordado o estampado. Fabricamos a partir de tu logo y referencias de color, confirmamos la construcción con una muestra de preproducción y producimos en nuestra propia fábrica de Guangzhou, con un mínimo de 50 piezas por color — aceptamos OEM/ODM.",
        ],
        customOptions: [
          "Tejido: exterior mate repelente al agua, pensado para una copa jet de 5 paneles de parte superior suave.",
          "Ventilación: perforación láser progresiva en cada panel lateral, de grande a pequeña.",
          "Función: protector de cuello desmontable con cierre de velcro de 3 puntos.",
          "Cierre: cordón trasero con regulador de tope.",
          "Personalización: bordado o serigrafía en los paneles frontal y laterales.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo para gorras outdoor personalizadas?",
            a: "Nuestro pedido mínimo es de 50 piezas por color, viable para la primera producción de temporada de una tienda de equipamiento o un pedido de merchandising para un evento de senderismo.",
          },
          {
            q: "¿Se puede quitar el protector de cuello?",
            a: "Sí — se sujeta con un cierre de velcro de 3 puntos, así que la gorra funciona como protección solar completa o como gorra jet sencilla según las condiciones.",
          },
          {
            q: "¿Cómo se mantiene ventilada la gorra con calor?",
            a: "La perforación láser progresiva recorre cada panel lateral, con orificios grandes cerca de la copa que se hacen más pequeños hacia abajo, combinada con un exterior repelente al agua que sigue transpirando.",
          },
        ],
      },
      fr: {
        name: "Casquettes Outdoor",
        h1: "Fabricant de casquettes outdoor personnalisées",
        metaDescription:
          "Casquettes outdoor personnalisées, fabriquées à Guangzhou : tissu déperlant, protège-nuque amovible. Min. 50 pièces/couleur.",
        intro: [
          "Une casquette outdoor doit en faire plus qu'une casquette mode : ombre sur la nuque sur l'eau ou sur le sentier, ventilation qui n'emprisonne pas la chaleur, et une construction qui supporte d'être rangée humide. La casquette outdoor de NanCrown est une calotte jet 5 panneaux en tissu mat déperlant, avec une perforation laser dégressive sur chaque panneau latéral et un protège-nuque amovible pour quand le soleil est bas.",
          "Le protège-nuque se détache grâce à une fixation auto-agrippante à 3 points, si bien que la même casquette fonctionne en protection solaire complète ou en simple casquette jet — dans les deux cas, les panneaux avant et latéraux restent vierges pour votre broderie ou impression. Nous fabriquons à partir de votre logo et de vos références de couleur, validons la construction avec un échantillon de pré-production, et fabriquons en direct depuis notre usine de Guangzhou, commande minimale de 50 pièces par couleur — OEM/ODM bienvenus.",
        ],
        customOptions: [
          "Tissu : extérieur mat déperlant, conçu pour une calotte jet 5 panneaux à sommet souple.",
          "Ventilation : perforation laser dégressive sur chaque panneau latéral, de grande à petite.",
          "Fonction : protège-nuque amovible avec fixation auto-agrippante à 3 points.",
          "Fermeture : cordon arrière avec bloqueur cylindrique.",
          "Personnalisation : broderie ou sérigraphie sur les panneaux avant et latéraux.",
        ],
        faq: [
          {
            q: "Quelle est la commande minimale pour des casquettes outdoor personnalisées ?",
            a: "Notre commande minimale est de 50 pièces par couleur, adaptée à une première production saisonnière pour un équipementier ou une commande de merchandising pour un événement outdoor.",
          },
          {
            q: "Le protège-nuque est-il amovible ?",
            a: "Oui — il se fixe par une attache auto-agrippante à 3 points, si bien que la casquette fonctionne en protection solaire complète ou en simple casquette jet selon les conditions.",
          },
          {
            q: "Comment la casquette reste-t-elle ventilée par forte chaleur ?",
            a: "Une perforation laser dégressive parcourt chaque panneau latéral, avec de grands trous près de la calotte qui rétrécissent vers le bas, associée à un tissu déperlant qui reste respirant.",
          },
        ],
      },
      de: {
        name: "Outdoor-Kappen",
        h1: "Hersteller für individuelle Outdoor-Kappen",
        metaDescription:
          "Individuelle Outdoor-Kappen aus unserer Fabrik in Guangzhou — wasserabweisendes Gewebe, abnehmbarer Nackenschutz. Ab 50 Stk/Farbe.",
        intro: [
          "Eine Outdoor-Kappe muss mehr leisten als eine Fashion-Kappe — Schatten für den Nacken auf dem Wasser oder dem Trail, Belüftung, die keine Hitze staut, und eine Machart, die auch nass eingepackt übersteht. Die Outdoor-Kappe von NanCrown ist ein 5-Panel-Jet-Kopfteil aus mattem, wasserabweisendem Gewebe, mit abgestufter Laserperforation an jedem Seitenpanel und einem abnehmbaren Nackenschutz für tiefstehende Sonne.",
          "Der Nackenschutz löst sich über eine 3-Punkt-Klettbefestigung, sodass dieselbe Kappe als voller Sonnenschutz oder als schlichte Jet-Kappe funktioniert — in beiden Fällen bleiben Vorder- und Seitenpanels unbedruckt für Ihre Stickerei oder Ihren Druck. Wir arbeiten mit Ihrer Logodatei und Ihren Farbvorgaben, bestätigen die Konstruktion mit einem Vorproduktionsmuster und fertigen direkt in unserer eigenen Fabrik in Guangzhou — Mindestbestellmenge 50 Stück pro Farbe, OEM/ODM willkommen.",
        ],
        customOptions: [
          "Material: mattes, wasserabweisendes Obergewebe für ein weiches 5-Panel-Jet-Kopfteil.",
          "Belüftung: abgestufte Laserperforation an jedem Seitenpanel, von groß zu klein.",
          "Funktion: abnehmbarer Nackenschutz mit 3-Punkt-Klettbefestigung.",
          "Verschluss: rückwärtiger Kordelzug mit Stopper.",
          "Veredelung: Stickerei oder Siebdruck auf Vorder- und Seitenpanels.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestbestellmenge für individuelle Outdoor-Kappen?",
            a: "Unsere Mindestbestellmenge liegt bei 50 Stück pro Farbe — machbar für die erste Saisoncharge eines Outdoor-Ausstatters oder eine Merchandise-Bestellung für ein Trail-Event.",
          },
          {
            q: "Lässt sich der Nackenschutz abnehmen?",
            a: "Ja — er ist mit einer 3-Punkt-Klettbefestigung angebracht, sodass die Kappe je nach Bedingungen als voller Sonnenschutz oder als schlichte Jet-Kappe funktioniert.",
          },
          {
            q: "Wie bleibt die Kappe bei Hitze belüftet?",
            a: "Eine abgestufte Laserperforation zieht sich über jedes Seitenpanel, mit großen Löchern nahe am Kopfteil, die nach unten kleiner werden, kombiniert mit einem wasserabweisenden, aber atmungsaktiven Obermaterial.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 9. Winter Hats
  // ────────────────────────────────────────────────────────────
  {
    slug: "winter-hats",
    categoryValue: "Winter Hats",
    content: {
      en: {
        name: "Winter Hats",
        h1: "Custom Winter Hats Manufacturer",
        metaDescription:
          "Custom winter hats from our Guangzhou factory — corduroy, faux fur trim or reversible fleece builds with earflaps. Embroidery/patch, MOQ 50 pcs/colour.",
        intro: [
          "Winter headwear is where NanCrown builds the most texture into a cap: wide-wale corduroy with a quilted sherpa lining, a baseball crown ringed in long-pile faux fur, or a reversible shell that flips from crinkle nylon to fleece depending on the weather. All three styles carry earflaps — some fold up or down, others wrap the back of the head in one piece.",
          "Every winter style is built to take your own branding, whether that's a script embroidered across the front panel or a small mark that sits quietly on a reversible shell. Note that any fur trim we use is faux fur only — no animal fur. We work from your logo and colour references, confirm the build with a pre-production sample, and manufacture factory-direct in Guangzhou with a minimum of 50 pieces per colour — OEM/ODM welcome.",
        ],
        customOptions: [
          "Fabric: wide-wale cotton corduroy with sherpa lining, or a reversible crinkle nylon and fleece shell.",
          "Trim: long-pile faux fur around the crown — faux fur only, no animal fur is used.",
          "Earflaps: fold-up or fold-down flaps, or a one-piece wraparound earflap ear to ear.",
          "Lining: quilted insulating lining for warmth.",
          "Decoration: embroidery or a woven patch on the front panel or crown, plus custom colourways.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom winter hats?",
            a: "Our MOQ is 50 pieces per colour, a practical size to test a winter style ahead of the cold-weather season.",
          },
          {
            q: "Is the fur trim real fur?",
            a: "No — any fur trim on our winter hats is faux fur only. We don't use animal fur on any product.",
          },
          {
            q: "What earflap styles do you offer?",
            a: "Two constructions: flaps that fold up for town or down for cold on a corduroy or faux-fur style, and a one-piece earflap that wraps ear to ear on our reversible trooper-style hat.",
          },
        ],
      },
      es: {
        name: "Gorros de Invierno",
        h1: "Fabricante de gorros de invierno personalizados",
        metaDescription:
          "Gorros de invierno personalizados de fábrica en Guangzhou: pana, ribete de pelo sintético o forro polar reversible con orejeras. Mínimo 50 uds/color.",
        intro: [
          "Los gorros de invierno son donde NanCrown mete más textura en una gorra: pana de canal ancho con forro sherpa acolchado, una copa de béisbol rodeada de pelo sintético de pelo largo, o un modelo reversible que pasa de nylon crujiente a forro polar según el clima. Los tres modelos llevan orejeras — unas se doblan hacia arriba o abajo, otras envuelven la parte trasera de la cabeza en una sola pieza.",
          "Cada modelo de invierno está pensado para llevar tu propia marca, ya sea un texto bordado en el panel frontal o una marca discreta en un modelo reversible. Ten en cuenta que cualquier ribete de pelo que usamos es pelo sintético únicamente — no usamos pelo de animal. Trabajamos a partir de tu logo y referencias de color, confirmamos el modelo con una muestra de preproducción y fabricamos en nuestra propia fábrica de Guangzhou, con un mínimo de 50 piezas por color — aceptamos OEM/ODM.",
        ],
        customOptions: [
          "Tejido: pana de algodón de canal ancho con forro sherpa, o exterior reversible de nylon crujiente y forro polar.",
          "Ribete: pelo sintético de pelo largo alrededor de la copa — solo pelo sintético, no se usa pelo de animal.",
          "Orejeras: solapas que se doblan hacia arriba o abajo, o una orejera de una pieza que envuelve de oreja a oreja.",
          "Forro: forro interior acolchado para dar calidez.",
          "Personalización: bordado o parche tejido en el panel frontal o la copa, además de combinaciones de color a medida.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo para gorros de invierno personalizados?",
            a: "Nuestro pedido mínimo es de 50 piezas por color, un tamaño práctico para probar un modelo de invierno antes de la temporada de frío.",
          },
          {
            q: "¿El ribete de pelo es pelo real?",
            a: "No — cualquier ribete de pelo en nuestros gorros de invierno es pelo sintético únicamente. No usamos pelo de animal en ningún producto.",
          },
          {
            q: "¿Qué estilos de orejeras ofrecen?",
            a: "Dos construcciones: solapas que se doblan hacia arriba para la ciudad o hacia abajo para el frío en el modelo de pana o pelo sintético, y una orejera de una pieza que envuelve de oreja a oreja en nuestro gorro reversible estilo trooper.",
          },
        ],
      },
      fr: {
        name: "Bonnets d'Hiver",
        h1: "Fabricant de bonnets d'hiver personnalisés",
        metaDescription:
          "Bonnets d'hiver personnalisés, fabriqués à Guangzhou : velours côtelé, bordure fausse fourrure ou polaire réversible. Min. 50 pièces/couleur.",
        intro: [
          "Le bonnet d'hiver est là où NanCrown apporte le plus de texture à une casquette : velours côtelé à grosses côtes avec doublure sherpa matelassée, calotte de baseball cerclée de fausse fourrure longue, ou modèle réversible qui passe du nylon froissé à la polaire selon le temps. Les trois modèles ont des cache-oreilles — certains se replient vers le haut ou le bas, d'autres enveloppent l'arrière de la tête en une seule pièce.",
          "Chaque modèle d'hiver est conçu pour porter votre propre marque, qu'il s'agisse d'un texte brodé sur le panneau avant ou d'une petite marque discrète sur un modèle réversible. À noter que toute bordure de fourrure que nous utilisons est en fausse fourrure uniquement — aucune fourrure animale. Nous travaillons à partir de votre logo et de vos références de couleur, validons le modèle avec un échantillon de pré-production, et fabriquons en direct depuis notre usine de Guangzhou, commande minimale de 50 pièces par couleur — OEM/ODM bienvenus.",
        ],
        customOptions: [
          "Tissu : velours côtelé en coton à grosses côtes avec doublure sherpa, ou extérieur réversible nylon froissé et polaire.",
          "Bordure : fausse fourrure longue autour de la calotte — fausse fourrure uniquement, aucune fourrure animale.",
          "Cache-oreilles : rabats repliables vers le haut ou le bas, ou cache-oreilles en une pièce enveloppant d'une oreille à l'autre.",
          "Doublure : doublure matelassée isolante pour la chaleur.",
          "Personnalisation : broderie ou patch tissé sur le panneau avant ou la calotte, plus des coloris personnalisés.",
        ],
        faq: [
          {
            q: "Quelle est la commande minimale pour des bonnets d'hiver personnalisés ?",
            a: "Notre commande minimale est de 50 pièces par couleur, une quantité pratique pour tester un modèle d'hiver avant la saison froide.",
          },
          {
            q: "La bordure de fourrure est-elle en fourrure véritable ?",
            a: "Non — toute bordure de fourrure sur nos bonnets d'hiver est en fausse fourrure uniquement. Nous n'utilisons de fourrure animale sur aucun produit.",
          },
          {
            q: "Quels styles de cache-oreilles proposez-vous ?",
            a: "Deux constructions : des rabats repliables vers le haut en ville ou vers le bas contre le froid sur nos modèles en velours côtelé ou fausse fourrure, et un cache-oreilles en une pièce qui enveloppe d'une oreille à l'autre sur notre bonnet réversible façon trooper.",
          },
        ],
      },
      de: {
        name: "Wintermützen",
        h1: "Hersteller für individuelle Wintermützen",
        metaDescription:
          "Individuelle Wintermützen aus unserer Fabrik in Guangzhou — Cord, Kunstfell-Besatz oder wendbares Fleece mit Ohrenklappen. Ab 50 Stk/Farbe.",
        intro: [
          "Bei Wintermützen steckt NanCrown die meiste Textur in eine Kappe: breitgerippter Cord mit gestepptem Sherpa-Futter, ein Baseball-Kopfteil umrandet von langem Kunstfell, oder eine wendbare Variante, die je nach Wetter von knisterndem Nylon auf Fleece wechselt. Alle drei Modelle haben Ohrenklappen — manche lassen sich hoch- oder herunterklappen, andere umschließen den Hinterkopf in einem Stück.",
          "Jedes Wintermodell ist für Ihr eigenes Branding ausgelegt, ob als Schriftzug quer über das Vorderpanel gestickt oder als kleines, dezentes Zeichen auf einer wendbaren Variante. Jeglicher Fellbesatz, den wir verwenden, ist ausschließlich Kunstfell — kein Tierfell. Wir arbeiten mit Ihrer Logodatei und Ihren Farbvorgaben, bestätigen das Modell mit einem Vorproduktionsmuster und fertigen direkt in unserer eigenen Fabrik in Guangzhou — Mindestbestellmenge 50 Stück pro Farbe, OEM/ODM willkommen.",
        ],
        customOptions: [
          "Material: breitgerippter Baumwollcord mit Sherpa-Futter, oder wendbares Obermaterial aus knisterndem Nylon und Fleece.",
          "Besatz: langes Kunstfell rund ums Kopfteil — ausschließlich Kunstfell, kein Tierfell.",
          "Ohrenklappen: hoch- oder herunterklappbare Klappen, oder eine einteilige Ohrenklappe von Ohr zu Ohr.",
          "Futter: gestepptes, isolierendes Innenfutter für Wärme.",
          "Veredelung: Stickerei oder gewebter Patch auf Vorderpanel oder Kopfteil, plus individuelle Farbkombinationen.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestbestellmenge für individuelle Wintermützen?",
            a: "Unsere Mindestbestellmenge liegt bei 50 Stück pro Farbe — eine praktische Größe, um ein Wintermodell vor der kalten Saison zu testen.",
          },
          {
            q: "Ist der Fellbesatz echtes Fell?",
            a: "Nein — jeglicher Fellbesatz an unseren Wintermützen ist ausschließlich Kunstfell. Wir verwenden bei keinem Produkt Tierfell.",
          },
          {
            q: "Welche Ohrenklappen-Stile bieten Sie an?",
            a: "Zwei Varianten: hoch- oder herunterklappbare Klappen auf unserem Cord- oder Kunstfell-Modell, und eine einteilige Ohrenklappe, die auf unserer wendbaren Trooper-Mütze von Ohr zu Ohr reicht.",
          },
        ],
      },
    },
  },
];

// 按 slug 查具体分类(找不到返回 undefined,页面里据此 notFound())
export function getCategoryDefinition(
  slug: string
): CategoryDefinition | undefined {
  return categoryDefinitions.find((c) => c.slug === slug);
}
