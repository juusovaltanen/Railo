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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background-dark/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img 
              src="https://i.postimg.cc/B6jNmvjK/RAILO_NIMI_SININEN.jpg" 
              alt="Railo Pinnoitus - Epoksilattiat Oulu Logo" 
              className="h-16 md:h-20 w-auto object-contain rounded-sm img-brighten"
            />
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-4 relative">
            <Link
              to="/laskuri"
              className="bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary px-5 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all italic shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
            >
              Laske hinta-arvio
            </Link>

            {/* Menu Button & Dropdown Container */}
            <div className="relative">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <span className="material-icons-outlined text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
              </button>

              {/* Small Dropdown Menu */}
              {isMobileMenuOpen && (
                <div className="absolute top-full right-0 mt-4 w-56 bg-surface-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
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