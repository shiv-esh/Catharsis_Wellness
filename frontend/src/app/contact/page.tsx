'use client';

export default function Contact() {
  return (
    <div className="animate-fade">
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Get in Touch</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              We're here to answer your questions and help you start your journey to wellness.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
            {/* Contact Information */}
            <div style={{ padding: '40px', background: 'var(--secondary)', borderRadius: '30px' }}>
              <h2 style={{ marginBottom: '30px' }}>Contact Information</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '5px' }}>Email Us</p>
                  <p style={{ color: 'var(--text-muted)', wordBreak: 'break-all' }}>hello@catharsiswellness.com</p>
                </div>
                
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '5px' }}>Phone Number</p>
                  <p style={{ color: 'var(--text-muted)' }}>+1 (555) 000-0000</p>
                </div>
                
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '5px' }}>Our Location</p>
                  <p style={{ color: 'var(--text-muted)' }}>123 Serenity Park, Harmony Suite 202, Healing City, HC 54321</p>
                </div>
              </div>

              <div style={{ marginTop: '50px', borderTop: '1px solid #e0e0e0', paddingTop: '30px' }}>
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                  Interested in a free 15-minute consultation? Mention it in your message!
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'var(--white)', padding: '40px', borderRadius: '30px', boxShadow: 'var(--shadow)', border: '1px solid #f0f0f0' }}>
              <h2 style={{ marginBottom: '30px' }}>Send a Message</h2>
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data = Object.fromEntries(formData.entries());
                  
                  try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
                    console.log('Using API URL:', apiUrl);
                    const response = await fetch(`${apiUrl}/api/contact/`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data),
                    });
                    
                    if (response.ok) {
                      alert('Message sent successfully! We will get back to you soon.');
                      (e.target as HTMLFormElement).reset();
                    } else {
                      alert('Failed to send message. Please try again.');
                    }
                  } catch (err) {
                    console.error('Error sending message:', err);
                    alert('An error occurred. Please check your connection.');
                  }
                }}
                className="contact-form"
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <div className="form-row">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="name" style={{ fontWeight: '500', fontSize: '0.9rem' }}>Full Name</label>
                    <input name="name" type="text" id="name" required placeholder="John Doe" style={{ padding: '12px 15px', borderRadius: '10px', border: '1px solid #e0e0e0', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="email" style={{ fontWeight: '500', fontSize: '0.9rem' }}>Email Address</label>
                    <input name="email" type="email" id="email" required placeholder="john@example.com" style={{ padding: '12px 15px', borderRadius: '10px', border: '1px solid #e0e0e0', outline: 'none' }} />
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="service" style={{ fontWeight: '500', fontSize: '0.9rem' }}>Interested Service</label>
                  <select name="service" id="service" style={{ padding: '12px 15px', borderRadius: '10px', border: '1px solid #e0e0e0', outline: 'none', background: 'white' }}>
                    <option value="">Select a service</option>
                    <option value="Individual Therapy">Individual Therapy</option>
                    <option value="Couple Therapy">Couple Therapy</option>
                    <option value="ADHD Counseling">ADHD Counseling</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="message" style={{ fontWeight: '500', fontSize: '0.9rem' }}>Your Message</label>
                  <textarea name="message" id="message" required rows={5} placeholder="How can we help you?" style={{ padding: '12px 15px', borderRadius: '10px', border: '1px solid #e0e0e0', outline: 'none', resize: 'none' }}></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Send Message</button>
              </form>
            </div>

            <style jsx>{`
              .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
              }
              @media (max-width: 600px) {
                .form-row {
                  grid-template-columns: 1fr;
                }
              }
            `}</style>
          </div>
        </div>
      </section>
    </div>
  );
}
