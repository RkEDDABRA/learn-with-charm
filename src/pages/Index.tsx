import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AccueilPage from "@/pages/AccueilPage";
import LicencePage from "@/pages/LicencePage";
import MasterPage from "@/pages/MasterPage";
import PfePage from "@/pages/PfePage";
import CvPage from "@/pages/CvPage";

const Index = () => {
  const [activePage, setActivePage] = useState("accueil");

  const renderPage = () => {
    switch (activePage) {
      case "accueil":
        return <AccueilPage onNavigate={setActivePage} />;
      case "licence":
        return <LicencePage />;
      case "master":
        return <MasterPage />;
      case "cv":
        return <CvPage />;
      default:
        return <AccueilPage onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1">{renderPage()}</main>
      <SiteFooter />
    </div>
  );
};

export default Index;
