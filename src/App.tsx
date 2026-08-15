import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SecurityProvider } from "./contexts/SecurityContext";
import { Suspense, lazy, useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PublicSiteSeo from "./components/PublicSiteSeo";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieConsentBanner from "./components/CookieConsentBanner";
import { SEO_CITY_SERVICE_PAGES, SEO_LOCATION_PAGES, SEO_SERVICE_PAGES } from "@/lib/publicSeoPages";

const PerformanceMonitor = lazy(() => import("./components/PerformanceMonitor"));

const DeferredPerformanceMonitor = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enable, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(enable, 2500);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <PerformanceMonitor />
    </Suspense>
  );
};

// Lazy load heavy components for better performance
const Booking = lazy(() => import("./pages/Booking"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const PrivacyDataRequestPage = lazy(() => import("./pages/PrivacyDataRequestPage"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
// New SEO pages
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const SpareParts = lazy(() => import("./pages/SpareParts"));
const Warranty = lazy(() => import("./pages/Warranty"));
const PublicPdfAuthenticityPage = lazy(() => import("./pages/PublicPdfAuthenticityPage"));
const PublicJobReviewPage = lazy(() => import("./pages/PublicJobReviewPage"));
const TechnicianIdCard = lazy(() => import("./pages/TechnicianIdCard"));
const PayUpi = lazy(() => import("./pages/PayUpi"));

// Loading component for lazy-loaded routes
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex justify-center space-x-1">
      <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
      <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
    </div>
  </div>
);

// Optimized QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SecurityProvider>
        <TooltipProvider>
          <DeferredPerformanceMonitor />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PublicSiteSeo />
            <GoogleAnalytics />
            <CookieConsentBanner />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/book" element={<Booking />} />
                <Route path="/booking" element={<Navigate to="/book" replace />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/privacy-request" element={<PrivacyDataRequestPage />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />

                {/* Public website pages */}
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/service-areas" element={<ServiceAreas />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogArticle />} />
                <Route path="/spare-parts" element={<SpareParts />} />
                <Route path="/warranty" element={<Warranty />} />
                <Route path="/authenticity" element={<PublicPdfAuthenticityPage />} />
                <Route path="/review/:token" element={<PublicJobReviewPage />} />

                {/* Public technician ID card (QR links from admin settings) */}
                <Route path="/technician-id/:id" element={<TechnicianIdCard />} />

                {/* Public UPI pay landing (WhatsApp pay links) */}
                <Route path="/p/:code" element={<PayUpi />} />
                <Route path="/pay-upi" element={<PayUpi />} />

                {/* Search route - return 404 */}
                <Route path="/search" element={<NotFound />} />

                {SEO_CITY_SERVICE_PAGES.map(({ path }) => (
                  <Route key={path} path={path} element={<Services />} />
                ))}

                {SEO_SERVICE_PAGES.map(({ path }) => (
                  <Route key={path} path={path} element={<Services />} />
                ))}

                {SEO_LOCATION_PAGES.map(({ path }) => (
                  <Route key={path} path={path} element={<ServiceAreas />} />
                ))}

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </SecurityProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
