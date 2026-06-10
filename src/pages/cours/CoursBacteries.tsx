import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEC_BACT_FULL } from "./CoursSageFemmeS1";

export default function CoursBacteries() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/licence/sage-femme"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Retour à Licence Sage-Femme
        </Link>

        <header className="mb-8 border-b border-border pb-6">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
            Licence Sage-Femme · Semestre 1 · Microbiologie
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            1.1 Bactéries
          </h1>
          <p className="mt-2 text-muted-foreground">
            Introduction, classification, structure, croissance et bactérioses.
          </p>
        </header>

        <article className="prose-content">{SEC_BACT_FULL.render()}</article>
      </div>
    </div>
  );
}
