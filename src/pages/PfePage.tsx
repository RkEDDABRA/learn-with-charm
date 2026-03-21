import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";

const pfeTabs = [
  { id: "licence", label: "PFE Licence", fa: "fa-solid fa-graduation-cap", count: 15 },
  { id: "master", label: "PFE Master", fa: "fa-solid fa-award", count: 2 },
  { id: "rapports", label: "Rapports de Stage", fa: "fa-solid fa-clipboard-list", count: 7 },
];

interface PfeItem {
  filiere: string;
  filiereColor: string;
  lieu: string;
  title: string;
  tags: { label: string; color: string }[];
  extra?: string;
}

const pfeLicenceByYear: Record<string, PfeItem[]> = {
  "2025": [
    { filiere: "SI · INP", filiereColor: "bg-rose/10 text-rose", lieu: "CHR Hassan II · Agadir", title: "Facteurs associés à la détresse respiratoire chez les nouveau-nés au niveau du CHR Hassan II d'Agadir", tags: [{ label: "Néonatologie", color: "bg-rose/10 text-rose" }] },
    { filiere: "SI · INP", filiereColor: "bg-rose/10 text-rose", lieu: "CHR Hassan II · Agadir", title: "Facteurs favorisant l'apparition de l'acidocétose diabétique chez l'enfant au niveau du CHR Hassan II d'Agadir", tags: [{ label: "Pédiatrie", color: "bg-accent/10 text-accent" }] },
  ],
  "2024": [
    { filiere: "SI · INP", filiereColor: "bg-primary/10 text-primary", lieu: "CHR Hassan II · Agadir", title: "Profil des nouveau-nés admis pour une infection materno-fœtale et ayant une CRP positive au niveau du CHR Hassan II d'Agadir", tags: [{ label: "Néonatologie", color: "bg-primary/10 text-primary" }, { label: "Infectiologie", color: "bg-gold/10 text-gold" }] },
  ],
  "2023": [
    { filiere: "SI · INP", filiereColor: "bg-gold/10 text-gold", lieu: "ISPITS · Agadir", title: "Prévalence et facteurs associés du burnout académique chez les étudiants de l'ISPITS d'Agadir", tags: [{ label: "Santé mentale", color: "bg-gold/10 text-gold" }] },
  ],
  "2022": [
    { filiere: "SI · IP", filiereColor: "bg-teal/10 text-teal", lieu: "CDTMR · Guelmim", title: "Profil épidémiologique de la tuberculose extra-pulmonaire au niveau du CDTMR de Guelmim – 2021", tags: [{ label: "Infectiologie", color: "bg-primary/10 text-primary" }] },
    { filiere: "SI · IP", filiereColor: "bg-teal/10 text-teal", lieu: "Guelmim", title: "Covid-19 et la phytothérapie : usage des plantes médicinales chez les étudiants de Guelmim", tags: [{ label: "Phytothérapie", color: "bg-teal/10 text-teal" }, { label: "Épidémiologie", color: "bg-primary/10 text-primary" }] },
  ],
  "2021": [
    { filiere: "SF · SF", filiereColor: "bg-accent/10 text-accent", lieu: "Guelmim", title: "Facteurs entravant le dépistage du cancer du col utérin au niveau des centres de santé urbains de Guelmim", tags: [{ label: "Oncologie", color: "bg-rose/10 text-rose" }] },
    { filiere: "SI · IP", filiereColor: "bg-accent/10 text-accent", lieu: "Guelmim Oued Noun", title: "Profil épidémiologique des personnes atteintes du COVID-19 dans la région Guelmim Oued Noun", tags: [{ label: "Épidémiologie", color: "bg-primary/10 text-primary" }] },
  ],
  "2020": [
    { filiere: "SF · SF", filiereColor: "bg-gold/10 text-gold", lieu: "CDTMR · Guelmim", title: "Profil épidémiologique de la tuberculose chez les enfants au niveau du CDTMR de Guelmim", tags: [{ label: "Pédiatrie", color: "bg-gold/10 text-gold" }, { label: "Infectiologie", color: "bg-primary/10 text-primary" }] },
    { filiere: "SI · IP", filiereColor: "bg-gold/10 text-gold", lieu: "CHR · Guelmim", title: "Prise en charge des enfants diabétiques insulino-dépendants au service de pédiatrie du CHR de Guelmim", tags: [{ label: "Pédiatrie", color: "bg-accent/10 text-accent" }] },
  ],
  "2019": [
    { filiere: "SF · SF", filiereColor: "bg-teal/10 text-teal", lieu: "Laâyoune", title: "Mortalité Néonatale au niveau de l'hôpital Moulay Hassan Ben Mehdi", tags: [{ label: "Néonatologie", color: "bg-rose/10 text-rose" }] },
  ],
  "2018": [
    { filiere: "SI · IP", filiereColor: "bg-primary/10 text-primary", lieu: "Laayoune", title: "Prévalence et profil épidémiologique de la co-infection VIH/tuberculose à Laayoune", tags: [{ label: "Infectiologie", color: "bg-primary/10 text-primary" }] },
  ],
  "2017": [
    { filiere: "SF · SF", filiereColor: "bg-muted text-muted-foreground", lieu: "Laâyoune", title: "Étude de l'activité de dépistage du cancer du sein", tags: [{ label: "Oncologie", color: "bg-rose/10 text-rose" }] },
    { filiere: "SI · IP", filiereColor: "bg-muted text-muted-foreground", lieu: "Laâyoune", title: "La prévention des infections nosocomiales au service de la réanimation", tags: [{ label: "Réanimation", color: "bg-primary/10 text-primary" }] },
    { filiere: "SI · IP", filiereColor: "bg-muted text-muted-foreground", lieu: "Laâyoune", title: "Gestion des déchets hospitaliers : Service chirurgie et urgences du CHR de Laâyoune", tags: [{ label: "Santé environnementale", color: "bg-teal/10 text-teal" }] },
    { filiere: "SF · SF", filiereColor: "bg-muted text-muted-foreground", lieu: "Laâyoune", title: "Gestion des déchets anatomiques au niveau de la maternité du CHR de Laâyoune", tags: [{ label: "Maternité", color: "bg-rose/10 text-rose" }] },
  ],
};

const pfeMaster: Record<string, PfeItem[]> = {
  "2022 · ISPITS Agadir": [
    { filiere: "Master PSITS", filiereColor: "bg-primary/10 text-primary", lieu: "ISPITS · Agadir", title: "Effet du rôle de l'apprenant sur les connaissances, l'auto-efficacité générale, la confiance en soi et la satisfaction des étudiants infirmiers lors de l'apprentissage par simulation", extra: "Étudiant : ABDELKADER AMECHGHAL · Soutenu le 10/09/2022", tags: [{ label: "Pédagogie", color: "bg-primary/10 text-primary" }, { label: "Simulation médicale", color: "bg-rose/10 text-rose" }] },
  ],
  "2021 · FSA Agadir": [
    { filiere: "Master B2D2", filiereColor: "bg-gold/10 text-gold", lieu: "FSA · Agadir", title: "État des lieux de la gestion des déchets hospitaliers au CHR Hassan II d'Agadir", extra: "Co-encadrement : Pr. Mimouni R. & Pr. Rkia EDDABRA · Étudiante : OULAYADA SMAHANE · 08/10/2021", tags: [{ label: "Biodiversité", color: "bg-gold/10 text-gold" }, { label: "Santé environnementale", color: "bg-teal/10 text-teal" }] },
  ],
};

const rapportsStage: PfeItem[] = [
  { filiere: "PAU · S2", filiereColor: "bg-rose/10 text-rose", lieu: "CHR Hassan II · Agadir", title: "Gestion des médicaments de la pharmacie à l'unité des urgences au niveau du CHR d'Agadir", tags: [{ label: "Urgences", color: "bg-primary/10 text-primary" }, { label: "Pharmacie hospitalière", color: "bg-rose/10 text-rose" }] },
  { filiere: "PAU · S2", filiereColor: "bg-rose/10 text-rose", lieu: "CHR Hassan II · Agadir", title: "Circuit vert au niveau du Centre Hospitalier Régional d'Agadir", tags: [{ label: "Organisation hospitalière", color: "bg-teal/10 text-teal" }] },
  { filiere: "PAU · S2", filiereColor: "bg-rose/10 text-rose", lieu: "CHR Hassan II · Agadir", title: "Service d'Accueil et des Urgences Vitales du CHR Agadir : Vers une protocolisation des prises en charge", tags: [{ label: "Urgences vitales", color: "bg-primary/10 text-primary" }, { label: "Protocolisation", color: "bg-gold/10 text-gold" }] },
  { filiere: "PAU · S2", filiereColor: "bg-rose/10 text-rose", lieu: "CHR Hassan II · Agadir", title: "Gestion de l'unité d'hospitalisation de courte durée au niveau du CHR d'Agadir", tags: [{ label: "Hospitalisation", color: "bg-accent/10 text-accent" }] },
  { filiere: "PAU · S2 · ×3", filiereColor: "bg-rose/10 text-rose", lieu: "CHR Hassan II · Agadir", title: "Analyse des pratiques cliniques et projet d'amélioration organisationnelle", tags: [{ label: "Pratiques cliniques", color: "bg-primary/10 text-primary" }, { label: "Amélioration qualité", color: "bg-accent/10 text-accent" }] },
];

function PfeCard({ item }: { item: PfeItem }) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card border-t-[3px] border-t-primary/30 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200">
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.filiereColor}`}>{item.filiere}</span>
        <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border"><i className="fa-solid fa-location-dot mr-1 text-[9px]" aria-hidden="true" />{item.lieu}</span>
      </div>
      <p className="text-sm font-medium leading-relaxed">{item.title}</p>
      {item.extra && <p className="text-xs text-muted-foreground mt-2">{item.extra}</p>}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {item.tags.map((t, i) => (
          <span key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${t.color}`}>{t.label}</span>
        ))}
      </div>
    </div>
  );
}

export default function PfePage() {
  const [activeTab, setActiveTab] = useState("licence");

  return (
    <div>
      {/* Hero */}
      <div className="bg-navy py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-gold/10 pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-block bg-gold text-gold-foreground text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"><i className="fa-solid fa-folder-open mr-1" aria-hidden="true" /> Travaux Encadrés</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-foreground mb-2">PFE & Travaux Encadrés</h1>
          <p className="text-navy-foreground/60 text-sm">
            Projets de Fin d'Étude et Rapports de Stage encadrés par <strong className="text-gold">Pr. Rkia EDDABRA</strong>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-card border-b border-border px-4 py-3 flex gap-2 flex-wrap shadow-sm">
        {pfeTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
              activeTab === tab.id
                ? "bg-gold text-gold-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:text-foreground border border-border"
            )}
          >
            <i className={tab.fa} aria-hidden="true" /> {tab.label}
            <span className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
              activeTab === tab.id ? "bg-gold-foreground/15" : "bg-foreground/10"
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* PFE Licence */}
        {activeTab === "licence" && (
          <AnimatedSection>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { fa: "fa-solid fa-file-lines", value: "15", label: "PFE Licence", color: "text-gold" },
                { fa: "fa-solid fa-baby", value: "6", label: "Filière SF", color: "text-rose" },
                { fa: "fa-solid fa-hospital", value: "9", label: "Filière SI", color: "text-primary" },
                { fa: "fa-solid fa-calendar-days", value: "2017–2025", label: "Années", color: "text-accent" },
              ].map((s, i) => (
                <div key={i} className="bg-card rounded-xl p-4 text-center shadow-card">
                  <div className="text-xl mb-1 text-muted-foreground"><i className={s.fa} aria-hidden="true" /></div>
                  <div className={`font-display text-xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-[11px] text-muted-foreground font-medium">{s.label}</div>
                </div>
              ))}
            </div>
            {Object.entries(pfeLicenceByYear).map(([year, items]) => (
              <div key={year} className="mb-8">
                <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm"><i className="fa-regular fa-calendar mr-1" aria-hidden="true" />{year}</span>
                <div className="grid sm:grid-cols-2 gap-4">
                  {items.map((item, i) => <PfeCard key={i} item={item} />)}
                </div>
              </div>
            ))}
            {/* Legend */}
            <div className="bg-card rounded-xl p-5 border border-border mt-4">
              <p className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase mb-3"><i className="fa-solid fa-info-circle mr-1" aria-hidden="true" />Légende des filières</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { code: "SF = Sage-Femme", color: "bg-accent/10 text-accent" },
                  { code: "SI = Soins Infirmiers", color: "bg-primary/10 text-primary" },
                  { code: "IP = Infirmier Polyvalent", color: "bg-gold/10 text-gold" },
                  { code: "INP = Infirmier Néonatologie-Pédiatrie", color: "bg-rose/10 text-rose" },
                ].map((l, i) => (
                  <span key={i} className={`text-xs font-semibold px-3 py-1 rounded-full ${l.color}`}>{l.code}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* PFE Master */}
        {activeTab === "master" && (
          <AnimatedSection>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-card rounded-xl p-4 text-center shadow-card">
                <div className="text-xl mb-1 text-gold"><i className="fa-solid fa-award" aria-hidden="true" /></div>
                <div className="font-display text-xl font-bold text-gold">2</div>
                <div className="text-[11px] text-muted-foreground font-medium">PFE Master encadrés</div>
              </div>
              <div className="bg-card rounded-xl p-4 text-center shadow-card">
                <div className="text-xl mb-1 text-primary"><i className="fa-solid fa-graduation-cap" aria-hidden="true" /></div>
                <div className="font-display text-xl font-bold text-primary">2</div>
                <div className="text-[11px] text-muted-foreground font-medium">Masters différents</div>
              </div>
            </div>
            {Object.entries(pfeMaster).map(([year, items]) => (
              <div key={year} className="mb-8">
                <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm"><i className="fa-regular fa-calendar mr-1" aria-hidden="true" />{year}</span>
                <div className="grid gap-4">
                  {items.map((item, i) => <PfeCard key={i} item={item} />)}
                </div>
              </div>
            ))}
          </AnimatedSection>
        )}

        {/* Rapports de Stage */}
        {activeTab === "rapports" && (
          <AnimatedSection>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-card rounded-xl p-4 text-center shadow-card">
                <div className="text-xl mb-1 text-rose"><i className="fa-solid fa-clipboard-list" aria-hidden="true" /></div>
                <div className="font-display text-xl font-bold text-rose">7</div>
                <div className="text-[11px] text-muted-foreground font-medium">Rapports de stage</div>
              </div>
              <div className="bg-card rounded-xl p-4 text-center shadow-card">
                <div className="text-xl mb-1 text-accent"><i className="fa-solid fa-hospital" aria-hidden="true" /></div>
                <div className="font-display text-xl font-bold text-accent">CHR</div>
                <div className="text-[11px] text-muted-foreground font-medium">Agadir · Semestre 2</div>
              </div>
            </div>
            <span className="inline-block bg-rose text-rose-foreground text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm"><i className="fa-solid fa-users mr-1" aria-hidden="true" />Promotion 2024–2026 · Semestre 2 · CHR Agadir</span>
            <div className="grid sm:grid-cols-2 gap-4">
              {rapportsStage.map((item, i) => <PfeCard key={i} item={item} />)}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
