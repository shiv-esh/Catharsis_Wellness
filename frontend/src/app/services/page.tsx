'use client';

import Link from 'next/link';

export default function Services() {
  const services = [
    { title: 'Individual Therapy', desc: 'Personalized one-on-one sessions addressing personal challenges, trauma, and self-discovery.' },
    { title: 'Couple Therapy', desc: 'Improving communication, resolving conflicts, and strengthening emotional bonds between partners.' },
    { title: 'ADHD Counseling', desc: 'Practical strategies and emotional support to manage ADHD symptoms and improve daily functioning.' },
    { title: 'Anxiety Therapy', desc: 'Evidence-based tools and techniques to manage anxiety, panic attacks, and intrusive thoughts.' },
    { title: 'Depression Therapy', desc: 'Compassionate support to navigate the complexities of depression and find hope again.' },
    { title: 'Stress Management', desc: 'Learn effective methods to handle daily stress and achieve better work-life balance.' },
    { title: 'Relationship Counseling', desc: 'Guidance for navigating family dynamics, friendships, and professional relationships.' },
    { title: 'Online Therapy Sessions', desc: 'Get professional therapy from the comfort of your home, wherever you are.' },
  ];

  return (
    <div className="animate-fade">
      <section className="section-padding" style={{ background: 'var(--accent)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Our Therapy Services</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
            We offer a diverse range of counseling and therapy services designed to support your mental and emotional well-being.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="responsive-grid">
            {services.map((service, index) => (
              <div 
                key={index} 
                style={{ 
                  padding: '40px 30px', 
                  borderRadius: '24px', 
                  background: 'var(--white)', 
                  boxShadow: 'var(--shadow)', 
                  border: '1px solid #f0f0f0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                   if (window.innerWidth > 768) e.currentTarget.style.transform = 'translateY(-10px)';
                }}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div>
                  <h3 style={{ marginBottom: '15px', color: 'var(--text-dark)' }}>{service.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '25px', lineHeight: '1.6' }}>{service.desc}</p>
                </div>
                <Link href="/book-session" className="btn-outline" style={{ padding: '12px' }}>
                  Book a Session
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="section-padding" style={{ background: 'var(--calm-green)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Safe, Secure & Confidential</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem' }}>
            Your privacy is our priority. All sessions are conducted with the highest standards of confidentiality and professional ethics.
          </p>
        </div>
      </section>
    </div>
  );
}
