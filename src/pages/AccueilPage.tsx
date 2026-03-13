import AnimatedSection from "@/components/AnimatedSection";
import AnimatedSection from "@/components/AnimatedSection";
import { BookOpen, Award, FileText, Microscope, Mic, Trophy } from "lucide-react";

interface AccueilPageProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { icon: <BookOpen size={22} />, value: "2", label: "Options Licence", color: "text-primary" },
  { icon: <Award size={22} />, value: "1", label: "Filière Master", color: "text-gold" },
  { icon: <FileText size={22} />, value: "15+", label: "PFE Encadrés", color: "text-teal" },
  { icon: <Microscope size={22} />, value: "10+", label: "Publications", color: "text-rose" },
  { icon: <Mic size={22} />, value: "15+", label: "Communications Int.", color: "text-primary" },
  { icon: <Trophy size={22} />, value: "2021", label: "Habilitation Universitaire", color: "text-gold" },
];

const actualites = [
  { tag: "2026", tagColor: "bg-rose/10 text-rose", text: "Molecular Diagnostic Tests for Tuberculosis — Diagnostics (IN PRESS)" },
  { tag: "2026", tagColor: "bg-rose/10 text-rose", text: "Nursing Simulation & Self-Efficacy — Education in Medicine Journal (IN PRESS)" },
  { tag: "Conf.", tagColor: "bg-primary/10 text-primary", text: "Conférence plénière CINESIA 2025 — Profil des nouveau-nés, CHR Hassan II Agadir" },
  { tag: "Dubai", tagColor: "bg-gold/10 text-gold", text: "12th International Nursing Conference 2023 — Miliary tuberculosis in children" },
];



export default function AccueilPage({ onNavigate }: AccueilPageProps) {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <AnimatedSection>
        <div className="relative rounded-2xl overflow-hidden bg-navy p-8 sm:p-12 mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-gold/10 pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              ✦ Site pédagogique officiel
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy-foreground mb-3">
              Pr. Rkia <span className="text-gold">EDDABRA</span>
            </h1>
            <p className="text-navy-foreground/80 text-base max-w-lg leading-relaxed">
              Maître de Conférence Habilitée en Microbiologie
              <br />
              ISPITS d'Agadir — Site pédagogique officiel
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* 3 Cards */}
      <AnimatedSection delay={0.08}>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <button
            onClick={() => onNavigate("licence")}
            className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 text-left border-t-4 border-t-primary"
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="font-display font-bold text-sm text-foreground">Licence — Modules Enseignés</div>
            <p className="text-xs text-muted-foreground mt-1">Accéder aux modules et ressources</p>
          </button>
          <div className="bg-card rounded-xl p-5 shadow-card border-t-4 border-t-gold opacity-75">
            <div className="text-2xl mb-2">🏅</div>
            <div className="font-display font-bold text-sm text-foreground">Master — Filière Coordonnée</div>
            <p className="text-xs text-muted-foreground mt-1">Prochainement disponible</p>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border-t-4 border-t-rose opacity-75">
            <div className="text-2xl mb-2">🎓</div>
            <div className="font-display font-bold text-sm text-foreground">Licence — Filière Coordonnée</div>
            <p className="text-xs text-muted-foreground mt-1">Prochainement disponible</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection delay={0.1}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-5 text-center shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className={`flex justify-center mb-2 ${s.color}`}>{s.icon}</div>
              <div className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </AnimatedSection>


      {/* Filières + Actualités */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <AnimatedSection delay={0.15}>
          <div className="bg-card rounded-xl p-6 shadow-card h-full">
            <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              📚 Filières Enseignées
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => onNavigate("licence")}
                className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-rose/5 border border-rose/15 hover:border-rose/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose flex items-center justify-center text-lg flex-shrink-0">🤱</div>
                <div>
                  <div className="font-semibold text-sm text-rose">Sage-Femme</div>
                  <div className="text-xs text-muted-foreground">Licence · S1 Sciences Biologiques · S2 Anatomie</div>
                </div>
              </button>
              <button
                onClick={() => onNavigate("licence")}
                className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-teal/5 border border-teal/15 hover:border-teal/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-teal flex items-center justify-center text-lg flex-shrink-0">🥗</div>
                <div>
                  <div className="font-semibold text-sm text-teal">Diététique / Nutrition</div>
                  <div className="text-xs text-muted-foreground">Licence · S1 Anatomie-Physiologie · S2 Bases Physiologiques</div>
                </div>
              </button>
              <button
                onClick={() => onNavigate("master")}
                className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-gold/5 border border-gold/15 hover:border-gold/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-lg flex-shrink-0">🏅</div>
                <div>
                  <div className="font-semibold text-sm text-gold">Master PAU</div>
                  <div className="text-xs text-muted-foreground">Pratiques Avancées en Urgentologie · Cours, Stages, Guides</div>
                </div>
              </button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="bg-card rounded-xl p-6 shadow-card h-full">
            <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              📰 Actualités & Publications
            </h3>
            <div className="space-y-3">
              {actualites.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 mt-0.5 ${a.tagColor}`}>
                    {a.tag}
                  </span>
                  <p className="text-sm text-foreground leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom sections */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <AnimatedSection delay={0.25}>
          <div className="bg-card rounded-xl p-6 shadow-card border-t-4 border-t-gold">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-lg">📜</div>
              <div>
                <div className="font-display font-bold text-sm">Textes Réglementaires</div>
                <div className="text-xs text-muted-foreground">Documents officiels de référence</div>
              </div>
            </div>
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 flex items-center gap-3">
              <div className="w-11 h-13 bg-destructive rounded-lg flex flex-col items-center justify-center flex-shrink-0 p-2">
                <span className="text-[10px] font-bold text-destructive-foreground">PDF</span>
                <span className="text-sm">📄</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">Textes Réglementaires ISPITS</p>
                <p className="text-xs text-muted-foreground mb-2">Document officiel réglementant les programmes</p>
                <span className="inline-flex items-center gap-1 bg-gold text-gold-foreground text-xs font-bold px-3 py-1 rounded-full">
                  ⬇ Télécharger le PDF
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="bg-card rounded-xl p-6 shadow-card border-t-4 border-t-primary">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-lg">🔗</div>
              <div>
                <div className="font-display font-bold text-sm">Liens Utiles</div>
                <div className="text-xs text-muted-foreground">Ressources institutionnelles</div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { icon: "🏥", name: "Ministère de la Santé", desc: "Actualités, textes, programmes", url: "https://www.sante.gov.ma", hoverColor: "hover:border-primary/30" },
                { icon: "🎓", name: "Accréditation — ENSSUP", desc: "Portail d'accréditation", url: "https://www.enssup.gov.ma", hoverColor: "hover:border-accent/30" },
                { icon: "🏛️", name: "ISPITS — Site Institutionnel", desc: "ISPITS, Agadir", url: "#", hoverColor: "hover:border-gold/30" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 rounded-xl bg-secondary border border-transparent ${link.hoverColor} transition-all`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{link.name}</p>
                    <p className="text-xs text-muted-foreground">{link.desc}</p>
                  </div>
                  <span className="text-muted-foreground text-sm">↗</span>
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Quick nav + Institution */}
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatedSection delay={0.35}>
          <div className="bg-navy rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🧭</span>
              <span className="font-display font-bold text-sm text-navy-foreground">Navigation</span>
            </div>
            <div className="space-y-1">
              {[
                { label: "Accueil", page: "accueil" },
                { label: "Curriculum Vitae", page: "cv" },
                { label: "Licence Sage-femme", page: "licence" },
                { label: "Licence Diététique", page: "licence" },
                { label: "Master PAU", page: "master" },
                { label: "Rapports & PFE", page: "pfe" },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => onNavigate(item.page)}
                  className="w-full text-left flex items-center gap-3 text-navy-foreground/70 hover:text-navy-foreground text-sm px-3 py-2 rounded-lg hover:bg-navy-foreground/5 transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="bg-navy rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🏛️</span>
              <span className="font-display font-bold text-sm text-navy-foreground">Institution</span>
            </div>
            <p className="text-navy-foreground/70 text-sm leading-relaxed mb-4">
              Institut Supérieur des Professions Infirmières et Techniques de Santé (ISPITS)
              <br />
              <span className="text-navy-foreground/50">Agadir, Maroc</span>
            </p>
            <div className="space-y-2">
              <a href="https://ispits.sante.gov.ma" target="_blank" rel="noopener" className="flex items-center gap-2 text-primary/80 hover:text-primary text-sm transition-colors">
                <span>🔗</span> ispits.sante.gov.ma
              </a>
              <span className="flex items-center gap-2 text-primary/80 text-sm">
                <span>✉</span> contact@ispits-agadir.ma
              </span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
