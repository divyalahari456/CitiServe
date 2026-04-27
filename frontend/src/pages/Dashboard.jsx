import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, AlertTriangle, FileText, Activity, User,
  ShieldAlert, Users, Settings, ArrowRight, Calendar
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

/* ── Dashboard Card ──────────────────────────────────────── */
const DashboardCard = ({ icon, title, description, link, accentColor }) => (
  <Link
    to={link}
    style={{ textDecoration: 'none' }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '8px 8px 20px rgba(0,0,0,0.09), -8px -8px 20px rgba(255,255,255,0.90)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)';
    }}
  >
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '18px',
        padding: '28px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)',
        border: '1px solid rgba(255,255,255,0.9)',
        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'pointer',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          background: accentColor.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: `inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.8)`,
          transition: 'transform 0.2s ease',
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '1rem',
          fontWeight: 600,
          color: '#1A202C',
          marginBottom: '8px',
          lineHeight: 1.3,
          transition: 'color 0.2s',
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: '#718096', lineHeight: 1.6, flexGrow: 1, fontWeight: 400 }}>
        {description}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '20px',
          fontSize: '0.8rem',
          fontWeight: 500,
          color: accentColor.text,
          transition: 'gap 0.2s',
        }}
      >
        Open Service
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  </Link>
);

/* ── Dashboard Page ──────────────────────────────────────── */
const Dashboard = ({ role }) => {
  const { language, translateBatch } = useLanguage();

  const citizenCards = [
    { title: 'Rights & Laws',       description: 'Know your legal rights and civic duties',       link: '/laws',                accentColor: { bg: 'rgba(255,153,51,0.10)', text: '#FF9933' },  icon: <BookOpen  className="w-5 h-5" style={{ color: '#FF9933' }} /> },
    { title: 'Govt Schemes',        description: 'Find schemes you are eligible for',             link: '/schemes',             accentColor: { bg: 'rgba(19,136,8,0.09)', text: '#138808' },   icon: <FileText  className="w-5 h-5" style={{ color: '#138808' }} /> },
    { title: 'Register Complaint',  description: 'Report civic issues to authorities',            link: '/complaint-form',      accentColor: { bg: 'rgba(229,62,62,0.08)', text: '#E53E3E' },  icon: <AlertTriangle className="w-5 h-5" style={{ color: '#E53E3E' }} /> },
    { title: 'Track Complaint',     description: 'Check real-time status of your reports',       link: '/complaint-tracking',  accentColor: { bg: 'rgba(237,137,54,0.10)', text: '#D69E2E' }, icon: <Activity  className="w-5 h-5" style={{ color: '#D69E2E' }} /> },
    { title: 'Your Profile',        description: 'Manage your personal details',                 link: '/profile',             accentColor: { bg: 'rgba(0,0,0,0.04)', text: '#4A5568' },     icon: <User      className="w-5 h-5" style={{ color: '#718096' }} /> },
    { title: 'Settings',            description: 'Configure your portal preferences',            link: '#',                    accentColor: { bg: 'rgba(0,0,0,0.04)', text: '#4A5568' },     icon: <Settings  className="w-5 h-5" style={{ color: '#718096' }} /> },
  ];

  const adminCards = [
    { title: 'System Overview',     description: 'View platform metrics and stats',              link: '/admin',               accentColor: { bg: 'rgba(102,126,234,0.10)', text: '#667EEA' }, icon: <ShieldAlert   className="w-5 h-5" style={{ color: '#667EEA' }} /> },
    { title: 'Manage Complaints',   description: 'Review and resolve active complaints',         link: '/admin/complaints',    accentColor: { bg: 'rgba(229,62,62,0.08)', text: '#E53E3E' },  icon: <Activity      className="w-5 h-5" style={{ color: '#E53E3E' }} /> },
    { title: 'Manage Users',        description: 'Administer citizen accounts',                  link: '/admin/users',         accentColor: { bg: 'rgba(66,153,225,0.10)', text: '#4299E1' },  icon: <Users         className="w-5 h-5" style={{ color: '#4299E1' }} /> },
    { title: 'Manage Laws',         description: 'Update rights and law database',               link: '/admin/laws',          accentColor: { bg: 'rgba(19,136,8,0.09)', text: '#138808' },   icon: <BookOpen      className="w-5 h-5" style={{ color: '#138808' }} /> },
    { title: 'Platform Settings',   description: 'Configure system preferences',                 link: '/admin/settings',      accentColor: { bg: 'rgba(0,0,0,0.04)', text: '#4A5568' },     icon: <Settings      className="w-5 h-5" style={{ color: '#718096' }} /> },
  ];

  const baseCards = role === 'admin' ? adminCards : citizenCards;
  const greeting = role === 'admin' ? 'Administrator' : 'Citizen';

  const [cards, setCards] = useState(baseCards);
  const [translatedGreeting, setTranslatedGreeting] = useState(greeting);
  const [translatedSubtitle, setTranslatedSubtitle] = useState('');

  useEffect(() => {
    const translateDashboard = async () => {
      const currentCards = role === 'admin' ? adminCards : citizenCards;
      const subtitle = role === 'admin'
        ? 'Monitor platform activity, manage users, and ensure civic issues are addressed efficiently.'
        : 'Access your rights, explore government schemes, and actively participate in improving your community.';

      if (language === 'en') {
        setCards(currentCards);
        setTranslatedGreeting(greeting);
        setTranslatedSubtitle(subtitle);
        return;
      }

      const allTexts = [greeting, subtitle];
      currentCards.forEach(card => allTexts.push(card.title, card.description));
      const translated = await translateBatch(allTexts);

      setTranslatedGreeting(translated[0]);
      setTranslatedSubtitle(translated[1]);
      const translatedCards = currentCards.map((card, i) => ({
        ...card,
        title: translated[2 + i * 2],
        description: translated[2 + i * 2 + 1],
      }));
      setCards(translatedCards);
    };
    translateDashboard();
  }, [language, role]);

  const todayStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }} className="animate-fade-up">

      {/* ── Hero Banner ─────────────────────────────────── */}
      <section
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '40px 40px',
          boxShadow: '6px 6px 18px rgba(0,0,0,0.06), -6px -6px 18px rgba(255,255,255,0.85)',
          border: '1px solid rgba(255,255,255,0.9)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradient blobs */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '35%', height: '100%', background: 'linear-gradient(to left, rgba(255,153,51,0.06), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '25%', height: '100%', background: 'linear-gradient(to right, rgba(19,136,8,0.05), transparent)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }} className="md:flex-row md:items-center md:justify-between">
          <div>
            {/* Greeting */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '4px', height: '32px', borderRadius: '99px', background: 'linear-gradient(180deg, #FF9933, #138808)', flexShrink: 0 }} />
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.875rem',
                  fontWeight: 600,
                  color: '#1A202C',
                  margin: 0,
                }}
              >
                Jai Hind, <span style={{ color: '#FF9933' }}>{translatedGreeting}</span>
              </h1>
            </div>
            <p style={{ fontSize: '0.9375rem', color: '#718096', maxWidth: '560px', lineHeight: 1.65, fontWeight: 400, marginLeft: '14px' }}>
              {translatedSubtitle}
            </p>
          </div>

          {/* Decorative Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexShrink: 0 }}>
            
            {/* Decorative Icons Group */}
            <div className="hidden lg:flex animate-float" style={{ alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 12px rgba(0,0,0,0.06), -4px -4px 12px rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.9)', zIndex: 3 }}>
                <BookOpen className="w-5 h-5" style={{ color: '#FF9933' }} />
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(255,255,255,0.9)', marginLeft: '-16px', zIndex: 2 }}>
                <FileText className="w-5 h-5" style={{ color: '#138808' }} />
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(255,255,255,0.9)', marginLeft: '-16px', zIndex: 1 }}>
                <ShieldAlert className="w-5 h-5" style={{ color: '#1A202C' }} />
              </div>
            </div>

            {/* Date chip & Status */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#F5F7FA',
                  borderRadius: '14px',
                  padding: '12px 20px',
                  boxShadow: '4px 4px 12px rgba(0,0,0,0.06), -4px -4px 12px rgba(255,255,255,0.9)',
                  border: '1px solid rgba(255,255,255,0.85)',
                }}
              >
                <Calendar className="w-4 h-4" style={{ color: '#FF9933', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0AEC0' }}>Today</div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1A202C', marginTop: '1px' }}>{todayStr}</div>
                </div>
              </div>
              
              {/* "Secure Portal" Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', paddingRight: '4px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#138808', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#718096' }}>Encrypted Session</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ────────────────────────────────── */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '4px', height: '22px', borderRadius: '99px', background: '#138808' }} />
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.125rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>
              Quick Navigation
            </h2>
          </div>
          <Link
            to="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FF9933',
              textDecoration: 'none',
              transition: 'gap 0.2s',
            }}
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {cards.map((card, idx) => (
            <DashboardCard key={idx} {...card} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
