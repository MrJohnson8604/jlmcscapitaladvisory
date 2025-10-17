import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Your Page Imports
import Index from "./pages/Index";
import RealEstateFinancing from "./pages/RealEstateFinancing";
import BusinessWorkingCapital from "./pages/BusinessWorkingCapital";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import ReferDeal from "./pages/ReferDeal";
import FormSettings from "./pages/FormSettings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ToolLandingPage from "./pages/ToolLandingPage";
import CalculatorPage from "./pages/CalculatorPage";

// Your Component Imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";
import ScrollToTop from "./components/ScrollToTop"; // <-- 1. IMPORT THE NEW COMPONENT

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* 2. WRAP YOUR ENTIRE LAYOUT WITH THE SCROLLTOTOP COMPONENT */}
        <ScrollToTop>
          <div className="min-h-screen flex flex-col">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/real-estate-financing" element={<RealEstateFinancing />} />
                <Route path="/business-working-capital" element={<BusinessWorkingCapital />} />
                <Route path="/about" element={<About />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/refer-deal" element={<ReferDeal />} />
                <Route path="/form-settings" element={<FormSettings />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Tool Routes */}
                <Route path="/resources/roi-calculator" element={<ToolLandingPage />} />
                <Route path="/tools/roi-calculator" element={<CalculatorPage />} />

                {/* Catch-all Not Found Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ScrollToTop>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

