import React from 'react';
import PriceCalculator from '../components/PriceCalculator';
import SEO from '../components/SEO';

const CalculatorPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-white">
      <SEO />
      <section className="py-32 max-w-4xl mx-auto px-4 pb-60">
        <div className="text-center mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#00001C] tracking-tight mb-8">Laske hinta-arvio</h1>
          <p className="text-[#00001C]/60 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Syötä kohteesi tiedot ja saat välittömän arvion toteutuksesta.
          </p>
        </div>
        <PriceCalculator />
      </section>
    </div>
  );
};

export default CalculatorPage;