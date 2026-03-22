import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', backgroundColor: '#f8f9fb' }}>
      <div style={{ maxWidth: '32rem' }}>
        <h1 style={{ fontSize: '8rem', fontWeight: 700, color: '#A03333', lineHeight: 1, marginBottom: '0.5rem' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '1rem' }}>Page Not Found</h2>
        <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '2rem' }}>
          The property or page you are looking for has either been sold or does not exist.
        </p>
        <Link to="/" className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
          <Home size={18} /> Return to Homepage
        </Link>
      </div>
    </div>
  );
}
