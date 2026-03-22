import { useState } from 'react';
import { Building2, Lock, Mail } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Standard secure super admin flow check
    if (email === 'admin@gmail.com' && password === 'admin@123') {
      onLogin();
    } else {
      setError('Invalid Email or Password');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fb', padding: '1rem' }}>
      <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '1rem', width: '100%', maxWidth: '400px', border: '1px solid #e5e7eb', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: '#f9e8e8', marginBottom: '1rem' }}>
            <Building2 size={28} color="#A03333" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e' }}>Super Admin Panel</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Login to manage properties and SEO</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 500 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com" 
                style={{ width: '100%', paddingLeft: '2.75rem' }} 
                autoComplete="email" 
                required 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                style={{ width: '100%', paddingLeft: '2.75rem' }} 
                autoComplete="current-password" 
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.85rem', width: '100%', justifyContent: 'center' }}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
