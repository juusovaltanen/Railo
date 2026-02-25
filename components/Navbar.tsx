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
    { name: 'Palvelut', path: '/palvelut' },
    { name: 'Meistä', path: '/meista' },
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
              alt="RAILO Logo" 
              className="h-16 md:h-20 w-auto object-contain rounded-sm"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-bold uppercase tracking-widest transition-all rounded-lg ${isActive(link.path) ? 'text-primary' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/laskuri"
              className="bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all italic"
            >
              Laske hinta-arvio
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            <span className="material-icons-outlined text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background-dark border-b border-white/5 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-8 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-5 rounded-md text-xl font-bold uppercase tracking-widest ${isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-slate-300'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/laskuri"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-5 rounded-md text-xl font-bold uppercase tracking-widest text-primary bg-primary/5"
            >
              Laske hinta-arvio
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;