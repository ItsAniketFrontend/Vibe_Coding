import React from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { buildCityUrl } from '../utils/slugs';

export default function DynamicLandingPage({ page }) {
  const { properties } = useProperties();

  // Optionally filter properties based on city
  const cityProperties = properties.filter(p => p.city.toLowerCase() === page.city.toLowerCase());

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh' }}>
      <SEOHead
        title={page.metaTitle || page.title}
        description={page.metaDescription}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: page.title,
          description: page.metaDescription,
        }}
      />

      <section style={{
        background: 'linear-gradient(135deg, #2d1b3d 0%, #1a1a2e 100%)',
        padding: 'clamp(2rem, 5vw, 3.5rem) 0', color: '#fff',
      }}>
        <div className="container">
          <Breadcrumbs items={[
            { label: page.city.charAt(0).toUpperCase() + page.city.slice(1), path: buildCityUrl(page.city) },
            { label: page.title, path: '' }
          ]} />
          <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.75rem)', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
            {page.title.split(' ').map((word, i) => (
              i === 0 || i === 2 ? <span key={i} style={{ color: '#e8a0a0' }}>{word} </span> : <span key={i}>{word} </span>
            ))}
          </h1>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
        <section style={{ marginBottom: '3rem', maxWidth: '800px' }}>
            <div 
              style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: page.content }} 
            />
        </section>

        {/* Listings */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700, color: '#1a1a2e' }}>
              Properties in {page.city.charAt(0).toUpperCase() + page.city.slice(1)} ({cityProperties.length})
            </h2>
          </div>
          {cityProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityProperties.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>No properties listed in {page.city} yet.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
