import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Reusable breadcrumb with JSON-LD BreadcrumbList schema.
 * @param {{ items: { label: string, path: string }[] }} props
 */
export default function Breadcrumbs({ items = [] }) {
  const all = [{ label: 'Home', path: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem' }}>
      <ol style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.3rem',
        listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem',
      }}>
        {all.map((item, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {i > 0 && <ChevronRight size={12} color="#9ca3af" />}
              {isLast ? (
                <span style={{ color: '#A03333', fontWeight: 600 }}>{item.label}</span>
              ) : (
                <Link to={item.path} style={{
                  color: '#6b7280', transition: 'color 0.2s',
                  display: 'flex', alignItems: 'center', gap: '0.25rem',
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#A03333'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                >
                  {i === 0 && <Home size={12} />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': all.map((item, i) => ({
            '@type': 'ListItem',
            'position': i + 1,
            'name': item.label,
            'item': item.path,
          })),
        }),
      }} />
    </nav>
  );
}
