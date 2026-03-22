import { ArrowUpRight, ArrowDownRight, Users, Home, DollarSign, Activity, Building, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProperties } from '../../context/PropertyContext';

export default function DashboardHome() {
  const { properties } = useProperties();

  // Dynamic stats
  const totalProperties = properties.length;
  const forSale = properties.filter(p => p.status === 'For Sale').length;
  const sold = properties.filter(p => p.status === 'Sold').length;
  const citiesCount = [...new Set(properties.map(p => p.city))].length;

  const stats = [
    { name: 'Total Listings', value: totalProperties.toString(), change: '+4.2%', positive: true, icon: Building },
    { name: 'For Sale', value: forSale.toString(), change: '+3.1%', positive: true, icon: Home },
    { name: 'Sold', value: sold.toString(), change: '+12.5%', positive: true, icon: DollarSign },
    { name: 'Cities Covered', value: citiesCount.toString(), change: '+2', positive: true, icon: Activity },
  ];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 700, color: '#1a1a2e' }}>Dashboard Overview</h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem', fontSize: '0.85rem' }}>Welcome back, Super Admin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ marginBottom: '2rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-1.5rem', right: '-1.5rem', width: '5rem', height: '5rem', background: 'rgba(160,51,51,0.06)', borderRadius: '50%' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.5rem', backgroundColor: '#f9e8e8', borderRadius: '0.5rem', color: '#A03333' }}><stat.icon size={20} /></div>
                <span style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: 500, color: stat.positive ? '#16a34a' : '#ef4444' }}>
                  {stat.change} {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </span>
              </div>
              <h3 style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>{stat.name}</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e' }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/admin/properties" style={{
              display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem',
              border: '1px solid #e5e7eb', transition: 'all 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#A03333'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(160,51,51,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ width: '2.75rem', height: '2.75rem', backgroundColor: '#f9e8e8', borderRadius: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A03333', flexShrink: 0 }}>
                <Building size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a2e' }}>Manage Properties</h4>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Add, edit, or remove property listings</p>
              </div>
            </Link>
            <Link to="/admin/seo" style={{
              display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem',
              border: '1px solid #e5e7eb', transition: 'all 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#A03333'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(160,51,51,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ width: '2.75rem', height: '2.75rem', backgroundColor: '#f9e8e8', borderRadius: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A03333', flexShrink: 0 }}>
                <Globe size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a2e' }}>SEO & Content</h4>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Update meta tags, schemas & page content</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>Recent Listings</h3>
          <div className="space-y-6">
            {properties.slice(-3).reverse().map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#f9e8e8', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A03333' }}><Home size={16} /></div>
                  <div><h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e' }}>{p.title}</h4><p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{p.city}</p></div>
                </div>
                <div style={{ textAlign: 'right' }}><p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#A03333' }}>{p.price}</p><p style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{p.status}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
