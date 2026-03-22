import { useEffect } from 'react';

/**
 * Dynamically sets <head> meta tags, title, and JSON-LD schema.
 * Works without any extra libraries (no react-helmet needed).
 */
export default function SEOHead({ title, description, keywords, canonical, ogTitle, ogDescription, ogImage, schema }) {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    // Helper to set/create a meta tag
    const setMeta = (name, content, attr = 'name') => {
      if (!content) return;
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);

    // Open Graph
    setMeta('og:title', ogTitle || title, 'property');
    setMeta('og:description', ogDescription || description, 'property');
    if (ogImage) setMeta('og:image', ogImage, 'property');
    setMeta('og:type', 'website', 'property');

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // JSON-LD Schema
    if (schema) {
      let script = document.getElementById('json-ld-schema');
      if (!script) {
        script = document.createElement('script');
        script.id = 'json-ld-schema';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

    // Cleanup on unmount
    return () => {
      const script = document.getElementById('json-ld-schema');
      if (script) script.remove();
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, schema]);

  return null;
}
