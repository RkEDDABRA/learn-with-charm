import { useEffect, useMemo, useState } from "react";
import { ArrowUp, BookOpen, ChevronRight, Lock, Menu, X, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import fig1 from "@/assets/cours-diet-s2/fig1-appareil-digestif.jpg";
import fig2 from "@/assets/cours-diet-s2/fig2-vue-ensemble.jpg";
import fig3 from "@/assets/cours-diet-s2/fig3-mecanismes.jpg";
import fig4 from "@/assets/cours-diet-s2/fig4-histologie.jpg";
import fig5 from "@/assets/cours-diet-s2/fig5-paroi.jpg";
import imgEpithelium from "@/assets/cours-diet-s2/epithelium.jpg";
import imgLamina from "@/assets/cours-diet-s2/lamina-propria.jpg";
import imgMuscle1 from "@/assets/cours-diet-s2/muscle-lisse-1.jpg";
import imgMuscle2 from "@/assets/cours-diet-s2/muscle-lisse-2.jpg";
import imgOesophage from "@/assets/cours-diet-s2/oesophage-couches.jpg";
import imgPlexus from "@/assets/cours-diet-s2/plexus-nerveux.jpg";
import imgInnervation from "@/assets/cours-diet-s2/innervation-autonome.jpg";
import imgSympPara from "@/assets/cours-diet-s2/sympathique-parasympathique.jpg";
import imgControle from "@/assets/cours-diet-s2/controle-tube-digestif.jpg";
import imgInnervationDetail from "@/assets/cours-diet-s2/innervation-detail.jpg";

// Partie 4 & 5 — Physiologie de la digestion
import p2Fig1a from "@/assets/cours-diet-s2/p2-fig1a-cavite-orale.jpg";
import p2Fig1b from "@/assets/cours-diet-s2/p2-fig1b-bouche.jpg";
import p2Fig2 from "@/assets/cours-diet-s2/p2-fig2-langue.jpg";
import p2Fig3 from "@/assets/cours-diet-s2/p2-fig3-glandes-salivaires.jpg";
import p2Fig3b from "@/assets/cours-diet-s2/p2-fig3b-glandes-detail.jpg";
import p2Fig3c from "@/assets/cours-diet-s2/p2-fig3c-glandes-principales.jpg";
import p2Fig5b from "@/assets/cours-diet-s2/p2-fig5b-salivation.jpg";
import p2Fig446 from "@/assets/cours-diet-s2/p2-fig446-controle-salive.jpg";
import p2Fig4 from "@/assets/cours-diet-s2/p2-fig4-deglutition.jpg";
import p2Fig5 from "@/assets/cours-diet-s2/p2-fig5-peristaltisme.jpg";
import p2Fig6 from "@/assets/cours-diet-s2/p2-fig6-oesophage.jpg";
import p2Fig7 from "@/assets/cours-diet-s2/p2-fig7-peristaltisme-oeso.jpg";

const PASSWORD = "DN2026";
const STORAGE_KEY = "diet_s2_unlocked";

/* ---------- Petits composants utilitaires ---------- */

function AnchorLink({ id }: { id: string }) {
  const copy = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
  };
  return (
    <button
      onClick={copy}
      className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded text-muted-foreground/50 opacity-0 transition-opacity hover:text-primary group-hover:opacity-100"
      aria-label="Copier le lien"
      title="Copier le lien"
    >
      <LinkIcon size={12} />
    </button>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="group scroll-mt-28 font-display text-2xl font-bold text-foreground mt-10 mb-4 flex items-center">
      {children}
      <AnchorLink id={id} />
    </h2>
  );
}
function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="group scroll-mt-28 font-display text-xl font-semibold text-foreground mt-8 mb-3 flex items-center">
      {children}
      <AnchorLink id={id} />
    </h3>
  );
}
function H4({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h4 id={id} className="group scroll-mt-28 font-display text-lg font-semibold text-primary mt-6 mb-2 flex items-center">
      {children}
      <AnchorLink id={id} />
    </h4>
  );
}

function Figure({ src, n, legend, alt }: { src: string; n: string; legend: string; alt?: string }) {
  const [zoom, setZoom] = useState(false);
  return (
    <figure className="my-6 rounded-xl border border-border bg-muted/30 p-3">
      <img
        src={src}
        alt={alt ?? legend}
        loading="lazy"
        className="mx-auto max-h-[600px] w-auto cursor-zoom-in rounded-md"
        onClick={() => setZoom(true)}
      />
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{n}.</span> {legend}
      </figcaption>
      {zoom && (
        <div
          onClick={() => setZoom(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
        >
          <img src={src} alt={alt ?? legend} className="max-h-full max-w-full rounded-lg" />
        </div>
      )}
    </figure>
  );
}

function Mark({ children }: { children: React.ReactNode }) {
  return <mark className="rounded bg-amber-100 px-1 text-foreground">{children}</mark>;
}

function Callout({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "note" }) {
  const styles =
    type === "note"
      ? "border-l-4 border-amber-400 bg-amber-50/60 text-foreground"
      : "border-l-4 border-primary bg-primary/5 text-foreground";
  return <div className={cn("my-4 rounded-r-lg p-4 text-sm", styles)}>{children}</div>;
}

/* ---------- Structure du cours ---------- */

type Section = { id: string; title: string };
type Chapter = { id: string; number: number; title: string; sections: Section[] };

const CHAPTERS: Chapter[] = [
  {
    id: "ch1",
    number: 1,
    title: "Aspects anatomiques et physiologiques du système digestif",
    sections: [
      { id: "sec-1-1", title: "Partie 1 — Caractéristiques générales du système digestif" },
      { id: "sec-1-2", title: "Partie 2 — Organisation histologique du tube digestif" },
      { id: "sec-1-3", title: "Partie 3 — Régulations des processus digestifs" },
      { id: "sec-1-4", title: "Partie 4 — Physiologie de la digestion : la cavité buccale" },
      { id: "sec-1-5", title: "Partie 5 — Pharynx (déglutition) et œsophage" },
    ],
  },
  {
    id: "ch2",
    number: 2,
    title: "Aspects anatomiques et physiologiques du système endocrinien",
    sections: [
      { id: "sec-2-1", title: "Généralités sur le système endocrinien" },
      { id: "sec-2-2", title: "Hypothalamus et hypophyse" },
      { id: "sec-2-3", title: "Glandes périphériques" },
    ],
  },
];

/* ---------- Mot de passe ---------- */

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 350));
    if (val === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      onUnlock();
    } else {
      setErr(true);
      setVal("");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-md">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Lock className="text-primary" size={22} />
          </div>
        </div>
        <h2 className="mb-2 text-center text-xl font-semibold text-foreground">Cours protégé</h2>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Entrez le code d'accès pour ouvrir le cours <strong>Diététique / Nutrition — Semestre 2</strong>.
        </p>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="password"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              setErr(false);
            }}
            placeholder="Code d'accès"
            className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            autoFocus
            disabled={loading}
          />
          {err && <p className="text-center text-xs text-destructive">Code incorrect.</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Vérification…" : "Accéder au cours"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- Contenu Chapitre 1 — Partie 1 (intégration fidèle du fichier) ---------- */

function Section1_1() {
  return (
    <section>
      <H2 id="sec-1-1">Partie 1 — I. Caractéristiques générales du système digestif</H2>

      <p className="text-foreground/90 leading-relaxed">
        Le système digestif a comme principale fonction d'assurer la digestion.
      </p>

      <H3 id="sec-1-1-1">1. Définition : Digestion</H3>
      <p className="text-foreground/90 leading-relaxed">
        On peut appeler <u>digestion au sens le plus large</u> l'ensemble des processus qui permettent
        l'ingestion d'aliments, leur simplification et leur dégradation en nutriments, leur absorption et
        leur passage dans le sang (ou la lymphe), ainsi que l'évacuation hors de l'organisme des aliments
        non assimilés (= <u>égestion</u>).
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        La <u>digestion au sens le plus strict</u> désigne seulement{" "}
        <strong>la dégradation des aliments en nutriments</strong>, le processus comportant une dimension
        mécanique et une dimension chimique catalysée par des enzymes.
      </p>

      <H3 id="sec-1-1-2">2. Organes impliqués</H3>
      <p className="text-foreground/90 leading-relaxed">
        Les <strong>organes impliqués dans ces phénomènes</strong> sont regroupés en un{" "}
        <u>appareil digestif</u>, comprenant deux grands types d'organes (<Mark>figures 1-2</Mark>) :
      </p>

      <div className="mt-3 rounded-lg border border-border bg-card p-4">
        <p className="text-foreground/90">
          • Le <u>tube digestif</u> correspondant à{" "}
          <strong>l'ensemble des voies par lesquelles transitent les aliments</strong> :
        </p>
        <ul className="mt-2 ml-6 list-disc space-y-0.5 text-foreground/90">
          <li>bouche,</li>
          <li>œsophage,</li>
          <li>pharynx,</li>
          <li>intestin grêle,</li>
          <li>gros intestin (= côlon),</li>
          <li>anus.</li>
        </ul>
        <p className="mt-3 text-foreground/90">
          Ces organes ont généralement eux-mêmes <strong>une activité sécrétrice d'enzymes digestives</strong>{" "}
          (voire d'hormones) et certains (surtout l'intestin grêle) permettent l'absorption des nutriments.
        </p>
      </div>

      <div className="mt-3 rounded-lg border border-border bg-card p-4">
        <p className="text-foreground/90">
          • Les <u>glandes digestives</u> correspondant à des <strong>glandes exocrines</strong>{" "}
          (quoiqu'elles puissent avoir aussi une activité endocrine) qui produisent des sécrétions riches en
          enzymes digestives assurant la digestion chimique des aliments :
        </p>
        <ul className="mt-2 ml-6 list-disc space-y-0.5 text-foreground/90">
          <li>les glandes salivaires,</li>
          <li>le pancréas,</li>
          <li>et le foie associé à la vésicule biliaire.</li>
        </ul>
      </div>

      <Figure
        src={fig1}
        n="FIGURE 1"
        legend="Vue d'ensemble de l'appareil digestif et de la digestion (incluant les durées indicatives moyennes de transit des aliments)."
      />
      <Figure src={fig2} n="FIGURE 2" legend="Vue d'ensemble de l'appareil digestif." />

      <H3 id="sec-1-1-3">3. Principaux processus</H3>
      <p className="text-foreground/90 leading-relaxed">
        Les principaux processus affectant l'<strong>appareil digestif</strong> sont les suivants (
        <Mark>figure 3</Mark>) :
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          La <u>motilité</u> qui permet à la fois la <strong>digestion mécanique</strong> (= fragmentation
          des aliments) et l'<strong>avancée des aliments</strong> dans le tube digestif (={" "}
          <Mark>péristaltisme</Mark>).
        </li>
        <li>
          La <u>sécrétion exocrine</u> de <Mark>sucs digestifs</Mark> (= sécrétions aqueuses riches en
          enzymes digestives) qui assurent la <Mark>digestion chimique</Mark>.
        </li>
        <li>
          L'<u>absorption</u>, c'est-à-dire ici{" "}
          <strong>la traversée de la paroi du tube digestif</strong> par les nutriments jusqu'au sang.
        </li>
      </ul>

      <Figure
        src={fig3}
        n="FIGURE 3"
        legend="Mécanismes fondamentaux du système digestif. Ces quatre mécanismes sont la digestion de la nourriture en molécules plus petites ; l'absorption des nutriments depuis la lumière du tube vers le liquide extracellulaire ; la motilité, capacité de mouvement permettant le déplacement des produits dans le tube digestif et la sécrétion de substances par les cellules épithéliales dans la lumière du tube ou vers le liquide interstitiel."
      />

      <H3 id="sec-1-1-4">4. Rôle de l'appareil digestif</H3>
      <ul className="ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>l'ingestion et le transit des aliments de la bouche au rectum ;</li>
        <li>le broyage mécanique des aliments (cavité buccale, estomac) ;</li>
        <li>
          la digestion chimique et enzymatique des aliments sous l'influence des sécrétions salivaires,
          gastriques, entérales, biliaires et pancréatiques ;
        </li>
        <li>l'absorption et le métabolisme des nutriments (intestin grêle) ;</li>
        <li>
          la transformation des aliments en selles par des phénomènes de réabsorption et de destruction
          bactérienne (côlon) ;
        </li>
        <li>le stockage et l'élimination des selles (rectum).</li>
      </ul>
    </section>
  );
}

function Section1_2() {
  return (
    <section>
      <H2 id="sec-1-2">Partie 2 — II. Organisation histologique du tube digestif</H2>
      <p className="text-foreground/90 leading-relaxed">
        Le <strong>tube digestif</strong> comprend fondamentalement <strong>quatre couches</strong> (de la
        plus proche de la cavité vers la plus externe) (<Mark>figures 4, 5</Mark>) :
      </p>

      <H3 id="sec-1-2-1">1. La muqueuse</H3>
      <p className="text-foreground/90 leading-relaxed">
        C'est la couche la plus interne qui est au contact de la lumière digestive et donc des aliments et
        où se réalise l'activité de sécrétion (mucus, enzymes digestives et hormones) et éventuellement
        d'absorption. Elle joue un rôle également dans la protection contre les microorganismes. Elle est
        tapissée d'un mucus protecteur de la paroi sous-jacente.
      </p>

      <div className="my-5 overflow-hidden rounded-xl border border-border">
        <div className="bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
          TABLEAU 1 — Les fonctions de la muqueuse
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border-b border-border px-3 py-2 text-left font-semibold w-1/3">Fonctions</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">
                Sécrétion de mucus, d'<Mark>enzymes</Mark> et d'hormones
              </td>
              <td className="border-b border-border px-3 py-3 align-top">
                • Le mucus conserve la surface humide et facilite le déplacement de la nourriture dans le
                tube digestif.
                <br />
                • Les enzymes et les hormones contribuent à la digestion des aliments.
              </td>
            </tr>
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">
                Protection de la paroi interne du tube digestif
              </td>
              <td className="border-b border-border px-3 py-3 align-top">
                • Le mucus protège la muqueuse de la digestion de certains organes par les enzymes
                digestives.
                <br />
                • Les follicules lymphatiques épars assument un rôle dans la défense contre les bactéries et
                les autres agents pathogènes pouvant se retrouver dans le tube digestif.
              </td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top font-medium">Absorption des nutriments et de l'eau</td>
              <td className="px-3 py-3 align-top">
                • Les capillaires nourrissent l'épithélium et diffusent les nutriments dans l'organisme.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-foreground/90">La muqueuse comprend :</p>

      <H4 id="sec-1-2-1-a">a. Un épithélium digestif</H4>
      <p className="text-foreground/90 leading-relaxed">
        C'est un épithélium <strong>unistratifié prismatique</strong> (= cellules allongées){" "}
        <em>[sauf œsophage]</em> au contact de la <strong>lumière du tube</strong>. On y trouve localement
        des <strong>cellules glandulaires exocrines</strong>. Des <strong>cellules endocrines</strong> sont
        également <strong>dispersées</strong>.
      </p>
      <Figure src={imgEpithelium} n="Schéma" legend="Épithélium prismatique unistratifié de la muqueuse digestive." />

      <div className="my-4 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="border-r border-border px-4 py-3 text-center font-semibold">
                Unistratifié prismatique
              </td>
              <td className="px-4 py-3 text-center italic">Pluristratifié pavimenteux</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H4 id="sec-1-2-1-b">b. Du tissu conjonctif lâche</H4>
      <p className="text-foreground/90 leading-relaxed">
        Qu'on peut appeler <em>lamina propria</em> ou <strong>chorion</strong>. On y trouve de{" "}
        <strong>nombreux vaisseaux sanguins plutôt fins</strong> ou encore des{" "}
        <strong>cellules immunitaires</strong> qui peuvent être regroupées en <strong>MALT</strong>{" "}
        (<em>mucosa-associated lymphoid tissues</em>, tissus lymphoïdes associés à la muqueuse), notamment
        dans l'<strong>intestin</strong> (qui est une porte potentielle d'entrée de nombreux pathogènes) où
        elles forment par exemple des <strong>plaques de PEYER</strong>.
      </p>
      <Figure src={imgLamina} n="Schéma" legend="Coupe : épithélium et lamina propria." />

      <Callout>
        <strong>Fonctions du tissu conjonctif :</strong>
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>Enveloppe les organes</li>
          <li>Ses macrophagocytes phagocytent les bactéries</li>
          <li>Joue un rôle important dans la réaction inflammatoire</li>
          <li>Retient le liquide interstitiel</li>
          <li>Constitue un site d'échange entre le plasma sanguin et les cellules et vice versa</li>
        </ul>
      </Callout>

      <H4 id="sec-1-2-1-c">c. La muscularis mucosae</H4>
      <p className="text-foreground/90 leading-relaxed">
        La musculaire muqueuse qui est une <strong>couche fine</strong> d'<strong>orientation variée</strong>{" "}
        et dont <strong>la contraction permettrait les sécrétions depuis les cryptes</strong>.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Figure
          src={imgMuscle1}
          n="Schéma"
          legend="Cellules fusiformes avec un noyau central ; absence de stries ; les cellules sont collées les unes aux autres et forment des feuillets."
        />
        <Figure src={imgMuscle2} n="Schéma" legend="Cellules musculaires lisses organisées en feuillets." />
      </div>

      <Figure
        src={fig4}
        n="FIGURE 4"
        legend="Histologie du tube digestif. Structure fondamentale du tube digestif : le tube digestif se compose de quatre couches principales — la muqueuse, la sous-muqueuse, la musculeuse et la séreuse."
      />

      <H3 id="sec-1-2-2">2. La sous-muqueuse</H3>
      <p className="text-foreground/90 leading-relaxed">
        Couche conjonctive <strong>plus dense</strong> (plus riche en collagène){" "}
        <strong>et riche en vaisseaux sanguins</strong> de diamètre plus important que dans la muqueuse. La
        présence d'un <Mark>plexus</Mark> (= ensemble de nerfs) dit <Mark>sous-muqueux</Mark> est à noter.
      </p>

      <Figure src={fig5} n="FIGURE 5" legend="Organisation simplifiée de la paroi gastro-intestinale." />

      <H3 id="sec-1-2-3">3. La musculeuse</H3>
      <p className="text-foreground/90 leading-relaxed">
        <strong>
          Couche de cellules musculaires lisses à l'origine de la motilité digestive et de la digestion
          mécanique
        </strong>{" "}
        qui comprend fondamentalement <strong>deux niveaux</strong> :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          Une couche de <strong>muscles circulaires</strong> qui permet plutôt la variation du diamètre du
          tube digestif et <strong>favorise la fragmentation des aliments</strong>.
        </li>
        <li>
          Une couche de <strong>muscles longitudinaux</strong> dont la contraction facilite plutôt l'avancée
          des aliments dans le tube digestif (<strong>péristaltisme</strong>).
        </li>
      </ul>

      <Callout type="note">
        <strong>Remarque :</strong>
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>
            En réalité, les <strong>deux types de muscles</strong> lisses coopèrent à ces deux{" "}
            <strong>fonctions</strong> (fragmentation et péristaltisme).
          </li>
          <li>
            Entre les deux couches musculaires, on trouve un <strong>plexus</strong> dit ici{" "}
            <strong>myentérique</strong>.
          </li>
          <li>
            On peut trouver, par exemple dans l'<strong>estomac</strong>, une fine couche de{" "}
            <strong>muscles obliques</strong> au-dessus de la couche circulaire.
          </li>
        </ul>
      </Callout>

      <H3 id="sec-1-2-4">4. La séreuse</H3>
      <p className="text-foreground/90 leading-relaxed">
        <strong>Couche composée d'un mésothélium (épithélium pavimenteux simple).</strong> C'est la couche
        la plus externe du TD, c'est une couche de protection.
      </p>

      <Callout type="note">
        <strong>Remarque :</strong> Dans l'œsophage, on ne trouve pas de séreuse mais une adventice (il n'y
        a pas de mésothélium = il y a juste une couche conjonctive).
      </Callout>

      <Figure src={imgOesophage} n="Schéma" legend="Particularité de l'œsophage : absence de séreuse, présence d'une adventice." />
    </section>
  );
}

function Section1_3() {
  return (
    <section>
      <H2 id="sec-1-3">Partie 3 — III. Les régulations des processus digestifs</H2>
      <p className="text-foreground/90 leading-relaxed">
        Toutes les régulations qui s'opèrent sur le système digestif permettent d'optimiser les conditions
        digestives, c'est-à-dire <strong>d'absorber le maximum des nutriments présents</strong> : il n'y a
        pas (sauf pour quelques oligo-éléments) de régulation de la quantité de nutriments absorbés.
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>
          Les régulations sont exercées essentiellement par le <strong>système nerveux autonome</strong>.
        </li>
        <li>
          Les signaux déclenchant ces régulations sont la{" "}
          <strong>présence d'aliments dans le système digestif</strong>, ainsi que l'
          <strong>analyse chimique de ces aliments</strong>.
        </li>
        <li>
          Les voies utilisées pour conduire les informations sont <strong>d'ordre nerveux et endocrine</strong>.
        </li>
      </ul>

      <H3 id="sec-1-3-1">1. Système nerveux autonome</H3>

      <H4 id="sec-1-3-1-a">a. Système nerveux intrinsèque</H4>
      <p className="text-foreground/90 leading-relaxed">
        Le système nerveux entérique (SNE) est un système autonome capable de régler la majorité de ses
        fonctions sans aucun contrôle nerveux extrinsèque (non soumis au contrôle volontaire).
      </p>
      <p className="mt-2 text-foreground/90">Le SNE contrôle :</p>
      <ul className="ml-6 list-disc space-y-1 text-foreground/90">
        <li>le système digestif</li>
        <li>mais également les activités sécrétrices et motrices</li>
        <li>et il est en interaction avec les autres parties du système nerveux autonome</li>
      </ul>

      <p className="mt-4 text-foreground/90 leading-relaxed">
        Les deux principaux <em>plexus nerveux intrinsèques</em> des parois du tube digestif sont formés de
        500 millions de neurones entériques, soit presque 5 fois plus que la moelle épinière :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          <strong>le plexus myentérique (ou plexus d'Auerback)</strong> : ce plexus est situé entre les
          couches musculaires longitudinale et circulaire. Il est surtout{" "}
          <strong>responsable du contrôle de la motricité digestive</strong>.
        </li>
        <li>
          <strong>le plexus sous-muqueux (ou plexus de Meissner)</strong> : situé entre la couche musculaire
          circulaire et la muqueuse. Il est responsable essentiellement des sécrétions gastro-intestinales
          et du débit sanguin local.
        </li>
      </ul>

      <Figure src={imgPlexus} n="Schéma" legend="Plexus nerveux intrinsèques de la paroi du tube digestif (myentérique et sous-muqueux)." />

      <H4 id="sec-1-3-1-b">b. Système nerveux extrinsèque</H4>
      <p className="text-foreground/90 leading-relaxed">
        Bien que le système nerveux entérique puisse assurer la motilité du tube digestif à lui seul, le
        système digestif est également sous l'influence des systèmes nerveux :
      </p>

      <Callout>
        <strong>Système nerveux parasympathique :</strong> On peut dire que le tonus de base du tube
        digestif et des glandes annexes dépend du système parasympathique. L'innervation parasympathique
        fait intervenir le nerf pneumogastrique (nerf vague ou X) et le parasympathique sacré pour la
        partie terminale du gros intestin, le côlon descendant, le sigmoïde et le rectum (nerfs pelviens).
      </Callout>

      <p className="text-foreground/90 font-semibold">La stimulation parasympathique :</p>
      <ul className="ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>
          augmente le péristaltisme de l'estomac et de l'intestin et relâche le sphincter de l'estomac, ce
          qui accélère la progression du contenu alimentaire du tube digestif ;
        </li>
        <li>
          augmente aussi les sécrétions exocrines des différentes glandes du tube digestif : glandes
          salivaires avec une salive fluide, estomac, intestin et pancréas ;
        </li>
        <li>
          au niveau de la vésicule biliaire, la stimulation parasympathique entraîne la contraction de la
          vésicule et augmente la motricité des voies biliaires.
        </li>
      </ul>

      <Callout>
        <strong>Système nerveux sympathique :</strong> la plupart des fibres sympathiques postganglionnaires
        proviennent des ganglions cœliaques ou mésentériques. Le sympathique a des effets inverses
        (inhibent le SNE, ce qui entraîne une diminution des contractions et du tonus du tube digestif à
        l'exception des sphincters). <u>Seule</u> une <em>forte stimulation sympathique</em> entraîne :
      </Callout>

      <ul className="ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>une diminution du péristaltisme gastro-intestinal,</li>
        <li>et une contraction du sphincter pylorique,</li>
        <li>elle augmente la sécrétion des glandes salivaires, en produisant une salive épaisse, riche en amylase,</li>
        <li>
          elle est dépourvue d'effet sur les sécrétions exocrines de l'estomac et de l'intestin, et elle
          diminue la sécrétion exocrine du pancréas.
        </li>
      </ul>

      <Figure
        src={imgInnervationDetail}
        n="FIGURE"
        legend="Innervation parasympathique (gauche) et sympathique (droite). La partie gauche montre l'innervation parasympathique provenant des sorties cervicales et sacrées. Le côté droit montre l'innervation sympathique qui atteint l'estomac et l'intestin grêle via les fibres postganglionnaires du ganglion cœliaque (GC). Le côlon ascendant et la première partie du côlon transverse reçoivent une innervation sympathique via le ganglion mésentérique supérieur (GMS), tandis que les fibres sympathiques postganglionnaires du ganglion mésentérique inférieur (GMI) innervent la deuxième partie du côlon transverse, le côlon descendant et le rectum. Les fibres préganglionnaires sont indiquées en bleu et les fibres postganglionnaires en vert."
      />

      <Figure src={imgInnervation} n="FIGURE" legend="Innervation autonome de l'intestin." />

      <Figure
        src={imgSympPara}
        n="Schéma comparatif"
        legend="Système nerveux parasympathique vs sympathique : actions sur les organes cibles (pupille, salivation, bronchioles, fréquence cardiaque, activité gastro-intestinale, sécrétions pancréatiques, vésicule biliaire, vessie, organes génitaux)."
      />

      <H3 id="sec-1-3-2">2. La voie hormonale</H3>
      <p className="text-foreground/90 leading-relaxed">
        En plus de son innervation étendue, le tractus gastro-intestinal est régulé par un certain nombre
        d'hormones peptidiques qui agissent par des voies endocriniennes et/ou paracrines.
      </p>
      <p className="mt-2 text-foreground/90 leading-relaxed">
        Les cellules sécrétrices d'hormones ou entéro-endocrines sont disséminées dans la muqueuse. (Les
        cellules entéro-endocrines sont également connues sous l'acronyme APUD pour{" "}
        <em>amine precursor uptake and decarboxylation</em>).
      </p>
      <p className="mt-2 text-foreground/90 leading-relaxed">
        Le tractus gastro-intestinal utilise au moins 20 peptides régulateurs différents. Huit polypeptides
        connus pour leur action en tant qu'hormones (endocrines) circulantes sont énumérés ci-dessous,
        ainsi que la région de l'intestin d'où ils sont sécrétés :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>gastrine (antre de l'estomac) ;</li>
        <li>sécrétine (duodénum) ;</li>
        <li>cholécystokinine (CCK) (duodénum) ;</li>
        <li>polypeptide pancréatique (pancréas) ;</li>
        <li>polypeptide inhibiteur gastrique (GIP) (jéjunum et duodénum) ;</li>
        <li>motiline (jéjunum et duodénum) ;</li>
        <li>
          glucagon-like peptides GLP-1 et GLP-2 (iléon et côlon), anciennement appelés entéroglucagons ;
        </li>
        <li>neurotensine (intestin grêle inférieur).</li>
      </ul>

      <Figure
        src={imgControle}
        n="FIGURE 15-3"
        legend="Schéma simplifié des dispositifs de contrôle du fonctionnement du tube digestif."
      />
    </section>
  );
}

/* ---------- Partie 4 — Physiologie de la digestion : la cavité buccale ---------- */

function Section1_4() {
  return (
    <section>
      <H2 id="sec-1-4">Partie 4 — Physiologie de la digestion : I. Dans la cavité buccale</H2>

      <H3 id="sec-1-4-1">1. Situation de la cavité buccale</H3>
      <p className="text-foreground/90 leading-relaxed">
        La cavité buccale est étendue de l'orifice buccal en avant, à l'oropharynx en arrière. Elle est
        comprise entre les maxillaires et les mandibules : fermée en avant par les lèvres, limitée
        latéralement par les joues, communiquant en arrière avec l'oropharynx par l'isthme du gosier
        (<Mark>Figure 1a</Mark>).
      </p>

      <Figure src={p2Fig1a} n="Figure 1a" legend="La cavité orale et pharynx, section sagittale." />
      <Figure src={p2Fig1b} n="Figure 1b" legend="La bouche." />

      <H3 id="sec-1-4-2">2. Prise alimentaire</H3>
      <p className="text-foreground/90 leading-relaxed">
        La prise alimentaire (= manducation) correspond à l'action d'ingérer des aliments et les
        processus qui s'ensuivent immédiatement dans la bouche (<Mark>Figure 1b</Mark>).
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        La cavité buccale est le lieu de deux processus principaux : la <strong>mastication</strong> et
        l'<strong>insalivation</strong>.
      </p>

      <H3 id="sec-1-4-3">3. Mastication : broyage mécanique par les mâchoires et la dentition</H3>

      <H4 id="sec-1-4-3-a">a. Définition de la mastication</H4>
      <p className="text-foreground/90 leading-relaxed">
        La mastication est le premier acte mécanique de la digestion et correspond à l'ensemble des
        mouvements volontaires de la mâchoire (structures opposables comprenant des os, et des dents),
        de la langue, et des joues qui entraîne la dilacération des aliments.
      </p>

      <H4 id="sec-1-4-3-b">b. Rôle de la mastication</H4>
      <ul className="ml-6 list-disc space-y-1 text-foreground/90">
        <li>Réduction de la taille des aliments</li>
        <li>Faciliter l'insalivation en augmentant la surface de contact des aliments broyés avec les enzymes</li>
        <li>Faciliter la déglutition des aliments</li>
      </ul>

      <H4 id="sec-1-4-3-c">c. Rôle de la langue</H4>
      <p className="text-foreground/90 leading-relaxed">
        <strong>La langue</strong> participe à la digestion en évaluant certaines qualités des
        substances ingérées. Elle joue un rôle crucial, puisqu'elle détermine quels aliments
        poursuivront leur chemin dans le tube digestif.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Une fois la nourriture jugée acceptable, la mastication débute et les mouvements de la langue
        façonnent les aliments en une boule appelée <strong>bol alimentaire</strong>. Pendant la
        déglutition, la langue a également pour fonction de pousser le bol alimentaire vers l'arrière
        de la cavité buccale, dans le pharynx.
      </p>

      <Figure src={p2Fig2} n="Figure 2" legend="La langue." />

      {/* Tableau : Les papilles de la muqueuse de la langue */}
      <div className="my-5 overflow-hidden rounded-xl border border-border">
        <div className="bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
          Tableau — Les papilles de la muqueuse de la langue
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">Types</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">Emplacement</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">Fonctions</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr className="bg-muted/40">
              <td colSpan={3} className="px-3 py-2 font-semibold">Papilles gustatives</td>
            </tr>
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">Caliciformes</td>
              <td className="border-b border-border px-3 py-3 align-top">
                Sur la partie supérieure de la langue, disposées en forme de V inversé
              </td>
              <td rowSpan={3} className="border-b border-border px-3 py-3 align-top">
                Perception des saveurs (amer, acide, sucré et salé). Récemment, on a reconnu la
                perception de la saveur <u>umami</u> (du japonais savoureux).
              </td>
            </tr>
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">Fongiformes</td>
              <td className="border-b border-border px-3 py-3 align-top">Sur toute la surface de la langue</td>
            </tr>
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">Foliées</td>
              <td className="border-b border-border px-3 py-3 align-top">Sur les bords latéraux de la langue</td>
            </tr>
            <tr className="bg-muted/40">
              <td colSpan={3} className="px-3 py-2 font-semibold">Papilles tactiles</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top font-medium">Filiformes</td>
              <td className="px-3 py-3 align-top">Sur toute la surface de la langue</td>
              <td className="px-3 py-3 align-top">
                Perception des textures, de la température et de la douleur
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3 id="sec-1-4-4">4. Insalivation et glandes salivaires</H3>
      <p className="text-foreground/90 leading-relaxed">
        Les glandes salivaires déversent leurs sécrétions dans la cavité buccale par l'intermédiaire de
        canaux.
      </p>

      <Figure src={p2Fig3} n="Figure 3" legend="Les glandes salivaires : une vision simple. Glande salivaire parotide, dents, langue, glande salivaire sous-maxillaire, glande salivaire sublinguale, œsophage." />
      <Figure src={p2Fig3b} n="Figure 3b" legend="Schéma anatomique détaillé : glande parotide (canal parotidien), glande sous-maxillaire (canal de Wharton), glande sublinguale." />
      <Figure src={p2Fig3c} n="Figure 3c" legend="Glandes principales (90 % de la sécrétion) : Parotides (canal de Stenon), Sublinguales (canal de Bartholin), Sous-maxillaires (canal de Wharton). Glandes accessoires (10 % de la sécrétion) : glandes buccales." />

      <H4 id="sec-1-4-4-b">b. Rôles</H4>
      <p className="text-foreground/90 leading-relaxed">Cette insalivation permet :</p>
      <ul className="mt-2 ml-6 list-disc space-y-2 text-foreground/90">
        <li><strong>L'humidification du bol alimentaire</strong> (eau 99,5 %).</li>
        <li>
          Le <strong>début de la digestion chimique</strong> :
          <ul className="mt-1 ml-6 list-[circle] space-y-1">
            <li>
              La salive contient des <strong>amylases</strong> salivaires qui{" "}
              <strong>dégradent l'amidon en maltose</strong> (disaccharide glucose-glucose).
            </li>
            <li>
              <strong>Lipase</strong> : dégradation des graisses, agit en l'absence des sels biliaires
              et à pH 2,2 et 5.
            </li>
            <li><strong>Lysozyme</strong> : dégradation de la paroi des bactéries.</li>
            <li>
              <strong>Le mucus</strong> : rend les aliments visqueux, ce qui facilite la déglutition et
              recouvre la muqueuse buccale.
            </li>
            <li><strong>Autres</strong> : immunoglobuline, mucine, protéines plasmatiques (albumine)…</li>
          </ul>
        </li>
        <li>
          On peut noter la <strong>richesse de la salive</strong> en ions variés, et surtout en{" "}
          <strong>ions bicarbonates HCO₃⁻</strong> qui contribuent à maintenir un{" "}
          <strong>pH buccal neutre</strong> proche de 7-8.
        </li>
      </ul>

      {/* TABLEAU 4 — Les fonctions de la salive */}
      <div className="my-5 overflow-hidden rounded-xl border border-border">
        <div className="bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
          TABLEAU 4 — Les fonctions de la salive
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border-b border-border px-3 py-2 text-left font-semibold w-1/3">Fonctions</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">Perception des saveurs</td>
              <td className="border-b border-border px-3 py-3 align-top">• Prépare les aliments pour la gustation.</td>
            </tr>
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">Digestion</td>
              <td className="border-b border-border px-3 py-3 align-top">
                • Humidifie la bouche pour assurer une bonne mobilité des organes buccaux.<br />
                • Prépare les aliments pour la déglutition.<br />
                • Entame le processus digestif en digérant les sucres complexes (amidon).
              </td>
            </tr>
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">Protection de l'organisme</td>
              <td className="border-b border-border px-3 py-3 align-top">
                • Limite la prolifération des bactéries grâce à ses qualités antiseptiques.<br />
                • Modifie le niveau d'acidité dans la bouche, ce qui protège les dents de la carie.
              </td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top font-medium">Phonation</td>
              <td className="px-3 py-3 align-top">• Humidifie la bouche afin de faciliter la parole.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H4 id="sec-1-4-4-c">c. Contrôle</H4>
      <p className="text-foreground/90 leading-relaxed">Les stimulus les plus efficaces sont :</p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>les solutions acides diluées (jus de citron : 7 – 8 ml/min) ;</li>
        <li>
          le point de départ peut aussi être extra-buccal (phase pré-orale ou d'anticipation) :{" "}
          <strong>vue</strong>, <strong>odeur</strong>. Ces réflexes sont très conditionnables ; c'est le
          réflexe classique de Pavlov. Ces 2 premiers sens envoient des premiers messages au cerveau
          pour préparer la personne à manger (la prise), et notamment préparer sa déglutition efficace.
        </li>
      </ul>

      <Callout type="note">
        <strong>Remarque :</strong> Il n'y a pas de commande hormonale spécifique de la salivation.
      </Callout>

      <Figure src={p2Fig5b} n="Schéma" legend="Schéma de la régulation de la salivation : stimulus (acidité, vue, odeur, sens) → centres (chémorécepteurs et récepteurs à la pression de la paroi de la bouche / langue → bulbe rachidien) → para Σ (et un peu Σ) → glandes salivaires (parotides, sous-maxillaires, sublinguales) → salive (eau 99 %, sels + protéines 1 %, amylase, mucus)." />

      <Figure src={p2Fig446} n="Figure 44.6" legend="Principaux facteurs influençant la sécrétion de salive. La stimulation des nerfs parasympathiques (NPS) entraîne une production abondante de salive liquide, tandis que la stimulation des nerfs sympathiques (SNS) entraîne la production de salive épaisse et visqueuse." />

      <ul className="mt-3 ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>
          Le <strong>parasympathique</strong> est le principal régulateur du volume salivaire ; il
          provoque une <strong>sécrétion salivaire de volume abondant</strong>, fluide et pauvre en
          protéines ; aqueuse par vasodilatation.
        </li>
        <li>
          Le <strong>sympathique</strong> provoque une{" "}
          <strong>sécrétion salivaire de volume réduit</strong>, visqueuse par vasoconstriction.
        </li>
      </ul>
    </section>
  );
}

/* ---------- Partie 5 — Pharynx (déglutition) et œsophage ---------- */

function Section1_5() {
  return (
    <section>
      <H2 id="sec-1-5">Partie 5 — II. Au niveau pharyngien : la déglutition &amp; III. Au niveau de l'œsophage</H2>

      <H3 id="sec-1-5-1">1. Pharynx : définition, fonctions et segments</H3>
      <p className="text-foreground/90 leading-relaxed">
        Le pharynx est un conduit musculo-membraneux allant de la base du crâne jusqu'à l'œsophage.
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>
          Situé au carrefour aéro-digestif : entre voies aériennes (de la cavité nasale au larynx) et
          voies digestives (de la cavité buccale à l'œsophage).
        </li>
        <li>
          Ouverture de la trompe d'Eustache (tube auditif) dans le pharynx : communication avec
          l'oreille moyenne au niveau de la caisse du tympan.
        </li>
      </ul>
      <p className="mt-3 text-foreground/90"><strong>Fonctions :</strong> déglutition, respiration, phonation, audition.</p>
      <p className="mt-2 text-foreground/90">
        <strong>Le pharynx est formé de 3 segments :</strong> Nasopharynx, Oropharynx et Laryngopharynx.
      </p>

      <H3 id="sec-1-5-2">2. Définition</H3>
      <p className="text-foreground/90 leading-relaxed">
        On peut appeler <strong>bol alimentaire</strong> un ensemble d'aliments mâchés et insalivés qui
        est ensuite avalé.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        La <u>déglutition</u> (<Mark>figure 5</Mark>) est le processus qui permet d'avaler le bol
        alimentaire. C'est une action volontaire mais la suite est un réflexe et provoque une apnée.
      </p>

      <H3 id="sec-1-5-3">3. Régions anatomiques impliquées</H3>
      <p className="text-foreground/90 leading-relaxed">
        Les régions anatomiques impliquées dans la déglutition sont la cavité orale, le pharynx, le
        larynx et l'œsophage (<Mark>figure 4</Mark>).
      </p>
      <p className="mt-2 text-foreground/90 leading-relaxed">
        Les structures de la cavité orale sont les lèvres, les dents, le maxillaire, la mandibule, le
        plancher buccal et la langue.
      </p>

      <Figure src={p2Fig4} n="Figure 4" legend="Coupe sagittale des organes impliqués dans la déglutition (bolus d'aliments sur la langue, cavité nasale, langue, épiglotte fermant l'orifice du larynx, naso-pharynx, palais mou, oro-pharynx, laryngo-pharynx, œsophage)." />

      <Figure src={p2Fig5} n="Figure 5" legend="De la bouche à l'estomac : réflexe de déglutition et péristaltisme œsophagien." />

      <H3 id="sec-1-5-4">4. Physiologie de la déglutition</H3>
      <p className="text-foreground/90 leading-relaxed">
        La <strong>déglutition</strong> permet au bol alimentaire de passer de la bouche à l'estomac.
        Elle représente une suite d'actes stéréotypés <strong>sous le contrôle d'un centre bulbaire</strong>{" "}
        (tronc cérébral), qui fonctionne en étroite relation avec le centre de la respiration, afin de
        garantir le passage des aliments vers l'œsophage et celui de l'air vers le larynx et la trachée
        (<Mark>figure 5</Mark>).
      </p>

      <p className="mt-3 text-foreground/90">La déglutition comporte trois étapes :</p>
      <ul className="mt-2 ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          une <strong>étape buccale volontaire</strong>, qui aboutit à déplacer le bol alimentaire
          jusqu'à l'arrière de la cavité orale dans l'oropharynx et met en jeu des mouvements de la
          langue, vers le haut et vers l'arrière contre le palais mou ;
        </li>
        <li>
          une <strong>étape pharyngienne</strong> ou passage involontaire (automatique) du bol
          alimentaire depuis l'oropharynx jusque dans l'œsophage, qui commence lorsque le bol
          alimentaire pénètre dans l'oropharynx. Ceci entraîne de façon réflexe l'élévation du voile du
          palais et de la luette pour fermer le nasopharynx, et l'élévation du larynx avec abaissement
          de l'épiglotte pour fermer la glotte et donc les voies respiratoires. La respiration est alors
          momentanément interrompue et le bol alimentaire traverse le pharynx pour atteindre l'œsophage
          en une ou deux secondes, puis les voies respiratoires s'ouvrent de nouveau et la respiration
          reprend ;
        </li>
        <li>
          une <strong>étape œsophagienne</strong> ou passage involontaire du bol alimentaire le long de
          l'œsophage jusqu'à l'estomac, qui commence après le franchissement du sphincter œsophagien
          supérieur qui a été relâché par l'élévation du pharynx.
        </li>
      </ul>

      {/* Tableau : la déglutition permet le passage du bol alimentaire dans l'œsophage */}
      <div className="my-5 overflow-hidden rounded-xl border border-border">
        <div className="bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
          Schéma — La déglutition permet le passage du bol alimentaire dans l'œsophage
        </div>
        <table className="w-full text-sm">
          <tbody className="text-foreground/90">
            <tr className="bg-muted/40">
              <td className="border border-border px-3 py-2 font-semibold">Fermeture des fosses nasales (remontée du palais mou)</td>
              <td className="border border-border px-3 py-2 font-semibold">Remontée du larynx (mouvement inconscient)</td>
              <td className="border border-border px-3 py-2 font-semibold">Ouverture du sphincter œsophagien supérieur</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 italic">Empêchant</td>
              <td className="border border-border px-3 py-2 italic">permettant</td>
              <td className="border border-border px-3 py-2 italic">Qui entraîne</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2">Remontée des aliments vers les fosses nasales</td>
              <td className="border border-border px-3 py-2">Fermeture de la glotte par l'épiglotte</td>
              <td className="border border-border px-3 py-2">Glissement du bol vers l'œsophage</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 italic">Empêchant</td>
              <td className="border border-border px-3 py-2"></td>
              <td className="border border-border px-3 py-2"></td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2"></td>
              <td className="border border-border px-3 py-2">Nourriture d'aller dans la trachée</td>
              <td className="border border-border px-3 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3 id="sec-1-5-5">5. Activité sphinctérienne</H3>
      <p className="text-foreground/90">4 sphincters sont présents le long du tube digestif :</p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>le sphincter œsophagien supérieur,</li>
        <li>le sphincter œsophagien inférieur à l'entrée de l'estomac,</li>
        <li>le sphincter pylorique à la sortie de l'estomac,</li>
        <li>le sphincter anal.</li>
      </ul>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Les contractions de ces sphincters, commandées par voies réflexes (sauf pour le sphincter anal
        externe qui est constitué de muscle squelettique activé volontairement), ont pour rôle de
        contrôler le passage du contenu d'une partie du tube digestif à une autre partie.
      </p>

      <H3 id="sec-1-5-6">6. Contrôle nerveux de la déglutition</H3>
      <p className="text-foreground/90 leading-relaxed">
        Le centre de la déglutition se situe dans le tronc cérébral.
      </p>

      <div className="my-5 overflow-hidden rounded-xl border border-border">
        <div className="bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
          Nerfs crâniens impliqués
        </div>
        <table className="w-full text-sm">
          <tbody className="text-foreground/90">
            <tr>
              <td className="border border-border px-3 py-2">Nerf maxillaire</td>
              <td className="border border-border px-3 py-2">Nerf ophtalmique (V1)</td>
              <td className="border border-border px-3 py-2">Nerf trijumeau (V)</td>
              <td className="border border-border px-3 py-2">Nerf mandibulaire (V3)</td>
              <td className="border border-border px-3 py-2">Nerf glosso-pharyngien</td>
              <td className="border border-border px-3 py-2">Nerf vague (X)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-foreground/90 leading-relaxed">
        C'est un réseau mal individualisé de neurones, à proximité du centre ventilatoire et du centre
        salivaire. Il est impossible de déglutir et de respirer simultanément. Il possède des
        interactions avec la phonation et la respiration. Tous les organes participant à la déglutition
        sont innervés par les V, VII, IX, X, XI et XII paires de nerfs crâniens. Leurs noyaux sensitifs
        et moteurs sont situés dans la protubérance et le bulbe rachidien.
      </p>

      <H4 id="sec-1-5-6-a">a. Phase orale (préparation et propulsion) — durée variable</H4>
      <p className="text-foreground/90 leading-relaxed">
        L'aliment, une fois en bouche, est mastiqué et insalivé ; de nouveaux messages sont envoyés au
        cerveau : la perception gustative et olfactive, l'information sensitive et sensorielle des
        caractéristiques physiques et chimiques du bol (volume, texture, glissé, goût, température,
        comestibilité…) — se produit donc la préparation du bol et la propulsion. Dès que la décision
        de pousser le bol vers l'isthme du gosier (ouverture par laquelle la cavité buccale communique
        en arrière avec le pharynx) est prise (décision volontaire ou automatico-volontaire), un ordre
        est envoyé au centre déglutition bulbaire de l'imminence de l'arrivée d'un corps étranger dans
        le pharynx. Ces informations alertent la personne qu'il a quelque chose dans la bouche et qu'il
        va falloir l'avaler.
      </p>

      <H4 id="sec-1-5-6-b">b. Phase laryngo-pharyngée — durée 0,5 à 0,7 seconde</H4>
      <p className="text-foreground/90 leading-relaxed">
        Les messages envoyés au cerveau lors des 2 premières phases vont permettre l'activité des
        muscles de la déglutition :
      </p>
      <ul className="ml-6 list-disc space-y-1 text-foreground/90">
        <li>protéger les poumons</li>
        <li>et envoyer les aliments vers l'estomac.</li>
      </ul>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        La <strong>première réponse motrice</strong> consiste alors à fermer les voies aériennes avant
        que le bolus n'arrive sur la base de langue. <strong>Ensuite la déglutition pharyngée
        s'active</strong> et le bolus est poussé vers l'œsophage.
      </p>

      <H4 id="sec-1-5-6-c">c. Phase œsophagienne — durée 0,8 à 3 secondes</H4>
      <p className="text-foreground/90 leading-relaxed">
        Le bol alimentaire progresse par des <strong>mouvements musculaires involontaires de péristaltisme</strong>.
      </p>

      <H3 id="sec-1-5-7">III. Au niveau de l'œsophage — Particularités histologiques</H3>
      <p className="text-foreground/90 leading-relaxed">
        L'œsophage (<Mark>figure 6</Mark>) est un conduit de 25 cm qui amène le bol alimentaire jusqu'à
        l'estomac à grande vitesse. Il est accolé à la trachée dans sa partie antérieure puis traverse
        le diaphragme et débouche dans l'estomac.
      </p>

      <Figure src={p2Fig6} n="Figure 6" legend="Organisation simplifiée de l'œsophage." />

      <ul className="mt-3 ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          <strong>MUQUEUSE</strong> : épithélium pluristratifié pavimenteux comprenant une couche
          cornée se desquamant dans la partie proche de la lumière — rôle protecteur — et une couche
          de cellules germinatives à la base, qui assure le renouvellement constant de l'épithélium.
        </li>
        <li>Lamina propria = chorion.</li>
        <li>Muscularis mucosae (favorise l'évacuation du mucus jusqu'à la lumière).</li>
        <li>
          <strong>SOUS-MUQUEUSE</strong> : on peut y observer des glandes œsophagiennes d'organisation
          acineuse (ou tubulo-acineuse) sécrétant un mucus protecteur. [Le mucus est évacué par des
          canalicules qui traversent la lamina propria et l'épithélium, débouchant ainsi au niveau de
          la lumière]. On trouve également le plexus sous-muqueux.
        </li>
        <li>
          <strong>MUSCULEUSE</strong> : couche très épaisse (muscles circulaires + muscles
          longitudinaux) permettant la puissance et la rapidité du transit œsophagien du bol
          alimentaire. On trouve également le plexus myentérique.
        </li>
        <li>
          <strong>ADVENTICE</strong> : tissu conjonctif. La particularité est l'absence de mésothélium ;
          il n'y a donc pas de vraie séreuse.
        </li>
      </ul>

      <H3 id="sec-1-5-8">Motricité œsophagienne : péristaltisme</H3>
      <p className="text-foreground/90 leading-relaxed">
        On appelle <strong>péristaltisme</strong> l'ensemble des contractions musculaires permettant la
        progression du contenu du tube digestif vers sa partie distale.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Le péristaltisme œsophagien (<Mark>figure 7</Mark>) est assuré par{" "}
        <strong>la contraction des muscles circulaires</strong> (situés immédiatement au-dessus et
        autour du bol) et <strong>le relâchement des muscles longitudinaux</strong> (situés autour de
        la partie inférieure et immédiatement au-dessous du bol).
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Les contractions se répètent et forment des <strong>ondes péristaltiques qui forcent le
        déplacement du bol</strong> vers l'estomac. L'avancée du bol est facilitée par le mucus
        sécrété par les glandes œsophagiennes situées dans la sous-muqueuse.
      </p>

      <Figure src={p2Fig7} n="Figure 7" legend="Péristaltisme œsophagien." />

      <Callout type="note">
        <strong>Remarque :</strong> les ondes péristaltiques sont liées à des{" "}
        <strong>alternances contraction–relâchement réflexe</strong> des différentes musculatures de la
        paroi.
      </Callout>

      <Callout type="note">
        <strong>Remarque :</strong> Au repos, l'œsophage n'a pas d'activité motrice.
      </Callout>

      {/* TABLEAU 7 — Les transformations digestives dans le pharynx et l'œsophage */}
      <div className="my-5 overflow-hidden rounded-xl border border-border">
        <div className="bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
          TABLEAU 7 — Les transformations digestives dans le pharynx et l'œsophage
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border border-border px-3 py-2 text-left font-semibold" colSpan={3}>
                Transformations mécaniques*
              </th>
              <th className="border border-border px-3 py-2 text-left font-semibold">Résultat</th>
            </tr>
            <tr>
              <th className="border border-border px-3 py-2 text-left">Structure</th>
              <th className="border border-border px-3 py-2 text-left">Mouvement</th>
              <th className="border border-border px-3 py-2 text-left">Fonction</th>
              <th className="border border-border px-3 py-2 text-left" rowSpan={2}>
                Progression du bol alimentaire vers l'estomac
              </th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="border border-border px-3 py-2">• Œsophage</td>
              <td className="border border-border px-3 py-2">Péristaltisme</td>
              <td className="border border-border px-3 py-2">Propulse le bol alimentaire dans l'œsophage.</td>
            </tr>
          </tbody>
          <thead className="bg-muted">
            <tr>
              <th className="border border-border px-3 py-2 text-left font-semibold" colSpan={3}>
                Réaction tissulaire**
              </th>
              <th className="border border-border px-3 py-2 text-left font-semibold">Résultat</th>
            </tr>
            <tr>
              <th className="border border-border px-3 py-2 text-left">Structures</th>
              <th className="border border-border px-3 py-2 text-left">Sécrétion</th>
              <th className="border border-border px-3 py-2 text-left">Fonction</th>
              <th className="border border-border px-3 py-2 text-left">Glissement du bol alimentaire facilité</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="border border-border px-3 py-2">• Pharynx<br />• Œsophage</td>
              <td className="border border-border px-3 py-2">Mucus</td>
              <td className="border border-border px-3 py-2">Humidifie la paroi du pharynx et de l'œsophage.</td>
              <td className="border border-border px-3 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground italic mt-2">
        * Dans cette étape du processus digestif, il n'y a pas de transformation mécanique, mais un
        simple mouvement propulsif permettant le déplacement du bol alimentaire.
        <br />
        ** Dans cette étape du processus digestif, il n'y a pas de véritable transformation chimique,
        mais la production d'une sécrétion qui favorise la suite du processus.
      </p>
    </section>
  );
}

function Placeholder({ id, title }: { id: string; title: string }) {
  return (
    <section>
      <H2 id={id}>{title}</H2>
      <Callout>
        <p className="text-foreground/80">
          Cette partie est en cours de préparation. Le contenu détaillé sera ajouté prochainement.
        </p>
      </Callout>
    </section>
  );
}

/* ---------- Composant principal ---------- */

export default function CoursDietetiqueS2() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [activeChapter, setActiveChapter] = useState<string>("ch1");
  const [activeSection, setActiveSection] = useState<string>("sec-1-1");
  const [showTop, setShowTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  // Scroll spy
  useEffect(() => {
    if (!unlocked) return;
    const allIds = CHAPTERS.flatMap((c) => c.sections.map((s) => s.id));
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
      const y = window.scrollY + 140;
      let current = allIds[0];
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveSection(current);
      const ch = CHAPTERS.find((c) => c.sections.some((s) => s.id === current));
      if (ch) setActiveChapter(ch.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [unlocked]);

  const progress = useMemo(() => {
    const ch = CHAPTERS.find((c) => c.id === activeChapter)!;
    const idx = ch.sections.findIndex((s) => s.id === activeSection);
    return { chapter: ch.number, totalCh: CHAPTERS.length, sec: idx + 1, totalSec: ch.sections.length };
  }, [activeChapter, activeSection]);

  if (unlocked === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <header className="bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3">
            <BookOpen size={14} /> Licence · Diététique / Nutrition · Semestre 2
          </span>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
            Diététique / Nutrition — Semestre 2
          </h1>
          <p className="mt-2 text-white/85 max-w-3xl text-sm sm:text-base">
            Aspects anatomiques et physiologiques du système digestif et du système endocrinien.
          </p>
        </div>
      </header>

      {/* Sticky progress + nav bar */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-muted-foreground truncate">
            <strong className="text-foreground">
              Chapitre {progress.chapter}/{progress.totalCh}
            </strong>{" "}
            — Section {progress.sec}/{progress.totalSec}
          </div>
          <button
            onClick={() => setTocOpen((v) => !v)}
            className="lg:hidden inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold"
          >
            {tocOpen ? <X size={14} /> : <Menu size={14} />}
            Sommaire
          </button>
        </div>
      </div>

      {/* Mobile drawer TOC */}
      {tocOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setTocOpen(false)}>
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-xl border-l border-border overflow-y-auto p-5"
          >
            <h3 className="font-display font-bold text-lg mb-4">Table des matières</h3>
            <TocList active={activeSection} onClick={scrollTo} />
          </aside>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar TOC desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Table des matières
            </h3>
            <TocList active={activeSection} onClick={scrollTo} />
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0">
          {CHAPTERS.map((ch) => (
            <article
              key={ch.id}
              id={ch.id}
              className={cn(
                "scroll-mt-24 mb-12 rounded-2xl border-l-4 bg-card p-5 sm:p-7 shadow-sm",
                ch.id === "ch1" ? "border-teal-500" : "border-cyan-600",
              )}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-white font-bold",
                    ch.id === "ch1" ? "bg-teal-600" : "bg-cyan-700",
                  )}
                >
                  {ch.number}
                </span>
                <h2 id={`title-${ch.id}`} className="font-display text-xl sm:text-2xl font-bold">
                  Chapitre {ch.number} — {ch.title}
                </h2>
              </div>

              {ch.id === "ch1" ? (
                <>
                  <Section1_1 />
                  <Section1_2 />
                  <Section1_3 />
                  <Section1_4 />
                  <Section1_5 />
                </>
              ) : (
                <>
                  <Placeholder id="sec-2-1" title="I. Généralités sur le système endocrinien" />
                  <Placeholder id="sec-2-2" title="II. Hypothalamus et hypophyse" />
                  <Placeholder id="sec-2-3" title="III. Glandes périphériques" />
                </>
              )}
            </article>
          ))}
        </main>
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90"
          aria-label="Retour en haut"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}

function TocList({ active, onClick }: { active: string; onClick: (id: string) => void }) {
  return (
    <nav className="space-y-4 text-sm">
      {CHAPTERS.map((ch) => (
        <div key={ch.id}>
          <button
            onClick={() => onClick(ch.sections[0].id)}
            className="w-full text-left font-display font-semibold text-foreground hover:text-primary"
          >
            Ch. {ch.number}. {ch.title}
          </button>
          <ul className="mt-1.5 ml-2 space-y-0.5 border-l border-border pl-3">
            {ch.sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => onClick(s.id)}
                  className={cn(
                    "flex w-full items-start gap-1.5 rounded px-2 py-1 text-left text-xs leading-snug transition-colors",
                    active === s.id
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <ChevronRight size={12} className="mt-0.5 shrink-0" />
                  <span>{s.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
