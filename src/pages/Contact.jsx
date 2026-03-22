import { useSEO } from '../context/SEOContext';
import SEOHead from '../components/SEOHead';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useEnquiries } from '../context/EnquiryContext';
import { useState } from 'react';

export default function Contact() {
  const { getSEO } = useSEO();
  const { addEnquiry } = useEnquiries();
  const seoData = getSEO('contact') || {};

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: 'Buying Property', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addEnquiry(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', type: 'Buying Property', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#f8f9fb', minHeight: '100vh', paddingBottom: '5rem' }}>
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
      
      {/* Hero */}
      <section style={{ backgroundColor: '#1a1a2e', color: '#fff', padding: '5rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '1rem' }}>
            {seoData.heroHeading || 'Contact Us'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '42rem', margin: '0 auto', lineHeight: 1.6 }}>
            {seoData.heroSubheading || "Get in touch with our experts. Whether you're looking to buy, sell, or invest, we're here to help."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '4rem' }}>
        
        {seoData.contentSection && (
          <div style={{ marginBottom: '3rem', color: '#4b5563', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: seoData.contentSection }}></div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Details */}
          <div className="space-y-6 lg:col-span-1">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1.5rem' }}>Our Offices</h2>
            
            <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e5e7eb', display: 'flex', gap: '1rem' }}>
              <div style={{ backgroundColor: '#f9e8e8', padding: '0.75rem', borderRadius: '50%', color: '#A03333', height: 'fit-content' }}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.25rem' }}>Headquarters</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  123 Elite Avenue, Phase 1,<br />
                  Jaipur, Rajasthan 302001
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e5e7eb', display: 'flex', gap: '1rem' }}>
              <div style={{ backgroundColor: '#f9e8e8', padding: '0.75rem', borderRadius: '50%', color: '#A03333', height: 'fit-content' }}>
                <Phone size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.25rem' }}>Phone Support</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  General: +91 98765 43210<br />
                  Sales: +91 98765 00000
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e5e7eb', display: 'flex', gap: '1rem' }}>
              <div style={{ backgroundColor: '#f9e8e8', padding: '0.75rem', borderRadius: '50%', color: '#A03333', height: 'fit-content' }}>
                <Mail size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.25rem' }}>Email Us</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  info@Acenst.in<br />
                  sales@Acenst.in
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e5e7eb', display: 'flex', gap: '1rem' }}>
              <div style={{ backgroundColor: '#f9e8e8', padding: '0.75rem', borderRadius: '50%', color: '#A03333', height: 'fit-content' }}>
                <Clock size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.25rem' }}>Working Hours</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Mon-Sat: 10:00 AM - 7:00 PM<br />
                  Sun: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div style={{ backgroundColor: '#fff', padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '1rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1.5rem' }}>Send Us a Message</h2>
              
              {submitted ? (
                <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                  <CheckCircle2 size={48} style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Message Sent Successfully!</h3>
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
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Inquiry Type</label>
                      <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem' }}>
                        <option>Buying Property</option>
                        <option>Selling Property</option>
                        <option>Investment Advice</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Your Message *</label>
                    <textarea value={formData.message} onChange={e => {setFormData({...formData, message: e.target.value}); if(errors.message) setErrors({...errors, message: ''});}} rows="5" placeholder="How can we help you today?" style={{ width: '100%', padding: '1rem', resize: 'vertical', border: `1px solid ${errors.message ? 'red' : '#e5e7eb'}`, borderRadius: '0.5rem' }}></textarea>
                    {errors.message && <span style={{ color: 'red', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem' }}>{errors.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem', alignSelf: 'flex-start' }}>
                    <Send size={18} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
