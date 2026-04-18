import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import ImportedModuleCard from "@/components/ModuleCard";
import qrSciencesBio from "@/assets/qr-sciences-biologiques.png";
import { cn } from "@/lib/utils";
import { ArrowLeft, BookOpen } from "lucide-react";
import LordIcon, { LORD_ICONS } from "@/components/LordIcon";
import CoursAnatomieGynecoObstetricale from "@/pages/cours/CoursAnatomieGynecoObstetricale";

type Option = "" | "sf" | "diet";

const sfS1 = {
  label: "Module : Sciences Biologiques",
  desc: "Le cours est destiné aux étudiants du premier semestre et vise à leur faire acquérir les concepts fondamentaux en sciences biologiques, notamment en immunologie, hématologie, microbiologie (parasitologie, bactériologie, virologie) ainsi qu'en génétique.",
  tags: ["Immunologie", "Hématologie", "Microbiologie", "Génétique"],
  link: "https://padlet.com/eddabra/module-sciences-biologiques-um3rj7zq3q4vmz4i",
  badge: "Supports de cours • Bibliographie • Exercices corrigés • Vidéos",
  qrImage: qrSciencesBio,
};

const sfS2 = {
  label: "Élément du Module : Anatomie Gynéco-Obstétricale",
  desc: "Au terme de ce module l'étudiante doit:\n• Identifier les structures anatomiques du système reproducteur féminin et masculin\n• Décrire la fonction des organes reproducteurs et leurs caractéristiques physiologiques\n• Distinguer les mécanismes d'homéostasie en lien avec le système reproducteur",
  tags: ["Pelvis féminin", "Organes génitaux", "Obstétrique"],
  link: "https://padlet.com/eddabra/module-anatomie-gyn-co-obst-ricale-xa7cxtqdtvwaq9pu",
  badge: "Supports de cours • Bibliographie • Exercices corrigés • Vidéos",
};

const dietS1 = {
  label: "Module : Anatomie Physiologie Humaine",
  desc: "Bases anatomiques et physiologiques du corps humain. Systèmes digestif, cardiovasculaire et endocrinien.",
  tags: ["Anatomie", "Physiologie", "Systèmes"],
  link: "https://padlet.com/eddabra/module-anatomie-physiologie-humaines-qdmuic43ce4la7vp",
  badge: "Supports de cours • Bibliographie • Exercices corrigés • Vidéos",
};

const dietS2 = {
  label: "Module : Bases Physiologiques de la Nutrition",
  desc: "Au terme de ce module l'étudiant doit:\n• Décrire et expliquer les aspects anatomiques et physiologiques des systèmes endocrinien et digestif",
  tags: ["Métabolisme", "Homéostasie", "Régulation"],
  link: "https://padlet.com/eddabra/module-bases-physiologiques-de-la-nutrition-syst-me-digestif-5jopi0qzi34wa8wf",
  badge: "Supports de cours • Bibliographie • Exercices corrigés • Vidéos",
};

interface ModuleData {
  label: string;
  desc: string;
  tags: string[];
  link: string;
  badge: string;
  qrImage?: string;
}

function SemesterModuleCard({ module, semester, color }: { module: ModuleData; semester: string; color: string }) {
  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden">
      <div className={`px-5 py-3 flex items-center gap-3 ${color}`}>
        <span className="w-9 h-9 rounded-lg bg-card/20 flex items-center justify-center font-bold text-sm text-card">{semester}</span>
        <h3 className="font-display font-bold text-sm text-card"><i className="fa-solid fa-book-bookmark mr-1" aria-hidden="true" />Semestre {semester.replace("S", "")}</h3>
      </div>
      <div className="p-5">
        <ImportedModuleCard
          title={module.label}
          link={module.link}
          description={module.desc}
          badge={module.badge}
          qrImage={module.qrImage}
        />
      </div>
    </div>
  );
}

export default function LicencePage() {
  const [option, setOption] = useState<Option>("");
  const [sfTab, setSfTab] = useState<"s1" | "s2">("s1");
  const [dietTab, setDietTab] = useState<"s1" | "s2">("s1");
  const [showAnatomieCours, setShowAnatomieCours] = useState(false);

  // Si l'utilisateur a ouvert le cours d'Anatomie Gynéco-Obstétricale,
  // on affiche uniquement le composant cours (avec un bouton retour).
  if (showAnatomieCours) {
    return (
      <div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <button
            onClick={() => setShowAnatomieCours(false)}
            className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} /> Retour aux modules
          </button>
        </div>
        <CoursAnatomieGynecoObstetricale />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <AnimatedSection>
        <div className="relative rounded-2xl overflow-hidden min-h-[200px] flex items-center mb-8 bg-gradient-to-br from-emerald-900 to-cyan-800">
          <img
            src="https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1200&q=80"
            alt="Licence en Sciences de la Santé"
            width={1200} height={400}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 p-8 sm:p-12">
            <span className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3">
              <LordIcon src={LORD_ICONS.book} size={20} colors="primary:#22C55E,secondary:#22C55E" trigger="loop" /> Filière Licence
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-card mb-2">Licence en Sciences de la Santé</h1>
            <p className="text-card/60 text-sm"><i className="fa-solid fa-hand-pointer mr-1" aria-hidden="true" />Sélectionnez votre option pour accéder aux ressources pédagogiques</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Option selector */}
      {option === "" && (
        <AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6">
            <button
              onClick={() => setOption("sf")}
              className="relative rounded-2xl overflow-hidden min-h-[200px] flex items-end group shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <img src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80" alt="Option Sage Femme" width={800} height={400} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-rose/90 via-rose/40 to-transparent" />
              <div className="relative z-10 p-6 text-left">
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-card/20 border border-card/30 text-card mb-2">Option</span>
                <h3 className="font-display text-xl font-bold text-card flex items-center gap-2">
                  <LordIcon src={LORD_ICONS.heart} size={28} colors="primary:#ffffff,secondary:#ffffff" /> Sage-Femme
                </h3>
                <p className="text-card/70 text-sm mt-1">Obstétrique · Gynécologie · Sciences Biologiques</p>
              </div>
            </button>
            <button
              onClick={() => setOption("diet")}
              className="relative rounded-2xl overflow-hidden min-h-[200px] flex items-end group shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80" alt="Option Diététique et Nutrition" width={800} height={400} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal/90 via-teal/40 to-transparent" />
              <div className="relative z-10 p-6 text-left">
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-card/20 border border-card/30 text-card mb-2">Option</span>
                <h3 className="font-display text-xl font-bold text-card flex items-center gap-2">
                  <LordIcon src={LORD_ICONS.trendUp} size={28} colors="primary:#ffffff,secondary:#ffffff" /> Diététique / Nutrition
                </h3>
                <p className="text-card/70 text-sm mt-1">Physiologie · Nutrition · Sciences Biologiques</p>
              </div>
            </button>
          </div>
        </AnimatedSection>
      )}

      {/* Sage-Femme */}
      {option === "sf" && (
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setOption("")} className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={14} /> Retour
            </button>
            <h2 className="font-display text-lg font-bold text-rose flex items-center gap-2">
              <LordIcon src={LORD_ICONS.heart} size={24} colors="primary:#E23670,secondary:#E23670" /> Option : Sage-Femme
            </h2>
          </div>
          <div className="flex gap-2 mb-6">
            {(["s1", "s2"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSfTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5",
                  sfTab === tab ? "bg-rose text-rose-foreground shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <i className={tab === "s1" ? "fa-solid fa-book" : "fa-solid fa-book-open"} aria-hidden="true" /> Semestre {tab === "s1" ? "1" : "2"}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
            <SemesterModuleCard module={sfTab === "s1" ? sfS1 : sfS2} semester={sfTab.toUpperCase()} color="bg-rose" />
          </div>
          {sfTab === "s2" && (
            <div className="mt-6">
              <button
                onClick={() => setShowAnatomieCours(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose text-rose-foreground hover:opacity-90 transition-opacity px-5 py-3 rounded-xl text-sm font-semibold shadow-md"
              >
                <BookOpen size={18} /> Ouvrir le cours complet — Anatomie Gynéco-Obstétricale
              </button>
              <p className="mt-2 text-xs text-muted-foreground">Cours protégé par mot de passe.</p>
            </div>
          )}
        </AnimatedSection>
      )}

      {/* Diététique */}
      {option === "diet" && (
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setOption("")} className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={14} /> Retour
            </button>
            <h2 className="font-display text-lg font-bold text-teal flex items-center gap-2">
              <LordIcon src={LORD_ICONS.trendUp} size={24} colors="primary:#158FAD,secondary:#158FAD" /> Option : Diététique / Nutrition
            </h2>
          </div>
          <div className="flex gap-2 mb-6">
            {(["s1", "s2"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setDietTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5",
                  dietTab === tab ? "bg-teal text-teal-foreground shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <i className={tab === "s1" ? "fa-solid fa-book" : "fa-solid fa-book-open"} aria-hidden="true" /> Semestre {tab === "s1" ? "1" : "2"}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
            <SemesterModuleCard module={dietTab === "s1" ? dietS1 : dietS2} semester={dietTab.toUpperCase()} color="bg-teal" />
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
