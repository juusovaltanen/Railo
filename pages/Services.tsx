import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  const services = [
    {
      title: "Railo Pölynsidonta",
      subtitle: "Kustannustehokas suojaus",
      description: "Tämä on helpoin ja edullisin tapa laittaa loppu betonin jatkuvalle pölyämiselle. Pölynsidontamaalaus sopii parhaiten pienen kulutuksen kohteisiin. Me pinnoitamme lattiasi laadukkailla Tikkurilan tuotteilla. Pölynsidonta voidaan toteuttaa kirkkaalla tai sävytetyllä pinnoitteella. Värisävyjä on tarjolla yli 200 kpl.",
      usage: "Varastot, Kellarit",
      icon: "cleaning_services",
      badge: "Kustannustehokas",
      image: "https://i.postimg.cc/xjhHtT2X/Image-15-2-2026-at-11-21.png",
      features: [
        { icon: "auto_awesome", text: "Pölytön pinta" },
        { icon: "savings", text: "Edullinen hinta" },
        { icon: "speed", text: "Nopea asennus" }
      ]
    },
    {
      title: "Railo Keskikova Kulutus",
      subtitle: "Viimeistelty ja kestävä pinta",
      description: "Kun haluat autotalliin tai varastoon siistin, värillisen ja kestävän pinnan, tämä on oikea valinta. Railo Keskikulutus sopii parhaiten normaalin arjen ja harrastamisen rasittamiin kohteisiin. Me pinnoitamme lattiasi laadukkailla Tikkurilan epoksi- tai polyuretaanituotteilla. Pinnoite antaa loistavan suojan likaa ja öljyjä vastaan, ja värisävyjä on tarjolla yli 200 kpl.",
      usage: "Varastot, Verstaat, Autotallit, Tuotantotilat, Kellarit, Pyörävarastot",
      icon: "layers",
      badge: "Suosittu valinta",
      image: "https://i.postimg.cc/1XJG3DT1/Image-15-2-2026-at-11-05.png",
      features: [
        { icon: "palette", text: "Värillinen pinta" },
        { icon: "shield", text: "Kemikaalien kesto" },
        { icon: "cleaning_services", text: "Helppo puhdistus" }
      ]
    },
    {
      title: "Railo Kova Kulutus",
      subtitle: "Äärimmäistä kestävyyttä",
      description: "Kun lattiasta ei voi tehdä kompromisseja, tämä on meidän kestävin ratkaisu. Railo Kovakulutus -massapinnoite sopii parhaiten raskaan kaluston talleihin, pesuhalleihin ja teollisuustiloihin. Me asennamme lattiaasi laadukkaan, erikoishiekalla vahvistetun Tikkurilan epoksimassan-tai polyuretaanituotteilla. Ne kestävät erinomaisesti nastarenkaita, iskuja ja kemikaaleja. Pinta voidaan tarvittaessa karhentaa turvalliseksi.",
      usage: "Autotallit, Korjaamot, Teollisuustilat, Tuotantotilat.",
      icon: "verified",
      badge: "Paras hinta-laatu",
      image: "https://i.postimg.cc/BbR1jgY2/IMG_6704.jpg",
      features: [
        { icon: "diamond", text: "Mekaaninen kesto" },
        { icon: "tire_repair", text: "Nastarenkaiden kesto" },
        { icon: "history", text: "Pitkä elinikä" }
      ]
    },
    {
      title: "Railo Custom-Lattiat",
      subtitle: "Yksilöllinen ja näyttävä design",
      description: "Kun haluat lattiastasi todellisen katseenvangitsijan, me toteutamme sen toiveidesi mukaan. Custom-lattiat sopivat parhaiten edustustiloihin, myymälöihin, miesluoliin (man cave) ja premium-tason autotalleihin. Me luomme täysin uniikin ilmeen laadukkailla Tikkurilan tuotteilla hyödyntäen esimerkiksi tyylikkäitä Mosaic-hiutaleita tai useampia värisävyjä käyttäen. Lopputulos on täysin saumaton, kestävä ja juuri sinun näköisesi tila.",
      usage: "Autotallit, Sisätilat, Varastot, Showroomit, Miesluolat.",
      icon: "auto_awesome",
      badge: "Uniikki ja näyttävä",
      image: "https://i.postimg.cc/SNXRswJc/Image-15-2-2026-at-11-45.png",
      features: [
        { icon: "brush", text: "Vapaa värivalinta" },
        { icon: "auto_fix_high", text: "Erikoistehosteet" },
        { icon: "shield", text: "Kestävä" }
      ]
    }
  ];

  return (
    <div className="pt-20">
      <SEO 
        title="Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"
      />
      {/* Header Section */}
      <section className="relative py-40 overflow-hidden text-glow">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tight mb-10 uppercase italic leading-tight">
            KESTÄVÄT <span className="text-primary italic">LATTIARATKAISUT</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-400 leading-relaxed font-bold italic tracking-normal mb-10">
            Valitse tilaasi sopiva pinnoite. Kaikki ratkaisumme ovat saumattomia, pölyämättömiä ja helppoja pitää puhtaana. Asennamme lattiat laadukkailla ja testatuilla <span className="text-white">Tikkurilan tuotteilla</span>, jotta voimme taata kestävän lopputuloksen.
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
                  alt={`${service.title} - Autotallin lattiapinnoitus`}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 img-brighten"
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