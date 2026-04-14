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
    <div className="pt-20">
      <SEO 
        title="Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"
      />
      <section className="py-32 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-24">
          <div className="space-y-20">
            <div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-10 leading-none tracking-tighter uppercase italic">Ota yhteyttä</h1>
              <p className="text-2xl text-slate-400 leading-relaxed max-w-md font-bold italic tracking-normal">
                Pyydä tarjous tai kysy lisää. Olemme paikallinen kumppanisi Pohjois-Suomessa.
              </p>
            </div>

            <div className="space-y-10">
              <a href="mailto:railopinnoitus@gmail.com" className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 p-8 sm:p-10 rounded-[2.5rem] bg-surface-dark border border-white/5 hover:border-primary/50 transition-all group shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-icons-outlined text-5xl">mail</span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Sähköposti</p>
                  <p className="text-xl md:text-2xl font-black text-white break-all italic tracking-tight">railopinnoitus@gmail.com</p>
                </div>
              </a>
              <a href="tel:+358458972344" className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 p-8 sm:p-10 rounded-[2.5rem] bg-surface-dark border border-white/5 hover:border-primary/50 transition-all group shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-icons-outlined text-5xl">phone</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Puhelin</p>
                  <p className="text-4xl font-black text-white italic tracking-tighter">045 897 2344</p>
                </div>
              </a>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 p-8 sm:p-10 rounded-[2.5rem] bg-surface-dark border border-white/5 shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-icons-outlined text-5xl">place</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Osoite</p>
                  <p className="text-3xl font-black text-white uppercase tracking-tighter italic">Pölykuja 22, Liminka</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-surface-dark border border-white/5 rounded-[3.5rem] p-12 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">Pyydä tarjous</h2>
              <p className="text-slate-400 mb-12 font-bold uppercase tracking-widest text-xs italic">Vastaamme tiedusteluihin arkisin 24h kuluessa.</p>

              {isSuccess ? (
                <div className="py-20 text-center space-y-8 animate-in zoom-in-95 duration-500">
                  <div className="w-28 h-28 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-primary/20">
                    <span className="material-icons-outlined text-7xl">check_circle</span>
                  </div>
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">Kiitos!</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm leading-relaxed">Tarjouspyyntösi on vastaanotettu. Olemme sinuun pian yhteydessä.</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-primary font-bold uppercase tracking-widest text-xs hover:underline pt-10 italic"
                  >
                    Lähetä uusi pyyntö
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Koko Nimi</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Matti Meikäläinen"
                        className="w-full bg-background-dark/50 border-white/5 rounded-2xl py-6 px-8 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-700 font-bold uppercase tracking-widest"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Sähköposti</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="matti@esimerkki.fi"
                        className="w-full bg-background-dark/50 border-white/5 rounded-2xl py-6 px-8 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-700 font-bold uppercase tracking-widest"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Puhelinnumero</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="010 123 4567"
                        className="w-full bg-background-dark/50 border-white/5 rounded-2xl py-6 px-8 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-700 font-bold uppercase tracking-widest"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Lattian Koko (m²)</label>
                      <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="25"
                        className="w-full bg-background-dark/50 border-white/5 rounded-2xl py-6 px-8 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-700 font-bold uppercase tracking-widest"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Kuvaus Kohteesta</label>
                      <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Esim. autotalli, uusi betonipinta..."
                        className="w-full bg-background-dark/50 border-white/5 rounded-2xl p-8 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-700 resize-none font-bold uppercase tracking-widest text-sm"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-primary hover:bg-secondary disabled:bg-slate-700 text-white py-7 rounded-2xl text-xl font-bold uppercase tracking-widest transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 active:scale-[0.98] italic"
                  >
                    {isSubmitting ? (
                      <span className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        Lähetä tarjouspyyntö
                        <span className="material-icons-outlined text-2xl">send</span>
                      </>
                    )}
                  </button>
                  
                  {showFallback && (
                    <div className="mt-8 bg-background-dark/50 p-6 rounded-2xl border border-white/5 animate-in fade-in duration-500">
                      <p className="text-slate-400 text-sm mb-2">Lomakkeen lähetyksessä tapahtui virhe.</p>
                      <p className="text-slate-300 font-bold italic">Voit myös laittaa viestiä suoraan: <a href="mailto:railopinnoitus@gmail.com" className="text-primary hover:underline break-all">railopinnoitus@gmail.com</a></p>
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