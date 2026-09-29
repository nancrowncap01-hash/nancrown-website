// 9 个「帽型分类落地页」(/custom/[category])的四语言文案数据源
// 目标:让海外 B2B 客户(品牌方/零售商/礼品公司/球队)搜"custom XX manufacturer/factory/wholesale"时能找到对应帽型的落地页
//
// 🔴 事实红线:只许用 ~/.claude/projects/-Users-martin-Claude-code/memory/reference_company_true_facts.md 里老板确认过的数据(2026-09-27 版):
//   - 起订 50 顶/色/款,同款可混色凑价格档;阶梯价(标准款 EXW 广州):50–99 $6.0–7.7 / 100–299 $5.5–6.7 / 300–499 $4.9–5.8 / 500+ $4.5–5.2
//   - 样品 7–15 天、$60–80/款(同款大货满 1000 顶退);大货样品确认后 25–30 天 + 物流时间;可报 DDP
//   - 能做的帽型和工艺以那份文件为准;没有任何认证,不许写;不许写 in-house / under one roof / 不外发
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
  | "winter-hats"
  | "dad-hats"
  | "snapback-hats"
  | "5-panel-caps"
  | "golf-caps"
  | "embroidered-caps"
  | "patch-hats"
  | "private-label-hats";

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
  "dad-hats",
  "snapback-hats",
  "5-panel-caps",
  "golf-caps",
  "embroidered-caps",
  "patch-hats",
  "private-label-hats",
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
  // 开头介绍,固定两小段(winter-hats 0930 补强成三段,见下面的联合类型)
  intro: [string, string] | [string, string, string];
  // 定制选项 4~6 条(winter-hats 0930 补强到 7 条)
  customOptions: string[];
  // FAQ 固定三条(winter-hats 0930 补强到 6 条,见下面的联合类型)
  faq:
    | [CategoryFaqItem, CategoryFaqItem, CategoryFaqItem]
    | [
        CategoryFaqItem,
        CategoryFaqItem,
        CategoryFaqItem,
        CategoryFaqItem,
        CategoryFaqItem,
        CategoryFaqItem,
      ];
}

export interface CategoryDefinition {
  slug: CategorySlug;
  // 对应 sample-data.ts 里 Product.category 的值,用来筛选该分类下的产品
  categoryValue: string;
  // 有值就按这个列表(顺序)显示产品;没有就照旧按 categoryValue 筛(0927 新增的 7 个细分页用这个字段)
  productSlugs?: string[];
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
  // /custom 总览页新增的"我们做的帽型"区块标题,链到分类页
  browseByStyleHeading: string;
  // /custom 总览页第二块"装饰工艺/贴牌"区块标题(0927 新增,链到 embroidered-caps/patch-hats/private-label-hats)
  decorationHeading: string;
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
    decorationHeading: "Decoration & Private Label",
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
    decorationHeading: "Decoración y marca propia",
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
    decorationHeading: "Décoration et marque propre",
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
    decorationHeading: "Veredelung & Private Label",
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
        metaDescription: "Custom bucket hats from our Guangzhou factory: cotton, denim, wool or sherpa builds, embroidery and custom inside labels. MOQ 50 pcs per colour, per design.",
        intro: [
          "Bucket hats move fast in streetwear, festival merch and sun-season retail, and NanCrown builds them in several directions: a low flat-top crown with a short brim, a wide gathered-crown sun hat, a frayed-edge denim bucket, and winter buckets in wool with fleece-lined earflaps. Each starts from a blank shell, so the finished hat carries only the branding you add.",
          "Trim and stitching do the styling work, from sherpa panels and piped contrast brims to rings of topstitching and frayed edges, and every surface is open for embroidery, printing, patches or a small raised logo. Inside, we sew in your own woven label. We confirm fit and construction on a pre-production sample in 7–15 days and produce from 50 pieces per colour, per design.",
        ],
        customOptions: [
          "Fabric: cotton twill, washed denim, polyester, wool, or sherpa and fleece trims.",
          "Crown & brim: low flat-top crown with a short brim, or a wide sun-hat brim.",
          "Trim: frayed edges, piped contrast brim, concentric topstitching or earflaps.",
          "Closure: adjustable chin cord with a toggle, or a removable webbing chin cord.",
          "Branding: embroidery, printing or patches outside, and your woven label inside.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom bucket hats?",
            a: "50 pieces per colour, per design, which is enough to test a colourway before committing to a larger run.",
          },
          {
            q: "Can you sew our own label inside the bucket hat?",
            a: "Yes. We sew in your woven label, and can add printed inside taping and hangtags for a complete private label finish.",
          },
          {
            q: "What bucket hat styles do you make?",
            a: "Low flat-top buckets, wide-brim sun hats, frayed-edge denim buckets and winter buckets in wool with fleece-lined earflaps, all built to your colours and branding.",
          },
        ],
      },
      es: {
        name: "Sombreros de Pescador",
        h1: "Fabricante de sombreros de pescador personalizados",
        metaDescription: "Gorros de pescador personalizados hechos en Guangzhou: algodón, denim, lana o sherpa, bordado y etiqueta interior propia. 50 uds. por color y diseño.",
        intro: [
          "Los gorros de pescador se mueven rápido en streetwear, merchandising de festivales y temporada de verano, y en NanCrown los fabricamos en varias líneas: copa baja de tapa plana con ala corta, sombrero de sol de ala ancha con copa fruncida, gorro de denim con bordes deshilachados y gorros de invierno de lana con orejeras forradas de forro polar. Todos parten de una base lisa, así que el gorro terminado solo lleva la marca que añadas.",
          "Los remates y pespuntes marcan el estilo, desde paneles de sherpa y alas con vivo en contraste hasta anillos de pespunte y bordes deshilachados, y toda la superficie admite bordado, estampado, parches o un pequeño logo en relieve. Por dentro cosemos tu propia etiqueta tejida. Confirmamos el ajuste y la construcción en una muestra de preproducción en 7–15 días y fabricamos desde 50 piezas por color y por diseño.",
        ],
        customOptions: [
          "Tejido: sarga de algodón, denim lavado, poliéster, lana, o remates de sherpa y forro polar.",
          "Copa y ala: copa baja de tapa plana con ala corta, o ala ancha tipo sombrero de sol.",
          "Remates: bordes deshilachados, ala con vivo en contraste, pespuntes concéntricos u orejeras.",
          "Cierre: cordón ajustable con tope, o cinta de barbilla desmontable.",
          "Marca: bordado, estampado o parches por fuera, y tu etiqueta tejida por dentro.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo de gorros de pescador personalizados?",
            a: "50 piezas por color y por diseño, suficiente para probar un color antes de comprometerte con una tirada mayor.",
          },
          {
            q: "¿Podéis coser nuestra propia etiqueta dentro del gorro?",
            a: "Sí. Cosemos tu etiqueta tejida y podemos añadir cinta interior estampada y etiquetas colgantes para un acabado completo de marca propia.",
          },
          {
            q: "¿Qué estilos de gorro de pescador fabricáis?",
            a: "Gorros de tapa plana, sombreros de sol de ala ancha, gorros de denim con bordes deshilachados y gorros de invierno de lana con orejeras forradas, todos con tus colores y tu marca.",
          },
        ],
      },
      fr: {
        name: "Bobs",
        h1: "Fabricant de bobs personnalisés",
        metaDescription: "Bobs personnalisés fabriqués à Guangzhou : coton, denim, laine ou sherpa, broderie et étiquette intérieure à votre marque. Dès 50 pièces par couleur et design.",
        intro: [
          "Le bob va vite en streetwear, en merch de festival et en saison estivale, et NanCrown le fabrique dans plusieurs directions : calotte basse à dessus plat avec bord court, chapeau de soleil à large bord et calotte froncée, bob en denim à bords effilochés et bobs d'hiver en laine avec oreillettes doublées polaire. Chacun part d'une base vierge, pour que le bob fini ne porte que la marque que vous ajoutez.",
          "Finitions et surpiqûres font le style, des empiècements sherpa et bords passepoilés contrastés aux cercles de surpiqûres et bords effilochés, et toute la surface accepte broderie, impression, écussons ou petit logo en relief. À l'intérieur, nous cousons votre propre étiquette tissée. Nous validons la tenue et la construction sur un échantillon de pré-production en 7 à 15 jours et produisons dès 50 pièces par couleur et par design.",
        ],
        customOptions: [
          "Tissu : sergé de coton, denim délavé, polyester, laine, ou finitions sherpa et polaire.",
          "Calotte et bord : calotte basse à dessus plat avec bord court, ou large bord façon chapeau de soleil.",
          "Finitions : bords effilochés, bord passepoilé contrasté, surpiqûres concentriques ou oreillettes.",
          "Fermeture : cordon réglable avec stoppeur, ou jugulaire amovible.",
          "Marque : broderie, impression ou écussons à l'extérieur, et votre étiquette tissée à l'intérieur.",
        ],
        faq: [
          {
            q: "Quel est le minimum de commande pour des bobs personnalisés ?",
            a: "50 pièces par couleur et par design, de quoi tester un coloris avant de passer à une série plus importante.",
          },
          {
            q: "Pouvez-vous coudre notre propre étiquette à l'intérieur du bob ?",
            a: "Oui. Nous cousons votre étiquette tissée et pouvons ajouter une ganse intérieure imprimée et des étiquettes volantes pour une finition complète en marque propre.",
          },
          {
            q: "Quels styles de bobs fabriquez-vous ?",
            a: "Bobs à dessus plat, chapeaux de soleil à large bord, bobs en denim à bords effilochés et bobs d'hiver en laine avec oreillettes doublées, tous à vos couleurs et à votre marque.",
          },
        ],
      },
      de: {
        name: "Fischerhüte",
        h1: "Hersteller für individuelle Fischerhüte",
        metaDescription: "Individuelle Fischerhüte aus Guangzhou: Baumwolle, Denim, Wolle oder Sherpa, Stickerei und eigenes Innenetikett. Ab 50 Stück pro Farbe und Design.",
        intro: [
          "Fischerhüte laufen schnell in Streetwear, Festival-Merch und Sommersaison, und NanCrown fertigt sie in mehreren Richtungen: niedrige Krone mit flachem Oberteil und kurzer Krempe, breitkrempiger Sonnenhut mit gerafftem Kopfteil, Denim-Fischerhut mit ausgefransten Kanten und Winter-Fischerhüte aus Wolle mit fleecegefütterten Ohrenklappen. Jeder startet als unbedruckte Basis, sodass der fertige Hut nur die Marke trägt, die Sie hinzufügen.",
          "Besätze und Steppungen prägen den Stil, von Sherpa-Einsätzen und paspelierten Kontrastkrempen bis zu Steppringen und ausgefransten Kanten, und jede Fläche eignet sich für Stickerei, Druck, Patches oder ein kleines erhabenes Logo. Innen nähen wir Ihr eigenes gewebtes Etikett ein. Passform und Aufbau bestätigen wir an einem Vorproduktionsmuster in 7–15 Tagen und produzieren ab 50 Stück pro Farbe und Design.",
        ],
        customOptions: [
          "Stoff: Baumwoll-Twill, gewaschener Denim, Polyester, Wolle oder Sherpa- und Fleecebesätze.",
          "Krone & Krempe: niedrige Krone mit flachem Oberteil und kurzer Krempe oder breite Sonnenhutkrempe.",
          "Besatz: ausgefranste Kanten, paspelierte Kontrastkrempe, konzentrische Steppung oder Ohrenklappen.",
          "Verschluss: verstellbare Kinnkordel mit Stopper oder abnehmbares Kinnband.",
          "Branding: Stickerei, Druck oder Patches außen, Ihr gewebtes Etikett innen.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestmenge für individuelle Fischerhüte?",
            a: "50 Stück pro Farbe und Design, genug, um eine Farbvariante zu testen, bevor Sie eine größere Serie bestellen.",
          },
          {
            q: "Können Sie unser eigenes Etikett in den Fischerhut nähen?",
            a: "Ja. Wir nähen Ihr gewebtes Etikett ein und ergänzen auf Wunsch bedrucktes Innenband und Hängeetiketten für ein komplettes Private-Label-Finish.",
          },
          {
            q: "Welche Fischerhut-Styles fertigen Sie?",
            a: "Fischerhüte mit flachem Oberteil, breitkrempige Sonnenhüte, Denim-Fischerhüte mit ausgefransten Kanten und Winter-Fischerhüte aus Wolle mit gefütterten Ohrenklappen, alle in Ihren Farben und mit Ihrer Marke.",
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
        metaDescription: "Custom running caps from our Guangzhou factory: quick-dry nylon or stretch woven, 5-panel options, laser-cut vents, reflective logos. MOQ 50 pcs per colour.",
        intro: [
          "A running cap has to disappear on the head: light fabric, a brim that won't fight the wind, and a closure that stays put through a race or a training block. NanCrown builds running caps in stretch woven polyester and quick-dry nylon, from a soft roll-brim style to 5-panel sport caps with a longer brim and side mesh windows that hold a pair of sunglasses.",
          "Performance details are built in to your spec: laser-cut ventilation holes, mesh panels, reflective prints and trim, and an elastic cord adjuster. Your team crest, race logo or brand mark goes on in embroidery, screen print or a reflective heat-transfer print. We confirm the build on a pre-production sample in 7–15 days and produce factory-direct in Guangzhou from 50 pieces per colour.",
        ],
        customOptions: [
          "Fabric: lightweight stretch woven polyester, or quick-dry nylon woven.",
          "Construction: soft running cap, or a 5-panel sport cap with a longer brim.",
          "Ventilation: laser-cut perforation holes or side mesh panels.",
          "Visibility: reflective prints and reflective trim.",
          "Closure: elastic cord rear adjuster with a toggle.",
          "Logo: embroidery, screen printing or reflective heat-transfer prints.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom running caps?",
            a: "Our MOQ is 50 pieces per colour, which suits a club kit run, a race-day order or a first activewear drop.",
          },
          {
            q: "Can you add laser-cut vents and reflective logos?",
            a: "Yes. Laser-cut ventilation holes, mesh panels and reflective prints or trim can all be added to your running cap design.",
          },
          {
            q: "Do you make 5-panel running caps?",
            a: "Yes. We build lightweight 5-panel sport caps in quick-dry nylon with a longer brim, alongside softer roll-brim running caps.",
          },
        ],
      },
      es: {
        name: "Gorras Running",
        h1: "Fabricante de gorras de running personalizadas",
        metaDescription: "Gorras de running personalizadas hechas en Guangzhou: nailon de secado rápido, 5 paneles, perforación láser y logos reflectantes. 50 uds. por color.",
        intro: [
          "Una gorra de running tiene que desaparecer en la cabeza: tejido ligero, una visera que no pelee con el viento y un cierre que no se mueva en toda una carrera o un bloque de entrenamiento. En NanCrown fabricamos gorras de running en poliéster elástico y nailon de secado rápido, desde un modelo suave de visera flexible hasta gorras deportivas de 5 paneles con visera más larga y ventanas laterales de malla que sujetan unas gafas de sol.",
          "Los detalles técnicos se hacen a tu medida: perforaciones láser de ventilación, paneles de malla, estampados y ribetes reflectantes, y un cordón elástico de ajuste. El escudo del equipo, el logo de la carrera o tu marca van bordados, serigrafiados o en transfer reflectante. Confirmamos la construcción en una muestra de preproducción en 7–15 días y fabricamos directamente en Guangzhou desde 50 piezas por color.",
        ],
        customOptions: [
          "Tejido: poliéster elástico ligero o nailon de secado rápido.",
          "Construcción: gorra de running suave, o gorra deportiva de 5 paneles con visera más larga.",
          "Ventilación: perforaciones láser o paneles laterales de malla.",
          "Visibilidad: estampados y ribetes reflectantes.",
          "Cierre: cordón elástico trasero con tope.",
          "Logo: bordado, serigrafía o transfer reflectante.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo de gorras de running personalizadas?",
            a: "Nuestro mínimo es de 50 piezas por color, ideal para la equipación de un club, un pedido para una carrera o un primer lanzamiento de ropa deportiva.",
          },
          {
            q: "¿Podéis añadir perforaciones láser y logos reflectantes?",
            a: "Sí. Podemos añadir a tu gorra perforaciones láser de ventilación, paneles de malla y estampados o ribetes reflectantes.",
          },
          {
            q: "¿Hacéis gorras de running de 5 paneles?",
            a: "Sí. Fabricamos gorras deportivas ligeras de 5 paneles en nailon de secado rápido con visera más larga, además de gorras de running suaves de visera flexible.",
          },
        ],
      },
      fr: {
        name: "Casquettes de Running",
        h1: "Fabricant de casquettes de running personnalisées",
        metaDescription: "Casquettes de running personnalisées fabriquées à Guangzhou : nylon séchage rapide, 5 panneaux, perforations laser, logos réfléchissants. 50 pièces par couleur.",
        intro: [
          "Une casquette de running doit se faire oublier : tissu léger, visière qui ne lutte pas contre le vent et fermeture qui ne bouge pas de toute une course ou d'un bloc d'entraînement. NanCrown fabrique des casquettes de running en polyester tissé extensible et en nylon séchage rapide, du modèle souple à visière qui se roule aux casquettes de sport 5 panneaux à visière plus longue, avec fenêtres latérales en filet pour tenir une paire de lunettes de soleil.",
          "Les détails techniques se font selon votre cahier des charges : micro-perforations laser d'aération, panneaux en filet, impressions et liserés réfléchissants, et cordon élastique de serrage. Le blason du club, le logo de la course ou votre marque sont brodés, sérigraphiés ou posés en transfert réfléchissant. Nous validons la construction sur un échantillon de pré-production en 7 à 15 jours et produisons en direct usine à Guangzhou dès 50 pièces par couleur.",
        ],
        customOptions: [
          "Tissu : polyester tissé extensible et léger, ou nylon tissé séchage rapide.",
          "Construction : casquette de running souple, ou casquette de sport 5 panneaux à visière plus longue.",
          "Aération : micro-perforations laser ou panneaux latéraux en filet.",
          "Visibilité : impressions et liserés réfléchissants.",
          "Fermeture : cordon élastique arrière avec stoppeur.",
          "Logo : broderie, sérigraphie ou transfert réfléchissant.",
        ],
        faq: [
          {
            q: "Quel est le minimum de commande pour des casquettes de running personnalisées ?",
            a: "Notre minimum est de 50 pièces par couleur, idéal pour l'équipement d'un club, une commande pour une course ou un premier drop de vêtements de sport.",
          },
          {
            q: "Pouvez-vous ajouter des perforations laser et des logos réfléchissants ?",
            a: "Oui. Micro-perforations laser, panneaux en filet et impressions ou liserés réfléchissants peuvent tous être ajoutés à votre casquette.",
          },
          {
            q: "Faites-vous des casquettes de running 5 panneaux ?",
            a: "Oui. Nous fabriquons des casquettes de sport 5 panneaux légères en nylon séchage rapide à visière plus longue, en plus des casquettes de running souples.",
          },
        ],
      },
      de: {
        name: "Running-Kappen",
        h1: "Hersteller für individuelle Running-Kappen",
        metaDescription: "Individuelle Running Caps aus Guangzhou: schnell trocknendes Nylon, 5-Panel, Laser-Lüftungslöcher, reflektierende Logos. Ab 50 Stück pro Farbe.",
        intro: [
          "Eine Running Cap soll man beim Laufen vergessen: leichter Stoff, ein Schirm, der nicht gegen den Wind arbeitet, und ein Verschluss, der über ein ganzes Rennen oder einen Trainingsblock hält. NanCrown fertigt Running Caps aus elastischem Polyester-Webstoff und schnell trocknendem Nylon, vom weichen Modell mit rollbarem Schirm bis zu 5-Panel-Sport-Caps mit längerem Schirm und seitlichen Netzfenstern, die eine Sonnenbrille halten.",
          "Funktionsdetails fertigen wir nach Ihren Vorgaben: Laser-Lüftungslöcher, Netzeinsätze, reflektierende Drucke und Paspeln sowie eine Gummikordel zur Weitenregulierung. Vereinswappen, Rennlogo oder Markenzeichen werden gestickt, im Siebdruck oder als reflektierender Transfer aufgebracht. Den Aufbau bestätigen wir an einem Vorproduktionsmuster in 7–15 Tagen und produzieren direkt ab Fabrik in Guangzhou ab 50 Stück pro Farbe.",
        ],
        customOptions: [
          "Stoff: leichter, elastischer Polyester-Webstoff oder schnell trocknendes Nylon.",
          "Aufbau: weiche Running Cap oder 5-Panel-Sport-Cap mit längerem Schirm.",
          "Belüftung: Laser-Lüftungslöcher oder seitliche Netzeinsätze.",
          "Sichtbarkeit: reflektierende Drucke und Paspeln.",
          "Verschluss: Gummikordel hinten mit Stopper.",
          "Logo: Stickerei, Siebdruck oder reflektierender Transfer.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestmenge für individuelle Running Caps?",
            a: "Unsere Mindestmenge liegt bei 50 Stück pro Farbe, passend für eine Vereinsausstattung, eine Bestellung zum Renntag oder den ersten Activewear-Drop.",
          },
          {
            q: "Können Sie Laser-Lüftungslöcher und reflektierende Logos einbauen?",
            a: "Ja. Laser-Lüftungslöcher, Netzeinsätze sowie reflektierende Drucke oder Paspeln lassen sich in Ihr Design einbauen.",
          },
          {
            q: "Fertigen Sie 5-Panel Running Caps?",
            a: "Ja. Neben weichen Running Caps mit rollbarem Schirm fertigen wir leichte 5-Panel-Sport-Caps aus schnell trocknendem Nylon mit längerem Schirm.",
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
          "Custom winter hats from 50 pcs per colour: corduroy, faux fur and fleece earflap caps, plus knitted beanies and earflap hats. Embroidery or patches.",
        intro: [
          "Winter headwear is where NanCrown builds the most texture into a cap: wide-wale corduroy with a quilted sherpa lining, a baseball crown ringed in long-pile faux fur, or a reversible shell that flips from crinkle nylon to fleece depending on the weather. All three styles carry earflaps — some fold up or down, others wrap the back of the head in one piece.",
          "Every winter style is built to take your own branding, whether that's a script embroidered across the front panel or a small mark that sits quietly on a reversible shell. Note that any fur trim we use is faux fur only — no animal fur. We work from your logo and colour references, confirm the build with a pre-production sample, and manufacture factory-direct in Guangzhou with a minimum of 50 pieces per colour — OEM/ODM welcome.",
          "We also supply knitted winter hats: plain or cuffed beanies and knitted earflap hats, with or without a pom-pom and braided ties, branded with a woven label, patch or embroidery. For hats that need to be in shops by December, plan about seven to eight weeks from the first sample to delivery by air: 7–15 days for the sample, 25–30 days for bulk after you approve it, then shipping.",
        ],
        customOptions: [
          "Fabric: wide-wale cotton corduroy with sherpa lining, or a reversible crinkle nylon and fleece shell.",
          "Trim: long-pile faux fur around the crown — faux fur only, no animal fur is used.",
          "Earflaps: fold-up or fold-down flaps, or a one-piece wraparound earflap ear to ear.",
          "Lining: quilted insulating lining for warmth.",
          "Decoration: embroidery or a woven patch on the front panel or crown, plus custom colourways.",
          "Knitted hats: plain or cuffed beanies and knitted earflap hats, with or without a pom-pom and braided ties.",
          "Branding on knitted hats: woven label, patch or embroidery.",
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
          {
            q: "Do you offer knitted beanies and earflap hats?",
            a: "Yes. Alongside our fabric earflap caps we supply knitted beanies and knitted earflap hats, with or without a pom-pom and braided ties. Send a reference photo and we will confirm the yarn, colours and branding.",
          },
          {
            q: "How much do custom winter hats cost?",
            a: "Winter hats are quoted per design, because the fabric, lining, trim and branding change the price. The sample is US$60–80 and is refunded once that design reaches 1,000 pieces in bulk.",
          },
          {
            q: "When should I order winter hats?",
            a: "Plan about seven to eight weeks from the first sample to delivery by air: 7–15 days for the sample, 25–30 days of bulk production after you approve it, then shipping. Sea freight adds several weeks.",
          },
        ],
      },
      es: {
        name: "Gorros de Invierno",
        h1: "Fabricante de gorros de invierno personalizados",
        metaDescription:
          "Gorros de invierno personalizados desde 50 uds/color: gorras con orejeras de pana, pelo sintético o forro polar, y gorros de punto. Bordado o parches.",
        intro: [
          "Los gorros de invierno son donde NanCrown mete más textura en una gorra: pana de canal ancho con forro sherpa acolchado, una copa de béisbol rodeada de pelo sintético de pelo largo, o un modelo reversible que pasa de nylon crujiente a forro polar según el clima. Los tres modelos llevan orejeras — unas se doblan hacia arriba o abajo, otras envuelven la parte trasera de la cabeza en una sola pieza.",
          "Cada modelo de invierno está pensado para llevar tu propia marca, ya sea un texto bordado en el panel frontal o una marca discreta en un modelo reversible. Ten en cuenta que cualquier ribete de pelo que usamos es pelo sintético únicamente — no usamos pelo de animal. Trabajamos a partir de tu logo y referencias de color, confirmamos el modelo con una muestra de preproducción y fabricamos en nuestra propia fábrica de Guangzhou, con un mínimo de 50 piezas por color — aceptamos OEM/ODM.",
          "También suministramos gorros de punto: gorros lisos o con vuelta y gorros de punto con orejeras, con o sin pompón y cordones trenzados, con tu marca en etiqueta tejida, parche o bordado. Si los gorros tienen que estar en tienda en diciembre, calcula unas siete u ocho semanas desde la primera muestra hasta la entrega por avión: 7–15 días para la muestra, 25–30 días de producción tras tu aprobación y después el envío.",
        ],
        customOptions: [
          "Tejido: pana de algodón de canal ancho con forro sherpa, o exterior reversible de nylon crujiente y forro polar.",
          "Ribete: pelo sintético de pelo largo alrededor de la copa — solo pelo sintético, no se usa pelo de animal.",
          "Orejeras: solapas que se doblan hacia arriba o abajo, o una orejera de una pieza que envuelve de oreja a oreja.",
          "Forro: forro interior acolchado para dar calidez.",
          "Personalización: bordado o parche tejido en el panel frontal o la copa, además de combinaciones de color a medida.",
          "Gorros de punto: gorros lisos o con vuelta y gorros de punto con orejeras, con o sin pompón y cordones trenzados.",
          "Marca en gorros de punto: etiqueta tejida, parche o bordado.",
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
          {
            q: "¿Ofrecen gorros de punto y gorros con orejeras?",
            a: "Sí. Además de nuestras gorras de tela con orejeras, suministramos gorros de punto y gorros de punto con orejeras, con o sin pompón y cordones trenzados. Envíanos una foto de referencia y te confirmaremos el hilo, los colores y la marca.",
          },
          {
            q: "¿Cuánto cuestan los gorros de invierno personalizados?",
            a: "Los gorros de invierno se presupuestan por diseño, porque el tejido, el forro, los ribetes y la marca cambian el precio. La muestra cuesta 60–80 US$ y se reembolsa cuando ese diseño llega a 1.000 piezas en producción.",
          },
          {
            q: "¿Cuándo debo pedir los gorros de invierno?",
            a: "Calcula unas siete u ocho semanas desde la primera muestra hasta la entrega por avión: 7–15 días para la muestra, 25–30 días de producción tras tu aprobación y después el envío. El transporte marítimo añade varias semanas.",
          },
        ],
      },
      fr: {
        name: "Bonnets d'Hiver",
        h1: "Fabricant de bonnets d'hiver personnalisés",
        metaDescription:
          "Bonnets d'hiver personnalisés dès 50 pièces/couleur : casquettes à cache-oreilles en velours, fausse fourrure ou polaire, et bonnets tricotés.",
        intro: [
          "Le bonnet d'hiver est là où NanCrown apporte le plus de texture à une casquette : velours côtelé à grosses côtes avec doublure sherpa matelassée, calotte de baseball cerclée de fausse fourrure longue, ou modèle réversible qui passe du nylon froissé à la polaire selon le temps. Les trois modèles ont des cache-oreilles — certains se replient vers le haut ou le bas, d'autres enveloppent l'arrière de la tête en une seule pièce.",
          "Chaque modèle d'hiver est conçu pour porter votre propre marque, qu'il s'agisse d'un texte brodé sur le panneau avant ou d'une petite marque discrète sur un modèle réversible. À noter que toute bordure de fourrure que nous utilisons est en fausse fourrure uniquement — aucune fourrure animale. Nous travaillons à partir de votre logo et de vos références de couleur, validons le modèle avec un échantillon de pré-production, et fabriquons en direct depuis notre usine de Guangzhou, commande minimale de 50 pièces par couleur — OEM/ODM bienvenus.",
          "Nous fournissons aussi des bonnets tricotés : bonnets simples ou à revers et bonnets tricotés à cache-oreilles, avec ou sans pompon et cordons tressés, marqués d'une étiquette tissée, d'un patch ou d'une broderie. Pour des bonnets en boutique en décembre, comptez environ sept à huit semaines entre le premier échantillon et la livraison par avion : 7 à 15 jours pour l'échantillon, 25 à 30 jours de production après votre validation, puis l'expédition.",
        ],
        customOptions: [
          "Tissu : velours côtelé en coton à grosses côtes avec doublure sherpa, ou extérieur réversible nylon froissé et polaire.",
          "Bordure : fausse fourrure longue autour de la calotte — fausse fourrure uniquement, aucune fourrure animale.",
          "Cache-oreilles : rabats repliables vers le haut ou le bas, ou cache-oreilles en une pièce enveloppant d'une oreille à l'autre.",
          "Doublure : doublure matelassée isolante pour la chaleur.",
          "Personnalisation : broderie ou patch tissé sur le panneau avant ou la calotte, plus des coloris personnalisés.",
          "Bonnets tricotés : bonnets simples ou à revers et bonnets tricotés à cache-oreilles, avec ou sans pompon et cordons tressés.",
          "Marquage des bonnets tricotés : étiquette tissée, patch ou broderie.",
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
          {
            q: "Proposez-vous des bonnets tricotés et des bonnets à cache-oreilles ?",
            a: "Oui. En plus de nos casquettes à cache-oreilles en tissu, nous fournissons des bonnets tricotés et des bonnets tricotés à cache-oreilles, avec ou sans pompon et cordons tressés. Envoyez-nous une photo de référence et nous vous confirmerons le fil, les couleurs et le marquage.",
          },
          {
            q: "Combien coûtent des bonnets d'hiver personnalisés ?",
            a: "Les bonnets d'hiver sont chiffrés modèle par modèle, car le tissu, la doublure, les finitions et le marquage font varier le prix. L'échantillon coûte 60 à 80 US$ et il est remboursé dès que ce modèle atteint 1 000 pièces en production.",
          },
          {
            q: "Quand faut-il commander des bonnets d'hiver ?",
            a: "Comptez environ sept à huit semaines entre le premier échantillon et la livraison par avion : 7 à 15 jours pour l'échantillon, 25 à 30 jours de production après votre validation, puis l'expédition. Le fret maritime ajoute plusieurs semaines.",
          },
        ],
      },
      de: {
        name: "Wintermützen",
        h1: "Hersteller für individuelle Wintermützen",
        metaDescription:
          "Individuelle Wintermützen ab 50 Stk/Farbe: Caps mit Ohrenklappen aus Cord, Kunstfell oder Fleece sowie Strickmützen. Stickerei oder Patches.",
        intro: [
          "Bei Wintermützen steckt NanCrown die meiste Textur in eine Kappe: breitgerippter Cord mit gestepptem Sherpa-Futter, ein Baseball-Kopfteil umrandet von langem Kunstfell, oder eine wendbare Variante, die je nach Wetter von knisterndem Nylon auf Fleece wechselt. Alle drei Modelle haben Ohrenklappen — manche lassen sich hoch- oder herunterklappen, andere umschließen den Hinterkopf in einem Stück.",
          "Jedes Wintermodell ist für Ihr eigenes Branding ausgelegt, ob als Schriftzug quer über das Vorderpanel gestickt oder als kleines, dezentes Zeichen auf einer wendbaren Variante. Jeglicher Fellbesatz, den wir verwenden, ist ausschließlich Kunstfell — kein Tierfell. Wir arbeiten mit Ihrer Logodatei und Ihren Farbvorgaben, bestätigen das Modell mit einem Vorproduktionsmuster und fertigen direkt in unserer eigenen Fabrik in Guangzhou — Mindestbestellmenge 50 Stück pro Farbe, OEM/ODM willkommen.",
          "Außerdem liefern wir Strickmützen: glatte Beanies oder Beanies mit Umschlag sowie gestrickte Mützen mit Ohrenklappen, mit oder ohne Bommel und geflochtene Bänder, gebrandet mit Webetikett, Patch oder Stickerei. Sollen die Mützen im Dezember im Laden sein, planen Sie vom ersten Muster bis zur Lieferung per Luftfracht etwa sieben bis acht Wochen: 7–15 Tage für das Muster, 25–30 Tage Produktion nach Ihrer Freigabe, danach der Versand.",
        ],
        customOptions: [
          "Material: breitgerippter Baumwollcord mit Sherpa-Futter, oder wendbares Obermaterial aus knisterndem Nylon und Fleece.",
          "Besatz: langes Kunstfell rund ums Kopfteil — ausschließlich Kunstfell, kein Tierfell.",
          "Ohrenklappen: hoch- oder herunterklappbare Klappen, oder eine einteilige Ohrenklappe von Ohr zu Ohr.",
          "Futter: gestepptes, isolierendes Innenfutter für Wärme.",
          "Veredelung: Stickerei oder gewebter Patch auf Vorderpanel oder Kopfteil, plus individuelle Farbkombinationen.",
          "Strickmützen: glatte Beanies oder Beanies mit Umschlag sowie gestrickte Mützen mit Ohrenklappen, mit oder ohne Bommel und geflochtene Bänder.",
          "Branding auf Strickmützen: Webetikett, Patch oder Stickerei.",
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
          {
            q: "Bieten Sie auch Strickmützen und Mützen mit Ohrenklappen an?",
            a: "Ja. Neben unseren Stoff-Caps mit Ohrenklappen liefern wir Strickmützen und gestrickte Mützen mit Ohrenklappen, mit oder ohne Bommel und geflochtene Bänder. Schicken Sie uns ein Referenzfoto, dann bestätigen wir Garn, Farben und Branding.",
          },
          {
            q: "Was kosten individuelle Wintermützen?",
            a: "Wintermützen kalkulieren wir pro Design, weil Material, Futter, Besatz und Branding den Preis verändern. Das Muster kostet 60–80 US$ und wird erstattet, sobald dieses Design 1.000 Stück in der Produktion erreicht.",
          },
          {
            q: "Wann sollte ich Wintermützen bestellen?",
            a: "Planen Sie vom ersten Muster bis zur Lieferung per Luftfracht etwa sieben bis acht Wochen: 7–15 Tage für das Muster, 25–30 Tage Produktion nach Ihrer Freigabe, danach der Versand. Seefracht dauert mehrere Wochen länger.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 10. Dad Hats
  // ────────────────────────────────────────────────────────────
  {
    slug: "dad-hats",
    categoryValue: "",
    productSlugs: [
      "two-tone-washed-dad-cap",
      "double-piping-washed-cap",
      "serif-wordmark-washed-cap",
      "gradient-bleached-denim-cap",
      "outline-letter-vintage-washed-cap",
      "raw-edge-letter-washed-cap",
      "studded-brim-pigment-cap",
      "ripped-piercing-denim-cap",
    ],
    content: {
      en: {
        name: "Dad Hats",
        h1: "Custom Dad Hats Manufacturer",
        metaDescription: "Custom dad hats from our Guangzhou factory: unstructured 6-panel, washed cotton or denim, embroidered logos. 50 pcs per colour, samples in 7–15 days.",
        intro: [
          "A dad hat lives or dies on its shape: an unstructured six-panel crown that sits low and soft, a curved brim, and a fabric that already looks broken in. NanCrown builds dad hats in garment-washed cotton twill, pigment-dyed cotton and washed denim, with finishes from a clean tonal wash to worn brim edges, gradient bleach and piping around the crown.",
          "Your logo goes on as satin-stitch, outline or 3D puff embroidery, raw-edge appliqué or a small patch, and the strap closes with an antique brass or silver slider in your finish. We confirm fit and wash on a pre-production sample in 7–15 days, then produce factory-direct in Guangzhou from 50 pieces per colour, with bulk ready 25–30 days after sample approval.",
        ],
        customOptions: [
          "Crown: unstructured 6-panel, low or mid profile, with a curved or near-flat brim.",
          "Fabric: garment-washed cotton twill, pigment-dyed cotton or washed denim.",
          "Finish: tonal wash, worn brim edges, gradient bleach, piping or a contrast brim.",
          "Logo: satin-stitch, outline or 3D puff embroidery, raw-edge appliqué or a small patch.",
          "Closure: self-fabric strap with an antique brass or silver metal slider.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom dad hats?",
            a: "50 pieces per colour, per style. Colours can be mixed within one style to reach the 100-piece price tier.",
          },
          {
            q: "How much does a custom dad hat cost?",
            a: "A standard 6-panel cotton cap with a flat embroidered logo is $6.0–7.7 per cap at 50–99 pieces and $4.5–5.2 at 500+, ex-works Guangzhou. Garment washing and special finishes are quoted per design.",
          },
          {
            q: "Can you match a vintage washed look?",
            a: "Send us a reference photo and we will develop the wash, colour and brim wear on a pre-production sample for you to approve before bulk production.",
          },
        ],
      },
      es: {
        name: "Dad Caps",
        h1: "Fabricante de dad caps personalizadas",
        metaDescription: "Dad caps personalizadas hechas en Guangzhou: 6 paneles sin estructura, algodón lavado o denim, logos bordados. 50 uds. por color, muestra en 7–15 días.",
        intro: [
          "Una dad cap depende de su forma: una copa de seis paneles sin estructura que queda baja y suave, una visera curva y un tejido que ya parece usado. En NanCrown fabricamos dad caps en sarga de algodón lavada, algodón teñido en pigmento y denim lavado, con acabados que van de un lavado tono sobre tono a bordes de visera gastados, degradados con lejía y vivos alrededor de la copa.",
          "Tu logo puede ir en bordado de satén, de contorno o 3D (puff), en aplicación de bordes crudos o en un parche pequeño, y la tira se cierra con una hebilla de latón envejecido o plateada. Confirmamos el ajuste y el lavado en una muestra de preproducción en 7–15 días y fabricamos directamente en Guangzhou desde 50 piezas por color, con la producción lista 25–30 días después de aprobar la muestra.",
        ],
        customOptions: [
          "Copa: 6 paneles sin estructura, perfil bajo o medio, con visera curva o casi plana.",
          "Tejido: sarga de algodón lavada, algodón teñido en pigmento o denim lavado.",
          "Acabado: lavado tono sobre tono, bordes gastados, degradado con lejía, vivos o visera en contraste.",
          "Logo: bordado de satén, de contorno o 3D (puff), aplicación de bordes crudos o parche pequeño.",
          "Cierre: tira del mismo tejido con hebilla metálica de latón envejecido o plateada.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo de dad caps personalizadas?",
            a: "50 piezas por color y por modelo. Puedes combinar colores dentro de un modelo para llegar al tramo de precio de 100 piezas.",
          },
          {
            q: "¿Cuánto cuesta una dad cap personalizada?",
            a: "Una gorra estándar de 6 paneles en algodón con logo bordado plano cuesta 6,0–7,7 USD por unidad en 50–99 piezas y 4,5–5,2 USD desde 500, en fábrica Guangzhou. El lavado de prenda y los acabados especiales se cotizan según el diseño.",
          },
          {
            q: "¿Podéis conseguir un aspecto vintage lavado?",
            a: "Envíanos una foto de referencia y desarrollaremos el lavado, el color y el desgaste de la visera en una muestra de preproducción para que la apruebes antes de producir.",
          },
        ],
      },
      fr: {
        name: "Dad Caps",
        h1: "Fabricant de dad caps personnalisées",
        metaDescription: "Dad caps personnalisées fabriquées à Guangzhou : 6 panneaux souples, coton délavé ou denim, logos brodés. 50 pièces par couleur, échantillon en 7 à 15 jours.",
        intro: [
          "Une dad cap tient tout à sa forme : une calotte six panneaux non structurée, basse et souple, une visière courbe et un tissu qui a déjà l'air porté. NanCrown fabrique des dad caps en sergé de coton délavé, en coton teint pigment et en denim délavé, avec des finitions allant du délavage ton sur ton aux bords de visière usés, en passant par le dégradé à la javel et le passepoil autour de la calotte.",
          "Votre logo peut être brodé au point lancé, en contour ou en 3D (puff), appliqué en bords bruts ou posé en petit écusson, et la sangle se ferme par une boucle en laiton vieilli ou argentée. Nous validons la tenue et le délavage sur un échantillon de pré-production en 7 à 15 jours, puis nous produisons en direct usine à Guangzhou dès 50 pièces par couleur, avec une série prête 25 à 30 jours après validation de l'échantillon.",
        ],
        customOptions: [
          "Calotte : 6 panneaux non structurée, profil bas ou moyen, visière courbe ou presque plate.",
          "Tissu : sergé de coton délavé, coton teint pigment ou denim délavé.",
          "Finition : délavage ton sur ton, bords usés, dégradé à la javel, passepoil ou visière contrastée.",
          "Logo : broderie au point lancé, en contour ou 3D (puff), appliqué bords bruts ou petit écusson.",
          "Fermeture : sangle en tissu avec boucle métallique en laiton vieilli ou argentée.",
        ],
        faq: [
          {
            q: "Quel est le minimum de commande pour des dad caps personnalisées ?",
            a: "50 pièces par couleur et par modèle. Vous pouvez mélanger les couleurs d'un modèle pour atteindre le palier de prix de 100 pièces.",
          },
          {
            q: "Combien coûte une dad cap personnalisée ?",
            a: "Une casquette standard 6 panneaux en coton avec un logo brodé à plat coûte 6,0–7,7 USD pièce pour 50–99 pièces et 4,5–5,2 USD dès 500, départ usine Guangzhou. Le délavage et les finitions spéciales sont chiffrés selon le design.",
          },
          {
            q: "Pouvez-vous reproduire un aspect vintage délavé ?",
            a: "Envoyez-nous une photo de référence : nous développons le délavage, la couleur et l'usure de la visière sur un échantillon de pré-production à valider avant la série.",
          },
        ],
      },
      de: {
        name: "Dad Caps",
        h1: "Hersteller für individuelle Dad Caps",
        metaDescription: "Individuelle Dad Caps aus Guangzhou: unstrukturierte 6-Panel, gewaschene Baumwolle oder Denim, gestickte Logos. 50 Stück pro Farbe, Muster in 7–15 Tagen.",
        intro: [
          "Bei einer Dad Cap kommt es auf die Form an: eine unstrukturierte Sechs-Panel-Krone, die tief und weich sitzt, ein gebogener Schirm und ein Stoff, der schon getragen wirkt. NanCrown fertigt Dad Caps aus garment-gewaschenem Baumwoll-Twill, pigmentgefärbter Baumwolle und gewaschenem Denim, mit Finishes von der Ton-in-Ton-Waschung über abgenutzte Schirmkanten und Bleichverläufe bis zu Paspeln rund um die Krone.",
          "Ihr Logo kommt als Satinstich-, Kontur- oder 3D-Puff-Stickerei, als Applikation mit offenen Kanten oder als kleiner Patch aufs Cap, und das Band schließt mit einer Schnalle in Altmessing oder Silber. Passform und Waschung bestätigen wir an einem Vorproduktionsmuster in 7–15 Tagen und produzieren dann direkt ab Fabrik in Guangzhou ab 50 Stück pro Farbe, mit fertiger Serie 25–30 Tage nach Musterfreigabe.",
        ],
        customOptions: [
          "Krone: unstrukturiertes 6-Panel, niedriges oder mittleres Profil, gebogener oder fast flacher Schirm.",
          "Stoff: garment-gewaschener Baumwoll-Twill, pigmentgefärbte Baumwolle oder gewaschener Denim.",
          "Finish: Ton-in-Ton-Waschung, abgenutzte Kanten, Bleichverlauf, Paspel oder Kontrastschirm.",
          "Logo: Satinstich-, Kontur- oder 3D-Puff-Stickerei, Applikation mit offenen Kanten oder kleiner Patch.",
          "Verschluss: Stoffband mit Metallschnalle in Altmessing oder Silber.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestmenge für individuelle Dad Caps?",
            a: "50 Stück pro Farbe und Modell. Farben innerhalb eines Modells lassen sich kombinieren, um die 100-Stück-Preisstufe zu erreichen.",
          },
          {
            q: "Was kostet eine individuelle Dad Cap?",
            a: "Eine Standard-6-Panel-Cap aus Baumwolle mit flach gesticktem Logo kostet 6,0–7,7 USD pro Stück bei 50–99 Stück und 4,5–5,2 USD ab 500, ab Werk Guangzhou. Garment-Waschung und Sonderfinishes kalkulieren wir je Design.",
          },
          {
            q: "Können Sie einen gewaschenen Vintage-Look treffen?",
            a: "Schicken Sie uns ein Referenzfoto: Wir entwickeln Waschung, Farbe und Schirmabnutzung an einem Vorproduktionsmuster, das Sie vor der Serie freigeben.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 11. Snapback Hats
  // ────────────────────────────────────────────────────────────
  {
    slug: "snapback-hats",
    categoryValue: "",
    productSlugs: [
      "souvenir-patch-snapback",
      "tire-stripe-mesh-trucker",
    ],
    content: {
      en: {
        name: "Snapback Hats",
        h1: "Custom Snapback Hats Manufacturer",
        metaDescription: "Custom snapback hats from our Guangzhou factory: structured crowns, flat or curved brims, 3D puff embroidery or patches, snap closure. From 50 pcs per colour.",
        intro: [
          "Snapbacks are built to hold their shape: a structured front, a flat or lightly curved brim and an adjustable plastic snap at the back. NanCrown makes snapbacks as 5-panel and 6-panel caps and as mesh-back truckers, with multi-row brim topstitching and snaps colour-matched to the cap.",
          "The front panel is where your brand does the talking: 3D puff or flat embroidery, woven, leather or PVC patches, printed artwork, or a souvenir-style patch with a rope across the brim. We confirm the build on a pre-production sample in 7–15 days and produce factory-direct in Guangzhou from 50 pieces per colour, with bulk ready 25–30 days after approval.",
        ],
        customOptions: [
          "Construction: structured 5-panel or 6-panel crown, or a trucker build with a mesh back.",
          "Brim: flat or lightly curved, with multi-row topstitching.",
          "Closure: plastic snapback, colour-matched to the cap.",
          "Front: 3D puff or flat embroidery, woven, leather or PVC patches, or printed artwork.",
          "Trim: a rope across the brim, or embroidery on the brim and side panels.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom snapbacks?",
            a: "50 pieces per colour, per style. You can mix colours within one style to reach the 100-piece price tier.",
          },
          {
            q: "Can you do 3D puff embroidery on a snapback?",
            a: "Yes. Raised 3D puff embroidery works well on a structured snapback front, and flat embroidery and patches are available too.",
          },
          {
            q: "How long does a custom snapback order take?",
            a: "About 7–15 days for the sample and 25–30 days for bulk production after you approve it, plus shipping time.",
          },
        ],
      },
      es: {
        name: "Gorras Snapback",
        h1: "Fabricante de gorras snapback personalizadas",
        metaDescription: "Gorras snapback personalizadas hechas en Guangzhou: copa estructurada, visera plana o curva, bordado 3D o parches. Desde 50 uds. por color.",
        intro: [
          "Las snapbacks están hechas para mantener la forma: frontal estructurado, visera plana o ligeramente curva y un broche de plástico ajustable detrás. En NanCrown fabricamos snapbacks de 5 y 6 paneles y truckers con malla trasera, con pespuntes en varias filas en la visera y broches del mismo color que la gorra.",
          "El frontal es donde habla tu marca: bordado 3D (puff) o plano, parches tejidos, de cuero o de PVC, estampados o un parche tipo souvenir con cordón sobre la visera. Confirmamos la construcción en una muestra de preproducción en 7–15 días y fabricamos directamente en Guangzhou desde 50 piezas por color, con la producción lista 25–30 días después de la aprobación.",
        ],
        customOptions: [
          "Construcción: copa estructurada de 5 o 6 paneles, o trucker con malla trasera.",
          "Visera: plana o ligeramente curva, con pespuntes en varias filas.",
          "Cierre: broche de plástico (snapback) del mismo color que la gorra.",
          "Frontal: bordado 3D (puff) o plano, parches tejidos, de cuero o PVC, o estampado.",
          "Detalles: cordón sobre la visera, o bordados en la visera y los laterales.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo de snapbacks personalizadas?",
            a: "50 piezas por color y por modelo. Puedes combinar colores dentro de un modelo para llegar al tramo de precio de 100 piezas.",
          },
          {
            q: "¿Hacéis bordado 3D (puff) en snapbacks?",
            a: "Sí. El bordado 3D en relieve queda muy bien en un frontal estructurado, y también ofrecemos bordado plano y parches.",
          },
          {
            q: "¿Cuánto tarda un pedido de snapbacks personalizadas?",
            a: "Unos 7–15 días para la muestra y 25–30 días de producción después de tu aprobación, más el tiempo de envío.",
          },
        ],
      },
      fr: {
        name: "Casquettes Snapback",
        h1: "Fabricant de casquettes snapback personnalisées",
        metaDescription: "Casquettes snapback personnalisées fabriquées à Guangzhou : calotte structurée, visière plate ou courbe, broderie 3D ou écussons. Dès 50 pièces par couleur.",
        intro: [
          "Les snapbacks sont faites pour garder leur forme : un devant structuré, une visière plate ou légèrement courbe et une fermeture à pression réglable à l'arrière. NanCrown fabrique des snapbacks 5 et 6 panneaux ainsi que des truckers à dos en filet, avec des surpiqûres multiples sur la visière et des pressions assorties à la casquette.",
          "Le devant, c'est là que votre marque s'exprime : broderie 3D (puff) ou à plat, écussons tissés, en cuir ou en PVC, impression, ou écusson façon souvenir avec une cordelette sur la visière. Nous validons la construction sur un échantillon de pré-production en 7 à 15 jours et produisons en direct usine à Guangzhou dès 50 pièces par couleur, avec une série prête 25 à 30 jours après validation.",
        ],
        customOptions: [
          "Construction : calotte structurée 5 ou 6 panneaux, ou trucker à dos en filet.",
          "Visière : plate ou légèrement courbe, avec surpiqûres multiples.",
          "Fermeture : pression plastique (snapback) assortie à la casquette.",
          "Devant : broderie 3D (puff) ou à plat, écussons tissés, cuir ou PVC, ou impression.",
          "Détails : cordelette sur la visière, ou broderies sur la visière et les côtés.",
        ],
        faq: [
          {
            q: "Quel est le minimum de commande pour des snapbacks personnalisées ?",
            a: "50 pièces par couleur et par modèle. Vous pouvez mélanger les couleurs d'un modèle pour atteindre le palier de prix de 100 pièces.",
          },
          {
            q: "Faites-vous de la broderie 3D (puff) sur une snapback ?",
            a: "Oui. La broderie 3D en relief rend très bien sur un devant de snapback structuré, et la broderie à plat et les écussons sont aussi possibles.",
          },
          {
            q: "Combien de temps prend une commande de snapbacks personnalisées ?",
            a: "Environ 7 à 15 jours pour l'échantillon et 25 à 30 jours de production après votre validation, plus le délai de transport.",
          },
        ],
      },
      de: {
        name: "Snapback Caps",
        h1: "Hersteller für individuelle Snapback Caps",
        metaDescription: "Individuelle Snapback Caps aus Guangzhou: strukturierte Krone, flacher oder gebogener Schirm, 3D-Stickerei oder Patches. Ab 50 Stück pro Farbe.",
        intro: [
          "Snapbacks sind dafür gemacht, ihre Form zu halten: eine strukturierte Front, ein flacher oder leicht gebogener Schirm und ein verstellbarer Kunststoff-Druckverschluss hinten. NanCrown fertigt Snapbacks als 5- und 6-Panel-Caps und als Trucker mit Netzrücken, mit mehrreihiger Schirmsteppung und farblich passendem Verschluss.",
          "Auf der Front spricht Ihre Marke: 3D-Puff- oder Flachstickerei, gewebte, Leder- oder PVC-Patches, Druck oder ein Souvenir-Patch mit Kordel über dem Schirm. Den Aufbau bestätigen wir an einem Vorproduktionsmuster in 7–15 Tagen und produzieren direkt ab Fabrik in Guangzhou ab 50 Stück pro Farbe, mit fertiger Serie 25–30 Tage nach Freigabe.",
        ],
        customOptions: [
          "Aufbau: strukturierte 5- oder 6-Panel-Krone oder Trucker mit Netzrücken.",
          "Schirm: flach oder leicht gebogen, mit mehrreihiger Steppung.",
          "Verschluss: Kunststoff-Snapback in Capfarbe.",
          "Front: 3D-Puff- oder Flachstickerei, gewebte, Leder- oder PVC-Patches oder Druck.",
          "Details: Kordel über dem Schirm oder Stickerei auf Schirm und Seitenteilen.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestmenge für individuelle Snapbacks?",
            a: "50 Stück pro Farbe und Modell. Farben innerhalb eines Modells lassen sich kombinieren, um die 100-Stück-Preisstufe zu erreichen.",
          },
          {
            q: "Machen Sie 3D-Puff-Stickerei auf Snapbacks?",
            a: "Ja. Erhabene 3D-Puff-Stickerei wirkt auf einer strukturierten Snapback-Front besonders gut, Flachstickerei und Patches sind ebenfalls möglich.",
          },
          {
            q: "Wie lange dauert eine Snapback-Bestellung?",
            a: "Etwa 7–15 Tage für das Muster und 25–30 Tage Serienproduktion nach Ihrer Freigabe, zuzüglich Transportzeit.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 12. 5-Panel Caps
  // ────────────────────────────────────────────────────────────
  {
    slug: "5-panel-caps",
    categoryValue: "",
    productSlugs: [
      "utility-pocket-camp-cap",
      "souvenir-patch-snapback",
      "sunglass-slot-long-brim-sport-cap",
    ],
    content: {
      en: {
        name: "5-Panel Caps",
        h1: "Custom 5-Panel Caps Manufacturer",
        metaDescription: "Custom 5-panel caps made in Guangzhou: camp, snapback and sport styles in cotton, nylon or quick-dry fabric. Embroidery or patches, from 50 pcs per colour.",
        intro: [
          "A 5-panel cap has one wide front panel with no centre seam, which makes it a favourite for logos, patches and clean graphics. NanCrown builds 5-panel caps as low camp caps with a flat brim, as structured snapbacks, and as lightweight sport caps in quick-dry nylon with side mesh and a long brim.",
          "Choose the fabric, brim and closure, and we build around your branding: flat or 3D puff embroidery, woven or leather patches, printing, or details such as a front flap pocket. We confirm the build on a pre-production sample in 7–15 days and produce factory-direct in Guangzhou from 50 pieces per colour, with bulk ready 25–30 days after approval.",
        ],
        customOptions: [
          "Style: low-profile camp cap, structured snapback or lightweight sport cap.",
          "Fabric: cotton twill, nylon or quick-dry woven performance fabric.",
          "Brim: flat, curved, or long for extra shade.",
          "Closure: webbing strap, snapback, or elastic cord with a toggle.",
          "Details: flap pocket, side mesh windows, metal eyelets or reflective trim.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom 5-panel caps?",
            a: "50 pieces per colour, per style. Colours can be mixed within one style to reach the 100-piece price tier.",
          },
          {
            q: "Can you make 5-panel caps in nylon for outdoor or running brands?",
            a: "Yes. We build lightweight 5-panel sport caps in quick-dry nylon, with options such as side mesh, a long brim and reflective details.",
          },
          {
            q: "What decoration works best on a 5-panel cap?",
            a: "The seamless front panel suits patches, flat or 3D puff embroidery and printed logos, because the artwork is not split by a centre seam.",
          },
        ],
      },
      es: {
        name: "Gorras de 5 Paneles",
        h1: "Fabricante de gorras de 5 paneles personalizadas",
        metaDescription: "Gorras de 5 paneles personalizadas hechas en Guangzhou: camp, snapback o deportivas en algodón, nailon o tejido técnico. Desde 50 uds. por color.",
        intro: [
          "Una gorra de 5 paneles tiene un frontal ancho sin costura central, por eso es la favorita para logos, parches y gráficos limpios. En NanCrown fabricamos gorras de 5 paneles como camp caps de perfil bajo con visera plana, como snapbacks estructuradas y como gorras deportivas ligeras en nailon de secado rápido con malla lateral y visera larga.",
          "Elige tejido, visera y cierre, y construimos la gorra alrededor de tu marca: bordado plano o 3D (puff), parches tejidos o de cuero, estampados o detalles como un bolsillo con solapa en el frontal. Confirmamos la construcción en una muestra de preproducción en 7–15 días y fabricamos en Guangzhou desde 50 piezas por color, con la producción lista 25–30 días después de la aprobación.",
        ],
        customOptions: [
          "Estilo: camp cap de perfil bajo, snapback estructurada o gorra deportiva ligera.",
          "Tejido: sarga de algodón, nailon o tejido técnico de secado rápido.",
          "Visera: plana, curva o larga para dar más sombra.",
          "Cierre: cinta con hebilla, snapback o cordón elástico con tope.",
          "Detalles: bolsillo con solapa, ventanas laterales de malla, ojales metálicos o ribetes reflectantes.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo de gorras de 5 paneles?",
            a: "50 piezas por color y por modelo. Puedes combinar colores dentro de un modelo para llegar al tramo de precio de 100 piezas.",
          },
          {
            q: "¿Hacéis gorras de 5 paneles en nailon para marcas outdoor o de running?",
            a: "Sí. Fabricamos gorras deportivas ligeras de 5 paneles en nailon de secado rápido, con opciones como malla lateral, visera larga y detalles reflectantes.",
          },
          {
            q: "¿Qué decoración funciona mejor en una gorra de 5 paneles?",
            a: "El frontal sin costura central es ideal para parches, bordado plano o 3D y logos estampados, porque el diseño no queda partido por una costura.",
          },
        ],
      },
      fr: {
        name: "Casquettes 5 Panneaux",
        h1: "Fabricant de casquettes 5 panneaux personnalisées",
        metaDescription: "Casquettes 5 panneaux personnalisées fabriquées à Guangzhou : camp, snapback ou sport, en coton, nylon ou tissu technique. Dès 50 pièces par couleur.",
        intro: [
          "Une casquette 5 panneaux a un large panneau avant sans couture centrale, ce qui en fait la favorite pour les logos, les écussons et les graphismes nets. NanCrown fabrique des casquettes 5 panneaux en camp cap à profil bas et visière plate, en snapback structurée et en casquette de sport légère en nylon séchage rapide avec filet latéral et longue visière.",
          "Choisissez le tissu, la visière et la fermeture, et nous construisons la casquette autour de votre marque : broderie à plat ou 3D (puff), écussons tissés ou en cuir, impression, ou détails comme une poche à rabat sur le devant. Nous validons la construction sur un échantillon de pré-production en 7 à 15 jours et produisons à Guangzhou dès 50 pièces par couleur, avec une série prête 25 à 30 jours après validation.",
        ],
        customOptions: [
          "Style : camp cap à profil bas, snapback structurée ou casquette de sport légère.",
          "Tissu : sergé de coton, nylon ou tissu technique séchage rapide.",
          "Visière : plate, courbe ou longue pour plus d'ombre.",
          "Fermeture : sangle, snapback ou cordon élastique avec stoppeur.",
          "Détails : poche à rabat, fenêtres latérales en filet, œillets métalliques ou liseré réfléchissant.",
        ],
        faq: [
          {
            q: "Quel est le minimum de commande pour des casquettes 5 panneaux ?",
            a: "50 pièces par couleur et par modèle. Vous pouvez mélanger les couleurs d'un modèle pour atteindre le palier de prix de 100 pièces.",
          },
          {
            q: "Faites-vous des 5 panneaux en nylon pour les marques outdoor ou running ?",
            a: "Oui. Nous fabriquons des casquettes de sport 5 panneaux légères en nylon séchage rapide, avec en option filet latéral, longue visière et détails réfléchissants.",
          },
          {
            q: "Quelle décoration convient le mieux à une casquette 5 panneaux ?",
            a: "Le panneau avant sans couture centrale se prête aux écussons, à la broderie à plat ou 3D et aux logos imprimés, car le visuel n'est pas coupé par une couture.",
          },
        ],
      },
      de: {
        name: "5-Panel Caps",
        h1: "Hersteller für individuelle 5-Panel Caps",
        metaDescription: "Individuelle 5-Panel Caps aus Guangzhou: Camp-, Snapback- und Sport-Styles aus Baumwolle, Nylon oder Funktionsstoff. Ab 50 Stück pro Farbe.",
        intro: [
          "Eine 5-Panel Cap hat ein breites Frontteil ohne Mittelnaht und ist deshalb erste Wahl für Logos, Patches und klare Grafiken. NanCrown fertigt 5-Panel Caps als flache Camp Caps mit geradem Schirm, als strukturierte Snapbacks und als leichte Sport-Caps aus schnell trocknendem Nylon mit Seitennetz und langem Schirm.",
          "Wählen Sie Stoff, Schirm und Verschluss, und wir bauen die Cap um Ihre Marke herum: Flach- oder 3D-Puff-Stickerei, gewebte oder Leder-Patches, Druck oder Details wie eine Pattentasche vorne. Den Aufbau bestätigen wir an einem Vorproduktionsmuster in 7–15 Tagen und produzieren in Guangzhou ab 50 Stück pro Farbe, mit fertiger Serie 25–30 Tage nach Freigabe.",
        ],
        customOptions: [
          "Style: flache Camp Cap, strukturierte Snapback oder leichte Sport-Cap.",
          "Stoff: Baumwoll-Twill, Nylon oder schnell trocknender Funktionsstoff.",
          "Schirm: flach, gebogen oder lang für mehr Schatten.",
          "Verschluss: Gurtband, Snapback oder Gummikordel mit Stopper.",
          "Details: Pattentasche, seitliche Netzfenster, Metallösen oder reflektierende Paspel.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestmenge für individuelle 5-Panel Caps?",
            a: "50 Stück pro Farbe und Modell. Farben innerhalb eines Modells lassen sich kombinieren, um die 100-Stück-Preisstufe zu erreichen.",
          },
          {
            q: "Fertigen Sie 5-Panel Caps aus Nylon für Outdoor- oder Laufmarken?",
            a: "Ja. Wir fertigen leichte 5-Panel-Sport-Caps aus schnell trocknendem Nylon, optional mit Seitennetz, langem Schirm und reflektierenden Details.",
          },
          {
            q: "Welche Veredelung passt am besten zu einer 5-Panel Cap?",
            a: "Das Frontteil ohne Mittelnaht eignet sich für Patches, Flach- oder 3D-Stickerei und gedruckte Logos, weil das Motiv nicht von einer Naht geteilt wird.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 13. Golf Caps
  // ────────────────────────────────────────────────────────────
  {
    slug: "golf-caps",
    categoryValue: "",
    productSlugs: [
      "sunglass-slot-long-brim-sport-cap",
      "lightweight-running-cap",
      "stretch-woven-visor",
      "sunglass-slot-sport-visor",
    ],
    content: {
      en: {
        name: "Golf Caps",
        h1: "Custom Golf Caps & Visors Manufacturer",
        metaDescription: "Custom golf caps and visors made in Guangzhou: lightweight performance fabrics, flat or 3D embroidery, reflective or printed logos. From 50 pcs per colour.",
        intro: [
          "A golf cap has to look sharp on the course and stay comfortable through a long round in the sun: light fabric, a secure fit and a clean logo. NanCrown makes golf caps and visors for golf brands, clubs and events, in quick-dry nylon and stretch woven performance fabrics, with structured or soft crowns and curved brims.",
          "Branding can be flat or 3D puff embroidery or printed and reflective logos, and laser-cut ventilation holes can be added to the crown. Visors come with an open crown, a wide band and a hook-and-loop or elastic closure. We confirm the build on a pre-production sample in 7–15 days and produce from 50 pieces per colour, with bulk ready 25–30 days after approval.",
        ],
        customOptions: [
          "Style: 6-panel or 5-panel golf cap, or an open-crown visor.",
          "Fabric: quick-dry nylon, stretch woven polyester or cotton twill.",
          "Logo: flat or 3D puff embroidery, printed or reflective logos.",
          "Ventilation: laser-cut holes or mesh panels.",
          "Closure: strap with a metal slider, hook-and-loop or elastic cord.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom golf caps?",
            a: "50 pieces per colour, per style, which suits a club run, an event order or a first brand drop.",
          },
          {
            q: "Do you make golf visors too?",
            a: "Yes. We make open-crown visors with a wide band, a curved brim and a hook-and-loop or elastic closure, ready for your logo.",
          },
          {
            q: "Can you quote DDP delivery to Japan, Korea or the US?",
            a: "Yes. We quote ex-works Guangzhou and can get you a DDP quote through our forwarders, so duties and delivery are covered to your door.",
          },
        ],
      },
      es: {
        name: "Gorras de Golf",
        h1: "Fabricante de gorras y viseras de golf personalizadas",
        metaDescription: "Gorras y viseras de golf personalizadas hechas en Guangzhou: tejidos técnicos ligeros, bordado plano o 3D, logos reflectantes. Desde 50 uds. por color.",
        intro: [
          "Una gorra de golf tiene que verse impecable en el campo y ser cómoda durante una larga vuelta al sol: tejido ligero, buen ajuste y un logo limpio. En NanCrown fabricamos gorras y viseras de golf para marcas, clubes y eventos, en nailon de secado rápido y tejidos técnicos elásticos, con copa estructurada o suave y visera curva.",
          "El logo puede ir bordado en plano o en 3D (puff), estampado o reflectante, y podemos añadir perforaciones láser de ventilación en la copa. Las viseras llevan la copa abierta, una banda ancha y cierre de velcro o elástico. Confirmamos la construcción en una muestra de preproducción en 7–15 días y fabricamos desde 50 piezas por color, con la producción lista 25–30 días después de la aprobación.",
        ],
        customOptions: [
          "Estilo: gorra de golf de 6 o 5 paneles, o visera de copa abierta.",
          "Tejido: nailon de secado rápido, poliéster elástico o sarga de algodón.",
          "Logo: bordado plano o 3D (puff), logos estampados o reflectantes.",
          "Ventilación: perforaciones láser o paneles de malla.",
          "Cierre: cinta con hebilla metálica, velcro o cordón elástico.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo de gorras de golf personalizadas?",
            a: "50 piezas por color y por modelo, ideal para un club, un evento o el primer lanzamiento de una marca.",
          },
          {
            q: "¿También hacéis viseras de golf?",
            a: "Sí. Fabricamos viseras de copa abierta con banda ancha, visera curva y cierre de velcro o elástico, listas para tu logo.",
          },
          {
            q: "¿Podéis cotizar entrega DDP a Japón, Corea o Estados Unidos?",
            a: "Sí. Cotizamos en fábrica Guangzhou y podemos conseguirte una cotización DDP a través de nuestros transitarios, con impuestos y entrega incluidos hasta tu puerta.",
          },
        ],
      },
      fr: {
        name: "Casquettes de Golf",
        h1: "Fabricant de casquettes et visières de golf personnalisées",
        metaDescription: "Casquettes et visières de golf personnalisées fabriquées à Guangzhou : tissus techniques légers, broderie à plat ou 3D, logos réfléchissants. Dès 50 pièces.",
        intro: [
          "Une casquette de golf doit avoir de l'allure sur le parcours et rester confortable pendant un long parcours au soleil : tissu léger, bon maintien et logo net. NanCrown fabrique des casquettes et visières de golf pour les marques, les clubs et les événements, en nylon séchage rapide et en tissus techniques extensibles, avec calotte structurée ou souple et visière courbe.",
          "Le logo peut être brodé à plat ou en 3D (puff), imprimé ou réfléchissant, et des micro-perforations laser d'aération peuvent être ajoutées sur la calotte. Les visières ont une calotte ouverte, un large bandeau et une fermeture auto-agrippante ou élastique. Nous validons la construction sur un échantillon de pré-production en 7 à 15 jours et produisons dès 50 pièces par couleur, avec une série prête 25 à 30 jours après validation.",
        ],
        customOptions: [
          "Style : casquette de golf 6 ou 5 panneaux, ou visière à calotte ouverte.",
          "Tissu : nylon séchage rapide, polyester extensible ou sergé de coton.",
          "Logo : broderie à plat ou 3D (puff), logos imprimés ou réfléchissants.",
          "Aération : micro-perforations laser ou panneaux en filet.",
          "Fermeture : sangle avec boucle métallique, auto-agrippant ou cordon élastique.",
        ],
        faq: [
          {
            q: "Quel est le minimum de commande pour des casquettes de golf personnalisées ?",
            a: "50 pièces par couleur et par modèle, idéal pour un club, un événement ou le premier drop d'une marque.",
          },
          {
            q: "Faites-vous aussi des visières de golf ?",
            a: "Oui. Nous fabriquons des visières à calotte ouverte avec un large bandeau, une visière courbe et une fermeture auto-agrippante ou élastique, prêtes pour votre logo.",
          },
          {
            q: "Pouvez-vous chiffrer une livraison DDP vers le Japon, la Corée ou les États-Unis ?",
            a: "Oui. Nous chiffrons départ usine Guangzhou et pouvons obtenir un devis DDP auprès de nos transitaires, droits et livraison compris jusqu'à votre porte.",
          },
        ],
      },
      de: {
        name: "Golf Caps",
        h1: "Hersteller für individuelle Golf Caps und Visors",
        metaDescription: "Individuelle Golf Caps und Visors aus Guangzhou: leichte Funktionsstoffe, Flach- oder 3D-Stickerei, reflektierende Logos. Ab 50 Stück pro Farbe.",
        intro: [
          "Eine Golf Cap soll auf dem Platz gut aussehen und eine lange Runde in der Sonne bequem bleiben: leichter Stoff, sicherer Sitz und ein sauberes Logo. NanCrown fertigt Golf Caps und Visors für Golfmarken, Clubs und Events, aus schnell trocknendem Nylon und elastischen Funktionsstoffen, mit strukturierter oder weicher Krone und gebogenem Schirm.",
          "Das Logo kann flach oder als 3D-Puff gestickt, gedruckt oder reflektierend sein, und Laser-Lüftungslöcher lassen sich in die Krone einarbeiten. Visors haben eine offene Krone, ein breites Band und einen Klett- oder Gummizugverschluss. Den Aufbau bestätigen wir an einem Vorproduktionsmuster in 7–15 Tagen und produzieren ab 50 Stück pro Farbe, mit fertiger Serie 25–30 Tage nach Freigabe.",
        ],
        customOptions: [
          "Style: 6- oder 5-Panel Golf Cap oder Visor mit offener Krone.",
          "Stoff: schnell trocknendes Nylon, elastisches Polyester oder Baumwoll-Twill.",
          "Logo: Flach- oder 3D-Puff-Stickerei, gedruckte oder reflektierende Logos.",
          "Belüftung: Laser-Lüftungslöcher oder Netzeinsätze.",
          "Verschluss: Band mit Metallschnalle, Klettverschluss oder Gummikordel.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestmenge für individuelle Golf Caps?",
            a: "50 Stück pro Farbe und Modell, passend für einen Club, ein Event oder den ersten Drop einer Marke.",
          },
          {
            q: "Fertigen Sie auch Golf-Visors?",
            a: "Ja. Wir fertigen Visors mit offener Krone, breitem Band, gebogenem Schirm und Klett- oder Gummizugverschluss, bereit für Ihr Logo.",
          },
          {
            q: "Können Sie eine DDP-Lieferung nach Japan, Korea oder in die USA anbieten?",
            a: "Ja. Wir kalkulieren ab Werk Guangzhou und besorgen über unsere Spediteure ein DDP-Angebot, bei dem Zoll und Zustellung bis zu Ihrer Tür enthalten sind.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 14. Embroidered Caps
  // ────────────────────────────────────────────────────────────
  {
    slug: "embroidered-caps",
    categoryValue: "",
    productSlugs: [
      "stripe-over-brim-soft-cap",
      "chain-stitch-pillbox-cap",
      "serif-wordmark-washed-cap",
      "outline-letter-vintage-washed-cap",
      "two-tone-raw-edge-applique-cap",
      "frayed-edge-denim-bucket-hat",
      "faux-fur-trim-earflap-cap",
    ],
    content: {
      en: {
        name: "Embroidered Caps",
        h1: "Custom Embroidered Caps: 3D Puff, Flat & Chain-Stitch",
        metaDescription: "Custom embroidered caps with 3D puff, satin-stitch, outline or chain-stitch embroidery. Factory-direct from Guangzhou, 50 pcs per colour, samples in 7–15 days.",
        intro: [
          "Embroidery is the most common way to put a brand on a cap, and the stitch style changes the whole look. NanCrown embroiders caps in raised 3D puff for bold streetwear logos, flat satin-stitch for clean wordmarks, open outline embroidery that lets the fabric show through, chain-stitch for a textured vintage feel, and appliqué for large letters.",
          "We digitise your artwork, stitch it on a pre-production sample in 7–15 days, and adjust thread colours and density with you before bulk. Logos can go on the front, sides, back and brim of any of our cap styles, from 50 pieces per colour.",
        ],
        customOptions: [
          "3D puff embroidery: raised lettering and logos on structured fronts.",
          "Flat embroidery: satin-stitch wordmarks and detailed logos.",
          "Outline and chain-stitch embroidery for a lighter, vintage look.",
          "Appliqué: raw-edge fabric letters stitched down with an outline.",
          "Positions: front, sides, back and brim, in your thread colours.",
        ],
        faq: [
          {
            q: "Can you do 3D puff embroidery with a small order?",
            a: "Yes. 3D puff embroidery is available from our 50-piece-per-colour minimum and is quoted per design, depending on size and stitch count.",
          },
          {
            q: "What file do you need for embroidery?",
            a: "A vector file (AI, PDF or SVG) is best, but a clear high-resolution PNG also works. We digitise it and show you the result on the sample.",
          },
          {
            q: "Is embroidery included in the price?",
            a: "Our price tiers include one flat embroidered logo on the front. 3D puff, extra positions and large stitch counts are quoted per design.",
          },
        ],
      },
      es: {
        name: "Gorras Bordadas",
        h1: "Gorras bordadas personalizadas: bordado 3D, plano y de cadeneta",
        metaDescription: "Gorras bordadas personalizadas: bordado 3D (puff), de satén, de contorno o de cadeneta. Directo de fábrica, 50 uds. por color, muestra en 7–15 días.",
        intro: [
          "El bordado es la forma más habitual de poner una marca en una gorra, y el tipo de puntada cambia todo el aspecto. En NanCrown bordamos gorras en 3D (puff) en relieve para logos streetwear contundentes, en satén plano para logotipos limpios, en contorno abierto que deja ver el tejido, en cadeneta para un toque vintage con textura, y en aplicación para letras grandes.",
          "Digitalizamos tu diseño, lo bordamos en una muestra de preproducción en 7–15 días y ajustamos contigo los colores del hilo y la densidad antes de producir. Los logos pueden ir en el frontal, los laterales, la parte trasera y la visera de cualquiera de nuestros modelos, desde 50 piezas por color.",
        ],
        customOptions: [
          "Bordado 3D (puff): letras y logos en relieve sobre frontales estructurados.",
          "Bordado plano: logotipos en satén y logos con detalle.",
          "Bordado de contorno y de cadeneta para un aspecto más ligero y vintage.",
          "Aplicación: letras de tela con bordes crudos cosidas con un contorno.",
          "Posiciones: frontal, laterales, trasera y visera, en tus colores de hilo.",
        ],
        faq: [
          {
            q: "¿Hacéis bordado 3D (puff) en pedidos pequeños?",
            a: "Sí. El bordado 3D está disponible desde nuestro mínimo de 50 piezas por color y se cotiza según el diseño, en función del tamaño y del número de puntadas.",
          },
          {
            q: "¿Qué archivo necesitáis para bordar?",
            a: "Lo ideal es un archivo vectorial (AI, PDF o SVG), aunque un PNG nítido en alta resolución también sirve. Lo digitalizamos y te mostramos el resultado en la muestra.",
          },
          {
            q: "¿El bordado está incluido en el precio?",
            a: "Nuestros tramos de precio incluyen un logo bordado plano en el frontal. El bordado 3D, las posiciones adicionales y los bordados muy grandes se cotizan según el diseño.",
          },
        ],
      },
      fr: {
        name: "Casquettes Brodées",
        h1: "Casquettes brodées personnalisées : broderie 3D, à plat et au point de chaînette",
        metaDescription: "Casquettes brodées personnalisées : broderie 3D (puff), à plat, en contour ou chaînette. Direct usine, dès 50 pièces par couleur, échantillon en 7 à 15 jours.",
        intro: [
          "La broderie est la façon la plus courante de mettre une marque sur une casquette, et le type de point change tout. NanCrown brode des casquettes en 3D (puff) en relief pour des logos streetwear affirmés, au point lancé à plat pour des logotypes nets, en contour ouvert qui laisse voir le tissu, au point de chaînette pour un rendu vintage texturé, et en appliqué pour les grandes lettres.",
          "Nous numérisons votre visuel, le brodons sur un échantillon de pré-production en 7 à 15 jours et ajustons avec vous les couleurs de fil et la densité avant la série. Les logos peuvent être placés devant, sur les côtés, à l'arrière et sur la visière de tous nos modèles, dès 50 pièces par couleur.",
        ],
        customOptions: [
          "Broderie 3D (puff) : lettres et logos en relief sur les devants structurés.",
          "Broderie à plat : logotypes au point lancé et logos détaillés.",
          "Broderie en contour et au point de chaînette pour un rendu plus léger et vintage.",
          "Appliqué : lettres en tissu à bords bruts cousues avec un contour.",
          "Emplacements : devant, côtés, arrière et visière, dans vos couleurs de fil.",
        ],
        faq: [
          {
            q: "Faites-vous de la broderie 3D (puff) en petite quantité ?",
            a: "Oui. La broderie 3D est possible dès notre minimum de 50 pièces par couleur et se chiffre selon le design, en fonction de la taille et du nombre de points.",
          },
          {
            q: "De quel fichier avez-vous besoin pour la broderie ?",
            a: "Un fichier vectoriel (AI, PDF ou SVG) est idéal, mais un PNG net en haute résolution convient aussi. Nous le numérisons et vous montrons le rendu sur l'échantillon.",
          },
          {
            q: "La broderie est-elle comprise dans le prix ?",
            a: "Nos paliers de prix comprennent un logo brodé à plat sur le devant. La broderie 3D, les emplacements supplémentaires et les grandes broderies sont chiffrés selon le design.",
          },
        ],
      },
      de: {
        name: "Bestickte Caps",
        h1: "Individuell bestickte Caps: 3D-Puff-, Flach- und Kettstich",
        metaDescription: "Individuell bestickte Caps mit 3D-Puff-, Satinstich-, Kontur- oder Kettstich-Stickerei. Direkt ab Fabrik in Guangzhou, 50 Stück pro Farbe, Muster in 7–15 Tagen.",
        intro: [
          "Stickerei ist der häufigste Weg, eine Marke auf eine Cap zu bringen, und die Stichart verändert den ganzen Look. NanCrown bestickt Caps mit erhabener 3D-Puff-Stickerei für kräftige Streetwear-Logos, flachem Satinstich für klare Schriftzüge, offener Konturstickerei, durch die der Stoff sichtbar bleibt, Kettstich für einen strukturierten Vintage-Look und Applikationen für große Buchstaben.",
          "Wir digitalisieren Ihr Motiv, sticken es in 7–15 Tagen auf ein Vorproduktionsmuster und stimmen Garnfarben und Stichdichte vor der Serie mit Ihnen ab. Logos sind vorne, seitlich, hinten und auf dem Schirm all unserer Cap-Modelle möglich, ab 50 Stück pro Farbe.",
        ],
        customOptions: [
          "3D-Puff-Stickerei: erhabene Schriftzüge und Logos auf strukturierten Fronten.",
          "Flachstickerei: Schriftzüge im Satinstich und detailreiche Logos.",
          "Kontur- und Kettstich-Stickerei für einen leichteren Vintage-Look.",
          "Applikation: Stoffbuchstaben mit offenen Kanten, mit Kontur aufgenäht.",
          "Positionen: vorne, seitlich, hinten und auf dem Schirm, in Ihren Garnfarben.",
        ],
        faq: [
          {
            q: "Machen Sie 3D-Puff-Stickerei auch bei kleinen Mengen?",
            a: "Ja. 3D-Puff-Stickerei ist ab unserer Mindestmenge von 50 Stück pro Farbe möglich und wird je Design nach Größe und Stichzahl kalkuliert.",
          },
          {
            q: "Welche Datei brauchen Sie für die Stickerei?",
            a: "Am besten eine Vektordatei (AI, PDF oder SVG), aber ein scharfes, hochauflösendes PNG funktioniert auch. Wir digitalisieren es und zeigen Ihnen das Ergebnis am Muster.",
          },
          {
            q: "Ist die Stickerei im Preis enthalten?",
            a: "Unsere Preisstufen enthalten ein flach gesticktes Logo vorne. 3D-Puff, weitere Positionen und große Stichzahlen kalkulieren wir je Design.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 15. Patch Hats
  // ────────────────────────────────────────────────────────────
  {
    slug: "patch-hats",
    categoryValue: "",
    productSlugs: [
      "souvenir-patch-snapback",
      "stripe-over-brim-soft-cap",
      "felt-initials-wool-cap",
      "two-tone-raw-edge-applique-cap",
      "washed-denim-cadet-cap",
      "frayed-seam-washed-denim-cap",
    ],
    content: {
      en: {
        name: "Patch Hats",
        h1: "Custom Patch Hats: Leather, PVC & Woven Patches",
        metaDescription: "Custom patch hats from our Guangzhou factory: leather, PU, PVC, woven, embroidered and felt patches on caps, truckers and bucket hats. From 50 pcs per colour.",
        intro: [
          "A patch gives a cap a finished, retail look and keeps fine detail sharp. NanCrown makes patch hats with leather and PU leather patches, rubbery PVC patches, fine-detail woven patches, embroidered patches and felt or fabric appliqué letters.",
          "Patches can be sewn onto trucker hats, baseball and dad caps, snapbacks and bucket hats, in the shape, size and colours of your design. We confirm the patch and its position on a pre-production sample in 7–15 days and produce from 50 pieces per colour, with bulk ready 25–30 days after approval.",
        ],
        customOptions: [
          "Leather and PU leather patches in your shape and colour.",
          "PVC patches with raised, rubbery detail.",
          "Woven patches for fine lines and small text.",
          "Embroidered patches and felt appliqué for a classic, textured look.",
          "Placement: front, side or back, on caps, truckers and bucket hats.",
        ],
        faq: [
          {
            q: "What is the minimum order for custom patch hats?",
            a: "50 pieces per colour, per style. Patches are quoted per design, depending on type and size.",
          },
          {
            q: "Which patch type should I choose?",
            a: "Leather and PU patches look premium on washed and trucker caps, PVC is durable and bold, woven patches hold fine detail, and embroidered patches give a classic textured look. We can sample more than one option.",
          },
          {
            q: "Can you put a patch on a trucker hat?",
            a: "Yes. A patch on a structured trucker front with a mesh back is a classic combination, and we can match the patch colours to your cap.",
          },
        ],
      },
      es: {
        name: "Gorras con Parche",
        h1: "Gorras con parche personalizadas: cuero, PVC y tejidos",
        metaDescription: "Gorras con parche personalizadas hechas en Guangzhou: parches de cuero, PU, PVC, tejidos, bordados y de fieltro. Desde 50 uds. por color.",
        intro: [
          "Un parche da a la gorra un acabado de tienda y mantiene nítidos los detalles finos. En NanCrown fabricamos gorras con parches de cuero y de cuero PU, parches de PVC con tacto de goma, parches tejidos de alta definición, parches bordados y letras aplicadas en fieltro o tela.",
          "Los parches se cosen en truckers, gorras de béisbol y dad caps, snapbacks y gorros de pescador, con la forma, el tamaño y los colores de tu diseño. Confirmamos el parche y su posición en una muestra de preproducción en 7–15 días y fabricamos desde 50 piezas por color, con la producción lista 25–30 días después de la aprobación.",
        ],
        customOptions: [
          "Parches de cuero y de cuero PU con tu forma y color.",
          "Parches de PVC con relieve y tacto de goma.",
          "Parches tejidos para líneas finas y textos pequeños.",
          "Parches bordados y aplicaciones de fieltro para un aspecto clásico con textura.",
          "Posición: frontal, lateral o trasera, en gorras, truckers y gorros de pescador.",
        ],
        faq: [
          {
            q: "¿Cuál es el pedido mínimo de gorras con parche?",
            a: "50 piezas por color y por modelo. Los parches se cotizan según el diseño, en función del tipo y del tamaño.",
          },
          {
            q: "¿Qué tipo de parche me conviene?",
            a: "El cuero y el PU quedan premium en gorras lavadas y truckers, el PVC es resistente y llamativo, los parches tejidos mantienen el detalle fino y los bordados dan un aspecto clásico con textura. Podemos hacer muestras de más de una opción.",
          },
          {
            q: "¿Podéis poner un parche en una trucker?",
            a: "Sí. Un parche sobre el frontal estructurado de una trucker con malla trasera es una combinación clásica, y podemos igualar los colores del parche con los de la gorra.",
          },
        ],
      },
      fr: {
        name: "Casquettes à Écusson",
        h1: "Casquettes à écusson personnalisées : cuir, PVC et tissé",
        metaDescription: "Casquettes à écusson personnalisées fabriquées à Guangzhou : écussons cuir, PU, PVC, tissés, brodés ou feutre. Dès 50 pièces par couleur.",
        intro: [
          "Un écusson donne à la casquette une finition boutique et garde les détails fins bien nets. NanCrown fabrique des casquettes avec écussons en cuir et en cuir PU, écussons en PVC au toucher caoutchouc, écussons tissés haute définition, écussons brodés et lettres appliquées en feutre ou en tissu.",
          "Les écussons se cousent sur les truckers, les casquettes baseball et dad caps, les snapbacks et les bobs, à la forme, à la taille et aux couleurs de votre design. Nous validons l'écusson et son emplacement sur un échantillon de pré-production en 7 à 15 jours et produisons dès 50 pièces par couleur, avec une série prête 25 à 30 jours après validation.",
        ],
        customOptions: [
          "Écussons en cuir et en cuir PU, à votre forme et à votre couleur.",
          "Écussons en PVC en relief au toucher caoutchouc.",
          "Écussons tissés pour les traits fins et les petits textes.",
          "Écussons brodés et appliqués en feutre pour un rendu classique et texturé.",
          "Emplacement : devant, côté ou arrière, sur casquettes, truckers et bobs.",
        ],
        faq: [
          {
            q: "Quel est le minimum de commande pour des casquettes à écusson ?",
            a: "50 pièces par couleur et par modèle. Les écussons sont chiffrés selon le design, en fonction du type et de la taille.",
          },
          {
            q: "Quel type d'écusson choisir ?",
            a: "Le cuir et le PU font premium sur les casquettes délavées et les truckers, le PVC est résistant et affirmé, l'écusson tissé garde les détails fins et l'écusson brodé offre un rendu classique et texturé. Nous pouvons échantillonner plusieurs options.",
          },
          {
            q: "Pouvez-vous poser un écusson sur une trucker ?",
            a: "Oui. Un écusson sur le devant structuré d'une trucker à dos en filet est une combinaison classique, et nous pouvons assortir les couleurs de l'écusson à la casquette.",
          },
        ],
      },
      de: {
        name: "Patch Caps",
        h1: "Individuelle Patch Caps: Leder-, PVC- und Web-Patches",
        metaDescription: "Individuelle Patch Caps aus Guangzhou: Leder-, PU-, PVC-, Web-, Stick- und Filz-Patches auf Caps, Truckern und Fischerhüten. Ab 50 Stück pro Farbe.",
        intro: [
          "Ein Patch gibt einer Cap ein fertiges Retail-Finish und hält feine Details scharf. NanCrown fertigt Patch Caps mit Leder- und PU-Leder-Patches, gummiartigen PVC-Patches, detailgenauen Web-Patches, Stick-Patches sowie applizierten Buchstaben aus Filz oder Stoff.",
          "Patches werden auf Trucker Caps, Baseball und Dad Caps, Snapbacks und Fischerhüte genäht, in Form, Größe und Farben Ihres Designs. Patch und Position bestätigen wir an einem Vorproduktionsmuster in 7–15 Tagen und produzieren ab 50 Stück pro Farbe, mit fertiger Serie 25–30 Tage nach Freigabe.",
        ],
        customOptions: [
          "Leder- und PU-Leder-Patches in Ihrer Form und Farbe.",
          "PVC-Patches mit erhabenen, gummiartigen Details.",
          "Web-Patches für feine Linien und kleine Schriften.",
          "Stick-Patches und Filzapplikationen für einen klassischen, strukturierten Look.",
          "Platzierung: vorne, seitlich oder hinten, auf Caps, Truckern und Fischerhüten.",
        ],
        faq: [
          {
            q: "Wie hoch ist die Mindestmenge für individuelle Patch Caps?",
            a: "50 Stück pro Farbe und Modell. Patches kalkulieren wir je Design nach Art und Größe.",
          },
          {
            q: "Welche Patch-Art soll ich wählen?",
            a: "Leder und PU wirken auf gewaschenen Caps und Truckern hochwertig, PVC ist robust und auffällig, Web-Patches halten feine Details und Stick-Patches geben einen klassischen, strukturierten Look. Wir können mehrere Varianten bemustern.",
          },
          {
            q: "Können Sie einen Patch auf eine Trucker Cap setzen?",
            a: "Ja. Ein Patch auf der strukturierten Front einer Trucker Cap mit Netzrücken ist eine klassische Kombination, und wir stimmen die Patchfarben auf die Cap ab.",
          },
        ],
      },
    },
  },

  // ────────────────────────────────────────────────────────────
  // 16. Private Label Hats
  // ────────────────────────────────────────────────────────────
  {
    slug: "private-label-hats",
    categoryValue: "",
    productSlugs: [
      "souvenir-patch-snapback",
      "two-tone-washed-dad-cap",
      "tire-stripe-mesh-trucker",
      "frayed-edge-denim-bucket-hat",
      "utility-pocket-camp-cap",
      "faux-fur-trim-earflap-cap",
    ],
    content: {
      en: {
        name: "Private Label Hats",
        h1: "Private Label Hat Manufacturer",
        metaDescription: "Private label caps and hats made in our Guangzhou factory: your logo, woven labels, printed inside taping, hangtags and packaging. From 50 pcs per colour.",
        intro: [
          "Private label means the finished hat carries only your brand: your logo on the outside and your details on the inside, with no factory marks. NanCrown builds private label caps and hats from your own design or from one of our base styles, in the fabric, colours and decoration you choose.",
          "Inside and out, the branding is yours: woven labels, printed inside taping, custom hardware, hangtags and packaging. We confirm every detail on a pre-production sample in 7–15 days, produce from 50 pieces per colour, and can quote DDP delivery so you know your landed cost up front.",
        ],
        customOptions: [
          "Outside: embroidery, patches, printing or appliqué in your artwork.",
          "Inside: woven labels, size or care labels and printed inside taping.",
          "Hardware: sliders, buckles and eyelets in your chosen finish.",
          "Packaging: hangtags, polybags and retail packaging.",
          "Styles: baseball and dad caps, snapbacks, truckers, 5-panel caps, bucket hats, visors and winter hats.",
        ],
        faq: [
          {
            q: "Do you make private label hats with a low MOQ?",
            a: "Yes, from 50 pieces per colour, per style, with your own labels and packaging on the first order.",
          },
          {
            q: "Will your factory name appear on the hats?",
            a: "No. Private label hats carry only your branding.",
          },
          {
            q: "Can I start from one of your existing styles?",
            a: "Yes. Any cap in our catalogue can be rebuilt in your fabric, colours and branding, which is the fastest way to a first order.",
          },
        ],
      },
      es: {
        name: "Gorras de Marca Propia",
        h1: "Fabricante de gorras de marca propia",
        metaDescription: "Gorras de marca propia fabricadas en Guangzhou: tu logo, etiquetas tejidas, cinta interior estampada, etiquetas colgantes y embalaje. Desde 50 uds. por color.",
        intro: [
          "Marca propia significa que la gorra terminada lleva solo tu marca: tu logo por fuera y tus detalles por dentro, sin marcas de fábrica. En NanCrown fabricamos gorras y gorros de marca propia a partir de tu diseño o de uno de nuestros modelos base, en el tejido, los colores y la decoración que elijas.",
          "Por dentro y por fuera, la marca es tuya: etiquetas tejidas, cinta interior estampada, herrajes personalizados, etiquetas colgantes y embalaje. Confirmamos cada detalle en una muestra de preproducción en 7–15 días, fabricamos desde 50 piezas por color y podemos cotizar la entrega DDP para que conozcas el coste final desde el principio.",
        ],
        customOptions: [
          "Exterior: bordado, parches, estampado o aplicaciones con tu diseño.",
          "Interior: etiquetas tejidas, etiquetas de talla o cuidado y cinta interior estampada.",
          "Herrajes: hebillas, cierres y ojales en el acabado que elijas.",
          "Embalaje: etiquetas colgantes, bolsas individuales y embalaje para tienda.",
          "Modelos: gorras de béisbol y dad caps, snapbacks, truckers, gorras de 5 paneles, gorros de pescador, viseras y gorros de invierno.",
        ],
        faq: [
          {
            q: "¿Fabricáis gorras de marca propia con pedido mínimo bajo?",
            a: "Sí, desde 50 piezas por color y por modelo, con tus propias etiquetas y embalaje desde el primer pedido.",
          },
          {
            q: "¿Aparecerá el nombre de vuestra fábrica en las gorras?",
            a: "No. Las gorras de marca propia llevan solo tu marca.",
          },
          {
            q: "¿Puedo partir de uno de vuestros modelos?",
            a: "Sí. Cualquier gorra de nuestro catálogo puede rehacerse con tu tejido, tus colores y tu marca, y es la forma más rápida de llegar a un primer pedido.",
          },
        ],
      },
      fr: {
        name: "Casquettes en Marque Propre",
        h1: "Fabricant de casquettes en marque propre",
        metaDescription: "Casquettes en marque propre fabriquées à Guangzhou : votre logo, étiquettes tissées, ganse imprimée, étiquettes volantes, emballage. Dès 50 pièces par couleur.",
        intro: [
          "Marque propre signifie que la casquette finie ne porte que votre marque : votre logo à l'extérieur, vos détails à l'intérieur, sans aucune marque d'usine. NanCrown fabrique des casquettes et bonnets en marque propre à partir de votre design ou de l'un de nos modèles de base, dans le tissu, les couleurs et la décoration de votre choix.",
          "Dedans comme dehors, la marque est la vôtre : étiquettes tissées, ganse intérieure imprimée, accessoires personnalisés, étiquettes volantes et emballage. Nous validons chaque détail sur un échantillon de pré-production en 7 à 15 jours, produisons dès 50 pièces par couleur et pouvons chiffrer une livraison DDP pour que vous connaissiez votre coût rendu dès le départ.",
        ],
        customOptions: [
          "Extérieur : broderie, écussons, impression ou appliqué selon votre visuel.",
          "Intérieur : étiquettes tissées, étiquettes de taille ou d'entretien et ganse intérieure imprimée.",
          "Accessoires : boucles, fermetures et œillets dans la finition de votre choix.",
          "Emballage : étiquettes volantes, sachets individuels et emballage boutique.",
          "Modèles : casquettes baseball et dad caps, snapbacks, truckers, 5 panneaux, bobs, visières et bonnets d'hiver.",
        ],
        faq: [
          {
            q: "Fabriquez-vous des casquettes en marque propre avec un petit minimum ?",
            a: "Oui, dès 50 pièces par couleur et par modèle, avec vos propres étiquettes et votre emballage dès la première commande.",
          },
          {
            q: "Le nom de votre usine apparaîtra-t-il sur les casquettes ?",
            a: "Non. Les casquettes en marque propre ne portent que votre marque.",
          },
          {
            q: "Puis-je partir de l'un de vos modèles existants ?",
            a: "Oui. Toute casquette de notre catalogue peut être refaite dans votre tissu, vos couleurs et votre marque, c'est le chemin le plus rapide vers une première commande.",
          },
        ],
      },
      de: {
        name: "Private-Label-Caps",
        h1: "Hersteller für Private-Label-Caps",
        metaDescription: "Private-Label-Caps aus unserer Fabrik in Guangzhou: Ihr Logo, gewebte Etiketten, bedrucktes Innenband, Hängeetiketten und Verpackung. Ab 50 Stück pro Farbe.",
        intro: [
          "Private Label heißt: Die fertige Cap trägt nur Ihre Marke, Ihr Logo außen und Ihre Details innen, ohne Herstellerkennzeichen. NanCrown fertigt Private-Label-Caps und -Mützen nach Ihrem eigenen Design oder auf Basis eines unserer Grundmodelle, in Stoff, Farben und Veredelung Ihrer Wahl.",
          "Innen wie außen gehört das Branding Ihnen: gewebte Etiketten, bedrucktes Innenband, individuelle Metallteile, Hängeetiketten und Verpackung. Jedes Detail bestätigen wir an einem Vorproduktionsmuster in 7–15 Tagen, produzieren ab 50 Stück pro Farbe und kalkulieren auf Wunsch die DDP-Lieferung, damit Sie Ihre Gesamtkosten von Anfang an kennen.",
        ],
        customOptions: [
          "Außen: Stickerei, Patches, Druck oder Applikation nach Ihrer Vorlage.",
          "Innen: gewebte Etiketten, Größen- oder Pflegeetiketten und bedrucktes Innenband.",
          "Metallteile: Schnallen, Verschlüsse und Ösen im Finish Ihrer Wahl.",
          "Verpackung: Hängeetiketten, Einzelbeutel und Verkaufsverpackung.",
          "Modelle: Baseball und Dad Caps, Snapbacks, Trucker, 5-Panel Caps, Fischerhüte, Visors und Wintermützen.",
        ],
        faq: [
          {
            q: "Fertigen Sie Private-Label-Caps mit kleiner Mindestmenge?",
            a: "Ja, ab 50 Stück pro Farbe und Modell, mit Ihren eigenen Etiketten und Ihrer Verpackung schon bei der ersten Bestellung.",
          },
          {
            q: "Erscheint Ihr Firmenname auf den Caps?",
            a: "Nein. Private-Label-Caps tragen ausschließlich Ihre Marke.",
          },
          {
            q: "Kann ich mit einem Ihrer bestehenden Modelle starten?",
            a: "Ja. Jede Cap aus unserem Katalog lässt sich in Ihrem Stoff, Ihren Farben und Ihrem Branding neu fertigen, der schnellste Weg zur ersten Bestellung.",
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
