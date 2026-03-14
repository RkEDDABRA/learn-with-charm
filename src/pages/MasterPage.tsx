import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { ExternalLink } from "lucide-react";
import qrActivites from "@/assets/qr-activites-master.png";

const tabs = [
  { id: "cours", label: "📚 Cours", color: "gold" },
  { id: "activites", label: "🎯 Activités réalisées", color: "purple" },
  { id: "planning", label: "📅 Planning", color: "blue" },
  { id: "stages", label: "🏥 Stages", color: "yellow" },
  { id: "guides", label: "📘 Guides", color: "pink" },
  { id: "eval", label: "📋 Évaluation", color: "teal" },
  { id: "pfe", label: "🎓 PFE", color: "grey" },
];

const cours = [
  { icon: "💊", title: "Pharmacologie d'urgence", desc: "Pharmacologie des médicaments utilisés en situation d'urgence.", tag: "Pharmacologie", color: "border-t-gold", link: "https://padlet.com/eddabra/breakout-room/jzJX4E5jpVm34bnO-RdZYv7LoE55JbrPl" },
  { icon: "📊", title: "Méthodologie de recherche", desc: "Bases de la recherche scientifique appliquée aux soins d'urgence.", tag: "Recherche", color: "border-t-primary", link: "https://padlet.com/eddabra/breakout-room/jzJX4E5jpVm34bnO-RdZYv7LoE55JbrPl" },
  { icon: "👶", title: "Urgences pédiatriques et stratégies de prise en charge", desc: "Prise en charge des urgences pédiatriques et stratégies thérapeutiques adaptées.", tag: "Pédiatrie", color: "border-t-rose", link: "https://padlet.com/eddabra/breakout-room/nRxeqrly7kaw456P-RdZYv7LoE55JbrPl" },
];

const planning = [
  { day: "Lundi", am: "Physiopathologie", pm: "TD / Travaux dirigés" },
  { day: "Mardi", am: "Pharmacologie d'urgence", pm: "TP Simulation" },
  { day: "Mercredi", am: "Réanimation cardio-pulmonaire", pm: "Stage clinique" },
  { day: "Jeudi", am: "Triage et évaluation", pm: "Biologie des urgences" },
  { day: "Vendredi", am: "Méthodologie de recherche", pm: "Encadrement PFE" },
];

const stages = [
  { name: "Stage 1 — Urgences", badge: "S1", desc: "Service des urgences du CHR Hassan II · 4 semaines", color: "bg-primary/10 text-primary" },
  { name: "Stage 2 — Réanimation", badge: "S2", desc: "Service de réanimation polyvalente · 4 semaines", color: "bg-rose/10 text-rose" },
  { name: "Stage 3 — SAMU / SMUR", badge: "S3", desc: "Régulation et interventions pré-hospitalières · 4 semaines", color: "bg-gold/10 text-gold" },
  { name: "Stage 4 — Bloc opératoire", badge: "S4", desc: "Soins péri-opératoires et surveillance post-anesthésie · 4 semaines", color: "bg-teal/10 text-teal" },
];

const guides = [
  { title: "📘 Guide du stagiaire", items: ["Objectifs de stage par service", "Compétences à acquérir", "Grille d'auto-évaluation", "Carnet de stage à compléter"], color: "border-l-primary" },
  { title: "📋 Rapport de stage", items: ["Structure attendue du rapport", "Critères d'évaluation", "Exemples de problématiques", "Normes de rédaction APA"], color: "border-l-gold" },
  { title: "🎓 Guide du PFE", items: ["Choix du sujet et validation", "Recherche bibliographique", "Méthodologie et outils", "Préparation de la soutenance"], color: "border-l-rose" },
];

const evalStage = [
  { critere: "Savoir-faire technique", indicateur: "Maîtrise des gestes d'urgence (VVP, IOT, MCE…)", pts: "20 pts" },
  { critere: "Raisonnement clinique", indicateur: "Analyse, priorisation, décision en urgence", pts: "20 pts" },
  { critere: "Communication", indicateur: "Relation soignant-patient, transmissions SBAR", pts: "15 pts" },
  { critere: "Travail en équipe", indicateur: "Collaboration, leadership en situation critique", pts: "15 pts" },
  { critere: "Éthique et déontologie", indicateur: "Respect confidentialité, posture professionnelle", pts: "10 pts" },
  { critere: "Rapport de stage", indicateur: "Qualité rédactionnelle, structuration, richesse clinique", pts: "20 pts" },
];

const evalPFE = [
  { critere: "Pertinence du sujet", indicateur: "Problématique claire, justification, intérêt scientifique", pts: "10 pts" },
  { critere: "Revue de littérature", indicateur: "Exhaustivité, pertinence, citations normées", pts: "15 pts" },
  { critere: "Méthodologie", indicateur: "Rigueur, cohérence, outils adaptés", pts: "20 pts" },
  { critere: "Résultats", indicateur: "Présentation, tableaux, graphiques, objectivité", pts: "20 pts" },
  { critere: "Discussion", indicateur: "Interprétation, comparaison avec la littérature, limites", pts: "15 pts" },
  { critere: "Soutenance orale", indicateur: "Clarté, maîtrise, réponses aux questions du jury", pts: "15 pts" },
  { critere: "Présentation PowerPoint", indicateur: "Lisibilité, structuration, respect du timing", pts: "5 pts" },
];

export default function MasterPage() {
  const [activeTab, setActiveTab] = useState("cours");

  const getTabColor = (id: string, isActive: boolean) => {
    if (!isActive) return "bg-muted text-muted-foreground hover:text-foreground";
    const map: Record<string, string> = {
      cours: "bg-gold text-gold-foreground shadow-md",
      activites: "bg-primary text-primary-foreground shadow-md",
      planning: "bg-primary text-primary-foreground shadow-md",
      stages: "bg-gold text-gold-foreground shadow-md",
      guides: "bg-rose text-rose-foreground shadow-md",
      eval: "bg-teal text-teal-foreground shadow-md",
      pfe: "bg-foreground text-background shadow-md",
    };
    return map[id] || "";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <AnimatedSection>
        <div className="relative rounded-2xl overflow-hidden min-h-[200px] flex items-center mb-8 bg-gradient-to-br from-slate-800 via-slate-700 to-cyan-900">
          <img
            src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1200&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/40 to-transparent" />
          <div className="relative z-10 p-8 sm:p-12">
            <span className="inline-flex items-center gap-2 bg-gold/15 border border-gold/35 text-gold px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3">
              🏅 Master Spécialisé
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-card mb-2">Master PAU</h1>
            <p className="text-card/60 text-sm">Pratiques Avancées en Urgentologie · ISPITS Agadir</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Tabs */}
      <AnimatedSection delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-8 p-3 bg-card rounded-2xl border border-border shadow-card">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                getTabColor(tab.id, activeTab === tab.id)
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Cours */}
      {activeTab === "cours" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">📚 Programme des Cours</h2>
           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cours.map((c, i) => (
                <div key={i} className={`bg-secondary rounded-xl p-5 shadow-card border-t-[3px] ${c.color} hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200`}>
                  <div className="text-2xl mb-3">{c.icon}</div>
                  <h4 className="font-bold text-sm mb-1">{c.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                  <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary mt-3">{c.tag}</span>
                  <div className="mt-3 flex items-center gap-2">
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">
                      <ExternalLink size={14} /> Accéder au Padlet
                    </a>
                  </div>
                  <div className="mt-3 bg-card rounded-lg p-2 inline-block">
                    <QRCodeSVG value={c.link} size={80} bgColor="transparent" fgColor="hsl(var(--foreground))" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Activités réalisées */}
      {activeTab === "activites" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">🎯 Activités réalisées dans le cadre du Master</h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Découvrez toutes les activités réalisées dans le cadre du Master Pratiques Avancées en Urgentologie.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="bg-secondary rounded-xl p-3">
                <img src={qrActivites} alt="QR code Activités réalisées" className="w-[150px] h-[150px]" />
              </div>
              <div className="flex-1">
                <a
                  href="https://padlet.com/eddabra/activit-s-r-alis-es-dans-le-cadre-du-master-pau-iqpbsk0ngliz6r5e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink size={16} />
                  Accéder au Padlet des Activités
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Planning */}
      {activeTab === "planning" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">📅 Planning Hebdomadaire</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy text-navy-foreground">
                    <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase rounded-tl-lg">Jour</th>
                    <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase">Matin</th>
                    <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase rounded-tr-lg">Après-midi</th>
                  </tr>
                </thead>
                <tbody>
                  {planning.map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0 hover:bg-primary/[0.02]">
                      <td className="px-4 py-3 font-bold text-sm">{row.day}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.am}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-md">{row.pm}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Stages */}
      {activeTab === "stages" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">🏥 Stages Cliniques</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {stages.map((s, i) => (
                <div key={i} className="bg-secondary rounded-xl p-5 border border-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200">
                  <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${s.color}`}>{s.badge}</span>
                  <h4 className="font-bold text-sm mb-1">{s.name}</h4>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Guides */}
      {activeTab === "guides" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">📘 Guides Pédagogiques</h2>
            <div className="space-y-4">
              {guides.map((g, i) => (
                <div key={i} className={`bg-secondary rounded-xl p-5 border-l-4 ${g.color} hover:translate-x-1 transition-all duration-200`}>
                  <h4 className="font-bold text-sm mb-3">{g.title}</h4>
                  <ul className="space-y-1.5 pl-4 list-disc">
                    {g.items.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Évaluation */}
      {activeTab === "eval" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">📋 Grilles d'Évaluation</h2>

            <h3 className="font-bold text-sm mb-3 text-foreground">🏥 Évaluation du Stage</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Critère</th>
                    <th className="text-left px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Indicateurs</th>
                    <th className="text-left px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {evalStage.map((e, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0">
                      <td className="px-3 py-2 font-medium">{e.critere}</td>
                      <td className="px-3 py-2 text-muted-foreground">{e.indicateur}</td>
                      <td className="px-3 py-2"><span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-md">{e.pts}</span></td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="px-3 py-2" colSpan={2}>TOTAL</td>
                    <td className="px-3 py-2"><span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-md">100 pts</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-sm mb-3 text-foreground">🎓 Évaluation du PFE</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Critère</th>
                    <th className="text-left px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Détail</th>
                    <th className="text-left px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {evalPFE.map((e, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0">
                      <td className="px-3 py-2 font-medium">{e.critere}</td>
                      <td className="px-3 py-2 text-muted-foreground">{e.indicateur}</td>
                      <td className="px-3 py-2"><span className="bg-gold/15 text-gold text-xs font-bold px-2 py-0.5 rounded-md">{e.pts}</span></td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="px-3 py-2" colSpan={2}>TOTAL</td>
                    <td className="px-3 py-2"><span className="bg-gold text-gold-foreground text-xs font-bold px-2 py-0.5 rounded-md">100 pts</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* PFE */}
      {activeTab === "pfe" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">🎓 Projet de Fin d'Étude</h2>
            <div className="space-y-4">
              {guides.map((g, i) => (
                <div key={i} className={`bg-secondary rounded-xl p-5 border-l-4 ${g.color}`}>
                  <h4 className="font-bold text-sm mb-3">{g.title}</h4>
                  <ul className="space-y-1.5 pl-4 list-disc">
                    {g.items.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
