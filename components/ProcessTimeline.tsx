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
    <section className="py-32 bg-white overflow-hidden border-t border-[#00001C]/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#00001C] tracking-tight leading-tight">
            Näin helposti lattiasi uudistuu
          </h2>
        </div>

        <div className="relative">
          {/* Desktop Connection Line */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-[1px] bg-[#D4AF37]/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => {
              return (
                <div key={step.id} className="relative group">
                  {/* Mobile Connection Line */}
                  {index !== steps.length - 1 && (
                    <div className="lg:hidden absolute left-1/2 top-20 w-[1px] h-24 bg-[#D4AF37]/10 z-0 -translate-x-1/2" />
                  )}

                  <div className={`flex flex-col items-center text-center transition-all duration-500`}>
                    
                    {/* Number Circle */}
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-10 transition-all duration-500 shadow-lg ${
                      step.highlight 
                        ? 'bg-[#D4AF37] text-white shadow-[#D4AF37]/20 scale-110' 
                        : 'bg-white text-[#D4AF37] border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50'
                    }`}>
                      <span className="text-2xl font-semibold">{step.id}</span>
                    </div>

                    {/* Content */}
                    <div className={`p-6 rounded-[2rem] transition-all duration-500`}>
                      <h3 className="text-xl font-semibold text-[#00001C] tracking-tight mb-2">
                        {step.title}
                      </h3>
                      <p className={`text-xs font-semibold uppercase tracking-widest ${step.highlight ? 'text-[#D4AF37]' : 'text-[#00001C]/40'}`}>
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
