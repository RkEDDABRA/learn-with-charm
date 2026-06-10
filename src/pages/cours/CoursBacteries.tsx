import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SEC_BACT_FULL } from "./CoursSageFemmeS1";

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type TocEntry = { label: string; level: 1 | 2 };
const TOC_ENTRIES: TocEntry[] = [
  { label: "1.1 Introduction aux microorganismes & Bactéries", level: 1 },
  { label: "1.1.1 Définition de la microbiologie", level: 2 },
  { label: "1.1.2 Comparaison cellule eucaryote / cellule procaryote", level: 2 },
  { label: "1.1.3 Classification des bactéries", level: 2 },
  { label: "1.2 Structure de la bactérie", level: 1 },
  { label: "1.2.1 Définition", level: 2 },
  { label: "1.2.2 Méthodes d'étude", level: 2 },
  { label: "1.2.3 Structure générale d'une bactérie", level: 2 },
  { label: "1.2.4 Structures obligatoires", level: 2 },
  { label: "1.2.5 Éléments facultatifs", level: 2 },
  { label: "1.2.6 La spore bactérienne (endospore)", level: 2 },
  { label: "1.3 Physiologie et croissance bactérienne", level: 1 },
  { label: "1.3.1 Introduction", level: 2 },
  { label: "1.3.2 Métabolisme bactérien", level: 2 },
  { label: "1.3.3 Besoins nutritifs", level: 2 },
  { label: "1.3.4 Conditions physico-chimiques de la croissance", level: 2 },
  { label: "1.3.5 Croissance bactérienne", level: 2 },
  { label: "1.3.6 Principales bactérioses humaines", level: 2 },
];

function TocList({ onClick }: { onClick?: () => void }) {
  return (
    <nav aria-label="Table des matières">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
        Table des matières
      </p>
      <ol className="space-y-1 text-sm">
        {TOC_ENTRIES.map((t) => {
          const id = slug(t.label);
          return (
            <li key={id} className={t.level === 2 ? "pl-3" : ""}>
              <a
                href={`#${id}`}
                onClick={onClick}
                className={cn(
                  "block py-1 px-2 rounded hover:bg-primary/10 hover:text-primary transition-colors",
                  t.level === 1 ? "font-semibold text-foreground/90" : "text-foreground/70",
                )}
              >
                {t.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function CoursBacteries() {
  const [mobileToc, setMobileToc] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background">
      <header className="border-b border-border bg-gradient-to-br from-primary/5 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <Link
            to="/licence/sage-femme"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Retour à Licence Sage-Femme
          </Link>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Licence · Option Sage-Femme · Semestre 1 · Microbiologie
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
            1.1 Bactéries
          </h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Introduction, classification, structure, croissance et principales bactérioses humaines.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 border border-border rounded-lg bg-card p-4 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <TocList />
          </div>
        </aside>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileToc((v) => !v)}
            className="w-full flex items-center justify-between border border-border bg-card rounded-lg px-4 py-3 text-sm font-semibold"
          >
            <span className="flex items-center gap-2">
              <Menu size={16} /> Table des matières
            </span>
            <span className="text-xs text-muted-foreground">{mobileToc ? "Masquer" : "Afficher"}</span>
          </button>
          {mobileToc && (
            <div className="mt-2 border border-border bg-card rounded-lg p-4">
              <TocList onClick={() => setMobileToc(false)} />
            </div>
          )}
        </div>

        <article className="min-w-0 prose-content">{SEC_BACT_FULL.render()}</article>
      </div>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
          aria-label="Retour en haut"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
