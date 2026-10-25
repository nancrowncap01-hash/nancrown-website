import { Link } from "@/i18n/navigation";

const copy = {
  en: { title: "Your cap specification, ready to share", text: "Use this blank pack to collect the style, colour and size quantities, measurements, materials, logo and packing requirements. Leave unknown details blank for discussion.", download: "Download fillable specification pack (English PDF)", note: "Save the PDF, fill it in English using a PDF reader that supports forms, then save and reopen it to check your entries. You can also print and complete it by hand. Attach the saved PDF to your inquiry: up to 3 files, 4 MB total. No registration required.", contact: "Send your specification for a quote" },
  es: { title: "La ficha de tu gorra, lista para compartir", text: "Reúne el modelo, las cantidades por color y talla, medidas, materiales, logo y embalaje en esta plantilla en blanco. Deja sin rellenar lo que aún no sepas.", download: "Descargar ficha rellenable (PDF en inglés)", note: "Guarda el PDF, rellénalo en inglés con un lector compatible con formularios y vuelve a abrirlo para comprobar los datos guardados. También puedes imprimirlo y escribir a mano. Adjunta el PDF a tu consulta: hasta 3 archivos, 4 MB en total. Sin registro.", contact: "Enviar la ficha para pedir presupuesto" },
  fr: { title: "Votre fiche de casquette, prête à partager", text: "Rassemblez le modèle, les quantités par couleur et taille, les mesures, les matières, le logo et l’emballage dans ce formulaire vierge. Laissez les informations inconnues à compléter ensemble.", download: "Télécharger la fiche à remplir (PDF en anglais)", note: "Enregistrez le PDF, remplissez-le en anglais avec un lecteur compatible avec les formulaires, puis rouvrez-le pour vérifier les données sauvegardées. Vous pouvez aussi l’imprimer et le remplir à la main. Joignez le PDF à votre demande : 3 fichiers maximum, 4 Mo au total. Sans inscription.", contact: "Envoyer votre fiche pour un devis" },
  de: { title: "Ihre Cap-Spezifikation zum Weitergeben", text: "Erfassen Sie Modell, Mengen je Farbe und Größe, Maße, Materialien, Logo und Verpackung in dieser leeren Vorlage. Unbekannte Angaben können zur späteren Abstimmung frei bleiben.", download: "Ausfüllbare Spezifikation herunterladen (englisches PDF)", note: "Speichern Sie das PDF und füllen Sie es auf Englisch in einem PDF-Programm mit Formularunterstützung aus. Speichern und öffnen Sie es erneut, um die Einträge zu prüfen. Alternativ ausdrucken und von Hand ausfüllen. PDF zur Anfrage hinzufügen: bis zu 3 Dateien, insgesamt 4 MB. Keine Registrierung nötig.", contact: "Spezifikation für ein Angebot senden" },
} as const;

export default function CapSpecificationDownload({ locale, showContactLink = true }: { locale: string; showContactLink?: boolean }) {
  const c = copy[locale as keyof typeof copy] ?? copy.en;
  return (
    <section aria-label={c.title} className="my-10 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-teal-200 bg-teal-50 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{c.title}</h2>
        <p className="mt-3 leading-relaxed text-gray-700">{c.text}</p>
        <a href="/downloads/nancrown-cap-specification-pack-en.pdf" download className="mt-5 inline-flex rounded-lg bg-teal-800 px-5 py-3 font-semibold text-white hover:bg-teal-900">{c.download}</a>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">{c.note}</p>
        {showContactLink && <Link href="/contact" className="mt-4 inline-block font-semibold text-teal-800 underline underline-offset-4">{c.contact}</Link>}
      </div>
    </section>
  );
}
