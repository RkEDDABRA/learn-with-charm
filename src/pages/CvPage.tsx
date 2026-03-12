import AnimatedSection from "@/components/AnimatedSection";

const sidebarInfo = {
  name: "Pr. Rkia EDDABRA",
  title: "Maître de Conférence Habilité",
  contact: [
    { icon: "🏛️", text: "ISPITS Agadir" },
    { icon: "🎓", text: "Université Ibn Zohr, Agadir" },
    { icon: "🔬", text: "Microbiologie & Sciences de la Santé" },
    { icon: "✉", text: "r.eddabra@uiz.ac.ma" },
  ],
  skills: ["Microbiologie", "Bactériologie", "Parasitologie", "Biologie Moléculaire", "Pédagogie Universitaire", "Recherche Clinique", "Encadrement PFE"],
};

const formations = [
  { title: "Habilitation Universitaire", lieu: "Université Ibn Zohr, Agadir", date: "2021", desc: "Microbiologie, Bactériologie, Parasitologie" },
  { title: "Doctorat en Microbiologie", lieu: "Université de Strasbourg, France", date: "2010", desc: "Caractérisation de Vibrio spp. dans les eaux usées" },
  { title: "Master en Microbiologie Appliquée", lieu: "Université Ibn Zohr, Agadir", date: "2006", desc: "" },
  { title: "Licence en Biologie", lieu: "Université Ibn Zohr, Agadir", date: "2004", desc: "" },
];

const parcours = [
  { title: "Professeur de l'Enseignement Supérieur (MCH)", lieu: "ISPITS Agadir", date: "2021 – Présent", desc: "Coordonnatrice Licence & Master PAU. Enseignement, encadrement PFE, recherche." },
  { title: "Professeur Assistante", lieu: "ISPITS Laayoune", date: "2013 – 2021", desc: "Microbiologie, Sciences Biologiques. Directrice par intérim. Encadrement PFE." },
  { title: "Post-doc / ATER", lieu: "Université de Strasbourg", date: "2010 – 2012", desc: "Recherche en microbiologie environnementale et diagnostic moléculaire." },
];

const publications = [
  { title: "Article IN PRESS (2026)", desc: "Molecular Diagnostic Tests for Tuberculosis — Diagnostics" },
  { title: "Article IN PRESS (2026)", desc: "Nursing Simulation & Self-Efficacy — Education in Medicine Journal" },
  { title: "Article de revue (2018)", desc: "EDDABRA R. & AIT BEN HASSOU H. – Rapid molecular assays for detection of tuberculosis. Pneumonia (Nathan)." },
  { title: "Article (2014) – Nanoparticles", desc: "BADRI W., EDDABRA R. et al. – Biodegradable Polymer Based Nanoparticles. Journal of Colloid Science and Biotechnology." },
  { title: "Article (2012) – MALDI-TOF Vibrio", desc: "EDDABRA R. et al. – Rapid discrimination of environmental Vibrio by MALDI-TOF. Microbiological Research." },
  { title: "Article (2011) – Vibrio cholerae", desc: "EDDABRA R. et al. – Occurrence of Vibrio cholerae non-O1 in three wastewater treatment plants in Agadir. World Journal of Microbiology and Biotechnology." },
  { title: "Article (2011) – ChromID Vibrio", desc: "EDDABRA R. et al. – Evaluation of a new chromogenic medium ChromID™ Vibrio. Eur. J. Clin. Microbiology & Infectious Diseases." },
];

const communications = [
  { title: "Conférence plénière – CINESIA 2025", desc: "Profil des nouveau-nés admis pour infection materno-fœtale – CHR Hassan II Agadir. Oujda, Juin 2025." },
  { title: "Communication orale – 12th International Nursing Conference (2023)", desc: "Miliary tuberculosis: A report of 12 cases. Dubai, UAE, July 2023." },
  { title: "Communication orale – 9ème École Internationale de Recherche (2023)", desc: "Diagnostic moléculaire du Mycobacterium tuberculosis résistant à la rifampicine au Maroc." },
  { title: "Modérateur de session – 8ème École Internationale (2021)", desc: "Biodiversité, Biotechnologies, Durabilité & Innovation. Université Ibn Zohr, FSA Agadir." },
  { title: "Communication affichée – 20th ECCMID (2010)", desc: "MALDI-TOF MS analysis and molecular typing of environmental Vibrio isolates. Vienna, Austria." },
  { title: "Communication affichée – Vibrio 2009", desc: "Comparative analysis of Vibrio spp. from wastewater treatment plants of Agadir. Rio de Janeiro, Brazil." },
];

const certifications = [
  { title: "Formation PIGAI", lieu: "ISPITS d'Agadir", date: "Juin 2022" },
  { title: "Disaster Response Casualty Care (DRCC)", lieu: "Moroccan American Cooperation – Agadir", date: "Mai 2021" },
  { title: "Tuberculose de l'enfant pour agents de santé", lieu: "The Union & OMS", date: "Mars 2020" },
  { title: "Ingénierie pédagogique", lieu: "Ministère de la Santé – Rabat", date: "Avril 2016" },
  { title: "Brevets et Informations liées aux Brevets", lieu: "AMAPIC", date: "Mai 2014" },
  { title: "Research Proposal Development and Writing", lieu: "MEDREC – Muscat, Oman", date: "Octobre 2012" },
];

const admin = [
  "Directrice par intérim de l'ISPITS de Laayoune",
  "Membre du comité de pilotage du projet d'établissement 2017–2020",
  "Membre des commissions de validation des PFE",
  "Membre des commissions régionales (CROC) du jury du concours d'accès à l'ISPITS",
  "Membre de la commission Ad Hoc à l'ISPITS de Laayoune",
  "Membre des commissions régionales de surveillance de concours de recrutement",
  "Membre du comité scientifique des 1ères Journées Scientifiques de l'ISPITS d'Agadir (2016)",
  "Membre du comité d'organisation des Journées Francophones de Microbiologie des Milieux Hydriques, Agadir (2006)",
];

const langues = [
  { lang: "🇲🇦 Arabe", level: "Langue maternelle" },
  { lang: "🇫🇷 Français", level: "Courant" },
  { lang: "🇬🇧 Anglais", level: "Courant (publications internationales)" },
];

const associations = [
  { name: "Moroccan Association for Research in Sciences and Health", role: "" },
  { name: "Middle East Molecular Biology Sources (MEMBS)", role: "Membre depuis 2016" },
  { name: "APRS2D Laayoune", role: "Trésorier · 2017–2019" },
];

function CvSection({ title, icon, borderColor, children }: { title: string; icon: string; borderColor: string; children: React.ReactNode }) {
  return (
    <div className={`bg-card rounded-xl p-6 shadow-card border-l-4 ${borderColor}`}>
      <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">{icon} {title}</h3>
      {children}
    </div>
  );
}

function CvEntry({ title, lieu, date, desc }: { title: string; lieu?: string; date?: string; desc?: string }) {
  return (
    <div className="mb-4 pb-4 border-b border-border last:mb-0 last:pb-0 last:border-b-0">
      <div className="font-semibold text-sm">{title}</div>
      {lieu && <div className="text-sm text-primary font-medium mt-0.5">{lieu}</div>}
      {date && <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full mt-1">{date}</span>}
      {desc && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>}
    </div>
  );
}

export default function CvPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
        {/* Sidebar */}
        <AnimatedSection>
          <div className="bg-navy rounded-2xl p-6 lg:sticky lg:top-24 border border-primary/15">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-rose mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg border-2 border-gold/30">
              👩‍🔬
            </div>
            <h2 className="font-display text-xl font-bold text-navy-foreground text-center mb-1">{sidebarInfo.name}</h2>
            <p className="text-center text-gold text-xs tracking-widest uppercase font-medium mb-6">{sidebarInfo.title}</p>

            <div className="space-y-1 mb-6">
              <p className="text-gold text-[10px] tracking-widest uppercase font-bold border-b border-gold/20 pb-1 mb-2">Contact</p>
              {sidebarInfo.contact.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-navy-foreground/70 text-sm">
                  <span className="w-6 h-6 rounded-md bg-gold/10 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-gold text-[10px] tracking-widest uppercase font-bold border-b border-gold/20 pb-1 mb-2">Compétences</p>
              <div className="flex flex-wrap gap-1.5">
                {sidebarInfo.skills.map((s, i) => (
                  <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20 text-navy-foreground/80">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Main */}
        <div className="space-y-6">
          <AnimatedSection>
            <CvSection title="Formation Académique" icon="🎓" borderColor="border-l-primary">
              {formations.map((f, i) => <CvEntry key={i} title={f.title} lieu={f.lieu} date={f.date} desc={f.desc} />)}
            </CvSection>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <CvSection title="Parcours Professionnel" icon="💼" borderColor="border-l-gold">
              {parcours.map((p, i) => <CvEntry key={i} title={p.title} lieu={p.lieu} date={p.date} desc={p.desc} />)}
            </CvSection>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <CvSection title="Publications Scientifiques" icon="📄" borderColor="border-l-rose">
              {publications.map((p, i) => <CvEntry key={i} title={p.title} desc={p.desc} />)}
            </CvSection>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <CvSection title="Communications & Conférences" icon="🎤" borderColor="border-l-primary">
              {communications.map((c, i) => <CvEntry key={i} title={c.title} desc={c.desc} />)}
            </CvSection>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <CvSection title="Formations & Certifications" icon="🏆" borderColor="border-l-teal">
              {certifications.map((c, i) => <CvEntry key={i} title={c.title} lieu={c.lieu} date={c.date} />)}
            </CvSection>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <CvSection title="Activités Administratives & Organisationnelles" icon="⚙️" borderColor="border-l-muted-foreground">
              <ul className="space-y-2 pl-1">
                {admin.map((a, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span> {a}
                  </li>
                ))}
              </ul>
            </CvSection>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom cards: Languages + Associations */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <AnimatedSection delay={0.35}>
          <CvSection title="Langues" icon="🌐" borderColor="border-l-teal">
            {langues.map((l, i) => <CvEntry key={i} title={l.lang} desc={l.level} />)}
          </CvSection>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <CvSection title="Associations" icon="🏛️" borderColor="border-l-rose">
            {associations.map((a, i) => <CvEntry key={i} title={a.name} desc={a.role} />)}
          </CvSection>
        </AnimatedSection>
      </div>
    </div>
  );
}
