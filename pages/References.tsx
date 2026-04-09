import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface Reference {
  id: string;
  title: string;
  mainImage: string;
  additionalImages: string[];
  size: string;
  location: string;
  service: string;
  material: string;
  description: string;
}

const references: Reference[] = [
  {
    id: '1',
    title: 'Autotalli',
    mainImage: 'https://i.postimg.cc/BbR1jgY2/IMG_6704.jpg',
    additionalImages: [
      'https://i.postimg.cc/8cchL0B4/IMG-3746.avif',
      'https://i.postimg.cc/BbR1jgY2/IMG_6704.jpg'
    ],
    size: '40 m²',
    location: 'Liminka',
    service: 'Railo Kova Kulutus (1 mm)',
    material: 'Epoksi',
    description: 'Toteutimme Oulussa 40m² autotallin täydellisen lattiapäivityksen. Projekti aloitettiin huolellisella lattian hionnalla, jolla varmistettiin optimaalinen tartunta. Pintaan asennettiin kestävä ja tyylikäs Railo Kova Kulutus -epoksilattia, joka antaa tallille upean ulkonäön lisäksi erinomaisen suojan mekaanista kulutusta ja nastarenkaita vastaan.'
  },
  {
    id: '2',
    title: 'Varastohalli',
    mainImage: 'https://i.postimg.cc/V6mMFxvL/IMG_5312.jpg',
    additionalImages: [
      'https://i.postimg.cc/tR50DWS1/Gemini-Generated-Image-av6b1zav6b1zav6b.png',
      'https://i.postimg.cc/V6mMFxvL/IMG_5312.jpg'
    ],
    size: '400 m²',
    location: 'Liminka',
    service: 'Railo Kova Kulutus',
    material: 'Epoksi',
    description: 'Oulussa sijaitsevan varastohallin lattia sai uuden elämän järeällä Railo Kova Kulutus -massalattialla. Tämä pinnoite on suunniteltu kestämään äärimmäistä mekaanista rasitusta ja raskasta kalustoa. Lopputuloksena on saumaton, helposti puhdistettava ja teollisuuskäyttöön täydellisesti soveltuva kestävä pinta.'
  }
];

const References: React.FC = () => {
  const [selectedRef, setSelectedRef] = useState<Reference | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedRef) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedRef]);

  const openModal = (ref: Reference) => {
    setSelectedRef(ref);
    setActiveImageIndex(0);
  };

  const closeModal = () => {
    setSelectedRef(null);
  };

  return (
    <div className="pt-20 min-h-screen">
      <SEO 
        title="Referenssit | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Tutustu Railo Pinnoituksen toteuttamiin kohteisiin. Teemme lattiapinnoitukset tinkimättömällä ammattitaidolla autotalleista teollisuushalleihin."
      />
      
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">Työmme jälki puhuu <span className="text-primary">puolestaan</span></h1>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg font-bold italic tracking-normal">
            Tutustu toteuttamiimme kohteisiin. Teemme lattiapinnoitukset tinkimättömällä ammattitaidolla autotalleista teollisuushalleihin Pohjois-Suomessa.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {references.map(ref => (
            <div 
              key={ref.id} 
              onClick={() => openModal(ref)}
              className="bg-surface-dark rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl cursor-pointer group transition-all hover:border-primary/50 hover:shadow-primary/10"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={ref.mainImage} 
                  alt={ref.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 img-brighten"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic group-hover:text-primary transition-colors">{ref.title}</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="material-icons-outlined text-primary text-sm">square_foot</span>
                    <span className="text-white font-bold text-sm tracking-widest uppercase">{ref.size}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-icons-outlined text-primary text-sm">location_on</span>
                    <span className="text-white font-bold text-sm tracking-widest uppercase">{ref.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-icons-outlined text-primary text-sm">layers</span>
                    <span className="text-white font-bold text-sm tracking-widest uppercase">{ref.service}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-icons-outlined text-primary text-sm">science</span>
                    <span className="text-white font-bold text-sm tracking-widest uppercase">Materiaali: {ref.material}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedRef && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background-dark/95 backdrop-blur-sm overflow-y-auto">
          <div className="bg-surface-dark w-full max-w-5xl rounded-[2rem] border border-primary/20 shadow-2xl overflow-hidden relative flex flex-col md:flex-row my-auto">
            
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-background-dark/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:text-white hover:bg-primary transition-colors border border-primary/30"
            >
              <span className="material-icons-outlined">close</span>
            </button>

            {/* Image Gallery Section */}
            <div className="w-full md:w-1/2 bg-background-dark flex flex-col">
              <div className="aspect-[4/3] w-full relative">
                <img 
                  src={selectedRef.additionalImages[activeImageIndex] || selectedRef.mainImage} 
                  alt={selectedRef.title} 
                  className="w-full h-full object-cover img-brighten"
                />
              </div>
              
              {/* Thumbnails */}
              {selectedRef.additionalImages.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide bg-surface-darker">
                  {selectedRef.additionalImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`flex-none w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover img-brighten" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tighter italic">{selectedRef.title}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-background-dark p-4 rounded-2xl border border-white/5">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Koko</p>
                  <p className="text-white font-bold">{selectedRef.size}</p>
                </div>
                <div className="bg-background-dark p-4 rounded-2xl border border-white/5">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Sijainti</p>
                  <p className="text-white font-bold">{selectedRef.location}</p>
                </div>
                <div className="bg-background-dark p-4 rounded-2xl border border-white/5">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Palvelu</p>
                  <p className="text-white font-bold">{selectedRef.service}</p>
                </div>
                <div className="bg-background-dark p-4 rounded-2xl border border-white/5">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Materiaali</p>
                  <p className="text-white font-bold">{selectedRef.material}</p>
                </div>
              </div>

              <div className="flex-grow">
                <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-3 italic">Projektin kuvaus</h4>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {selectedRef.description}
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <Link 
                  to="/yhteystiedot" 
                  onClick={closeModal}
                  className="w-full py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:bg-secondary transition-all flex items-center justify-center gap-3 group italic shadow-lg shadow-primary/20"
                >
                  Haluatko samanlaisen?
                  <span className="material-icons-outlined text-xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default References;