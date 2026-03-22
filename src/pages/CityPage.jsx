import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { findCityBySlug, plotTypeSlugMap, buildPlotTypeUrl, buildCityUrl, capitalize } from '../utils/slugs';

export default function CityPage() {
  const { city: citySlug } = useParams();
  const { properties, cityLocations, plotTypes } = useProperties();
  const cities = Object.keys(cityLocations);

  const city = findCityBySlug(citySlug, cities);
  if (!city) return <Navigate to="/404" replace />;

  const cityProperties = properties.filter(p => p.city === city);
  const locations = cityLocations[city] || [];

  // Group properties by type
  const typeGroups = {};
  cityProperties.forEach(p => {
    if (!typeGroups[p.type]) typeGroups[p.type] = [];
    typeGroups[p.type].push(p);
  });

  const availableTypes = plotTypes.filter(t => typeGroups[t]?.length > 0);

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh' }}>
      <SEOHead
        title={`Properties in ${city} — Buy Plots, Villas & Houses | Acenst`}
        description={`Explore premium ${cityProperties.length}+ properties in ${city}, Rajasthan. Browse residential plots, commercial land, villas, farm houses and more across ${locations.length} prime locations.`}
        keywords={`property ${city.toLowerCase()}, plots in ${city.toLowerCase()}, buy land ${city.toLowerCase()}, villas ${city.toLowerCase()}, real estate ${city.toLowerCase()}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Properties in ${city}`,
          description: `Real estate listings in ${city}, Rajasthan`,
          numberOfItems: cityProperties.length,
        }}
      />

      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 50%, #1a1a2e 100%)',
        padding: 'clamp(2rem, 5vw, 3.5rem) 0', color: '#fff',
      }}>
        <div className="container">
          <Breadcrumbs items={[{ label: city, path: buildCityUrl(city) }]} />
          <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.75rem)', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
            Properties in <span style={{ color: '#e8a0a0' }}>{city}</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', maxWidth: '40rem' }}>
            Explore {cityProperties.length} premium listings across {locations.length} prime locations in {city}, Rajasthan.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
        {/* Plot Type Quick Links */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
            Browse by Property Type in {city}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {plotTypes.map(type => {
              const count = typeGroups[type]?.length || 0;
              const slug = plotTypeSlugMap[type];
              return (
                <Link key={type} to={buildPlotTypeUrl(city, type)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
                    padding: '1.25rem 0.75rem', borderRadius: '0.75rem',
                    border: '1px solid #e5e7eb', backgroundColor: '#fff',
                    transition: 'all 0.25s', textAlign: 'center',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#A03333'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(160,51,51,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e' }}>{type}</span>
                  <span style={{ fontSize: '0.72rem', color: count > 0 ? '#A03333' : '#9ca3af', fontWeight: 500 }}>
                    {count} {count === 1 ? 'listing' : 'listings'}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Locations in this city */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
            Popular Locations in {city}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {locations.map(loc => {
              const count = cityProperties.filter(p => p.location === loc).length;
              return (
                <span key={loc} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem',
                  backgroundColor: count > 0 ? '#f9e8e8' : '#f3f4f6',
                  color: count > 0 ? '#A03333' : '#6b7280', fontWeight: 500,
                  border: `1px solid ${count > 0 ? 'rgba(160,51,51,0.15)' : '#e5e7eb'}`,
                }}>
                  <MapPin size={11} /> {loc} {count > 0 && <span style={{ fontSize: '0.65rem' }}>({count})</span>}
                </span>
              );
            })}
          </div>
        </section>

        {/* All Properties */}
        <section>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700, color: '#1a1a2e' }}>
              All Properties in {city} ({cityProperties.length})
            </h2>
          </div>
          {cityProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityProperties.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>No properties listed in {city} yet. Check back soon!</p>
            </div>
          )}
        </section>

        {/* SEO Content Block */}
        <section style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.75rem' }}>
            Buy Property in {city}, Rajasthan
          </h2>
          <div style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.8 }}>
            <p style={{ marginBottom: '0.75rem' }}>
              {city} is one of Rajasthan's most sought-after real estate destinations, offering a diverse range of properties from residential plots and commercial land to luxury villas and farm houses. Whether you're looking for investment opportunities or your dream home, {city} has something for every buyer.
            </p>
            <p>
              With {locations.length} prime locations including {locations.slice(0, 4).join(', ')}{locations.length > 4 ? ` and ${locations.length - 4} more areas` : ''}, {city} provides excellent connectivity, modern amenities, and strong appreciation potential. Browse our curated listings to find the perfect property that matches your requirements and budget.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
