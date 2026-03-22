import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SEOContext = createContext();

// Default SEO data per page
const defaultSEOPages = [
  {
    id: 'home',
    pageName: 'Home Page',
    path: '/',
    metaTitle: 'Acenst — Premium Real Estate in Rajasthan',
    metaDescription: 'Discover premium properties, villas, plots and farm houses across Rajasthan. Acenst offers exclusive real estate listings in Jaipur, Jodhpur, Udaipur and more.',
    metaKeywords: 'real estate rajasthan, property jaipur, villas udaipur, plots jodhpur, luxury homes',
    ogTitle: 'Acenst — Premium Real Estate in Rajasthan',
    ogDescription: 'Your gateway to luxurious living. Explore exclusive properties across Rajasthan.',
    ogImage: '',
    canonicalUrl: '',
    heroHeading: 'Discover Your Dream Property',
    heroSubheading: "Premium properties & plots across Rajasthan's finest cities. Your gateway to luxurious living.",
    contentSection: '',
    faqs: [
      { question: 'What is Acenst?', answer: 'Acenst is a premium real estate platform in Rajasthan.' },
      { question: 'Do you help with property registration?', answer: 'Yes, we provide end-to-end legal and registration assistance.' }
    ],
    schemaType: 'RealEstateAgent',
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Acenst",
      "description": "Premium real estate listings across Rajasthan",
      "url": "",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Rajasthan",
        "addressCountry": "IN"
      }
    }, null, 2),
  },
  {
    id: 'properties',
    pageName: 'Properties Listing',
    path: '/properties',
    metaTitle: 'Explore Properties — Luxury Plots & Homes in Rajasthan | Acenst',
    metaDescription: 'Browse premium residential plots, commercial land, villas, farm houses and apartments across Rajasthan. Filter by city, location, and property type.',
    metaKeywords: 'buy property rajasthan, residential plots jaipur, commercial land jodhpur, farm house udaipur',
    ogTitle: 'Explore Properties — Acenst',
    ogDescription: 'Browse and filter luxury properties across Rajasthan.',
    ogImage: '',
    canonicalUrl: '',
    heroHeading: 'Explore Properties',
    heroSubheading: 'Discover the perfect luxury property or vacant plot across Rajasthan.',
    contentSection: '',
    faqs: [],
    schemaType: 'ItemList',
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Properties in Rajasthan",
      "description": "Premium real estate listings across Rajasthan cities",
      "itemListElement": []
    }, null, 2),
  },
  {
    id: 'about',
    pageName: 'About Us (Future)',
    path: '/about',
    metaTitle: 'About Acenst — Rajasthan\'s Trusted Real Estate Partner',
    metaDescription: 'Learn about Acenst, Rajasthan\'s premier real estate company. 10+ years of experience, 850+ happy clients, and ₹2.5B in property sales.',
    metaKeywords: 'about Acenst, real estate company rajasthan, trusted property dealer',
    ogTitle: 'About Acenst',
    ogDescription: 'Rajasthan\'s premier real estate partner with 10+ years of excellence.',
    ogImage: '',
    canonicalUrl: '',
    heroHeading: '',
    heroSubheading: '',
    contentSection: '',
    faqs: [
      { question: 'How long have you been in business?', answer: 'We have been operating in Rajasthan since 2016 with over 10 years of experience.' },
      { question: 'Which cities do you serve?', answer: 'We primarily serve Jaipur, Jodhpur, Udaipur, and Kota.' }
    ],
    schemaType: 'Organization',
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Acenst",
      "foundingDate": "2016",
      "numberOfEmployees": "50+",
      "areaServed": "Rajasthan, India"
    }, null, 2),
  },
  {
    id: 'contact',
    pageName: 'Contact Us (Future)',
    path: '/contact',
    metaTitle: 'Contact Acenst — Get in Touch for Property Enquiries',
    metaDescription: 'Contact Acenst for property enquiries, site visits, and investment consultation. Reach us via phone, email, or visit our offices across Rajasthan.',
    metaKeywords: 'contact Acenst, property enquiry, real estate consultation',
    ogTitle: 'Contact Acenst',
    ogDescription: 'Get in touch for property enquiries and investment consultation.',
    ogImage: '',
    canonicalUrl: '',
    heroHeading: '',
    heroSubheading: '',
    contentSection: '',
    faqs: [],
    schemaType: 'LocalBusiness',
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Acenst",
      "telephone": "",
      "email": "",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Rajasthan",
        "addressCountry": "IN"
      }
    }, null, 2),
  },
];

const STORAGE_KEY = 'Acenst_seo_data';

export function SEOProvider({ children }) {
  const [seoPages, setSeoPages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map(page => {
          const defaultPage = defaultSEOPages.find(p => p.id === page.id) || {};
          return {
            ...page,
            faqs: page.faqs || defaultPage.faqs || []
          };
        });
      }
      return defaultSEOPages;
    } catch {
      return defaultSEOPages;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seoPages));
    } catch { /* ignore */ }
  }, [seoPages]);

  const updateSEO = useCallback((pageId, updates) => {
    setSeoPages(prev => prev.map(p => p.id === pageId ? { ...p, ...updates } : p));
  }, []);

  const getSEO = useCallback((pageId) => {
    return seoPages.find(p => p.id === pageId) || null;
  }, [seoPages]);

  const resetSEO = useCallback((pageId) => {
    const defaultPage = defaultSEOPages.find(p => p.id === pageId);
    if (defaultPage) {
      setSeoPages(prev => prev.map(p => p.id === pageId ? defaultPage : p));
    }
  }, []);

  const resetAllSEO = useCallback(() => {
    setSeoPages(defaultSEOPages);
  }, []);

  return (
    <SEOContext.Provider value={{ seoPages, updateSEO, getSEO, resetSEO, resetAllSEO }}>
      {children}
    </SEOContext.Provider>
  );
}

export function useSEO() {
  const ctx = useContext(SEOContext);
  if (!ctx) throw new Error('useSEO must be used within SEOProvider');
  return ctx;
}
