import React, { useState } from 'react';

type Step = 'area' | 'purpose' | 'condition' | 'result';

interface CalculatorData {
  area: number;
  purpose: 'basic' | 'premium' | 'heavy';
  condition: 'new' | 'old' | 'poor';
}

const PriceCalculator: React.FC = () => {
  const [step, setStep] = useState<Step>('area');
  const [data, setData] = useState<CalculatorData>({
    area: 25,
    purpose: 'basic',
    condition: 'new'
  });

  const calculateEstimate = () => {
    let basePrice = 0;
    switch (data.purpose) {
      case 'basic': basePrice = 40; break;
      case 'premium': basePrice = 60; break;
      case 'heavy': basePrice = 85; break;
    }

    let conditionModifier = 0;
    switch (data.condition) {
      case 'new': conditionModifier = 0; break;
      case 'old': conditionModifier = 15; break;
      case 'poor': conditionModifier = 30; break;
    }

    const totalPrice = (basePrice + conditionModifier) * data.area;
    return totalPrice.toLocaleString('fi-FI');
  };

  const getPurposeName = () => {
    switch (data.purpose) {
      case 'basic': return 'Railo Basic';
      case 'premium': return 'Railo Premium';
      case 'heavy': return 'Railo Heavy Duty';
    }
  };

  const nextStep = (currentStep: Step) => {
    if (currentStep === 'area') setStep('purpose');
    if (currentStep === 'purpose') setStep('condition');
    if (currentStep === 'condition') setStep('result');
  };

  return (
    <div id="calculator" className="scroll-mt-32">
      <div className="bg-surface-dark border border-white/5 rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 text-primary/5 pointer-events-none transition-transform duration-1000 group-hover:scale-110">
          <span className="material-icons-outlined text-[12rem]">calculate</span>
        </div>

        <div className="relative z-10">
          <div className="mb-12">
            <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4 block italic">Laskuri</span>
            <h2 className="text-5xl font-black text-white uppercase italic tracking-tight">Laske hinta-arvio</h2>
          </div>

          {step === 'area' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tight text-center md:text-left">1. Syötä lattian pinta-ala</h3>
              <div className="relative max-w-xs mx-auto md:mx-0">
                <input
                  type="number"
                  value={data.area}
                  onChange={(e) => setData({ ...data, area: parseInt(e.target.value) || 0 })}
                  className="w-full bg-background-dark/50 border-white/10 rounded-2xl py-8 pl-10 pr-24 text-5xl font-black text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-right italic"
                />
                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl font-black text-primary italic">m²</span>
              </div>
              <button
                onClick={() => nextStep('area')}
                className="w-full bg-primary hover:bg-secondary text-white py-6 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all shadow-xl shadow-primary/30 active:scale-[0.98]"
              >
                Seuraava vaihe
              </button>
            </div>
          )}

          {step === 'purpose' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">2. Käyttötarkoitus / Tila</h3>
              <div className="grid gap-4">
                {[
                  { id: 'basic', label: 'Autotalli tai tavallinen varasto', desc: 'Railo Basic' },
                  { id: 'premium', label: 'Harrastetila tai "Man Cave"', desc: 'Railo Premium' },
                  { id: 'heavy', label: 'Raskas käyttö, korjaamo tai teollisuus', desc: 'Railo Heavy Duty' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setData({ ...data, purpose: item.id as any });
                      nextStep('purpose');
                    }}
                    className={`p-8 rounded-3xl border text-left transition-all group/btn ${data.purpose === item.id ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <p className="text-xl font-black text-white uppercase italic mb-1 transition-colors group-hover/btn:text-primary">{item.label}</p>
                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest italic">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'condition' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">3. Lattian nykykunto</h3>
              <div className="grid gap-4">
                {[
                  { id: 'new', label: 'Uusi / Puhdas betoni', desc: 'Helpoin pohjatyö' },
                  { id: 'old', label: 'Vanha / Sisältää vanhaa maalia', desc: 'Vaatii hiontaa/maalinpoistoa' },
                  { id: 'poor', label: 'Huonokuntoinen / Paljon halkeamia', desc: 'Vaatii jyrsintää ja paikkausta' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setData({ ...data, condition: item.id as any });
                      nextStep('condition');
                    }}
                    className={`p-8 rounded-3xl border text-left transition-all group/btn ${data.condition === item.id ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <p className="text-xl font-black text-white uppercase italic mb-1 transition-colors group-hover/btn:text-primary">{item.label}</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="text-center">
                <div className="inline-flex flex-col items-center mb-6">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic mb-2">Kohteen koko</span>
                   <span className="text-2xl font-black text-white italic">{data.area} m²</span>
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-4">Arvioitu hinta asennettuna ({getPurposeName()}):</p>
                <p className="text-7xl md:text-9xl font-black text-white italic tracking-tighter mb-8 leading-none">
                  ~{calculateEstimate()}€
                </p>
                <div className="max-w-md mx-auto p-6 rounded-2xl bg-primary/10 border border-primary/20">
                  <p className="text-primary text-sm font-bold italic leading-relaxed">
                    Muista hyödyntää kotitalousvähennys! Yksityisasiakkaana saat verotuksessa tuntuvan edun asennustyön osuudesta.
                  </p>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5 text-center">
                <p className="text-slate-400 text-lg mb-10 font-bold italic leading-relaxed">
                  Tämä on suuntaa-antava arvio. Lopullinen hinta ja ratkaisu varmistuvat aina paikan päällä. Lähetä nämä tiedot meille, niin soitamme ja sovimme ilmaisen arviokäynnin!
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setStep('area')}
                    className="py-6 px-10 rounded-2xl border border-white/10 text-slate-400 font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all italic"
                  >
                    Muuta tietoja
                  </button>
                  <a
                    href={`mailto:railopinnoitus@gmail.com?subject=Tarjouspyyntö laskurin kautta&body=Hei!%0D%0A%0D%0ALaskin hinta-arvion sivuillanne:%0D%0APinta-ala: ${data.area} m2%0D%0ATuote: ${data.purpose}%0D%0AKunto: ${data.condition}%0D%0AArvio: ${calculateEstimate()}€%0D%0A%0D%0AOttaisitteko yhteyttä?`}
                    className="py-6 px-10 bg-primary hover:bg-secondary text-white rounded-2xl font-bold uppercase tracking-widest transition-all shadow-2xl shadow-primary/30 text-center italic"
                  >
                    Pyydä tarkka tarjous
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;