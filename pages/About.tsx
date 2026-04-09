import React from 'react';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <SEO 
        title="Meistä | Railo Pinnoitus"
        description="Lue lisää Railo Pinnoituksesta."
      />
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">Meistä</h1>
        </div>
      </section>
    </div>
  );
};

export default About;
