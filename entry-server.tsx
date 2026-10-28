import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppRoutes } from './App';
import { PAGE_META } from './data/pageMeta';
import { blogPosts } from './data/blogPosts';
import { FAQ_DATA } from './data/faqData';

export { PAGE_META, blogPosts, FAQ_DATA };

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
  return { html };
}
