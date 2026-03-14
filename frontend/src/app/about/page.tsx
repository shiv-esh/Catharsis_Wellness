'use client';

import Image from 'next/image';

export default function About() {
  return (
    <div className="animate-fade">
      <section className="section-padding">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h1 style={{ marginBottom: '30px' }}>Empowering Your Path to <span style={{ color: 'var(--primary)' }}>Mental Wellness</span></h1>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--text-muted)' }}>
                At Catharsis Wellness, we believe that every individual has the capacity for healing and growth. Our mission is to provide a compassionate and safe environment where you can express yourself freely and find the tools to lead a more fulfilling life.
              </p>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                We specialize in a range of psychological therapies tailored to meet your unique needs, whether you're dealing with life transitions, relationship challenges, or specific mental health concerns.
              </p>
            </div>
            <div className="about-philosophy">
               <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Our Philosophy</h2>
               <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--text-dark)' }}>
                 "Catharsis is not just about emotional release, but about the clarity and growth that follow."
               </p>
            </div>
          </div>
        </div>
        <style jsx>{`
          .about-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 60px;
            align-items: center;
          }
          .about-philosophy {
            background: var(--calm-green);
            padding: 50px;
            borderRadius: 40px;
            textAlign: center;
          }
          @media (max-width: 991px) {
            .about-grid {
              grid-template-columns: 1fr;
              text-align: center;
              gap: 40px;
            }
            .about-philosophy {
              padding: 40px 30px;
            }
          }
        `}</style>
      </section>

      {/* Therapist Profile */}
      <section className="section-padding" style={{ background: 'var(--secondary)' }}>
        <div className="container">
          <div className="profile-grid">
            <div className="profile-image">
                {/* Placeholder for Therapist Image */}
                <div style={{ width: '100%', height: '100%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dark)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Manasi Srivastava
                </div>
            </div>
            <div className="profile-content">
              <h2 style={{ marginBottom: '10px' }}>Manasi Srivastava</h2>
              <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '20px' }}>Lead Therapist & Founder</p>
              
              <div style={{ marginBottom: '30px', textAlign: 'left' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                    <div style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%', flexShrink: 0 }}></div>
                    <p><strong>Experience:</strong> 3+ years in mental health therapy and counseling</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%', flexShrink: 0, marginTop: '7px' }}></div>
                    <p><strong>Specialization:</strong> Couple Therapy, ADHD Therapy, Anxiety, Depression, Stress, Relationship Issues</p>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                Manasi's approach to therapy is rooted in empathy and evidence-based practices. She believes in building a strong therapeutic alliance with her clients, providing them with a non-judgmental space to explore their thoughts and feelings.
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                With her guidance, clients are empowered to develop effective coping strategies and achieve personal breakthroughs.
              </p>
            </div>
          </div>
        </div>
        <style jsx>{`
          .profile-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 50px;
            align-items: center;
          }
          .profile-image {
            position: relative;
            height: 500px;
            borderRadius: 30px;
            overflow: hidden;
            boxShadow: var(--shadow);
          }
          @media (max-width: 991px) {
            .profile-grid {
              grid-template-columns: 1fr;
              text-align: center;
            }
            .profile-image {
               height: 400px;
               max-width: 400px;
               margin: 0 auto;
            }
            .profile-content {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          }
          @media (max-width: 480px) {
            .profile-image { height: 300px; }
          }
        `}</style>
      </section>
    </div>
  );
}
