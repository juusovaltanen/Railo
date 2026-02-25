import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      (metaDescription as HTMLMetaElement).name = 'description';
      (metaDescription as HTMLMetaElement).content = description;
      document.head.appendChild(metaDescription);
    }
  }, [title, description]);

  return null;
};

export default SEO;
