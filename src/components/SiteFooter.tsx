export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card py-8 px-4 text-center">
      <p className="text-sm text-muted-foreground">
        <i className="fa-regular fa-copyright mr-1" aria-hidden="true" /> 2026{" "}
        <span className="font-semibold text-foreground">Pr. Rkia EDDABRA</span>{" "}
        — <i className="fa-solid fa-chalkboard-user mr-1" aria-hidden="true" />Plateforme Pédagogique Personnelle
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        <i className="fa-solid fa-user-graduate mr-1" aria-hidden="true" />Maître de Conférence Habilité · <i className="fa-solid fa-building-columns mr-1" aria-hidden="true" />ISPITS Agadir · Université Ibn Zohr, Agadir, Maroc. Tous droits réservés.
      </p>
    </footer>
  );
}
