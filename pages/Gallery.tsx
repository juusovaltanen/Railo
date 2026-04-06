import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import SEO from '../components/SEO';
import { ServiceCard } from '../types';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('Kaikki');

  const categories = ['Kaikki', 'Autotallit', 'Teollisuus'];

  const projects: ServiceCard[] = [
    {
      id: '1',
      title: 'Autotalli Liminka',
      category: 'Autotallit',
      location: 'Liminka',
      description: 'Toteutimme Limingassa 40m² autotallin täydellisen lattiapäivityksen. Projekti aloitettiin huolellisella lattian hionnalla, jolla varmistettiin optimaalinen tartunta. Pintaan asennettiin kestävä ja tyylikäs Railo 1 mm -epoksilattia, joka antaa tallille upean ulkonäön lisäksi erinomaisen suojan mekaanista kulutusta ja nastarenkaita vastaan.',
      tags: [],
      imageBefore: 'https://i.postimg.cc/8cchL0B4/IMG-3746.avif',
      imageAfter: 'https://i.postimg.cc/BbR1jgY2/IMG-6704.jpg',
    },
    {
      id: '2',
      title: 'Varastohalli Liminka',
      category: 'Teollisuus',
      location: 'Liminka',
      description: 'Limingassa sijaitsevan varastohallin lattia sai uuden elämän järeällä Railo 2 mm -massalattialla. Tämä pinnoite on suunniteltu kestämään äärimmäistä mekaanista rasitusta ja raskasta kalustoa. Lopputuloksena on saumaton, helposti puhdistettava ja teollisuuskäyttöön täydellisesti soveltuva kestävä pinta.',
      tags: [],
      imageBefore: 'https://i.postimg.cc/tR50DWS1/Gemini-Generated-Image-av6b1zav6b1zav6b.png',
      imageAfter: 'https://i.postimg.cc/V6mMFxvL/IMG_5312.jpg',
    }
  ];

  const filteredProjects = filter === 'Kaikki'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-20">
      <SEO 
        title="Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"
      />
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">Työmme jälki puhuu <span className="text-primary">puolestaan</span></h1>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg font-bold italic tracking-normal">
            Tutustu toteuttamiimme kohteisiin. Teemme lattiapinnoitukset tinkimättömällä ammattitaidolla autotalleista teollisuushalleihin Pohjois-Suomessa.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all border uppercase tracking-widest ${filter === cat ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-dark border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-surface-dark rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl flex flex-col group">
              <BeforeAfterSlider before={project.imageBefore} after={project.imageAfter} isStatic={true} />
              <div className="p-10 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter italic">{project.title}</h3>
                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest">{project.category} • {project.location}</p>
                  </div>
                </div>
                <p className="text-slate-400 mb-10 leading-relaxed text-sm italic tracking-normal">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-xl bg-background-dark text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-800">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to="/yhteystiedot" className="w-full py-5 rounded-2xl border border-primary/20 bg-primary/5 text-primary font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3 group italic">
                  Haluatko samanlaisen?
                  <span className="material-icons-outlined text-xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-surface-dark border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-6xl font-black text-white mb-3 italic tracking-tighter">2v</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 italic text-glow">Takuu</p>
            </div>
            <div>
              <p className="text-6xl font-black text-white mb-3 italic tracking-tighter">100%</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 italic text-glow">Kotimainen</p>
            </div>
            <div>
              <p className="text-6xl font-black text-white mb-3 italic tracking-tighter">24h</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 italic text-glow">Vastausaika</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;