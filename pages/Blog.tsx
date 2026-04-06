import React, { useState } from 'react';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const posts = [
    {
      id: 3,
      title: 'Keitä olemme',
      date: '31.3.2026',
      excerpt: 'Railo Pinnoitus on kolmen kaverin firma, jonka takana seisovat Sakari Lumme, Juuso Valtanen ja Luukas Leppäluoto.',
      content: `
        <p>Railo Pinnoitus on kolmen kaverin firma, jonka takana seisovat Sakari Lumme, Juuso Valtanen ja Luukas Leppäluoto. Me emme ole täällä pitämässä pitkiä myyntipuheita, vaan tekemässä työtä, joka puhuu puolestaan. Yritys sai alkunsa halusta laittaa piste mureneville autotallin lattioille ja hätiköidyille pinnoituksille, jotka irtoavat heti ensimmäisen talven jälkeen. Tiedämme tasan tarkkaan, mitä nastarenkaat, tiesuola ja lämpötilavaihtelut vaativat kunnon lattiapinnoitteelta.</p>
        <p>Toimimme joustavasti koko Suomen alueella ja tuomme mukanamme rehellisen työmoraalin: hommat hoidetaan tasan niin kuin ne on sovittu. Erikoisosaamistamme ovat autotallit ja teollisuushallit, joissa vaaditaan äärimmäistä kestävyyttä ja pölyttömyyttä. Meidän juttu on se, ettei oikaista mutkissa. Jokainen keikka alkaa kunnon koneellisella timanttihionnalla, koska ilman sitä pinnoite on vain kerros väriä huonon pohjan päällä. Käytämme ainoastaan parhaita materiaaleja ja ammattitason vehkeitä, jotta lopputulos on kova ja kestää isältä pojalle.</p>
        <p>Meillä ei ole turhaa byrokratiaa, vaan kolme miestä, jotka kantavat vastuun omasta jäljestään. Kun tilaat lattiapinnoituksen meiltä, tiedät tasan tarkkaan ketkä tulevat paikalle ja mitä saat: rehdin hinnan, pitävän aikataulun ja lattian, joka sietää elämää. Jos haluat kestävän pinnan ilman turhaa hienostelua, ota yhteyttä – me laitamme betonisi kuntoon.</p>
      `,
      image: 'https://i.postimg.cc/B6jNmvjK/RAILO_NIMI_SININEN.jpg'
    },
    {
      id: 1,
      title: 'Miksi epoksi on paras valinta? Betonilattia vs. ammattimainen pinnoitus',
      date: '25.3.2026',
      excerpt: 'Betonilattia on monen autotallin ja hallin perusta, mutta harva tulee ajatelleeksi, että paljas betoni on vasta puolivalmis pinta.',
      content: `
        <p>Betonilattia on monen autotallin ja hallin perusta, mutta harva tulee ajatelleeksi, että paljas betoni on vasta puolivalmis pinta. Vaikka betoni itsessään on vahvaa, se on materiaalina huokoinen ja imee itseensä lähes kaiken, minkä kanssa se joutuu kosketuksiin.</p>
        <p>Jos mietit, kannattaako lattian pinnoittamiseen panostaa, tässä on muutama rehellinen syy, miksi pelkkä betoni on usein huono valinta ja miksi epoksi on sille ylivertainen vastustaja.</p>
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Betonilattian haasteet: Pölyä, tahroja ja murenevaa pintaa</h3>
        <p>Paljas betonilattia on jatkuva huolenaihe tilan puhtauden kannalta. Suurin ongelma on betonin pinnalla oleva sementtiliima, joka murenee käytössä hienojakoiseksi, harmaaksi pölyksi. Tämä pöly ei pysy tallissa, vaan kulkeutuu kenkien mukana eteiseen, varastoituihin tavaroihin ja jopa autosi moottoritilaan.</p>
        <p>Toinen merkittävä haitta on betonin imukyky. Kun autosta valuu öljyä, tiesuolaa tai nestettä huokoiselle betonille, se imeytyy syvälle rakenteeseen. Nämä tahrat ovat lähes mahdottomia poistaa ja ne alkavat ajan myötä murentaa betonia sisältäpäin. Lisäksi paljas betoni näyttää usein kolkolta, keskeneräiseltä ja imee valoa itseensä, tehden tilasta hämärän.</p>
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Epoksin edut: Kestävyyttä ja helppoutta</h3>
        <p>Epoksipinnoitus muuttaa tilan luonteen täysin. Se ei ole vain maali, vaan kemiallisesti sitoutuva suojakerros, joka sulkee betonin huokoset lopullisesti. Tässä ovat epoksin suurimmat plussat:</p>
        <ul>
          <li><strong>Täydellinen pölyttömyys:</strong> Epoksi muodostaa saumattoman ja tiiviin pinnan, josta ei irtoa pölyä. Tila pysyy puhtaana ja siivoaminen hoituu kevyesti pyyhkäisemällä.</li>
          <li><strong>Ylivertainen kestävyys:</strong> Ammattitason epoksi kestää iskuja, mekaanista hankausta ja raskaita kuormia. Se suojaa alla olevaa betonia nastarenkaiden raastavalta vaikutukselta ja estää pintaa halkeilemasta.</li>
          <li><strong>Kemikaalien kesto:</strong> Öljyt, polttoaineet ja tiesuolat jäävät epoksin pinnalle, josta ne on helppo pyyhkiä pois ilman pysyviä jälkiä. Lattia on täysin nesteenpitävä.</li>
          <li><strong>Valoisuus ja ulkonäkö:</strong> Pinnoitettu lattia heijastaa valoa, mikä tekee tallista tai hallista huomattavasti kirkkaamman ja viihtyisämmän työskennellä. Saatavilla olevat sävyt ja hiutaleviimeistelyt tekevät lattiasta myös edustavan näköisen.</li>
        </ul>
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Pitkäikäinen investointi</h3>
        <p>Vaikka laadukas epoksipinnoitus vaatii alkupanostuksen, se maksaa itsensä takaisin elinkaarensa aikana. Se suojaa kiinteistösi perusrakenteita, säästää siivouskuluissa ja nostaa rakennuksen jälleenmyyntiarvoa. Lisäksi oikein tehty pinnoitus säästää sinut kalliilta betoniremonteilta tulevaisuudessa. Onko sinun lattiasi valmis päivitykseen?</p>
      `,
      image: 'https://i.postimg.cc/VLgsGKyX/Image-15-2-2026-at-10-40.png'
    },
    {
      id: 2,
      title: 'Miten valita lattiapinnoite?',
      date: '25.3.2026',
      excerpt: 'Kun suunnittelet autotallin tai hallin lattiapinnoitusta, ensimmäinen ja tärkein askel on pysähtyä miettimään tilan todellista käyttötarkoitusta.',
      content: `
        <p>Kun suunnittelet autotallin tai hallin lattiapinnoitusta, ensimmäinen ja tärkein askel on pysähtyä miettimään tilan todellista käyttötarkoitusta. Onko kyseessä pelkkä varasto, jossa halutaan päästä eroon betonipölystä, vai harrastetila, jossa autoja huolletaan ja nastarenkailla ajetaan päivittäin? Tarvitsetko lattialta ennen kaikkea helppohoitoisuutta, vai pitääkö sen kestää iskuja ja kemikaaleja vuodesta toiseen?</p>
        <p>Me Railo Pinnoituksella käytämme aina korkealaatuisia tuotteita, jotka valitaan tarkasti kohteen vaatimusten mukaan. Oikea pinnoite löytyy vasta, kun ymmärretään, mitä lattian päällä tapahtuu.</p>
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Railo Pölynsidonta on järkevä valinta teknisiin tiloihin</h3>
        <p>Jos tavoitteenasi on puhtaasti pitää tila siistinä ja estää hienojakoisen betonipölyn kantautuminen muihin tiloihin, Railo Pölynsidonta on kustannustehokkain ratkaisu. Se imeytyy syvälle betoniin ja kovettaa sen pinnan, mikä tekee lattiasta helpon puhdistaa. Vaikka Railo Pölynsidonta on suunniteltu kevyempään käyttöön, se toimii hyvin myös autotalleissa, kunhan muistat laittaa auton renkaiden alle kumimatot. Matot suojaavat pintaa nastojen mekaaniselta kulutukselta ja pidentävät käsittelyn kestoa merkittävästi.</p>
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Tyyliä ja puhtautta Railo 0,5 mm ohutkalvopinnoituksella</h3>
        <p>Kun haluat autotalliisi tyylikkään väripinnan ja täydellisen tiiviyden, Railo 0,5 mm ohutkalvopinnoitus on erinomainen valinta. Se antaa betonille ammattimaisen ilmeen ja on erittäin helppo pitää puhtaana. Tässäkin vaihtoehdossa suosittelemme kumimattojen käyttöä renkaiden alla, jotta pinnoite säilyy uudenveroisena. Kumimatot ottavat vastaan nastojen raapimisen ja kuumien renkaiden aiheuttaman rasituksen, jolloin itse pinnoite pysyy ehjänä ja näyttävänä.</p>
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Hiekka tekee kestävyyden – Railo 1 mm ja 2 mm pinnoitteet</h3>
        <p>Kaikkein vaativimpiin kohteisiin, joissa lattialta vaaditaan maksimaalista kestävyyttä ilman kompromisseja, asennamme Railo 1 mm ja 2 mm paksuisia pinnoitteita. Näiden massapinnoitteiden ylivertainen lujuus perustuu niissä täyteaineena käytettävään erikoishiekkaan. Hiekka muodostaa pinnoitteen rungon, joka tekee siitä erittäin iskunkestävän ja mekaanisesti vahvan.</p>
        <p>Tällainen hiekkavahvisteinen lattia kestää nastarenkaat ja kovan kulutuksen sellaisenaan, ja se onkin paras valinta teollisuustiloihin tai harrastetalleihin, joissa työkaluja putoilee ja autoja liikutellaan jatkuvasti.</p>
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Räätälöidyt ratkaisut ja hiutaleviimeistely</h3>
        <p>Me emme rajoitu vain perusvaihtoehtoihin, vaan toteutamme ratkaisut aina asiakkaan tarpeen mukaan. Voimme asentaa vieläkin paksumpia kerroksia tai tehdä erikoisversioita hyvinkin vaativiin olosuhteisiin. Jos kaipaat lattialle lisää eläväisyyttä ja hieman karheampaa pintaa, voimme lisätä pinnoitukseen värihiutaleita. Hiutaleet viimeistelevät ilmeen ja ne ovat saatavilla kaikkiin palveluihimme lisähinnasta.</p>
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Onnistuminen varmistetaan timanttihionnalla</h3>
        <p>Riippumatta valitusta pinnoitteesta, lopputuloksen kestävyys ratkaistaan jo ennen ensimmäistäkään pinnoitekerrosta. Me emme koskaan asenna tuotteita betonin sementtiliiman päälle, vaan jokainen kohde aloitetaan huolellisella timanttihionnalla. Hionta avaa betonin huokoset ja poistaa epäpuhtaudet, jolloin pinnoite pääsee pureutumaan betoniin kiinni. Käytämme tehokasta pölynpoistoa, joten hionta on siistiä ja vaivatonta asiakkaalle.</p>
        <p class="text-white font-bold mt-12 mb-6">Haluatko tallillesi lattian, joka kestää ja näyttää hyvältä? Kokeile meidän hintalaskuria ja pyydä tarjous!</p>
        <div class="flex flex-col sm:flex-row gap-4 not-prose">
          <a href="/laskuri" class="inline-block bg-primary/10 hover:bg-primary/20 text-primary hover:text-white border border-primary/30 px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all italic text-sm text-center backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.1)]">Siirry hintalaskuriin</a>
        </div>
      `,
      image: 'https://i.postimg.cc/SKP2dk7n/IMG-6700.jpg'
    }
  ];

  const selectedPost = posts.find(p => p.id === selectedPostId);

  return (
    <div className="pt-20">
      <SEO 
        title={selectedPost ? `${selectedPost.title} | Epoksilattiat Oulu` : "Epoksilattiat Oulu & Koko Suomi | Railo Pinnoitus - Kestävät lattiapinnoitukset."} 
        description={selectedPost ? selectedPost.excerpt : "Railo Pinnoitus toteuttaa kestävät epoksilattiat, pölynsidonnat ja timanttihionnat autotalleihin ja teollisuuteen koko Suomen alueella. Pyydä tarjous!"} 
      />
      
      <section className="py-24 max-w-7xl mx-auto px-4">
        {selectedPost ? (
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setSelectedPostId(null)}
              className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs mb-12 hover:opacity-70 transition-colors italic"
            >
              <span className="material-icons-outlined text-sm">arrow_back</span>
              Takaisin blogiin
            </button>
            
            <div className="mb-12">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 italic">{selectedPost.date}</p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-tight mb-8">
                {selectedPost.title}
              </h1>
              <div 
                className="prose prose-invert prose-slate max-w-none italic text-slate-300 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>

            <div className="mt-20 p-12 bg-surface-dark rounded-[3rem] border border-white/20 text-center">
              <h3 className="text-2xl font-black text-white uppercase italic mb-6">Kiinnostuitko?</h3>
              <p className="text-slate-400 italic mb-10">Ota yhteyttä niin suunnitellaan sinullekin kestävä ja upea lattia.</p>
              <a 
                href="/yhteystiedot" 
                className="inline-block bg-primary hover:bg-secondary text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest transition-all italic shadow-2xl shadow-primary/30 glow-gold"
              >
                Pyydä tarjous
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">Blogi</h1>
              <p className="max-w-2xl mx-auto text-slate-400 text-lg font-bold italic">
                Ajatuksia, vinkkejä ja uutisia lattiapinnoituksen maailmasta.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {posts.map(post => (
                <article key={post.id} className="bg-surface-dark rounded-[2rem] overflow-hidden border border-white/5 group hover:border-primary/30 transition-all shadow-2xl">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={`${post.title} - Epoksilattiat`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4 italic">{post.date}</p>
                    <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tight italic leading-tight group-hover:opacity-80 transition-opacity">
                      {post.title}
                    </h2>
                    <p className="text-slate-400 text-sm italic leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <button 
                      onClick={() => setSelectedPostId(post.id)}
                      className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity italic"
                    >
                      Lue lisää
                      <span className="material-icons-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Blog;
