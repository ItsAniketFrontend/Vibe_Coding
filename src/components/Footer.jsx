import { Link } from 'react-router-dom';
import { Building2, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a1a2e', paddingTop: '4rem', paddingBottom: '2rem', color: 'rgba(255,255,255,0.7)' }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '3rem', marginBottom: '3rem' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Logo size={42} color="#A03333" />
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>Acenst</span>
            </Link>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>
              Discover unparalleled luxury and comfort in our curated selection of premium properties across Rajasthan.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}><Twitter size={18} /></a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}><Instagram size={18} /></a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}><Linkedin size={18} /></a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>Quick Links</h4>
            {['Home', 'Properties', 'About Us', 'Contact'].map(name => (
              <Link key={name} to={name === 'Home' ? '/' : `/${name.toLowerCase().replace(/\s/g, '-')}`} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', transition: 'color 0.2s' }}>{name}</Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>Services</h4>
            {['Property Management', 'Buying & Selling', 'Investment Consulting', 'Market Analysis'].map(s => (
              <a key={s} href="#" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{s}</a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>Contact Us</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
              <MapPin size={16} color="#A03333" /><span>123 Elite Avenue, Jaipur 302001</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
              <Phone size={16} color="#A03333" /><span>+91 98765 43210</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
              <Mail size={16} color="#A03333" /><span>contact@Acenst.in</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>&copy; {new Date().getFullYear()} Acenst. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.35)' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.35)' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
