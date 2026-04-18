import React, { useState } from 'react';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  
  // Lomakkeen kenttien tila
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowFallback(false);

    const data = new FormData();
    data.append('form-name', 'tarjouspyynto');
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('neliomaara', formData.area);
    data.append('message', formData.message);

    try {
      const response = await fetch('/', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          area: '',
          message: ''
        });
      } else {
        setShowFallback(true);
      }
    } catch (error) {
      setShowFallback(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 bg-white">
      <SEO 
        title="Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"
      />
      <section className="py-48 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-32">
          <div className="space-y-24">
            <div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-[#00001C] mb-12 leading-tight tracking-tight">Ota yhteyttä</h1>
              <p className="text-xl text-[#00001C]/60 leading-relaxed max-w-lg font-medium">
                Pyydä tarjous tai kysy lisää. Olemme paikallinen kumppanisi Pohjois-Suomessa.
              </p>
            </div>

            <div className="space-y-12">
              <a href="mailto:railopinnoitus@gmail.com" className="flex flex-col sm:flex-row items-start sm:items-center gap-8 p-10 rounded-[3rem] bg-[#00001C] border border-white/5 hover:border-[#D4AF37]/30 transition-all group shadow-2xl shadow-black/20">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-icons-outlined text-4xl">mail</span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-3">Sähköposti</p>
                  <p className="text-xl md:text-2xl font-semibold text-white break-all tracking-tight">railopinnoitus@gmail.com</p>
                </div>
              </a>
              <a href="tel:+358458972344" className="flex flex-col sm:flex-row items-start sm:items-center gap-8 p-10 rounded-[3rem] bg-[#00001C] border border-white/5 hover:border-[#D4AF37]/30 transition-all group shadow-2xl shadow-black/20">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-icons-outlined text-4xl">phone</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-3">Puhelin</p>
                  <p className="text-4xl font-semibold text-white tracking-tight">045 897 2344</p>
                  <p className="text-sm font-semibold text-[#D4AF37] uppercase tracking-widest mt-2">Sakari Lumme</p>
                </div>
              </a>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 p-10 rounded-[3rem] bg-[#00001C] border border-white/5 shadow-2xl shadow-black/20">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <span className="material-icons-outlined text-4xl">place</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-3">Osoite</p>
                  <p className="text-2xl font-semibold text-white tracking-tight">Pölykuja 22, Liminka</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-[#00001C] border border-white/5 rounded-[4rem] p-12 md:p-20 shadow-2xl shadow-black/40 text-white">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-8 tracking-tight">Pyydä tarjous</h2>
              <p className="text-white/40 mb-16 font-semibold uppercase tracking-widest text-[10px]">Vastaamme tiedusteluihin arkisin 24h kuluessa.</p>

              {isSuccess ? (
                <div className="py-20 text-center space-y-8 animate-in zoom-in-95 duration-500">
                  <div className="w-28 h-28 bg-white/5 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-10">
                    <span className="material-icons-outlined text-7xl">check_circle</span>
                  </div>
                  <h3 className="text-4xl font-semibold tracking-tight">Kiitos!</h3>
                  <p className="text-white/70 font-medium leading-relaxed">Tarjouspyyntösi on vastaanotettu.<br />Olemme sinuun pian yhteydessä.</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-[#D4AF37] font-semibold uppercase tracking-widest text-xs hover:underline pt-10"
                  >
                    Lähetä uusi pyyntö
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-semibold uppercase tracking-widest text-white/40 ml-1">Koko nimi</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Matti Meikäläinen"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-6 px-8 text-white focus:border-[#D4AF37] focus:ring-0 transition-all placeholder:text-white/10 font-medium"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-semibold uppercase tracking-widest text-white/40 ml-1">Sähköposti</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="matti@esimerkki.fi"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-6 px-8 text-white focus:border-[#D4AF37] focus:ring-0 transition-all placeholder:text-white/10 font-medium"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-semibold uppercase tracking-widest text-white/40 ml-1">Puhelinnumero</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="010 123 4567"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-6 px-8 text-white focus:border-[#D4AF37] focus:ring-0 transition-all placeholder:text-white/10 font-medium"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-semibold uppercase tracking-widest text-white/40 ml-1">Lattian koko (m²)</label>
                      <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="25"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-6 px-8 text-white focus:border-[#D4AF37] focus:ring-0 transition-all placeholder:text-white/10 font-medium"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-semibold uppercase tracking-widest text-white/40 ml-1">Kuvaus kohteesta</label>
                      <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Esim. autotalli, uusi betonipinta..."
                        className="w-full bg-white/5 border border-white/5 rounded-2xl p-8 text-white focus:border-[#D4AF37] focus:ring-0 transition-all placeholder:text-white/10 resize-none font-medium text-base"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:bg-[#AA8B2E] disabled:bg-slate-200 text-white py-7 rounded-full text-sm font-semibold uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-4 active:scale-[0.98] hover:translate-y-[-2px]"
                  >
                    {isSubmitting ? (
                      <span className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        Lähetä tarjouspyyntö
                        <span className="material-icons-outlined text-xl">east</span>
                      </>
                    )}
                  </button>
                  
                  {showFallback && (
                    <div className="mt-8 bg-white/5 p-8 rounded-[2rem] border border-white/5 animate-in fade-in duration-500">
                      <p className="text-white/60 text-sm mb-3">Lomakkeen lähetyksessä tapahtui virhe.</p>
                      <p className="text-white/80 font-semibold">Voit myös laittaa viestiä suoraan: <a href="mailto:railopinnoitus@gmail.com" className="text-[#D4AF37] hover:underline break-all">railopinnoitus@gmail.com</a></p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;