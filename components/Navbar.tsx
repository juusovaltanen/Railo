import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              className="hidden sm:inline-flex items-center bg-[#D4AF37] hover:bg-[#AA8B2E] text-white px-5 py-2 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all shadow-lg shadow-[#D4AF37]/20"
            >
              Laske hinta-arvio
            </Link>
            <Link
              to="/yhteystiedot"
              className="hidden lg:inline-flex items-center border border-white/20 hover:bg-white/5 text-white px-5 py-2 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all"
            >
              Ota yhteyttä
            </Link>

            {/* Menu Button & Dropdown Container */}
            <div className="relative">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-2 p-2 text-white hover:text-[#D4AF37] transition-colors group"
              >
                <span className="text-[10px] uppercase font-semibold tracking-widest hidden md:block">Valikko</span>
                <span className="material-icons-outlined text-3xl group-hover:scale-110 transition-transform">{isMobileMenuOpen ? 'close' : 'menu'}</span>
              </button>

              {/* Small Dropdown Menu */}
              {isMobileMenuOpen && (
                <div className="absolute top-full right-0 mt-6 w-64 bg-[#00001C] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="p-4 space-y-1">
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
    </header>
  );
};

export default Navbar;