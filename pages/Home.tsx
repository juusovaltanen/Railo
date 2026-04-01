import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import UnifiedProcessTimeline from '../components/UnifiedProcessTimeline';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import PriceCalculator from '../components/PriceCalculator';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <SEO 
        title="Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.postimg.cc/wvmnYbd1/IMG-6609.jpg"
            alt="Epoksilattian timanttihionta autotallissa"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark/40 to-background-dark"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-black text-white mb-6 tracking-tight leading-none text-glow uppercase italic">
            <span className="block text-[7vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] mb-2">KESTÄVÄT</span>
            <span className="block text-primary text-[5.5vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] mb-2">EPOKSILATTIAT JA</span>
            <span className="block text-primary text-[5.5vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] whitespace-nowrap">LATTIAPINNOITUKSET</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-300 mb-10 tracking-tight uppercase italic break-words max-w-4xl mx-auto">
            Ammattitaitoista jälkeä Oulusta koko Suomeen
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
            <Link
              to="/yhteystiedot"
              className="bg-primary hover:bg-secondary text-white px-14 py-6 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all shadow-2xl shadow-primary/30 hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95 italic glow-gold"
            >
              Pyydä tarjous
              <span className="material-icons-outlined">arrow_forward</span>
            </Link>
            <Link
              to="/laskuri"
              className="bg-primary/10 hover:bg-primary/20 text-primary hover:text-white border border-primary/30 px-14 py-6 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all backdrop-blur-md active:scale-95 italic shadow-[0_0_30px_rgba(212,175,55,0.1)]"
            >
              Laske hinta-arvio
            </Link>
          </div>
          <div className="mt-12 max-w-lg mx-auto p-5 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.1)]">
            <p className="text-primary text-sm font-bold italic">
              Muista hyödyntää kotitalousvähennys! Yksityisasiakkaana saat verotuksessa tuntuvan edun asennustyön osuudesta.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section (Hyvät vs Huonot) */}
      <section className="py-32 bg-surface-dark/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4 block italic">Vertailu</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase italic tracking-tight break-words">Miksi valita epoksi?</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            {/* Vanha Betoni */}
            <div className="bg-background-dark p-10 rounded-[3rem] border border-red-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-red-500 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-icons-outlined text-9xl">warning</span>
              </div>
              <h3 className="text-3xl font-black text-red-500 uppercase italic mb-8 flex items-center gap-3 tracking-tight">
                <span className="material-icons-outlined">error_outline</span>
                Käsittelemätön Betoni
              </h3>
              <ul className="space-y-6">
                {[
                  { t: "Pölyää jatkuvasti", d: "Betonipöly on haitallista hengitykselle ja sotkee tilat." },
                  { t: "Imee öljyt ja lian", d: "Huokoinen pinta on mahdoton puhdistaa täysin." },
                  { t: "Halkeilee ja murenee", d: "Kosteus ja pakkanen vaurioittavat pintaa nopeasti." },
                  { t: "Hauras ja epätasainen", d: "Kuluu kovan käytön ja nastarenkaiden alla." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-red-500 font-bold">✕</span>
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm mb-1 tracking-wider">{item.t}</h4>
                      <p className="text-slate-500 text-sm font-medium tracking-normal">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* RAILO Pinnoite */}
            <div className="bg-background-dark p-10 rounded-[3rem] border border-primary/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-primary opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-icons-outlined text-9xl">task_alt</span>
              </div>
              <h3 className="text-3xl font-black text-primary uppercase italic mb-8 flex items-center gap-3 tracking-tight">
                <span className="material-icons-outlined">verified</span>
                RAILO Pinnoite
              </h3>
              <ul className="space-y-6">
                {[
                  { t: "Täysin pölytön", d: "Tiivis pinta sitoo betonin ja parantaa ilmanlaatua." },
                  { t: "Helppo puhdistaa", d: "Öljyt ja kemikaalit pyyhkiytyvät pois vaivatta." },
                  { t: "Äärimmäinen kesto", d: "Kestää kovaa mekaanista kulutusta ja nastoja." },
                  { t: "Upea ulkonäkö", d: "Lisää tilan arvoa ja viihtyisyyttä välittömästi." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-primary font-bold">✓</span>
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm mb-1 tracking-wider">{item.t}</h4>
                      <p className="text-slate-400 text-sm font-medium tracking-normal">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Slider */}
      <section className="py-32 bg-background-dark border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4 block italic">Palvelut</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic break-words">MEIDÄN PALVELUMME</h2>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/palvelut" className="text-primary hover:text-white transition-colors flex items-center gap-3 font-bold uppercase tracking-widest text-sm group italic">
                Kaikki palvelut
                <span className="material-icons-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-12 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {/* Railo Pölynsidonta */}
            <Link to="/palvelut" className="flex-none w-[280px] md:w-[350px] group relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-surface-dark">
              <img src="https://i.postimg.cc/1XJG3DT1/Image-15-2-2026-at-11-05.png" alt="Railo Pölynsidonta - Autotallin lattiapinnoitus" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="space-y-2">
                  <div className="min-h-[1.5rem] flex items-center">
                    <span className="bg-primary px-3 py-1 rounded-full text-[8px] font-bold text-white uppercase tracking-widest inline-block italic">Kustannustehokas</span>
                  </div>
                  <div className="min-h-[3rem] flex items-center">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight italic leading-tight">Railo Pölynsidonta</h3>
                  </div>
                  <div className="min-h-[4rem]">
                    <p className="text-slate-200 text-[10px] font-bold italic leading-relaxed">
                      Helpoin ja edullisin tapa laittaa loppu betonin jatkuvalle pölyämiselle.
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Railo 0,5 mm */}
            <Link to="/palvelut" className="flex-none w-[280px] md:w-[350px] group relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-surface-dark">
              <img src="https://i.postimg.cc/xjhHtT2X/Image-15-2-2026-at-11-21.png" alt="Railo 0,5 mm - Kestävä epoksilattia" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="space-y-2">
                  <div className="min-h-[1.5rem] flex items-center">
                    <span className="bg-primary px-3 py-1 rounded-full text-[8px] font-bold text-white uppercase tracking-widest inline-block italic">Ohutkalvopinnoite</span>
                  </div>
                  <div className="min-h-[3rem] flex items-center">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight italic leading-tight">Railo 0,5 mm</h3>
                  </div>
                  <div className="min-h-[4rem]">
                    <p className="text-slate-200 text-[10px] font-bold italic leading-relaxed">
                      Siisti, värillinen ja kestävä pinta autotalliin tai varastoon.
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Railo 1 mm */}
            <Link to="/palvelut" className="flex-none w-[280px] md:w-[350px] group relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-surface-dark">
              <img src="https://i.postimg.cc/BbR1jgY2/IMG-6704.jpg" alt="Railo 1 mm - Epoksilattian asennus Oulu" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="space-y-2">
                  <div className="min-h-[1.5rem] flex items-center">
                    <span className="bg-primary px-3 py-1 rounded-full text-[8px] font-bold text-white uppercase tracking-widest inline-block italic">Suosituin</span>
                  </div>
                  <div className="min-h-[3rem] flex items-center">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight italic leading-tight">Railo 1 mm</h3>
                  </div>
                  <div className="min-h-[4rem]">
                    <p className="text-slate-200 text-[10px] font-bold italic leading-relaxed">
                      Vahvistettu pinnoite hiekalla. Kestää nastarenkaat.
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Railo 2 mm */}
            <Link to="/palvelut" className="flex-none w-[280px] md:w-[350px] group relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-surface-dark">
              <img src="https://i.postimg.cc/V6mMFxvL/IMG_5312.jpg" alt="Railo 2 mm - Teollisuuden lattiapinnoitus" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="space-y-2">
                  <div className="min-h-[1.5rem] flex items-center">
                    <span className="bg-primary px-3 py-1 rounded-full text-[8px] font-bold text-white uppercase tracking-widest inline-block italic">Kovaan käyttöön</span>
                  </div>
                  <div className="min-h-[3rem] flex items-center">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight italic leading-tight">Railo 2 mm</h3>
                  </div>
                  <div className="min-h-[4rem]">
                    <p className="text-slate-200 text-[10px] font-bold italic leading-relaxed">
                      Järein ratkaisu raskaaseen käyttöön ja korjaamoihin.
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Railo Custom */}
            <Link to="/palvelut" className="flex-none w-[280px] md:w-[350px] group relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-surface-dark">
              <img src="https://i.postimg.cc/SNXRswJc/Image-15-2-2026-at-11-45.png" alt="Railo Custom - Yksilöllinen epoksilattia" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="space-y-2">
                  <div className="min-h-[1.5rem] flex items-center">
                    <span className="bg-primary px-3 py-1 rounded-full text-[8px] font-bold text-white uppercase tracking-widest inline-block italic">Näyttävä</span>
                  </div>
                  <div className="min-h-[3rem] flex items-center">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight italic leading-tight">Railo Custom</h3>
                  </div>
                  <div className="min-h-[4rem]">
                    <p className="text-slate-200 text-[10px] font-bold italic leading-relaxed">
                      Yksilöllinen toteutus toiveidesi mukaan. Uniikki design.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <UnifiedProcessTimeline />

      {/* Calculator Section */}
      <section className="py-24 px-4 relative overflow-hidden bg-background-dark">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4 block italic">Hinnasto</span>
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic mb-6 break-words">Laske hinta-arvio</h2>
          </div>
          <PriceCalculator />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 bg-surface-dark overflow-hidden relative border-y border-white/5 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.postimg.cc/SKP2dk7n/IMG-6700.jpg"
            alt="Valmis muuttamaan lattiasi"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/90 via-surface-dark/40 to-surface-dark/90"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-10 tracking-tight uppercase italic break-words">Valmis muuttamaan lattiasi?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/yhteystiedot" className="inline-block bg-primary hover:bg-secondary text-white px-20 py-7 rounded-2xl text-xl font-bold uppercase tracking-widest transition-all shadow-2xl shadow-primary/30 active:scale-95 italic glow-gold">
              Lähetä tarjouspyyntö
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;