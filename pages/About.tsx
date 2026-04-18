import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <div className="pt-20 bg-white min-h-screen">
      <SEO 
        title="Meistä | Railo Pinnoitus - Pohjoista osaamista."
        description="Lue Railon tarina. Teollisuustason epoksilattiat autotalleihin ja koteihin ammattitaidolla."
      />
      
      <section className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title Outside the box */}
          <div className="mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-[#00001C] tracking-tight leading-tight">
              Teollisuustason kestävyyttä <br/>
              <span className="text-[#D4AF37]">kaikkien saataville.</span>
            </h1>
          </div>

          <div className="bg-[#00001C] rounded-[4rem] p-8 md:p-16 lg:p-24 shadow-2xl shadow-black/20 border border-white/5 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(212,175,55,0.05),transparent)] pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
              
              {/* Left Column: Text Content */}
              <div className="order-2 lg:order-1">
                <div className="space-y-6 text-white/80 text-lg leading-relaxed font-normal">
                  <p>
                    Idea Railosta syntyi teollisuushallityömaalla, jossa olimme itse asentamassa epoksipinnoitetta. 
                    Huomasimme, ettei tällaista kestävyyttä ja laatua tarjottu helposti tavallisiin kotitalleihin tai autotalleihin. 
                    Me olemme kolme nuorta kaveria Oulun seudulta, ja halusimme tuoda teollisuustason ratkaisut kaikkien saataville varastoista autotalleihin.
                  </p>
                  <p>
                    Selvitimme perusteellisesti, mitkä epoksi- ja polyuretaanipinnoitteet toimivat parhaiten pohjoisen vaihtelevissa olosuhteissa. 
                    Koska meillä on vahva tausta betonitöistä, ymmärrämme, että pinnoite on tasan niin hyvä kuin sen alla oleva pohja. 
                    Siksi hoidamme hionnat ja tasoitukset viimeisen päälle.
                  </p>
                  <p>
                    Teemme lattiapinnoituksesta helppoa: autamme sinua valitsemaan juuri oikean ratkaisun, jotta saat pölyttömän ja kestävän lattian ilman turhaa päänvaivaa. 
                    Meille jokainen kotitalli on yhtä tärkeä kuin suuri teollisuushalli.
                  </p>
                </div>

                <div className="mt-16 p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="text-white font-medium mb-6">Haluatko kerralla kestävän lattian?</p>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      to="/laskuri" 
                      className="bg-[#D4AF37] hover:bg-[#AA8B2E] text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-widest transition-all shadow-lg shadow-[#D4AF37]/20"
                    >
                      Laske hinta-arvio
                    </Link>
                    <Link 
                      to="/yhteystiedot" 
                      className="border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-widest transition-all"
                    >
                      Ota yhteyttä
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Image Placeholder */}
              <div className="order-1 lg:order-2 aspect-[4/5] lg:aspect-auto lg:h-[600px] w-full bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent)] pointer-events-none"></div>
                <div className="text-center">
                  <span className="material-icons-outlined text-[#D4AF37] text-6xl mb-4 opacity-20 group-hover:opacity-40 transition-opacity">photo_camera</span>
                  <p className="text-[#D4AF37] font-semibold uppercase tracking-[0.2em] text-xs opacity-40 group-hover:opacity-60 transition-opacity">Kuva tulossa!</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
