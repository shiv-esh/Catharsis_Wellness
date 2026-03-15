'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [isTherapist, setIsTherapist] = useState(false);

  useEffect(() => {
    // Check if therapist is logged in
    const token = typeof window !== 'undefined' ? localStorage.getItem('therapist_token') : null;
    setIsTherapist(!!token);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'History', path: '/history' },
  ];

  return (
    <nav className="glass" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, padding: '15px 5%' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>
          Catharsis <span style={{ color: 'var(--text-muted)' }}>Wellness</span>
        </Link>
        <div className="desktop-nav" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} style={{ fontWeight: '500' }}>{link.name}</Link>
          ))}
          {isTherapist && (
            <Link href="/therapist/dashboard" style={{ fontWeight: '600', color: 'var(--primary)' }}>Dashboard</Link>
          )}
          <Link href="/book-session" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>Book a Session</Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: 'none', background: 'none', padding: '5px' }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-drawer animate-fade" style={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          width: '100%', 
          background: 'var(--white)', 
          padding: '30px 5%',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          zIndex: 999
        }}>
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} onClick={() => setIsOpen(false)} style={{ fontSize: '1.1rem', fontWeight: '500' }}>
              {link.name}
            </Link>
          ))}
          {isTherapist && (
            <Link href="/therapist/dashboard" onClick={() => setIsOpen(false)} style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--primary)' }}>
              Dashboard
            </Link>
          )}
          <Link href="/book-session" onClick={() => setIsOpen(false)} className="btn-primary" style={{ textAlign: 'center' }}>
            Book a Session
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
