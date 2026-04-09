
import React from 'react';
import SEO from '../components/SEO';

const TermsOfUse: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <SEO 
        title="Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"
      />
      <section className="py-32 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic mb-6">Käyttöehdot</h1>
          <p className="text-slate-400 text-xl font-bold italic tracking-normal">Sivuston käyttö ja evästeet</p>
        </div>

        <div className="bg-surface-dark border border-white/5 rounded-[3rem] p-10 md:p-16 space-y-12 shadow-2xl">
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-white font-black uppercase italic tracking-wider text-xl flex items-center gap-3">
                <span className="material-icons-outlined text-primary">cookie</span>
                Evästeet (Cookies)
              </h3>
              <p className="text-slate-400 font-medium italic leading-relaxed">
                Sivustomme saattaa käyttää kävijäseurannan perusevästeitä (esim. Google Analytics), jotta näemme, miten sivustoamme käytetään ja miten voimme palvella asiakkaitamme paremmin. Nämä tiedot ovat anonyymejä, eikä niistä voi tunnistaa sinua henkilökohtaisesti. Voit halutessasi estää evästeet selaimesi asetuksista.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-black uppercase italic tracking-wider text-xl flex items-center gap-3">
                <span className="material-icons-outlined text-primary">copyright</span>
                Tekijänoikeudet
              </h3>
              <p className="text-slate-400 font-medium italic leading-relaxed">
                Kaikki tällä sivustolla olevat tekstit, kuvat ja logot ovat Railon omaisuutta. Niiden kopioiminen tai luvaton käyttö muihin tarkoituksiin ei ole reilua peliä eikä sallittua.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-black uppercase italic tracking-wider text-xl flex items-center gap-3">
                <span className="material-icons-outlined text-primary">gavel</span>
                Vastuunrajoitus
              </h3>
              <p className="text-slate-400 font-medium italic leading-relaxed">
                Sivustolla olevat kuvat referenssikohteista ja design-lattioista antavat hyvän ja realistisen kuvan työmme jäljestä. On kuitenkin hyvä pitää mielessä, että näyttöjen asetuksista johtuen värisävyt voivat luonnossa ja eri valaistuksessa näyttää hieman erilaisilta. Lopulliset sävyt ja ratkaisut katsotaan aina yhdessä paikan päällä ennen työn aloitusta.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfUse;
