import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  const services = [
    {
      title: "Railo - Pölynsidonta",
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
      title: "Railo - Keskikova Kulutus",
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
      title: "Railo - Kova Kulutus",
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
      title: "Railo - Custom-Lattiat",
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
    <div className="pt-20 bg-white">
      <SEO 
        title="Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"
      />
      {/* Header Section */}
      <section className="relative py-48 overflow-hidden bg-[#00001C]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight mb-8 leading-tight">
            Kestävät <span className="text-[#D4AF37]">lattiaratkaisut</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-white/70 leading-relaxed font-medium tracking-normal mb-12">
            Valitse tilaasi sopiva pinnoite. Kaikki ratkaisumme ovat saumattomia, pölyämättömiä ja helppoja pitää puhtaana. Asennamme lattiat laadukkailla ja testatuilla <span className="text-white">Tikkurilan tuotteilla</span>, jotta voimme taata kestävän lopputuloksen.
          </p>
          <div className="max-w-xl mx-auto p-8 rounded-[2rem] bg-[#D4AF37]/5 border border-[#D4AF37]/10 backdrop-blur-sm">
            <p className="text-[#D4AF37] font-semibold text-xs tracking-wider">
              Muista hyödyntää kotitalousvähennys! Yksityisasiakkaana saat verotuksessa tuntuvan edun asennustyön osuudesta.
            </p>
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-48 max-w-7xl mx-auto px-4 space-y-64 pb-80">
        {services.map((service, idx) => (
          <div key={idx} className="group relative">
            <div className={`grid lg:grid-cols-2 gap-24 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`relative aspect-video rounded-[3.5rem] overflow-hidden shadow-2xl border border-[#00001C]/5 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-[center_80%] transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className={`flex flex-col justify-center ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-6 mb-10">
                  <div className="p-4 rounded-2xl bg-[#D4AF37]/5 text-[#D4AF37]">
                    <span className="material-icons-outlined text-4xl">{service.icon}</span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#00001C]/40">{service.badge}</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-semibold text-[#00001C] mb-4 tracking-tight leading-tight">
                  {service.title}
                </h2>
                <h3 className="text-lg text-[#D4AF37] font-semibold mb-10 tracking-widest uppercase">{service.subtitle}</h3>
                <p className="text-[#00001C]/70 text-lg mb-10 leading-relaxed">
                  {service.description}
                </p>
                <div className="mb-12 p-8 rounded-2xl bg-[#00001C] border border-white/5 shadow-xl">
                  <p className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em] mb-3">Sopii parhaiten:</p>
                  <p className="text-white font-semibold">{service.usage}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex flex-col items-center gap-4 p-6 rounded-[2rem] bg-[#00001C] border border-white/5 transition-all shadow-2xl shadow-black/20 text-center">
                      <span className="material-icons-outlined text-[#D4AF37] text-3xl">{feat.icon}</span>
                      <span className="text-white font-semibold tracking-wider text-[10px] uppercase">{feat.text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/yhteystiedot"
                  className="inline-flex items-center justify-center px-14 py-6 bg-[#D4AF37] hover:bg-[#AA8B2E] text-white rounded-full font-semibold uppercase tracking-widest transition-all shadow-xl shadow-[#D4AF37]/20 w-full sm:w-max active:scale-95"
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