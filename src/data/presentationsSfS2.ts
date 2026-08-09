import type { PresentationChapter, PresentationDoc } from "@/data/presentationsSfS1";

import doc1 from "@/assets/presentations/sf-s2/1-differenciation-du-sexe.pdf.asset.json";
import doc2 from "@/assets/presentations/sf-s2/2-la-puberte.pdf.asset.json";
import doc3 from "@/assets/presentations/sf-s2/3-systeme-reproducteur-masculin.pdf.asset.json";
import doc4 from "@/assets/presentations/sf-s2/4-spermatogenese.pdf.asset.json";
import doc5 from "@/assets/presentations/sf-s2/5-regulation-hormonale.pdf.asset.json";
import doc6 from "@/assets/presentations/sf-s2/6-anatomie-de-l-appareil-genitale-feminin.pdf.asset.json";
import doc7 from "@/assets/presentations/sf-s2/7-glandes-mammaires.pdf.asset.json";
import doc8 from "@/assets/presentations/sf-s2/8-ovogenese.pdf.asset.json";
import doc9 from "@/assets/presentations/sf-s2/9-cycles-sexuels.pdf.asset.json";
import doc10 from "@/assets/presentations/sf-s2/10-regulation-hormonale-chez-la-femme.pdf.asset.json";
import doc11 from "@/assets/presentations/sf-s2/11-la-menopause.pdf.asset.json";

const asDoc = (
  titre: string,
  a: { url: string; original_filename: string; content_type: string; size: number },
): PresentationDoc => ({
  titre,
  fichier: encodeURI(a.url),
  filename: a.original_filename,
  type: a.content_type,
  size: a.size,
});

/** Présentations du cours Anatomie Gynéco-Obstétricale (Sage-Femme — Semestre 2), par chapitre. */
export const PRESENTATIONS_SF_S2: PresentationChapter[] = [
  {
    id: "differenciation-sexe",
    numero: 1,
    titre: "Différenciation du sexe chez l'embryon",
    documents: [
      asDoc("1. Différenciation du sexe", doc1),
      asDoc("2. La puberté", doc2),
    ],
  },
  {
    id: "appareil-genital-masculin",
    numero: 2,
    titre: "Appareil génital masculin",
    documents: [
      asDoc("3. Système reproducteur masculin", doc3),
      asDoc("4. Spermatogenèse", doc4),
      asDoc("5. Régulation hormonale", doc5),
    ],
  },
  {
    id: "appareil-genital-feminin",
    numero: 3,
    titre: "Appareil génital féminin",
    documents: [
      asDoc("6. Anatomie de l'appareil génital féminin", doc6),
      asDoc("7. Glandes mammaires", doc7),
      asDoc("8. Ovogenèse", doc8),
      asDoc("9. Cycles sexuels", doc9),
      asDoc("10. Régulation hormonale chez la femme", doc10),
      asDoc("11. Ménopause", doc11),
    ],
  },
];
