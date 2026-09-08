import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  X, 
  Send, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  MessageSquare, 
  HelpCircle, 
  Calculator, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  User, 
  BadgePercent
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  component?: 'space-options' | 'other-input' | 'wear-options' | 'size-options' | 'lead-form' | 'success-card';
}

interface LeadData {
  spaceType: string;
  wearLevel: string;
  floorSize: string;
  recommendedPackage: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  discountCode: string;
  timestamp: string;
}

const SPACE_OPTIONS = [
  { id: 'autotalli', label: '🚗 Autotalli tai varasto', reaction: 'Loistavaa! Autotallit ja varastot saadaan kuntoon nopeasti ja siististi.' },
  { id: 'teollisuus', label: '🏭 Teollisuustila tai halli', reaction: 'Tämä selvä. Raskaaseen rasitukseen löytyy kestävät massaratkaisut.' },
  { id: 'liiketila', label: '🏢 Liiketila tai toimisto', reaction: 'Ymmärretty! Liiketiloihin tehdään näyttävää ja helppohoitoista pintaa.' },
  { id: 'elintarvike', label: '🍽️ Elintarvike- tai pesutila', reaction: 'Tärkeä kohde. Saumaton, vesitiivis ja hygieeninen pinta on näissä ykkösasia.' },
  { id: 'muu', label: '✨ Muu tila', reaction: 'Selvä juttu! Räätälöimme ratkaisun alustan mukaan.' }
];

const WEAR_OPTIONS = [
  {
    id: 'kevyt',
    title: '🛡️ Kevyt suojaus & pölynsidonta',
    subtext: 'Estää pölyämisen, hylkii öljyä ja vettä. Erinomainen peruskäyttöön ja autotalleihin.'
  },
  {
    id: 'normaali',
    title: '🚙 Normaali rasitus & helppohoitoisuus',
    subtext: 'Säännöllistä ajoa, kulutuskestävyyttä ja saumatonta ilmettä (2K-epoksi).'
  },
  {
    id: 'raskas',
    title: '🔨 Raskas teollisuus & kemikaalit',
    subtext: 'Kova mekaaninen rasitus, nastarengasajo, trukkiliikenne tai jatkuva vesirasitus (hierremassa / PU).'
  }
];

const SIZE_OPTIONS = [
  'Alle 30 m² (esim. perusautotalli)',
  '30 – 80 m² (iso talli / pieni varasto)',
  '80 – 200 m² (hallitila / liiketila)',
  'Yli 200 m² (suurempi teollisuuskohde)'
];

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    q: 'Kauanko epoksilattian asennus kestää?',
    a: 'Toteutus kestää yleensä 1–4 päivää kohteen koosta ja pohjatöistä riippuen. Lattialla voi yleensä kävellä jo 24h kuluttua asennuksesta, ja raskas kalustokuormitus suositellaan noin 7 vrk kuluttua.'
  },
  {
    id: 'faq-2',
    q: 'Kestääkö pinnoite nastarenkaita ja tiesuolaa?',
    a: 'Kyllä kestää! 2K-epoksipinnoite ja hierremassa on kehitetty erityisesti kestämään Suomen ankaraa nastarengaskulutusta, sulamisvesiä, tiesuoloja sekä öljyjä.'
  },
  {
    id: 'faq-3',
    q: 'Onko epoksilattia liukas märkänä?',
    a: 'Ei tarvitse olla. Autotalleihin ja märkätiloihin suosittelemme hiutalepinnoitusta tai karhennusta, joka luo erinomaisen pidon myös lumisilla renkailla ja märillä kengillä.'
  },
  {
    id: 'faq-4',
    q: 'Paljonko epoksilattia maksaa neliöltä?',
    a: 'Neliöhinta liikkuu yleensä 30–80 €/m² välillä pohjatöistä, alustan kunnosta ja valitusta pinnoitteesta riippuen. Laske tällä apurilla suora hinta-arvio ja lunasta -10 % syysetu!'
  },
  {
    id: 'faq-5',
    q: 'Saako asennuksesta kotitalousvähennystä?',
    a: 'Kyllä vain! Yksityishenkilöt saavat työn osuudesta tuntuvan kotitalousvähennyksen verotuksessa. Toimitamme aina selkeän erittelyn työn ja materiaalien osuudesta.'
  },
  {
    id: 'faq-6',
    q: 'Mitä eroa on epoksilla ja polyuretaanilla?',
    a: 'Epoksi on äärimmäisen kova ja kulutusta kestävä ratkaisu autotalleihin ja teollisuuteen. Polyuretaani puolestaan on elastisempi, kestää paremmin lämpöliikkeitä ja on täysin UV-suojattu.'
  }
];

const LeadChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [currentView, setCurrentView] = useState<'menu' | 'calculator' | 'faq'>('menu');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isTyping, setIsTyping] = useState(false);

  // Selections
  const [selectedSpace, setSelectedSpace] = useState('');
  const [otherSpaceInput, setOtherSpaceInput] = useState('');
  const [selectedWear, setSelectedWear] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [recommendation, setRecommendation] = useState('');

  // Form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Messages list
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: 'Moro! Olen Pinnoittaja Pertti. 👋\n\nMillainen tila teillä on mielessä pinnoittaa tai suojata?'
    },
    {
      id: 'init-space-options',
      sender: 'bot',
      component: 'space-options'
    }
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const priceMsgRef = useRef<HTMLDivElement>(null);

  // Smooth scroll logic: when step 4 (price) arrives, focus directly on the price recommendation instead of jumping down past it!
  useEffect(() => {
    if (isOpen && currentView === 'calculator') {
      if (step === 4) {
        const timer = setTimeout(() => {
          if (priceMsgRef.current && chatContainerRef.current) {
            const container = chatContainerRef.current;
            const target = priceMsgRef.current;
            const targetTop = target.offsetTop - container.offsetTop - 12;
            container.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
          } else {
            priceMsgRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
        return () => clearTimeout(timer);
      }
    }
  }, [messages, isTyping, isOpen, currentView, step]);

  // Calculate dynamic recommendation based on rules
  const computeRecommendation = (wear: string, size: string): string => {
    const isKevyt = wear.includes('Kevyt suojaus');
    const isNormaali = wear.includes('Normaali rasitus');
    const isRaskas = wear.includes('Raskas teollisuus');

    const isAlle30 = size.includes('Alle 30 m²');
    const is30to80 = size.includes('30 – 80 m²');
    const isLarge = size.includes('80 – 200 m²') || size.includes('Yli 200 m²');

    if (isKevyt && isAlle30) {
      return 'Railo Pölynsidonta & Pintasuojaus — Alk. 990 € (sis. alv)';
    }
    if (isNormaali && (isAlle30 || is30to80)) {
      return 'Railo 2K-Epoksipinnoitus — n. 1 300 – 2 500 €';
    }
    if (isRaskas || isLarge) {
      return 'Kestävä Epoksi- tai Polyuretaanimassa — Räätälöity kohdearvio';
    }
    return 'Kohteelle optimoitu pinnoitusratkaisu — Nopea urakkatarjous';
  };

  // Reset entire conversation
  const handleReset = () => {
    setStep(1);
    setIsTyping(false);
    setSelectedSpace('');
    setOtherSpaceInput('');
    setSelectedWear('');
    setSelectedSize('');
    setRecommendation('');
    setFormData({ name: '', email: '', phone: '', location: '' });
    setFormErrors({});
    setMessages([
      {
        id: 'reset-1',
        sender: 'bot',
        text: 'Moro! Olen Pinnoittaja Pertti. 👋\n\nMillainen tila teillä on mielessä pinnoittaa tai suojata?'
      },
      {
        id: 'reset-space-options',
        sender: 'bot',
        component: 'space-options'
      }
    ]);
  };

  // Step 1: Select space type
  const handleSelectSpace = (option: typeof SPACE_OPTIONS[number]) => {
    if (option.id === 'muu') {
      setMessages(prev => [
        ...prev.filter(m => m.component !== 'space-options'),
        { id: `user-${Date.now()}`, sender: 'user', text: option.label },
        { id: `input-${Date.now()}`, sender: 'bot', component: 'other-input' }
      ]);
      return;
    }

    setSelectedSpace(option.label);

    setMessages(prev => [
      ...prev.filter(m => m.component !== 'space-options'),
      { id: `user-${Date.now()}`, sender: 'user', text: option.label }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setStep(2);
      setMessages(prev => [
        ...prev,
        { id: `reaction-${Date.now()}`, sender: 'bot', text: option.reaction },
        { id: `q2-${Date.now()}`, sender: 'bot', text: 'Millaista rasitusta tai suojaa lattialta vaaditaan?' },
        { id: `wear-options-${Date.now()}`, sender: 'bot', component: 'wear-options' }
      ]);
    }, 500);
  };

  // Step 1b: Submit custom space type
  const handleCustomSpaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otherSpaceInput.trim()) return;

    const trimmed = otherSpaceInput.trim();
    setSelectedSpace(trimmed);

    setMessages(prev => [
      ...prev.filter(m => m.component !== 'other-input'),
      { id: `user-${Date.now()}`, sender: 'user', text: trimmed }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setStep(2);
      setMessages(prev => [
        ...prev,
        { id: `reaction-${Date.now()}`, sender: 'bot', text: 'Selvä juttu! Räätälöimme ratkaisun alustan mukaan.' },
        { id: `q2-${Date.now()}`, sender: 'bot', text: 'Millaista rasitusta tai suojaa lattialta vaaditaan?' },
        { id: `wear-options-${Date.now()}`, sender: 'bot', component: 'wear-options' }
      ]);
    }, 500);
  };

  // Step 2: Select wear level
  const handleSelectWear = (option: typeof WEAR_OPTIONS[number]) => {
    setSelectedWear(option.title);

    setMessages(prev => [
      ...prev.filter(m => m.component !== 'wear-options'),
      { id: `user-${Date.now()}`, sender: 'user', text: option.title }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setStep(3);
      setMessages(prev => [
        ...prev,
        { id: `q3-${Date.now()}`, sender: 'bot', text: 'Mikä on lattian arvioitu pinta-ala?' },
        { id: `size-options-${Date.now()}`, sender: 'bot', component: 'size-options' }
      ]);
    }, 500);
  };

  // Step 3: Select floor size
  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    const rec = computeRecommendation(selectedWear, size);
    setRecommendation(rec);

    setMessages(prev => [
      ...prev.filter(m => m.component !== 'size-options'),
      { id: `user-${Date.now()}`, sender: 'user', text: size }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setStep(4);
      setMessages(prev => [
        ...prev,
        {
          id: `rec-msg-${Date.now()}`,
          sender: 'bot',
          text: `Vastauksiesi pohjalta suosittelemme kohteeseesi:\n👉 **${rec}**\n\nSyyskampanja: Saat **-10 % alennuksen** koodilla **Syksy10**!\n\nMinne lähetämme tarkan hinta-arvion ja ehdotuksen?`
        },
        { id: `lead-form-${Date.now()}`, sender: 'bot', component: 'lead-form' }
      ]);
    }, 600);
  };

  // Clicked an FAQ question to inject into chat
  const handleFaqInChat = (faq: typeof FAQ_ITEMS[number]) => {
    setMessages(prev => [
      ...prev,
      { id: `user-faq-${Date.now()}`, sender: 'user', text: `❓ ${faq.q}` }
    ]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-faq-${Date.now()}`,
          sender: 'bot',
          text: `💡 **${faq.q}**\n\n${faq.a}\n\n👉 Voit jatkaa hinta-arvion laskemista alta tai pyytää suoraa tarjousta!`
        }
      ]);
    }, 450);
  };

  // Step 4: Submit lead form
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { name?: string; email?: string; phone?: string } = {};
    if (!formData.name.trim()) errors.name = 'Kirjoita nimesi tai yrityksesi';
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Anna kelvollinen sähköpostiosoite';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 5) {
      errors.phone = 'Anna puhelinnumerosi yhteydenottoa varten';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    const payload: LeadData = {
      spaceType: selectedSpace || 'Ei määritelty',
      wearLevel: selectedWear || 'Ei määritelty',
      floorSize: selectedSize || 'Ei määritelty',
      recommendedPackage: recommendation || 'Yleisarvio',
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim() || 'Ei ilmoitettu',
      discountCode: 'Syksy10',
      timestamp: new Date().toISOString()
    };

    // 1. Save to localStorage for redundancy
    try {
      const existing = JSON.parse(localStorage.getItem('railo_leads') || '[]');
      existing.push(payload);
      localStorage.setItem('railo_leads', JSON.stringify(existing));
    } catch {
      // Ignore localStorage errors
    }

    // 2. Dispatch to Netlify Form / endpoint
    try {
      const params = new URLSearchParams();
      params.append('form-name', 'chat-lead');
      params.append('name', payload.name);
      params.append('email', payload.email);
      params.append('phone', payload.phone);
      params.append('location', payload.location);
      params.append('space_type', payload.spaceType);
      params.append('wear_level', payload.wearLevel);
      params.append('floor_size', payload.floorSize);
      params.append('recommended_package', payload.recommendedPackage);
      params.append('discount_code', payload.discountCode);
      params.append('timestamp', payload.timestamp);

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
    } catch {
      // Form submission fallback
    }

    // 3. Webhook integration if configured
    try {
      const webhookUrl = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    } catch {
      // Ignore webhook errors in client
    }

    // 4. Supabase integration if configured
    try {
      const env = (import.meta as unknown as { env: Record<string, string> }).env;
      const supabaseUrl = env?.VITE_SUPABASE_URL;
      const supabaseAnonKey = env?.VITE_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseAnonKey) {
        await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            location: payload.location,
            space_type: payload.spaceType,
            wear_level: payload.wearLevel,
            floor_size: payload.floorSize,
            recommended_package: payload.recommendedPackage,
            discount_code: payload.discountCode,
            created_at: payload.timestamp
          })
        });
      }
    } catch {
      // Ignore Supabase connection failures
    }

    // Dispatch custom window event
    try {
      window.dispatchEvent(new CustomEvent('railo-lead-submitted', { detail: payload }));
    } catch {
      // Safe noop
    }

    setIsSubmitting(false);
    setStep(5);

    // Update conversation with success state
    setMessages(prev => [
      ...prev.filter(m => m.component !== 'lead-form'),
      {
        id: `user-submit-${Date.now()}`,
        sender: 'user',
        text: `Nimi: ${payload.name}\nPuh: ${payload.phone}\nEmail: ${payload.email}`
      },
      {
        id: `success-msg-${Date.now()}`,
        sender: 'bot',
        text: 'Kiitos! Otamme sinuun yhteyttä vuorokauden sisällä hinta-arvion kera. Syysetu -10 % on nyt lukittu tiedoillasi.'
      },
      {
        id: `success-card-${Date.now()}`,
        sender: 'bot',
        component: 'success-card'
      }
    ]);
  };

  const progressPercent = step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Compact, Enticing Speech Preview Bubble with Showcase Image (Shown when collapsed) */}
      {!isOpen && showPreview && (
        <div className="pointer-events-auto relative mb-3 w-[240px] sm:w-[260px] max-w-[calc(100vw-2rem)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          <div
            onClick={() => {
              setIsOpen(true);
              setCurrentView('menu');
              setShowPreview(false);
            }}
            className="cursor-pointer group relative bg-gradient-to-b from-[#111735] via-[#0D122B] to-[#00001C] text-white rounded-2xl shadow-2xl shadow-black/95 border-2 border-[#C5A059] hover:border-[#F3E5AB] transition-all duration-300 overflow-hidden hover:scale-[1.015]"
          >
            {/* Real Finished Floor Showcase Photo (Hook Image) */}
            <div className="relative h-20 sm:h-24 w-full overflow-hidden bg-black/50">
              <img
                src="https://i.postimg.cc/05GsSRC5/Image-24-4-2026-at-14-28.png"
                alt="Autotallin pinnoitettu lattia"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D122B] via-transparent to-black/30" />

              {/* Campaign badge on top-left of image */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-lg border border-white/20">
                  <Sparkles className="w-2.5 h-2.5 fill-current" />
                  <span>Syysetu -10 %</span>
                </span>
              </div>

              {/* Close button on top-right of image */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPreview(false);
                }}
                aria-label="Sulje vihje"
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/90 text-white/70 hover:text-white p-1 rounded-full transition-colors border border-white/20 shadow-md cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Speech Bubble Content */}
            <div className="p-2.5 sm:p-3">
              {/* Bot Identity Header */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#9B772E] via-[#C5A059] to-[#F1D487] flex items-center justify-center text-[#00001C] font-black shrink-0 shadow-sm">
                  <Shield className="w-3.5 h-3.5 fill-[#00001C]/25 stroke-[2.2]" />
                </div>
                <div className="min-w-0 flex-1 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white group-hover:text-[#F1D487] transition-colors">
                    Pinnoittaja Pertti
                  </h4>
                  <span className="flex items-center gap-1 text-[9px] text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Paikalla</span>
                  </span>
                </div>
              </div>

              {/* High-Converting Persuasive Copy */}
              <p className="text-[11.5px] sm:text-xs font-bold text-white leading-snug">
                Haluatko talliisi näyttävän ja kestävän lattian?
              </p>
              <p className="text-[10px] text-white/75 mt-0.5 leading-snug">
                Laske hinta-arvio 30 sekunnissa ja lukitse syysetu – tai kysy neuvoa usein kysytyistä kysymyksistä!
              </p>

              {/* Two Direct Action Buttons */}
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                    setCurrentView('calculator');
                    setShowPreview(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:brightness-110 text-[#00001C] font-black text-[11px] py-1.5 px-1.5 rounded-lg flex items-center justify-center gap-1 transition-all shadow-md shadow-[#C5A059]/25 cursor-pointer"
                >
                  <Calculator className="w-3 h-3" />
                  <span>Hinta-arvio (-10%)</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                    setCurrentView('faq');
                    setShowPreview(false);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] py-1.5 px-2.5 rounded-lg flex items-center justify-center gap-1 transition-all border border-white/15 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3 text-[#C5A059]" />
                  <span>UKK</span>
                </button>
              </div>
            </div>

            {/* Downward pointer notch */}
            <div className="absolute -bottom-1.5 right-7 w-3.5 h-3.5 bg-[#00001C] border-r-2 border-b-2 border-[#C5A059] transform rotate-45" />
          </div>
        </div>
      )}

      {/* Floating Trigger Button (Magnetic, glowing & animated) */}
      {!isOpen && (
        <div className="pointer-events-auto relative group">
          {/* Animated Pulsing Golden Halo / Glow behind the button */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#B38E44] via-[#C5A059] to-[#F1D487] opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg animate-pulse transition-all duration-500" />
          
          {/* Expanding Ping Ring */}
          <div className="absolute -inset-1 rounded-full border-2 border-[#C5A059] opacity-40 animate-ping pointer-events-none" />

          {/* Floating Pill Tag above button */}
          <div className="absolute -top-3 -left-3 z-10 bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-[10px] tracking-wide px-2 py-0.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1 animate-bounce">
            <BadgePercent className="w-3 h-3" />
            <span>-10%</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setCurrentView('menu');
              setShowPreview(false);
            }}
            aria-label="Avaa Pinnoittaja Pertti"
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#8E6D24] via-[#C5A059] to-[#F9E29B] p-0.5 shadow-2xl shadow-black/80 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#C5A059]/50"
          >
            {/* Inner Dark Glass Disc */}
            <div className="w-full h-full rounded-full bg-[#00001C] flex items-center justify-center text-[#C5A059] group-hover:bg-[#00001C]/90 transition-colors">
              <div className="relative flex items-center justify-center">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-[#C5A059] fill-[#C5A059]/20 stroke-[2.2] group-hover:rotate-6 transition-transform" />
                <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            </div>

            {/* Online Green Pulsing Indicator */}
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-[#00001C] rounded-full shadow-sm flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </span>
          </button>
        </div>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="pointer-events-auto w-[calc(100vw-2rem)] sm:w-[390px] h-[600px] max-h-[calc(100vh-4.5rem)] rounded-2xl bg-[#00001C] border border-[#C5A059]/40 shadow-2xl shadow-black/90 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">
          
          {/* Header */}
          <div className="bg-gradient-to-b from-[#0e1329] to-[#00001C] p-3.5 sm:p-4 border-b border-white/10 relative shrink-0">
            {/* When in Menu: Clean brand header */}
            {currentView === 'menu' && (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#9B772E] via-[#C5A059] to-[#F1D487] flex items-center justify-center text-[#00001C] font-black shrink-0 shadow-md">
                    <Shield className="w-5 h-5 fill-[#00001C]/25 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white truncate">
                        Pinnoittaja Pertti
                      </h3>
                      <span className="bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded">
                        Asiantuntija
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      <span>Paikalla</span>
                      <span className="text-white/30">•</span>
                      <span className="text-[#F1D487] font-semibold">Syysetu -10%</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Sulje apuri"
                  aria-label="Sulje apuri"
                  className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* When in Calculator: Back to menu button, Title, Reset, and Close */}
            {currentView === 'calculator' && (
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={() => setCurrentView('menu')}
                      className="flex items-center gap-1 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/15 px-2.5 py-1.5 rounded-lg transition-all border border-white/10 shrink-0 cursor-pointer"
                      title="Takaisin valikkoon"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="font-semibold">Valikko</span>
                    </button>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white truncate">
                        Hinta-arviolaskuri
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] text-[#F1D487]">
                        <BadgePercent className="w-3 h-3" />
                        <span>Syysetu -10%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={handleReset}
                      title="Aloita alusta"
                      aria-label="Aloita alusta"
                      className="p-1.5 text-white/60 hover:text-[#C5A059] hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      title="Sulje apuri"
                      aria-label="Sulje apuri"
                      className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2.5 pt-1.5 border-t border-white/5">
                  <div className="flex items-center justify-between text-[10px] font-medium text-white/60 mb-1">
                    <span>{step <= 4 ? `Vaihe ${step}/4` : 'Valmis!'}</span>
                    <span className="text-[#C5A059] font-semibold">
                      {step === 1 && 'Tilan valinta'}
                      {step === 2 && 'Rasitustaso'}
                      {step === 3 && 'Pinta-ala'}
                      {step === 4 && 'Hinta-arvio & etu'}
                      {step === 5 && 'Vahvistettu (-10 %)'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#B38E44] via-[#C5A059] to-[#F1D487] transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* When in FAQ: Back to menu button, Title, Calculator shortcut, and Close */}
            {currentView === 'faq' && (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    type="button"
                    onClick={() => setCurrentView('menu')}
                    className="flex items-center gap-1 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/15 px-2.5 py-1.5 rounded-lg transition-all border border-white/10 shrink-0 cursor-pointer"
                    title="Takaisin valikkoon"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="font-semibold">Valikko</span>
                  </button>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white truncate">
                      Usein kysyttyä (UKK)
                    </h3>
                    <p className="text-[10px] text-white/60">Tietoa pinnoituksesta</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setCurrentView('calculator')}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00001C] bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:brightness-110 px-2.5 py-1.5 rounded-lg transition-all shadow-sm cursor-pointer"
                  >
                    <Calculator className="w-3 h-3" />
                    <span>Laskuri</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    title="Sulje apuri"
                    aria-label="Sulje apuri"
                    className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* VIEW 0: MENU (2 DISTINCT OPTIONS) */}
          {currentView === 'menu' && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between scrollbar-thin">
              <div className="space-y-3.5">
                {/* Bot Greeting Bubble */}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#9B772E] to-[#C5A059] flex items-center justify-center text-[#00001C] shrink-0 mt-0.5 shadow-md">
                    <Shield className="w-4 h-4 fill-[#00001C]/25" />
                  </div>
                  <div className="bg-[#10152B] border border-[#C5A059]/30 text-white text-xs sm:text-[13px] p-3.5 rounded-2xl rounded-tl-xs shadow-lg leading-relaxed">
                    <p className="font-semibold text-white">Moro! Olen Pinnoittaja Pertti. 👋</p>
                    <p className="text-white/80 mt-1">Miten voin auttaa sinua tänään? Valitse alta sinulle sopivin vaihtoehto:</p>
                  </div>
                </div>

                {/* THE 2 MAIN OPTIONS */}
                <div className="space-y-3 pt-1">
                  {/* OPTION 1: HINTA-ARVIOLASKURI */}
                  <button
                    type="button"
                    onClick={() => setCurrentView('calculator')}
                    className="w-full text-left bg-gradient-to-br from-[#131B38] via-[#0E142B] to-[#0A0D1F] hover:from-[#1A244A] hover:to-[#121835] border-2 border-[#C5A059] hover:border-[#F3E5AB] p-4 rounded-2xl transition-all shadow-xl hover:shadow-[#C5A059]/25 hover:scale-[1.01] active:scale-[0.99] group cursor-pointer relative overflow-hidden"
                  >
                    {/* Golden ambient corner light */}
                    <div className="absolute top-0 right-0 w-28 h-28 bg-[#C5A059]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#C5A059]/30 transition-all" />

                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9B772E] via-[#C5A059] to-[#F1D487] flex items-center justify-center text-[#00001C] shadow-md shrink-0 group-hover:scale-105 transition-transform">
                        <Calculator className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                        <Sparkles className="w-3 h-3 fill-current" />
                        <span>Syysetu -10 %</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#F1D487] transition-colors">
                        Hinta-arviolaskuri
                      </h4>
                      <div className="w-7 h-7 rounded-full bg-[#C5A059]/20 group-hover:bg-[#C5A059] flex items-center justify-center text-[#C5A059] group-hover:text-[#00001C] transition-all">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    <p className="text-xs text-white/75 leading-relaxed mt-1.5">
                      Laske nopea hinta-arvio autotallin tai toimitilan lattialle 30 sekunnissa ja lukitse syysetu.
                    </p>

                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#F1D487] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>4 nopeaa valintaa • Ei sitoutumispakkoa</span>
                    </div>
                  </button>

                  {/* OPTION 2: USEIN KYSYTYT KYSYMYKSET (UKK) */}
                  <button
                    type="button"
                    onClick={() => setCurrentView('faq')}
                    className="w-full text-left bg-[#10152B] hover:bg-[#151C3A] border border-white/15 hover:border-[#C5A059]/60 p-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] group cursor-pointer relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-all">
                        <HelpCircle className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="text-white/70 text-[10px] font-semibold bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                        6 yleisintä kysymystä
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#F1D487] transition-colors">
                        Usein kysyttyä (UKK)
                      </h4>
                      <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#C5A059]/20 flex items-center justify-center text-white/50 group-hover:text-[#C5A059] transition-all">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    <p className="text-xs text-white/75 leading-relaxed mt-1.5">
                      Asennusaika, nastarenkaiden kesto, liukkaus märkänä, neliöhinnat ja kotitalousvähennys.
                    </p>

                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/60">
                      <span>⏱️ Asennusaika • ❄️ Nastoitus • 🏛️ Vähennys</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 1: CALCULATOR & CHAT MESSAGES */}
          {currentView === 'calculator' && (
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => {
                // ============================================
                // 1. CUSTOMER / USER MESSAGE (Striking Shiny Gold Bubble)
                // ============================================
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="flex flex-col items-end space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-white/60 mr-1">
                        <span>Sinä</span>
                        <User className="w-3 h-3 text-[#C5A059]" />
                      </div>
                      <div className="bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#E5C158] text-[#00001C] font-semibold text-xs sm:text-[13px] px-4 py-2.5 rounded-2xl rounded-tr-xs max-w-[85%] shadow-md shadow-[#C5A059]/20 border border-[#F3E5AB]/40 whitespace-pre-line leading-relaxed">
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                // ============================================
                // 2. BOT / AI MESSAGE (Distinctive Deep Navy-Slate Bubble)
                // ============================================
                return (
                  <div
                    key={msg.id}
                    ref={msg.id.startsWith('rec-msg') ? priceMsgRef : undefined}
                    className="flex items-start gap-2.5"
                  >
                    {/* Bot Avatar */}
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#9B772E] to-[#C5A059] flex items-center justify-center text-[#00001C] shrink-0 mt-0.5 shadow-sm">
                      <Shield className="w-4 h-4 fill-[#00001C]/25" />
                    </div>

                    <div className="flex-1 space-y-2 max-w-[88%]">
                      {/* Bot Name label */}
                      <div className="flex items-center gap-1.5 text-[10px] text-[#C5A059] font-semibold ml-1">
                        <span>Pinnoittaja Pertti</span>
                        <span className="text-white/30">•</span>
                        <span className="text-white/50 text-[9px] font-normal">Lattia-asiantuntija</span>
                      </div>

                      {/* Bot Text Bubble (Dark Slate with Subtle Gold Glow Border) */}
                      {msg.text && (
                        <div className="bg-[#10152B] text-slate-100 border border-[#C5A059]/30 text-xs sm:text-[13px] px-3.5 py-2.5 rounded-2xl rounded-tl-xs shadow-lg shadow-black/40 leading-relaxed whitespace-pre-line">
                          {/* Format recommendation bolding and emojis cleanly */}
                          {msg.text.split('\n').map((paragraph, i) => {
                            if (paragraph.startsWith('👉 **')) {
                              const clean = paragraph.replace('👉 **', '').replace('**', '');
                              return (
                                <div key={i} className="my-2.5 p-3.5 bg-gradient-to-r from-[#C5A059]/25 via-[#C5A059]/15 to-transparent border-2 border-[#C5A059] rounded-xl shadow-lg">
                                  <div className="text-[10px] uppercase font-black tracking-wider text-[#F1D487] mb-1 flex items-center gap-1">
                                    <Sparkles className="w-3.5 h-3.5 text-[#F1D487]" />
                                    <span>SUOSITUS JA HINTA-ARVIO:</span>
                                  </div>
                                  <div className="font-bold text-white text-xs sm:text-[14px] leading-snug">{clean}</div>
                                </div>
                              );
                            }
                            if (paragraph.includes('Syyskampanja:')) {
                              return (
                                <div key={i} className="my-2 p-2.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-400/40 rounded-xl text-emerald-200 text-xs font-medium flex items-center gap-2">
                                  <BadgePercent className="w-4 h-4 shrink-0 text-emerald-300" />
                                  <span>Saat <strong>-10 % alennuksen</strong> koodilla <strong className="text-emerald-300 underline font-bold">Syksy10</strong>!</span>
                                </div>
                              );
                            }
                            return <p key={i} className={i > 0 ? 'mt-1.5' : ''}>{paragraph}</p>;
                          })}
                        </div>
                      )}

                      {/* Step 1: Space Options */}
                      {msg.component === 'space-options' && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {SPACE_OPTIONS.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectSpace(opt)}
                              className="bg-[#141A35] hover:bg-[#C5A059] hover:text-[#00001C] text-white/90 text-xs font-medium px-3 py-2 rounded-xl border border-white/10 hover:border-[#C5A059] transition-all text-left shadow-sm active:scale-95 cursor-pointer"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Step 1b: Custom Space Input */}
                      {msg.component === 'other-input' && (
                        <form onSubmit={handleCustomSpaceSubmit} className="flex items-center gap-1.5 pt-1">
                          <input
                            type="text"
                            value={otherSpaceInput}
                            onChange={(e) => setOtherSpaceInput(e.target.value)}
                            placeholder="Kirjoita tilasi tyyppi tähän..."
                            autoFocus
                            className="flex-1 bg-[#141A35] text-white placeholder-white/40 text-xs px-3 py-2.5 rounded-xl border border-white/20 focus:outline-none focus:border-[#C5A059]"
                          />
                          <button
                            type="submit"
                            disabled={!otherSpaceInput.trim()}
                            className="bg-[#C5A059] hover:bg-[#B38E44] disabled:opacity-50 text-[#00001C] p-2.5 rounded-xl font-bold transition-all cursor-pointer"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      )}

                      {/* Step 2: Wear level options */}
                      {msg.component === 'wear-options' && (
                        <div className="space-y-1.5 pt-1">
                          {WEAR_OPTIONS.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectWear(opt)}
                              className="w-full text-left bg-[#141A35] hover:bg-[#1C254B] p-2.5 rounded-xl border border-white/10 hover:border-[#C5A059] transition-all group active:scale-95 cursor-pointer"
                            >
                              <div className="text-xs font-bold text-white group-hover:text-[#F1D487] transition-colors">
                                {opt.title}
                              </div>
                              <div className="text-[11px] text-white/70 leading-snug mt-0.5">
                                {opt.subtext}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Step 3: Floor Size Options */}
                      {msg.component === 'size-options' && (
                        <div className="flex flex-col gap-1.5 pt-1">
                          {SIZE_OPTIONS.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleSelectSize(size)}
                              className="bg-[#141A35] hover:bg-[#C5A059] hover:text-[#00001C] text-white text-xs font-medium px-3.5 py-2.5 rounded-xl border border-white/10 hover:border-[#C5A059] transition-all text-left shadow-sm active:scale-95 cursor-pointer"
                            >
                              📐 {size}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Step 4: Lead Form */}
                      {msg.component === 'lead-form' && (
                        <form onSubmit={handleLeadSubmit} className="bg-[#10152B] border-2 border-[#C5A059]/40 rounded-2xl p-3.5 space-y-2.5 mt-2 shadow-xl">
                          <div className="pb-1.5 mb-1 border-b border-white/10 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-[#F1D487] flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                              <span>Lukitse syysetu -10 % ja tilaa arvio</span>
                            </span>
                            <span className="text-[10px] text-white/50">Maksuton</span>
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-white/90 mb-1">
                              Nimi / Yritys <span className="text-[#C5A059]">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Matti Meikäläinen"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-[#00001C] text-white text-xs px-3 py-2 rounded-xl border border-white/20 focus:border-[#C5A059] focus:outline-none"
                            />
                            {formErrors.name && <p className="text-[10px] text-rose-400 mt-0.5">{formErrors.name}</p>}
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-white/90 mb-1">
                              Sähköposti <span className="text-[#C5A059]">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="matti@esimerkki.fi"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-[#00001C] text-white text-xs px-3 py-2 rounded-xl border border-white/20 focus:border-[#C5A059] focus:outline-none"
                            />
                            {formErrors.email && <p className="text-[10px] text-rose-400 mt-0.5">{formErrors.email}</p>}
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-white/90 mb-1">
                              Puhelinnumero <span className="text-[#C5A059]">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="040 123 4567"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-[#00001C] text-white text-xs px-3 py-2 rounded-xl border border-white/20 focus:border-[#C5A059] focus:outline-none"
                            />
                            {formErrors.phone && <p className="text-[10px] text-rose-400 mt-0.5">{formErrors.phone}</p>}
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-white/90 mb-1">
                              Postinumero / Paikkakunta (Vapaaehtoinen)
                            </label>
                            <input
                              type="text"
                              placeholder="90100 Oulu"
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              className="w-full bg-[#00001C] text-white text-xs px-3 py-2 rounded-xl border border-white/20 focus:border-[#C5A059] focus:outline-none"
                            />
                          </div>

                          <div className="pt-1">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#F1D487] hover:brightness-110 active:scale-98 disabled:opacity-50 text-[#00001C] font-extrabold text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-lg shadow-[#C5A059]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              {isSubmitting ? (
                                <span>Lähetetään tietoja...</span>
                              ) : (
                                <>
                                  <span>PYYDÄ HINTA-ARVIO (-10 %)</span>
                                  <ArrowRight className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-[10px] text-white/50 text-center">
                            Ei sitoutumispakkoa. Vastaamme 24h sisällä.
                          </p>
                        </form>
                      )}

                      {/* Step 5: Success Card */}
                      {msg.component === 'success-card' && (
                        <div className="bg-emerald-500/15 border-2 border-emerald-500/40 rounded-2xl p-4 space-y-3 mt-1 shadow-xl">
                          <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <span className="font-bold text-xs sm:text-sm">Hinta-arviopyyntö vastaanotettu!</span>
                          </div>

                          <div className="space-y-1.5 text-[11px] text-white/90 bg-black/40 p-2.5 rounded-xl border border-white/10">
                            <div className="flex justify-between">
                              <span className="text-white/50">Kohde:</span>
                              <span className="font-medium text-white">{selectedSpace}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/50">Pinta-ala:</span>
                              <span className="font-medium text-white">{selectedSize.split(' ')[0]} {selectedSize.split(' ')[1] || ''}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/50">Alennuskoodi:</span>
                              <span className="font-bold text-[#F1D487]">Syksy10 (-10 %)</span>
                            </div>
                          </div>

                          <a
                            href="https://railopinnoitus.fi"
                            onClick={() => setIsOpen(false)}
                            className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                          >
                            <span>Siirry etusivulle</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#9B772E] to-[#C5A059] flex items-center justify-center text-[#00001C] shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 fill-[#00001C]/25" />
                  </div>
                  <div className="bg-[#10152B] border border-[#C5A059]/30 rounded-2xl rounded-tl-xs px-4 py-2.5 flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Quick UKK trigger chip bar inside chat */}
              <div className="pt-2 border-t border-white/5">
                <div className="text-[10px] text-white/50 mb-1.5 flex items-center justify-between">
                  <span>💡 Askarruttaako jokin?</span>
                  <button 
                    type="button" 
                    onClick={() => setCurrentView('faq')} 
                    className="text-[#C5A059] hover:underline font-semibold text-[10px] cursor-pointer"
                  >
                    Avaa kaikki UKK →
                  </button>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide text-[11px]">
                  <button
                    type="button"
                    onClick={() => handleFaqInChat(FAQ_ITEMS[0])}
                    className="shrink-0 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/10 transition-all text-left cursor-pointer"
                  >
                    ⏱️ Asennusaika?
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFaqInChat(FAQ_ITEMS[1])}
                    className="shrink-0 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/10 transition-all text-left cursor-pointer"
                  >
                    ❄️ Kestääkö nastoja?
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFaqInChat(FAQ_ITEMS[2])}
                    className="shrink-0 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/10 transition-all text-left cursor-pointer"
                  >
                    🛡️ Onko liukas?
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFaqInChat(FAQ_ITEMS[4])}
                    className="shrink-0 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/10 transition-all text-left cursor-pointer"
                  >
                    🏛️ Kotitalousvähennys?
                  </button>
                </div>
              </div>

              <div ref={chatEndRef} />
            </div>
          )}

          {/* VIEW 2: FAQ / USEIN KYSYTYT KYSYMYKSET ACCORDION */}
          {currentView === 'faq' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-thin">
              <div className="bg-[#10152B] p-3 rounded-xl border border-[#C5A059]/30 mb-3 text-xs text-white/80 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-xs">Mietityttääkö lattian pinnoitus?</div>
                  <p className="text-[11px] text-white/70 mt-0.5">Tässä ovat yleisimmät kysymykset vastauksineen. Voit aina laskea suoran arvion laskurilla!</p>
                </div>
              </div>

              {FAQ_ITEMS.map((faq, idx) => {
                const isOpenFaq = openFaqIndex === idx;
                return (
                  <div 
                    key={faq.id} 
                    className="bg-[#10152B] border border-white/10 rounded-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpenFaq ? null : idx)}
                      className="w-full p-3 text-left flex items-center justify-between gap-2 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <span className={`text-xs font-semibold ${isOpenFaq ? 'text-[#F1D487]' : 'text-white'}`}>
                        {faq.q}
                      </span>
                      {isOpenFaq ? (
                        <ChevronUp className="w-4 h-4 text-[#C5A059] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white/50 shrink-0" />
                      )}
                    </button>

                    {isOpenFaq && (
                      <div className="px-3 pb-3 text-[11px] sm:text-xs text-white/80 leading-relaxed border-t border-white/5 pt-2">
                        <p>{faq.a}</p>
                        
                        <div className="mt-2.5 pt-2 border-t border-white/5 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setCurrentView('calculator')}
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#00001C] bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:brightness-110 px-3 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer"
                          >
                            <span>Laske hinta omalle lattialle (-10%)</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Chat Footer Note */}
          <div className="p-2.5 bg-[#050714] border-t border-white/5 text-[10px] text-white/50 text-center flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#C5A059]" />
              <span>Vastausaika alle 24h</span>
            </div>
            <span className="text-white/40 font-medium">Pinnoittaja Pertti</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadChatWidget;
