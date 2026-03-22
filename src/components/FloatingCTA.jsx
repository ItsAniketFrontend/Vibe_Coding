import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, X, Send, CheckCircle2 } from 'lucide-react';
import { useEnquiries } from '../context/EnquiryContext';

export default function FloatingCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addEnquiry } = useEnquiries();
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnquiry({
      ...formData,
      type: 'CTA Button Enquiry',
      source: 'CTA Button'
    });
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
    }, 4000);
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 9999 }}>
        {/* Enquiry Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#A03333', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', border: 'none', transition: 'transform 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title="Send Enquiry"
        >
          <Mail size={24} />
        </button>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/919983891624" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#25D366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', border: 'none', transition: 'transform 0.2s', textDecoration: 'none' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title="WhatsApp Us"
        >
          <MessageCircle size={24} />
        </a>

        {/* Phone Button */}
        <a 
          href="tel:+919983891624"
          style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#007BFF', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', border: 'none', transition: 'transform 0.2s', textDecoration: 'none' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title="Call Us"
        >
          <Phone size={24} />
        </a>
      </div>

      {/* Enquiry Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '1rem' }} onClick={() => setIsModalOpen(false)}>
          <div style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '2rem', width: '100%', maxWidth: '500px', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1.5rem' }}>Quick Enquiry</h2>
            
            {submitted ? (
              <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                <CheckCircle2 size={48} style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p>Thank you. We will contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Full Name *</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name" style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Phone Number *</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Your Phone Number" style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Email Address</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Your Email Address" style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Message</label>
                  <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows="3" placeholder="How can we help you?" style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', resize: 'vertical' }}></textarea>
                </div>
                <button type="submit" style={{ backgroundColor: '#A03333', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}>
                  <Send size={18} /> Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
