import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import LordIcon, { LORD_ICONS } from "@/components/LordIcon";
import { cn } from "@/lib/utils";
import PfePage from "@/pages/PfePage";
import PasswordGate from "@/components/PasswordGate";

const cvTabs = [
  { id: "cv", label: "Curriculum Vitae", lordicon: LORD_ICONS.avatar, color: "primary" },
  { id: "pfe", label: "PFE & Travaux Encadrés", lordicon: LORD_ICONS.document, color: "gold" },
];

const sidebarInfo = {
  name: "Pr. Rkia EDDABRA",
  title: "Maître de Conférence Habilité",
  contact: [
    { icon: "fa-solid fa-building-columns", text: "ISPITS Agadir" },
    { icon: "fa-solid fa-envelope", text: "eddabrarkia@gmail.com" },
  ],
  skills: ["Microbiologie", "Bactériologie", "Parasitologie", "Biologie Moléculaire", "Pédagogie Universitaire", "Recherche Clinique", "Encadrement PFE"],
};

const formations = [
  { title: "Habilitation Universitaire", lieu: "Faculté des Sciences – Université Ibn Zohr, Agadir", date: "2021", desc: "Microbiologie, Bactériologie, Parasitologie" },
  { title: "Doctorat en Microbiologie", lieu: "Université de Strasbourg, France", date: "2006 – 2010", desc: "Caractérisation de Vibrio spp. isolés des stations d'épuration des eaux usées de la ville d'Agadir. Identification, typage moléculaire et résistance aux antibiotiques." },
  { title: "DESA (Diplôme des Études Supérieures Approfondies)", lieu: "Faculté des Sciences – Université Ibn Zohr, Agadir", date: "2004 – 2006", desc: "" },
  { title: "Licence en Sciences – Biologie Générale · Option : Physiologie", lieu: "Faculté des Sciences – Université Ibn Zohr, Agadir", date: "2003", desc: "" },
];

const parcours = [
  { title: "Coordonnatrice pédagogique – Master PAU", lieu: "ISPITS d'Agadir", date: "En cours", desc: "Coordination pédagogique et encadrement de la filière Master : Pratiques Avancées en Urgentologie." },
  { title: "Coordonnatrice pédagogique – Filière Licence Soins Infirmiers", lieu: "ISPITS d'Agadir", date: "Depuis 23/07/2022", desc: "" },
  { title: "Responsable de l'Unité de Gestion Pédagogique", lieu: "ISPITS d'Agadir – Annexe Guelmim", date: "23/07/2019 – 22/07/2022", desc: "" },
  { title: "Coordonnatrice pédagogique des Filières (Soins Infirmiers, Sage-femme, Techniques de Santé)", lieu: "ISPITS de Laayoune", date: "21/01/2015 – 22/07/2019", desc: "Directrice par intérim de l'ISPITS de Laayoune · Membre commissions de validation des PFE · Membre commissions régionales CROC." },
  { title: "Enseignante & Coordonnatrice – Filière Génie Agroalimentaire", lieu: "École Polytechnique Universiapolis – Agadir", date: "2013 – 2015", desc: "Microbiologie générale (1ère année), Microbiologie alimentaire (2ème année)." },
  { title: "Enseignante vacataire – EST Agadir, EST Laayoune, Universiapolis, Faculté des Lettres IBZ", lieu: "Université Ibn Zohr · Universiapolis", date: "2010 – 2019", desc: "Microbiologie générale & alimentaire, Biologie moléculaire, Immunologie générale, Informatique (Études Anglaises)." },
];

const publications = [
  { title: "Articles IN PRESS (2026)", desc: "EL KASSIMI S., EDDABRA R. et al. – Molecular Diagnostic Tests for Tuberculosis. Diagnostics. | AMECHGHAL A., TAKHDAT K., …, EDDABRA R. et al. – Nursing Simulation & Self-Efficacy. Education in Medicine Journal." },
  { title: "Chapitre – Springer (2023)", desc: "ELACHOURI M., ABOUDAMIA F.Z, EDDABRA R. et al. – Citrullus colocynthis (L.) Schrad. In: Ethnobotany of Northern Africa and Levant. Springer, Cham. doi: 10.1007/978-3-031-13933-8_77-1" },
  { title: "Revue systématique (2020)", desc: "EDDABRA R., NEFFA M. – Mutations associated with rifampicin resistance in M. tuberculosis. Journal Interdisciplinary Perspectives on Infectious Diseases. doi: 10.1155/2020/5185896" },
  { title: "Article de revue (2018)", desc: "EDDABRA R. & AIT BEN HASSOU H. – Rapid molecular assays for detection of tuberculosis. Pneumonia (Nathan). doi: 10.1186/s41479-018-0049-2" },
  { title: "Article (2014) – Nanoparticles & Drug Delivery", desc: "BADRI W., EDDABRA R., FESSI H., ELAISSARI A. – Biodegradable Polymer Based Nanoparticles. Journal of Colloid Science and Biotechnology, 3, 141–149." },
  { title: "Article (2012) – MALDI-TOF Vibrio", desc: "EDDABRA R., PREVOST G., SCHEFTEL JM. – Rapid discrimination of environmental Vibrio by MALDI-TOF. Microbiological Research, 167: 226–230." },
  { title: "Article (2011) – Vibrio cholerae & Eaux usées Agadir", desc: "EDDABRA R. et al. – Occurrence of Vibrio cholerae non-O1 in three wastewater treatment plants in Agadir. World Journal of Microbiology and Biotechnology, 27:1099–1108." },
  { title: "Article (2011) – ChromID Vibrio", desc: "EDDABRA R., SCHEFTEL JM., PIEMONT Y. – Evaluation of a new chromogenic medium ChromID™ Vibrio. Eur. J. Clin. Microbiology & Infectious Diseases, 30:733–737." },
];

const communications = [
  { title: "Conférence plénière – CINESIA 2025", desc: "Profil des nouveau-nés admis pour infection materno-fœtale et CRP positive – CHR Hassan II Agadir. Université Mohammed Premier d'Oujda, 27-29 Juin 2025." },
  { title: "Communication orale – 12th International Nursing Conference (2023)", desc: "Miliary tuberculosis: A report of 12 cases. Dubai, UAE, July 25-27, 2023." },
  { title: "Communication orale – 9ème École Internationale de Recherche (2023)", desc: "Diagnostic moléculaire du Mycobacterium tuberculosis résistant à la rifampicine au Maroc. Université Ibn Zohr, Décembre 2023." },
  { title: "Modérateur de session – 8ème École Internationale de Recherche (2021)", desc: "Biodiversité, Biotechnologies, Durabilité & Innovation. Université Ibn Zohr, FSA Agadir, 20-22 Décembre 2021." },
  { title: "Communication affichée – 20th ECCMID (2010)", desc: "MALDI-TOF MS analysis and molecular typing of environmental Vibrio isolates. Vienna, Austria, April 2010." },
  { title: "Communication affichée – Vibrio 2009", desc: "Comparative analysis of Vibrio spp. isolated from wastewater treatment plants of Agadir. Rio de Janeiro, Brazil, November 2009." },
];

const certifications = [
  { title: "Formation PIGAI – Plateforme intégrée de gestion académique des ISPITS", lieu: "ISPITS d'Agadir", date: "Juin 2022" },
  { title: "Disaster Response Casualty Care (DRCC) – SPTC 8ème édition", lieu: "Moroccan American Cooperation – Agadir", date: "Mai 2021" },
  { title: "Tuberculose de l'enfant pour agents de santé (en ligne)", lieu: "The Union & Organisation Mondiale de la Santé (OMS)", date: "Mars 2020" },
  { title: "Ingénierie pédagogique", lieu: "Ministère de la Santé – Rabat", date: "Avril 2016" },
  { title: "Brevets et Informations liées aux Brevets", lieu: "Académie Marocaine de la Propriété Intellectuelle et Commerciale (AMAPIC)", date: "Mai 2014" },
  { title: "Research Proposal Development and Writing", lieu: "Middle East Desalination Research Center (MEDREC) – Muscat, Oman", date: "Octobre 2012" },
];

const admin = [
  "Directrice par intérim de l'ISPITS de Laayoune",
  "Membre du comité de pilotage du projet d'établissement 2017–2020",
  "Membre des commissions de validation des PFE",
  "Membre des commissions régionales (CROC) du jury du concours d'accès à l'ISPITS de Laayoune et Guelmim",
  "Membre de la commission Ad Hoc à l'ISPITS de Laayoune",
  "Membre des commissions régionales de surveillance de concours de recrutement",
  "Membre du comité scientifique des 1ères Journées Scientifiques de l'ISPITS d'Agadir «Santé-Environnement» (2016)",
  "Membre du comité d'organisation des Journées Francophones de Microbiologie des Milieux Hydriques, Agadir (2006)",
];

const langues = [
  { lang: "Arabe", level: "Langue maternelle", flag: "🇲🇦" },
  { lang: "Français", level: "Courant", flag: "🇫🇷" },
  { lang: "Anglais", level: "Courant (publications internationales)", flag: "🇬🇧" },
];

const associations = [
  { name: "Moroccan Association for Research in Sciences and Health", role: "" },
  { name: "Middle East Molecular Biology Sources (MEMBS)", role: "Membre depuis 2016" },
  { name: "APRS2D Laayoune", role: "Trésorier · 2017–2019" },
];

const sectionConfig: Record<string, { lordicon: string; colors: string; border: string }> = {
  formation: { lordicon: LORD_ICONS.book, colors: "primary:#3B82F6,secondary:#FFD700", border: "border-l-primary" },
  experience: { lordicon: LORD_ICONS.calendar, colors: "primary:#FFD700,secondary:#3B82F6", border: "border-l-gold" },
  publications: { lordicon: LORD_ICONS.article, colors: "primary:#E23670,secondary:#3B82F6", border: "border-l-rose" },
  communications: { lordicon: LORD_ICONS.bell, colors: "primary:#3B82F6,secondary:#FFD700", border: "border-l-primary" },
  certifications: { lordicon: LORD_ICONS.check, colors: "primary:#158FAD,secondary:#3B82F6", border: "border-l-teal" },
  admin: { lordicon: LORD_ICONS.settings, colors: "primary:#6b7280,secondary:#3B82F6", border: "border-l-muted-foreground" },
  langues: { lordicon: LORD_ICONS.target, colors: "primary:#158FAD,secondary:#3B82F6", border: "border-l-teal" },
  associations: { lordicon: LORD_ICONS.avatarMan, colors: "primary:#E23670,secondary:#3B82F6", border: "border-l-rose" },
};

function CvSection({ title, sectionKey, children }: { title: string; sectionKey: string; children: React.ReactNode }) {
  const config = sectionConfig[sectionKey];
  return (
    <div className={`bg-card rounded-xl p-6 shadow-card border-l-4 ${config.border}`}>
      <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
        <LordIcon src={config.lordicon} size={28} colors={config.colors} /> {title}
      </h3>
      {children}
    </div>
  );
}

function CvEntry({ title, lieu, date, desc }: { title: string; lieu?: string; date?: string; desc?: string }) {
  return (
    <div className="mb-4 pb-4 border-b border-border last:mb-0 last:pb-0 last:border-b-0">
      <div className="font-semibold text-sm">{title}</div>
      {lieu && <div className="text-sm text-primary font-medium mt-0.5"><i className="fa-solid fa-location-dot mr-1 text-xs" aria-hidden="true" />{lieu}</div>}
      {date && <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full mt-1"><i className="fa-regular fa-calendar mr-1" aria-hidden="true" />{date}</span>}
      {desc && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>}
    </div>
  );
}

function CvContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
        {/* Sidebar */}
        <AnimatedSection>
          <div className="bg-navy rounded-2xl p-6 lg:sticky lg:top-24 border border-primary/15">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-rose mx-auto mb-4 flex items-center justify-center shadow-lg border-2 border-gold/30">
              <LordIcon src={LORD_ICONS.avatar} size={48} colors="primary:#ffffff,secondary:#FFD700" trigger="loop" />
            </div>
            <h2 className="font-display text-xl font-bold text-navy-foreground text-center mb-1">{sidebarInfo.name}</h2>
            <p className="text-center text-gold text-xs tracking-widest uppercase font-medium mb-6">{sidebarInfo.title}</p>

            <div className="space-y-1 mb-6">
              <p className="text-gold text-[10px] tracking-widest uppercase font-bold border-b border-gold/20 pb-1 mb-2"><i className="fa-solid fa-address-card mr-1" aria-hidden="true" />Contact</p>
              {sidebarInfo.contact.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-navy-foreground/70 text-sm">
                  <span className="w-6 h-6 rounded-md bg-gold/10 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 text-gold"><i className={c.icon} aria-hidden="true" /></span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-gold text-[10px] tracking-widest uppercase font-bold border-b border-gold/20 pb-1 mb-2"><i className="fa-solid fa-star mr-1" aria-hidden="true" />Compétences</p>
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
            <CvSection title="Formation Académique" sectionKey="formation">
              {formations.map((f, i) => <CvEntry key={i} title={f.title} lieu={f.lieu} date={f.date} desc={f.desc} />)}
            </CvSection>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <CvSection title="Expérience Professionnelle" sectionKey="experience">
              {parcours.map((p, i) => <CvEntry key={i} title={p.title} lieu={p.lieu} date={p.date} desc={p.desc} />)}
            </CvSection>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <CvSection title="Publications Scientifiques" sectionKey="publications">
              {publications.map((p, i) => <CvEntry key={i} title={p.title} desc={p.desc} />)}
            </CvSection>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <CvSection title="Communications & Conférences" sectionKey="communications">
              {communications.map((c, i) => <CvEntry key={i} title={c.title} desc={c.desc} />)}
            </CvSection>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <CvSection title="Formations & Certifications" sectionKey="certifications">
              {certifications.map((c, i) => <CvEntry key={i} title={c.title} lieu={c.lieu} date={c.date} />)}
            </CvSection>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <CvSection title="Activités Administratives & Organisationnelles" sectionKey="admin">
              <ul className="space-y-2 pl-1">
                {admin.map((a, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                    <i className="fa-solid fa-check text-primary text-xs mt-1" aria-hidden="true" /> {a}
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
          <CvSection title="Langues" sectionKey="langues">
            {langues.map((l, i) => <CvEntry key={i} title={`${l.flag} ${l.lang}`} desc={l.level} />)}
          </CvSection>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <CvSection title="Associations" sectionKey="associations">
            {associations.map((a, i) => <CvEntry key={i} title={a.name} desc={a.role} />)}
          </CvSection>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default function CvPage() {
  const [activeTab, setActiveTab] = useState("cv");

  return (
    <div>
      {/* Sub-tab navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap gap-2 mb-2 p-3 bg-card rounded-2xl border border-border shadow-card">
          {cvTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2",
                activeTab === tab.id
                  ? tab.color === "gold"
                    ? "bg-gold text-gold-foreground shadow-md"
                    : "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <LordIcon
                src={tab.lordicon}
                size={20}
                colors={activeTab === tab.id ? "primary:#ffffff,secondary:#ffffff" : "primary:#6b7280,secondary:#9ca3af"}
              />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "cv" && <CvContent />}
      {activeTab === "pfe" && <PfePage />}
    </div>
  );
}
