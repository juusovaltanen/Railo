import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FAQ_DATA } from '../data/faqData';
import { triggerBookingModal } from '../components/BookingModal';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const renderFormattedAnswer = (text: string, idx: number) => {
    if (idx === 0) {
      const parts = text.split(/(Kysy ilmainen arviokäynti|laske hinta-arvio laskurilla)/g);
      return parts.map((part, i) => {
        if (part === 'Kysy ilmainen arviokäynti') {
          return (
            <button
              key={i}
              type="button"
              onClick={triggerBookingModal}
              className="text-[#D4AF37] font-semibold hover:underline bg-transparent p-0 inline cursor-pointer text-left"
            >
              {part}
            </button>
          );
        }
        if (part === 'laske hinta-arvio laskurilla') {
          return (
            <Link key={i} to="/laskuri" className="text-[#D4AF37] font-semibold hover:underline">
              {part}
            </Link>
          );
        }
        return part;
      });
    }

    if (idx === 3) {
      const parts = text.split(/(hintalaskurilla)/g);
      return parts.map((part, i) => {
        if (part === 'hintalaskurilla') {
          return (
            <Link key={i} to="/laskuri" className="text-[#D4AF37] font-semibold hover:underline">
              {part}
            </Link>
          );
        }
        return part;
      });
    }

    if (idx === 4) {
      const parts = text.split(/(laskurillamme)/g);
      return parts.map((part, i) => {
        if (part === 'laskurillamme') {
          return (
            <Link key={i} to="/laskuri" className="text-[#D4AF37] font-semibold hover:underline">
              {part}
            </Link>
          );
        }
        return part;
      });
    }

    if (idx === 7) {
      return (
        <>
          <p>{text}</p>
          <div className="mt-6 flex justify-start">
            <Link
              to="/blogi/epoksi-vai-polyuretaani"
              className="inline-flex items-center gap-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all border border-[#D4AF37]/20"
            >
              Lue opas epoksin ja polyuretaanin eroista
              <span className="material-icons-outlined text-sm">east</span>
            </Link>
          </div>
        </>
      );
    }

    return text;
  };

  return (
    <div className="pt-20 bg-white">
      <SEO />
      <section className="py-32 max-w-3xl mx-auto px-4">
        <div className="text-center mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#00001C] mb-8 tracking-tight">Usein kysytyt kysymykset</h1>
          <p className="text-[#00001C]/60 text-lg font-medium leading-relaxed">
            Vastauksia yleisimpiin kysymyksiin epoksilattioista.
          </p>
        </div>

        <div className="space-y-6">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const answerId = `faq-answer-${idx}`;
            const questionId = `faq-question-${idx}`;

            return (
              <div
                key={idx}
                className="bg-[#00001C] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl shadow-black/20 transition-all hover:border-[#D4AF37]/30"
              >
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-10 text-left cursor-pointer"
                >
                  <h3 className={`text-xl font-semibold tracking-tight transition-colors ${isOpen ? 'text-[#D4AF37]' : 'text-white'}`}>
                    {faq.question}
                  </h3>
                  <span
                    className={`material-icons-outlined transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#D4AF37]' : 'text-white/40'
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid grid-rows-[1fr] opacity-100' : 'grid grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-10 pt-0 border-t border-white/5">
                      <div className="text-white/70 leading-relaxed pt-10 text-base">
                        {renderFormattedAnswer(faq.answer, idx)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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