import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      let robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'noindex, nofollow');
      } else {
        robotsMeta = document.createElement('meta');
        (robotsMeta as HTMLMetaElement).name = 'robots';
        (robotsMeta as HTMLMetaElement).content = 'noindex, nofollow';
        document.head.appendChild(robotsMeta);
      }
    }
  }, []);

  return (
    <div className="pt-24 min-h-[80vh] flex items-center justify-center bg-white px-4">
      <SEO 
        title="Sivua ei löytynyt (404) | Railo Pinnoitus"
        description="Etsimääsi sivua ei löytynyt. Palaa takaisin etusivulle tai laske hinta-arvio lattiapinnoituksellesi."
      />
      <div className="max-w-xl text-center py-20">
        <span className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37] block mb-4">Virhe 404</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#00001C] tracking-tight mb-6">
          Sivua ei löytynyt
        </h1>
        <p className="text-[#00001C]/60 text-lg font-medium leading-relaxed mb-10">
          Hakemaasi sivua ei ole olemassa tai se on saattanut siirtyä uuteen osoitteeseen.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#00001C] hover:bg-[#00001C]/90 text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all"
          >
            Palaa etusivulle
          </Link>
          <Link
            to="/laskuri"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#AA8B2E] text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all shadow-lg shadow-[#D4AF37]/20"
          >
            Laske hinta-arvio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
