import type { Product } from "./sample-data";

// 22 款产品的西班牙语/法语/德语翻译(按 slug 索引)。
// 只存需要翻译的字段(名称/描述/面料/特点/颜色);
// 款号(code)、分类(category)、图片、起订量(moq)等字段不进这张表,始终沿用英文原值。
type ProductTranslation = {
  name: string;
  description: string;
  material: string;
  features: string[];
  colors: string[];
};

type TranslatedLocale = "es" | "fr" | "de";

const isTranslatedLocale = (locale: string): locale is TranslatedLocale =>
  locale === "es" || locale === "fr" || locale === "de";

export const productTranslations: Record<
  string,
  Partial<Record<TranslatedLocale, ProductTranslation>>
> = {
  "souvenir-patch-snapback": {
    es: {
      name: "Gorra Snapback con Parche Conmemorativo",
      description:
        "Un parche conmemorativo en arco al frente, un cordón dorado trenzado que cruza la visera y una ramita de laurel a cada lado — tres detalles bordados que la convierten en una gorra de recuerdo. Las palabras, el año y el emblema dentro del parche son totalmente tuyos — eventos, aniversarios, clubes.",
      material: "Sarga de algodón",
      colors: ["Azul marino", "negro", "blanco roto", "verde oliva"],
      features: [
        "Snapback de 5 paneles, visera plana",
        "Parche conmemorativo en arco, bordado plano",
        "Cordón dorado trenzado que cruza la visera",
        "Bordado de laurel a cada lado de la visera",
        "Cinco paneles sólidos, snapback a juego",
        "Talla: única · snapback",
      ],
    },
    fr: {
      name: "Casquette Snapback à Écusson Souvenir",
      description:
        "Un écusson souvenir en arc à l'avant, un cordon doré torsadé qui traverse la visière et un brin de laurier de chaque côté — trois détails brodés qui en font une casquette commémorative. Les mots, l'année et l'emblème à l'intérieur de l'écusson sont entièrement les vôtres — événements, anniversaires, clubs.",
      material: "Sergé de coton",
      colors: ["Bleu marine", "noir", "blanc cassé", "olive"],
      features: [
        "Snapback 5 panneaux, visière plate",
        "Écusson souvenir en arc, broderie plate",
        "Cordon doré torsadé traversant la visière",
        "Broderie de laurier de chaque côté de la visière",
        "Cinq panneaux unis, snapback assorti",
        "Taille : unique · snapback",
      ],
    },
    de: {
      name: "Souvenir-Patch-Snapback",
      description:
        "Ein bogenförmiger Souvenir-Patch vorne, eine goldene Kordel quer über dem Schirm und je ein Lorbeerzweig an beiden Seiten — drei gestickte Details, die daraus eine Erinnerungscap machen. Die Schrift, das Jahr und das Emblem im Patch sind ganz Ihre eigenen — für Events, Jubiläen, Vereine.",
      material: "Baumwoll-Twill",
      colors: ["Marineblau", "Schwarz", "Gebrochenes Weiß", "Oliv"],
      features: [
        "5-Panel-Snapback, flacher Schirm",
        "Bogenförmiger Souvenir-Patch, flache Stickerei",
        "Goldene Kordel quer über dem Schirm",
        "Lorbeer-Stickerei an beiden Seiten des Schirms",
        "Fünf einfarbige Panels, farblich passender Snapback",
        "Größe: Einheitsgröße · Snapback",
      ],
    },
  },

  "two-tone-raw-edge-applique-cap": {
    es: {
      name: "Gorra Bicolor con Apliques de Borde Vivo",
      description:
        "Letras con aplique de borde vivo recorren desde la copa, cruzan la costura y llegan hasta la visera, sobre un cuerpo bicolor — las letras combinan con los paneles laterales para que se lean como una sola pieza. Tanto las letras grandes como la línea en cursiva llevan tus propias palabras.",
      material: "Sarga de algodón, lavado ligero",
      colors: ["Verde oliva/piedra", "crudo/negro", "crudo/rojo", "marino/crudo"],
      features: [
        "Gorra de 6 paneles, paneles en contraste",
        "Aplique de borde vivo que cruza la costura copa-visera",
        "Frente y visera en un color, laterales y trasera en otro",
        "Bordado fino en cursiva arriba",
        "Cuatro filas de pespunte en la visera",
        "Talla: única · hebilla metálica",
      ],
    },
    fr: {
      name: "Casquette Bicolore à Appliqué Bord Brut",
      description:
        "Des lettres en appliqué à bord brut partent de la calotte, traversent la couture et se poursuivent sur la visière, sur un corps bicolore — les lettres reprennent la couleur des panneaux latéraux pour former un seul bloc visuel. Les grandes lettres comme la ligne en script portent vos propres mots.",
      material: "Sergé de coton, délavage léger",
      colors: ["Olive/pierre", "écru/noir", "écru/rouge", "marine/écru"],
      features: [
        "Casquette 6 panneaux, panneaux contrastés",
        "Appliqué à bord brut traversant la couture calotte-visière",
        "Avant et visière dans une couleur, côtés et arrière dans une autre",
        "Fine broderie script au-dessus",
        "Quatre rangs de surpiqûre sur la visière",
        "Taille : unique · coulisseau métallique",
      ],
    },
    de: {
      name: "Zweifarbige Cap mit Rohkanten-Applikation",
      description:
        "Buchstaben als Rohkanten-Applikation laufen vom Kopfteil über die Naht bis auf den Schirm, auf einem zweifarbigen Korpus — die Buchstaben sind farblich auf die Seitenpanels abgestimmt, sodass alles wie aus einem Guss wirkt. Sowohl die großen Buchstaben als auch die Schreibschrift-Zeile tragen Ihren eigenen Text.",
      material: "Baumwoll-Twill, leicht gewaschen",
      colors: ["Oliv/Stein", "Ecru/Schwarz", "Ecru/Rot", "Marine/Ecru"],
      features: [
        "6-Panel-Cap, Panels in Kontrastfarbe",
        "Rohkanten-Applikation über die Naht von Kopfteil zu Schirm",
        "Front und Schirm in einer Farbe, Seiten und Rücken in einer anderen",
        "Feine Schreibschrift-Stickerei darüber",
        "Vier Reihen Ziernaht auf dem Schirm",
        "Größe: Einheitsgröße · Metallschieber",
      ],
    },
  },

  "two-tone-washed-dad-cap": {
    es: {
      name: "Gorra Dad Lavada Bicolor",
      description:
        "El cuerpo en un color, la visera y el botón en otro, con un wordmark redondeado en minúsculas y contorno en contraste — ese aire relajado de los 90. Tu wordmark, y tú eliges la combinación de los dos colores.",
      material: "Sarga de algodón lavada",
      colors: ["Negro/mostaza", "marino/caqui", "verde bosque/crudo"],
      features: [
        "Gorra dad lavada de 6 paneles, visera en contraste",
        "Visera y botón en contraste",
        "Wordmark redondeado con contorno en contraste",
        "Copa sin estructura, lavado de prenda",
        "Correa del mismo tejido, hebilla de latón envejecido",
        "Talla: única · hebilla de latón envejecido",
      ],
    },
    fr: {
      name: "Casquette Dad Délavée Bicolore",
      description:
        "Le corps dans une couleur, la visière et le bouton dans une autre, avec un wordmark arrondi en minuscules souligné d'un contour contrasté — cette allure décontractée typique des années 90. Votre wordmark, et vous choisissez l'association des deux couleurs.",
      material: "Sergé de coton délavé",
      colors: ["Noir/moutarde", "marine/kaki", "vert forêt/écru"],
      features: [
        "Casquette dad délavée 6 panneaux, visière contrastée",
        "Visière et bouton contrastés",
        "Wordmark arrondi avec contour contrasté",
        "Calotte non structurée, délavage à la pièce",
        "Sangle assortie au tissu, boucle laiton vieilli",
        "Taille : unique · boucle laiton vieilli",
      ],
    },
    de: {
      name: "Zweifarbige Washed Dad Cap",
      description:
        "Der Korpus in einer Farbe, Schirm und Knopf in einer anderen, dazu ein rundlicher Kleinbuchstaben-Schriftzug mit Kontrastumrandung — das entspannte Gefühl der 90er. Ihr Schriftzug, und Sie bestimmen die Kombination der beiden Farben.",
      material: "Gewaschener Baumwoll-Twill",
      colors: ["Schwarz/Senf", "Marine/Khaki", "Waldgrün/Ecru"],
      features: [
        "Gewaschene 6-Panel-Dad-Cap, Schirm in Kontrastfarbe",
        "Schirm und Knopf in Kontrastfarbe",
        "Rundlicher Schriftzug mit Kontrastumrandung",
        "Unstrukturiertes Kopfteil, garment-washed",
        "Riemen aus demselben Stoff, Schnalle in Antikmessing",
        "Größe: Einheitsgröße · Schnalle in Antikmessing",
      ],
    },
  },

  "double-zip-brim-cap": {
    es: {
      name: "Gorra con Doble Cremallera en la Visera",
      description:
        "Una cremallera metálica inclinada incrustada a cada lado de la visera, dejando ver solo los dientes y un tirador fino — todo en negro y minimalista, con el detalle concentrado en la visera. Los tiradores de las cremalleras y la hebilla trasera pueden llevar tu marca.",
      material: "Sarga de algodón fina",
      colors: ["Negro/gris metal", "negro/plata", "crudo/gris metal"],
      features: [
        "Gorra estructurada de 6 paneles",
        "Dos cremalleras incrustadas en la visera",
        "Tiradores finos y lisos — se pueden grabar",
        "Copa estructurada de seis paneles",
        "Laterales limpios, sin marcas",
        "Talla: única · hebilla metálica",
      ],
    },
    fr: {
      name: "Casquette à Double Fermeture Éclair sur la Visière",
      description:
        "Une fermeture éclair métallique inclinée insérée de chaque côté de la visière, ne laissant apparaître que les dents et un fin tirant — tout en noir et minimaliste, le détail se concentre sur la visière. Les tirants de fermeture et la boucle arrière peuvent tous deux porter votre marque.",
      material: "Sergé de coton fin",
      colors: ["Noir/gunmetal", "noir/argent", "écru/gunmetal"],
      features: [
        "Casquette structurée 6 panneaux",
        "Deux fermetures éclair insérées dans la visière",
        "Tirants fins et unis — gravables",
        "Calotte structurée à six panneaux",
        "Côtés nets, sans marquage",
        "Taille : unique · boucle métallique",
      ],
    },
    de: {
      name: "Cap mit Doppel-Reißverschluss am Schirm",
      description:
        "Auf jeder Seite des Schirms ein schräg eingesetzter Metallreißverschluss, bei dem nur die Zähne und ein schmaler Zipper zu sehen sind — komplett schwarz und minimalistisch, das Detail sitzt am Schirm. Sowohl die Zipper als auch die Schnalle hinten können Ihre Kennzeichnung tragen.",
      material: "Feiner Baumwoll-Twill",
      colors: ["Schwarz/Gunmetal", "Schwarz/Silber", "Ecru/Gunmetal"],
      features: [
        "Strukturierte 6-Panel-Cap",
        "Zwei in den Schirm eingesetzte Reißverschlüsse",
        "Schmale, schlichte Zipper — gravierbar",
        "Strukturiertes Sechs-Panel-Kopfteil",
        "Saubere Seiten, ohne Kennzeichnung",
        "Größe: Einheitsgröße · Metallschnalle",
      ],
    },
  },

  "ripped-piercing-denim-cap": {
    es: {
      name: "Gorra de Mezclilla Rasgada con Piercings",
      description:
        "Cubierta de herrajes tipo «piercing» — imperdibles, aros, pequeños remaches y una pinza en la visera — junto con paneles rasgados y un borde de visera deshilachado. La palabra al frente es tuya; la posición y cantidad de herrajes se puede ajustar.",
      material: "Mezclilla lavada",
      colors: ["Negro lavado", "crudo", "azul", "gris carbón"],
      features: [
        "Gorra dad de mezclilla lavada de 6 paneles",
        "Imperdibles, aros, remaches y pinza en la visera",
        "Copa rasgada, borde de visera deshilachado",
        "Negro lavado con desvanecido natural",
        "Palabra en arco con bordado plano",
        "Talla: única · hebilla metálica negra",
      ],
    },
    fr: {
      name: "Casquette en Denim Déchiré à Piercings",
      description:
        "Recouverte de quincaillerie façon « piercing » — épingles à nourrice, anneaux, petits clous et une pince sur la visière — avec des panneaux déchirés et un bord de visière effiloché. Le mot à l'avant est le vôtre ; l'emplacement et le nombre de quincailleries peuvent varier.",
      material: "Denim délavé",
      colors: ["Noir délavé", "écru", "bleu", "anthracite"],
      features: [
        "Casquette dad en denim délavé, 6 panneaux",
        "Épingles, anneaux, clous et pince sur la visière",
        "Calotte déchirée, bord de visière effiloché",
        "Noir délavé à l'usure irrégulière",
        "Mot en arc brodé à plat",
        "Taille : unique · coulisseau métallique noir",
      ],
    },
    de: {
      name: "Zerrissene Denim-Cap mit Piercing-Hardware",
      description:
        "Übersät mit „Piercing“-Hardware — Sicherheitsnadeln, Ringe, kleine Spikes und eine Foldback-Klammer am Schirm — dazu zerrissene Panels und ein ausgefranster Schirmrand. Das Wort vorne ist Ihres; Platzierung und Anzahl der Hardware lassen sich anpassen.",
      material: "Gewaschener Denim",
      colors: ["Gewaschenes Schwarz", "Ecru", "Blau", "Anthrazit"],
      features: [
        "Gewaschene 6-Panel-Denim-Dad-Cap",
        "Nadeln, Ringe, Spikes und eine Klammer am Schirm",
        "Zerrissenes Kopfteil, ausgefranster Schirmrand",
        "Verwaschenes Schwarz mit natürlicher Tonvariation",
        "Bogenförmiges, flach gesticktes Wort",
        "Größe: Einheitsgröße · schwarzer Metallschieber",
      ],
    },
  },

  "gradient-bleached-denim-cap": {
    es: {
      name: "Gorra de Mezclilla Decolorada en Degradado",
      description:
        "Decolorada desde un azul medio en la copa hasta casi blanco en la visera, desgastada en los bordes, con una línea serif blanca bordada al frente. Esa línea frontal se convierte en tu eslogan o nombre.",
      material: "Mezclilla lavada elástica",
      colors: ["Azul decolorado en degradado"],
      features: [
        "Gorra dad de mezclilla de 6 paneles",
        "Decolorado en degradado, de la copa a la visera",
        "Bordes desgastados que dejan ver el hilo blanco",
        "Bordado serif blanco al frente",
        "Sin estructura, se ajusta cerca de la cabeza",
        "Talla: única · hebilla plateada",
      ],
    },
    fr: {
      name: "Casquette en Denim Délavé Dégradé",
      description:
        "Décolorée d'un bleu moyen sur la calotte jusqu'à un blanc presque pur sur la visière, usée sur les bords, avec une ligne serif blanche brodée à l'avant. Cette ligne devient votre slogan ou votre nom.",
      material: "Denim extensible délavé",
      colors: ["Bleu délavé dégradé"],
      features: [
        "Casquette dad en denim, 6 panneaux",
        "Décoloration en dégradé, de la calotte à la visière",
        "Bords usés laissant voir le fil blanc",
        "Broderie serif blanche à l'avant",
        "Non structurée, épouse bien la tête",
        "Taille : unique · coulisseau argenté",
      ],
    },
    de: {
      name: "Denim-Cap mit Bleach-Verlauf",
      description:
        "Von Mittelblau am Kopfteil bis fast Weiß am Schirm gebleicht, an den Kanten durchgescheuert, mit einer weißen Serifenschrift-Zeile vorne. Diese Zeile wird zu Ihrem Slogan oder Namen.",
      material: "Elastischer, gewaschener Denim",
      colors: ["Blau, Bleach-Verlauf"],
      features: [
        "6-Panel-Denim-Dad-Cap",
        "Bleach-Verlauf von Kopfteil zu Schirm",
        "Durchgescheuerte Kanten mit sichtbarem weißen Garn",
        "Weiße Serifenschrift-Stickerei vorne",
        "Unstrukturiert, sitzt eng am Kopf",
        "Größe: Einheitsgröße · Silberschieber",
      ],
    },
  },

  "stripe-over-brim-soft-cap": {
    es: {
      name: "Gorra Blanda con Franjas sobre la Visera",
      description:
        "Dos franjas blancas en relieve recorren desde la copa hasta la visera, con un parche ovalado en bordado en relieve al frente — un look deportivo y gráfico. El texto del parche es tuyo; el color de las franjas puede cambiar.",
      material: "Sarga de algodón",
      colors: ["Negro", "crudo", "marino", "gris carbón"],
      features: [
        "Gorra blanda de perfil bajo, 6 paneles",
        "Franjas en relieve de la copa a la visera",
        "Parche ovalado en bordado en relieve",
        "Copa blanda y baja, visera precurvada",
        "Correa con anilla plateada en D",
        "Talla: única · anilla plateada en D",
      ],
    },
    fr: {
      name: "Casquette Souple à Rayures sur la Visière",
      description:
        "Deux rayures blanches en relief partent de la calotte et se poursuivent jusque sur la visière, avec un écusson ovale en broderie en relief à l'avant — un look sportif et graphique. Le texte de l'écusson est le vôtre ; la couleur des rayures peut changer.",
      material: "Sergé de coton",
      colors: ["Noir", "écru", "marine", "anthracite"],
      features: [
        "Casquette souple à profil bas, 6 panneaux",
        "Rayures en relief de la calotte jusqu'à la visière",
        "Écusson ovale en broderie en relief",
        "Calotte souple et basse, visière précourbée",
        "Sangle avec anneau en D argenté",
        "Taille : unique · anneau en D argenté",
      ],
    },
    de: {
      name: "Weiche Cap mit Streifen über den Schirm",
      description:
        "Zwei erhabene weiße Streifen verlaufen vom Kopfteil direkt auf den Schirm, dazu ein ovaler Patch in erhabener Stickerei vorne — sportlich und grafisch. Der Text im Patch ist Ihrer; die Streifenfarbe lässt sich ändern.",
      material: "Baumwoll-Twill",
      colors: ["Schwarz", "Ecru", "Marine", "Anthrazit"],
      features: [
        "Weiche 6-Panel-Cap mit niedrigem Profil",
        "Erhabene Streifen vom Kopfteil auf den Schirm",
        "Ovaler Patch in erhabener Stickerei",
        "Niedriges weiches Kopfteil, vorgebogener Schirm",
        "Riemen mit silbernem D-Ring",
        "Größe: Einheitsgröße · silberner D-Ring",
      ],
    },
  },

  "chain-stitch-pillbox-cap": {
    es: {
      name: "Gorra Pillbox con Letras en Punto de Cadeneta",
      description:
        "Letras estilo universitario de gran tamaño envuelven toda la copa en punto de cadeneta — una silueta baja tipo pillbox con una visera corta, casi plana. La palabra que rodea la copa se convierte en tu nombre.",
      material: "Sarga de algodón y nylon, lavado ligero",
      colors: ["Negro", "índigo", "crudo", "verde oliva oscuro"],
      features: [
        "Gorra pillbox de copa plana baja, visera corta",
        "Las letras envuelven toda la copa",
        "Bordado en punto de cadeneta, con textura",
        "Copa plana baja, visera corta",
        "Parte trasera lisa, sin marcas",
        "Talla: única · correa a presión",
      ],
    },
    fr: {
      name: "Casquette Pillbox Brodée en Point de Chaînette",
      description:
        "D'immenses lettres façon universitaire font le tour complet de la calotte en point de chaînette — une silhouette basse façon pillbox avec une visière courte, presque plate. Le mot qui entoure la calotte devient votre nom.",
      material: "Sergé coton-nylon, délavage léger",
      colors: ["Noir", "indigo", "écru", "olive foncé"],
      features: [
        "Casquette pillbox à sommet plat bas, visière courte",
        "Les lettres font le tour complet de la calotte",
        "Broderie en point de chaînette, texturée",
        "Sommet plat bas, visière courte",
        "Arrière uni, sans marquage",
        "Taille : unique · sangle à pression",
      ],
    },
    de: {
      name: "Pillbox-Cap mit Kettenstich-Schriftzug",
      description:
        "Übergroße Collegeschrift-Buchstaben umlaufen im Kettenstich das gesamte Kopfteil — eine niedrige Pillbox-Form mit kurzem, fast flachem Schirm. Das Wort rund um das Kopfteil wird zu Ihrem Namen.",
      material: "Baumwoll-Nylon-Twill, leicht gewaschen",
      colors: ["Schwarz", "Indigo", "Ecru", "Dunkeloliv"],
      features: [
        "Niedrige Pillbox-Cap mit flacher Oberseite, kurzer Schirm",
        "Buchstaben umlaufen das gesamte Kopfteil",
        "Kettenstich-Stickerei mit Struktur",
        "Niedrige flache Oberseite, kurzer Schirm",
        "Schlichter Rücken, ohne Kennzeichnung",
        "Größe: Einheitsgröße · Druckknopfriemen",
      ],
    },
  },

  "surf-cap-chin-strap": {
    es: {
      name: "Gorra de Surf con Correa de Barbilla",
      description:
        "Una correa de barbilla en forma de Y de neopreno se abrocha bajo la barbilla, con una visera corta y plana — pensada para aguantar el oleaje, el remo y la natación. El texto lateral es tuyo — ideal para tiendas de surf y clubes acuáticos.",
      material: "Nylon mate",
      colors: ["Marino", "caqui", "verde acero", "gris carbón"],
      features: [
        "Gorra deportiva acuática de 6 paneles, visera corta",
        "Correa de barbilla en Y de neopreno",
        "Visera corta y plana, pespunte de varias filas",
        "Nylon mate ligero",
        "Bordado pequeño en el lateral",
        "Talla: única · hebilla y correa de barbilla",
      ],
    },
    fr: {
      name: "Casquette de Surf à Jugulaire",
      description:
        "Une jugulaire en Y en néoprène se boucle sous le menton, avec une visière courte et plate — conçue pour tenir dans le surf, la pagaie et la nage. Le texte latéral est le vôtre — parfait pour les boutiques de surf et les clubs nautiques.",
      material: "Nylon mat",
      colors: ["Marine", "kaki", "vert acier", "anthracite"],
      features: [
        "Casquette de sport nautique 6 panneaux, visière courte",
        "Jugulaire en Y en néoprène",
        "Visière courte et plate, surpiqûre multi-rangs",
        "Nylon mat léger",
        "Petite broderie sur le côté",
        "Taille : unique · boucle et jugulaire",
      ],
    },
    de: {
      name: "Surf-Cap mit Kinnriemen",
      description:
        "Ein Y-förmiger Kinnriemen aus Neopren schnallt sich unter dem Kinn fest, dazu ein kurzer flacher Schirm — gemacht, um Brandung, Paddeln und Schwimmen zu überstehen. Der Text an der Seite ist Ihrer — passend für Surfshops und Wassersportclubs.",
      material: "Mattes Nylon",
      colors: ["Marine", "Khaki", "Stahlgrün", "Anthrazit"],
      features: [
        "6-Panel-Wassersport-Cap, kurzer Schirm",
        "Y-förmiger Kinnriemen aus Neopren",
        "Kurzer flacher Schirm, mehrreihige Ziernaht",
        "Leichtes, mattes Nylon",
        "Kleine Stickerei an der Seite",
        "Größe: Einheitsgröße · Schnalle und Kinnriemen",
      ],
    },
  },

  "frayed-edge-denim-bucket-hat": {
    es: {
      name: "Sombrero de Pescador de Mezclilla con Borde Deshilachado",
      description:
        "Un anillo completo de borde deshilachado y desgastado alrededor del ala blanda, con un pequeño bordado en relieve al frente — mezclilla lavada de estilo relajado. Esa pequeña marca frontal se convierte en la tuya.",
      material: "Mezclilla de algodón lavada",
      colors: ["Mezclilla azul claro", "negro lavado", "lona cruda"],
      features: [
        "Sombrero de pescador de mezclilla, ala ancha",
        "Borde deshilachado alrededor de toda el ala",
        "Mismo color por dentro y por fuera",
        "Pequeño bordado en relieve",
        "Cordón ajustable en azul marino",
        "Talla: única · cordón ajustable",
      ],
    },
    fr: {
      name: "Bob en Denim à Bord Effiloché",
      description:
        "Un anneau complet de bord effiloché et éclaté tout autour du bord souple, avec une petite broderie en relief à l'avant — denim délavé, esprit décontracté. Cette petite marque à l'avant devient la vôtre.",
      material: "Denim de coton délavé",
      colors: ["Denim bleu clair", "noir délavé", "toile écrue"],
      features: [
        "Bob en denim, large bord",
        "Bord effiloché tout autour",
        "Même couleur à l'intérieur et à l'extérieur",
        "Petite broderie en relief",
        "Cordon ajustable bleu marine",
        "Taille : unique · cordon ajustable",
      ],
    },
    de: {
      name: "Denim-Bucket-Hat mit ausgefranster Krempe",
      description:
        "Ein vollständiger Ring aus ausgefranster, aufgerissener Kante rund um die weiche Krempe, dazu eine kleine erhabene Stickerei vorne — entspannter gewaschener Denim. Diese kleine Front-Kennzeichnung wird zu Ihrer eigenen.",
      material: "Gewaschener Baumwoll-Denim",
      colors: ["Hellblauer Denim", "Gewaschenes Schwarz", "Ecru-Canvas"],
      features: [
        "Denim-Bucket-Hat mit breiter Krempe",
        "Ausgefranste Kante rund um die Krempe",
        "Innen und außen dieselbe Farbe",
        "Kleine erhabene Stickerei",
        "Verstellbare marineblaue Kordel",
        "Größe: Einheitsgröße · verstellbare Kordel",
      ],
    },
  },

  "teddy-earflap-wool-bucket-hat": {
    es: {
      name: "Sombrero de Pescador de Lana con Orejeras Teddy",
      description:
        "Forro teddy bajo el ala, dos orejeras de lana forradas en teddy y cintas de ante que se atan en lazo — un sombrero de pescador cálido para invierno. Esa pequeña línea al frente se convierte en la tuya.",
      material: "Paño de lana mezclada, forro teddy",
      colors: ["Chocolate", "avena", "gris carbón", "negro"],
      features: [
        "Sombrero de pescador de lana con orejeras",
        "Forro teddy bajo el ala",
        "Orejeras de lana forradas en teddy",
        "Cintas de ante que se atan en lazo",
        "Pequeño bordado plano al frente",
        "Talla: única · cintas de ante",
      ],
    },
    fr: {
      name: "Bob en Laine à Oreillettes Teddy",
      description:
        "Une doublure teddy sous le bord, deux oreillettes en laine doublées de teddy et des liens en suède qui se nouent en boucle — un bob chaud pour l'hiver. Cette petite ligne à l'avant devient la vôtre.",
      material: "Feutre laine mélangée, doublure teddy",
      colors: ["Chocolat", "avoine", "anthracite", "noir"],
      features: [
        "Bob en laine à oreillettes",
        "Doublure teddy sous le bord",
        "Oreillettes en laine doublées de teddy",
        "Liens en suède noués en boucle",
        "Petite broderie plate à l'avant",
        "Taille : unique · liens en suède",
      ],
    },
    de: {
      name: "Woll-Bucket-Hat mit Teddy-Ohrenklappen",
      description:
        "Teddy-Fleece unter der Krempe, zwei mit Fleece gefütterte Wollohrenklappen und Wildlederbänder, die zur Schleife gebunden werden — ein warmer Winter-Bucket-Hat. Diese kleine Zeile vorne wird zu Ihrer eigenen.",
      material: "Wollmisch-Filz, Teddy-Fleece",
      colors: ["Schokolade", "Hafer", "Anthrazit", "Schwarz"],
      features: [
        "Woll-Bucket-Hat mit Ohrenklappen",
        "Teddy-Fleece unter der Krempe",
        "Mit Fleece gefütterte Wollohrenklappen",
        "Wildlederbänder, zur Schleife gebunden",
        "Kleine flache Stickerei vorne",
        "Größe: Einheitsgröße · Wildlederbänder",
      ],
    },
  },

  "serif-wordmark-washed-cap": {
    es: {
      name: "Gorra Lavada con Wordmark Serif",
      description:
        "Un wordmark serif de gran tamaño recorre el frente de borde a borde, con letras sobre líneas base irregulares para un efecto artesanal. El wordmark se sustituye por el nombre de tu marca — mismo bloque, distinta etiqueta.",
      material: "Sarga de algodón lavada",
      colors: ["Negro lavado", "Verde oliva lavado", "Caqui lavado"],
      features: [
        "Gorra de 6 paneles sin estructura y perfil bajo",
        "Bordado en punto de satén directo sobre la copa",
        "Copa baja y blanda, visera casi plana",
        "Acabado lavado con borde de visera desgastado",
        "Hebilla metálica color plata envejecida",
        "Talla: única · hebilla metálica",
      ],
    },
    fr: {
      name: "Casquette Délavée Wordmark Serif",
      description:
        "Un wordmark serif surdimensionné traverse l'avant d'un bord à l'autre, avec des lettres posées sur des lignes de base irrégulières pour un rendu artisanal. Le wordmark est remplacé par le nom de votre marque — même bloc, étiquette différente.",
      material: "Sergé de coton délavé",
      colors: ["Noir délavé", "Olive délavé", "Kaki délavé"],
      features: [
        "Casquette 6 panneaux non structurée, profil bas",
        "Broderie point de satin directement sur la calotte",
        "Calotte basse et souple, visière quasi plate",
        "Finition délavée avec bord de visière usé",
        "Coulisseau métallique argent vieilli",
        "Taille : unique · coulisseau métallique",
      ],
    },
    de: {
      name: "Gewaschene Cap mit Serif-Wordmark",
      description:
        "Ein übergroßer Serif-Schriftzug verläuft randlos über die Front, die Buchstaben stehen auf ungleichmäßigen Grundlinien für einen handgesetzten Look. Der Schriftzug wird durch Ihren Markennamen ersetzt — gleicher Block, anderer Schriftzug.",
      material: "Gewaschener Baumwoll-Twill",
      colors: ["Gewaschenes Schwarz", "Gewaschenes Olive", "Gewaschenes Khaki"],
      features: [
        "Unstrukturierte 6-Panel-Cap mit niedrigem Profil",
        "Satinstich-Stickerei direkt auf dem Kopfteil",
        "Niedriges, weiches Kopfteil, nahezu flacher Schirm",
        "Gewaschene Optik mit abgetragener Schirmkante",
        "Metallschieber in Antiksilber",
        "Größe: Einheitsgröße · Metallschieber",
      ],
    },
  },

  "tire-stripe-mesh-trucker": {
    es: {
      name: "Trucker de Malla con Franjas Estilo Neumático",
      description:
        "Un grupo de franjas con efecto cepillado en seco recorre el frente — bordes rotos e irregulares que se leen como desgaste real, no como impresión. Área de logo frontal abierta para bordado o estampado.",
      material: "Paneles frontales tejidos, espalda de malla hexagonal",
      colors: ["Blanco con franjas doradas y burdeos"],
      features: [
        "Gorra trucker, espalda de malla, cierre snapback",
        "Frente estructurado, espalda de 6 paneles en malla hexagonal",
        "Visera curva con pespunte de varias filas",
        "Diseño de franjas envejecidas con efecto cepillado en seco",
        "Snapback de plástico a juego con el color",
        "Talla: única · snapback de 7 posiciones",
      ],
    },
    fr: {
      name: "Trucker en Maille à Rayures Effet Pneu",
      description:
        "Un groupe de rayures à effet brossé à sec traverse l'avant — des bords cassés et irréguliers qui évoquent l'usure réelle, pas l'impression. Zone de logo avant libre pour broderie ou impression.",
      material: "Panneaux avant tissés, dos en maille hexagonale",
      colors: ["Blanc à rayures dorées et bordeaux"],
      features: [
        "Casquette trucker, dos en maille, fermeture snapback",
        "Avant structuré, dos six panneaux en maille hexagonale",
        "Visière courbée avec surpiqûre multi-rangs",
        "Motif de rayures vieillies effet brossé à sec",
        "Snapback plastique assorti à la couleur",
        "Taille : unique · snapback 7 positions",
      ],
    },
    de: {
      name: "Mesh-Trucker mit Reifenstreifen-Optik",
      description:
        "Eine trocken gebürstete Streifengruppe verläuft über die Front — gebrochene, ungleichmäßige Kanten, die wie echter Verschleiß wirken, nicht wie ein Aufdruck. Logofläche vorne frei für Stickerei oder Druck.",
      material: "Gewebte Frontpanels, Rücken aus Sechseck-Mesh",
      colors: ["Weiß mit goldenen und weinroten Streifen"],
      features: [
        "Trucker-Cap, Mesh-Rücken, Snapback-Verschluss",
        "Strukturierte Front, Rücken aus 6 Panels in Sechseck-Mesh",
        "Gebogener Schirm mit mehrreihiger Ziernaht",
        "Vintage-Streifendesign im Trockenbürst-Effekt",
        "Farblich passender Snapback aus Kunststoff",
        "Größe: Einheitsgröße · 7-Stufen-Snapback",
      ],
    },
  },

  "sherpa-trim-bucket-hat": {
    es: {
      name: "Sombrero de Pescador con Ribete Sherpa",
      description:
        "Tres bandas de ribete sherpa cruzan una copa baja de parte superior plana — una silueta de dos materiales que se distingue a la distancia. Copa en blanco — lista para bordado, estampado o parche.",
      material: "100% poliéster, ribete sherpa",
      colors: ["Negro con ribete verde oliva"],
      features: [
        "Sombrero de pescador de copa plana baja",
        "Parte superior ovalada y plana, ala corta hacia afuera",
        "Ribete sherpa en la parte superior, cuerpo medio y borde del ala",
        "Pespunte paralelo de varias filas en el ala",
        "Superficie limpia en blanco lista para tu marca",
        "Talla: 57 cm (otras tallas bajo pedido)",
        "Colores personalizados disponibles bajo pedido",
      ],
    },
    fr: {
      name: "Bob à Bordure Sherpa",
      description:
        "Trois bandes de bordure sherpa traversent une calotte basse à sommet plat — une silhouette à deux matières qui se distingue de loin. Calotte vierge — prête pour broderie, impression ou patch.",
      material: "100 % polyester, bordure sherpa",
      colors: ["Noir à bordure olive"],
      features: [
        "Bob à sommet plat et calotte basse",
        "Sommet ovale plat, bord court tourné vers l'extérieur",
        "Bordure sherpa au sommet, sur le corps et en bord de bordure",
        "Surpiqûre parallèle multi-rangs sur le bord",
        "Surface vierge et nette prête pour votre marque",
        "Taille : 57 cm (autres tailles sur commande)",
        "Coloris personnalisés disponibles sur demande",
      ],
    },
    de: {
      name: "Fischerhut mit Sherpa-Besatz",
      description:
        "Drei Sherpa-Besatzstreifen ziehen sich über ein niedriges Kopfteil mit flacher Oberseite — eine Silhouette aus zwei Materialien, die schon aus der Distanz auffällt. Kopfteil unbedruckt — offen für Stickerei, Druck oder Patch.",
      material: "100 % Polyester, Sherpa-Besatz",
      colors: ["Schwarz mit Oliv-Besatz"],
      features: [
        "Fischerhut mit niedrigem, flachem Kopfteil",
        "Flache ovale Oberseite, kurze, nach außen stehende Krempe",
        "Sherpa-Besatz an Oberseite, Mittelteil und Krempenrand",
        "Mehrreihige parallele Ziernaht an der Krempe",
        "Saubere, unbedruckte Fläche für Ihr Branding",
        "Größe: 57 cm (weitere Größen auf Anfrage)",
        "Sonderfarben auf Anfrage erhältlich",
      ],
    },
  },

  "sunglass-slot-sport-visor": {
    es: {
      name: "Visera Deportiva con Ranura para Gafas",
      description:
        "Una ranura a cada lado sostiene las gafas de sol mientras corres — el detalle que los compradores recuerdan al tomarla en sus manos. Tanto la banda frontal como el lateral de la visera admiten tu logo.",
      material: "Punto de malla, visera forrada en tela a juego",
      colors: ["Negro"],
      features: [
        "Visera deportiva de copa abierta",
        "Ranura lateral con el tamaño justo para las patillas de las gafas",
        "Copa abierta, banda de punto de malla",
        "Visera curva en tela a juego",
        "Cierre trasero de velcro",
        "Talla: única · cierre de velcro",
        "Colores personalizados disponibles bajo pedido",
      ],
    },
    fr: {
      name: "Visière de Sport à Fente Porte-Lunettes",
      description:
        "Une fente de chaque côté maintient les lunettes de soleil pendant la course — le détail que les acheteurs retiennent dès qu'ils la prennent en main. La bande avant et le côté de la visière acceptent tous deux votre logo.",
      material: "Maille tricotée, visière recouverte du même tissu",
      colors: ["Noir"],
      features: [
        "Visière de sport à calotte ouverte",
        "Fente latérale dimensionnée pour les branches de lunettes",
        "Calotte ouverte, bande en maille tricotée",
        "Visière courbée dans le même tissu",
        "Fermeture arrière auto-agrippante",
        "Taille : unique · fermeture auto-agrippante",
        "Coloris personnalisés disponibles sur demande",
      ],
    },
    de: {
      name: "Sport-Visier mit Sonnenbrillen-Steckfach",
      description:
        "Ein Steckfach an jeder Seite hält die Sonnenbrille beim Laufen — das Detail, an das sich Käufer erinnern, sobald sie es in die Hand nehmen. Frontband und Schirmseite nehmen beide Ihr Logo auf.",
      material: "Meshgestrick, Schirm mit gleichem Stoff bezogen",
      colors: ["Schwarz"],
      features: [
        "Sport-Visier mit offenem Kopfteil",
        "Seitliches Steckfach passend für Brillenbügel",
        "Offenes Kopfteil, Band aus Meshgestrick",
        "Gebogener Schirm im gleichen Stoff",
        "Klettverschluss hinten",
        "Größe: Einheitsgröße · Klettverschluss",
        "Sonderfarben auf Anfrage erhältlich",
      ],
    },
  },

  "raw-edge-letter-washed-cap": {
    es: {
      name: "Gorra Lavada con Letra de Borde Crudo",
      description:
        "Una letra de gran tamaño cortada en sarga de algodón crudo y cosida directamente sobre el frente — sin borde rematado, con hilos sueltos a la vista. Cuanto más rústica, mejor se lee. Una letra, una marca — el frente lleva tu inicial.",
      material: "Sarga de algodón lavada tras confección",
      colors: ["Negro lavado", "Burdeos", "Azul marino"],
      features: [
        "Gorra de béisbol de 6 paneles lavada",
        "Letra de aplique de borde crudo, con una línea de costura dentro del contorno",
        "Copa blanda de seis paneles, visera curva, borde de visera limpio",
        "Sarga de algodón lavada tras confección",
        "Correa de cincha con hebilla de latón envejecido",
        "Talla: única · correa de cincha, hebilla de latón envejecido",
      ],
    },
    fr: {
      name: "Casquette Délavée à Lettre Bord Brut",
      description:
        "Une lettre surdimensionnée découpée dans un sergé de coton brut et cousue directement sur l'avant — sans bord fini, fils laissés apparents. Plus c'est brut, mieux ça se lit. Une lettre, une marque — l'avant reçoit votre initiale.",
      material: "Sergé de coton délavé après confection",
      colors: ["Noir délavé", "Bordeaux", "Marine"],
      features: [
        "Casquette de baseball 6 panneaux délavée",
        "Lettre appliquée à bord brut, une ligne de couture à l'intérieur du contour",
        "Calotte souple six panneaux, visière courbée, bord de visière net",
        "Sergé de coton délavé après confection",
        "Sangle avec boucle laiton vieilli",
        "Taille : unique · sangle, boucle laiton vieilli",
      ],
    },
    de: {
      name: "Gewaschene Cap mit Rohkanten-Buchstabe",
      description:
        "Ein übergroßer Buchstabe aus rohem Baumwoll-Twill, direkt auf die Front genäht — ohne eingefassten Rand, mit offen sichtbaren Fäden. Je rauer, desto besser die Wirkung. Ein Buchstabe, eine Marke — die Front trägt Ihre Initiale.",
      material: "Nach der Konfektion gewaschener Baumwoll-Twill",
      colors: ["Gewaschenes Schwarz", "Bordeaux", "Marineblau"],
      features: [
        "Gewaschene 6-Panel-Baseballcap",
        "Applikationsbuchstabe mit Rohkante, eine Stichlinie innerhalb der Kontur",
        "Weiches Sechs-Panel-Kopfteil, gebogener Schirm, sauberer Schirmrand",
        "Nach der Konfektion gewaschener Baumwoll-Twill",
        "Gurtband-Verschluss mit Schnalle in Antikmessing",
        "Größe: Einheitsgröße · Gurtband-Verschluss, Schnalle in Antikmessing",
      ],
    },
  },

  "outline-letter-vintage-washed-cap": {
    es: {
      name: "Gorra Lavada Vintage con Letra de Contorno",
      description:
        "Una letra solo de contorno que ocupa casi todo el frente, bordada en segmentos cortos y discontinuos que dejan ver la tela de la copa — el borde de la visera se desgasta a propósito. Tanto la letra como el texto de la visera admiten tu propia marca.",
      material: "Algodón lavado tras confección",
      colors: ["Negro lavado", "Azul marino", "Caqui", "Crudo"],
      features: [
        "Gorra de béisbol vintage de 6 paneles lavada",
        "Bordado de contorno segmentado, sin relleno",
        "Bordado tipo caligrafía a lo largo de la curva de la visera",
        "Borde de visera desgastado que deja ver el forro",
        "Copa blanda de seis paneles, correa de cincha",
        "Talla: única · correa de cincha",
      ],
    },
    fr: {
      name: "Casquette Vintage Délavée à Lettre Contour",
      description:
        "Une lettre en contour seul qui occupe presque tout l'avant, brodée en segments courts et discontinus laissant apparaître le tissu de la calotte — le bord de la visière est volontairement usé. La lettre et l'inscription en script sur la visière accueillent toutes deux votre propre marque.",
      material: "Coton délavé après confection",
      colors: ["Noir délavé", "Marine", "Kaki", "Écru"],
      features: [
        "Casquette de baseball vintage 6 panneaux délavée",
        "Broderie contour segmentée, sans remplissage",
        "Broderie script le long de la courbe de la visière",
        "Bord de visière usé laissant apparaître la doublure",
        "Calotte souple six panneaux, sangle",
        "Taille : unique · sangle",
      ],
    },
    de: {
      name: "Vintage-Washed Cap mit Konturbuchstabe",
      description:
        "Ein reiner Umrissbuchstabe, der fast die gesamte Front einnimmt, in kurzen, unterbrochenen Segmenten gestickt, sodass der Stoff des Kopfteils durchscheint — die Schirmkante ist bewusst abgetragen. Sowohl der Buchstabe als auch der Schriftzug am Schirm nehmen Ihre eigene Kennzeichnung auf.",
      material: "Nach der Konfektion gewaschene Baumwolle",
      colors: ["Gewaschenes Schwarz", "Marineblau", "Khaki", "Ecru"],
      features: [
        "Vintage-gewaschene 6-Panel-Baseballcap",
        "Segmentierte Umrissstickerei ohne Füllung",
        "Schreibschrift-Stickerei entlang der Schirmkurve",
        "Abgetragene Schirmkante mit sichtbarem Futter",
        "Weiches Sechs-Panel-Kopfteil, Gurtband-Verschluss",
        "Größe: Einheitsgröße · Gurtband-Verschluss",
      ],
    },
  },

  "felt-initials-wool-cap": {
    es: {
      name: "Gorra de Lana con Iniciales de Fieltro",
      description:
        "Letras de fieltro cortadas y cosidas sobre una copa de mezcla de lana, con la visera en color de contraste. Una gorra de invierno que se sitúa un peldaño por encima de las de algodón. Tres letras es el formato clásico de equipo — las tuyas van aquí.",
      material: "Fieltro de mezcla de lana",
      colors: ["Gris jaspeado con azul marino", "Azul marino con gris", "Beige avena con marrón"],
      features: [
        "Gorra de 6 paneles en mezcla de lana, visera de contraste",
        "Letras de aplique en fieltro con costura de borde",
        "Visera de lana en color de contraste, sin pespunte",
        "Ojales y hebilla en latón envejecido",
        "Copa redonda completa, más llena que una dad cap",
        "Talla: única · hebilla de latón envejecido",
      ],
    },
    fr: {
      name: "Casquette en Laine à Initiales Feutre",
      description:
        "Des lettres en feutre découpées et cousues sur une calotte en mélange de laine, avec une visière de couleur contrastante. Une casquette d'hiver qui se situe un cran au-dessus de celles en coton. Trois lettres, c'est le format d'équipe classique — les vôtres prennent place ici.",
      material: "Feutre en mélange de laine",
      colors: ["Gris chiné avec marine", "Marine avec gris", "Avoine avec marron"],
      features: [
        "Casquette 6 panneaux en mélange de laine, visière contrastante",
        "Lettres appliquées en feutre avec couture de bord",
        "Visière en laine de couleur contrastante, sans surpiqûre",
        "Œillets et boucle en laiton vieilli",
        "Calotte ronde pleine, plus ample qu'une dad cap",
        "Taille : unique · boucle laiton vieilli",
      ],
    },
    de: {
      name: "Wollcap mit Filz-Initialen",
      description:
        "Filzbuchstaben, zugeschnitten und auf ein Kopfteil aus Wollmix genäht, mit Schirm in Kontrastfarbe. Eine Wintercap, die eine Klasse über den Baumwollmodellen steht. Drei Buchstaben sind das klassische Team-Format — Ihre kommen hierhin.",
      material: "Filz aus Wollmix",
      colors: ["Meliertes Grau mit Marineblau", "Marineblau mit Grau", "Hafer mit Braun"],
      features: [
        "6-Panel-Cap aus Wollmix mit Kontrastschirm",
        "Applizierte Filzbuchstaben mit Randstich",
        "Wollschirm in Kontrastfarbe, ohne Ziernaht",
        "Ösen und Schnalle in Antikmessing",
        "Vollrundes Kopfteil, voluminöser als eine Dad Cap",
        "Größe: Einheitsgröße · Schnalle in Antikmessing",
      ],
    },
  },

  "frayed-seam-washed-denim-cap": {
    es: {
      name: "Gorra de Denim Lavado con Costuras Deshilachadas",
      description:
        "Tres acabados destructivos en una sola gorra: costuras deshilachadas a la vista, un borde de visera muy desgastado y letras de aplique de borde crudo. Las letras de aplique se sustituyen por tu propio texto o logo.",
      material: "Denim lavado, algodón",
      colors: ["Azul brumoso"],
      features: [
        "Gorra de béisbol de 6 paneles, visera curva",
        "Costuras deshilachadas a la vista en cada línea de panel",
        "Borde de visera muy desgastado",
        "Aplique de denim de borde crudo con doble costura de contorno",
        "Correa de la misma tela, hebilla metálica deslizante",
        "Talla: única · correa ajustable",
        "Colores personalizados disponibles bajo pedido",
      ],
    },
    fr: {
      name: "Casquette en Denim Délavé à Coutures Effilochées",
      description:
        "Trois finitions destructurées sur une seule casquette : coutures effilochées apparentes, bord de visière très usé et lettres appliquées à bord brut. Les lettres appliquées sont remplacées par votre propre texte ou logo.",
      material: "Denim délavé, coton",
      colors: ["Bleu brumeux"],
      features: [
        "Casquette de baseball 6 panneaux, visière courbée",
        "Coutures brutes effilochées sur chaque ligne de panneau",
        "Bord de visière fortement usé",
        "Appliqué denim à bord brut avec double surpiqûre de contour",
        "Sangle dans le même tissu, coulisseau métallique",
        "Taille : unique · sangle réglable",
        "Coloris personnalisés disponibles sur demande",
      ],
    },
    de: {
      name: "Gewaschene Denim-Cap mit Fransennähten",
      description:
        "Drei Destroyed-Finishes in einer Cap vereint: offen sichtbare Fransennähte, eine stark abgetragene Schirmkante und Applikationsbuchstaben mit Rohkante. Die Applikationsbuchstaben werden durch Ihren eigenen Text oder Ihr Logo ersetzt.",
      material: "Gewaschener Denim, Baumwolle",
      colors: ["Neblig-Blau"],
      features: [
        "6-Panel-Baseballcap, gebogener Schirm",
        "Offene Fransennähte entlang jeder Panelnaht",
        "Stark abgetragene Schirmkante",
        "Denim-Applikation mit Rohkante und doppelter Konturnaht",
        "Verschluss aus dem gleichen Stoff, Metallschieber",
        "Größe: Einheitsgröße · verstellbarer Verschluss",
        "Sonderfarben auf Anfrage erhältlich",
      ],
    },
  },

  "studded-washed-denim-cap": {
    es: {
      name: "Gorra de Denim Lavado con Tachuelas",
      description:
        "Tachuelas recorren las costuras del panel frontal y laterales, y el borde de la visera, sobre una base de denim muy lavado. El diseño se sustituye por el tuyo — las tachuelas y el lavado se mantienen.",
      material: "Denim lavado, algodón",
      colors: ["Índigo lavado"],
      features: [
        "Gorra de béisbol de 6 paneles",
        "Tachuelas en costuras frontales, laterales y borde de visera",
        "Ojales bordados, no remaches metálicos",
        "Lavado intenso tras confección, bordes lijados a mano",
        "Hebilla metálica ovalada única en el regulador",
        "Talla: única · ajustable",
        "Colores personalizados disponibles bajo pedido",
      ],
    },
    fr: {
      name: "Casquette en Denim Délavé Cloutée",
      description:
        "Des clous longent les coutures du panneau avant et des côtés, ainsi que le bord de la visière, sur une base en denim très délavé. Le motif est remplacé par le vôtre — les clous et le délavage restent.",
      material: "Denim délavé, coton",
      colors: ["Indigo délavé"],
      features: [
        "Casquette de baseball 6 panneaux",
        "Clous sur les coutures avant, latérales et le bord de visière",
        "Œillets brodés, pas d'œillets métalliques",
        "Délavage intense après confection, bords poncés à la main",
        "Boucle métallique ovale unique sur le réglage",
        "Taille : unique · réglable",
        "Coloris personnalisés disponibles sur demande",
      ],
    },
    de: {
      name: "Genietete Denim-Cap, Gewaschen",
      description:
        "Nieten ziehen sich entlang der Front- und Seitennähte sowie um die Schirmkante, auf stark gewaschenem Denim-Grund. Das Motiv wird durch Ihr eigenes ersetzt — die Nieten und die Waschung bleiben.",
      material: "Gewaschener Denim, Baumwolle",
      colors: ["Gewaschenes Indigo"],
      features: [
        "6-Panel-Baseballcap",
        "Nieten an Front- und Seitennähten sowie an der Schirmkante",
        "Gestickte Ösen statt Metallösen",
        "Intensive Wäsche nach der Konfektion, handgeschliffene Kanten",
        "Einzelne ovale Metallschnalle am Verstellband",
        "Größe: Einheitsgröße · verstellbar",
        "Sonderfarben auf Anfrage erhältlich",
      ],
    },
  },

  "studded-brim-pigment-cap": {
    es: {
      name: "Gorra Teñida con Tachuelas en la Visera",
      description:
        "Un anillo de tachuelas abovedadas recorre el borde de la visera, letras solo de contorno y una etiqueta tejida en la parte trasera — tres detalles de herrajes y oficio en un solo bloque. Tanto las letras como la etiqueta tejida llevan tu propio texto.",
      material: "Sarga de algodón lavada y teñida por pigmento",
      colors: ["Gris carbón"],
      features: [
        "Copa blanda de 6 paneles, visera casi plana",
        "Tachuelas abovedadas distribuidas uniformemente en el borde de la visera",
        "Bordado de contorno que deja ver la tela de la copa",
        "Teñido por pigmento con variación tonal natural",
        "Etiqueta tejida junto al regulador",
        "Talla: única · correa ajustable",
        "Colores personalizados disponibles bajo pedido",
      ],
    },
    fr: {
      name: "Casquette Teinture Pigmentaire à Visière Cloutée",
      description:
        "Un anneau de clous bombés longe le bord de la visière, des lettres en contour seul et une étiquette tissée à l'arrière — trois détails de quincaillerie et de façon réunis en un seul bloc. Lettres et étiquette tissée portent toutes deux votre propre texte.",
      material: "Sergé de coton délavé à teinture pigmentaire",
      colors: ["Anthracite"],
      features: [
        "Calotte souple 6 panneaux, visière quasi plate",
        "Clous bombés répartis uniformément sur le bord de la visière",
        "Broderie contour laissant apparaître le tissu de la calotte",
        "Teinture pigmentaire à variation tonale naturelle",
        "Étiquette tissée à côté du réglage",
        "Taille : unique · sangle réglable",
        "Coloris personnalisés disponibles sur demande",
      ],
    },
    de: {
      name: "Pigmentgefärbte Cap mit Nieten-Schirm",
      description:
        "Ein Ring aus Halbkugelnieten entlang der Schirmkante, ein reiner Umrissschriftzug und ein Webetikett auf der Rückseite — drei Hardware- und Verarbeitungsdetails in einem Block vereint. Sowohl der Schriftzug als auch das Webetikett tragen Ihren eigenen Text.",
      material: "Pigmentgefärbter, gewaschener Baumwoll-Twill",
      colors: ["Anthrazit"],
      features: [
        "Weiches 6-Panel-Kopfteil, nahezu flacher Schirm",
        "Gleichmäßig verteilte Halbkugelnieten entlang der Schirmkante",
        "Umrissstickerei mit durchscheinendem Kopfteilstoff",
        "Pigmentfärbung mit natürlicher Tonabweichung",
        "Webetikett neben dem Verstellband",
        "Größe: Einheitsgröße · verstellbarer Verschluss",
        "Sonderfarben auf Anfrage erhältlich",
      ],
    },
  },

  "double-piping-washed-cap": {
    es: {
      name: "Gorra Lavada con Doble Vivo",
      description:
        "Un vivo de contraste estrecho está cosido en la base de la copa y recorre toda la circunferencia, una segunda línea traza el borde de la visera, y un parche de PVC redondeado ocupa el centro del frente — tres detalles de herrajes y oficio en una sola gorra de algodón lavado. El parche frontal es un espacio de referencia en PVC mate suave — se sustituye por tu propio wordmark, mismo diseño y tamaño.",
      material: "Sarga de algodón lavada",
      colors: ["Negro lavado", "Azul marino lavado", "Rojo ladrillo lavado", "Latte lavado"],
      features: [
        "Dad cap de 6 paneles sin estructura y perfil bajo, visera curva",
        "Vivo cosido en la costura de la base de la copa, continuo alrededor de la parte trasera",
        "Segunda línea de vivo a lo largo del borde de la visera, que se une a la línea de la copa en cada lado",
        "Sarga de algodón lavada con degradado tonal natural",
        "Hebilla metálica envejecida con correa de cincha en la parte trasera",
        "Talla: única · hebilla metálica",
      ],
    },
    fr: {
      name: "Casquette Délavée à Double Passepoil",
      description:
        "Un passepoil contrastant fin est cousu à la base de la calotte et fait le tour complet, une seconde ligne trace le bord de la visière, et un patch PVC arrondi occupe le centre de l'avant — trois détails de quincaillerie et de façon réunis sur une seule casquette en coton délavé. Le patch avant est un repère en PVC mat souple — remplacé par votre propre wordmark, même construction et même taille.",
      material: "Sergé de coton délavé",
      colors: ["Noir délavé", "Marine délavé", "Rouge brique délavé", "Latte délavé"],
      features: [
        "Dad cap 6 panneaux non structurée, profil bas, visière courbée",
        "Passepoil inséré dans la couture de base de la calotte, continu à l'arrière",
        "Seconde ligne de passepoil le long du bord de la visière, rejoignant la ligne de la calotte de chaque côté",
        "Sergé de coton délavé à dégradé tonal naturel",
        "Coulisseau métallique vieilli avec sangle à l'arrière",
        "Taille : unique · coulisseau métallique",
      ],
    },
    de: {
      name: "Gewaschene Cap mit Doppelpaspel",
      description:
        "Eine schmale Kontrastpaspel ist in die Basisnaht des Kopfteils eingearbeitet und verläuft rundum, eine zweite Linie zeichnet die Schirmkante nach, und ein abgerundeter PVC-Patch sitzt mittig vorne — drei Hardware- und Verarbeitungsdetails in einer gewaschenen Baumwollcap vereint. Der Front-Patch ist ein Platzhalter aus weichem, mattem PVC — wird durch Ihren eigenen Schriftzug ersetzt, gleiche Bauweise und Größe.",
      material: "Gewaschener Baumwoll-Twill",
      colors: ["Gewaschenes Schwarz", "Gewaschenes Marineblau", "Gewaschenes Ziegelrot", "Gewaschenes Latte"],
      features: [
        "Unstrukturierte 6-Panel-Dad-Cap mit niedrigem Profil, gebogener Schirm",
        "Paspel in die Basisnaht des Kopfteils eingearbeitet, durchgehend um den Hinterkopf",
        "Zweite Paspellinie entlang der Schirmkante, trifft beidseitig auf die Kopfteillinie",
        "Gewaschener Baumwoll-Twill mit natürlicher Tonabstufung",
        "Antik-Metallschieber mit Gurtband hinten",
        "Größe: Einheitsgröße · Metallschieber",
      ],
    },
  },

  "utility-pocket-camp-cap": {
    es: {
      name: "Gorra Camp con Bolsillo Utilitario",
      description:
        "Un bolsillo funcional con solapa se ubica en el panel frontal — para una tarjeta, un par de tapones para los oídos, o simplemente como detalle. Aquí el lenguaje es de herramienta, no de logo. La solapa es el lugar natural para una etiqueta tejida o una marca bordada.",
      material: "Tejido cortavientos",
      colors: ["Verde oliva"],
      features: [
        "Gorra camp de 5 paneles con bolsillo de solapa",
        "Bolsillo frontal con solapa, se abre y se cierra",
        "Copa baja con visera plana",
        "Ojales metálicos en los paneles laterales",
        "Regulador de correa de cincha",
        "Talla: única · correa de cincha",
        "Colores personalizados disponibles bajo pedido",
      ],
    },
    fr: {
      name: "Casquette Camp à Poche Utilitaire",
      description:
        "Une poche à rabat fonctionnelle se trouve sur le panneau avant — pour une carte, une paire de bouchons d'oreille, ou simplement comme détail. Le langage ici est celui de l'outil, pas du logo. Le rabat est l'endroit naturel pour une étiquette tissée ou une marque brodée.",
      material: "Tissu tissé coupe-vent",
      colors: ["Olive"],
      features: [
        "Casquette camp 5 panneaux à poche à rabat",
        "Poche à rabat avant, s'ouvre et se ferme",
        "Calotte basse à visière plate",
        "Œillets métalliques sur les panneaux latéraux",
        "Réglage par sangle",
        "Taille : unique · sangle",
        "Coloris personnalisés disponibles sur demande",
      ],
    },
    de: {
      name: "Camp-Cap mit Utility-Tasche",
      description:
        "Eine funktionale Klappentasche sitzt auf dem Frontpanel — für eine Karte, ein Paar Ohrstöpsel oder einfach als Detail. Die Formensprache hier ist Werkzeug, nicht Logo. Die Klappe ist der natürliche Platz für ein Webetikett oder eine gestickte Kennzeichnung.",
      material: "Winddichtes Webmaterial",
      colors: ["Oliv"],
      features: [
        "5-Panel-Camp-Cap mit Klappentasche",
        "Vordere Klappentasche, zum Öffnen und Schließen",
        "Niedriges Kopfteil mit flachem Schirm",
        "Metallösen an den Seitenpanels",
        "Verstellbares Gurtband",
        "Größe: Einheitsgröße · Gurtband",
        "Sonderfarben auf Anfrage erhältlich",
      ],
    },
  },

  "lightweight-running-cap": {
    es: {
      name: "Gorra Running Ligera",
      description:
        "Ligera al tacto, con una visera blanda que se enrolla y cabe en un bolsillo — pensada para corredores, en blanco y lista para tu marca. Panel frontal limpio — la base más sencilla para el logo de un equipo o una carrera.",
      material: "Poliéster tejido elástico",
      colors: ["Negro", "Crudo"],
      features: [
        "Gorra running, visera blanda",
        "Estructura ligera de tejido elástico",
        "Visera blanda, se enrolla y recupera su forma",
        "Ajuste trasero con cordón elástico",
        "Totalmente en blanco, sin ningún branding aplicado",
        "Talla: única · cordón elástico",
        "Colores personalizados disponibles bajo pedido",
      ],
    },
    fr: {
      name: "Casquette de Running Légère",
      description:
        "Légère en main, avec une visière souple qui s'enroule et tient dans une poche — pensée pour les coureurs, vierge et prête pour votre marque. Panneau avant net — la base la plus simple pour un logo d'équipe ou de course.",
      material: "Polyester tissé stretch",
      colors: ["Noir", "Écru"],
      features: [
        "Casquette de running, visière souple",
        "Structure légère en tissu stretch",
        "Visière souple, s'enroule et reprend sa forme",
        "Réglage arrière par cordon élastique",
        "Entièrement vierge, sans aucun marquage",
        "Taille : unique · cordon élastique",
        "Coloris personnalisés disponibles sur demande",
      ],
    },
    de: {
      name: "Leichte Running-Kappe",
      description:
        "Leicht in der Hand, mit weichem Schirm, der sich einrollen und in eine Tasche stecken lässt — für Läufer gebaut, unbedruckt für Ihr Branding. Sauberes Frontpanel — die einfachste Basis für ein Team- oder Renn-Logo.",
      material: "Elastisches Webpolyester",
      colors: ["Schwarz", "Ecru"],
      features: [
        "Running-Kappe, weicher Schirm",
        "Leichte, elastische Webstoff-Außenhülle",
        "Weicher Schirm, lässt sich einrollen und erholt sich wieder",
        "Hintere Verstellung mit elastischer Kordel",
        "Komplett unbedruckt, ohne jegliches Branding",
        "Größe: Einheitsgröße · elastische Kordel",
        "Sonderfarben auf Anfrage erhältlich",
      ],
    },
  },

  "sunglass-slot-long-brim-sport-cap": {
    es: {
      name: "Gorra Deportiva de Visera Larga con Ranura para Gafas",
      description:
        "Una ventana triangular de malla a cada lado sostiene la patilla de las gafas de sol — se quedan en la gorra en lugar de en un bolsillo. Panel frontal en blanco. Las gafas mostradas son un accesorio de la foto, no forman parte del producto.",
      material: "Tejido de nylon ligero",
      colors: ["Gris claro"],
      features: [
        "Gorra deportiva de 5 paneles, visera larga",
        "Ventanas laterales de malla con el tamaño justo para las patillas de las gafas",
        "Visera larga para mayor sombra",
        "Tejido de nylon ligero y de secado rápido",
        "Regulador de cordón elástico con ribete reflectante",
        "Talla: única · cordón elástico",
        "Colores personalizados disponibles bajo pedido",
      ],
    },
    fr: {
      name: "Casquette de Sport à Longue Visière et Fente Porte-Lunettes",
      description:
        "Une fenêtre triangulaire en maille de chaque côté accueille la branche d'une paire de lunettes de soleil — elles restent sur la casquette plutôt que dans une poche. Panneau avant vierge. Les lunettes présentées sont un accessoire de mise en scène, non fourni avec le produit.",
      material: "Tissu nylon léger tissé",
      colors: ["Gris clair"],
      features: [
        "Casquette de sport 5 panneaux, longue visière",
        "Fenêtres latérales en maille dimensionnées pour les branches de lunettes",
        "Longue visière pour une ombre accrue",
        "Tissu nylon léger tissé, séchage rapide",
        "Réglage par cordon élastique avec liseré réfléchissant",
        "Taille : unique · cordon élastique",
        "Coloris personnalisés disponibles sur demande",
      ],
    },
    de: {
      name: "Sport-Cap mit Langem Schirm und Sonnenbrillen-Steckfach",
      description:
        "Ein dreieckiges Meshfenster auf jeder Seite nimmt den Bügel einer Sonnenbrille auf — sie bleibt an der Cap statt in einer Tasche. Unbedrucktes Frontpanel. Die gezeigte Sonnenbrille ist ein Requisit für das Foto und nicht Teil des Produkts.",
      material: "Leichtes Nylon-Gewebe",
      colors: ["Hellgrau"],
      features: [
        "5-Panel-Sportcap mit langem Schirm",
        "Seitliche Meshfenster passend für Brillenbügel",
        "Langer Schirm für zusätzlichen Schatten",
        "Leichtes, schnelltrocknendes Nylon-Gewebe",
        "Verstellung mit elastischer Kordel und reflektierendem Besatz",
        "Größe: Einheitsgröße · elastische Kordel",
        "Sonderfarben auf Anfrage erhältlich",
      ],
    },
  },

  "washed-denim-cadet-cap": {
    es: {
      name: "Gorra Cadete de Denim Lavado",
      description:
        "Una copa militar plana envuelta en letras de aplique de borde crudo que continúan del frente hacia ambos laterales. El texto es un marcador de posición — tu propia palabra o logo va en su lugar.",
      material: "Denim lavado, algodón",
      colors: ["Azul denim", "Gris carbón", "Verde oliva"],
      features: [
        "Gorra cadete de parte superior plana",
        "Parte superior plana y redonda, pared de gorra recta",
        "Aplique de borde crudo con bordado de contorno blanco",
        "Visera desgastada que deja ver los hilos blancos de la urdimbre",
        "Tacto de denim lavado",
        "Talla: única · ajustable",
      ],
    },
    fr: {
      name: "Casquette Cadet en Denim Délavé",
      description:
        "Une calotte militaire plate enveloppée de lettres appliquées à bord brut, qui se prolongent de l'avant vers les deux côtés. Le texte est un espace de référence — votre propre mot ou logo prend sa place.",
      material: "Denim délavé, coton",
      colors: ["Bleu denim", "Anthracite", "Olive"],
      features: [
        "Casquette cadet à sommet plat",
        "Sommet plat et rond, paroi de casquette droite",
        "Appliqué à bord brut avec broderie contour blanche",
        "Visière usée laissant apparaître les fils de chaîne blancs",
        "Toucher denim délavé",
        "Taille : unique · réglable",
      ],
    },
    de: {
      name: "Gewaschene Denim-Cadet-Cap",
      description:
        "Ein flaches, militärisch anmutendes Kopfteil, umschlossen von Applikationsbuchstaben mit Rohkante, die sich von der Front auf beide Seiten fortsetzen. Der Schriftzug ist ein Platzhalter — Ihr eigenes Wort oder Logo tritt an seine Stelle.",
      material: "Gewaschener Denim, Baumwolle",
      colors: ["Denimblau", "Anthrazit", "Oliv"],
      features: [
        "Cadet-Cap mit flacher Oberseite",
        "Runde, flache Oberseite, gerade Capwand",
        "Applikation mit Rohkante und weißer Umrissstickerei",
        "Abgetragener Schirm mit sichtbaren weißen Kettfäden",
        "Griff wie gewaschener Denim",
        "Größe: Einheitsgröße · verstellbar",
      ],
    },
  },

  "neck-shade-jet-cap": {
    es: {
      name: "Gorra Jet con Protector de Cuello",
      description:
        "Dos gorras en una: protector puesto para el agua, protector fuera para el camino de vuelta. Perforaciones graduadas recorren cada panel lateral. Paneles frontal y laterales en blanco — listos para estampado o bordado con tu diseño.",
      material: "Tejido mate repelente al agua",
      colors: ["Negro"],
      features: [
        "Gorra jet de 5 paneles, protector de cuello desmontable",
        "Copa jet de cinco paneles, parte superior blanda",
        "Perforación láser graduada de mayor a menor",
        "Protector de cuello desmontable, cierre de velcro en 3 puntos",
        "Cordón trasero con regulador tipo tope",
        "Talla: única · cordón trasero",
        "Colores personalizados disponibles bajo pedido",
      ],
    },
    fr: {
      name: "Casquette Jet à Protège-Nuque",
      description:
        "Deux casquettes en une : protège-nuque attaché pour l'eau, détaché pour le retour à pied. Des perforations graduées parcourent chaque panneau latéral. Panneaux avant et latéraux vierges — prêts pour impression ou broderie de votre visuel.",
      material: "Tissu mat déperlant",
      colors: ["Noir"],
      features: [
        "Casquette jet 5 panneaux, protège-nuque amovible",
        "Calotte jet cinq panneaux, sommet souple",
        "Perforation laser graduée du plus grand au plus petit",
        "Protège-nuque amovible, fermeture auto-agrippante 3 points",
        "Cordon arrière avec stop-cordon",
        "Taille : unique · cordon arrière",
        "Coloris personnalisés disponibles sur demande",
      ],
    },
    de: {
      name: "Jet-Cap mit Nackenschutz",
      description:
        "Zwei Kappen in einer: Nackenschutz angebracht für den Wassersport, abgenommen für den Rückweg. Abgestufte Perforationen ziehen sich über jedes Seitenpanel. Front- und Seitenpanels unbedruckt — bereit für Druck oder Stickerei Ihres Motivs.",
      material: "Mattes, wasserabweisendes Gewebe",
      colors: ["Schwarz"],
      features: [
        "5-Panel-Jet-Cap mit abnehmbarem Nackenschutz",
        "Fünfteiliges Jet-Kopfteil, weiche Oberseite",
        "Laserperforation, von groß nach klein abgestuft",
        "Abnehmbarer Nackenschutz, 3-Punkt-Klettverschluss",
        "Kordelzug hinten mit Kordelstopper",
        "Größe: Einheitsgröße · Kordelzug hinten",
        "Sonderfarben auf Anfrage erhältlich",
      ],
    },
  },

  "gathered-crown-sun-hat": {
    es: {
      name: "Sombrero de Sol con Copa Fruncida",
      description:
        "Una banda fruncida alrededor de la copa le da al sombrero una caída tipo falda; la parte inferior del ala luce un color de contraste con un fino borde con vivo — la parte que solo se ve cuando el ala se levanta. Completamente en blanco — sin ninguna marca, listo para tu propio bordado.",
      material: "Tejido blando",
      colors: ["Gama de cuatro colores de contraste"],
      features: [
        "Sombrero de sol de ala ancha, copa fruncida",
        "Banda fruncida alrededor de la copa",
        "Parte inferior del ala en color de contraste con borde con vivo",
        "Cuerpo blando, se dobla plano",
        "Cordón de barbilla de cincha plana, desmontable",
        "Talla: única · cordón de barbilla desmontable",
      ],
    },
    fr: {
      name: "Chapeau de Soleil à Calotte Froncée",
      description:
        "Une bande froncée autour de la calotte donne au chapeau une chute en forme de jupe ; le dessous du bord affiche une couleur contrastante avec un fin passepoil — la partie que l'on ne voit que lorsque le bord se soulève. Entièrement vierge — aucune marque nulle part, prêt pour votre propre broderie.",
      material: "Tissu souple tissé",
      colors: ["Gamme de quatre coloris contrastants"],
      features: [
        "Chapeau de soleil à large bord, calotte froncée",
        "Bande froncée autour de la calotte",
        "Dessous du bord en couleur contrastante avec passepoil",
        "Corps souple, se plie à plat",
        "Jugulaire plate en sangle, amovible",
        "Taille : unique · jugulaire amovible",
      ],
    },
    de: {
      name: "Sonnenhut mit Gerafftem Kopfteil",
      description:
        "Ein gerafftes Band um das Kopfteil verleiht dem Hut einen rockartigen Fall; die Unterseite der Krempe zeigt eine Kontrastfarbe mit feiner Paspelkante — der Teil, den man nur sieht, wenn sich die Krempe hebt. Völlig unbedruckt — keinerlei Kennzeichnung, bereit für Ihre eigene Stickerei.",
      material: "Weiches Webmaterial",
      colors: ["Vierfarbige Kontrastpalette"],
      features: [
        "Breitkrempiger Sonnenhut mit gerafftem Kopfteil",
        "Gerafftes Band um das Kopfteil",
        "Krempenunterseite in Kontrastfarbe mit Paspelkante",
        "Weicher Körper, lässt sich flach zusammenlegen",
        "Flache Kinnkordel aus Gurtband, abnehmbar",
        "Größe: Einheitsgröße · abnehmbare Kinnkordel",
      ],
    },
  },

  "contrast-brim-bucket-hat": {
    es: {
      name: "Sombrero de Pescador con Ala de Contraste",
      description:
        "Copa y ala en dos colores de contraste, y el ala lleva un anillo de seis a ocho líneas de pespunte concéntricas que recorren todo su ancho — el detalle que capta la mirada primero. Completamente en blanco — copa, ala y banda no llevan ningún branding, listos para tu propio bordado o estampado.",
      material: "100% poliéster",
      colors: [
        "Arena con ala azul marino",
        "Gris claro con ala gris carbón",
        "Crema con ala caramelo",
        "Caqui con ala verde oliva",
      ],
      features: [
        "Sombrero de pescador de ala ancha, cordón de barbilla ajustable",
        "Banda fruncida en la base de la copa del color del ala, rematada con vivo a tono",
        "Anillos de pespunte concéntricos en todo el ancho del ala",
        "Dos ojales tono bronce a los lados",
        "Correa de barbilla de cordón ajustable con tope",
        "Talla: única · 56–62 cm, cordón ajustable",
      ],
    },
    fr: {
      name: "Bob à Bord Contrastant",
      description:
        "Calotte et bord dans deux couleurs contrastantes, et le bord porte un anneau de six à huit lignes de surpiqûre concentriques sur toute sa largeur — le détail qui attire le regard en premier. Entièrement vierge — calotte, bord et bande ne portent aucun marquage, prêts pour votre propre broderie ou impression.",
      material: "100 % polyester",
      colors: [
        "Sable à bord marine",
        "Gris clair à bord anthracite",
        "Écru à bord caramel",
        "Kaki à bord olive",
      ],
      features: [
        "Bob à large bord, jugulaire réglable",
        "Bande froncée à la base de la calotte dans la couleur du bord, bordée d'un passepoil ton sur ton",
        "Anneaux de surpiqûre concentriques sur toute la largeur du bord",
        "Deux œillets ton bronze sur les côtés",
        "Jugulaire à cordon réglable avec bloqueur",
        "Taille : unique · 56–62 cm, cordon réglable",
      ],
    },
    de: {
      name: "Fischerhut mit Kontrastkrempe",
      description:
        "Kopfteil und Krempe in zwei Kontrastfarben, und die Krempe trägt einen Ring aus sechs bis acht konzentrischen Ziernähten über die gesamte Breite — das Detail, das zuerst ins Auge fällt. Völlig unbedruckt — Kopfteil, Krempe und Band tragen kein Branding, bereit für Ihre eigene Stickerei oder Ihren Druck.",
      material: "100 % Polyester",
      colors: [
        "Sand mit marineblauer Krempe",
        "Hellgrau mit anthrazitfarbener Krempe",
        "Creme mit karamellfarbener Krempe",
        "Khaki mit olivgrüner Krempe",
      ],
      features: [
        "Breitkrempiger Fischerhut, verstellbare Kinnkordel",
        "Gerafftes Band an der Kopfteilbasis in Krempenfarbe, mit Ton-in-Ton-Paspel eingefasst",
        "Konzentrische Ziernahtringe über die gesamte Krempenbreite",
        "Zwei bronzefarbene Ösen an den Seiten",
        "Verstellbare Kinnkordel mit Kordelstopper",
        "Größe: Einheitsgröße · 56–62 cm, verstellbare Kordel",
      ],
    },
  },

  "stretch-woven-visor": {
    es: {
      name: "Visera Tejida Elástica",
      description:
        "Una banda tejida ancha con acabado mate fino, malla negra en el interior, y un regulador trasero de doble lazo elástico. Banda frontal limpia — tu logo bordado o estampado.",
      material: "88% poliéster reciclado / 12% elastano",
      colors: ["Negro", "Blanco"],
      features: [
        "Visera de copa abierta",
        "Copa abierta, banda ancha estructurada",
        "Visera curva, doble pespunte paralelo",
        "Interior de malla negra en ambos colores",
        "Ajuste trasero de doble lazo elástico",
        "Talla: 57 cm · ajustable",
      ],
    },
    fr: {
      name: "Visière Tissée Stretch",
      description:
        "Un large bandeau tissé à la face mate et fine, doublure en maille noire à l'intérieur, et un réglage arrière à double boucle élastique. Bandeau avant net — votre logo brodé ou imprimé.",
      material: "88 % polyester recyclé / 12 % élasthanne",
      colors: ["Noir", "Blanc"],
      features: [
        "Visière à calotte ouverte",
        "Calotte ouverte, large bandeau structuré",
        "Visière courbée, double surpiqûre parallèle",
        "Intérieur en maille noire sur les deux coloris",
        "Réglage arrière à double boucle élastique",
        "Taille : 57 cm · réglable",
      ],
    },
    de: {
      name: "Elastisches Web-Visier",
      description:
        "Ein breites, gewebtes Stirnband mit feiner matter Oberfläche, schwarzem Mesh innen und einer doppelten elastischen Schlaufenverstellung hinten. Sauberes Frontband — Ihr Logo gestickt oder gedruckt.",
      material: "88 % recyceltes Polyester / 12 % Elasthan",
      colors: ["Schwarz", "Weiß"],
      features: [
        "Visier mit offenem Kopfteil",
        "Offenes Kopfteil, breites strukturiertes Band",
        "Gebogener Schirm, doppelte parallele Ziernaht",
        "Schwarzes Mesh-Innenfutter bei beiden Farboptionen",
        "Doppelte elastische Schlaufenverstellung hinten",
        "Größe: 57 cm · verstellbar",
      ],
    },
  },

  "corduroy-sherpa-earflap-cap": {
    es: {
      name: "Gorra de Invierno de Pana con Orejeras Sherpa",
      description:
        "Se lleva de dos formas — orejeras abajo para el frío, plegadas arriba para la ciudad. Pana de canal ancho sobre un forro sherpa acolchado. Exterior en blanco — bordado o parche tejido con tu diseño.",
      material: "100% pana de algodón, forro sherpa",
      colors: ["Marrón con sherpa crudo"],
      features: [
        "Gorra de invierno con orejeras",
        "Exterior de pana de canal ancho",
        "Orejeras forradas en sherpa, se pliegan hacia arriba o abajo",
        "Forro acolchado aislante",
        "Cuerpo en blanco, sin ningún branding aplicado",
        "Talla: 57 cm (regulador opcional)",
        "Colores personalizados disponibles bajo pedido",
      ],
    },
    fr: {
      name: "Bonnet d'Hiver en Velours Côtelé à Oreillettes Sherpa",
      description:
        "Se porte de deux façons — oreillettes baissées contre le froid, repliées pour la ville. Velours côtelé à grosses côtes sur une doublure sherpa matelassée. Extérieur vierge — broderie ou patch tissé selon votre visuel.",
      material: "100 % velours côtelé de coton, doublure sherpa",
      colors: ["Marron à sherpa écru"],
      features: [
        "Bonnet d'hiver à oreillettes",
        "Extérieur en velours côtelé à grosses côtes",
        "Oreillettes doublées sherpa, se replient vers le haut ou le bas",
        "Doublure matelassée isolante",
        "Corps vierge, sans aucun marquage",
        "Taille : 57 cm (réglage en option)",
        "Coloris personnalisés disponibles sur demande",
      ],
    },
    de: {
      name: "Cord-Wintermütze mit Sherpa-Ohrenklappen",
      description:
        "Zwei Trageweisen — Klappen unten gegen die Kälte, hochgeklappt für die Stadt. Breitgerippter Cord über gestepptem Sherpa-Futter. Unbedruckte Hülle — Stickerei oder Webpatch nach Ihrem Motiv.",
      material: "100 % Baumwollcord, Sherpa-Futter",
      colors: ["Braun mit cremefarbenem Sherpa"],
      features: [
        "Wintermütze mit Ohrenklappen",
        "Außenhülle aus breitgerripptem Cord",
        "Sherpa-gefütterte Ohrenklappen, hoch- oder herunterklappbar",
        "Gestepptes Isolierfutter",
        "Unbedruckter Korpus, ohne jegliches Branding",
        "Größe: 57 cm (Verstellband optional)",
        "Sonderfarben auf Anfrage erhältlich",
      ],
    },
  },

  "faux-fur-trim-earflap-cap": {
    es: {
      name: "Gorra con Orejeras y Ribete de Piel Sintética",
      description:
        "Un anillo de piel sintética de pelo largo envuelve una copa de béisbol lisa — cubre las orejas, enmarca el rostro y luce bien en fotos. Ese texto caligráfico del frente es donde va tu propio nombre.",
      material: "Exterior tejido, ribete de piel sintética",
      colors: ["Marrón", "Crudo"],
      features: [
        "Copa de béisbol con ribete de piel sintética",
        "Ribete de piel sintética de pelo largo alrededor de la copa",
        "Bordado tipo caligrafía en el panel frontal",
        "Exterior tejido sobre forro acolchado",
        "Solo piel sintética — no se utiliza piel animal",
        "Talla: única",
        "Colores personalizados disponibles bajo pedido",
      ],
    },
    fr: {
      name: "Casquette à Oreillettes et Bordure Fausse Fourrure",
      description:
        "Un anneau de fausse fourrure à poils longs enveloppe une calotte de baseball unie — il couvre les oreilles, encadre le visage et rend très bien en photo. Ce script sur l'avant est l'endroit où votre propre nom prend place.",
      material: "Extérieur tissé, bordure fausse fourrure",
      colors: ["Marron", "Écru"],
      features: [
        "Calotte de baseball à bordure fausse fourrure",
        "Bordure en fausse fourrure à poils longs autour de la calotte",
        "Broderie script disposée sur le panneau avant",
        "Extérieur tissé sur doublure matelassée",
        "Fausse fourrure uniquement — aucune fourrure animale utilisée",
        "Taille : unique",
        "Coloris personnalisés disponibles sur demande",
      ],
    },
    de: {
      name: "Cap mit Ohrenklappen und Kunstfell-Besatz",
      description:
        "Ein Ring aus langhaarigem Kunstfell umschließt ein schlichtes Baseball-Kopfteil — er bedeckt die Ohren, rahmt das Gesicht und wirkt auf Fotos hervorragend. Der Schriftzug auf der Front ist der Platz für Ihren eigenen Namen.",
      material: "Gewebte Außenhülle, Kunstfell-Besatz",
      colors: ["Braun", "Ecru"],
      features: [
        "Baseball-Kopfteil mit Kunstfell-Besatz",
        "Langhaariger Kunstfell-Besatz rund um das Kopfteil",
        "Schreibschrift-Stickerei über das Frontpanel gesetzt",
        "Gewebte Außenhülle über gestepptem Futter",
        "Ausschließlich Kunstfell — es wird kein Tierfell verwendet",
        "Größe: Einheitsgröße",
        "Sonderfarben auf Anfrage erhältlich",
      ],
    },
  },

  "reversible-fleece-trooper-hat": {
    es: {
      name: "Gorro Trooper de Forro Polar Reversible",
      description:
        "Se usa de dos formas — nylon al exterior para un look discreto, forro polar al exterior cuando arrecia el frío. Una orejera de una sola pieza envuelve toda la parte trasera de la cabeza. Solo una pequeña marca bordada en el frente — de sobra espacio para la tuya.",
      material: "Exterior de nylon crinkle, reverso de forro polar",
      colors: ["Negro con forro polar crudo", "Verde oliva con crudo", "Caramelo con marrón"],
      features: [
        "Gorro trooper reversible, visera corta",
        "Reversible: nylon crinkle en un lado, forro polar en el otro",
        "Orejera de una sola pieza, de oreja a oreja alrededor de la nuca",
        "Visera corta y rígida",
        "Cordones finos de atado en los extremos de la orejera",
        "Talla: única · cordones de atado",
      ],
    },
    fr: {
      name: "Chapka Réversible en Fleece",
      description:
        "Se porte des deux côtés — nylon à l'extérieur pour un look discret, fleece à l'extérieur quand le froid s'installe. Une oreillette en une seule pièce enveloppe tout l'arrière de la tête. Seule une petite marque brodée orne l'avant — largement de la place pour la vôtre.",
      material: "Extérieur nylon froissé, revers fleece",
      colors: ["Noir à fleece écru", "Olive à écru", "Caramel à marron"],
      features: [
        "Chapka réversible, visière courte",
        "Réversible : nylon froissé d'un côté, fleece de l'autre",
        "Oreillette en une seule pièce, d'oreille à oreille autour de la nuque",
        "Visière courte et rigide",
        "Fins cordons de serrage aux extrémités de l'oreillette",
        "Taille : unique · cordons de serrage",
      ],
    },
    de: {
      name: "Wendbare Fleece-Trapper-Mütze",
      description:
        "Beidseitig tragbar — Nylon außen für einen dezenten Look, Fleece außen, wenn es kalt wird. Eine einteilige Ohrenklappe umschließt den gesamten Hinterkopf. Nur eine kleine gestickte Kennzeichnung auf der Front — reichlich Platz für Ihre eigene.",
      material: "Knitter-Nylon-Außenseite, Fleece-Rückseite",
      colors: ["Schwarz mit Ecru-Fleece", "Oliv mit Ecru", "Karamell mit Braun"],
      features: [
        "Wendbare Trapper-Mütze, kurzer Schirm",
        "Wendbar: auf einer Seite Knitter-Nylon, auf der anderen Fleece",
        "Einteilige Ohrenklappe, von Ohr zu Ohr um den Hinterkopf",
        "Kurzer, steifer Schirm",
        "Dünne Bindekordeln an den Klappenenden",
        "Größe: Einheitsgröße · Bindekordeln",
      ],
    },
  },
};

// 按语言返回本地化后的产品副本;英文或没有对应翻译时原样返回英文数据兜底
export function localizeProduct(product: Product, locale: string): Product {
  if (!isTranslatedLocale(locale)) return product;
  const translation = productTranslations[product.slug]?.[locale];
  if (!translation) return product;
  return {
    ...product,
    name: translation.name,
    description: translation.description,
    material: translation.material,
    features: translation.features,
    colors: translation.colors,
  };
}
