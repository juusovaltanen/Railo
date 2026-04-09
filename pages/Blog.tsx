import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const location = useLocation();

  // Reset selected post when navigating to the blog root
  useEffect(() => {
    if (location.pathname === '/blogi' && !location.search && !location.hash) {
      // If we are on the blog page but not viewing a specific post (via state)
      // Actually, since we use local state, it resets on mount.
      // But if the user clicks "Blogi" in the menu while already on a post, 
      // we want to go back to the list.
      setSelectedPostId(null);
    }
  }, [location]);

  const posts = [
    {
      id: 1,
      title: 'Miten valita sopiva lattiapinnoite omaan tilaan? Vältä yli- ja alilyönnit',
      date: '8.4.2026',
      excerpt: 'Betonilattian pinnoitus on fiksu investointi, mutta oikean tuotteen valinta voi tuntua maallikosta viidakolta. Tarvitsetko paksun epoksimassan vai riittääkö pelkkä pölynsidonta?',
      content: `
        <p>Betonilattian pinnoitus on fiksu investointi, mutta oikean tuotteen valinta voi tuntua maallikosta viidakolta. Tarvitsetko paksun epoksimassan vai riittääkö pelkkä pölynsidonta?</p>
        <p>Väärä valinta voi tulla kalliiksi. Yleisin virhe on "alilyönti": autotalliin valitaan halvin mahdollinen maali, joka repeää irti ensimmäisen talven aikana, kun sisään ajetaan painavalla autolla nastarenkaat rohisten. Toisaalta myös "ylilyönti" syö lompakkoa: järeästä ja kalliista teollisuusmassasta on aivan turha maksaa, jos tilassa säilytetään vain talvivaatteita ja polkupyöriä.</p>
        <p>Me Railo Pinnoituksella olemme jakaneet lattiat neljään selkeään kategoriaan. Näin tunnistat, mikä ratkaisu sopii sinun tilaasi:</p>
        
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">"Haluan vain eroon pölystä" – Varastot ja tekniset tilat</h3>
        <p>Jos kyseessä on pannuhuone, häkkivarasto tai kodin kellaritila, lattialta ei yleensä vaadita äärimmäistä mekaanista kestoa. Suurin ongelma näissä tiloissa on paljaan betonin ikuinen pöliseminen, joka likaa tavarat ja kulkeutuu sisäilmaan.</p>
        <p><strong class="text-primary">Oikea valinta: Railo Pölynsidonta.</strong> Tämä on nopein ja lompakkoystävällisin tapa lukita betonin pinta. Käsittely ei peitä betonin omia valujälkiä tai sävyeroja, mutta se tekee pinnasta kerralla täysin pölyttömän ja helposti lakaistavan.</p>
        
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Arjen käyttöä ja harrastamista – Perus autotallit ja verstaat</h3>
        <p>Kun tilassa puuhastellaan, säilytetään autoa (ilman jatkuvaa nastarengasrallia) tai huolletaan ruohonleikkuria, lattian täytyy kestää öljyä, likaa ja pesua. Silloin tarvitaan sileä ja tiivis suojakalvo.</p>
        <p><strong class="text-primary">Oikea valinta: Railo Keskikova Kulutus.</strong> Ohutkalvopinnoite (epoksi tai joustavampi polyuretaani) muodostaa lujan, yksivärisen ja saumattoman pinnan. Se on loistava ja helppohoitoinen valinta normaaliin käyttöön. Plussana: saatavilla on satoja eri värejä, ja taloyhtiöiden kellareihin voimme valita täysin hajuttoman, M1-luokitellun tuotteen.</p>

        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Kovaa ajoa ja nastarenkaita – Raskaat tallit ja pesuhallit</h3>
        <p>Kun lattia joutuu todelliselle koetukselle, perusmaali ei riitä. Jos lattialla käännellään autoa nastarenkailla, käytetään raskaita hallitunkkeja, pudotellaan työkaluja tai pestään kalustoa vahvoilla kemikaaleilla, tarvitaan järeämpiä otteita.</p>
        <p><strong class="text-primary">Oikea valinta: Railo Kova Kulutus.</strong> Asennamme lattiaan paksun, erikoishiekalla vahvistetun massapinnoitteen. Se on markkinoiden kestävin ratkaisu, joka ottaa iskut vastaan murtumatta. Pintaan voidaan (ja usein kannattaakin) lisätä karhennus, jotta lattia ei ole märkänä hengenvaarallisen liukas.</p>
        
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Edustustilat ja katseenvangitsijat – Man cavet ja myymälät</h3>
        <p>Joskus lattian pitää olla paitsi kestävä, myös tajuttoman upea. Kun teet itsellesi unelmien "miesluolaa", edustavaa myymälää tai premium-tason autotallia, yksivärinen harmaa lattia voi tuntua tylsältä.</p>
        <p><strong class="text-primary">Oikea valinta: Railo Custom-Lattiat.</strong> Esimerkiksi tyylikkäillä Mosaic-värihiutaleilla viimeistelty pinnoite näyttää arvokkaalta kivilattialta. Eläväisen ulkonäön lisäksi hiutalepinta on nerokas arjessa: sen kuviointi antaa anteeksi pientä likaa ja pölyä huomattavasti yksiväristä pintaa paremmin.</p>
        
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Älä arvaa, kysy ammattilaiselta!</h3>
        <p>Karkeana muistisääntönä: pölynsidonta riittää varastoon, keskikulutus perusarkeen, kova kulutus autotalleihin ja raskaaseen rassaamiseen ja custom edustustiloihin.</p>
        <p>Jos olet epävarma lattiasi kunnosta tai oikean pinnoitteen valinnasta, älä jää yksin miettimään. Ota yhteyttä Railo Pinnoitukseen! Tulemme mielellämme katsomaan kohdetta ja autamme valitsemaan juuri sinun tarpeisiisi ja budjettiisi täydellisesti sopivan ratkaisun.</p>
      `,
      image: 'https://i.postimg.cc/wvmnYbd1/IMG_6609.jpg'
    },
    {
      id: 2,
      title: 'Miksi betonilattian pinnoitus kannattaa? 5 syytä, jotka maksavat itsensä takaisin',
      date: '8.4.2026',
      excerpt: 'Paljas betonilattia näyttää ja tuntuu kestävältä, joten moni jättää sen autotallissa tai varastossa alkuperäiseen, raakaan tilaansa. Karu totuus kuitenkin paljastuu usein jo ensimmäisen talven jälkeen.',
      content: `
        <p>Paljas betonilattia näyttää ja tuntuu kestävältä, joten moni jättää sen autotallissa tai varastossa alkuperäiseen, raakaan tilaansa. Karu totuus kuitenkin paljastuu usein jo ensimmäisen talven jälkeen: betoni alkaa pölistä, siihen imeytyy öljyä, ja nastarenkaat rouhivat pintaa rikki.</p>
        <p>Lattian pinnoittaminen epoksilla tai polyuretaanilla ei ole pelkkää hifistelyä tai ulkonäön kiillottamista. Se on ennen kaikkea fiksu investointi, joka suojaa rakenteita ja tekee arjesta huomattavasti mukavampaa.</p>
        <p>Tässä on viisi kovinta syytä, miksi betonilattian pinnoitus todella kannattaa:</p>
        
        <h3 class="text-primary font-black uppercase italic mt-8 mb-4">1. Pölyäminen loppuu seinään</h3>
        <p>Tiesitkö, että suurin osa autotallin tai kellarin pölystä ei tule ulkoa, vaan se irtoaa lattiasta? Käsittelemätön betoni kuluu jatkuvasti ja tuottaa ilmaan hienojakoista sementtipölyä. Tämä pöly laskeutuu autojen, tavaroiden ja vaatteiden päälle, ja kulkeutuu kenkien mukana sisälle taloon. Pinnoitus "lukitsee" betonin huokoset ja tekee lattiasta kertaheitolla 100-prosenttisen pölyttömän.</p>
        
        <h3 class="text-primary font-black uppercase italic mt-8 mb-4">2. Puhtaanapito muuttuu raskaasta naurettavan helpoksi</h3>
        <p>Paljaan betonin siivoaminen on yhtä tuskaa: lika ja nesteet imeytyvät syvälle sen huokosiin, eikä öljytahroja saa irti millään. Kun lattia on pinnoitettu saumattomalla ja tiiviillä epoksilla tai polyuretaanilla, se ei ime itseensä mitään. Kuravedet, moottoriöljyt ja sahanpurut on uskomattoman nopeaa lakaista, pyyhkiä tai pestä pois. Lattia pysyy edustavana todella pienellä vaivalla.</p>
        
        <h3 class="text-primary font-black uppercase italic mt-8 mb-4">3. Suojaa betonia ja estää kalliit remontit</h3>
        <p>Autotallin lattia joutuu Suomen oloissa koville. Auton mukana sisään tulee vettä ja tiesuolaa, jotka yhdessä pakkasen kanssa rapauttavat betonia. Kun tähän lisätään nastarenkaiden jatkuva raapiminen, paljas betoni alkaa nopeasti murentua. Laadukas massapinnoite muodostaa betonin päälle panssarimaisen suojakalvon, joka ottaa iskut, kemikaalit ja kulutuksen vastaan, pidentäen lattian elinkaarta kymmenillä vuosilla.</p>
        
        <h3 class="text-primary font-black uppercase italic mt-8 mb-4">4. Tila muuttuu pimeästä luolasta valoisaksi ja viihtyisäksi</h3>
        <p>Harmaa, pölyinen betoni imee kaiken valon itseensä ja saa tilan tuntumaan ankealta. Kun lattia pinnoitetaan esimerkiksi tyylikkäällä vaaleanharmaalla ja hieman kiiltävällä epoksilla, se alkaa heijastaa valaisimien valoa. Tila muuttuu välittömästi avaramman ja valoisamman tuntuiseksi. Yhtäkkiä vanha autotalli tai kellari näyttääkin paikalta, jossa tekee mieli viettää aikaa ja harrastaa!</p>
        
        <h3 class="text-primary font-black uppercase italic mt-8 mb-4">5. Nostaa asunnon tai kiinteistön arvoa</h3>
        <p>Kun olet myymässä taloa, ensivaikutelma ratkaisee. Pölyinen ja öljytahrainen autotalli antaa kiinteistöstä helposti nuhjuisen kuvan. Viimeistelty, ammattitaidolla pinnoitettu ja siisti tallin lattia on sen sijaan valtava valttikortti asuntomarkkinoilla. Se viestii ostajalle, että kiinteistöstä on pidetty hyvää huolta.</p>
        
        <h3 class="text-primary font-black uppercase italic mt-8 mb-4">Älä jää odottamaan betonin murentumista</h3>
        <p>Mitä nopeammin uusi betonilattia pinnoitetaan, sitä edullisempaa se on, sillä betoni ei ole ehtinyt vielä imeä itseensä likaa tai halkeilla. Myös vanhan ja kuluneen lattian pelastaminen onnistuu meiltä ammattilaisten timanttihionnalla ja oikeilla pohjatöillä.</p>
        <p>Jos haluat nostaa autotallisi, varastosi tai hallisi täysin uudelle tasolle, me Railo Pinnoituksella hoidamme homman alusta loppuun. Kysy rohkeasti ilmainen arvio – katsotaan yhdessä, miten saamme tilastasi pölyttömän, kestävän ja tyylikkään!</p>
      `,
      image: 'https://i.postimg.cc/SKP2dk7n/IMG-6700.jpg'
    },
    {
      id: 3,
      title: 'Epoksi vai polyuretaani? Näin valitset oikean pinnoitteen lattiaasi',
      date: '8.4.2026',
      excerpt: 'Kun asiakkaamme miettivät autotallin, varaston tai harrastetilan pinnoitusta, yksi kysymys nousee esiin yhä uudelleen: "Kumpaa minun pitäisi laittaa, epoksia vai polyuretaania?"',
      content: `
        <p>Kun asiakkaamme miettivät autotallin, varaston tai harrastetilan pinnoitusta, yksi kysymys nousee esiin yhä uudelleen: "Kumpaa minun pitäisi laittaa, epoksia vai polyuretaania?"</p>
        <p>Molemmat ovat huippuluokan lattiapinnoitteita, jotka tekevät betonista pölyttömän, saumattoman ja uskomattoman kestävän. Silti ne ovat kemiallisesti ja ominaisuuksiltaan kaksi täysin eri petoa. Kumpikaan ei ole automaattisesti toistaan "parempi", vaan kyse on siitä, kumpi sopii juuri sinun tilaasi.</p>
        <p>Tässä on Railo Pinnoituksen selkeä opas näiden kahden materiaalin eroihin.</p>
        
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Epoksi – Lattiapinnoitteiden kova ja taipumaton mestari</h3>
        <p>Epoksi on teollisuuslattioiden klassikko, ja siihen on hyvä syy. Kun epoksihartsi ja kovete sekoitetaan, tapahtuu kemiallinen reaktio, joka muuttaa aineen kuivuessaan erittäin kovaksi ja lasimaiseksi.</p>
        <p><strong>Epoksin vahvuudet:</strong></p>
        <ul>
          <li><strong class="text-primary">Äärimmäinen kovuus:</strong> Epoksi kestää valtavaa staattista painoa ja kovaa mekaanista kulutusta. Siksi se on ykkösvalinta raskaaseen teollisuuteen ja talleihin, joissa käytetään hallitunkkeja tai säilytetään painavaa kalustoa.</li>
          <li><strong class="text-primary">Kemikaalinkesto:</strong> Epoksi nauraa moottoriöljylle, bensiinille, tiesuolalle ja vahvoille pesuaineille. Se on täydellinen valinta korjaamoihin ja pesuhalleihin.</li>
          <li><strong class="text-primary">Kiinnittyminen:</strong> Epoksi tarraa kiinni betoniin ilmiömäisellä voimalla (kunhan pohjatyöt ja timanttihionta on tehty oikein!).</li>
        </ul>
        <p><strong>Epoksin heikkous:</strong></p>
        <p>Kovuudella on kääntöpuolensa. Epoksi ei jousta. Jos alustana oleva betonilaatta elää, painuu tai halkeaa, kova epoksi halkeaa sen mukana. Kirkas tai vaalea epoksi voi myös ajan myötä hieman kellastua voimakkaassa auringonvalossa (UV-säteily).</p>
        
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Polyuretaani – Joustava ja sitkeä iskunvaimentaja</h3>
        <p>Polyuretaani (PU) on luonnostaan elastisempi ja sitkeämpi materiaali kuin epoksi. Se muodostaa lattiaan paksun, hieman kumimaisen (mutta silti täysin sileän ja kovan tuntuisen) suojakalvon.</p>
        <p><strong>Polyuretaanin vahvuudet:</strong></p>
        <ul>
          <li><strong class="text-primary">Joustavuus ja halkeamien silloitus:</strong> Tämä on PU:n supervoima. Koska se on elastista, se antaa betonin pienelle elämiselle periksi repeämättä. Se voi jopa "sillata" betonin pieniä hiushalkeamia (ns. crack-bridging).</li>
          <li><strong class="text-primary">Iskunkestävyys:</strong> Joustavuutensa ansiosta polyuretaani kestää teräviä iskuja (kuten lattialle putoavia työkaluja tai levypainoja) paremmin lohkeilematta kuin kova epoksi.</li>
          <li><strong class="text-primary">UV-kestävyys:</strong> Polyuretaani kestää auringonvaloa huomattavasti epoksia paremmin kellastumatta, joten se on turvallisempi valinta tiloihin, joissa on suuret ikkunat.</li>
          <li><strong class="text-primary">Akustiikka:</strong> PU vaimentaa askelääniä ja tilan kaikua tehokkaammin, tehden siitä loistavan valinnan kotikuntosaleille ja julkisiin tiloihin.</li>
        </ul>
        <p><strong>Polyuretaanin heikkous:</strong></p>
        <p>Koska se on pehmeämpi, se voi naarmuuntua hieman herkemmin karkeasta hiekasta kuin lasimainen epoksi. Se on myös materiaalina usein hieman arvokkaampaa ja vaatii asennuksessa äärimmäistä tarkkuutta kosteuden suhteen.</p>
        
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Yhteenveto: Kumpi siis valitaan?</h3>
        <p>Valinta tehdään aina tilan vaatimusten perusteella:</p>
        <p><strong class="text-primary">Valitse EPOKSI</strong> (esim. Railo Keskikova Kulutus tai Kova Kulutus), kun: Tilaan kohdistuu kovaa mekaanista rasitusta, siellä käsitellään paljon kemikaaleja tai öljyjä, ja alustan betoni on tukeva ja liikkumaton. Ehdoton valinta ammattikorjaamoihin, raskaaseen autotallikäyttöön ja konehalleihin.</p>
        <p><strong class="text-primary">Valitse POLYURETAANI</strong>, kun: Alustan betoni on vanhaa ja altis halkeilemaan, tilassa on suuri riski raskaiden terävien esineiden putoamiselle (kotikuntosalit, verstaat), tai tilassa oleskellaan paljon ja kaivataan parempaa akustiikkaa.</p>
        
        <h3 class="text-white font-black uppercase italic mt-8 mb-4">Etkö ole vieläkään varma? Ei hätää!</h3>
        <p>Sinun ei tarvitsekaan olla lattiakemian asiantuntija. Kun pyydät meiltä Railo Pinnoitukselta ilmaisen arviokäynnin, tutkimme betonisi kunnon, kuuntelemme tilan käyttötarkoituksen ja valitsemme yhdessä juuri sen oikean materiaalin, joka kestää katsetta ja kulutusta vuosikymmeniä eteenpäin.</p>
      `,
      image: 'https://i.postimg.cc/B6jNmvjK/RAILO_NIMI_SININEN.jpg'
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
