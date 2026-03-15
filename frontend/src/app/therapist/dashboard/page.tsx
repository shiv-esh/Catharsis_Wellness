'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, User, LogOut, CheckCircle, MessageSquare, Loader2, Search } from 'lucide-react';

export default function TherapistDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [remarks, setRemarks] = useState('');
  const [submittingRemarks, setSubmittingRemarks] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('therapist_token');
    if (!token) {
      router.push('/therapist/login');
      return;
    }
    fetchBookings(token);
  }, []);

  const fetchBookings = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/therapist/bookings/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
          return;
        }
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError('Could not load bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('therapist_token');
    localStorage.removeItem('therapist_user');
    router.push('/therapist/login');
  };

  const handleUpdateRemarks = async (bookingId: string) => {
    setSubmittingRemarks(true);
    const token = localStorage.getItem('therapist_token');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/therapist/bookings/${bookingId}/remarks/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ remarks })
      });

      if (response.ok) {
        setBookings(bookings.map(b => b._id === bookingId ? { ...b, remarks } : b));
        setEditingId(null);
        setRemarks('');
      } else {
        alert('Failed to update remarks');
      }
    } catch (err) {
      alert('Error updating remarks');
    } finally {
      setSubmittingRemarks(false);
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.therapy_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={40} color="var(--primary)" />
      </div>
    );
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '40px 5%' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '5px' }}>Therapist Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage your session requests and client notes</p>
          </div>
          <button onClick={handleLogout} className="glass" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', fontWeight: 600 }}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="glass" style={{ padding: '20px', borderRadius: '20px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Search size={20} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search by name, email or therapy type..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, fontSize: '1rem' }}
          />
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredBookings.length === 0 ? (
            <div className="glass" style={{ padding: '50px', textAlign: 'center', borderRadius: '20px' }}>
              <p style={{ color: 'var(--text-muted)' }}>No bookings found.</p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking._id} className="glass" style={{ padding: '30px', borderRadius: '25px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                  {/* Client Info */}
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <User size={20} /> {booking.full_name}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                      <p><strong>Email:</strong> {booking.email}</p>
                      <p><strong>Phone:</strong> {booking.phone}</p>
                      <p><strong>Therapy:</strong> {booking.therapy_type}</p>
                    </div>
                  </div>

                  {/* Session Info */}
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       Booking Details
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} /> {booking.date}</p>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16} /> {booking.time}</p>
                      <p><strong>Mode:</strong> {booking.mode}</p>
                      <p><strong>Status:</strong> <span style={{ color: 'green', fontWeight: 600 }}>Requested</span></p>
                    </div>
                  </div>

                  {/* Remarks Section */}
                  <div style={{ borderLeft: '1px solid #eee', paddingLeft: '30px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <MessageSquare size={20} /> Therapist Remarks
                    </h3>
                    
                    {editingId === booking._id ? (
                      <div>
                        <textarea 
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          placeholder="Add notes or status update for the client..."
                          style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--primary)', outline: 'none', minHeight: '100px', marginBottom: '10px' }}
                        />
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button 
                            onClick={() => handleUpdateRemarks(booking._id)} 
                            className="btn-primary" 
                            disabled={submittingRemarks}
                            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                          >
                            {submittingRemarks ? 'Saving...' : 'Save Remarks'}
                          </button>
                          <button onClick={() => setEditingId(null)} style={{ padding: '8px 20px', fontSize: '0.85rem', background: '#eee', borderRadius: '10px' }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p style={{ color: booking.remarks ? 'var(--text-dark)' : 'var(--text-muted)', fontStyle: booking.remarks ? 'normal' : 'italic', marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
                          {booking.remarks || 'No remarks added yet. Remarks will be visible to the client in their history.'}
                        </p>
                        <button 
                          onClick={() => { setEditingId(booking._id); setRemarks(booking.remarks || ''); }} 
                          style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px', background: 'none' }}
                        >
                          {booking.remarks ? 'Edit Remarks' : '+ Add Remarks'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {booking.message && (
                  <div style={{ marginTop: '25px', padding: '20px', background: 'rgba(var(--primary-rgb), 0.05)', borderRadius: '15px', border: '1px dashed var(--primary)' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Client Note:</p>
                    <p style={{ color: 'var(--text-dark)' }}>{booking.message}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
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
