import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import LeadChatWidget from './components/LeadChatWidget';
import Home from './pages/Home';
import Services from './pages/Services';
import References from './pages/References';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CalculatorPage from './pages/CalculatorPage';
import NotFound from './pages/NotFound';

const ScrollToTopAndTrack: React.FC = () => {
  const { pathname } = useLocation();
  const isFirstLoad = React.useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);

      // Facebook Pixel PageView kerran per reitinvaihto (ohitetaan ensilataus, jonka index.html jo kirjaa)
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
      } else if (typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === 'function') {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'PageView');
      }
    }
  }, [pathname]);
  return null;
};

export const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTopAndTrack />
      <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-primary/30">
        <Navbar />
        <BookingModal />
        <LeadChatWidget />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/palvelut" element={<Services />} />
            <Route path="/laskuri" element={<CalculatorPage />} />
            <Route path="/referenssit" element={<References />} />
            <Route path="/ukk" element={<FAQ />} />
            <Route path="/yhteystiedot" element={<Contact />} />
            <Route path="/blogi" element={<Blog />} />
            <Route path="/blogi/:slug" element={<Blog />} />
            <Route path="/meista" element={<About />} />
            <Route path="/tietosuoja" element={<PrivacyPolicy />} />
            <Route path="/kayttoehdot" element={<TermsOfUse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;