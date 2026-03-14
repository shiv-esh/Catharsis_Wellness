'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section style={{ display: 'flex', alignItems: 'center', minHeight: '80vh', position: 'relative', overflow: 'hidden', padding: '60px 0' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-grid">
            <div className="hero-content">
              <h1 style={{ marginBottom: '20px', color: 'var(--text-dark)' }}>
                Healing begins with <span style={{ color: 'var(--primary)' }}>expression</span> – Welcome to Catharsis Wellness
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '500px' }}>
                We provide a safe space for you to explore your emotions, strengthen your relationships, and find your path to personal growth.
              </p>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link href="/book-session" className="btn-primary">Book a Session</Link>
                <Link href="/services" className="btn-outline">Explore Services</Link>
              </div>
            </div>
            <div className="hero-image-container">
               <Image 
                  src="/images/hero.png" 
                  alt="Calm healing environment" 
                  fill 
                  style={{ objectFit: 'cover', borderRadius: '30px', boxShadow: 'var(--shadow)' }}
                />
            </div>
          </div>
        </div>
        {/* Decorative background shape */}
        <div className="hero-bg-shape"></div>

        <style jsx>{`
          .hero-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 40px;
            align-items: center;
          }
          .hero-image-container {
            position: relative;
            height: 500px;
          }
          .hero-bg-shape {
             position: absolute;
             top: -10%;
             right: -5%;
             width: 40%;
             height: 120%;
             background: var(--calm-green);
             border-radius: 100% 0 0 100%;
             z-index: 0;
             opacity: 0.5;
          }
          @media (max-width: 991px) {
            .hero-grid {
              grid-template-columns: 1fr;
              text-align: center;
            }
            .hero-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-bottom: 30px;
            }
            .hero-image-container {
              height: 350px;
              width: 100%;
            }
            .hero-bg-shape {
              width: 100%;
              height: 50%;
              top: 0;
              right: 0;
              border-radius: 0 0 100% 100%;
            }
          }
          @media (max-width: 480px) {
             .hero-image-container { height: 250px; }
          }
        `}</style>
      </section>

      {/* Intro Section */}
      <section className="section-padding" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>About Catharsis Wellness</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            Founded by Manasi Srivastava, Catharsis Wellness is dedicated to providing compassionate, evidence-based therapy. We believe that everyone deserves a supportive environment to heal and thrive. Our approach is holistic, tailored to each individual's unique journey.
          </p>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem' }}>Our Specialized Services</h2>
              <p style={{ color: 'var(--text-muted)' }}>Tailored support for your mental well-being.</p>
            </div>
            <Link href="/services" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'underline' }}>View all services</Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { title: 'Individual Therapy', desc: 'One-on-one sessions focused on your personal growth and healing.' },
              { title: 'Couple Therapy', desc: 'Strengthen your bond and navigate relationship challenges together.' },
              { title: 'ADHD Counseling', desc: 'Strategic support and counseling for navigating life with ADHD.' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '40px', borderRadius: '20px', background: 'var(--white)', boxShadow: 'var(--shadow)', border: '1px solid #f0f0f0' }}>
                <h3 style={{ marginBottom: '15px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>{s.desc}</p>
                <Link href="/book-session" style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Learn More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding" style={{ background: 'var(--accent)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '50px' }}>Kind Words from Our Clients</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { name: 'Sarah J.', text: 'The sessions at Catharsis Wellness have been life-changing. I finally feel heard and supported in my journey.' },
              { name: 'Michael R.', text: 'Highly professional and compassionate approach. The ADHD counseling has given me practical tools to manage my daily life.' },
              { name: 'Emily D.', text: 'A truly safe and calm environment. I highly recommend Manasi for anyone seeking emotional healing.' },
            ].map((t, i) => (
              <div key={i} style={{ padding: '30px', borderRadius: '20px', background: 'var(--white)', boxShadow: 'var(--shadow)', borderTop: '4px solid var(--primary)' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#555' }}>"{t.text}"</p>
                <p style={{ fontWeight: 'bold' }}>- {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container" style={{ background: 'var(--text-dark)', padding: '60px 20px', borderRadius: '30px', color: 'var(--white)' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Ready to start your healing journey?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>Take the first step towards a healthier, happier you.</p>
          <Link href="/book-session" className="btn-primary" style={{ background: 'var(--white)', color: 'var(--text-dark)' }}>Book Your Initial Session</Link>
        </div>
      </section>
    </div>
  );
}
