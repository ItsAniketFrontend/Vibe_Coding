import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Check if we're on the home page (hero has dark overlay)
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // On home page (before scroll): transparent bg with white text
  // On home page (after scroll): white bg with dark text
  // On other pages: always white bg with dark text
  const useWhiteBg = scrolled || !isHomePage;

  const navStyle = {
    position: 'fixed', width: '100%', zIndex: 50,
    transition: 'all 0.3s ease',
    padding: scrolled ? '0.6rem 0' : '1rem 0',
    backgroundColor: useWhiteBg ? '#ffffff' : 'transparent',
    borderBottom: useWhiteBg ? '1px solid #e5e7eb' : '1px solid transparent',
    boxShadow: useWhiteBg ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
  };

  const textColor = useWhiteBg ? '#1a1a2e' : '#ffffff';
  const mutedTextColor = useWhiteBg ? '#374151' : 'rgba(255,255,255,0.85)';

  return (
    <nav style={navStyle}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Logo size={40} color="#A03333" />
          <span style={{ fontSize: '1.35rem', fontWeight: 700 }}>
            <span style={{ color: useWhiteBg ? '#1a1a2e' : '#ffffff' }}>Acenst</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2rem' }}>
          {navLinks.map(link => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link key={link.path} to={link.path}
                style={{
                  fontSize: '0.9rem', fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#A03333' : mutedTextColor,
                  transition: 'color 0.2s',
                  borderBottom: isActive ? '2px solid #A03333' : '2px solid transparent',
                  paddingBottom: '0.25rem',
                }}>
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} style={{ color: textColor, padding: '0.25rem' }}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" style={{
          position: 'absolute', top: '100%', left: 0, width: '100%',
          backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)', paddingBottom: '1.5rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', paddingTop: '1.5rem' }}>
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                  style={{ fontSize: '1rem', fontWeight: isActive ? 600 : 500, color: isActive ? '#A03333' : '#1a1a2e' }}>
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
