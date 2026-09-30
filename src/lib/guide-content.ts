// 「指南类」独立页面的四语言文案(主脑亲写,老板 0923 规矩:客户会读到的字不交给子代理写)
//
// 目前两页:
//   /pricing            报价须知:阶梯价、起订量、样品、交期、付款、运输、质检、工厂实况
//   /start-a-hat-brand  新品牌第一批系列:怎么规划首单、预算示例、流程
//
// 🔴 事实红线:只许用 ~/.claude/.../memory/reference_company_true_facts.md 里老板确认过的数据(2026-09-27 版):
//   - 阶梯价(标准款=6 片全棉斜纹+帽前平绣+1 个织唛,EXW 广州,同一款):50–99 $6.0–7.7 / 100–299 $5.5–6.7 / 300–499 $4.9–5.8 / 500+ $4.5–5.2
//   - 起订 50 顶/色/款;同款可混色凑档;样品 $60–80/款、7–15 天,同款大货满 1000 顶退样品费
//   - 大货:样品确认后 25–30 天,另加物流时间;付款 50% 定金 + 验货通过后付尾款;可帮问 DDP;接受第三方验货;可视频看车间
//   - 2015 年成立、约 2,000 m²、30+ 员工、月产 10 万+、客户 50+ 国家
//   - 裁剪车缝组装自己做;刺绣/印花/水洗交长期合作工序厂、每批回厂检查(🔴 不许写 in-house / under one roof / 不外发)
//   - 没有任何认证,一个字都不许写
// 改数字前先改那份记忆文件,两边保持一致。
//
// 正文格式:p / list / 表格单元格里只允许 <b>…</b> 加粗,别的 HTML 一律不认(渲染端只解析 <b>)。

import type { Locale } from "@/i18n/routing";

export type GuideSlug = "pricing" | "start-a-hat-brand";

export const guideSlugs: GuideSlug[] = ["pricing", "start-a-hat-brand"];

export type GuideBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "steps"; items: { title: string; text: string }[] }
  // 产品卡片网格(0930 新增,给 /solutions/<slug> 用):按 slug 从 sample-data 找产品渲染
  | { type: "products"; slugs: string[] };

export interface GuideLocaleContent {
  // meta 标题(不要手动加 "| NanCrown",根布局模板会自动补)
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  blocks: GuideBlock[];
  faqHeading: string;
  faq: { q: string; a: string }[];
  cta: { title: string; text: string; button: string };
}

// ─────────────────────────────── /pricing ───────────────────────────────

const pricingEn: GuideLocaleContent = {
  metaTitle: "Custom Hat Pricing, MOQ & Lead Times",
  metaDescription:
    "Factory-direct custom cap prices from 50 pieces per colour: $6.0–7.7 per cap at 50, $4.5–5.2 at 500+. Samples in 7–15 days, bulk in 25–30 days.",
  h1: "Custom Hat Pricing, MOQ & Lead Times",
  lead:
    "Straight answers to what every brand asks before ordering custom caps: what a cap costs at 50, 100, 300 or 500 pieces, how samples work, how long production takes and how you pay. Prices below are indicative for our standard build. Send us your design and we will confirm an exact quote.",
  blocks: [
    { type: "h2", text: "Price per cap by quantity" },
    {
      type: "p",
      text: "Standard build: <b>6-panel cotton twill cap, flat embroidered logo on the front, one woven label inside</b>. Prices are per cap, for one style, ex-works Guangzhou (EXW).",
    },
    {
      type: "table",
      head: ["Quantity per style", "Price per cap (USD)", "Good for"],
      rows: [
        ["50–99 (min. 50 per colour)", "<b>$6.0 – 7.7</b>", "Testing a design or a first drop"],
        ["100–299", "<b>$5.5 – 6.7</b>", "A first collection"],
        ["300–499", "<b>$4.9 – 5.8</b>", "Core styles and reorders"],
        ["500+", "<b>$4.5 – 5.2</b>", "Best-sellers and wholesale"],
      ],
      caption:
        "Colours can be mixed within one style to reach a tier: 2 colours × 50 pieces are priced at the 100-piece tier.",
    },
    { type: "h2", text: "What changes the price" },
    {
      type: "list",
      items: [
        "3D puff embroidery, patches (leather, PVC or woven) and extra logo positions",
        "Garment washing, distressing and other special finishes",
        "Special fabrics such as corduroy, nylon, wool blends or technical performance fabrics",
        "Custom hardware, printed inside taping, hangtags and retail packaging",
        "Very small colour splits, for example 10 colours × 50 pieces",
      ],
    },
    {
      type: "p",
      text: "We quote these per design, so the fastest way to an exact price is to send us your artwork and specification.",
    },
    { type: "h2", text: "Minimum order (MOQ)" },
    {
      type: "p",
      text: "Our minimum is <b>50 pieces per colour, per style</b>. You can mix colours within one style to reach the next price tier, and one order can include several styles.",
    },
    { type: "h2", text: "Samples" },
    {
      type: "list",
      items: [
        "Sample fee: <b>$60–80 per design</b>, depending on construction and decoration.",
        "Sample time: <b>7–15 days</b> after we confirm your artwork and fabric.",
        "The sample fee is <b>refunded</b> when you order 1,000 pieces or more of that design.",
        "Revisions are made before you approve. Bulk production only starts after your sign-off.",
      ],
    },
    { type: "h2", text: "Lead times" },
    {
      type: "steps",
      items: [
        { title: "Sample", text: "7–15 days from confirmed artwork and fabric." },
        { title: "Bulk production", text: "25–30 days after you approve the pre-production sample." },
        {
          title: "Shipping",
          text: "Transit time depends on destination and shipping method. We confirm it together with your quote.",
        },
      ],
    },
    { type: "h2", text: "Payment terms" },
    {
      type: "p",
      text: "<b>50% deposit</b> to start bulk production. The <b>50% balance</b> is paid after the order passes inspection, before it ships.",
    },
    { type: "h2", text: "Shipping and landed cost" },
    {
      type: "p",
      text: "Prices are ex-works Guangzhou. We can ship by courier or freight to your door, and we can get you a <b>DDP (delivered duties paid)</b> quote through our forwarders, so you know your landed cost before you order.",
    },
    { type: "h2", text: "Quality control and inspection" },
    {
      type: "list",
      items: [
        "Every production stage is checked, and bulk only starts after you approve a pre-production sample.",
        "You check the finished order before paying the balance: by photos and video, on a live video call, or through a third-party inspector.",
        "Third-party inspection is welcome.",
        "Want to see the workshop? We are happy to do a live video call.",
      ],
    },
    { type: "h2", text: "Who you are working with" },
    {
      type: "p",
      text: "NanCrown is a cap manufacturer in Guangzhou, China, founded in 2015: a <b>2,000 m²</b> facility, <b>30+ skilled workers</b> and capacity for <b>100,000+ caps a month</b>, shipping to customers in <b>50+ countries</b>. Cutting, sewing and assembly run in our own workshop. Embroidery, printing and washing are done by partner workshops we have worked with for years, and every batch comes back to us for checking.",
    },
    { type: "h2", text: "What to send for a quote" },
    {
      type: "list",
      items: [
        "Your design: a sketch, mock-up, tech pack or reference photos",
        "Logo artwork (AI, PDF, SVG or a high-resolution PNG)",
        "Hat style, fabric and colours",
        "Quantity per colour",
        "Decoration, labels and packaging you want",
        "Destination country, for shipping or a DDP quote",
      ],
    },
  ],
  faqHeading: "Pricing FAQ",
  faq: [
    {
      q: "What is your minimum order quantity?",
      a: "50 pieces per colour, per style. You can mix colours within one style to reach a higher price tier, for example 2 colours × 50 pieces priced at the 100-piece tier.",
    },
    {
      q: "How much does a custom cap cost?",
      a: "For our standard build (6-panel cotton twill, flat embroidered logo, woven label), indicative prices are $6.0–7.7 per cap at 50–99 pieces, $5.5–6.7 at 100–299, $4.9–5.8 at 300–499 and $4.5–5.2 at 500+, ex-works Guangzhou. Special fabrics and decorations are quoted per design.",
    },
    {
      q: "How much is a sample, and is it refundable?",
      a: "$60–80 per design, ready in 7–15 days. The fee is refunded when you order 1,000 pieces or more of that design.",
    },
    {
      q: "How long does production take?",
      a: "Bulk production takes 25–30 days after you approve the pre-production sample, plus shipping time.",
    },
    {
      q: "What are your payment terms?",
      a: "A 50% deposit to start production, and the 50% balance after the order passes inspection, before shipping.",
    },
    {
      q: "Can you ship DDP?",
      a: "Yes. We quote ex-works Guangzhou and can get you a DDP quote through our forwarders, so duties and delivery are covered to your door. As a guide, for about 100 standard caps to the US, DDP shipping usually adds US$2–3 or more per cap, depending on weight and speed.",
    },
    {
      q: "Is my own woven label included?",
      a: "In the sample, yes: one custom woven label is included. In bulk, a larger order includes it in the standard price. On a very small order of around 50 pieces, the label has a minimum setup cost that works out to about US$0.4–0.6 per cap.",
    },
    {
      q: "Do performance fabrics cost more?",
      a: "Yes. Quick-dry and breathable performance fabrics, such as those used for running caps, add about US$0.5–1 per cap compared with standard cotton twill, at 50–100 pieces of one style.",
    },
    {
      q: "How are the caps packed?",
      a: "As standard, each cap goes in its own poly bag, 25 caps to an inner box and 100 caps to a carton. Custom packaging, such as branded boxes or hangtags, is quoted separately.",
    },
    {
      q: "Are you a factory or a trading company?",
      a: "A manufacturer. Cutting, sewing and assembly are done in our own workshop in Guangzhou; embroidery, printing and washing are handled by long-term partner workshops and checked by us.",
    },
  ],
  cta: {
    title: "Get an exact quote",
    text: "Send your design and quantities. We reply with prices, sample cost and lead times.",
    button: "Request a Quote",
  },
};

const pricingEs: GuideLocaleContent = {
  metaTitle: "Precios de gorras personalizadas, pedido mínimo y plazos",
  metaDescription:
    "Precios de fábrica para gorras personalizadas desde 50 piezas por color: 6,0–7,7 USD por gorra en 50 y 4,5–5,2 USD desde 500. Muestras en 7–15 días.",
  h1: "Precios de gorras personalizadas, pedido mínimo y plazos",
  lead:
    "Respuestas claras a lo que toda marca pregunta antes de encargar gorras personalizadas: cuánto cuesta una gorra en 50, 100, 300 o 500 piezas, cómo funcionan las muestras, cuánto tarda la producción y cómo se paga. Los precios son orientativos para nuestro modelo estándar. Envíanos tu diseño y te confirmamos un presupuesto exacto.",
  blocks: [
    { type: "h2", text: "Precio por gorra según cantidad" },
    {
      type: "p",
      text: "Modelo estándar: <b>gorra de 6 paneles en sarga de algodón, logo bordado plano en el frente y una etiqueta tejida por dentro</b>. Precio por gorra, para un solo modelo, en fábrica Guangzhou (EXW).",
    },
    {
      type: "table",
      head: ["Cantidad por modelo", "Precio por gorra (USD)", "Ideal para"],
      rows: [
        ["50–99 (mín. 50 por color)", "<b>6,0 – 7,7</b>", "Probar un diseño o un primer lanzamiento"],
        ["100–299", "<b>5,5 – 6,7</b>", "Una primera colección"],
        ["300–499", "<b>4,9 – 5,8</b>", "Modelos principales y reposiciones"],
        ["500+", "<b>4,5 – 5,2</b>", "Superventas y venta al por mayor"],
      ],
      caption:
        "Puedes combinar colores dentro de un mismo modelo para alcanzar un tramo: 2 colores × 50 piezas se cotizan al precio de 100 piezas.",
    },
    { type: "h2", text: "Qué hace variar el precio" },
    {
      type: "list",
      items: [
        "Bordado 3D (puff), parches (cuero, PVC o tejidos) y logos en más posiciones",
        "Lavado de prenda, efecto desgastado y otros acabados especiales",
        "Tejidos especiales como pana, nailon, mezclas de lana o tejidos técnicos",
        "Herrajes personalizados, cinta interior estampada, etiquetas colgantes y embalaje para tienda",
        "Repartos de color muy pequeños, por ejemplo 10 colores × 50 piezas",
      ],
    },
    {
      type: "p",
      text: "Estos elementos se cotizan según el diseño, así que la forma más rápida de tener un precio exacto es enviarnos tu arte y tus especificaciones.",
    },
    { type: "h2", text: "Pedido mínimo (MOQ)" },
    {
      type: "p",
      text: "Nuestro mínimo es de <b>50 piezas por color y por modelo</b>. Puedes combinar colores dentro de un modelo para llegar al siguiente tramo de precio, y un pedido puede incluir varios modelos.",
    },
    { type: "h2", text: "Muestras" },
    {
      type: "list",
      items: [
        "Coste de la muestra: <b>60–80 USD por diseño</b>, según la construcción y la decoración.",
        "Plazo de la muestra: <b>7–15 días</b> desde que confirmamos arte y tejido.",
        "El coste de la muestra se <b>devuelve</b> si pides 1.000 piezas o más de ese diseño.",
        "Las correcciones se hacen antes de tu aprobación. La producción solo empieza cuando das el visto bueno.",
      ],
    },
    { type: "h2", text: "Plazos" },
    {
      type: "steps",
      items: [
        { title: "Muestra", text: "7–15 días desde el arte y el tejido confirmados." },
        { title: "Producción en volumen", text: "25–30 días después de aprobar la muestra de preproducción." },
        {
          title: "Envío",
          text: "El tiempo de tránsito depende del destino y del método de envío. Te lo confirmamos junto con el presupuesto.",
        },
      ],
    },
    { type: "h2", text: "Condiciones de pago" },
    {
      type: "p",
      text: "<b>50 % de anticipo</b> para iniciar la producción. El <b>50 % restante</b> se paga cuando el pedido supera la inspección, antes del envío.",
    },
    { type: "h2", text: "Envío y coste final" },
    {
      type: "p",
      text: "Los precios son en fábrica Guangzhou. Podemos enviar por mensajería o transporte de carga hasta tu puerta, y conseguirte una cotización <b>DDP (entregado con impuestos pagados)</b> a través de nuestros transitarios, para que conozcas el coste final antes de pedir.",
    },
    { type: "h2", text: "Control de calidad e inspección" },
    {
      type: "list",
      items: [
        "Revisamos cada etapa de producción, y la producción en volumen solo empieza cuando apruebas la muestra de preproducción.",
        "Revisas el pedido terminado antes de pagar el resto: con fotos y vídeo, en una videollamada o mediante un inspector externo.",
        "Aceptamos inspecciones de terceros.",
        "¿Quieres ver el taller? Hacemos una videollamada en directo encantados.",
      ],
    },
    { type: "h2", text: "Con quién trabajas" },
    {
      type: "p",
      text: "NanCrown es un fabricante de gorras en Guangzhou (China), fundado en 2015: una instalación de <b>2.000 m²</b>, <b>más de 30 trabajadores</b> cualificados y capacidad para <b>más de 100.000 gorras al mes</b>, con clientes en <b>más de 50 países</b>. El corte, la costura y el montaje se hacen en nuestro propio taller. El bordado, el estampado y el lavado los realizan talleres colaboradores con los que trabajamos desde hace años, y cada lote vuelve a nosotros para su revisión.",
    },
    { type: "h2", text: "Qué enviarnos para cotizar" },
    {
      type: "list",
      items: [
        "Tu diseño: un boceto, una maqueta, una ficha técnica o fotos de referencia",
        "El logo (AI, PDF, SVG o PNG en alta resolución)",
        "Modelo de gorra, tejido y colores",
        "Cantidad por color",
        "Decoración, etiquetas y embalaje que quieres",
        "País de destino, para el envío o una cotización DDP",
      ],
    },
  ],
  faqHeading: "Preguntas frecuentes sobre precios",
  faq: [
    {
      q: "¿Cuál es vuestro pedido mínimo?",
      a: "50 piezas por color y por modelo. Puedes combinar colores dentro de un modelo para alcanzar un tramo de precio mejor; por ejemplo, 2 colores × 50 piezas se cotizan al precio de 100 piezas.",
    },
    {
      q: "¿Cuánto cuesta una gorra personalizada?",
      a: "Para nuestro modelo estándar (6 paneles en sarga de algodón, logo bordado plano, etiqueta tejida), los precios orientativos son 6,0–7,7 USD por gorra en 50–99 piezas, 5,5–6,7 USD en 100–299, 4,9–5,8 USD en 300–499 y 4,5–5,2 USD desde 500, en fábrica Guangzhou. Los tejidos y decoraciones especiales se cotizan según el diseño.",
    },
    {
      q: "¿Cuánto cuesta una muestra y se devuelve?",
      a: "60–80 USD por diseño, lista en 7–15 días. Se devuelve si pides 1.000 piezas o más de ese diseño.",
    },
    {
      q: "¿Cuánto tarda la producción?",
      a: "La producción en volumen tarda 25–30 días después de aprobar la muestra de preproducción, más el tiempo de envío.",
    },
    {
      q: "¿Cuáles son las condiciones de pago?",
      a: "Un 50 % de anticipo para iniciar la producción y el 50 % restante cuando el pedido supera la inspección, antes del envío.",
    },
    {
      q: "¿Podéis enviar en DDP?",
      a: "Sí. Cotizamos en fábrica Guangzhou y podemos conseguirte una cotización DDP a través de nuestros transitarios, con impuestos y entrega incluidos hasta tu puerta. Como referencia, para unas 100 gorras estándar a Estados Unidos, el envío DDP suele sumar 2–3 USD o más por gorra, según el peso y la rapidez.",
    },
    {
      q: "¿Mi etiqueta tejida está incluida?",
      a: "En la muestra, sí: incluye una etiqueta tejida personalizada. En producción, un pedido grande la incluye en el precio estándar. En un pedido muy pequeño, de unas 50 piezas, la etiqueta tiene un coste mínimo de preparación que sale a unos 0,4–0,6 USD por gorra.",
    },
    {
      q: "¿Los tejidos técnicos cuestan más?",
      a: "Sí. Los tejidos técnicos de secado rápido y transpirables, como los de las gorras de running, suman unos 0,5–1 USD por gorra frente a la sarga de algodón estándar, en 50–100 piezas de un modelo.",
    },
    {
      q: "¿Cómo se embalan las gorras?",
      a: "De serie, cada gorra va en su propia bolsa de plástico, 25 gorras por caja interior y 100 por caja de cartón. El embalaje personalizado, como cajas con tu marca o etiquetas colgantes, se presupuesta aparte.",
    },
    {
      q: "¿Sois fábrica o empresa comercializadora?",
      a: "Somos fabricante. El corte, la costura y el montaje se hacen en nuestro propio taller en Guangzhou; el bordado, el estampado y el lavado los realizan talleres colaboradores de confianza y los revisamos nosotros.",
    },
  ],
  cta: {
    title: "Pide un presupuesto exacto",
    text: "Envíanos tu diseño y cantidades. Te respondemos con precios, coste de muestra y plazos.",
    button: "Solicitar presupuesto",
  },
};

const pricingFr: GuideLocaleContent = {
  metaTitle: "Prix des casquettes personnalisées, minimum de commande et délais",
  metaDescription:
    "Prix usine des casquettes personnalisées dès 50 pièces par couleur : 6,0–7,7 USD la casquette à 50, 4,5–5,2 USD dès 500. Échantillon en 7 à 15 jours.",
  h1: "Prix des casquettes personnalisées, minimum de commande et délais",
  lead:
    "Des réponses claires à ce que chaque marque demande avant de commander des casquettes personnalisées : le prix d'une casquette à 50, 100, 300 ou 500 pièces, le fonctionnement des échantillons, la durée de production et le paiement. Les prix sont indicatifs pour notre modèle standard. Envoyez-nous votre design et nous vous confirmons un devis exact.",
  blocks: [
    { type: "h2", text: "Prix par casquette selon la quantité" },
    {
      type: "p",
      text: "Modèle standard : <b>casquette 6 panneaux en sergé de coton, logo brodé à plat sur le devant, une étiquette tissée à l'intérieur</b>. Prix par casquette, pour un modèle, départ usine Guangzhou (EXW).",
    },
    {
      type: "table",
      head: ["Quantité par modèle", "Prix par casquette (USD)", "Idéal pour"],
      rows: [
        ["50–99 (min. 50 par couleur)", "<b>6,0 – 7,7</b>", "Tester un design ou un premier drop"],
        ["100–299", "<b>5,5 – 6,7</b>", "Une première collection"],
        ["300–499", "<b>4,9 – 5,8</b>", "Modèles phares et réassorts"],
        ["500+", "<b>4,5 – 5,2</b>", "Best-sellers et vente en gros"],
      ],
      caption:
        "Vous pouvez mélanger les couleurs d'un même modèle pour atteindre un palier : 2 couleurs × 50 pièces sont facturées au prix du palier de 100 pièces.",
    },
    { type: "h2", text: "Ce qui fait varier le prix" },
    {
      type: "list",
      items: [
        "Broderie 3D (puff), écussons (cuir, PVC ou tissés) et logos à plusieurs emplacements",
        "Délavage, effet usé et autres finitions spéciales",
        "Tissus spéciaux comme le velours côtelé, le nylon, les mélanges laine ou les tissus techniques",
        "Accessoires métalliques personnalisés, ganse intérieure imprimée, étiquettes volantes et emballage boutique",
        "Répartitions de couleurs très petites, par exemple 10 couleurs × 50 pièces",
      ],
    },
    {
      type: "p",
      text: "Ces options sont chiffrées selon le design : le moyen le plus rapide d'obtenir un prix exact est de nous envoyer votre visuel et votre cahier des charges.",
    },
    { type: "h2", text: "Minimum de commande (MOQ)" },
    {
      type: "p",
      text: "Notre minimum est de <b>50 pièces par couleur et par modèle</b>. Vous pouvez mélanger les couleurs d'un modèle pour atteindre le palier de prix suivant, et une commande peut comprendre plusieurs modèles.",
    },
    { type: "h2", text: "Échantillons" },
    {
      type: "list",
      items: [
        "Prix de l'échantillon : <b>60–80 USD par design</b>, selon la construction et la décoration.",
        "Délai de l'échantillon : <b>7 à 15 jours</b> après validation du visuel et du tissu.",
        "Le prix de l'échantillon est <b>remboursé</b> si vous commandez 1 000 pièces ou plus de ce design.",
        "Les corrections sont faites avant votre validation. La production ne démarre qu'après votre accord.",
      ],
    },
    { type: "h2", text: "Délais" },
    {
      type: "steps",
      items: [
        { title: "Échantillon", text: "7 à 15 jours après validation du visuel et du tissu." },
        { title: "Production en série", text: "25 à 30 jours après validation de l'échantillon de pré-production." },
        {
          title: "Expédition",
          text: "Le délai de transport dépend de la destination et du mode d'envoi. Nous le confirmons avec votre devis.",
        },
      ],
    },
    { type: "h2", text: "Conditions de paiement" },
    {
      type: "p",
      text: "<b>50 % d'acompte</b> pour lancer la production. Le <b>solde de 50 %</b> est réglé une fois la commande contrôlée, avant l'expédition.",
    },
    { type: "h2", text: "Expédition et coût rendu" },
    {
      type: "p",
      text: "Les prix s'entendent départ usine Guangzhou. Nous pouvons expédier par coursier ou par fret jusqu'à votre porte, et obtenir pour vous un devis <b>DDP (rendu droits acquittés)</b> auprès de nos transitaires, pour connaître votre coût rendu avant de commander.",
    },
    { type: "h2", text: "Contrôle qualité et inspection" },
    {
      type: "list",
      items: [
        "Chaque étape de production est contrôlée, et la série ne démarre qu'après validation de l'échantillon de pré-production.",
        "Vous vérifiez la commande terminée avant de payer le solde : en photos et vidéo, en appel vidéo ou via un inspecteur indépendant.",
        "Les inspections par un tiers sont les bienvenues.",
        "Envie de voir l'atelier ? Nous organisons volontiers un appel vidéo en direct.",
      ],
    },
    { type: "h2", text: "Avec qui vous travaillez" },
    {
      type: "p",
      text: "NanCrown est un fabricant de casquettes à Guangzhou (Chine), fondé en 2015 : un site de <b>2 000 m²</b>, <b>plus de 30 ouvriers</b> qualifiés et une capacité de <b>plus de 100 000 casquettes par mois</b>, avec des clients dans <b>plus de 50 pays</b>. La coupe, la couture et l'assemblage se font dans notre propre atelier. La broderie, l'impression et le délavage sont confiés à des ateliers partenaires avec lesquels nous travaillons depuis des années, et chaque lot revient chez nous pour contrôle.",
    },
    { type: "h2", text: "Ce qu'il faut nous envoyer pour un devis" },
    {
      type: "list",
      items: [
        "Votre design : croquis, maquette, fiche technique ou photos de référence",
        "Le logo (AI, PDF, SVG ou PNG haute résolution)",
        "Le modèle de casquette, le tissu et les couleurs",
        "La quantité par couleur",
        "La décoration, les étiquettes et l'emballage souhaités",
        "Le pays de destination, pour l'expédition ou un devis DDP",
      ],
    },
  ],
  faqHeading: "Questions fréquentes sur les prix",
  faq: [
    {
      q: "Quel est votre minimum de commande ?",
      a: "50 pièces par couleur et par modèle. Vous pouvez mélanger les couleurs d'un modèle pour atteindre un meilleur palier de prix : par exemple, 2 couleurs × 50 pièces sont facturées au palier de 100 pièces.",
    },
    {
      q: "Combien coûte une casquette personnalisée ?",
      a: "Pour notre modèle standard (6 panneaux en sergé de coton, logo brodé à plat, étiquette tissée), les prix indicatifs sont de 6,0–7,7 USD la casquette pour 50–99 pièces, 5,5–6,7 USD pour 100–299, 4,9–5,8 USD pour 300–499 et 4,5–5,2 USD dès 500, départ usine Guangzhou. Les tissus et décorations spéciaux sont chiffrés selon le design.",
    },
    {
      q: "Combien coûte un échantillon, et est-il remboursé ?",
      a: "60–80 USD par design, prêt en 7 à 15 jours. Il est remboursé si vous commandez 1 000 pièces ou plus de ce design.",
    },
    {
      q: "Combien de temps dure la production ?",
      a: "La production en série prend 25 à 30 jours après validation de l'échantillon de pré-production, plus le délai de transport.",
    },
    {
      q: "Quelles sont vos conditions de paiement ?",
      a: "50 % d'acompte pour lancer la production, et le solde de 50 % une fois la commande contrôlée, avant l'expédition.",
    },
    {
      q: "Pouvez-vous expédier en DDP ?",
      a: "Oui. Nous chiffrons départ usine Guangzhou et pouvons obtenir un devis DDP auprès de nos transitaires, droits et livraison compris jusqu'à votre porte. À titre indicatif, pour environ 100 casquettes standard vers les États-Unis, le transport DDP ajoute en général 2 à 3 USD ou plus par casquette, selon le poids et le délai.",
    },
    {
      q: "Mon étiquette tissée est-elle comprise ?",
      a: "Dans l'échantillon, oui : une étiquette tissée personnalisée est comprise. En production, une grande commande l'inclut dans le prix standard. Sur une très petite commande, autour de 50 pièces, l'étiquette a un coût minimum de mise en route d'environ 0,4 à 0,6 USD par casquette.",
    },
    {
      q: "Les tissus techniques coûtent-ils plus cher ?",
      a: "Oui. Les tissus techniques à séchage rapide et respirants, comme ceux des casquettes de running, ajoutent environ 0,5 à 1 USD par casquette par rapport au sergé de coton standard, pour 50 à 100 pièces d'un modèle.",
    },
    {
      q: "Comment les casquettes sont-elles emballées ?",
      a: "En standard, chaque casquette est dans son sachet plastique, 25 casquettes par boîte intérieure et 100 par carton. Un emballage personnalisé, comme des boîtes à votre marque ou des étiquettes volantes, est chiffré à part.",
    },
    {
      q: "Êtes-vous une usine ou une société de négoce ?",
      a: "Un fabricant. La coupe, la couture et l'assemblage sont réalisés dans notre propre atelier à Guangzhou ; la broderie, l'impression et le délavage sont confiés à des ateliers partenaires de longue date et contrôlés par nous.",
    },
  ],
  cta: {
    title: "Obtenez un devis exact",
    text: "Envoyez-nous votre design et vos quantités. Nous répondons avec les prix, le coût de l'échantillon et les délais.",
    button: "Demander un devis",
  },
};

const pricingDe: GuideLocaleContent = {
  metaTitle: "Preise für individuelle Caps, Mindestmenge und Lieferzeiten",
  metaDescription:
    "Fabrikpreise für individuelle Caps ab 50 Stück pro Farbe: 6,0–7,7 USD pro Cap bei 50, 4,5–5,2 USD ab 500. Muster in 7–15 Tagen, Serie in 25–30 Tagen.",
  h1: "Preise für individuelle Caps, Mindestmenge und Lieferzeiten",
  lead:
    "Klare Antworten auf das, was jede Marke vor der Bestellung individueller Caps wissen will: was eine Cap bei 50, 100, 300 oder 500 Stück kostet, wie Muster funktionieren, wie lange die Produktion dauert und wie Sie bezahlen. Die Preise sind Richtwerte für unser Standardmodell. Schicken Sie uns Ihr Design, und wir bestätigen Ihnen ein genaues Angebot.",
  blocks: [
    { type: "h2", text: "Preis pro Cap nach Menge" },
    {
      type: "p",
      text: "Standardmodell: <b>6-Panel-Cap aus Baumwoll-Twill, flach gesticktes Logo vorne, ein gewebtes Etikett innen</b>. Preis pro Cap, für ein Modell, ab Werk Guangzhou (EXW).",
    },
    {
      type: "table",
      head: ["Menge pro Modell", "Preis pro Cap (USD)", "Geeignet für"],
      rows: [
        ["50–99 (mind. 50 pro Farbe)", "<b>6,0 – 7,7</b>", "Ein Design testen oder einen ersten Drop"],
        ["100–299", "<b>5,5 – 6,7</b>", "Eine erste Kollektion"],
        ["300–499", "<b>4,9 – 5,8</b>", "Kernmodelle und Nachbestellungen"],
        ["500+", "<b>4,5 – 5,2</b>", "Bestseller und Großhandel"],
      ],
      caption:
        "Farben innerhalb eines Modells lassen sich kombinieren, um eine Preisstufe zu erreichen: 2 Farben × 50 Stück werden zum Preis der 100-Stück-Stufe berechnet.",
    },
    { type: "h2", text: "Was den Preis verändert" },
    {
      type: "list",
      items: [
        "3D-Puff-Stickerei, Patches (Leder, PVC oder gewebt) und zusätzliche Logopositionen",
        "Garment-Waschung, Used-Look und andere Sonderveredelungen",
        "Spezialstoffe wie Cord, Nylon, Wollmischungen oder technische Funktionsstoffe",
        "Individuelle Metallteile, bedrucktes Innenband, Hängeetiketten und Verkaufsverpackung",
        "Sehr kleine Farbaufteilungen, zum Beispiel 10 Farben × 50 Stück",
      ],
    },
    {
      type: "p",
      text: "Diese Punkte kalkulieren wir je Design. Am schnellsten kommen Sie zu einem genauen Preis, wenn Sie uns Ihre Vorlage und Spezifikation schicken.",
    },
    { type: "h2", text: "Mindestbestellmenge (MOQ)" },
    {
      type: "p",
      text: "Unsere Mindestmenge liegt bei <b>50 Stück pro Farbe und Modell</b>. Sie können Farben innerhalb eines Modells kombinieren, um die nächste Preisstufe zu erreichen, und eine Bestellung kann mehrere Modelle umfassen.",
    },
    { type: "h2", text: "Muster" },
    {
      type: "list",
      items: [
        "Musterkosten: <b>60–80 USD pro Design</b>, je nach Konstruktion und Veredelung.",
        "Musterzeit: <b>7–15 Tage</b>, nachdem Vorlage und Stoff bestätigt sind.",
        "Die Musterkosten werden <b>erstattet</b>, wenn Sie 1.000 Stück oder mehr von diesem Design bestellen.",
        "Korrekturen erfolgen vor Ihrer Freigabe. Die Serienproduktion startet erst nach Ihrem Okay.",
      ],
    },
    { type: "h2", text: "Lieferzeiten" },
    {
      type: "steps",
      items: [
        { title: "Muster", text: "7–15 Tage ab bestätigter Vorlage und bestätigtem Stoff." },
        { title: "Serienproduktion", text: "25–30 Tage nach Freigabe des Vorproduktionsmusters." },
        {
          title: "Versand",
          text: "Die Transportzeit hängt von Zielort und Versandart ab. Wir bestätigen sie zusammen mit Ihrem Angebot.",
        },
      ],
    },
    { type: "h2", text: "Zahlungsbedingungen" },
    {
      type: "p",
      text: "<b>50 % Anzahlung</b> zum Start der Produktion. Die <b>restlichen 50 %</b> werden fällig, wenn die Bestellung die Prüfung bestanden hat, vor dem Versand.",
    },
    { type: "h2", text: "Versand und Gesamtkosten" },
    {
      type: "p",
      text: "Die Preise gelten ab Werk Guangzhou. Wir versenden per Kurier oder Fracht bis zu Ihnen und besorgen über unsere Spediteure ein <b>DDP-Angebot (verzollt geliefert)</b>, damit Sie Ihre Gesamtkosten vor der Bestellung kennen.",
    },
    { type: "h2", text: "Qualitätskontrolle und Prüfung" },
    {
      type: "list",
      items: [
        "Jeder Produktionsschritt wird geprüft, und die Serie startet erst nach Freigabe des Vorproduktionsmusters.",
        "Sie prüfen die fertige Bestellung, bevor Sie den Rest bezahlen: per Fotos und Video, im Live-Videocall oder durch einen externen Prüfer.",
        "Prüfungen durch Dritte sind willkommen.",
        "Sie möchten die Werkstatt sehen? Gerne per Live-Videocall.",
      ],
    },
    { type: "h2", text: "Mit wem Sie arbeiten" },
    {
      type: "p",
      text: "NanCrown ist ein Cap-Hersteller in Guangzhou, China, gegründet 2015: <b>2.000 m²</b> Fläche, <b>über 30 Fachkräfte</b> und eine Kapazität von <b>über 100.000 Caps pro Monat</b>, mit Kunden in <b>über 50 Ländern</b>. Zuschnitt, Nähen und Montage erfolgen in unserer eigenen Werkstatt. Stickerei, Druck und Waschung übernehmen Partnerwerkstätten, mit denen wir seit Jahren arbeiten, und jede Charge kommt zur Prüfung zu uns zurück.",
    },
    { type: "h2", text: "Was Sie uns für ein Angebot schicken" },
    {
      type: "list",
      items: [
        "Ihr Design: Skizze, Mockup, Tech Pack oder Referenzfotos",
        "Logo-Datei (AI, PDF, SVG oder hochauflösendes PNG)",
        "Cap-Modell, Stoff und Farben",
        "Menge pro Farbe",
        "Gewünschte Veredelung, Etiketten und Verpackung",
        "Zielland, für den Versand oder ein DDP-Angebot",
      ],
    },
  ],
  faqHeading: "Häufige Fragen zu Preisen",
  faq: [
    {
      q: "Wie hoch ist Ihre Mindestbestellmenge?",
      a: "50 Stück pro Farbe und Modell. Sie können Farben innerhalb eines Modells kombinieren, um eine bessere Preisstufe zu erreichen, zum Beispiel 2 Farben × 50 Stück zum Preis der 100-Stück-Stufe.",
    },
    {
      q: "Was kostet eine individuelle Cap?",
      a: "Für unser Standardmodell (6-Panel aus Baumwoll-Twill, flach gesticktes Logo, gewebtes Etikett) liegen die Richtpreise bei 6,0–7,7 USD pro Cap für 50–99 Stück, 5,5–6,7 USD für 100–299, 4,9–5,8 USD für 300–499 und 4,5–5,2 USD ab 500, ab Werk Guangzhou. Spezialstoffe und Veredelungen kalkulieren wir je Design.",
    },
    {
      q: "Was kostet ein Muster, und wird es erstattet?",
      a: "60–80 USD pro Design, fertig in 7–15 Tagen. Die Kosten werden erstattet, wenn Sie 1.000 Stück oder mehr von diesem Design bestellen.",
    },
    {
      q: "Wie lange dauert die Produktion?",
      a: "Die Serienproduktion dauert 25–30 Tage nach Freigabe des Vorproduktionsmusters, zuzüglich Transportzeit.",
    },
    {
      q: "Wie sind Ihre Zahlungsbedingungen?",
      a: "50 % Anzahlung zum Produktionsstart und die restlichen 50 %, wenn die Bestellung die Prüfung bestanden hat, vor dem Versand.",
    },
    {
      q: "Liefern Sie auch DDP?",
      a: "Ja. Wir kalkulieren ab Werk Guangzhou und besorgen über unsere Spediteure ein DDP-Angebot, bei dem Zoll und Zustellung bis zu Ihrer Tür enthalten sind. Als Richtwert: Für etwa 100 Standard-Caps in die USA kommen beim DDP-Versand meist 2–3 USD oder mehr pro Cap hinzu, je nach Gewicht und Tempo.",
    },
    {
      q: "Ist mein eigenes Webetikett enthalten?",
      a: "Im Muster ja: Ein individuelles Webetikett ist enthalten. In der Serie ist es bei größeren Mengen im Standardpreis enthalten. Bei sehr kleinen Aufträgen um 50 Stück hat das Etikett Mindestrüstkosten von umgerechnet etwa 0,4–0,6 USD pro Cap.",
    },
    {
      q: "Kosten Funktionsstoffe mehr?",
      a: "Ja. Schnell trocknende, atmungsaktive Funktionsstoffe, wie sie für Laufcaps verwendet werden, kosten etwa 0,5–1 USD mehr pro Cap als Standard-Baumwoll-Twill, bei 50–100 Stück eines Modells.",
    },
    {
      q: "Wie werden die Caps verpackt?",
      a: "Standardmäßig kommt jede Cap in einen eigenen Polybeutel, 25 Caps in einen Innenkarton und 100 in einen Versandkarton. Individuelle Verpackung wie Markenboxen oder Hängeetiketten wird separat kalkuliert.",
    },
    {
      q: "Sind Sie Hersteller oder Händler?",
      a: "Hersteller. Zuschnitt, Nähen und Montage erfolgen in unserer eigenen Werkstatt in Guangzhou; Stickerei, Druck und Waschung übernehmen langjährige Partnerwerkstätten, geprüft von uns.",
    },
  ],
  cta: {
    title: "Genaues Angebot anfordern",
    text: "Schicken Sie uns Ihr Design und Ihre Mengen. Wir antworten mit Preisen, Musterkosten und Lieferzeiten.",
    button: "Angebot anfordern",
  },
};

// ─────────────────────────── /start-a-hat-brand ───────────────────────────

const brandEn: GuideLocaleContent = {
  metaTitle: "Hat Manufacturer for New Brands: Your First Collection",
  metaDescription:
    "Launching a hat brand? We make custom caps and hats from 50 pieces per colour. Plan a first collection of 2–5 styles, samples in 7–15 days, bulk in 25–30 days.",
  h1: "Hat Manufacturer for New Brands: Your First Collection",
  lead:
    "A new hat brand usually starts with a few designs, a limited budget and no room for a bad first batch. Here is how we take new brands from an idea to finished caps, and how to plan a first order that sells through and sets you up for reorders.",
  blocks: [
    { type: "h2", text: "Plan your first order" },
    { type: "p", text: "A focused first collection is easier to sell and easier to reorder. We suggest keeping it simple:" },
    {
      type: "list",
      items: [
        "<b>2–5 styles</b>, for example a washed dad cap, a trucker and a bucket hat",
        "<b>100–300 pieces per style</b> for your core designs, which reaches better price tiers than 50-piece runs",
        "<b>2–3 colours per style</b>; test extra colours at 50 pieces each",
        "<b>One sample of every style</b> before bulk production",
      ],
    },
    { type: "h2", text: "What it costs: three examples" },
    {
      type: "table",
      head: ["Plan", "Quantity", "Indicative cap cost*"],
      rows: [
        ["Test drop: 1 style in 2 colours", "2 × 50 = 100 pcs", "<b>$550 – 670</b>"],
        ["First collection: 3 styles", "3 × 100 = 300 pcs", "<b>$1,650 – 2,010</b>"],
        ["Core range: 2 styles", "2 × 300 = 600 pcs", "<b>$2,940 – 3,480</b>"],
      ],
      caption:
        "*Standard build (6-panel cotton twill, flat embroidered logo, woven label), ex-works Guangzhou. Price tiers apply per style. Samples ($60–80 per design), special decorations and shipping are extra; the sample fee is refunded when you order 1,000+ pieces of a design.",
    },
    { type: "h2", text: "From idea to delivery" },
    {
      type: "steps",
      items: [
        {
          title: "Send your idea",
          text: "A sketch, a mock-up, reference photos or a full tech pack, plus your logo file and target quantities.",
        },
        {
          title: "Quote and sample",
          text: "We confirm materials, decoration and price, then make a physical sample in 7–15 days. Revisions are included before you approve.",
        },
        { title: "Bulk production", text: "25–30 days after sample approval, with checks at every stage." },
        {
          title: "Inspection and shipping",
          text: "You check the finished order by photos, video call or a third-party inspector, pay the balance, and we ship to your door.",
        },
      ],
    },
    { type: "h2", text: "What we can make for your brand" },
    {
      type: "list",
      items: [
        "<b>Styles:</b> baseball and dad caps, snapbacks, 5-panel caps, trucker hats, cadet caps, bucket hats, running and golf caps, camp caps, visors and winter hats",
        "<b>Decoration:</b> flat and 3D puff embroidery, appliqué, leather, PVC and woven patches, screen printing, reflective prints and laser-cut ventilation holes",
        "<b>Branding:</b> woven labels, printed inside taping, hangtags and packaging",
      ],
    },
    { type: "h2", text: "Tips from the factory floor" },
    {
      type: "list",
      items: [
        "Put your budget into one or two hero styles rather than many styles at 50 pieces each.",
        "Choose decoration you can repeat: the same embroidery file and labels keep reorders consistent.",
        "Order a sample of every style. Fit and crown shape matter more than a small price difference.",
        "Ask for your landed cost (DDP) so shipping and duties don't surprise you.",
      ],
    },
  ],
  faqHeading: "New brand FAQ",
  faq: [
    {
      q: "Can I start with just 50 pieces?",
      a: "Yes. Our minimum is 50 pieces per colour, per style. It is a good way to test one design before committing to bigger runs.",
    },
    {
      q: "Do I need a tech pack?",
      a: "No. A sketch, mock-up or reference photos plus your logo file are enough to start. We turn them into a sample for you to approve.",
    },
    {
      q: "How long until I have finished hats?",
      a: "About 7–15 days for the sample, then 25–30 days for bulk production after you approve it, plus shipping time.",
    },
    {
      q: "Can you help with labels and packaging?",
      a: "Yes. Woven labels, printed inside taping, hangtags and packaging can all carry your brand. One custom woven label is included in your sample; on very small bulk orders (around 50 pieces) the label adds about US$0.4–0.6 per cap.",
    },
  ],
  cta: {
    title: "Plan your first collection with us",
    text: "Tell us your styles, colours and target quantities. We will suggest the most cost-effective way to build it.",
    button: "Request a Quote",
  },
};

const brandEs: GuideLocaleContent = {
  metaTitle: "Fabricante de gorras para marcas nuevas: tu primera colección",
  metaDescription:
    "¿Lanzas una marca de gorras? Fabricamos gorras personalizadas desde 50 piezas por color. Planifica una colección de 2–5 modelos, muestras en 7–15 días.",
  h1: "Fabricante de gorras para marcas nuevas: tu primera colección",
  lead:
    "Una marca de gorras nueva suele empezar con pocos diseños, un presupuesto ajustado y ningún margen para un primer lote fallido. Así acompañamos a las marcas nuevas desde la idea hasta la gorra terminada, y así puedes planificar un primer pedido que se venda y te prepare para reponer.",
  blocks: [
    { type: "h2", text: "Planifica tu primer pedido" },
    { type: "p", text: "Una primera colección concentrada es más fácil de vender y de reponer. Te recomendamos mantenerlo simple:" },
    {
      type: "list",
      items: [
        "<b>2–5 modelos</b>, por ejemplo una dad cap lavada, una trucker y un gorro de pescador",
        "<b>100–300 piezas por modelo</b> en tus diseños principales, que alcanzan mejores tramos de precio que las tiradas de 50",
        "<b>2–3 colores por modelo</b>; prueba colores extra con 50 piezas cada uno",
        "<b>Una muestra de cada modelo</b> antes de la producción",
      ],
    },
    { type: "h2", text: "Cuánto cuesta: tres ejemplos" },
    {
      type: "table",
      head: ["Plan", "Cantidad", "Coste orientativo de las gorras*"],
      rows: [
        ["Lanzamiento de prueba: 1 modelo en 2 colores", "2 × 50 = 100 uds.", "<b>550 – 670 USD</b>"],
        ["Primera colección: 3 modelos", "3 × 100 = 300 uds.", "<b>1.650 – 2.010 USD</b>"],
        ["Gama principal: 2 modelos", "2 × 300 = 600 uds.", "<b>2.940 – 3.480 USD</b>"],
      ],
      caption:
        "*Modelo estándar (6 paneles en sarga de algodón, logo bordado plano, etiqueta tejida), en fábrica Guangzhou. Los tramos de precio se aplican por modelo. Las muestras (60–80 USD por diseño), las decoraciones especiales y el envío van aparte; la muestra se devuelve si pides 1.000 piezas o más de un diseño.",
    },
    { type: "h2", text: "De la idea a la entrega" },
    {
      type: "steps",
      items: [
        {
          title: "Envía tu idea",
          text: "Un boceto, una maqueta, fotos de referencia o una ficha técnica completa, junto con tu logo y las cantidades previstas.",
        },
        {
          title: "Presupuesto y muestra",
          text: "Confirmamos materiales, decoración y precio, y hacemos una muestra física en 7–15 días. Las correcciones están incluidas antes de tu aprobación.",
        },
        { title: "Producción", text: "25–30 días después de aprobar la muestra, con controles en cada etapa." },
        {
          title: "Inspección y envío",
          text: "Revisas el pedido terminado con fotos, videollamada o un inspector externo, pagas el resto y te lo enviamos a la puerta.",
        },
      ],
    },
    { type: "h2", text: "Qué podemos fabricar para tu marca" },
    {
      type: "list",
      items: [
        "<b>Modelos:</b> gorras de béisbol y dad caps, snapbacks, gorras de 5 paneles, truckers, gorras cadete, gorros de pescador, gorras de running y de golf, camp caps, viseras y gorros de invierno",
        "<b>Decoración:</b> bordado plano y 3D (puff), aplicaciones, parches de cuero, PVC y tejidos, serigrafía, estampados reflectantes y perforaciones láser de ventilación",
        "<b>Marca:</b> etiquetas tejidas, cinta interior estampada, etiquetas colgantes y embalaje",
      ],
    },
    { type: "h2", text: "Consejos desde la fábrica" },
    {
      type: "list",
      items: [
        "Concentra el presupuesto en uno o dos modelos estrella en lugar de muchos modelos de 50 piezas.",
        "Elige decoraciones que puedas repetir: el mismo archivo de bordado y las mismas etiquetas mantienen las reposiciones iguales.",
        "Pide una muestra de cada modelo. El ajuste y la forma de la copa importan más que una pequeña diferencia de precio.",
        "Pide el coste final (DDP) para que el envío y los impuestos no te sorprendan.",
      ],
    },
  ],
  faqHeading: "Preguntas frecuentes para marcas nuevas",
  faq: [
    {
      q: "¿Puedo empezar con solo 50 piezas?",
      a: "Sí. Nuestro mínimo es de 50 piezas por color y por modelo. Es una buena forma de probar un diseño antes de comprometerte con tiradas mayores.",
    },
    {
      q: "¿Necesito una ficha técnica?",
      a: "No. Con un boceto, una maqueta o fotos de referencia y tu logo basta para empezar. Lo convertimos en una muestra para que la apruebes.",
    },
    {
      q: "¿Cuánto tardaré en tener las gorras terminadas?",
      a: "Unos 7–15 días para la muestra y luego 25–30 días de producción tras tu aprobación, más el tiempo de envío.",
    },
    {
      q: "¿Podéis ayudar con etiquetas y embalaje?",
      a: "Sí. Las etiquetas tejidas, la cinta interior estampada, las etiquetas colgantes y el embalaje pueden llevar tu marca. La muestra incluye una etiqueta tejida personalizada; en pedidos muy pequeños (unas 50 piezas) la etiqueta suma unos 0,4–0,6 USD por gorra.",
    },
  ],
  cta: {
    title: "Planifica tu primera colección con nosotros",
    text: "Cuéntanos tus modelos, colores y cantidades previstas. Te propondremos la forma más rentable de hacerla.",
    button: "Solicitar presupuesto",
  },
};

const brandFr: GuideLocaleContent = {
  metaTitle: "Fabricant de casquettes pour nouvelles marques : votre première collection",
  metaDescription:
    "Vous lancez une marque de casquettes ? Fabrication dès 50 pièces par couleur. Préparez une première collection de 2 à 5 modèles, échantillon en 7 à 15 jours.",
  h1: "Fabricant de casquettes pour nouvelles marques : votre première collection",
  lead:
    "Une nouvelle marque de casquettes démarre souvent avec quelques designs, un budget serré et aucune marge pour un premier lot raté. Voici comment nous accompagnons les nouvelles marques de l'idée à la casquette finie, et comment préparer une première commande qui se vend et prépare vos réassorts.",
  blocks: [
    { type: "h2", text: "Préparez votre première commande" },
    { type: "p", text: "Une première collection resserrée se vend et se réassortit plus facilement. Notre conseil : restez simple." },
    {
      type: "list",
      items: [
        "<b>2 à 5 modèles</b>, par exemple une dad cap délavée, une trucker et un bob",
        "<b>100 à 300 pièces par modèle</b> pour vos designs principaux, pour atteindre de meilleurs paliers de prix qu'avec des séries de 50",
        "<b>2 à 3 couleurs par modèle</b> ; testez les couleurs supplémentaires à 50 pièces chacune",
        "<b>Un échantillon de chaque modèle</b> avant la production en série",
      ],
    },
    { type: "h2", text: "Combien ça coûte : trois exemples" },
    {
      type: "table",
      head: ["Projet", "Quantité", "Coût indicatif des casquettes*"],
      rows: [
        ["Drop test : 1 modèle en 2 couleurs", "2 × 50 = 100 pcs", "<b>550 – 670 USD</b>"],
        ["Première collection : 3 modèles", "3 × 100 = 300 pcs", "<b>1 650 – 2 010 USD</b>"],
        ["Gamme principale : 2 modèles", "2 × 300 = 600 pcs", "<b>2 940 – 3 480 USD</b>"],
      ],
      caption:
        "*Modèle standard (6 panneaux en sergé de coton, logo brodé à plat, étiquette tissée), départ usine Guangzhou. Les paliers de prix s'appliquent par modèle. Échantillons (60–80 USD par design), décorations spéciales et transport en sus ; l'échantillon est remboursé dès 1 000 pièces commandées d'un même design.",
    },
    { type: "h2", text: "De l'idée à la livraison" },
    {
      type: "steps",
      items: [
        {
          title: "Envoyez votre idée",
          text: "Un croquis, une maquette, des photos de référence ou une fiche technique complète, avec votre logo et les quantités visées.",
        },
        {
          title: "Devis et échantillon",
          text: "Nous validons matières, décoration et prix, puis réalisons un échantillon physique en 7 à 15 jours. Les corrections sont incluses avant votre validation.",
        },
        { title: "Production en série", text: "25 à 30 jours après validation de l'échantillon, avec des contrôles à chaque étape." },
        {
          title: "Inspection et expédition",
          text: "Vous vérifiez la commande terminée en photos, en appel vidéo ou via un inspecteur indépendant, vous réglez le solde, et nous livrons à votre porte.",
        },
      ],
    },
    { type: "h2", text: "Ce que nous fabriquons pour votre marque" },
    {
      type: "list",
      items: [
        "<b>Modèles :</b> casquettes baseball et dad caps, snapbacks, casquettes 5 panneaux, truckers, casquettes cadet, bobs, casquettes de running et de golf, camp caps, visières et bonnets d'hiver",
        "<b>Décoration :</b> broderie à plat et 3D (puff), appliqués, écussons cuir, PVC et tissés, sérigraphie, impressions réfléchissantes et micro-perforations laser d'aération",
        "<b>Marque :</b> étiquettes tissées, ganse intérieure imprimée, étiquettes volantes et emballage",
      ],
    },
    { type: "h2", text: "Conseils de l'atelier" },
    {
      type: "list",
      items: [
        "Concentrez votre budget sur un ou deux modèles phares plutôt que sur beaucoup de modèles à 50 pièces.",
        "Choisissez une décoration reproductible : le même fichier de broderie et les mêmes étiquettes garantissent des réassorts identiques.",
        "Commandez un échantillon de chaque modèle. Le tombé et la forme de la calotte comptent plus qu'un petit écart de prix.",
        "Demandez votre coût rendu (DDP) pour ne pas être surpris par le transport et les droits.",
      ],
    },
  ],
  faqHeading: "Questions fréquentes des nouvelles marques",
  faq: [
    {
      q: "Puis-je commencer avec seulement 50 pièces ?",
      a: "Oui. Notre minimum est de 50 pièces par couleur et par modèle. C'est un bon moyen de tester un design avant de passer à des séries plus importantes.",
    },
    {
      q: "Ai-je besoin d'une fiche technique ?",
      a: "Non. Un croquis, une maquette ou des photos de référence avec votre logo suffisent pour commencer. Nous en faisons un échantillon à valider.",
    },
    {
      q: "Dans combien de temps aurai-je mes casquettes ?",
      a: "Environ 7 à 15 jours pour l'échantillon, puis 25 à 30 jours de production après votre validation, plus le délai de transport.",
    },
    {
      q: "Pouvez-vous m'aider pour les étiquettes et l'emballage ?",
      a: "Oui. Étiquettes tissées, ganse intérieure imprimée, étiquettes volantes et emballage peuvent tous porter votre marque. Une étiquette tissée personnalisée est comprise dans l'échantillon ; sur les très petites séries (autour de 50 pièces), l'étiquette ajoute environ 0,4 à 0,6 USD par casquette.",
    },
  ],
  cta: {
    title: "Préparons votre première collection",
    text: "Indiquez-nous vos modèles, couleurs et quantités visées. Nous vous proposerons la façon la plus rentable de la réaliser.",
    button: "Demander un devis",
  },
};

const brandDe: GuideLocaleContent = {
  metaTitle: "Cap-Hersteller für neue Marken: Ihre erste Kollektion",
  metaDescription:
    "Sie gründen eine Cap-Marke? Wir fertigen individuelle Caps ab 50 Stück pro Farbe. Planen Sie eine erste Kollektion mit 2–5 Modellen, Muster in 7–15 Tagen.",
  h1: "Cap-Hersteller für neue Marken: Ihre erste Kollektion",
  lead:
    "Eine neue Cap-Marke startet meist mit wenigen Designs, einem knappen Budget und keinem Spielraum für eine missglückte erste Charge. So begleiten wir neue Marken von der Idee bis zur fertigen Cap, und so planen Sie eine erste Bestellung, die sich verkauft und den Weg für Nachbestellungen ebnet.",
  blocks: [
    { type: "h2", text: "Planen Sie Ihre erste Bestellung" },
    { type: "p", text: "Eine fokussierte erste Kollektion verkauft sich leichter und lässt sich leichter nachbestellen. Unser Rat: Halten Sie es einfach." },
    {
      type: "list",
      items: [
        "<b>2–5 Modelle</b>, zum Beispiel eine gewaschene Dad Cap, eine Trucker Cap und ein Fischerhut",
        "<b>100–300 Stück pro Modell</b> für Ihre Kerndesigns, damit erreichen Sie bessere Preisstufen als mit 50er-Serien",
        "<b>2–3 Farben pro Modell</b>; weitere Farben testen Sie mit je 50 Stück",
        "<b>Ein Muster von jedem Modell</b> vor der Serienproduktion",
      ],
    },
    { type: "h2", text: "Was es kostet: drei Beispiele" },
    {
      type: "table",
      head: ["Plan", "Menge", "Richtwert Cap-Kosten*"],
      rows: [
        ["Test-Drop: 1 Modell in 2 Farben", "2 × 50 = 100 Stk.", "<b>550 – 670 USD</b>"],
        ["Erste Kollektion: 3 Modelle", "3 × 100 = 300 Stk.", "<b>1.650 – 2.010 USD</b>"],
        ["Kernsortiment: 2 Modelle", "2 × 300 = 600 Stk.", "<b>2.940 – 3.480 USD</b>"],
      ],
      caption:
        "*Standardmodell (6-Panel aus Baumwoll-Twill, flach gesticktes Logo, gewebtes Etikett), ab Werk Guangzhou. Die Preisstufen gelten pro Modell. Muster (60–80 USD pro Design), Sonderveredelungen und Versand kommen hinzu; die Musterkosten werden ab 1.000 Stück eines Designs erstattet.",
    },
    { type: "h2", text: "Von der Idee bis zur Lieferung" },
    {
      type: "steps",
      items: [
        {
          title: "Idee schicken",
          text: "Eine Skizze, ein Mockup, Referenzfotos oder ein komplettes Tech Pack, dazu Ihre Logo-Datei und die geplanten Mengen.",
        },
        {
          title: "Angebot und Muster",
          text: "Wir klären Material, Veredelung und Preis und fertigen in 7–15 Tagen ein physisches Muster. Korrekturen vor Ihrer Freigabe sind inklusive.",
        },
        { title: "Serienproduktion", text: "25–30 Tage nach Freigabe des Musters, mit Kontrollen bei jedem Schritt." },
        {
          title: "Prüfung und Versand",
          text: "Sie prüfen die fertige Bestellung per Fotos, Videocall oder externem Prüfer, zahlen den Rest, und wir liefern bis zu Ihnen.",
        },
      ],
    },
    { type: "h2", text: "Was wir für Ihre Marke fertigen" },
    {
      type: "list",
      items: [
        "<b>Modelle:</b> Baseball Caps und Dad Caps, Snapbacks, 5-Panel Caps, Trucker Caps, Cadet Caps, Fischerhüte, Running- und Golf-Caps, Camp Caps, Visors und Wintermützen",
        "<b>Veredelung:</b> Flach- und 3D-Puff-Stickerei, Applikationen, Leder-, PVC- und Web-Patches, Siebdruck, Reflexdruck und Laser-Lüftungslöcher",
        "<b>Branding:</b> gewebte Etiketten, bedrucktes Innenband, Hängeetiketten und Verpackung",
      ],
    },
    { type: "h2", text: "Tipps aus der Werkstatt" },
    {
      type: "list",
      items: [
        "Stecken Sie Ihr Budget in ein oder zwei Hero-Modelle statt in viele Modelle mit je 50 Stück.",
        "Wählen Sie wiederholbare Veredelungen: dieselbe Stickdatei und dieselben Etiketten halten Nachbestellungen einheitlich.",
        "Bestellen Sie von jedem Modell ein Muster. Passform und Kopfform sind wichtiger als ein kleiner Preisunterschied.",
        "Fragen Sie nach den Gesamtkosten (DDP), damit Versand und Zoll Sie nicht überraschen.",
      ],
    },
  ],
  faqHeading: "Häufige Fragen neuer Marken",
  faq: [
    {
      q: "Kann ich mit nur 50 Stück starten?",
      a: "Ja. Unsere Mindestmenge liegt bei 50 Stück pro Farbe und Modell. So testen Sie ein Design, bevor Sie größere Serien bestellen.",
    },
    {
      q: "Brauche ich ein Tech Pack?",
      a: "Nein. Eine Skizze, ein Mockup oder Referenzfotos plus Ihre Logo-Datei reichen für den Start. Daraus fertigen wir ein Muster zur Freigabe.",
    },
    {
      q: "Wann habe ich die fertigen Caps?",
      a: "Etwa 7–15 Tage für das Muster, danach 25–30 Tage Serienproduktion nach Ihrer Freigabe, zuzüglich Transportzeit.",
    },
    {
      q: "Helfen Sie bei Etiketten und Verpackung?",
      a: "Ja. Gewebte Etiketten, bedrucktes Innenband, Hängeetiketten und Verpackung können Ihre Marke tragen. Ein individuelles Webetikett ist im Muster enthalten; bei sehr kleinen Serien (um 50 Stück) kommt das Etikett auf etwa 0,4–0,6 USD pro Cap.",
    },
  ],
  cta: {
    title: "Planen wir Ihre erste Kollektion",
    text: "Nennen Sie uns Modelle, Farben und Zielmengen. Wir schlagen Ihnen den kostengünstigsten Weg vor.",
    button: "Angebot anfordern",
  },
};

export const guides: Record<GuideSlug, Record<Locale, GuideLocaleContent>> = {
  pricing: { en: pricingEn, es: pricingEs, fr: pricingFr, de: pricingDe },
  "start-a-hat-brand": { en: brandEn, es: brandEs, fr: brandFr, de: brandDe },
};
