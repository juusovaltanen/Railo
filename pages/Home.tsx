import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <SEO 
        title="Kestävät Epoksilattiat ja Lattiapinnoitus | Railo Oy"
        description="Kestävät epoksilattiat kotiin ja teollisuuteen ammattitaidolla. Palvelemme Oulun seudulla ja koko Pohjois-Suomessa. Laske hinta laskurilla!"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.postimg.cc/VLgsGKyX/Image-15-2-2026-at-10-40.png"
            alt="Epoksilattian asennus käynnissä"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark/40 to-background-dark"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block py-1.5 px-5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-10">
            Premium Pinnoituspalvelu
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white mb-10 tracking-tight leading-none text-glow uppercase italic">
            RAILO <span className="block md:inline text-primary">EPOKSILATTIAT</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
            <Link
              to="/yhteystiedot"
              className="bg-primary hover:bg-secondary text-white px-14 py-6 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all shadow-2xl shadow-primary/30 hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95 italic"
            >
              Pyydä tarjous
              <span className="material-icons-outlined">arrow_forward</span>
            </Link>
            <Link
              to="/laskuri"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-14 py-6 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all backdrop-blur-sm active:scale-95 italic"
            >
              Laske hinta-arvio
            </Link>
          </div>
          <div className="mt-12 max-w-lg mx-auto p-5 rounded-2xl bg-white/5 border border-primary/20 backdrop-blur-md">
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
            <h2 className="text-5xl font-black text-white uppercase italic tracking-tight">Miksi valita epoksi?</h2>
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

      {/* Short About Us Summary */}
      <section className="py-32 bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 grayscale">
          <img 
            src="https://i.postimg.cc/tTsDBgsg/Tiimi.jpg" 
            alt="Team Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4 block italic">Tarina</span>
          <h2 className="text-5xl font-black text-white uppercase italic tracking-tight mb-10">Paikalliset Tekijät</h2>
          <p className="text-xl text-slate-400 font-bold leading-relaxed italic mb-12 tracking-normal">
            RAILO on kolmen liminkalaisen kaveruksen yritys. Meitä yhdistää halu tehdä Suomen parhaita lattioita rehdillä meiningillä ja tinkimättömällä laadulla.
          </p>
          <Link to="/meista" className="text-primary font-bold uppercase tracking-widest text-sm hover:text-white transition-colors border-b-2 border-primary pb-1 group italic">
            Lue koko tarina
            <span className="material-icons-outlined ml-2 text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-32 bg-background-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4 block italic">Palvelut</span>
              <h2 className="text-6xl font-black text-white tracking-tight uppercase italic">Mitä me teemme</h2>
            </div>
            <Link to="/palvelut" className="text-primary hover:text-white transition-colors flex items-center gap-3 font-bold uppercase tracking-widest text-sm group italic">
              Kaikki palvelut
              <span className="material-icons-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {/* RAILO BASIC */}
            <Link to="/palvelut" className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-surface-dark">
              <img src="https://i.postimg.cc/1XJG3DT1/Image-15-2-2026-at-11-05.png" alt="Railo Basic" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="transform translate-y-16 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="min-h-[2rem] flex items-center">
                    <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest inline-block italic">Kustannustehokas</span>
                  </div>
                  <div className="min-h-[4rem] flex items-center mb-2">
                    <h3 className="text-4xl font-black text-white uppercase tracking-tight italic">RAILO BASIC</h3>
                  </div>
                  <div className="min-h-[5rem]">
                    <p className="text-slate-200 text-sm font-bold italic leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Paras valinta tavalliseen autotalliin tai varastoon, kun haluat eroon betonipölystä ja lian imeytymisestä nopeasti ja edullisesti.
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* RAILO PREMIUM */}
            <Link to="/palvelut" className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-surface-dark">
              <img src="https://i.postimg.cc/SNXRswJc/Image-15-2-2026-at-11-45.png" alt="Railo Premium" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="transform translate-y-16 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="min-h-[2rem] flex items-center">
                    <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest inline-block italic">Myyntimenestys</span>
                  </div>
                  <div className="min-h-[4rem] flex items-center mb-2">
                    <h3 className="text-4xl font-black text-white uppercase tracking-tight italic">RAILO PREMIUM</h3>
                  </div>
                  <div className="min-h-[5rem]">
                    <p className="text-slate-200 text-sm font-bold italic leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Täydellinen valinta, kun autotalli toimii harrastetilana tai kun haluat kotiisi markkinoiden tyylikkäimmän ja helppohoitoisimman lattian.
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* RAILO HEAVY DUTY */}
            <Link to="/palvelut" className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-surface-dark">
              <img src="https://i.postimg.cc/xjhHtT2X/Image-15-2-2026-at-11-21.png" alt="Railo Heavy Duty" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="transform translate-y-16 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="min-h-[2rem] flex items-center">
                    <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest inline-block italic">Äärimmäinen kesto</span>
                  </div>
                  <div className="min-h-[4rem] flex items-center mb-2">
                    <h3 className="text-4xl font-black text-white uppercase tracking-tight italic">RAILO HEAVY DUTY</h3>
                  </div>
                  <div className="min-h-[5rem]">
                    <p className="text-slate-200 text-sm font-bold italic leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Kun lattialta vaaditaan maksimaalista iskunkestoa. Valinta korjaamoihin tai tiloihin, joissa käytetään nastarenkaita.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 bg-surface-dark overflow-hidden relative border-y border-white/5 text-center">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-10 tracking-tight uppercase italic">Valmis muuttamaan lattiasi?</h2>
          <p className="text-primary text-2xl mb-10 max-w-2xl mx-auto font-bold uppercase tracking-widest italic leading-relaxed">
            Muista hyödyntää kotitalousvähennys! Yksityisasiakkaana saat verotuksessa tuntuvan edun asennustyön osuudesta.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/yhteystiedot" className="inline-block bg-primary hover:bg-secondary text-white px-20 py-7 rounded-2xl text-xl font-bold uppercase tracking-widest transition-all shadow-2xl shadow-primary/40 active:scale-95 italic">
              Lähetä tarjouspyyntö
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;