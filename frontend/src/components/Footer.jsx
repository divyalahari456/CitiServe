import { Shield, Mail, Globe, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#FFFFFF',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 -1px 20px rgba(0,0,0,0.03)',
        marginTop: '48px',
      }}
    >
      {/* Tricolor top accent */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 32px 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #FF9933, #e8841a)',
                  borderRadius: '10px',
                  padding: '7px',
                  boxShadow: '0 3px 10px rgba(255,153,51,0.25)',
                }}
              >
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.0625rem',
                  fontWeight: 600,
                  color: '#1A202C',
                }}
              >
                Citi<span style={{ color: '#FF9933' }}>Serve</span>
              </span>
            </div>
            <p
              style={{
                fontSize: '0.8125rem',
                color: '#718096',
                lineHeight: 1.7,
                maxWidth: '220px',
              }}
            >
              The official digital gateway for citizen services, legal education, and grievance management in India.
            </p>
          </div>

          {/* Resources Column */}
          <div>
            <h4
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#CBD5E0',
                marginBottom: '20px',
              }}
            >
              Resources
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Digital India', 'Legal Database', 'Scheme Directory'].map(item => (
                <li
                  key={item}
                  style={{
                    fontSize: '0.875rem',
                    color: '#718096',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    fontWeight: 400,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FF9933'}
                  onMouseLeave={e => e.currentTarget.style.color = '#718096'}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Government Column */}
          <div>
            <h4
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#CBD5E0',
                marginBottom: '20px',
              }}
            >
              Government
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['MyGov Portal', 'Official Gazette', 'Privacy Policy'].map(item => (
                <li
                  key={item}
                  style={{
                    fontSize: '0.875rem',
                    color: '#718096',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    fontWeight: 400,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#138808'}
                  onMouseLeave={e => e.currentTarget.style.color = '#718096'}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#CBD5E0',
                marginBottom: '20px',
              }}
            >
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#718096', cursor: 'pointer' }}>
                <Mail className="w-3.5 h-3.5" style={{ color: '#CBD5E0' }} />
                support@citiserve.in
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#718096', cursor: 'pointer' }}>
                <Globe className="w-3.5 h-3.5" style={{ color: '#CBD5E0' }} />
                Help Center
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#718096', cursor: 'pointer' }}>
                <ExternalLink className="w-3.5 h-3.5" style={{ color: '#CBD5E0' }} />
                API Documentation
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          className="sm:flex-row"
        >
          <p style={{ fontSize: '0.75rem', color: '#CBD5E0', fontWeight: 400, textAlign: 'center' }}>
            © 2026 Citi-Serve Platform · Government of India Initiative
          </p>

          {/* Tricolor bars */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ display: 'block', width: '24px', height: '3px', borderRadius: '99px', background: '#FF9933' }} />
            <span style={{ display: 'block', width: '24px', height: '3px', borderRadius: '99px', background: '#E2E8F0' }} />
            <span style={{ display: 'block', width: '24px', height: '3px', borderRadius: '99px', background: '#138808' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
