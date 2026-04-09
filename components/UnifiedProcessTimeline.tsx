import React from 'react';
import { ClipboardList, Zap, Clock, Handshake } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "ARVIOINTI & VALINTA",
    subtitle: "Ilmainen",
    description: "Otat yhteyttä, tulemme käymään. Valitaan yhdessä tilaan sopiva epoksi ja lyödään hinta lukkoon. Ei yllätyksiä.",
    icon: ClipboardList
  },
  {
    id: 2,
    title: "TYÖMAA",
    subtitle: "1–2 päivää!",
    description: "Voit tyhjentää tilan itse tai me hoidamme sen puolestasi pienestä lisähinnasta. Pölytön timanttihionta ja pinnoitus hoituvat ammattitaidolla nopeasti.",
    icon: Zap
  },
  {
    id: 3,
    title: "KUIVUMINEN",
    subtitle: "24h / 1 viikko",
    description: "Lattia on kävelykuiva vuorokaudessa. Raskaan kaluston ja autot voi ajaa sisään noin viikon kuluttua asennuksesta.",
    icon: Clock
  },
  {
    id: 4,
    title: "TAKUU & KÄTTELY",
    subtitle: "Takuulla",
    description: "Työllemme annetaan takuu. Tulemme tarvittaessa tarkistamaan, että jälki on priimaa ja lattia juuri sellainen kuin sovittiin.",
    icon: Handshake
  }
];

const UnifiedProcessTimeline: React.FC = () => {
  return (
    <section className="py-32 bg-background-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white uppercase italic tracking-tight leading-none">
            NÄIN HELPOSTI LATTIASI UUDISTUU
          </h2>
        </div>

        <div className="relative">
          {/* Desktop Connection Line */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-primary/30 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative group cursor-default">
                  <div className="flex flex-col items-center lg:items-start">
                    
                    {/* Step Marker (Gold ball, white number) */}
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-10 shadow-xl relative z-10 transition-transform duration-300 group-hover:scale-105">
                      <span className="text-2xl font-black text-white">{step.id}</span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-4 lg:px-0">
                      <div className="mb-4 flex items-center gap-3">
                        <Icon size={20} className="text-primary opacity-50" />
                        <h3 className="text-xl font-black uppercase italic tracking-tight text-slate-300 transition-colors duration-300 group-hover:text-white">
                          {step.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm font-black uppercase tracking-widest italic mb-4 text-slate-500 transition-colors duration-300 group-hover:text-primary">
                        {step.subtitle}
                      </p>

                      <p className="text-slate-400 text-sm font-bold italic leading-relaxed tracking-normal max-w-xs">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnifiedProcessTimeline;
