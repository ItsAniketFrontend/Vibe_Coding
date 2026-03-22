import { useParams, Link, Navigate } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { useEnquiries } from '../context/EnquiryContext';
import { useState } from 'react';
import { MapPin, BedDouble, Bath, Maximize, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { findCityBySlug, plotTypeFromSlug, findLocationBySlug, buildCityUrl, buildPlotTypeUrl, buildLocationUrl, propertyToSlug } from '../utils/slugs';

export default function PlotDetailPage() {
  const { city: citySlug, plotType: typeSlug, location: locSlug, slug } = useParams();
  const { properties, cityLocations } = useProperties();
  const { addEnquiry } = useEnquiries();
  const cities = Object.keys(cityLocations);

  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const city = findCityBySlug(citySlug, cities);
  const plotType = plotTypeFromSlug[typeSlug];
  if (!city || !plotType) return <Navigate to="/404" replace />;

  const locations = cityLocations[city] || [];
  const location = findLocationBySlug(locSlug, locations);
  if (!location) return <Navigate to="/404" replace />;

  const locProperties = properties.filter(
    p => p.city === city && p.type === plotType && p.location === location
  );

  // Find property by slug match
  const property = locProperties.find(p => propertyToSlug(p) === slug);
  if (!property) return <Navigate to="/404" replace />;

  const isPlot = property.type && (property.type.includes('Plot') || property.type.includes('Land'));

  const breadcrumbs = [
    { label: city, path: buildCityUrl(city) },
    { label: `${plotType}s`, path: buildPlotTypeUrl(city, plotType) },
    { label: location, path: buildLocationUrl(city, plotType, location) },
    { label: property.title, path: '' }
  ];

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', backgroundColor: '#f8f9fb' }}>
      <SEOHead
        title={`${property.title} in ${location}, ${city} | Acenst`}
        description={`Buy ${property.title} in ${location}, ${city}. Premium ${plotType} listed at ${property.price}. Size: ${property.sqft} sq.ft.`}
        keywords={`${property.title.toLowerCase()}, ${plotType.toLowerCase()} ${city.toLowerCase()}, ${location.toLowerCase()} property, real estate`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'RealEstateListing',
          name: property.title,
          description: `Premium ${plotType} in ${location}, ${city}`,
          image: property.image,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: property.price.replace(/[^\d]/g, ''),
            availability: 'https://schema.org/InStock',
          },
        }}
      />

      <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
        <Breadcrumbs items={breadcrumbs} />

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <Link to={buildLocationUrl(city, plotType, location)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.9rem', transition: 'color 0.2s', padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#A03333'; e.currentTarget.style.borderColor = '#A03333'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
          >
            <ArrowLeft size={16} /> Back to Listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div style={{ backgroundColor: '#fff', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ position: 'relative', height: 'max(400px, 50vh)' }}>
                <img src={property.image} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ backgroundColor: '#A03333', color: '#fff', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.4rem 0.8rem', borderRadius: '9999px', boxShadow: '0 4px 12px rgba(160,51,51,0.3)' }}>
                    {property.status}
                  </span>
                  <span style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.4rem 0.8rem', borderRadius: '9999px' }}>
                    {property.type}
                  </span>
                </div>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                      {property.title}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6b7280', fontSize: '1rem' }}>
                      <MapPin size={16} color="#A03333" />
                      <span>{property.location}, {property.city}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#A03333', lineHeight: 1 }}>
                      {property.price}
                    </div>
                    <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>Fixed Price</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1.5rem 0', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6', marginBottom: '2rem' }}>
                  {!isPlot && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '3rem', height: '3rem', backgroundColor: '#f9fafb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <BedDouble size={20} color="#374151" />
                        </div>
                        <div>
                          <p style={{ color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bedrooms</p>
                          <p style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1.1rem' }}>{property.beds}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '3rem', height: '3rem', backgroundColor: '#f9fafb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Bath size={20} color="#374151" />
                        </div>
                        <div>
                          <p style={{ color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bathrooms</p>
                          <p style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1.1rem' }}>{property.baths}</p>
                        </div>
                      </div>
                    </>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '3rem', height: '3rem', backgroundColor: '#f9j8e8', backgroundColor: '#f9e8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Maximize size={20} color="#A03333" />
                    </div>
                    <div>
                      <p style={{ color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Plot Area</p>
                      <p style={{ fontWeight: 700, color: '#A03333', fontSize: '1.1rem' }}>{property.sqft} sq.ft</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>Property Overview</h3>
                  <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.8 }}>
                    A rare opportunity to own a {property.type.toLowerCase()} in the highly sought-after area of {property.location}, {property.city}.
                    This property spans {property.sqft} sq.ft. and offers incredible value. Whether for investment or building your dream home,
                    this plot provides unparalleled access to major amenities, schools, and hospitals in {city}.
                  </p>
                </div>
              </div>
            </div>

            {/* Features list (dummy for now) */}
            <div style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '2rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1.5rem' }}>Property Highlights</h3>
              <div className="grid grid-cols-2 gap-y-4">
                {['Prime Location', 'Clear Title', 'Ready Registry', 'Water Connection', 'Electricity Available', 'Main Road Access'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#374151', fontSize: '0.95rem' }}>
                    <CheckCircle2 size={16} color="#16a34a" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Contact Form */}
          <div className="space-y-6">
            <div style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '2rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>Interested in this {isPlot ? 'plot' : 'property'}?</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Get in touch with our experts to schedule a site visit or learn more.</p>

              {submitted ? (
                <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                  <CheckCircle2 size={36} style={{ margin: '0 auto 0.5rem' }} />
                  <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Inquiry Sent!</h4>
                  <p style={{ fontSize: '0.85rem' }}>We will contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={e => {
                  e.preventDefault();
                  addEnquiry({
                    ...formData,
                    type: 'Property Viewing',
                    property: property.id,
                    message: formData.message || `I'm interested in ${property.title} in ${property.location}, ${property.city}.`
                  });
                  setSubmitted(true);
                  setFormData({ name: '', phone: '', email: '', message: '' });
                  setTimeout(() => setSubmitted(false), 5000);
                }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name" style={{ width: '100%' }} required />
                  <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone Number" style={{ width: '100%' }} required />
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email Address" style={{ width: '100%' }} required />
                  <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Message" rows={4} style={{ width: '100%', resize: 'none' }} defaultValue={`I'm interested in ${property.title} in ${property.location}, ${property.city}.`}></textarea>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}>Send Inquiry</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

