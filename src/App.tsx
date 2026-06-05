import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index.tsx"));
const AccueilPage = lazy(() => import("./pages/AccueilPage.tsx"));
const LicencePage = lazy(() => import("./pages/LicencePage.tsx"));
const MasterPage = lazy(() => import("./pages/MasterPage.tsx"));
const CvPage = lazy(() => import("./pages/CvPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const Loading = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "1.2rem", color: "#666" }}>
    Chargement...
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Index />}>
              <Route path="/" element={<AccueilPage />} />
              <Route path="/cv" element={<CvPage />} />
              <Route path="/licence" element={<LicencePage />} />
              <Route path="/licence/sage-femme" element={<LicencePage />} />
              <Route path="/licence/dietetique" element={<LicencePage />} />
              <Route path="/master" element={<MasterPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
