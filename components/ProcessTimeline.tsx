import React from 'react';
import { ClipboardList, Zap, Clock, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Arviointi",
    subtitle: "Ilmainen",
    highlight: false
  },
  {
    id: 2,
    title: "Työmaa",
    subtitle: "1–2 päivää",
    highlight: true
  },
  {
    id: 3,
    title: "Kuivuminen",
    subtitle: "1 viikko",
    highlight: false
  },
  {
    id: 4,
    title: "Valmis",
    subtitle: "Takuulla",
    highlight: false
  }
];

const ProcessTimeline: React.FC = () => {
  return (
    <section className="py-32 bg-background-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4 block italic">Prosessimme</span>
          <h2 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tight leading-none">
            Näin helposti lattiasi uudistuu
          </h2>
        </div>

        <div className="relative">
          {/* Desktop Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => {
              return (
                <div key={step.id} className="relative group">
                  {/* Mobile Connection Line */}
                  {index !== steps.length - 1 && (
                    <div className="lg:hidden absolute left-1/2 top-20 w-px h-24 bg-white/10 z-0 -translate-x-1/2" />
                  )}

                  <div className={`flex flex-col items-center text-center transition-all duration-500 ${step.highlight ? 'scale-110 lg:scale-125 z-20' : 'z-10'}`}>
                    
                    {/* Number/Icon Circle */}
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 transition-all duration-500 shadow-2xl ${
                      step.highlight 
                        ? 'bg-primary text-white shadow-primary/40 ring-4 ring-primary/20 scale-110' 
                        : 'bg-surface-dark text-slate-400 border border-white/5 group-hover:border-primary/50 group-hover:text-primary'
                    }`}>
                      <span className="text-2xl font-black italic">{step.id}</span>
                    </div>

                    {/* Content */}
                    <div className={`p-6 rounded-[2rem] transition-all duration-500 ${
                      step.highlight 
                        ? 'bg-surface-dark border border-primary/30 shadow-[0_0_40px_rgba(19,127,236,0.15)]' 
                        : 'bg-transparent border border-transparent'
                    }`}>
                      <h3 className="text-2xl font-black text-white uppercase italic tracking-tight leading-tight mb-2">
                        {step.title}
                      </h3>
                      <p className={`text-sm font-bold uppercase tracking-widest italic ${step.highlight ? 'text-primary' : 'text-slate-500'}`}>
                        {step.subtitle}
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

export default ProcessTimeline;
