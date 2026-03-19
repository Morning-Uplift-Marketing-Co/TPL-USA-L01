import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import APRComparison from './components/APRComparison';
import EligibleExpenses from './components/EligibleExpenses';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import StickyMobileCTA from './components/StickyMobileCTA';
import ApplyPage from './pages/ApplyPage';
import { config, applyTheme, getFontUrl } from './lib/fusionops';

type PageKey = 'about' | 'privacy' | 'terms' | 'disclosures' | 'licensing' | 'donotsell';

function useFusionOpsTheme() {
  useEffect(() => {
    applyTheme(config);

    const fontUrl = getFontUrl(config.fontId);
    const existing = document.querySelector(`link[data-fo-font]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      link.setAttribute('data-fo-font', 'true');
      document.head.appendChild(link);
    }
  }, []);
}

function HomePage() {
  const [legalPage, setLegalPage] = useState<PageKey | null>(null);

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main>
        <Hero onOpenLegal={(page) => setLegalPage(page)} />
        <StatsBar />
        <HowItWorks />
        <Features />
        <APRComparison />
        <EligibleExpenses />
        <Testimonials />
        <FAQ />
      </main>
      <Footer onOpenLegal={(page) => setLegalPage(page)} />
      {legalPage && (
        <LegalModal page={legalPage} onClose={() => setLegalPage(null)} />
      )}
      <StickyMobileCTA />
    </div>
  );
}

export default function App() {
  useFusionOpsTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apply" element={<ApplyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
