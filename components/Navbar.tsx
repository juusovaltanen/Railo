import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { triggerBookingModal } from './BookingModal';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock on mobile when fullscreen menu is open
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (isMobileMenuOpen && window.innerWidth < 768) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleResize = () => {
        if (window.innerWidth >= 768) {
          document.body.style.overflow = originalOverflow;
        } else {
          document.body.style.overflow = 'hidden';
        }
      };

      window.addEventListener('resize', handleResize);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isMobileMenuOpen]);

  // Keyboard Escape listener
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Focus management: shift focus into dialog when opened, return to trigger when closed
  useEffect(() => {
    if (isMobileMenuOpen) {
      wasOpenRef.current = true;
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      menuButtonRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Etusivu', path: '/' },
    { name: 'Laske hinta-arvio', path: '/laskuri' },
    { name: 'Palvelut', path: '/palvelut' },
    { name: 'Referenssit', path: '/referenssit' },
    { name: 'Meistä', path: '/meista' },
    { name: 'Blogi', path: '/blogi' },
    { name: 'UKK', path: '/ukk' },
    { name: 'Ota yhteyttä', path: '/yhteystiedot' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${(isScrolled || !isHomePage) ? 'bg-[#00001C] border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={scrollToTop} className="flex items-center group">
            <img 
              src="https://i.postimg.cc/B6jNmvjK/RAILO_NIMI_SININEN.jpg" 
              alt="Railo Pinnoitus - Epoksilattiat Oulu Logo" 
              className="h-16 md:h-20 w-auto object-contain rounded-sm"
            />
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-4 relative">
            <Link
              to="/laskuri"
              className="hidden sm:inline-flex items-center bg-[#D4AF37] hover:bg-[#AA8B2E] text-white px-5 py-2.5 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all shadow-lg shadow-[#D4AF37]/20"
            >
              Laske hinta-arvio
            </Link>
            <Link
              to="/yhteystiedot"
              className="hidden lg:inline-flex items-center border border-[#D4AF37]/60 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-white px-5 py-2.5 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all"
            >
              Ota yhteyttä
            </Link>

            {/* Menu Button & Dropdown Container */}
            <div className="relative">
              <button
                ref={menuButtonRef}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label={isMobileMenuOpen ? 'Sulje valikko' : 'Avaa valikko'}
                className="flex items-center gap-2 p-2 text-white hover:text-[#D4AF37] transition-colors group cursor-pointer"
              >
                <span className="text-[10px] uppercase font-semibold tracking-widest hidden md:block">Valikko</span>
                <span className="material-icons-outlined text-3xl group-hover:scale-110 transition-transform">{isMobileMenuOpen ? 'close' : 'menu'}</span>
              </button>

              {/* Desktop Dropdown Menu (md:block only, unchanged) */}
              {isMobileMenuOpen && (
                <div className="hidden md:block absolute top-full right-0 mt-6 w-64 bg-[#00001C] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="p-4 space-y-2">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        triggerBookingModal();
                      }}
                      className="block w-full text-left px-6 py-4 rounded-2xl text-sm font-medium text-[#D4AF37] hover:bg-white/5 transition-all cursor-pointer"
                    >
                      Kysy ilmaista arviokäyntiä
                    </button>
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-6 py-4 rounded-2xl text-sm font-medium transition-all ${
                          isActive(link.path) 
                            ? 'bg-white/10 text-[#D4AF37]' 
                            : link.path === '/laskuri'
                              ? 'text-[#D4AF37] hover:bg-white/5'
                              : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Menu Modal (< md) */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigointivalikko"
          className="fixed inset-0 z-[100] bg-[#00001C] flex flex-col md:hidden overflow-y-auto"
        >
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
            <Link to="/" onClick={scrollToTop} className="flex items-center">
              <img 
                src="https://i.postimg.cc/B6jNmvjK/RAILO_NIMI_SININEN.jpg" 
                alt="Railo Pinnoitus - Epoksilattiat Oulu Logo" 
                className="h-14 w-auto object-contain rounded-sm"
              />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Sulje valikko"
              className="p-2 text-white hover:text-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-lg transition-colors cursor-pointer"
            >
              <span className="material-icons-outlined text-3xl">close</span>
            </button>
          </div>

          {/* Navigation Links - Large & Clear */}
          <div className="flex-1 flex flex-col justify-between px-6 sm:px-8 py-8">
            <nav className="space-y-4">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={scrollToTop}
                    className={`block text-2xl font-bold tracking-tight transition-colors py-1 ${
                      active
                        ? 'text-[#D4AF37]'
                        : link.path === '/laskuri'
                          ? 'text-[#D4AF37] hover:text-[#AA8B2E]'
                          : 'text-white/90 hover:text-[#D4AF37]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons in Mobile Menu */}
            <div className="pt-8 mt-6 border-t border-white/10 space-y-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  triggerBookingModal();
                }}
                className="w-full text-center bg-[#D4AF37] hover:bg-[#AA8B2E] text-white py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
              >
                Kysy ilmaista arviokäyntiä
              </button>
              <Link
                to="/yhteystiedot"
                onClick={scrollToTop}
                className="block w-full text-center border border-[#D4AF37]/60 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-white py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              >
                Ota yhteyttä
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;