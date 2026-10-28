import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function prerender() {
  console.log('🚀 Käynnistetään esirenderöinti (SSG)...');

  const rootDir = process.cwd();
  const distDir = path.resolve(rootDir, 'dist');
  const serverEntryPath = path.resolve(rootDir, 'dist-ssr', 'entry-server.js');
  const templatePath = path.resolve(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    throw new Error(`dist/index.html ei löytynyt osoitteesta: ${templatePath}`);
  }

  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(`dist-ssr/entry-server.js ei löytynyt osoitteesta: ${serverEntryPath}`);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const { render, PAGE_META, blogPosts, FAQ_DATA } = await import(pathToFileURL(serverEntryPath).href);

  const domain = 'https://railopinnoitus.fi';
  const defaultImage = 'https://i.postimg.cc/W1CPSS8Q/IMG-6708.jpg';
  const defaultImageAlt = 'Railo Pinnoitus - Kestävät lattiapinnoitukset Oulussa';

  // Yhteiset Schema.org JSON-LD -määritykset
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${domain}/#organization`,
    'name': 'Railo Pinnoitus',
    'legalName': 'Railo Pinnoitus Oy',
    'taxID': '3600636-7',
    'url': domain,
    'logo': 'https://i.postimg.cc/B6jNmvjK/RAILO_NIMI_SININEN.jpg',
    'description': 'Railo Pinnoitus toteuttaa kestävät ja saumattomat epoksilattiat ja lattiapinnoitukset autotalleihin ja varastoihin Oulun seudulla ja Pohjois-Pohjanmaalla.',
    'telephone': '+358458972344',
    'email': 'railopinnoitus@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Pölykuja 22',
      'postalCode': '91900',
      'addressLocality': 'Liminka',
      'addressCountry': 'FI'
    },
    'areaServed': 'Oulun seutu ja Pohjois-Pohjanmaa',
    'sameAs': [
      'https://www.facebook.com/profile.php?id=61588166321356',
      'https://www.instagram.com/railopinnoitus/',
      'https://www.tiktok.com/@railopinnoitus',
      'https://www.linkedin.com/company/railo-oy/'
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${domain}/#website`,
    'name': 'Railo Pinnoitus',
    'alternateName': ['Railo Pinnoitus Oy', 'Railo Oy'],
    'url': domain,
    'inLanguage': 'fi',
    'publisher': {
      '@id': `${domain}/#organization`
    }
  };

  // Määritellään kaikki esirenderöitävät reitit
  const routes = [
    '/',
    '/palvelut',
    '/laskuri',
    '/referenssit',
    '/ukk',
    '/yhteystiedot',
    '/blogi',
    ...blogPosts.map(p => `/blogi/${p.slug}`),
    '/meista',
    '/tietosuoja',
    '/kayttoehdot',
    '404'
  ];

  console.log(`Esirenderöidään ${routes.length} sivua...`);

  for (const route of routes) {
    const is404 = route === '404';
    const renderUrl = is404 ? '/olematon-sivu-404' : route;
    const { html: appHtml } = render(renderUrl);

    let title = 'Epoksilattiat Oulu – autotallit, varastot | Railo Pinnoitus';
    let description = 'Kestävät ja saumattomat epoksilattiat autotalleihin ja varastoihin Oulussa ja lähialueilla. Pölytön ja helppohoitoinen pinta. Kysy ilmainen arviokäynti!';
    let imageUrl = defaultImage;
    let imageAlt = defaultImageAlt;
    let ogType = 'website';
    let currentPost = null;

    if (is404) {
      const meta = PAGE_META['404'];
      title = meta.title;
      description = meta.description;
    } else if (route.startsWith('/blogi/')) {
      const slug = route.replace('/blogi/', '');
      const post = blogPosts.find(p => p.slug === slug);
      if (post) {
        currentPost = post;
        title = post.metaTitle || `${post.title} | Railo Pinnoitus`;
        description = post.metaDescription || post.excerpt;
        if (post.image) imageUrl = post.image;
        imageAlt = post.title;
        ogType = 'article';
      }
    } else if (PAGE_META[route]) {
      title = PAGE_META[route].title;
      description = PAGE_META[route].description;
    }

    let pageHtml = template;

    // 1. Päivitetään <title>
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);

    // 2. Päivitetään meta description
    if (pageHtml.includes('name="description"')) {
      pageHtml = pageHtml.replace(
        /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
        `<meta name="description" content="${escapeHtml(description)}">`
      );
    } else {
      pageHtml = pageHtml.replace('</head>', `    <meta name="description" content="${escapeHtml(description)}">\n</head>`);
    }

    // 3. Rakennetaan SEO-tagit (canonical, OpenGraph, Twitter Cards, robots)
    const canonicalUrl = `${domain}${route === '/' ? '' : route}`;
    let extraTags = '';

    if (is404) {
      extraTags += `    <meta name="robots" content="noindex, nofollow">\n`;
    } else {
      // Canonical: jokaisella julkisella sivulla ilman loppukauttaviivaa (ei 404:llä)
      extraTags += `    <link rel="canonical" href="${canonicalUrl}">\n`;
    }

    // OpenGraph meta-tagit
    extraTags += `    <meta property="og:site_name" content="Railo Pinnoitus">\n`;
    extraTags += `    <meta property="og:locale" content="fi_FI">\n`;
    extraTags += `    <meta property="og:type" content="${ogType}">\n`;
    extraTags += `    <meta property="og:title" content="${escapeHtml(title)}">\n`;
    extraTags += `    <meta property="og:description" content="${escapeHtml(description)}">\n`;
    if (!is404) {
      extraTags += `    <meta property="og:url" content="${canonicalUrl}">\n`;
    }
    extraTags += `    <meta property="og:image" content="${imageUrl}">\n`;
    extraTags += `    <meta property="og:image:alt" content="${escapeHtml(imageAlt)}">\n`;

    // Twitter Card meta-tagit
    extraTags += `    <meta name="twitter:card" content="summary_large_image">\n`;
    extraTags += `    <meta name="twitter:title" content="${escapeHtml(title)}">\n`;
    extraTags += `    <meta name="twitter:description" content="${escapeHtml(description)}">\n`;
    extraTags += `    <meta name="twitter:image" content="${imageUrl}">\n`;
    extraTags += `    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}">\n`;

    // 4. JSON-LD Rakenteinen data
    const jsonLdSchemas = [];

    // LocalBusiness ja WebSite kaikille sivuille (paitsi 404)
    if (!is404) {
      jsonLdSchemas.push(organizationSchema);
      jsonLdSchemas.push(websiteSchema);
    }

    // FAQPage /ukk-sivulle
    if (route === '/ukk') {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': FAQ_DATA.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer
          }
        }))
      };
      jsonLdSchemas.push(faqSchema);
    }

    // BlogPosting ja BreadcrumbList blogiartikkeleille
    if (currentPost) {
      const blogPostingSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': currentPost.title,
        'description': currentPost.metaDescription || currentPost.excerpt,
        'datePublished': currentPost.datePublished,
        'dateModified': currentPost.dateModified,
        'author': {
          '@type': 'Organization',
          '@id': `${domain}/#organization`,
          'name': currentPost.author
        },
        'publisher': {
          '@id': `${domain}/#organization`
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        'image': currentPost.image
      };

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Etusivu',
            'item': domain
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Blogi',
            'item': `${domain}/blogi`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': currentPost.title,
            'item': canonicalUrl
          }
        ]
      };

      jsonLdSchemas.push(blogPostingSchema);
      jsonLdSchemas.push(breadcrumbSchema);
    }

    // Injektoidaan JSON-LD script-tagit
    if (jsonLdSchemas.length > 0) {
      for (const schema of jsonLdSchemas) {
        extraTags += `    <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n    </script>\n`;
      }
    }

    pageHtml = pageHtml.replace('</head>', `${extraTags}</head>`);

    // 5. Injektoidaan esirenderöity HTML <div id="root"> -elementtiin
    pageHtml = pageHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // Määritellään kohdetiedosto
    let filePath;
    if (is404) {
      filePath = path.resolve(distDir, '404.html');
    } else if (route === '/') {
      filePath = path.resolve(distDir, 'index.html');
    } else {
      const folderPath = path.resolve(distDir, route.replace(/^\//, ''));
      fs.mkdirSync(folderPath, { recursive: true });
      filePath = path.resolve(folderPath, 'index.html');
    }

    fs.writeFileSync(filePath, pageHtml, 'utf-8');
    console.log(`  ✓ Valmis: ${route} -> ${path.relative(rootDir, filePath)}`);
  }

  // 6. Generoidaan sitemap.xml julkisista sivuista (ei 404:ää)
  console.log('🗺️ Generoidaan sitemap.xml...');
  const publicRoutes = routes.filter(r => r !== '404');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes.map(r => {
  const url = `${domain}${r === '/' ? '' : r}`;
  let priority = '0.7';
  let changefreq = 'monthly';
  if (r === '/') {
    priority = '1.0';
    changefreq = 'weekly';
  } else if (r === '/palvelut' || r === '/laskuri') {
    priority = '0.9';
    changefreq = 'weekly';
  } else if (r === '/referenssit' || r.startsWith('/blogi/')) {
    priority = '0.8';
    changefreq = 'monthly';
  }
  // lastmod vain artikkeleille (oikea muokkauspäivä); muille sivuille ei lastmodia
  const post = r.startsWith('/blogi/') ? blogPosts.find(p => `/blogi/${p.slug}` === r) : null;
  const lastmodLine = post ? `\n    <lastmod>${post.dateModified}</lastmod>` : '';
  return `  <url>
    <loc>${url}</loc>${lastmodLine}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>
`;

  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log('✓ sitemap.xml luotu.');

  // Siivotaan väliaikainen dist-ssr -kansio pois
  try {
    fs.rmSync(path.resolve(rootDir, 'dist-ssr'), { recursive: true, force: true });
    console.log('✓ Väliaikainen dist-ssr siivottu.');
  } catch (err) {
    console.warn('Varoitus dist-ssr poistossa:', err);
  }

  console.log('✨ Esirenderöinti suoritettu onnistuneesti!');
}

prerender().catch(err => {
  console.error('❌ Esirenderöinti epäonnistui:', err);
  process.exit(1);
});
