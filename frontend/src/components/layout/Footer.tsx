export default function Footer() {
  return (
    <footer style={{ background: 'var(--secondary)', padding: '60px 5% 30px', borderTop: '1px solid #e0e0e0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
        <div>
          <h3 style={{ marginBottom: '20px' }}>Catharsis Wellness</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Healing begins with expression. We provide professional therapy and counseling to help you navigate life's challenges.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '20px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '20px' }}>Contact Info</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li>Email: wellness.catharsis@gmail.com</li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '60px', borderTop: '1px solid #dcdcdc', paddingTop: '20px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Catharsis Wellness. All rights reserved.
      </div>
    </footer>
  );
}
