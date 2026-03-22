import React from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { buildCityUrl } from '../utils/slugs';
import { useEnquiries } from '../context/EnquiryContext';
import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function DynamicLandingPage({ page }) {
  const { properties } = useProperties();
  const { addEnquiry } = useEnquiries();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: 'Landing Page Enquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters.';
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) newErrors.phone = 'Please enter a valid 10-digit phone number.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addEnquiry({ ...formData, type: `Landing Page: ${page.title}` });
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', type: 'Landing Page Enquiry', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Filter properties logic
  let displayProperties = [];

  if (page.specificPropertyIds && page.specificPropertyIds.trim() !== '') {
    // Exact IDs specified natively
    const ids = page.specificPropertyIds.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
    displayProperties = properties.filter(p => ids.includes(p.id));
  } else {
    // Filter by City (always required), and Location/PlotType if specified
    displayProperties = properties.filter(p => {
      const matchCity = p.city && page.city && p.city.toLowerCase() === page.city.toLowerCase();
      const matchLoc = !page.filterLocation || (p.location && p.location.toLowerCase() === page.filterLocation.toLowerCase());
      const matchType = !page.filterPlotType || (p.type && p.type.toLowerCase() === page.filterPlotType.toLowerCase());
      return matchCity && matchLoc && matchType;
    });
  }

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
              Properties in {page.city.charAt(0).toUpperCase() + page.city.slice(1)} ({displayProperties.length})
            </h2>
          </div>
          {displayProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProperties.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>No properties listed in {page.city} yet.</p>
            </div>
          )}
        </section>

        {/* Enquiry Form */}
        <section style={{ marginTop: '4rem' }}>
          <div style={{ backgroundColor: '#fff', padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '1rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>Interested in {page.city}?</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Fill out the form below and our experts will get back to you with the best options.</p>
            
            {submitted ? (
              <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                <CheckCircle2 size={48} style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Enquiry Sent Successfully!</h3>
                <p>Thank you for reaching out. One of our property experts will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Full Name *</label>
                    <input type="text" value={formData.name} onChange={e => {setFormData({...formData, name: e.target.value}); if(errors.name) setErrors({...errors, name: ''});}} placeholder="John Doe" style={{ width: '100%', padding: '0.85rem 1rem', border: `1px solid ${errors.name ? 'red' : '#e5e7eb'}`, borderRadius: '0.5rem' }} />
                    {errors.name && <span style={{ color: 'red', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem' }}>{errors.name}</span>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Email Address *</label>
                    <input type="text" value={formData.email} onChange={e => {setFormData({...formData, email: e.target.value}); if(errors.email) setErrors({...errors, email: ''});}} placeholder="john@example.com" style={{ width: '100%', padding: '0.85rem 1rem', border: `1px solid ${errors.email ? 'red' : '#e5e7eb'}`, borderRadius: '0.5rem' }} />
                    {errors.email && <span style={{ color: 'red', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem' }}>{errors.email}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Phone Number *</label>
                    <input type="tel" value={formData.phone} onChange={e => {setFormData({...formData, phone: e.target.value}); if(errors.phone) setErrors({...errors, phone: ''});}} placeholder="+91 98765 43210" style={{ width: '100%', padding: '0.85rem 1rem', border: `1px solid ${errors.phone ? 'red' : '#e5e7eb'}`, borderRadius: '0.5rem' }} />
                    {errors.phone && <span style={{ color: 'red', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem' }}>{errors.phone}</span>}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Your Message *</label>
                  <textarea value={formData.message} onChange={e => {setFormData({...formData, message: e.target.value}); if(errors.message) setErrors({...errors, message: ''});}} rows="4" placeholder="I am interested in..." style={{ width: '100%', padding: '1rem', resize: 'vertical', border: `1px solid ${errors.message ? 'red' : '#e5e7eb'}`, borderRadius: '0.5rem' }}></textarea>
                  {errors.message && <span style={{ color: 'red', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem' }}>{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#A03333', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>
                  <Send size={18} /> Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
