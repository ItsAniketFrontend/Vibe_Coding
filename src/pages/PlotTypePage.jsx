import { useParams, Link, Navigate } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { findCityBySlug, plotTypeFromSlug, buildCityUrl, buildLocationUrl } from '../utils/slugs';
import { MapPin, ArrowRight } from 'lucide-react';

export default function PlotTypePage() {
  const { city: citySlug, plotType: typeSlug } = useParams();
  const { properties, cityLocations } = useProperties();
  const cities = Object.keys(cityLocations);

  const city = findCityBySlug(citySlug, cities);
  const plotType = plotTypeFromSlug[typeSlug];

  if (!city || !plotType) return <Navigate to="/404" replace />;

  const typeProperties = properties.filter(p => p.city === city && p.type === plotType);
  const locations = cityLocations[city] || [];
  
  const locationsWithCount = locations.map(loc => ({
    name: loc,
    count: typeProperties.filter(p => p.location === loc).length
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh' }}>
      <SEOHead
        title={`${plotType}s in ${city} — Buy Premium ${plotType}s | Acenst`}
        description={`Find the best ${plotType}s across ${city}. Browse ${typeProperties.length}+ verified properties in top locations like ${locations.slice(0, 3).join(', ')}.`}
        keywords={`buy ${plotType.toLowerCase()} ${city.toLowerCase()}, ${plotType.toLowerCase()} for sale ${city.toLowerCase()}, real estate ${city.toLowerCase()}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${plotType}s in ${city}`,
          description: `${plotType} listings in ${city}, Rajasthan`,
          numberOfItems: typeProperties.length,
        }}
      />

      <section style={{
        background: 'linear-gradient(135deg, #2d1b3d 0%, #1a1a2e 100%)',
        padding: 'clamp(2rem, 5vw, 3.5rem) 0', color: '#fff',
      }}>
        <div className="container">
          <Breadcrumbs items={[
            { label: city, path: buildCityUrl(city) },
            { label: `${plotType}s`, path: '' }
          ]} />
          <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.75rem)', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
            <span style={{ color: '#e8a0a0' }}>{plotType}s</span> in {city}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', maxWidth: '40rem' }}>
            {typeProperties.length} hand-picked listings across established communities.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
        {/* Popular Locations for this type */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
            Popular {city} Locations for {plotType}s
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {locationsWithCount.map((loc) => (
              <Link key={loc.name} to={buildLocationUrl(city, plotType, loc.name)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem', borderRadius: '0.75rem',
                  backgroundColor: loc.count > 0 ? '#fff' : '#f9fafb',
                  border: `1px solid ${loc.count > 0 ? '#e5e7eb' : '#f3f4f6'}`,
                  transition: 'all 0.2s',
                  pointerEvents: loc.count > 0 ? 'auto' : 'none',
                  opacity: loc.count > 0 ? 1 : 0.6,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#A03333'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(160,51,51,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} color={loc.count > 0 ? '#A03333' : '#9ca3af'} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a2e' }}>{loc.name}</span>
                </div>
                {loc.count > 0 && (
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6b7280', backgroundColor: '#f3f4f6', padding: '0.15rem 0.5rem', borderRadius: '1rem' }}>
                    {loc.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* Listings */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700, color: '#1a1a2e' }}>
              All {plotType}s in {city} ({typeProperties.length})
            </h2>
          </div>
          {typeProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {typeProperties.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>No {plotType.toLowerCase()}s listed in {city} yet.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
