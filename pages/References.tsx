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
    service: 'Railo - Kova Kulutus (1 mm)',
    material: 'Epoksi',
    description: 'Toteutimme Oulussa 40m² autotallin täydellisen lattiapäivityksen. Projekti aloitettiin huolellisella lattian hionnalla, jolla varmistettiin optimaalinen tartunta. Pintaan asennettiin kestävä ja tyylikäs Railo - Kova Kulutus -epoksilattia, joka antaa tallille upean ulkonäön lisäksi erinomaisen suojan mekaanista kulutusta ja nastarenkaita vastaan.'
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
    service: 'Railo - Kova Kulutus',
    material: 'Epoksi',
    description: 'Oulussa sijaitsevan varastohallin lattia sai uuden elämän järeällä Railo - Kova Kulutus -massalattialla. Tämä pinnoite on suunniteltu kestämään äärimmäistä mekaanista rasitusta ja raskasta kalustoa. Lopputuloksena on saumaton, helposti puhdistettava ja teollisuuskäyttöön täydellisesti soveltuva kestävä pinta.'
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
    <div className="pt-20 min-h-screen bg-white">
      <SEO 
        title="Referenssit | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Tutustu Railo Pinnoituksen toteuttamiin kohteisiin. Teemme lattiapinnoitukset tinkimättömällä ammattitaidolla autotalleista teollisuushalleihin."
      />
      
      <section className="py-32 max-w-7xl mx-auto px-4 pb-60">
        <div className="text-center mb-24">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-[#00001C] mb-8 tracking-tight">Työmme jälki puhuu <span className="text-[#D4AF37]">puolestaan</span></h1>
          <p className="max-w-3xl mx-auto text-[#00001C]/60 text-base sm:text-lg font-medium leading-relaxed">
            Tutustu toteuttamiimme kohteisiin. Teemme lattiapinnoitukset tinkimättömällä ammattitaidolla autotalleista teollisuushalleihin Pohjois-Suomessa.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {references.map(ref => (
            <div 
              key={ref.id} 
              onClick={() => openModal(ref)}
              className="bg-[#00001C] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl shadow-black/20 cursor-pointer group transition-all hover:border-[#D4AF37]/30"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={ref.mainImage} 
                  alt={ref.title} 
                  className="w-full h-full object-cover object-[center_75%] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-semibold text-white mb-6 tracking-tight group-hover:text-[#D4AF37] transition-colors">{ref.title}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="material-icons-outlined text-[#D4AF37] text-sm">square_foot</span>
                    <span className="text-white/40 font-medium text-xs tracking-widest uppercase">{ref.size}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="material-icons-outlined text-[#D4AF37] text-sm">location_on</span>
                    <span className="text-white/40 font-medium text-xs tracking-widest uppercase">{ref.location}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="material-icons-outlined text-[#D4AF37] text-sm">layers</span>
                    <span className="text-white/40 font-medium text-xs tracking-widest uppercase">{ref.service}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedRef && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#00001C]/95 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-[2rem] border border-[#D4AF37]/20 shadow-2xl overflow-hidden relative flex flex-col md:flex-row my-auto">
            
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#D4AF37] hover:text-white hover:bg-[#D4AF37] transition-colors border border-[#D4AF37]/30"
            >
              <span className="material-icons-outlined">close</span>
            </button>

            {/* Image Gallery Section */}
            <div className="w-full md:w-1/2 bg-[#00001C]/5 flex flex-col">
              <div className="aspect-[4/3] w-full relative">
                <img 
                  src={selectedRef.additionalImages[activeImageIndex] || selectedRef.mainImage} 
                  alt={selectedRef.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              {selectedRef.additionalImages.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide bg-[#00001C]/10">
                  {selectedRef.additionalImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`flex-none w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-[#D4AF37] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#00001C] mb-8 tracking-tight">{selectedRef.title}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-[#00001C] p-5 rounded-2xl border border-white/5 shadow-lg">
                  <p className="text-[#D4AF37] text-[10px] font-semibold uppercase tracking-widest mb-2">Koko</p>
                  <p className="text-white font-semibold">{selectedRef.size}</p>
                </div>
                <div className="bg-[#00001C] p-5 rounded-2xl border border-white/5 shadow-lg">
                  <p className="text-[#D4AF37] text-[10px] font-semibold uppercase tracking-widest mb-2">Sijainti</p>
                  <p className="text-white font-semibold">{selectedRef.location}</p>
                </div>
                <div className="bg-[#00001C] p-5 rounded-2xl border border-white/5 shadow-lg">
                  <p className="text-[#D4AF37] text-[10px] font-semibold uppercase tracking-widest mb-2">Palvelu</p>
                  <p className="text-white font-semibold">{selectedRef.service}</p>
                </div>
                <div className="bg-[#00001C] p-5 rounded-2xl border border-white/5 shadow-lg">
                  <p className="text-[#D4AF37] text-[10px] font-semibold uppercase tracking-widest mb-2">Materiaali</p>
                  <p className="text-white font-semibold">{selectedRef.material}</p>
                </div>
              </div>

              <div className="flex-grow">
                <h4 className="text-[#D4AF37] font-semibold uppercase tracking-widest text-[10px] mb-4">Projektin kuvaus</h4>
                <p className="text-[#00001C]/70 leading-relaxed text-base">
                  {selectedRef.description}
                </p>
              </div>

              <div className="mt-12 pt-10 border-t border-[#00001C]/5">
                <Link 
                  to="/yhteystiedot" 
                  onClick={closeModal}
                  className="w-full py-6 rounded-full bg-[#D4AF37] text-white font-semibold uppercase tracking-widest hover:bg-[#AA8B2E] transition-all flex items-center justify-center gap-4 group shadow-xl shadow-[#D4AF37]/20"
                >
                  Haluatko samanlaisen?
                  <span className="material-icons-outlined text-xl group-hover:translate-x-2 transition-transform">east</span>
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