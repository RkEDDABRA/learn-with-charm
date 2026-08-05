import docIntro from "@/assets/presentations/sf-s1-microbio/1.introduction.pdf.asset.json";
import docBacteries from "@/assets/presentations/sf-s1-microbio/2._bactéries.pdf.asset.json";
import docPhysio from "@/assets/presentations/sf-s1-microbio/3._physiologie_et_croissance_bactérienne.pdf.asset.json";
import docModeAction from "@/assets/presentations/sf-s1-microbio/4._mode_d_action_des_bactéries.pdf.asset.json";
import docVirus from "@/assets/presentations/sf-s1-microbio/5._virus.pdf.asset.json";
import docParasito from "@/assets/presentations/sf-s1-microbio/6._parasitologie.pdf.asset.json";
import docMycetes from "@/assets/presentations/sf-s1-microbio/7._les_mycètes.pdf.asset.json";
import docAntimicrobiens from "@/assets/presentations/sf-s1-microbio/8._agents_antimicrobiens.pdf.asset.json";
import docHemato from "@/assets/presentations/sf-s1-microbio/9._hématologie.pdf.asset.json";
import docImmuniteAcquise from "@/assets/presentations/sf-s1-microbio/11._Immunité_acquise.pdf.asset.json";
import docDivisionCellulaire from "@/assets/presentations/sf-s1-microbio/12._division_cellulaire_mitose_méiose.pdf.asset.json";
import docGenetique from "@/assets/presentations/sf-s1-microbio/13._génétique.pdf.asset.json";

export interface PresentationDoc {
  titre: string;
  fichier: string;
  filename: string;
  type: string;
  size: number;
}

export interface PresentationChapter {
  id: string;
  numero: number;
  titre: string;
  documents: PresentationDoc[];
}

const asDoc = (
  titre: string,
  a: { url: string; original_filename: string; content_type: string; size: number },
): PresentationDoc => ({
  titre,
  fichier: a.url,
  filename: a.original_filename,
  type: a.content_type,
  size: a.size,
});

/** Présentations du cours Sciences Biologiques (Sage-Femme — Semestre 1), par chapitre. */
export const PRESENTATIONS_SF_S1: PresentationChapter[] = [
  {
    id: "microbiologie",
    numero: 1,
    titre: "Microbiologie",
    documents: [
      asDoc("1. Introduction à la microbiologie", docIntro),
      asDoc("2. Les bactéries", docBacteries),
      asDoc("3. Physiologie et croissance bactérienne", docPhysio),
      asDoc("4. Modes d'action des bactéries", docModeAction),
      asDoc("5. Les virus", docVirus),
      asDoc("6. Parasitologie", docParasito),
      asDoc("7. Les mycètes", docMycetes),
      asDoc("8. Les agents antimicrobiens", docAntimicrobiens),
    ],
  },
  {
    id: "hematologie",
    numero: 2,
    titre: "Hématologie",
    documents: [asDoc("9. Hématologie", docHemato)],
  },
  {
    id: "immunologie",
    numero: 3,
    titre: "Immunologie",
    documents: [
      asDoc("11. Immunité acquise", docImmuniteAcquise),
      asDoc("12. Division cellulaire : mitose et méiose", docDivisionCellulaire),
    ],
  },
  {
    id: "genetique",
    numero: 4,
    titre: "Génétique",
    documents: [asDoc("13. Génétique", docGenetique)],
  },
];
