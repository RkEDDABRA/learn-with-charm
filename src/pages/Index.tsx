import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  const { pathname } = useLocation();
  const activePage =
    pathname === "/" ? "accueil" :
    pathname.startsWith("/licence") ? "licence" :
    pathname.startsWith("/master") ? "master" :
    pathname.startsWith("/cv") ? "cv" : "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader activePage={activePage} />
      <main className="flex-1"><Outlet /></main>
      <SiteFooter />
    </div>
  );
};

export default Index;
