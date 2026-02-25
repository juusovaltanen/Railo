import React from 'react';
import { TeamMember } from '../types';

const About: React.FC = () => {
  const team: TeamMember[] = [
    {
      id: '1',
      name: 'Sakari Lumme',
      role: 'Toimitusjohtaja, Työnjohto ja laatu',
      specialty: 'Työnjohto & Laatu',
      description: 'Moro, mä oon Sakari. Opiskelen Turun yliopistossa käsityönopettajaksi ja toimin Railon toimitusjohtajana. Mulla on aiempaa yrittäjätaustaa ahkioiden valmistuksesta, joten laadukas käsityö ja materiaalien äärimmäinen kestävyys on tullut kantapään kautta tutuksi. Työmaalla vastaan työnjohdosta ja siitä, että hommat rullaa tasan niinkuin on asiakkaan kanssa sovittu. Olen aikamoinen perfektionisti viimeistelyn suhteen ja teen lopputarkastuksen aina sillä asenteella, että kelpaisiko tämä lattia omaan kotiini. Vapaa-ajalla mut löytää todennäköisimmin rinkan kanssa vaeltamasta tai kesäisin golfkentältä.',
      phone: '044 034 8088',
      email: 'railopinnoitus@gmail.com',
      image: 'https://i.postimg.cc/sXhcJnXV/Image-15-2-2026-at-12-15-(1).png',
    },
    {
      id: '2',
      name: 'Juuso Valtanen',
      role: 'Hallituksen puheenjohtaja, Myynti ja asiakkuudet',
      specialty: 'Myynti & Asiakkuudet',
      description: 'Terve, mä oon Juuso. Viimeistelen Vaasan yliopistossa kauppatieteiden maisteriopintoja rahoituksesta. Olen aiemmin toiminut metsäyrittäjänä ja opiskellut myös vaihdossa ulkomailla, mikä on tuonut hyvää kansainvälistä näkökulmaa tekemiseen. Railossa hoidan hallituksen puheenjohtajan pestiä ja vastaan meidän myynnistä sekä asiakkuuksista. Mun tärkein tehtävä on kuunnella mitä teidän tilaan oikeasti tarvitaan ja etsiä siihen paras ratkaisu matalalla kynnyksellä. Omat akut latautuu parhaiten urheilemalla, golfin parissa ja vaellusreiteillä.',
      phone: '044 034 8088',
      email: 'railopinnoitus@gmail.com',
      image: 'https://i.postimg.cc/k4p02YpH/Image-15-2-2026-at-12-19.jpg',
    },
    {
      id: '3',
      name: 'Luukas Leppäluoto',
      role: 'Varatoimitusjohtaja, Tekniikka ja pohjatyöt',
      specialty: 'Tekniikka & Pohjatyöt',
      description: 'Moro, mä oon Luukas ja toimin Railossa varatoimitusjohtajana. Mulla on kunnon käytännön tausta betonitöistä, joten betonilattioiden sielunelämä ja oikeaoppinen valmistelu on mulle todella tuttua hommaa. Hyvä epoksipintahan on tasan yhtä kestävä kuin sen alla oleva pohja. Olen tehnyt töitä myös ulkomailla, joten työnteosta löytyy sujuvaa kansainvälistä otetta. Railossa mun vastuulla on nimenomaan tekniikka ja vaativat pohjatyöt. Kun en ole hiomakoneen varressa, mut löytää yleensä urheilemasta tai golfkentältä.',
      phone: '044 034 8088',
      email: 'railopinnoitus@gmail.com',
      image: 'https://i.postimg.cc/SxSgp7Zz/Image-15-2-2026-at-12-15.png',
    }
  ];

  return (
    <div className="pt-20">
      <section className="py-32 max-w-7xl mx-auto px-4">
        <div className="mb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic mb-12">Tekijät pinnan takana</h1>
          <div className="max-w-4xl mx-auto space-y-8 text-slate-300 text-xl font-bold leading-relaxed italic tracking-normal">
            <p>Kolme liminkalaista kaverus ja yksi tavoite: tehdä Suomen kovimpia lattioita.</p>
            <p>Koko homma lähti liikkeelle ihan omilta kotipihoilta. Katseltiin, miten vanhempien autotallien ja paikallisten hallien betonilattiat murenivat ja pölisivät silmissä. Rehellisesti sanottuna nähtiin tässä samalla ihan puhtaasti loistava markkinarako: kunnon tekijöille ja kestäville pinnoitteille oli huutava pula. Tajuttiin, että teollisuustason epoksi on ainoa oikeasti järkevä ratkaisu näihin pohjoisen oloihin.</p>
            <p>Päätettiin tarttua toimeen ja perustaa Railo. Ei meitä kiinnosta korulauseet, vaan se, että hommat tehdään kerralla kuntoon. Meille rehti meininki tarkoittaa sitä, että kun lyödään kättä päälle hinnasta ja aikataulusta, ne pitävät tasan tarkkaan.</p>
          </div>
        </div>

        {/* Individual profiles grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {team.map(member => (
            <div key={member.id} className="group relative bg-surface-dark border border-white/5 hover:border-primary/40 rounded-[3rem] overflow-hidden transition-all duration-500 flex flex-col h-full shadow-2xl">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
              <div className="p-12 flex-grow flex flex-col">
                <h3 className="text-4xl font-black text-white mb-3 uppercase tracking-tighter italic">{member.name}</h3>
                <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-10 italic">{member.role}</p>
                <p className="text-slate-400 text-sm mb-12 leading-relaxed flex-grow italic tracking-normal">
                  {member.description}
                </p>
                <div className="pt-10 border-t border-white/5">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic">Asiantuntemus</p>
                   <p className="text-white font-bold uppercase tracking-wider text-sm mt-2">{member.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;