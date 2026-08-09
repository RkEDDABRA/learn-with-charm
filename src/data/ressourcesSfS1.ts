import type { PresentationChapter, PresentationDoc } from "@/data/presentationsSfS1";

import bacterio from "@/assets/ressources/sf-s1/bacteriologie.pdf.asset.json";
import cellBact from "@/assets/ressources/sf-s1/composition-cellule-bacterienne.pdf.asset.json";
import virologie from "@/assets/ressources/sf-s1/essentiel-virologie.pdf.asset.json";
import immunoGen from "@/assets/ressources/sf-s1/immunologie-generale.pdf.asset.json";
import lymphatique from "@/assets/ressources/sf-s1/systeme-lymphatique-immunite-tortora-2016.pdf.asset.json";
import sangTortora from "@/assets/ressources/sf-s1/le-sang-tortora.pdf.asset.json";
import sangRossWilson from "@/assets/ressources/sf-s1/le-sang-ross-wilson-elsevier.pdf.asset.json";

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

/** Ressources bibliographiques du module Sciences Biologiques (Sage-Femme — Semestre 1), par chapitre. */
export const RESSOURCES_SF_S1: PresentationChapter[] = [
  {
    id: "microbiologie",
    numero: 1,
    titre: "Microbiologie",
    documents: [
      asDoc("Composition et organisation de la cellule bactérienne", cellBact),
      asDoc("L'essentiel de la virologie", virologie),
      asDoc("Bactériologie", bacterio),
    ],
  },
  {
    id: "hematologie",
    numero: 2,
    titre: "Hématologie",
    documents: [
      asDoc("Le sang — Tortora", sangTortora),
      asDoc(
        "Le sang — Ross & Wilson, Anatomie et physiologie normale et pathologique (Elsevier)",
        sangRossWilson,
      ),
    ],
  },
  {
    id: "immunologie",
    numero: 3,
    titre: "Immunologie",
    documents: [
      asDoc("Immunologie générale", immunoGen),
      asDoc(
        "Système lymphatique et immunité — Tortora 2016, Éléments d'anatomie et de physiologie",
        lymphatique,
      ),
    ],
  },
  {
    id: "genetique",
    numero: 4,
    titre: "Génétique",
    documents: [],
  },
];
