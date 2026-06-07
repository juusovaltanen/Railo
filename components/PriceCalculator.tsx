import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Step = 'area' | 'service' | 'thickness' | 'flakes' | 'condition' | 'result';

interface CalculatorData {
  area: number;
  service: 'polynsidonta' | '0.5mm' | 'kova_kulutus' | 'custom' | null;
  thickness: '1mm' | '2-3mm' | null;
  flakes: boolean | null;
  condition: 'good' | 'medium' | 'poor' | null;
}

const PriceCalculator: React.FC = () => {
  const [step, setStep] = useState<Step>('area');
  const [showFallback, setShowFallback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', location: '' });
  const [wantVisit, setWantVisit] = useState(true);
  const [data, setData] = useState<CalculatorData>({
    area: 25,
    service: null,
    thickness: null,
    flakes: null,
    condition: null
  });

  const locationRoute = useLocation();

  const resetCalculator = () => {
    setStep('area');
    setIsSuccess(false);
    setContactInfo({ name: '', email: '', phone: '', location: '' });
    setWantVisit(true);
    setData({
      area: 25,
      service: null,
      thickness: null,
      flakes: null,
      condition: null
    });
    // Scroll element into view if needed
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Reset calculator when navigating via navbar or other same-page links
  useEffect(() => {
    if (locationRoute.pathname === '/laskuri') {
      resetCalculator();
    }
  }, [locationRoute.key]);

  const getServicePrice = () => {
    switch (data.service) {
      case 'polynsidonta': return 32.30;
      case '0.5mm': return 40.73;
      case 'kova_kulutus': return data.thickness === '1mm' ? 49.83 : 74.01;
      case 'custom': return 79.59;
      default: return 0;
    }
  };

  const getConditionPrice = () => {
    switch (data.condition) {
      case 'good': return 0;
      case 'medium': return 3.35;
      case 'poor': return 11.17;
      default: return 0;
    }
  };

  const calculateBreakdown = () => {
    const servicePrice = getServicePrice();
    const flakePrice = data.flakes ? 2.24 : 0;
    const conditionPrice = getConditionPrice();
    const fixedFee = 500;

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
      default: return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowFallback(false);

    const params = new URLSearchParams();
    params.append('form-name', 'hinta-arvioliidi');
    params.append('email', contactInfo.email);
    params.append('phone', contactInfo.phone);
    params.append('location', contactInfo.location);
    params.append('accepted_terms', wantVisit ? 'Kyllä' : 'Ei');
    params.append('neliomaara', data.area.toString());
    params.append('hinta_arvio', calculateBreakdown().total.toLocaleString('fi-FI', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €');
    params.append('palvelu', getServiceName());
    params.append('hiutaleet', data.flakes === true ? 'Kyllä' : 'Ei');
    params.append('kunto', data.condition === 'good' ? 'Hyvä' : data.condition === 'medium' ? 'Keskihuono' : data.condition === 'poor' ? 'Huono' : '');
    params.append('message', `Uusi hinta-arvioliidi nettisivuilta\n\nPaikkakunta: ${contactInfo.location}\nNeliömäärä: ${data.area} m²\nArvioitu hinta: ~${calculateBreakdown().total.toLocaleString('fi-FI', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €\nPalvelu: ${getServiceName()}\nKäsittely: ${data.flakes === true ? 'Hiutaleilla' : 'Ei hiutaleita'}\nLattian kunto: ${data.condition === 'good' ? 'Hyvä' : data.condition === 'medium' ? 'Keskihuono' : data.condition === 'poor' ? 'Huono' : ''}\nHaluaa arviokäynnin: ${wantVisit ? 'Kyllä' : 'Ei'}`);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setShowFallback(true);
      }
    } catch (error) {
      setShowFallback(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServiceDescription = () => {
    switch (data.service) {
      case 'polynsidonta': return 'Tämä on helpoin ja edullisin tapa laittaa loppu betonin jatkuvalle pölyämiselle. Pölynsidontamaalaus sopii parhaiten pienen kulutuksen kohteisiin.';
      case '0.5mm': return 'Kun haluat autotalliin tai varastoon siistin, värillisen ja kestävän pinnan, tämä on oikea valinta. Railo Keskikulutus sopii parhaiten normaalin arjen ja harrastamisen rasittamiin kohteisiin.';
      case 'kova_kulutus': return 'Kun lattiasta ei voi tehdä kompromisseja, tämä on meidän kestävin ratkaisu. Railo Kovakulutus -massapinnoite sopii parhaiten raskaan kaluston talleihin, pesuhalleihin ja teollisuustiloihin.';
      case 'custom': return 'Kun haluat lattiastasi todellisen katseenvangitsijan, me toteutamme sen toiveidesi mukaan. Custom-lattiat sopivat parhaiten edustustiloihin, myymälöihin, miesluoliin (man cave) ja premium-tason autotalleihin.';
      default: return '';
    }
  };

  const nextStep = (currentStep: Step) => {
    if (currentStep === 'area') setStep('service');
    if (currentStep === 'thickness') setStep('flakes');
    if (currentStep === 'flakes') setStep('condition');
    if (currentStep === 'condition') setStep('result');
  };

  const prevStep = () => {
    if (step === 'service') setStep('area');
    if (step === 'thickness') setStep('service');
    if (step === 'flakes') {
      if (data.service === 'kova_kulutus') setStep('thickness');
      else setStep('service');
    }
    if (step === 'condition') setStep('flakes');
    if (step === 'result') setStep('condition');
  };

  return (
    <div id="calculator" className="scroll-mt-32">
      <div className="bg-[#00001C] border border-white/5 rounded-[2.5rem] sm:rounded-[3.5rem] md:rounded-[4rem] p-5 sm:p-10 md:p-16 lg:p-20 shadow-2xl shadow-black/50 relative overflow-hidden group">
        <button 
          onClick={resetCalculator}
          title="Aloita alusta"
          className="absolute top-8 right-8 p-4 text-[#D4AF37]/10 z-30 transition-all duration-300 hover:scale-110 hover:text-[#D4AF37]/40 rounded-full hover:bg-white/5"
        >
          <span className="material-icons-outlined text-4xl md:text-6xl">calculate</span>
        </button>

        <div className="relative z-10">
          {step !== 'area' && step !== 'result' && (
            <button 
              onClick={prevStep}
              className="flex items-center gap-2 text-white/40 hover:text-[#D4AF37] transition-colors mb-8 font-semibold uppercase tracking-widest text-[10px]"
            >
              <span className="material-icons-outlined text-sm">west</span>
              Palaa
            </button>
          )}
          {step === 'area' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-500">
              <h3 className="text-2xl font-semibold text-white tracking-tight text-center md:text-left">1. Syötä lattian pinta-ala</h3>
              <div className="relative max-w-xs mx-auto md:mx-0">
                <input
                  type="number"
                  min="0"
                  value={data.area === 0 ? '' : data.area}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setData({ ...data, area: isNaN(val) ? 0 : Math.max(0, val) });
                  }}
                  placeholder="0"
                  className="w-full bg-white/5 border-white/10 rounded-3xl py-8 pl-10 pr-32 text-5xl font-semibold text-white focus:border-[#D4AF37] focus:ring-0 transition-all text-right leading-none"
                />
                <span className="absolute right-10 top-1/2 -translate-y-1/2 text-3xl font-semibold text-[#D4AF37] pointer-events-none">m²</span>
              </div>
              <button
                onClick={() => nextStep('area')}
                className="w-full bg-[#D4AF37] hover:bg-[#AA8B2E] text-white py-6 rounded-full text-lg font-semibold uppercase tracking-widest transition-all shadow-xl shadow-[#D4AF37]/20 active:scale-[0.98]"
              >
                Seuraava vaihe
              </button>
            </div>
          )}

          {step === 'service' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6 duration-500">
              <h3 className="text-2xl font-semibold text-white tracking-tight">2. Valitse palvelu</h3>
              <div className="grid gap-6">
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
                      if (item.id === 'kova_kulutus') {
                        setStep('thickness');
                      } else {
                        setStep('flakes');
                      }
                    }}
                    className={`p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border-2 text-left transition-all group/btn ${data.service === item.id ? 'border-[#D4AF37] bg-white/5' : 'border-white/5 bg-white/5 hover:border-[#D4AF37]/30'}`}
                  >
                    <p className={`text-xl font-semibold mb-2 transition-colors ${data.service === item.id ? 'text-[#D4AF37]' : 'text-white'}`}>{item.label}</p>
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'thickness' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6 duration-500">
              <h3 className="text-2xl font-semibold text-white tracking-tight">Valitse paksuus</h3>
              <div className="grid gap-6">
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
                    className={`p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border-2 text-left transition-all group/btn ${data.thickness === item.id ? 'border-[#D4AF37] bg-white/5' : 'border-white/5 bg-white/5 hover:border-[#D4AF37]/30'}`}
                  >
                    <p className={`text-xl font-semibold mb-2 transition-colors ${data.thickness === item.id ? 'text-[#D4AF37]' : 'text-white'}`}>{item.label}</p>
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'flakes' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6 duration-500">
              <h3 className="text-2xl font-semibold text-white tracking-tight">3. Lisätäänkö hiutaleet?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    className={`p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border-2 text-left transition-all group/btn ${data.flakes === item.id ? 'border-[#D4AF37] bg-white/5' : 'border-white/5 bg-white/5 hover:border-[#D4AF37]/30'}`}
                  >
                    <p className={`text-xl font-semibold mb-2 transition-colors ${data.flakes === item.id ? 'text-[#D4AF37]' : 'text-white'}`}>{item.label}</p>
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'condition' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6 duration-500">
              <h3 className="text-2xl font-semibold text-white tracking-tight">4. Lattian nykykunto</h3>
              <div className="grid gap-6">
                {[
                  { id: 'good', label: 'Hyvä kunto', desc: 'Puhdas ja ehjä betoni' },
                  { id: 'medium', label: 'Keskihuono kunto', desc: 'Halkeamia tai vanhaa maalia' },
                  { id: 'poor', label: 'Huono kunto', desc: 'Mureneva tai erittäin epätasainen' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setData({ ...data, condition: item.id as any });
                      setStep('result');
                    }}
                    className={`p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border-2 text-left transition-all group/btn ${data.condition === item.id ? 'border-[#D4AF37] bg-white/5' : 'border-white/5 bg-white/5 hover:border-[#D4AF37]/30'}`}
                  >
                    <p className={`text-xl font-semibold mb-2 transition-colors ${data.condition === item.id ? 'text-[#D4AF37]' : 'text-white'}`}>{item.label}</p>
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="text-center">
                <div className="mb-8">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 mb-3 block">Yhteenveto valinnoista</span>
                  <p className="text-xl font-semibold text-white">
                    {data.area} m², {getServiceName()}{data.flakes ? ', hiutaleilla' : ''}, {data.condition === 'good' ? 'hyvä kunto' : data.condition === 'medium' ? 'keskihuono kunto' : 'huono kunto'}
                  </p>
                </div>

                <p className="text-white/60 font-semibold uppercase tracking-widest text-xs mb-4">Arvioitu hinta asennettuna (sis. ALV 25,5%):</p>
                <p className="text-7xl md:text-8xl font-semibold text-[#D4AF37] tracking-tight mb-8 leading-none">
                  ~{calculateBreakdown().total.toLocaleString('fi-FI', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}€
                </p>
              </div>

              {/* Lead capture form positioned immediately after the price */}
              <div className="text-center flex flex-col items-center">
                {isSuccess ? (
                  <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-12 rounded-[3.5rem] animate-in fade-in duration-500 max-w-lg mx-auto w-full">
                    <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">Kiitos!</h3>
                    <p className="text-white/80 font-medium leading-relaxed">Yhteystietosi on vastaanotettu! Otamme sinuun pian yhteyttä arviokäynnin sopimiseksi.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6 text-left p-6 sm:p-10 md:p-12 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="text-center space-y-3 mb-6">
                      <h4 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                        Haluatko tarkan ja sitovan hinnan juuri sinun kohteellesi?
                      </h4>
                      <p className="text-white/50 text-xs leading-relaxed max-w-sm mx-auto">
                        Jätä yhteystietosi alle, niin voimme tarvittaessa sopia maksuttoman arviokäynnin. Täyttäminen on täysin vapaaehtoista!
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest ml-1">Sähköpostiosoite *</label>
                        <input 
                          type="email" 
                          required
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="matti@esimerkki.fi"
                          autoComplete="email"
                          autoCapitalize="none"
                          spellCheck="false"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest ml-1">Puhelinnumero (Ei pakollinen)</label>
                        <input 
                          type="tel" 
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="040 123 4567"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest ml-1">Paikkakunta *</label>
                        <input 
                          type="text" 
                          required
                          value={contactInfo.location}
                          onChange={(e) => setContactInfo({...contactInfo, location: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="Esim. Oulu"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <button
                        type="button"
                        onClick={() => setStep('area')}
                        className="w-full sm:w-1/3 py-4 rounded-full border border-white/10 text-white/60 font-bold uppercase tracking-wider hover:text-white hover:bg-white/5 transition-all text-xs"
                      >
                        Laske uusi
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !contactInfo.email.trim() || !contactInfo.location.trim()}
                        className="w-full sm:w-2/3 py-4 bg-[#D4AF37] hover:bg-[#AA8B2E] disabled:bg-[#D4AF37]/20 disabled:text-white/30 disabled:border-transparent text-white rounded-full font-bold uppercase tracking-wider transition-all shadow-xl shadow-[#D4AF37]/10 hover:shadow-[#D4AF37]/20 text-center disabled:cursor-not-allowed text-xs"
                      >
                        {isSubmitting ? 'Lähetetään...' : 'Lähetä'}
                      </button>
                    </div>

                    {(!contactInfo.email.trim() || !contactInfo.location.trim()) && (
                      <p className="text-[10px] text-white/40 text-center italic mt-2">
                        Täytä sähköpostiosoite ja paikkakunta saadaksesi sitovan tarjouksen.
                      </p>
                    )}
                  </form>
                )}
                
                {showFallback && !isSuccess && (
                  <div className="mt-8 bg-white/5 p-6 rounded-2xl border border-white/10 animate-in fade-in duration-500 max-w-lg mx-auto w-full">
                    <p className="text-white/60 text-sm mb-2">Lomakkeen lähetyksessä tapahtui virhe.</p>
                    <p className="text-white/80 font-bold text-xs">Voit myös laittaa viestiä suoraan: <a href="mailto:juuso.railopinnoitus@gmail.com" className="text-[#D4AF37] hover:underline break-all">juuso.railopinnoitus@gmail.com</a></p>
                  </div>
                )}
              </div>

              {/* Supplementary descriptive info widgets below the form */}
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto pt-8 border-t border-white/10">
                <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-2 block">Tietoa pinnoituksesta</span>
                  <p className="text-white/70 text-xs leading-relaxed font-medium">
                    {getServiceDescription()}
                  </p>
                </div>

                <div className="p-8 md:p-10 rounded-[2.5rem] bg-[#D4AF37]/5 border border-[#D4AF37]/15">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-2 block">Säästä verotuksessa</span>
                  <p className="text-white/70 text-xs leading-relaxed font-medium">
                    Muista hyödyntää kotitalousvähennys! Yksityisasiakkaana saat verotuksessa tuntuvan edun asennustyön osuudesta.
                  </p>
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