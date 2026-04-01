import React from 'react';
import PriceCalculator from '../components/PriceCalculator';
import SEO from '../components/SEO';

const CalculatorPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <SEO 
        title="Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"
      />
      <section className="py-24 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4 block italic">Hinnasto</span>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic mb-6">Laske hinta-arvio</h1>
          <p className="text-slate-400 text-xl font-bold italic tracking-normal max-w-2xl mx-auto">
            Syötä kohteesi tiedot ja saat välittömän arvion toteutuksesta.
          </p>
        </div>
        <PriceCalculator />
      </section>
    </div>
  );
};

export default CalculatorPage;