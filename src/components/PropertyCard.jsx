import { Bath, BedDouble, MapPin, Maximize } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildPlotDetailUrl } from '../utils/slugs';

export default function PropertyCard({ property }) {
  const isPlot = property.type && (property.type.includes('Plot') || property.type.includes('Land'));

  return (
    <Link to={buildPlotDetailUrl(property)} style={{
      backgroundColor: '#fff', borderRadius: '1rem', overflow: 'hidden',
      border: '1px solid #e5e7eb', transition: 'all 0.3s',
      display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer',
      textDecoration: 'none', color: 'inherit'
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#A03333'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', flexShrink: 0 }}>
        <img src={property.image} alt={property.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', zIndex: 2 }}>
          <span style={{ backgroundColor: '#A03333', color: '#fff', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.3rem 0.7rem', borderRadius: '9999px' }}>
            {property.status}
          </span>
          {property.type && (
            <span style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.25rem 0.6rem', borderRadius: '9999px' }}>
              {property.type}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={property.title}>
          {property.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#6b7280', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
          <MapPin size={13} color="#A03333" />
          <span>{property.location}, {property.city}</span>
        </div>

        <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#A03333', marginBottom: '1rem' }}>
          {property.price}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '0.85rem', fontSize: '0.78rem', color: '#6b7280' }}>
          {!isPlot ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
                <BedDouble size={16} color="#374151" />
                <span><strong style={{ color: '#1a1a2e' }}>{property.beds}</strong> Beds</span>
              </div>
              <div style={{ width: '1px', height: '1.5rem', backgroundColor: '#f3f4f6' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
                <Bath size={16} color="#374151" />
                <span><strong style={{ color: '#1a1a2e' }}>{property.baths}</strong> Baths</span>
              </div>
              <div style={{ width: '1px', height: '1.5rem', backgroundColor: '#f3f4f6' }}></div>
            </>
          ) : null}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem', width: isPlot ? '100%' : undefined, textAlign: 'center' }}>
            <Maximize size={16} color="#374151" />
            <span><strong style={{ color: '#1a1a2e' }}>{property.sqft}</strong> sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
