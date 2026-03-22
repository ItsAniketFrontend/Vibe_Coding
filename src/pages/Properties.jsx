import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { MapPin, Building2, Trees, ChevronDown, X } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { useSEO } from '../context/SEOContext';
import SEOHead from '../components/SEOHead';

// Helpers to convert between slug and display names
const toSlug = (str) => str.toLowerCase().replace(/\s+/g, '-');
const fromSlug = (slug, list) => list.find(item => toSlug(item) === slug) || '';

const selectStyle = {
  width: '100%', backgroundColor: '#fff', border: '1px solid #e5e7eb',
  borderRadius: '0.75rem', padding: '0.85rem 2.5rem 0.85rem 3rem',
  fontSize: '0.9rem', color: '#1a1a2e', outline: 'none',
  appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
};
const selectStyleDisabled = { ...selectStyle, opacity: 0.4, cursor: 'not-allowed', backgroundColor: '#f9fafb' };
const iconLeft = { position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' };
const iconRight = { position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' };

export default function Properties() {
  const { properties: allProperties, cityLocations, plotTypes } = useProperties();
  const { getSEO } = useSEO();
  const seoData = getSEO('properties');
  const cities = Object.keys(cityLocations);
  const allLocations = Object.values(cityLocations).flat();
  const params = useParams();
  const navigate = useNavigate();

  // Parse URL params into filter state
  const initialCity = params.city ? fromSlug(params.city, cities) : '';
  const initialLocation = params.location ? fromSlug(params.location, initialCity ? cityLocations[initialCity] || [] : allLocations) : '';
  const initialType = params.type ? fromSlug(params.type, plotTypes) : '';

  const [cityFilter, setCityFilter] = useState(initialCity);
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [typeFilter, setTypeFilter] = useState(initialType);

  const availableLocations = cityFilter ? cityLocations[cityFilter] || [] : [];
  const hasFilters = cityFilter || locationFilter || typeFilter;

  const buildUrl = (city, location, type) => {
    let url = '/properties';
    if (city) {
      url += `/${toSlug(city)}`;
      if (location) {
        url += `/${toSlug(location)}`;
        if (type) url += `/${toSlug(type)}`;
      }
    }
    return url;
  };

  const handleCityChange = (value) => {
    setCityFilter(value); setLocationFilter('');
    navigate(buildUrl(value, '', typeFilter), { replace: true });
  };
  const handleLocationChange = (value) => {
    setLocationFilter(value);
    navigate(buildUrl(cityFilter, value, typeFilter), { replace: true });
  };
  const handleTypeChange = (value) => {
    setTypeFilter(value);
    navigate(buildUrl(cityFilter, locationFilter, value), { replace: true });
  };
  const handleClear = () => {
    setCityFilter(''); setLocationFilter(''); setTypeFilter('');
    navigate('/properties', { replace: true });
  };

  const filteredProperties = allProperties.filter(p => {
    const matchesCity = !cityFilter || p.city === cityFilter;
    const matchesLocation = !locationFilter || p.location === locationFilter;
    const matchesType = !typeFilter || p.type === typeFilter;
    return matchesCity && matchesLocation && matchesType;
  });

  // Breadcrumb from URL
  const breadcrumbs = [{ label: 'Properties', path: '/properties' }];
  if (cityFilter) breadcrumbs.push({ label: cityFilter, path: buildUrl(cityFilter, '', '') });
  if (locationFilter) breadcrumbs.push({ label: locationFilter, path: buildUrl(cityFilter, locationFilter, '') });
  if (typeFilter) breadcrumbs.push({ label: typeFilter, path: buildUrl(cityFilter, locationFilter, typeFilter) });

  return (
    <div style={{ paddingBottom: '5rem', paddingTop: '2rem', minHeight: '100vh', backgroundColor: '#f8f9fb' }} className="animate-fade-in">
      {seoData && (
        <SEOHead
          title={seoData.metaTitle}
          description={seoData.metaDescription}
          keywords={seoData.metaKeywords}
          ogTitle={seoData.ogTitle}
          ogDescription={seoData.ogDescription}
          ogImage={seoData.ogImage}
          canonical={seoData.canonicalUrl}
          schema={seoData.schemaJson ? JSON.parse(seoData.schemaJson) : null}
        />
      )}
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#9ca3af' }}>
          <span style={{ cursor: 'pointer', color: '#6b7280' }} onClick={() => navigate('/')}>Home</span>
          {breadcrumbs.map((b, i) => (
            <span key={i}>
              <span style={{ margin: '0 0.25rem' }}>/</span>
              <span style={{ cursor: 'pointer', color: i === breadcrumbs.length - 1 ? '#A03333' : '#6b7280', fontWeight: i === breadcrumbs.length - 1 ? 600 : 400 }}
                onClick={() => navigate(b.path)}>{b.label}</span>
            </span>
          ))}
        </div>

        {/* Header */}
        <div style={{ marginBottom: '2rem', maxWidth: '42rem' }}>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
            {cityFilter ? `Properties in ${cityFilter}` : (seoData?.heroHeading || 'Explore Properties')}
            {locationFilter ? ` — ${locationFilter}` : ''}
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            {cityFilter
              ? `Browse ${typeFilter || 'all'} listings${locationFilter ? ` in ${locationFilter}, ${cityFilter}` : ` across ${cityFilter}`}.`
              : (seoData?.heroSubheading || 'Discover the perfect luxury property or vacant plot across Rajasthan.')
            }
          </p>
        </div>

        {/* Filter Bar */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '1rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div style={{ position: 'relative' }}>
              <Building2 size={18} style={iconLeft} /> <ChevronDown size={16} style={iconRight} />
              <select style={selectStyle} value={cityFilter} onChange={(e) => handleCityChange(e.target.value)}>
                <option value="">Select City</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} style={iconLeft} /> <ChevronDown size={16} style={iconRight} />
              <select style={cityFilter ? selectStyle : selectStyleDisabled} value={locationFilter} onChange={(e) => handleLocationChange(e.target.value)} disabled={!cityFilter}>
                <option value="">{cityFilter ? 'Select Location' : '— Select City First —'}</option>
                {availableLocations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div style={{ position: 'relative' }}>
              <Trees size={18} style={iconLeft} /> <ChevronDown size={16} style={iconRight} />
              <select style={selectStyle} value={typeFilter} onChange={(e) => handleTypeChange(e.target.value)}>
                <option value="">All Plot Types</option>
                {plotTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <button onClick={handleClear} className="btn" style={{ border: `1px solid ${hasFilters ? '#A03333' : '#e5e7eb'}`, color: hasFilters ? '#A03333' : '#6b7280', borderRadius: '0.75rem', padding: '0.85rem 1.5rem' }}>
              <X size={16} /> Clear Filters
            </button>
          </div>
        </div>

        {/* Results count + active filter pills */}
        <div style={{ marginBottom: '1.5rem', color: '#6b7280', fontSize: '0.85rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 500 }}>Showing {filteredProperties.length} results</span>
          {cityFilter && <span style={{ color: '#A03333', background: '#f9e8e8', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500 }}>{cityFilter}</span>}
          {locationFilter && <span style={{ color: '#A03333', background: '#f9e8e8', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500 }}>{locationFilter}</span>}
          {typeFilter && <span style={{ color: '#A03333', background: '#f9e8e8', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500 }}>{typeFilter}</span>}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => <PropertyCard key={property.id} property={property} />)
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '1.15rem', color: '#6b7280', marginBottom: '0.5rem' }}>No properties found.</p>
              <button onClick={handleClear} style={{ color: '#A03333', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear filters</button>
            </div>
          )}
        </div>

        {/* Dynamic SEO Content Section */}
        {seoData?.contentSection && (
          <div 
            style={{ marginTop: '4rem', color: '#4b5563', lineHeight: 1.8, fontSize: '1rem' }} 
            dangerouslySetInnerHTML={{ __html: seoData.contentSection }} 
          />
        )}
      </div>
    </div>
  );
}
