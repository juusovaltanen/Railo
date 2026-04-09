import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-background-dark font-sans selection:bg-primary/30">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/palvelut" element={<Services />} />
            <Route path="/laskuri" element={<CalculatorPage />} />
            <Route path="/referenssit" element={<References />} />
            <Route path="/ukk" element={<FAQ />} />
            <Route path="/yhteystiedot" element={<Contact />} />
            <Route path="/blogi" element={<Blog />} />
            <Route path="/meista" element={<About />} />
            <Route path="/tietosuoja" element={<PrivacyPolicy />} />
            <Route path="/kayttoehdot" element={<TermsOfUse />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;