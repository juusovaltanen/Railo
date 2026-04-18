import React from 'react';
import { ClipboardList, Zap, Clock, Handshake } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Arviointi & valinta",
    subtitle: "Ilmainen",
    description: "Otat yhteyttä, tulemme käymään. Valitaan yhdessä tilaan sopiva epoksi ja lyödään hinta lukkoon. Ei yllätyksiä.",
    icon: ClipboardList
  },
  {
    id: 2,
    title: "Työmaa",
    subtitle: "1–2 päivää!",
    description: "Voit tyhjentää tilan itse tai me hoidamme sen puolestasi pienestä lisähinnasta. Pölytön timanttihionta ja pinnoitus hoituvat ammattitaidolla nopeasti.",
    icon: Zap
  },
  {
    id: 3,
    title: "Kuivuminen",
    subtitle: "24h / 1 viikko",
    description: "Lattia on kävelykuiva vuorokaudessa. Raskaan kaluston ja autot voi ajaa sisään noin viikon kuluttua asennuksesta.",
    icon: Clock
  },
  {
    id: 4,
    title: "Takuu & kättely",
    subtitle: "Takuulla",
    description: "Työllemme annetaan takuu. Tulemme tarvittaessa tarkistamaan, että jälki on priimaa ja lattia juuri sellainen kuin sovittiin.",
    icon: Handshake
  }
];

const UnifiedProcessTimeline: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden border-t border-[#00001C]/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-[#00001C] tracking-tight leading-tight px-4">
            Näin helposti lattiasi uudistuu
          </h2>
        </div>

        <div className="bg-[#00001C] rounded-[4rem] p-12 md:p-20 shadow-2xl shadow-black/40 border border-white/5 relative">
          <div className="relative">
            {/* Desktop Connection Line */}
            <div className="hidden lg:block absolute top-10 left-0 w-full h-[1px] bg-[#D4AF37]/20 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-8 relative z-10">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="relative group cursor-default">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                      
                      {/* Step Marker */}
                      <div className="w-20 h-20 rounded-full bg-[#D4AF37] flex items-center justify-center mb-10 shadow-lg shadow-[#D4AF37]/10 relative z-10 transition-all duration-500 group-hover:scale-105">
                        <span className="text-2xl font-semibold text-white">{step.id}</span>
                      </div>

                      {/* Content */}
                      <div className="px-4 lg:px-0">
                        <div className="mb-4 flex flex-col lg:flex-row items-center lg:items-start gap-4">
                          <Icon size={20} className="text-[#D4AF37] opacity-60 shrink-0" />
                          <h3 className="text-xl font-semibold text-white tracking-tight transition-colors duration-300">
                            {step.title}
                          </h3>
                        </div>
                        
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-4 text-[#D4AF37]">
                          {step.subtitle}
                        </p>

                        <p className="text-white/60 text-sm font-normal leading-relaxed tracking-normal max-w-xs">
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
      </div>
    </section>
  );
};

export default UnifiedProcessTimeline;
