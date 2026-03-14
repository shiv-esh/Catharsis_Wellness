'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

export default function BookSession() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      console.log('Using API URL:', apiUrl);
      const response = await fetch(`${apiUrl}/api/booking/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="section-padding animate-fade" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CheckCircle size={80} color="var(--primary)" style={{ marginBottom: '20px' }} />
        <h1 style={{ marginBottom: '15px' }}>Booking Request Sent!</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 30px' }}>
          Thank you for choosing Catharsis Wellness. Manasi Srivastava or our team will contact you shortly to confirm your session.
        </p>
        <button onClick={() => window.location.href = '/'} className="btn-primary">Return Home</button>
      </div>
    );
  }

  return (
    <div className="animate-fade">
      <section className="section-padding" style={{ background: 'var(--accent)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Book a Session</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Take the first step towards emotional healing. Fill out the details below, and we'll help you find the right path.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="glass" style={{ padding: '40px', borderRadius: '30px', boxShadow: 'var(--shadow)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div className="form-grid">
                <div className="input-group">
                  <label><User size={16} /> Full Name</label>
                  <input name="full_name" type="text" placeholder="Your Name" required />
                </div>
                <div className="input-group">
                  <label><Mail size={16} /> Email Address</label>
                  <input name="email" type="email" placeholder="email@example.com" required />
                </div>
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label><Phone size={16} /> Phone Number</label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--white)', border: '1px solid #e0e0e0', borderRadius: '12px', overflow: 'hidden' }}>
                    <span style={{ padding: '0 15px', background: '#f8f9fa', borderRight: '1px solid #e0e0e0', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 'bold' }}>+91</span>
                    <input name="phone" type="tel" placeholder="XXXXX XXXXX" required style={{ border: 'none', flex: 1, padding: '12px 15px' }} />
                  </div>
                </div>
                <div className="input-group">
                  <label>Therapy Type</label>
                  <select name="therapy_type" required>
                    <option value="">Select a service</option>
                    <option value="Individual Therapy">Individual Therapy</option>
                    <option value="Couple Therapy">Couple Therapy</option>
                    <option value="ADHD Counseling">ADHD Counseling</option>
                    <option value="Anxiety Therapy">Anxiety Therapy</option>
                    <option value="Depression Therapy">Depression Therapy</option>
                    <option value="Stress Management">Stress Management</option>
                    <option value="Relationship Counseling">Relationship Counseling</option>
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label><Calendar size={16} /> Preferred Date</label>
                  <input name="date" type="date" required />
                </div>
                <div className="input-group">
                  <label><Clock size={16} /> Preferred Time</label>
                  <input name="time" type="time" required />
                </div>
              </div>

              <div className="input-group">
                <label><MapPin size={16} /> Counseling Mode</label>
                <div style={{ display: 'flex', gap: '20px', marginTop: '5px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="mode" value="Online" required defaultChecked /> Online
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="mode" value="In-Person" required /> In-Person
                  </label>
                </div>
              </div>

              <div className="input-group">
                <label>Additional Notes (Optional)</label>
                <textarea name="message" rows={4} placeholder="Anything else you'd like to share..."></textarea>
              </div>

              <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
                {loading ? 'Processing...' : 'Confirm Booking Request'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .input-group label {
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-dark);
        }
        .input-group input, 
        .input-group select, 
        .input-group textarea {
          padding: 12px 15px;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          outline: none;
          font-family: inherit;
          background: var(--white);
          transition: border-color 0.3s;
        }
        .input-group input:focus, 
        .input-group select:focus, 
        .input-group textarea:focus {
          border-color: var(--primary);
        }
        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
