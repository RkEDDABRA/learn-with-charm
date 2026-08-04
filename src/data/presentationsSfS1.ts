import docIntro from "@/assets/presentations/sf-s1-microbio/1.introduction.pdf.asset.json";
import docBacteries from "@/assets/presentations/sf-s1-microbio/2._bactéries.pdf.asset.json";
import docPhysio from "@/assets/presentations/sf-s1-microbio/3._physiologie_et_croissance_bactérienne.pdf.asset.json";
import docPhysio2 from "@/assets/presentations/sf-s1-microbio/3._physiologie_et_croissance_bactérienne-2.pdf.asset.json";
import docModeAction from "@/assets/presentations/sf-s1-microbio/4._mode_d_action_des_bactéries.pdf.asset.json";

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
      asDoc("3 bis. Physiologie et croissance bactérienne (suite)", docPhysio2),
      asDoc("4. Modes d'action des bactéries", docModeAction),
    ],
  },
  { id: "hematologie", numero: 2, titre: "Hématologie", documents: [] },
  { id: "immunologie", numero: 3, titre: "Immunologie", documents: [] },
  { id: "genetique", numero: 4, titre: "Génétique", documents: [] },
];
