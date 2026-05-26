import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

export const triggerBookingModal = () => {
  window.dispatchEvent(new CustomEvent('open-booking-modal'));
};

const BookingModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    postcode: '',
    city: '',
    message: ''
  });

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSuccess(false);
      setShowFallback(false);
    };
    window.addEventListener('open-booking-modal', handleOpen);
    return () => window.removeEventListener('open-booking-modal', handleOpen);
  }, []);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowFallback(false);

    const data = new FormData();
    data.append('form-name', 'arviokaynti');
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('address', formData.address);
    data.append('postcode', formData.postcode);
    data.append('city', formData.city);
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
          phone: '',
          email: '',
          address: '',
          postcode: '',
          city: '',
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-[#00001C] border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-2xl shadow-black/60 text-white max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        id="booking-modal-container"
      >
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-white/50 hover:text-white hover:scale-110 transition-all p-3 rounded-full hover:bg-white/5 cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px]"
          id="booking-modal-close"
          aria-label="Sulje"
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-8 animate-in zoom-in-95 duration-500" id="booking-success-message">
            <div className="w-20 h-20 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#D4AF37]">Kiitos!</h3>
            <p className="text-white/70 font-medium leading-relaxed max-w-md mx-auto text-base">
              Otamme sinuun yhteyttä vuorokauden sisällä arviokäynnin sopimiseksi.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-[#D4AF37] hover:bg-[#AA8B2E] text-white px-10 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all shadow-xl shadow-[#D4AF37]/20 active:scale-95 cursor-pointer"
              id="booking-success-close-btn"
            >
              Sulje ikkuna
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] font-bold text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-4 border border-[#D4AF37]/20 animate-pulse">
                Maksuton palvelu
              </span>
              <h2 className="text-2xl md:text-4xl font-semibold leading-tight tracking-tight text-white">Tarkista ilmaisen arviokäynnin saatavuus kohteeseesi</h2>
              <p className="text-white/60 text-sm mt-3 font-medium text-left">
                Maksuton, paikan päällä tehtävä arviokäynti on saatavilla pääasiassa <span className="text-[#D4AF37] font-semibold">Oulun seudulla ja sen lähialueilla</span>. Täytä alle kohteesi tiedot selvittääksesi saatavuuden kohteeseesi – mittaamme ja arvioimme tilasi ilman sitoumuksia!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left" id="booking-request-form">
              {/* Perustiedot */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] ml-1">Perustiedot</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name-input" className="text-[10px] font-semibold uppercase tracking-widest text-white/40 ml-1">Koko nimi *</label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Matti Meikäläinen"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-base text-white focus:border-[#D4AF37] focus:ring-0 focus:outline-none transition-all placeholder:text-white/10 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone-input" className="text-[10px] font-semibold uppercase tracking-widest text-white/40 ml-1">Puhelinnumero *</label>
                    <input
                      id="phone-input"
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="010 123 4567"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-base text-white focus:border-[#D4AF37] focus:ring-0 focus:outline-none transition-all placeholder:text-white/10 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email-input" className="text-[10px] font-semibold uppercase tracking-widest text-white/40 ml-1">Sähköposti</label>
                  <input
                    id="email-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="matti@esimerkki.fi"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-base text-white focus:border-[#D4AF37] focus:ring-0 focus:outline-none transition-all placeholder:text-white/10 font-medium"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck="false"
                  />
                </div>
              </div>

              {/* Kohdetiedot */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] ml-1">Kohdetiedot</h4>
                
                <div className="space-y-2">
                  <label htmlFor="address-input" className="text-[10px] font-semibold uppercase tracking-widest text-white/50 ml-1">
                    Katuosoite *
                  </label>
                  <input
                    id="address-input"
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Esim. Aurinkotie 12 B 4"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-base text-white focus:border-[#D4AF37] focus:ring-0 focus:outline-none transition-all placeholder:text-white/10 font-medium"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 space-y-2">
                    <label htmlFor="postcode-input" className="text-[10px] font-semibold uppercase tracking-widest text-white/50 ml-1">
                      Postinumero *
                    </label>
                    <input
                      id="postcode-input"
                      required
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={5}
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      placeholder="90100"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-4 text-base text-white focus:border-[#D4AF37] focus:ring-0 focus:outline-none transition-all placeholder:text-white/10 font-medium text-center"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label htmlFor="city-input" className="text-[10px] font-semibold uppercase tracking-widest text-white/50 ml-1">
                      Kaupunki / Paikkakunta *
                    </label>
                    <input
                      id="city-input"
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Esim. Oulu"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-base text-white focus:border-[#D4AF37] focus:ring-0 focus:outline-none transition-all placeholder:text-white/10 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Lisätiedot */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <label htmlFor="message-textarea" className="text-[10px] font-semibold uppercase tracking-widest text-white/40 ml-1">
                    Toivottu ajankohta tai vapaa viesti <span className="text-white/30 text-[9px] lowercase font-normal">(vapaaehtoinen)</span>
                  </label>
                  <textarea
                    id="message-textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Esim. klo 16 jälkeen arkisin, tai tietoja pinnoitettavasta kohteesta..."
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 text-base text-white focus:border-[#D4AF37] focus:ring-0 focus:outline-none transition-all placeholder:text-white/10 resize-none font-medium"
                  ></textarea>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#AA8B2E] disabled:bg-[#D4AF37]/50 text-white py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-4 active:scale-[0.98] cursor-pointer hover:translate-y-[-2px] min-h-[44px]"
                  id="booking-submit-btn"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      Kysy ilmaista arviokäyntiä
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              
              {showFallback && (
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 animate-in fade-in duration-500 text-center" id="booking-submit-error">
                  <p className="text-white/60 text-xs mb-2">Lomakkeen lähetyksessä tapahtui virhe.</p>
                  <p className="text-white/80 font-semibold text-xs">
                    Voit tehdä varauksen myös sähköpostitse:{' '}
                    <a href="mailto:juuso.railopinnoitus@gmail.com" className="text-[#D4AF37] hover:underline break-all">
                      juuso.railopinnoitus@gmail.com
                    </a>
                  </p>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
