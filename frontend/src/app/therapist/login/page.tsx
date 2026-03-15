'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function TherapistLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('therapist_token');
    if (token) {
      router.push('/therapist/dashboard');
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/therapist/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('therapist_token', data.token);
        localStorage.setItem('therapist_user', JSON.stringify(data.user));
        router.push('/therapist/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent)' }}>
      <div className="glass" style={{ padding: '40px', borderRadius: '30px', maxWidth: '400px', width: '90%', boxShadow: 'var(--shadow)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ background: 'var(--primary)', width: '60px', height: '60px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white' }}>
            <Lock size={30} />
          </div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Therapist Portal</h1>
          <p style={{ color: 'var(--text-muted)' }}>Secure login to manage sessions</p>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d32f2f', background: '#ffebee', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
              <Mail size={16} /> Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="therapist@example.com"
              required
              style={{ padding: '12px 15px', borderRadius: '12px', border: '1px solid #e0e0e0', outline: 'none' }}
            />
          </div>

          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
              <Lock size={16} /> Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ padding: '12px 15px', borderRadius: '12px', border: '1px solid #e0e0e0', outline: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ width: '100%', padding: '14px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Login to Dashboard'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
