import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { id: "accueil", label: "Accueil", faIcon: "fa-solid fa-house" },
  { id: "licence", label: "Licence", faIcon: "fa-solid fa-graduation-cap" },
  { id: "master", label: "Master", faIcon: "fa-solid fa-award" },
  { id: "pfe", label: "PFE & Travaux", faIcon: "fa-solid fa-folder-open" },
  { id: "cv", label: "CV", faIcon: "fa-solid fa-user-tie" },
];

interface SiteHeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function SiteHeader({ activePage, onNavigate }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <button onClick={() => handleNav("accueil")} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-md">
            RE
          </div>
          <div className="hidden sm:block">
            <div className="font-display font-bold text-foreground text-sm leading-tight">Pr. Rkia EDDABRA</div>
            <div className="text-[11px] text-muted-foreground tracking-widest uppercase">ISPITS Agadir · MCH</div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={cn(
                "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                activePage === item.id
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <i className={`${item.faIcon} text-xs`} aria-hidden="true" />
              {item.label}
              {activePage === item.id && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-wrap gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5",
                activePage === item.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <i className={`${item.faIcon} text-xs`} aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
