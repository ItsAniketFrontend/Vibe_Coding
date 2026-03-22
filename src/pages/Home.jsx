import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Key, ShieldCheck, Home as HomeIcon, Building2, MapPin, Trees, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../context/PropertyContext';
import { useSEO } from '../context/SEOContext';
import SEOHead from '../components/SEOHead';
import { buildCityUrl, buildLocationUrl, buildPlotTypeUrl } from '../utils/slugs';

const selectStyle = {
  width: '100%', backgroundColor: '#fff', border: '1px solid #e5e7eb',
  borderRadius: '0.75rem', padding: '0.85rem 2.5rem 0.85rem 3rem',
  fontSize: '0.9rem', color: '#1a1a2e', outline: 'none',
  appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
};
const selectStyleDisabled = { ...selectStyle, opacity: 0.4, cursor: 'not-allowed', backgroundColor: '#f9fafb' };
const iconLeft = { position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' };
const iconRight = { position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' };

export default function Home() {
  const { properties: allProperties, cityLocations, plotTypes } = useProperties();
  const { getSEO } = useSEO();
  const seoData = getSEO('home');
  const cities = Object.keys(cityLocations);
  const navigate = useNavigate();
  const [filterCity, setFilterCity] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterType, setFilterType] = useState('');

  const availableLocations = filterCity ? cityLocations[filterCity] || [] : [];
  const hasFilters = filterCity || filterLocation || filterType;

  const buildUrl = (city, location, type) => {
    if (city && type && location) return buildLocationUrl(city, type, location);
    if (city && type) return buildPlotTypeUrl(city, type);
    if (city) return buildCityUrl(city);
    // Fallback if only type is selected without city
    if (type) return `/properties?type=${encodeURIComponent(type)}`;
    return '/properties';
  };

  const handleCityChange = (value) => {
    setFilterCity(value);
    setFilterLocation('');
    const url = buildUrl(value, '', filterType);
    window.history.replaceState(null, '', url);
  };

  const handleLocationChange = (value) => {
    setFilterLocation(value);
    const url = buildUrl(filterCity, value, filterType);
    window.history.replaceState(null, '', url);
  };

  const handleTypeChange = (value) => {
    setFilterType(value);
    const url = buildUrl(filterCity, filterLocation, value);
    window.history.replaceState(null, '', url);
  };

  const handleClear = () => {
    setFilterCity(''); setFilterLocation(''); setFilterType('');
    window.history.replaceState(null, '', '/');
  };

  const filteredProperties = allProperties.filter(p => {
    const matchCity = !filterCity || p.city === filterCity;
    const matchLoc = !filterLocation || p.location === filterLocation;
    const matchType = !filterType || p.type === filterType;
    return matchCity && matchLoc && matchType;
  });

  const propertiesToRender = hasFilters ? filteredProperties : allProperties.slice(0, 6);

  return (
    <div style={{ width: '100%' }}>
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
      
      {/* ── Hero ── */}
      <section style={{ position: 'relative', marginTop: '-80px', height: 'calc(85vh + 80px)', minHeight: '600px', maxHeight: '880px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {/* Horizontal gradient — left to right */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(26,26,46,0.95), rgba(26,26,46,0.8), rgba(26,26,46,0.55))' }} />
          {/* Top gradient — ensures navbar text is always readable */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '120px', zIndex: 2, background: 'linear-gradient(to bottom, rgba(26,26,46,0.8), transparent)' }} />
          <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Luxury Home" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '42rem' }}>
            <span style={{ color: '#fff', fontWeight: 500, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1rem', display: 'inline-block', background: '#A03333', padding: '0.3rem 0.8rem', borderRadius: '4px' }}>
              Exclusive Real Estate
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, color: '#fff', marginBottom: '1.25rem' }}>
              {seoData?.heroHeading || 'Discover Your Dream Property'}
            </h1>
            <p style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', maxWidth: '32rem', fontWeight: 300, lineHeight: 1.7 }}>
              {seoData?.heroSubheading || "Premium properties & plots across Rajasthan's finest cities. Your gateway to luxurious living."}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link to="/properties" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}>
                Explore Properties <ArrowRight size={18} />
              </Link>
              <a href="#filter-section" className="btn" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.35)', color: '#fff' }}>
                Search Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter Section ── */}
      <section id="filter-section" style={{ backgroundColor: '#fff', padding: '2.5rem 0 2rem', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container">
          <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.25rem' }}>Find Your Perfect Property</h2>
            <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Search by city, location, and plot type</p>
          </div>
          <div style={{ background: '#f8f9fb', border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div style={{ position: 'relative' }}>
                <Building2 size={18} style={iconLeft} /> <ChevronDown size={16} style={iconRight} />
                <select style={selectStyle} value={filterCity} onChange={(e) => handleCityChange(e.target.value)}>
                  <option value="">Select City</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={iconLeft} /> <ChevronDown size={16} style={iconRight} />
                <select style={filterCity ? selectStyle : selectStyleDisabled} value={filterLocation} onChange={(e) => handleLocationChange(e.target.value)} disabled={!filterCity}>
                  <option value="">{filterCity ? 'Select Location' : '— Select City First —'}</option>
                  {availableLocations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div style={{ position: 'relative' }}>
                <Trees size={18} style={iconLeft} /> <ChevronDown size={16} style={iconRight} />
                <select style={selectStyle} value={filterType} onChange={(e) => handleTypeChange(e.target.value)}>
                  <option value="">All Plot Types</option>
                  {plotTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <button onClick={handleClear} className="btn" style={{ border: `1px solid ${hasFilters ? '#A03333' : '#e5e7eb'}`, color: hasFilters ? '#A03333' : '#6b7280', borderRadius: '0.75rem', padding: '0.85rem 1.5rem' }}>
                <X size={16} /> Clear Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '4rem 0', backgroundColor: '#1a1a2e' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '1rem' }}>
            {[{ val: '10+', label: 'Years Experience' }, { val: '₹2.5B', label: 'Property Sales' }, { val: '850', label: 'Happy Clients' }, { val: '45', label: 'Awards Won' }].map((s, i) => (
              <div key={i} className="glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.25rem 1rem', borderRadius: '0.75rem' }}>
                <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>{s.val}</h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Properties ── */}
      <section id="properties-section" style={{ padding: '5rem 0', backgroundColor: '#f8f9fb' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem' }} className="md:flex-row md:items-end justify-between">
            <div>
              <span style={{ color: '#A03333', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.06em', marginBottom: '0.4rem', display: 'block' }}>
                {hasFilters ? 'Search Results' : 'Premium Selection'}
              </span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.25rem)', fontWeight: 700, color: '#1a1a2e' }}>
                {hasFilters ? 'Properties Matching Your Criteria' : 'Featured Properties'}
              </h2>
              {hasFilters && (
                <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '0.85rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{propertiesToRender.length} results</span>
                  {filterCity && <span style={{ color: '#A03333', background: '#f9e8e8', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500 }}>{filterCity}</span>}
                  {filterLocation && <span style={{ color: '#A03333', background: '#f9e8e8', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500 }}>{filterLocation}</span>}
                  {filterType && <span style={{ color: '#A03333', background: '#f9e8e8', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500 }}>{filterType}</span>}
                </p>
              )}
            </div>
            <Link to={hasFilters ? buildUrl(filterCity, filterLocation, filterType) : "/properties"} className="hidden md:flex items-center gap-2" style={{ color: '#A03333', fontWeight: 500 }}>View All <ArrowRight size={18} /></Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertiesToRender.length > 0 ? (
              propertiesToRender.map((property, idx) => (
                <div key={property.id} className={`delay-${(idx % 3) + 1}00 animate-fade-in`} style={{ height: '100%' }}>
                  <PropertyCard property={property} />
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '1.15rem', color: '#6b7280', marginBottom: '0.5rem' }}>No properties found matching your criteria.</p>
                <button onClick={handleClear} style={{ color: '#A03333', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear all filters</button>
              </div>
            )}
          </div>
          <div className="mt-12 text-center md:hidden">
            <Link to={hasFilters ? buildUrl(filterCity, filterLocation, filterType) : "/properties"} className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>View All Properties</Link>
          </div>
        </div>
      </section>

      {/* ── Cities Section ── */}
      <section style={{ padding: '4rem 0', backgroundColor: '#fff', borderTop: '1px solid #e5e7eb' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 3rem' }}>
            <span style={{ color: '#A03333', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.06em', marginBottom: '0.4rem', display: 'block' }}>Explore by Location</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.75rem' }}>Find Properties By City</h2>
            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Discover premium plots and homes in top cities.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {cities.map((city, idx) => (
              <Link 
                key={idx} 
                to={buildCityUrl(city)} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#f8f9fb', 
                  padding: '2rem 1rem', 
                  borderRadius: '1rem', 
                  border: '1px solid #e5e7eb', 
                  transition: 'all 0.3s', 
                  color: '#1a1a2e',
                  fontWeight: 600,
                  fontSize: '1.15rem',
                  textDecoration: 'none',
                  gap: '0.75rem'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.borderColor = '#A03333'; 
                  e.currentTarget.style.transform = 'translateY(-0.25rem)'; 
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(160,51,51,0.1)'; 
                  e.currentTarget.style.color = '#A03333'; 
                  e.currentTarget.querySelector('svg').style.color = '#A03333'; 
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.borderColor = '#e5e7eb'; 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.boxShadow = 'none'; 
                  e.currentTarget.style.color = '#1a1a2e'; 
                  e.currentTarget.querySelector('svg').style.color = '#1a1a2e'; 
                }}
              >
                <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <Building2 size={20} style={{ color: '#1a1a2e', transition: 'all 0.3s' }} />
                </div>
                <span>{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dynamic Content Section ── */}
      {seoData?.contentSection && (
        <section style={{ padding: '4rem 0', backgroundColor: '#f8f9fb', borderTop: '1px solid #e5e7eb' }}>
          <div className="container">
            <div 
              style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1rem', maxWidth: '800px', margin: '0 auto' }} 
              dangerouslySetInnerHTML={{ __html: seoData.contentSection }} 
            />
          </div>
        </section>
      )}

      {/* ── Why Choose Us ── */}
      <section style={{ padding: '5rem 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 3rem' }}>
            <span style={{ color: '#A03333', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.06em', marginBottom: '0.4rem', display: 'block' }}>The Acenst Difference</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.75rem' }}>Why Choose Us</h2>
            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>We redefine real estate through uncompromising quality, deep market knowledge, and unparalleled service.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { Icon: ShieldCheck, title: 'Secure Transactions', desc: 'Our legal team ensures every transaction is secure, transparent, and completely worry-free.' },
              { Icon: HomeIcon, title: 'Premium Listings', desc: 'Access exclusive off-market properties before they even hit the public market.' },
              { Icon: Key, title: 'End-to-End Service', desc: 'From initial viewing to handing over the keys, our concierge handles every detail.' },
            ].map(({ Icon, title, desc }, i) => (
              <div key={i} style={{ backgroundColor: '#f8f9fb', padding: '2rem', borderRadius: '1rem', border: '1px solid #e5e7eb', transition: 'all 0.3s', cursor: 'pointer' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#A03333'; e.currentTarget.style.transform = 'translateY(-0.5rem)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(160,51,51,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ width: '3.25rem', height: '3.25rem', backgroundColor: '#f9e8e8', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A03333', marginBottom: '1.25rem' }}>
                  <Icon size={26} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      {seoData?.faqs && seoData.faqs.length > 0 && (
        <section style={{ padding: '5rem 0', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.75rem' }}>Frequently Asked Questions</h2>
            </div>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {seoData.faqs.map((faq, i) => (
                <div key={i} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '0.5rem' }}>{faq.question}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6 }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
