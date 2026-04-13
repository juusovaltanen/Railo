import React, { useState } from 'react';

type Step = 'area' | 'service' | 'thickness' | 'flakes' | 'condition' | 'result';

interface CalculatorData {
  area: number;
  service: 'polynsidonta' | '0.5mm' | 'kova_kulutus' | 'custom';
  thickness: '1mm' | '2-3mm';
  flakes: boolean;
  condition: 'good' | 'medium' | 'poor';
}

const PriceCalculator: React.FC = () => {
  const [step, setStep] = useState<Step>('area');
  const [showFallback, setShowFallback] = useState(false);
  const [data, setData] = useState<CalculatorData>({
    area: 25,
    service: 'kova_kulutus',
    thickness: '1mm',
    flakes: false,
    condition: 'good'
  });

  const getServicePrice = () => {
    switch (data.service) {
      case 'polynsidonta': return 28.94;
      case '0.5mm': return 36.49;
      case 'kova_kulutus': return data.thickness === '1mm' ? 44.65 : 66.32;
      case 'custom': return 71.32;
    }
  };

  const getConditionPrice = () => {
    switch (data.condition) {
      case 'good': return 0;
      case 'medium': return 3.00;
      case 'poor': return 6.00;
    }
  };

  const calculateBreakdown = () => {
    const servicePrice = getServicePrice();
    const flakePrice = data.flakes ? 2.00 : 0;
    const conditionPrice = getConditionPrice();
    const fixedFee = 0;

    const workAndMaterials = (servicePrice + flakePrice) * data.area;
    const prepWork = conditionPrice * data.area;
    const total = workAndMaterials + prepWork + fixedFee;

    return {
      workAndMaterials,
      prepWork,
      fixedFee,
      total
    };
  };

  const getServiceName = () => {
    switch (data.service) {
      case 'polynsidonta': return 'Railo - Pölynsidonta';
      case '0.5mm': return 'Railo - Keskikova Kulutus';
      case 'kova_kulutus': return 'Railo - Kova Kulutus';
      case 'custom': return 'Railo - Custom-Lattiat';
    }
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent("Tarjouspyyntö laskurin kautta");
    const body = encodeURIComponent(
      `Hei!\n\nLaskin hinta-arvion sivuillanne:\nPinta-ala: ${data.area} m²\nPalvelu: ${getServiceName()}\nHiutaleet: ${data.flakes ? 'Kyllä' : 'Ei'}\nKunto: ${data.condition === 'good' ? 'Hyvä' : data.condition === 'medium' ? 'Keskihuono' : 'Huono'}\n\nArvio (sis. ALV 25,5%): ${calculateBreakdown().total.toFixed(2)}€\n\nOttaisitteko yhteyttä?`
    );
    
    const mailtoLink = `mailto:railopinnoitus@gmail.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      window.location.href = mailtoLink;
      setShowFallback(true);
    }, 800);
  };

  const getServiceDescription = () => {
    switch (data.service) {
      case 'polynsidonta': return 'Tämä on helpoin ja edullisin tapa laittaa loppu betonin jatkuvalle pölyämiselle. Pölynsidontamaalaus sopii parhaiten pienen kulutuksen kohteisiin.';
      case '0.5mm': return 'Kun haluat autotalliin tai varastoon siistin, värillisen ja kestävän pinnan, tämä on oikea valinta. Railo Keskikulutus sopii parhaiten normaalin arjen ja harrastamisen rasittamiin kohteisiin.';
      case 'kova_kulutus': return 'Kun lattiasta ei voi tehdä kompromisseja, tämä on meidän kestävin ratkaisu. Railo Kovakulutus -massapinnoite sopii parhaiten raskaan kaluston talleihin, pesuhalleihin ja teollisuustiloihin.';
      case 'custom': return 'Kun haluat lattiastasi todellisen katseenvangitsijan, me toteutamme sen toiveidesi mukaan. Custom-lattiat sopivat parhaiten edustustiloihin, myymälöihin, miesluoliin (man cave) ja premium-tason autotalleihin.';
    }
  };

  const nextStep = (currentStep: Step) => {
    if (currentStep === 'area') setStep('service');
    if (currentStep === 'service') {
      if (data.service === 'kova_kulutus') {
        setStep('thickness');
      } else {
        setStep('flakes');
      }
    }
    if (currentStep === 'thickness') setStep('flakes');
    if (currentStep === 'flakes') setStep('condition');
    if (currentStep === 'condition') setStep('result');
  };

  return (
    <div id="calculator" className="scroll-mt-32">
      <div className="bg-primary/5 backdrop-blur-xl border border-primary/20 rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 text-primary/10 pointer-events-none transition-transform duration-1000 group-hover:scale-110">
          <span className="material-icons-outlined text-[12rem]">calculate</span>
        </div>

        <div className="relative z-10">
          {step === 'area' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tight text-center md:text-left">1. Syötä lattian pinta-ala</h3>
              <div className="relative max-w-xs mx-auto md:mx-0">
                <input
                  type="number"
                  value={data.area === 0 ? '' : data.area}
                  onChange={(e) => setData({ ...data, area: e.target.value === '' ? 0 : parseInt(e.target.value) })}
                  placeholder="0"
                  className="w-full bg-background-dark/50 border-white/10 rounded-2xl py-6 pl-10 pr-28 text-5xl font-black text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-right italic leading-tight"
                />
                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl font-black text-primary italic pointer-events-none">m²</span>
              </div>
              <button
                onClick={() => nextStep('area')}
                className="w-full bg-primary hover:bg-secondary text-white py-6 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all shadow-xl shadow-primary/30 active:scale-[0.98] glow-gold"
              >
                Seuraava vaihe
              </button>
            </div>
          )}

          {step === 'service' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">2. Valitse palvelu</h3>
              <div className="grid gap-4">
                {[
                  { id: 'polynsidonta', label: 'Railo - Pölynsidonta', desc: 'Edullinen suojaus' },
                  { id: '0.5mm', label: 'Railo - Keskikova Kulutus', desc: 'Siisti peruspinnoite' },
                  { id: 'kova_kulutus', label: 'Railo - Kova Kulutus', desc: 'Kestävämpi vaihtoehto' },
                  { id: 'custom', label: 'Railo - Custom-Lattiat', desc: 'Uniikki toteutus' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setData({ ...data, service: item.id as any });
                      nextStep('service');
                    }}
                    className={`p-8 rounded-3xl border text-left transition-all group/btn ${data.service === item.id ? 'border-primary bg-primary/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <p className="text-xl font-black text-white uppercase italic mb-1 transition-colors group-hover/btn:text-primary">{item.label}</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'thickness' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Valitse paksuus</h3>
              <div className="grid gap-4">
                {[
                  { id: '1mm', label: '1 mm', desc: 'esim. autotallit' },
                  { id: '2-3mm', label: '2-3 mm', desc: 'esim. teollisuushallit' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setData({ ...data, thickness: item.id as any });
                      nextStep('thickness');
                    }}
                    className={`p-8 rounded-3xl border text-left transition-all group/btn ${data.thickness === item.id ? 'border-primary bg-primary/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <p className="text-xl font-black text-white uppercase italic mb-1 transition-colors group-hover/btn:text-primary">{item.label}</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'flakes' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">3. Lisätäänkö hiutaleet?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: true, label: 'Kyllä', desc: 'Värihiutaleilla' },
                  { id: false, label: 'Ei', desc: 'Tasainen väri' }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setData({ ...data, flakes: item.id });
                      nextStep('flakes');
                    }}
                    className={`p-8 rounded-3xl border text-left transition-all group/btn ${data.flakes === item.id ? 'border-primary bg-primary/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <p className="text-xl font-black text-white uppercase italic mb-1 transition-colors group-hover/btn:text-primary">{item.label}</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'condition' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">4. Lattian nykykunto</h3>
              <div className="grid gap-4">
                {[
                  { id: 'good', label: 'Hyvä kunto', desc: 'Puhdas ja ehjä betoni' },
                  { id: 'medium', label: 'Keskihuono kunto', desc: 'Halkeamia tai vanhaa maalia' },
                  { id: 'poor', label: 'Huono kunto', desc: 'Mureneva tai erittäin epätasainen' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setData({ ...data, condition: item.id as any });
                      nextStep('condition');
                    }}
                    className={`p-8 rounded-3xl border text-left transition-all group/btn ${data.condition === item.id ? 'border-primary bg-primary/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
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
                <div className="mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic mb-2 block">Yhteenveto valinnoista</span>
                  <p className="text-xl font-black text-white italic">
                    {data.area} m², {getServiceName()}{data.flakes ? ', hiutaleilla' : ''}, {data.condition === 'good' ? 'hyvä kunto' : data.condition === 'medium' ? 'keskihuono kunto' : 'huono kunto'}
                  </p>
                </div>

                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-4">Arvioitu hinta asennettuna (sis. ALV 25,5%):</p>
                <p className="text-7xl md:text-9xl font-black text-white italic tracking-tighter mb-8 leading-none">
                  ~{calculateBreakdown().total.toLocaleString('fi-FI', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}€
                </p>
                
                <div className="max-w-md mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
                  <p className="text-slate-300 text-sm font-bold italic leading-relaxed">
                    {getServiceDescription()}
                  </p>
                </div>

                <div className="max-w-md mx-auto p-6 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-md">
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
                  <button
                    onClick={handleSendEmail}
                    className="py-6 px-10 bg-primary hover:bg-secondary text-white rounded-2xl font-bold uppercase tracking-widest transition-all shadow-2xl shadow-primary/30 text-center italic glow-gold"
                  >
                    Pyydä tarkka tarjous
                  </button>
                </div>
                {showFallback && (
                  <div className="mt-8 bg-background-dark/50 p-6 rounded-2xl border border-white/5 animate-in fade-in duration-500">
                    <p className="text-slate-400 text-sm mb-2">Jos sähköpostiohjelma ei auennut automaattisesti, voit lähettää viestin suoraan osoitteeseen:</p>
                    <a href="mailto:railopinnoitus@gmail.com" className="text-primary font-bold text-lg hover:underline break-all">railopinnoitus@gmail.com</a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;