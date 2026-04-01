
import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <SEO 
        title="Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."
        description="Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"
      />
      <section className="py-32 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4 block italic">Juridiikka</span>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic mb-6">Tietosuojaseloste</h1>
          <p className="text-slate-400 text-xl font-bold italic tracking-normal">Reilut pelisäännöt tiedoillesi</p>
        </div>

        <div className="bg-surface-dark border border-white/5 rounded-[3rem] p-10 md:p-16 space-y-12 shadow-2xl">
          <p className="text-slate-300 text-lg font-bold leading-relaxed italic tracking-normal">
            Me Railolla vihaamme roskapostia ja turhaa byrokratiaa yhtä paljon kuin pölyäviä betonilattioita. Siksi käsittelemme tietojasi maalaisjärjellä ja lain vaatimalla tarkkuudella.
          </p>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-white font-black uppercase italic tracking-wider text-xl">Rekisterinpitäjä</h3>
              <p className="text-slate-400 font-medium italic">RAILO Epoksilattiat (Liminka). Yhteystiedot: railopinnoitus@gmail.com</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-black uppercase italic tracking-wider text-xl">Mitä tietoja keräämme</h3>
              <p className="text-slate-400 font-medium italic">Kun pyydät meiltä tarjouksen tai otat yhteyttä, tallennamme lomakkeeseen täyttämäsi tiedot: nimesi, puhelinnumerosi, sähköpostiosoitteesi, kohteen osoitteen ja viestisi sisällön.</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-black uppercase italic tracking-wider text-xl">Mihin käytämme tietoja</h3>
              <p className="text-slate-400 font-medium italic">Käytämme näitä tietoja yksinomaan yhteydenpitoon, tarjouksen laskemiseen, asiakassuhteen hoitamiseen ja laskutukseen. Emme liitä sinua millekään markkinointilistoille ilman erillistä lupaa.</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-black uppercase italic tracking-wider text-xl">Tietojen jakaminen eteenpäin</h3>
              <p className="text-slate-400 font-medium italic">Emme koskaan myy, vuokraa tai luovuta tietojasi ulkopuolisille tahoille tai markkinointifirmoille. Tiedot pysyvät vain meidän tiimimme luottamuksellisessa käytössä.</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-black uppercase italic tracking-wider text-xl">Tietojen säilytys ja sinun oikeutesi</h3>
              <p className="text-slate-400 font-medium italic leading-relaxed">Säilytämme tietojasi niin kauan kuin se on asiakassuhteen, takuuajan tai kirjanpitolain vuoksi tarpeellista. Sinulla on milloin tahansa oikeus pyytää nähdä omat tietosi, vaatia niiden korjaamista tai pyytää niiden poistamista järjestelmistämme lähettämällä meille sähköpostia.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
