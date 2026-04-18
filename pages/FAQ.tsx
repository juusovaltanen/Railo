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
    },
    {
      question: "Mitä eroa on epoksilla ja polyuretaanilla?",
      answer: (
        <>
          <p className="mb-4">
            Epoksi on äärimmäisen kova ja mekaanista kulutusta kestävä pinnoite. Se on paras valinta autotalleihin ja halleihin, joissa lattiaan kohdistuu kovaa hankausta, painoa tai kemikaaleja. Epoksi antaa lasimaisen kovan ja helposti puhdistettavan pinnan.
          </p>
          <p className="mb-8">
            Polyuretaani on materiaali, joka on epoksia joustavampi ja elastisempi. Se kestää paremmin iskuja ja suuria lämpötilan vaihteluita halkeilematta. Polyuretaani on myös UV-suojattu, eli se ei kellastu auringonvalossa, ja se tuntuu jalalle hieman pehmeämmältä sekä hiljaisemmalta.
          </p>
          <div className="flex justify-start">
            <Link 
              to="/blogi?id=3" 
              className="inline-flex items-center gap-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all border border-[#D4AF37]/20"
            >
              Lue lisää
              <span className="material-icons-outlined text-sm">east</span>
            </Link>
          </div>
        </>
      )
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-20 bg-white">
      <SEO 
        title="Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"
      />
      <section className="py-32 max-w-3xl mx-auto px-4">
        <div className="text-center mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#00001C] mb-8 tracking-tight">Usein kysytyt kysymykset</h1>
          <p className="text-[#00001C]/60 text-lg font-medium leading-relaxed">
            Vastauksia yleisimpiin kysymyksiin epoksilattioista.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#00001C] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl shadow-black/20 transition-all hover:border-[#D4AF37]/30">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-10 text-left"
              >
                <h3 className={`text-xl font-semibold tracking-tight transition-colors ${openIndex === idx ? 'text-[#D4AF37]' : 'text-white'}`}>
                  {faq.question}
                </h3>
                <span className={`material-icons-outlined transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-[#D4AF37]' : 'text-white/40'}`}>
                  expand_more
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-10 pt-0 border-t border-white/5">
                  <div className="text-white/70 leading-relaxed pt-10 text-base">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-16 rounded-[4rem] bg-[#00001C] border border-white/5 text-center shadow-2xl shadow-black/30">
          <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">Etkö löytänyt vastausta?</h3>
          <p className="text-white/40 mb-12 font-semibold uppercase tracking-widest text-[10px]">Olemme täällä auttamassa. Kysy meiltä suoraan!</p>
          <Link 
            to="/yhteystiedot" 
            className="inline-flex items-center gap-4 bg-[#D4AF37] hover:bg-[#AA8B2E] text-white px-12 py-5 rounded-full font-semibold uppercase tracking-widest transition-all shadow-xl shadow-[#D4AF37]/20 active:scale-95"
          >
            Ota yhteyttä
            <span className="material-icons-outlined">east</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQ;