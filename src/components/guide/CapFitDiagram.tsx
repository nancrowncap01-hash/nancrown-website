import type { Locale } from "@/i18n/routing";

const copy = {
  en: { title: "Mark the measurement before giving the number", note: "Schematic reference, not a size chart. Agree on endpoints, tape path and cap condition using a marked photo of your reference cap. No universal size or tolerance is implied.", labels: ["A · Head circumference", "B · Inside circumference", "C · Crown depth and brim length"], notes: ["Keep the tape level around the intended wearing line, above the ears. Record the unit; do not pull it tight.", "Follow the inside sweatband at the agreed closure setting, without stretching. A head measurement and a cap measurement are not interchangeable.", "Mark the crown-depth endpoints and whether you measure along the surface. For the brim, agree on the centre line from the crown seam to the edge and its curved or flat state."] },
  es: { title: "Marca la medida antes de indicar el número", note: "Esquema orientativo, no tabla de tallas. Acuerda los extremos, el recorrido de la cinta y el estado de la gorra con una foto marcada de tu referencia. No implica una talla ni tolerancia universal.", labels: ["A · Contorno de cabeza", "B · Contorno interior", "C · Profundidad de copa y largo de visera"], notes: ["Mantén la cinta nivelada en la línea de uso prevista, por encima de las orejas. Anota la unidad y no aprietes la cinta.", "Sigue la banda interior con el cierre en la posición acordada, sin estirar. La medida de la cabeza y la de la gorra no son intercambiables.", "Marca los extremos para medir la profundidad y si se sigue la superficie. Para la visera, acuerda la línea central desde la costura de la copa al borde y su estado curvado o plano."] },
  fr: { title: "Repérez la mesure avant de donner sa valeur", note: "Schéma indicatif, pas un tableau de tailles. Convenez des points de mesure, du trajet du ruban et de l’état de la casquette sur une photo annotée du modèle de référence. Aucune taille ou tolérance universelle n’est implicite.", labels: ["A · Tour de tête", "B · Tour intérieur", "C · Profondeur de calotte et longueur de visière"], notes: ["Gardez le ruban horizontal au niveau de port prévu, au-dessus des oreilles. Notez l’unité et ne serrez pas le ruban.", "Suivez la bande intérieure, avec la fermeture au réglage convenu, sans étirer. Le tour de tête et le tour intérieur ne sont pas interchangeables.", "Repérez les extrémités de la profondeur et précisez si la mesure suit la surface. Pour la visière, convenez de l’axe central entre la couture de la calotte et le bord, ainsi que de son état plat ou courbé."] },
  de: { title: "Messstrecke markieren, dann den Wert angeben", note: "Schematische Orientierung, keine Größentabelle. Messpunkte, Verlauf des Maßbands und Zustand der Kappe anhand eines markierten Referenzfotos vereinbaren. Keine allgemeingültige Größe oder Toleranz ist damit zugesagt.", labels: ["A · Kopfumfang", "B · Innenumfang", "C · Kronentiefe und Schirmlänge"], notes: ["Das Maßband waagerecht auf der vorgesehenen Tragelinie oberhalb der Ohren führen. Einheit notieren und nicht straff ziehen.", "Dem inneren Schweißband bei vereinbarter Verschlusseinstellung folgen, ohne es zu dehnen. Kopf- und Kappenmaß sind nicht austauschbar.", "Endpunkte der Kronentiefe und Messung entlang der Oberfläche festlegen. Beim Schirm die Mittellinie von der Kronennaht bis zur Kante sowie den flachen oder gebogenen Zustand vereinbaren."] },
};

export default function CapFitDiagram({ locale }: { locale: Locale }) {
  const c = copy[locale] ?? copy.en;
  return (
    <section className="mx-auto max-w-5xl px-4 pt-10 sm:px-6" aria-labelledby="fit-diagram-title">
      <h2 id="fit-diagram-title" className="text-2xl font-bold text-gray-900">{c.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{c.note}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {c.labels.map((label, i) => (
          <figure key={label} className="min-w-0 rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <svg viewBox="0 0 240 165" aria-hidden="true" className="w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {i === 0 ? <>
                <path d="M75 140 Q54 100 65 51 Q77 20 119 20 Q161 20 173 51 Q184 100 163 140" stroke="#233c50" strokeWidth="3" />
                <ellipse cx="119" cy="89" rx="64" ry="18" stroke="#087f79" strokeWidth="3" strokeDasharray="6 4" />
                <path d="M108 124 Q119 130 130 124" stroke="#233c50" strokeWidth="2" />
                <text x="198" y="94" fill="#087f79" stroke="none" fontSize="20">A</text>
              </> : i === 1 ? <>
                <ellipse cx="115" cy="81" rx="80" ry="55" stroke="#233c50" strokeWidth="3" />
                <ellipse cx="115" cy="81" rx="65" ry="42" stroke="#087f79" strokeWidth="3" strokeDasharray="6 4" />
                <path d="M62 122 Q115 157 168 122" stroke="#233c50" strokeWidth="3" />
                <path d="M94 30 L134 30" stroke="#233c50" strokeWidth="7" />
                <text x="204" y="87" fill="#087f79" stroke="none" fontSize="20">B</text>
              </> : <>
                <path d="M27 114 Q32 38 111 30 Q159 38 165 108 L214 120 Q185 143 155 125 L27 114Z" stroke="#233c50" strokeWidth="3" />
                <path d="M111 30 Q152 50 165 108" stroke="#087f79" strokeWidth="3" strokeDasharray="5 4" />
                <path d="M165 108 Q188 114 214 120" stroke="#b77816" strokeWidth="4" />
                <circle cx="111" cy="30" r="4" fill="#087f79" /><circle cx="165" cy="108" r="4" fill="#087f79" /><circle cx="214" cy="120" r="4" fill="#b77816" />
                <text x="180" y="48" fill="#087f79" stroke="none" fontSize="20">C</text>
              </>}
            </svg>
            <figcaption><h3 className="mt-3 font-semibold text-gray-900">{label}</h3><p className="mt-2 text-sm leading-relaxed text-gray-600">{c.notes[i]}</p></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
