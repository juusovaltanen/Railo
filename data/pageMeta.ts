export interface PageMeta {
  title: string;
  description: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'Epoksilattiat Oulu – autotallit, varastot | Railo Pinnoitus',
    description: 'Kestävät ja saumattomat epoksilattiat autotalleihin ja varastoihin Oulussa ja lähialueilla. Pölytön ja helppohoitoinen pinta. Kysy ilmainen arviokäynti!'
  },
  '/palvelut': {
    title: 'Lattiapinnoitukset ja pölynsidonta Oulussa | Railo Pinnoitus',
    description: 'Pölynsidonta, kestävät epoksilattiat ja Railo - Custom-Lattiat Oulun seudulla. Laadukkaat ja kestävät lattiapinnat. Kysy ilmainen arviokäynti!'
  },
  '/laskuri': {
    title: 'Hintalaskuri – arvioi lattian hinta | Railo Pinnoitus',
    description: 'Laske välitön hinta-arvio lattiasi pinnoitukselle. Valitse neliömäärä, pinnoitustapa ja alustan kunto, ja saat arvion toteutuksesta heti.'
  },
  '/referenssit': {
    title: 'Referenssit – toteutetut lattiat Oulussa | Railo Pinnoitus',
    description: 'Tutustu toteuttamiimme kohteisiin Oulussa ja lähialueilla: autotallit, varastot ja Railo - Custom-Lattiat. Katso kuvat ja kysy ilmainen arviokäynti!'
  },
  '/ukk': {
    title: 'UKK – usein kysyttyä epoksilattioista | Railo Pinnoitus',
    description: 'Vastauksia usein kysyttyihin kysymyksiin epoksilattioista: asennuksen kesto, neliöhinta, liukkaus, puhtaanapito, pohjatyöt ja kotitalousvähennys.'
  },
  '/yhteystiedot': {
    title: 'Yhteystiedot – pyydä tarjous Oulussa | Railo Pinnoitus',
    description: 'Ota yhteyttä Railo Pinnoitukseen. Sakari Lumme, puh. 045 897 2344, railopinnoitus@gmail.com. Pyydä nopea tarjous tai kysy lisätietoja toteutuksesta!'
  },
  '/blogi': {
    title: 'Blogi – vinkit lattiapinnoitukseen | Railo Pinnoitus',
    description: 'Lue asiantuntijavinkit ja oppaat betonilattioiden pinnoituksesta, epoksin ja polyuretaanin eroista sekä autotallin kynnysten suojauksesta.'
  },
  '/meista': {
    title: 'Meistä – lattiapinnoitusta Oulussa | Railo Pinnoitus',
    description: 'Lue Railon tarina. Tuomme teollisuustason kestävät lattiapinnoitteet autotalleihin ja varastoihin Oulun seudulla huolellisilla pohjatöillä.'
  },
  '/tietosuoja': {
    title: 'Tietosuojaseloste – reilut pelisäännöt | Railo Pinnoitus',
    description: 'Railo Pinnoituksen tietosuojaseloste. Käsittelemme asiakastietoja huolellisesti, luottamuksellisesti ja sovellettavan tietosuojalainsäädännön mukaisesti.'
  },
  '/kayttoehdot': {
    title: 'Käyttöehdot – sivuston käyttö ja evästeet | Railo Pinnoitus',
    description: 'Railo Pinnoituksen verkkosivuston käyttöehdot ja evästekäytännöt. Tietoa sivuston sisällöstä, tekijänoikeuksista ja anonyymistä kävijäseurannasta.'
  },
  '404': {
    title: 'Sivua ei löytynyt (404) | Railo Pinnoitus',
    description: 'Etsimääsi sivua ei löytynyt. Palaa takaisin etusivulle tai laske hinta-arvio lattiapinnoituksellesi hintalaskurillamme.'
  }
};

export const getPageMeta = (pathname: string): PageMeta => {
  return PAGE_META[pathname] || PAGE_META['/'] || {
    title: 'Railo Pinnoitus | Epoksilattiat Oulu',
    description: 'Kestävät ja laadukkaat epoksi- ja polyuretaanipinnoitukset autotalleihin, teollisuuteen ja varastoihin.'
  };
};
