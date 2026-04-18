import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import UnifiedProcessTimeline from '../components/UnifiedProcessTimeline';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import PriceCalculator from '../components/PriceCalculator';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://i.postimg.cc/W1CPSS8Q/IMG-6708.jpg",
    "https://i.postimg.cc/wvmnYbd1/IMG-6609.jpg",
    "https://i.postimg.cc/8cchL0B4/IMG-3746.avif"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col bg-white">
      <SEO 
        title="Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"
      />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {slides.map((slide, index) => (
            <div
              key={slide}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center pt-32 pb-20">
          <h1 className="flex flex-col items-center leading-tight">
            <span className="block text-white text-[clamp(2.0rem,7vw,5rem)] font-normal uppercase tracking-[0.2em] mb-4">KESTÄVÄT</span>
            <span className="block text-[#D4AF37] text-[clamp(1.1rem,5vw,4rem)] font-semibold uppercase tracking-wide mb-8 text-center">EPOKSILATTIAT JA LATTIAPINNOITUKSET</span>
            <span className="block text-white text-[clamp(0.8rem,2.5vw,1.25rem)] font-medium tracking-normal opacity-100 capitalize text-center px-4">Ammattitaitoista Jälkeä Pohjoisesta Koko Suomeen</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
            <Link
              to="/laskuri"
              className="bg-[#D4AF37] hover:bg-[#AA8B2E] text-white px-12 py-5 rounded-full text-sm font-semibold uppercase tracking-[0.15em] transition-all hover:translate-y-[-2px] active:scale-95 shadow-lg shadow-[#D4AF37]/20"
            >
              Laske hinta-arvio
            </Link>
            <Link
              to="/yhteystiedot"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-12 py-5 rounded-full text-sm font-semibold uppercase tracking-[0.15em] transition-all hover:translate-y-[-2px] active:scale-95"
            >
              Ota yhteyttä
            </Link>
          </div>
        </div>
      </section>

      <section className="py-48 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-[#00001C] tracking-tight">Miksi valita epoksi?</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Vanha Betoni */}
            <div className="bg-[#00001C] p-12 rounded-[3rem] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-[#A13A33] opacity-[0.1]">
                <span className="material-icons-outlined text-9xl">warning</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#A13A33] mb-10 flex items-center gap-4 tracking-tight">
                <span className="material-icons-outlined opacity-60">error_outline</span>
                Käsittelemätön betoni
              </h3>
              <ul className="space-y-8">
                {[
                  { t: "Pölyää jatkuvasti", d: "Betonipöly on haitallista hengitykselle ja sotkee tilat." },
                  { t: "Imee öljyt ja lian", d: "Huokoinen pinta on mahdoton puhdistaa täysin." },
                  { t: "Halkeilee ja murenee", d: "Kosteus ja pakkanen vaurioittavat pintaa nopeasti." },
                  { t: "Hauras ja epätasainen", d: "Kuluu kovan käytön ja nastarenkaiden alla." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="text-[#A13A33] font-medium text-xl">✕</span>
                    <div>
                      <h4 className="font-semibold text-white text-base mb-2">{item.t}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* RAILO Pinnoite */}
            <div className="bg-[#00001C] p-12 rounded-[3rem] border border-[#D4AF37]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-[#2D572C] opacity-[0.15]">
                <span className="material-icons-outlined text-9xl">task_alt</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#2D572C] mb-10 flex items-center gap-4 tracking-tight">
                <span className="material-icons-outlined">verified</span>
                Railo-pinnoite
              </h3>
              <ul className="space-y-8">
                {[
                  { t: "Täysin pölytön", d: "Tiivis pinta sitoo betonin ja parantaa ilmanlaatua." },
                  { t: "Helppo puhdistaa", d: "Öljyt ja kemikaalit pyyhkiytyvät pois vaivatta." },
                  { t: "Äärimmäinen kesto", d: "Kestää kovaa mekaanista kulutusta ja nastoja." },
                  { t: "Upea ulkonäkö", d: "Lisää tilan arvoa ja viihtyisyyttä välittömästi." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="text-[#2D572C] font-medium text-xl">✓</span>
                    <div>
                      <h4 className="font-semibold text-white text-base mb-2">{item.t}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Slider */}
      <section className="py-48 bg-white border-t border-[#00001C]/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-[#00001C] tracking-tight">Meidän palvelumme</h2>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/palvelut" className="text-[#D4AF37] hover:text-[#00001C] transition-colors flex items-center gap-3 font-semibold uppercase tracking-widest text-xs group">
                Kaikki palvelut
                <span className="material-icons-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-10 pb-12 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {/* Railo - Pölynsidonta */}
            <Link to="/palvelut" className="flex-none w-[300px] md:w-[380px] group relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-[#00001C]/5 bg-white transition-all hover:scale-[1.02]">
              <img src="https://i.postimg.cc/xjhHtT2X/Image-15-2-2026-at-11-21.png" alt="Railo - Pölynsidonta" className="w-full h-full object-cover" />
              <div className="absolute inset-x-6 bottom-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-[#00001C] p-8 rounded-[2rem] shadow-2xl shadow-black/40 border border-white/10">
                  <h3 className="text-xl font-semibold text-white tracking-tight leading-tight mb-2">Railo - Pölynsidonta</h3>
                  <p className="text-[#D4AF37] text-[10px] font-semibold uppercase tracking-widest">Kustannustehokas suojaus</p>
                </div>
              </div>
            </Link>

            {/* Railo - Keskikova Kulutus */}
            <Link to="/palvelut" className="flex-none w-[300px] md:w-[380px] group relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-[#00001C]/5 bg-white transition-all hover:scale-[1.02]">
              <img src="https://i.postimg.cc/1XJG3DT1/Image-15-2-2026-at-11-05.png" alt="Railo - Keskikova Kulutus" className="w-full h-full object-cover" />
              <div className="absolute inset-x-6 bottom-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-[#00001C] p-8 rounded-[2rem] shadow-2xl shadow-black/40 border border-white/10">
                  <h3 className="text-xl font-semibold text-white tracking-tight leading-tight mb-2">Railo - Keskikova Kulutus</h3>
                  <p className="text-[#D4AF37] text-[10px] font-semibold uppercase tracking-widest">Viimeistelty ja kestävä pinta</p>
                </div>
              </div>
            </Link>

            {/* Railo - Kova Kulutus */}
            <Link to="/palvelut" className="flex-none w-[300px] md:w-[380px] group relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-[#00001C]/5 bg-white transition-all hover:scale-[1.02]">
              <img src="https://i.postimg.cc/BbR1jgY2/IMG_6704.jpg" alt="Railo - Kova Kulutus" className="w-full h-full object-cover" />
              <div className="absolute inset-x-6 bottom-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-[#00001C] p-8 rounded-[2rem] shadow-2xl shadow-black/40 border border-white/10">
                  <h3 className="text-xl font-semibold text-white tracking-tight leading-tight mb-2">Railo - Kova Kulutus</h3>
                  <p className="text-[#D4AF37] text-[10px] font-semibold uppercase tracking-widest">Äärimmäistä kestävyyttä</p>
                </div>
              </div>
            </Link>

            {/* Railo - Custom-Lattiat */}
            <Link to="/palvelut" className="flex-none w-[300px] md:w-[380px] group relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-[#00001C]/5 bg-white transition-all hover:scale-[1.02]">
              <img src="https://i.postimg.cc/SNXRswJc/Image-15-2-2026-at-11-45.png" alt="Railo - Custom-Lattiat" className="w-full h-full object-cover" />
              <div className="absolute inset-x-6 bottom-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-[#00001C] p-8 rounded-[2rem] shadow-2xl shadow-black/40 border border-white/10">
                  <h3 className="text-xl font-semibold text-white tracking-tight leading-tight mb-2">Railo - Custom-Lattiat</h3>
                  <p className="text-[#D4AF37] text-[10px] font-semibold uppercase tracking-widest">Yksilöllinen ja näyttävä design</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <UnifiedProcessTimeline />

      {/* Final CTA Section */}
      <section className="py-64 bg-white overflow-hidden relative border-y border-[#00001C]/5 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.postimg.cc/BbR1jgY2/IMG_6704.jpg"
            alt="Valmis muuttamaan lattiasi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-semibold text-white mb-16 tracking-tight">Valmis muuttamaan lattiasi?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/yhteystiedot" className="inline-block bg-[#D4AF37] hover:bg-[#AA8B2E] text-white px-16 py-6 rounded-full text-lg font-semibold uppercase tracking-widest transition-all shadow-xl shadow-[#D4AF37]/20 hover:translate-y-[-2px]">
              Lähetä tarjouspyyntö
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;