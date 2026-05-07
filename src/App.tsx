import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import BlogListPage from "./pages/BlogListPage.tsx";
import BlogPostPage from "./pages/BlogPostPage.tsx";
import FAQsPage from "./pages/FAQsPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import CityPage from "./pages/CityPage.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import ServiceDetailPage from "./pages/ServiceDetailPage.tsx";
import ServiceRouter from "./pages/ServiceRouter.tsx";
import NotFound from "./pages/NotFound.tsx";

import SparePartsPage from "./pages/SparePartsPage.tsx";
import CustomerCarePage from "./pages/CustomerCarePage.tsx";
import TollFreePage from "./pages/TollFreePage.tsx";
import CareersPage from "./pages/CareersPage.tsx";
import LegalPages from "./pages/LegalPages.tsx";
import BrandPage from "./pages/BrandPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:param" element={<ServiceRouter />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Extended Footer Static Pages */}
            <Route path="/spare-parts" element={<SparePartsPage />} />
            <Route path="/ac-customer-care" element={<CustomerCarePage />} />
            <Route path="/toll-free-numbers" element={<TollFreePage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/terms" element={<LegalPages type="terms" />} />
            <Route path="/privacy-policy" element={<LegalPages type="privacy" />} />

            {/* Dynamic Brand SEO Pages */}
            <Route path="/brand/:brandSlug" element={<BrandPage />} />

            <Route path="/:citySlug" element={<CityPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButtons />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
