import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  const services = [
    {
      title: "RAILO BASIC – Kustannustehokas ja siisti",
      subtitle: "Sileä epoksimaalaus",
      description: "Paras valinta tavalliseen autotalliin tai varastoon, kun haluat eroon betonipölystä ja lian imeytymisestä nopeasti ja edullisesti. Railo Basic on ohutkalvopinnoite, joka muuttaa raa'an, huokoisen betonin sileäksi ja helposti siivottavaksi pinnaksi. Se asennetaan kahdella kerroksella korkealaatuista epoksimaalia, ja se kestää hienosti normaalia henkilöautoliikennettä sekä talven mukana tulevia sulamisvesiä.",
      usage: "Kotitalouksien autotallit, varastot, tekniset tilat ja taloyhtiöiden pyörävarastot.",
      icon: "check_circle",
      badge: "Kustannustehokas",
      image: "https://i.postimg.cc/1XJG3DT1/Image-15-2-2026-at-11-05.png",
      features: [
        { icon: "palette", text: "Yksivärinen & Sileä" },
        { icon: "shield", text: "Öljyn & Kemikaalien kesto" },
        { icon: "cleaning_services", text: "Helppo ylläpito" }
      ]
    },
    {
      title: "RAILO PREMIUM – Näyttävä ja kestävä",
      subtitle: "Mosaiikkihiutalelattia",
      description: "Myyntimenestyksemme! Täydellinen valinta, kun autotalli toimii myös harrastetilana tai kun haluat kotiisi markkinoiden tyylikkäimmän ja helppohoitoisimman lattian. Railo Premium on hiutalelattia, jossa sileän värimassan päälle sirotellaan mosaiikkihiutaleita. Lopuksi pinta kapseloidaan kirkkaalla, erittäin kestävällä pintalakalla. Lopputulos on upea, kivimäinen ja hieman teksturoitu. Kirjava pinta antaa loistavasti anteeksi likaa ja pölyä – talli näyttää aina siistiltä.",
      usage: "Vaativat autotallit, 'Man Cavet', harraste- ja verstastilat sekä näyttelytilat.",
      icon: "stars",
      badge: "Myyntimenestys",
      image: "https://i.postimg.cc/SNXRswJc/Image-15-2-2026-at-11-45.png",
      features: [
        { icon: "layers", text: "3-kerroksinen rakenne" },
        { icon: "texture", text: "Kitkaa ilman liukkautta" },
        { icon: "diamond", text: "Naarmuuntumisen kesto" }
      ]
    },
    {
      title: "RAILO HEAVY DUTY – Raskaan sarjan kesto",
      subtitle: "Paksu epoksipinnoite",
      description: "Kun lattialta vaaditaan maksimaalista iskunkestoa ja mekaanista rasitusta. Tämä on oikea valinta korjaamoihin tai tiloihin, joissa käytetään nastarenkaita tai liikutellaan raskaita taakkoja. Railo Heavy Duty tehdään paksulla epoksipinnoitteella. Toisin kuin pelkkä maalattu lattia, tämä on paksu, 'lasimainen' kerros, joka kestää todella kovaa kulutusta. Pinta on oletuksena täysin sileä, mutta siihen voidaan lisätä karhennus (esim. kvartsihiekka).",
      usage: "Autokorjaamot ja fiksaamot, teollisuushallit, konevarastot ja vaativat korjaamotilat.",
      icon: "construction",
      badge: "Äärimmäinen kesto",
      image: "https://i.postimg.cc/xjhHtT2X/Image-15-2-2026-at-11-21.png",
      features: [
        { icon: "bolt", text: "Iskunkestävä kalvo (>0,5mm)" },
        { icon: "science", text: "Liuottimien & Öljyn sieto" },
        { icon: "group_work", text: "Valinnainen liukueste" }
      ]
    }
  ];

  return (
    <div className="pt-20">
      <SEO 
        title="Autotallin Pinnoitus ja Teollisuuslattiat | Railo Oy"
        description="Laadukkaat pinnoitustyöt autotalleihin, kotiin ja teollisuuteen. Palvelemme Oulun seudulla ja Pohjois-Suomessa. Pyydä tarjous!"
      />
      {/* Header Section */}
      <section className="relative py-40 overflow-hidden text-glow">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block py-2 px-5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
            RAILO Ratkaisut
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-10 uppercase italic leading-tight">
            KESTÄVÄT <span className="text-primary italic">LATTIARATKAISUT</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-400 leading-relaxed font-bold italic tracking-normal mb-10">
            Valitse tilaasi sopiva pinnoite. Kaikki ratkaisumme ovat saumattomia, pölyämättömiä ja helppoja pitää puhtaana. Asennamme lattiat laadukkailla ja testatuilla <span className="text-white">Tikkurilan Temafloor</span>-tuotteilla, jotta voimme taata kestävän lopputuloksen.
          </p>
          <div className="max-w-xl mx-auto p-6 rounded-[2rem] bg-primary/5 border border-primary/10 backdrop-blur-sm">
            <p className="text-primary font-black uppercase tracking-widest text-xs italic">
              Muista hyödyntää kotitalousvähennys! Yksityisasiakkaana saat verotuksessa tuntuvan edun asennustyön osuudesta.
            </p>
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-24 max-w-7xl mx-auto px-4 space-y-48 pb-60">
        {services.map((service, idx) => (
          <div key={idx} className="group relative">
            <div className={`grid lg:grid-cols-2 gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`relative aspect-video rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/70 to-transparent"></div>
              </div>
              <div className={`flex flex-col justify-center ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-xl shadow-primary/10">
                    <span className="material-icons-outlined text-4xl">{service.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic">{service.badge}</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-3 uppercase tracking-tight italic leading-tight">
                  {service.title}
                </h2>
                <h3 className="text-xl text-primary font-bold uppercase italic mb-8 tracking-widest">{service.subtitle}</h3>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed italic tracking-normal">
                  {service.description}
                </p>
                <div className="mb-12 p-6 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 italic">Sopii parhaiten:</p>
                  <p className="text-slate-300 font-bold italic">{service.usage}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex flex-col items-center gap-4 p-6 rounded-[2rem] bg-white/5 border border-white/5 group-hover:border-primary/30 transition-all shadow-xl text-center">
                      <span className="material-icons-outlined text-primary text-3xl">{feat.icon}</span>
                      <span className="text-slate-200 font-bold uppercase tracking-wider text-[10px]">{feat.text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/yhteystiedot"
                  className="inline-flex items-center justify-center px-14 py-6 bg-primary hover:bg-secondary text-white rounded-2xl font-bold uppercase tracking-widest transition-all shadow-2xl shadow-primary/30 w-full sm:w-max active:scale-95 italic"
                >
                  Pyydä ilmainen arvio
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Services;