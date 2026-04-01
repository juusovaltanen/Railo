import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-darker text-slate-400 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://i.postimg.cc/B6jNmvjK/RAILO_NIMI_SININEN.jpg" 
                alt="Railo Pinnoitus - Kestävät lattiapinnoitukset Logo" 
                className="h-14 md:h-16 w-auto object-contain rounded-sm"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs font-medium tracking-normal">
              Pohjoisen olosuhteisiin suunnitellut epoksilattiat ammattitaidolla. Luotettava kumppanisi Pohjois-Suomessa.
            </p>
            <div className="flex flex-wrap gap-4">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/profile.php?id=61588166321356" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all group" 
                title="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/railo.fi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all group" 
                title="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@railo.fi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all group" 
                title="TikTok"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.892 2.892 0 0 1-5.201 1.743 2.892 2.892 0 0 1 2.308-4.637c.312 0 .594.06.876.145V9.405c-.273-.042-.547-.061-.82-.061a6.335 6.335 0 0 0-6.334 6.334 6.335 6.335 0 0 0 6.334 6.334 6.335 6.335 0 0 0 6.334-6.334V7.039a8.16 8.16 0 0 0 4.778 1.575V5.23a4.838 4.838 0 0 1-1.04-.103z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/railo-oy/about/?viewAsMember=true" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all group" 
                title="LinkedIn"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs italic">Pikalinkit</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
              <li><Link to="/" className="hover:text-primary transition-colors">Etusivu</Link></li>
              <li><Link to="/laskuri" className="text-primary font-black hover:text-white transition-colors">Laske hinta-arvio</Link></li>
              <li><Link to="/palvelut" className="hover:text-primary transition-colors">Palvelut</Link></li>
              <li><Link to="/galleria" className="hover:text-primary transition-colors">Galleria</Link></li>
              <li><Link to="/blogi" className="hover:text-primary transition-colors">Blogi</Link></li>
              <li><Link to="/ukk" className="hover:text-primary transition-colors">UKK</Link></li>
              <li><Link to="/yhteystiedot" className="hover:text-primary transition-colors">Ota yhteyttä</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs italic">Yhteystiedot</h4>
            <ul className="space-y-5 text-sm font-bold uppercase tracking-widest">
              <li className="flex items-start gap-3">
                <span className="material-icons-outlined text-primary text-xl">place</span>
                <span className="text-slate-300">Pölykuja 22, 91900 Liminka</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons-outlined text-primary text-xl">phone</span>
                <a href="tel:+358440348088" className="text-slate-300 hover:text-primary transition-colors">044 034 8088</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons-outlined text-primary text-xl">email</span>
                <a href="mailto:railopinnoitus@gmail.com" className="text-slate-300 hover:text-primary transition-colors text-base break-all italic tracking-tight normal-case">railopinnoitus@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 gap-6">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} RAILO Epoksilattiat. Y-tunnus: 3600636-7.</p>
            <p>Kaikki oikeudet pidätetään.</p>
          </div>
          <div className="flex gap-8">
            <Link to="/tietosuoja" className="hover:text-white transition-colors">Tietosuojaseloste</Link>
            <Link to="/kayttoehdot" className="hover:text-white transition-colors">Käyttöehdot</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;