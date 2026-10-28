import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta } from '../data/pageMeta';

interface SEOProps {
  title?: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const location = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const meta = getPageMeta(location.pathname);
    const finalTitle = title || meta.title;
    const finalDescription = description || meta.description;
    const is404 = location.pathname === '/404' || meta.title.includes('404');
    const domain = 'https://railopinnoitus.fi';
    const canonicalUrl = `${domain}${location.pathname === '/' ? '' : location.pathname}`;

    // 1. Title
    document.title = finalTitle;

    // Helper for meta tags
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    // 2. Meta description
    setMetaTag('name', 'description', finalDescription);

    // 3. Canonical (ei 404:llä, ei loppukauttaviivaa)
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (is404) {
      if (canonicalEl) canonicalEl.remove();
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', canonicalUrl);
    }

    // 4. OpenGraph
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDescription);
    if (!is404) {
      setMetaTag('property', 'og:url', canonicalUrl);
    }

    // 5. Twitter Card
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDescription);

  }, [title, description, location.pathname]);

  return null;
};

export default SEO;
