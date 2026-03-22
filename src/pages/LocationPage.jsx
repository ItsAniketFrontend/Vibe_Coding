import { useParams, Link, Navigate } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { findCityBySlug, plotTypeFromSlug, findLocationBySlug, buildCityUrl, buildPlotTypeUrl, buildLocationUrl } from '../utils/slugs';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function LocationPage() {
  const { city: citySlug, plotType: typeSlug, location: locSlug } = useParams();
  const { properties, cityLocations } = useProperties();
  const cities = Object.keys(cityLocations);

  const city = findCityBySlug(citySlug, cities);
  const plotType = plotTypeFromSlug[typeSlug];
  
  if (!city || !plotType) return <Navigate to="/404" replace />;
  
  const locations = cityLocations[city] || [];
  const location = findLocationBySlug(locSlug, locations);
  if (!location) return <Navigate to="/404" replace />;

  const locProperties = properties.filter(
    p => p.city === city && p.type === plotType && p.location === location
  );

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh' }}>
      <SEOHead
        title={`${plotType}s in ${location}, ${city} — Buy & Sell | Acenst`}
        description={`Find premium ${plotType.toLowerCase()}s in ${location}, ${city}. Browse our latest verified property listings, check prices, and more.`}
        keywords={`buy ${plotType.toLowerCase()} ${location.toLowerCase()}, ${location.toLowerCase()} ${city.toLowerCase()} properties, ${plotType.toLowerCase()} for sale ${location.toLowerCase()}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${plotType}s in ${location}, ${city}`,
          description: `${plotType} listings in ${location}, ${city}`,
          numberOfItems: locProperties.length,
        }}
      />

      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #3a2250 100%)',
        padding: 'clamp(2rem, 5vw, 3.5rem) 0', color: '#fff',
      }}>
        <div className="container">
          <Breadcrumbs items={[
            { label: city, path: buildCityUrl(city) },
            { label: `${plotType}s`, path: buildPlotTypeUrl(city, plotType) },
            { label: location, path: '' }
          ]} />
          <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.75rem)', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
            <span style={{ color: '#e8a0a0' }}>{plotType}s</span> in {location}, {city}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', maxWidth: '40rem' }}>
            {locProperties.length} verified listings available in this premium neighborhood.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
        {/* SEO content snippet highlighting the location */}
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
            Why invest in {location}, {city}?
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            {location} is one of the most sought-after localities in {city}, offering excellent connectivity, modern infrastructure, and a great return on investment for {plotType.toLowerCase()}s. It is rapidly developing, making it a prime choice for buyers.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['High ROI', 'Premium Locality', 'Verified Listings'].map(t => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontSize: '0.85rem', fontWeight: 500, backgroundColor: '#f0fdf4', padding: '0.3rem 0.75rem', borderRadius: '1rem' }}>
                <CheckCircle2 size={14} /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Listings */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700, color: '#1a1a2e' }}>
              Available Properties ({locProperties.length})
            </h2>
          </div>
          {locProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locProperties.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
              <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '1rem' }}>No {plotType.toLowerCase()}s currently listed in {location}.</p>
              <Link to={buildPlotTypeUrl(city, plotType)} style={{ color: '#A03333', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                View all in {city} <ChevronRight size={16} />
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
