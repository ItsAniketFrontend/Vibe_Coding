import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Building, Globe, Settings, LogOut, ChevronRight, Menu, X, Mail } from 'lucide-react';
import { useState } from 'react';
import DashboardHome from './DashboardHome';
import ManageProperties from './ManageProperties';
import ManageSEO from './ManageSEO';
import ManageEnquiries from './ManageEnquiries';
import AdminLogin from './AdminLogin';

export default function AdminDashboard() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('luxeestates_admin_auth') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('luxeestates_admin_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('luxeestates_admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const menuItems = [
    { path: '/admin', name: 'Overview', icon: LayoutDashboard },
    { path: '/admin/properties', name: 'Properties', icon: Building },
    { path: '/admin/enquiries', name: 'Enquiries', icon: Mail },
    { path: '/admin/seo', name: 'SEO & Content', icon: Globe },
    { path: '/admin/settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 80px)', backgroundColor: '#f8f9fb', position: 'relative', overflow: 'hidden' }}>
      {/* Mobile Toggle */}
      <div className="md:hidden" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50px', background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', zIndex: 20 }}>
        <span style={{ fontWeight: 700, color: '#1a1a2e' }}>Admin Menu</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: '#1a1a2e' }}>
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside style={{
        width: '16rem', backgroundColor: '#fff', borderRight: '1px solid #e5e7eb',
        display: 'flex', flexDirection: 'column', height: '100%',
        position: 'absolute', zIndex: 10,
        transition: 'transform 0.3s',
        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        top: '50px',
      }}
        className="md:relative md:translate-x-0 md:top-0"
      >
        <div style={{ padding: '1.5rem', display: 'none' }} className="md:block">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin Panel</h2>
        </div>
        <nav style={{ flex: 1, padding: '0 0.75rem' }} className="space-y-2" >
          {menuItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.7rem 0.85rem', borderRadius: '0.6rem', transition: 'all 0.2s',
                  backgroundColor: isActive ? '#f9e8e8' : 'transparent',
                  color: isActive ? '#A03333' : '#6b7280',
                  fontWeight: isActive ? 600 : 400,
                  border: isActive ? '1px solid rgba(160,51,51,0.15)' : '1px solid transparent',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <item.icon size={18} /> <span style={{ fontSize: '0.875rem' }}>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>
        <div style={{ padding: '0.75rem', borderTop: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.7rem 0.85rem', borderRadius: '0.6rem', color: '#374151', fontSize: '0.875rem', fontWeight: 500, transition: 'background 0.2s' }}>
            <Building size={18} /> View Website
          </Link>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.7rem 0.85rem', borderRadius: '0.6rem', color: '#ef4444', fontSize: '0.875rem', fontWeight: 500, transition: 'background 0.2s', width: '100%', textAlign: 'left', cursor: 'pointer', background: 'transparent', border: 'none' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', marginTop: '50px', width: '100%' }} className="md:mt-0 md:p-8">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/properties" element={<ManageProperties />} />
          <Route path="/enquiries" element={<ManageEnquiries />} />
          <Route path="/seo" element={<ManageSEO />} />
          <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '5rem', color: '#6b7280' }}>Page under construction</div>} />
        </Routes>
      </main>
    </div>
  );
}
