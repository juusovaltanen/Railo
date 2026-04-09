import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Kauanko epoksilattian asennus kestää?",
      answer: "Railon pojat hoitavat homman yleensä 1–2 päivässä. Oulun alueella liikumme nopeasti, ja tehokas asennusprosessimme varmistaa, että autotallin pinnoitus tai varaston lattia on nopeasti taas käytössäsi. Lattialla voi kävellä jo vuorokauden kuluttua, mutta raskaampaa kuormitusta suosittelemme vasta viikon päästä."
    },
    {
      question: "Onko epoksilattia liukas märkänä?",
      answer: "Ei hätää, teemme lattiasta turvallisen. Suosittelemamme hiutalelattia on kestävä ja siinä on luonnostaan hyvä pito. Jos kyseessä on esimerkiksi autotallin pinnoitus, voimme lisätä pintaan karheutta, jotta se ei ole liukas edes lumisilla renkailla."
    },
    {
      question: "Paljonko epoksilattia maksaa neliöltä?",
      answer: (
        <>
          Hinta riippuu pohjatöistä ja valitusta pinnoitteesta, mutta yleensä liikutaan 30–80 €/m² välillä. Paras tapa selvittää tarkka hinta on käyttää meidän{' '}
          <Link to="/laskuri" className="text-primary hover:underline font-bold">
            hintalaskuriamme
          </Link>
          . Muista, että työn osuudesta saa tuntuvan kotitalousvähennyksen, mikä tekee investoinnista entistä järkevämmän.
        </>
      )
    },
    {
      question: "Miten epoksilattiaa huolletaan ja puhdistetaan?",
      answer: "Epoksilattia on erittäin kestävä ja helppohoitoinen. Saumaton pinta ei imeytä likaa, joten pelkkä moppaus miedolla pesuaineella riittää. Oulun ankarat talvet ja tiesuola eivät tätä pintaa hätkäytä, kunhan irtolika pyyhkäistään välillä pois."
    },
    {
      question: "Miksi pohjatyöt ovat tärkeitä epoksilattian asennuksessa?",
      answer: (
        <>
          Lattia on vain niin hyvä kuin sen pohja. Railon pojat käyttävät timanttihiontaa ja tarvittaessa jyrsintää, jotta pinnoite tarttuu betoniin täydellisesti. Huolelliset pohjatyöt takaavat, että lopputulos on kestävä ja näyttävä vuosikymmeniä. Katso arvio kokonaiskustannuksista{' '}
          <Link to="/laskuri" className="text-primary hover:underline font-bold">
            laskurillamme
          </Link>
          .
        </>
      )
    },
    {
      question: "Saako epoksilattian asennuksesta kotitalousvähennystä?",
      answer: "Kyllä vain! Epoksilattian asennus kotiin tai vapaa-ajan asunnolle oikeuttaa kotitalousvähennykseen työn osuudesta. Tämä säästää sinulta pitkän pennin. Meiltä saat aina selkeän erittelyn työn ja materiaalien osuudesta verotusta varten."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-20">
      <SEO 
        title="Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"
      />
      <section className="py-32 max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic">UKK</h1>
          <p className="text-slate-400 text-lg font-bold italic tracking-normal">
            Vastauksia yleisimpiin kysymyksiin epoksilattioista.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-surface-dark rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl transition-all hover:border-primary/30">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-8 text-left"
              >
                <h3 className={`text-xl font-bold uppercase tracking-tight transition-colors italic ${openIndex === idx ? 'text-primary' : 'text-white'}`}>
                  {faq.question}
                </h3>
                <span className={`material-icons-outlined transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-primary' : 'text-slate-500'}`}>
                  expand_more
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-8 pt-0 border-t border-white/5 mt-0">
                  <div className="text-slate-400 leading-relaxed italic pt-8 text-sm tracking-normal">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 rounded-[3rem] bg-white/5 border border-white/5 text-center shadow-2xl">
          <h3 className="text-2xl font-black text-white uppercase italic mb-4 tracking-tight">Etkö löytänyt vastausta?</h3>
          <p className="text-slate-400 mb-10 font-bold uppercase tracking-widest text-xs italic">Olemme täällä auttamassa. Kysy meiltä suoraan!</p>
          <Link 
            to="/yhteystiedot" 
            className="inline-flex items-center gap-4 bg-primary hover:bg-secondary text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest transition-all shadow-xl shadow-primary/30 active:scale-95 italic"
          >
            Ota yhteyttä
            <span className="material-icons-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQ;