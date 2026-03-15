'use client';

import { useState } from 'react';
import { Search, Calendar, Clock, MapPin, User, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function BookingHistory() {
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/booking-history/?identifier=${encodeURIComponent(identifier)}`);
      
      if (!response.ok) {
        throw new Error('Could not fetch booking history');
      }

      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching your history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade min-vh-100">
      <section className="section-padding" style={{ background: 'var(--accent)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Booking History</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Enter your email address or phone number to view your previous session requests.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="glass" style={{ padding: '30px', borderRadius: '30px', boxShadow: 'var(--shadow)', marginBottom: '40px' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Enter email or phone number" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px 15px 12px 45px', 
                    borderRadius: '12px', 
                    border: '1px solid #e0e0e0',
                    outline: 'none',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Search'}
              </button>
            </form>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d32f2f', background: '#ffebee', padding: '15px', borderRadius: '12px', marginBottom: '30px' }}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {hasSearched && !loading && bookings.length === 0 && !error && (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No bookings found for this identifier.</p>
            </div>
          )}

          {bookings.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Found {bookings.length} Bookings</h2>
              {bookings.map((booking) => (
                <div key={booking._id} className="glass card-hover" style={{ padding: '25px', borderRadius: '25px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '5px' }}>{booking.therapy_type}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Booked on {new Date(booking.created_at).toLocaleDateString()}</p>
                    </div>
                    <div style={{ background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                      {booking.mode}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-dark)' }}>
                      <Calendar size={16} color="var(--primary)" />
                      <span>{booking.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-dark)' }}>
                      <Clock size={16} color="var(--primary)" />
                      <span>{booking.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-dark)' }}>
                      <User size={16} color="var(--primary)" />
                      <span>{booking.full_name}</span>
                    </div>
                  </div>

                  {booking.remarks && (
                    <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(var(--primary-rgb), 0.05)', borderRadius: '12px', border: '1px solid rgba(var(--primary-rgb), 0.2)' }}>
                      <p style={{ fontWeight: 600, marginBottom: '5px', color: 'var(--primary)', fontSize: '0.9rem' }}>Therapist Remarks:</p>
                      <p style={{ color: 'var(--text-dark)', whiteSpace: 'pre-wrap' }}>{booking.remarks}</p>
                    </div>
                  )}

                  {booking.message && (
                    <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '12px', fontSize: '0.9rem' }}>
                      <p style={{ fontWeight: 600, marginBottom: '5px', color: 'var(--text-muted)' }}>Your Message:</p>
                      <p style={{ color: 'var(--text-dark)' }}>{booking.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .min-vh-100 {
          min-height: 100vh;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow);
        }
      `}</style>
    </div>
  );
}
