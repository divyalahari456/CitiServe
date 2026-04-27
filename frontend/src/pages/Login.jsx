import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, User, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

/* ── Ashoka Chakra SVG (24-spoked wheel) ────────────────── */
const AshokaChakra = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer ring */}
    <circle cx="50" cy="50" r="46" stroke="#000080" strokeWidth="3.5" fill="none" />
    {/* Inner ring */}
    <circle cx="50" cy="50" r="5" fill="#000080" />
    <circle cx="50" cy="50" r="9" stroke="#000080" strokeWidth="2" fill="none" />
    {/* 24 spokes */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 15 * Math.PI) / 180;
      const x1 = 50 + 9 * Math.cos(angle);
      const y1 = 50 + 9 * Math.sin(angle);
      const x2 = 50 + 46 * Math.cos(angle);
      const y2 = 50 + 46 * Math.sin(angle);
      return (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#000080"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('citizen');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  useEffect(() => {
    setIsLogin(location.pathname !== '/signup');
  }, [location.pathname]);

  const toggleMode = (mode) => {
    setIsLogin(mode === 'login');
    navigate(mode === 'login' ? '/login' : '/signup', { replace: true });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = isLogin
      ? await login(formData.email, formData.password)
      : await register(formData.name, formData.email, formData.password, role);
    setLoading(false);
    if (result.success) setTimeout(() => navigate('/'), 500);
  };

  /* ── Styles ─────────────────────────────────────────── */
  const inputStyle = {
    width: '100%',
    padding: '14px 18px 14px 48px',
    background: '#F5F7FA',
    border: '1.5px solid rgba(255,255,255,0.85)',
    borderRadius: '12px',
    boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)',
    fontSize: '0.9375rem',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    color: '#1A202C',
    outline: 'none',
    transition: 'all 0.25s ease',
    appearance: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#A0AEC0',
    marginBottom: '8px',
    marginLeft: '2px',
  };

  const iconWrapStyle = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: '#CBD5E0',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#FFFFFF', fontFamily: "'Inter', sans-serif" }}>

      {/* ═══════════════════════════════════════════════════
          LEFT PANEL: India Gradient + Ashoka Chakra
          ═══════════════════════════════════════════════════ */}
      <div
        style={{
          width: '50%',
          position: 'relative',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        className="hidden lg:flex"
      >
        {/* India vertical gradient background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #FF9933 0%, rgba(255,153,51,0.70) 22%, rgba(255,255,255,0.95) 44%, rgba(255,255,255,0.95) 56%, rgba(19,136,8,0.65) 78%, #138808 100%)',
          }}
        />

        {/* Soft blur overlay for depth */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(1px)',
          }}
        />

        {/* Ashoka Chakra watermark — dead center */}
        <AshokaChakra
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '280px',
            height: '280px',
            opacity: 0.07,
            animation: 'chakra-spin 90s linear infinite',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Extra glow rings */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

        {/* Brand logo — top left */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 10,
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '10px',
              padding: '7px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            <Shield className="w-5 h-5" style={{ color: '#FF9933' }} />
          </div>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#FFFFFF',
              textShadow: '0 1px 8px rgba(0,0,0,0.15)',
            }}
          >
            Citi<span style={{ color: 'rgba(255,255,255,0.85)' }}>Serve</span>
          </span>
        </div>

        {/* India Map Illustration - Dead Center */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 5, width: '100%', maxWidth: '420px', display: 'flex', justifyContent: 'center' }} className="animate-fade-in">
          <img 
            src="/india_map_watercolor.png" 
            alt="India Watercolor Map" 
            style={{ 
              width: '100%', 
              objectFit: 'contain',
              mixBlendMode: 'multiply'
            }} 
          />
        </div>

        {/* Main content card - Bottom aligned */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '100%',
            maxWidth: '460px',
            padding: '0 40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className="animate-fade-in"
        >

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.875rem',
              fontWeight: 600,
              color: '#000080',
              textAlign: 'center',
              marginBottom: '12px',
              lineHeight: 1.2,
              textShadow: '0 2px 16px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,1)',
            }}
          >
            Empowering Every{' '}
            <span style={{ color: '#FF9933', textDecoration: 'underline', textDecorationColor: 'rgba(255,153,51,0.4)', textDecorationThickness: '2px' }}>
              Indian
            </span>{' '}
            Citizen
          </h1>

          <p
            style={{
              fontSize: '0.9375rem',
              color: 'rgba(255,255,255,0.85)',
              textAlign: 'center',
              lineHeight: 1.65,
              marginBottom: '32px',
              maxWidth: '320px',
            }}
          >
            Access your rights, explore government schemes, and raise your voice through a secure, transparent platform.
          </p>

          {/* Feature Chips */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%' }}>
            {[
              { icon: <CheckCircle2 className="w-4 h-4" />, title: 'Verified Laws', desc: 'From official gazettes' },
              { icon: <Shield className="w-4 h-4" />, title: 'Secure Portal', desc: 'End-to-end encrypted' },
            ].map((feat, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.20)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  borderRadius: '14px',
                  padding: '14px',
                }}
              >
                <div style={{ color: '#fff', marginBottom: '6px' }}>{feat.icon}</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff' }}>{feat.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.70)', marginTop: '2px' }}>{feat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          RIGHT PANEL: Login / Register Form
          ═══════════════════════════════════════════════════ */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          background: '#FFFFFF',
          overflowY: 'auto',
        }}
      >
        <div style={{ width: '100%', maxWidth: '420px' }} className="animate-fade-up">

          {/* Mobile Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', justifyContent: 'center' }} className="lg:hidden">
            <div style={{ background: 'linear-gradient(135deg, #FF9933, #e8841a)', borderRadius: '10px', padding: '7px', boxShadow: '0 3px 12px rgba(255,153,51,0.30)' }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', fontWeight: 600, color: '#1A202C' }}>
              Citi<span style={{ color: '#FF9933' }}>Serve</span>
            </span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.625rem', fontWeight: 600, color: '#1A202C', marginBottom: '6px' }}>
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#718096', fontWeight: 400 }}>
              {isLogin
                ? 'Sign in to access the Citi-Serve platform.'
                : 'Join the mission for a better, more informed India.'}
            </p>
          </div>

          {/* Tab Switcher — Neumorphic pill */}
          <div
            style={{
              background: '#F5F7FA',
              borderRadius: '14px',
              padding: '5px',
              display: 'flex',
              marginBottom: '28px',
              boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)',
            }}
          >
            {['login', 'signup'].map((mode) => {
              const active = (mode === 'login') === isLogin;
              return (
                <button
                  key={mode}
                  onClick={() => toggleMode(mode)}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    fontWeight: active ? 600 : 400,
                    color: active ? '#1A202C' : '#A0AEC0',
                    background: active
                      ? '#FFFFFF'
                      : 'transparent',
                    boxShadow: active
                      ? '3px 3px 8px rgba(0,0,0,0.08), -2px -2px 6px rgba(255,255,255,0.9)'
                      : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Role Selector (always visible) */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { val: 'citizen', label: 'Citizen', Icon: User, color: '#FF9933', bg: 'rgba(255,153,51,0.08)', border: 'rgba(255,153,51,0.35)' },
                { val: 'admin',   label: 'Admin',   Icon: Shield, color: '#138808', bg: 'rgba(19,136,8,0.07)', border: 'rgba(19,136,8,0.30)' },
              ].map(({ val, label, Icon, color, bg, border }) => {
                const sel = role === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRole(val)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '11px',
                      borderRadius: '12px',
                      border: `1.5px solid ${sel ? border : 'rgba(0,0,0,0.07)'}`,
                      background: sel ? bg : '#F5F7FA',
                      boxShadow: sel
                        ? `0 0 0 3px ${color}18`
                        : '3px 3px 8px rgba(0,0,0,0.05), -3px -3px 8px rgba(255,255,255,0.9)',
                      color: sel ? color : '#A0AEC0',
                      fontSize: '0.875rem',
                      fontWeight: sel ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.22s ease',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Name Field (signup only) */}
            {!isLogin && (
              <div>
                <label style={labelStyle}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <span style={iconWrapStyle}><User className="w-4 h-4" /></span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    style={inputStyle}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(255,153,51,0.45)';
                      e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85), 0 0 0 3px rgba(255,153,51,0.10)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.85)';
                      e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <span style={iconWrapStyle}><Mail className="w-4 h-4" /></span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(255,153,51,0.45)';
                    e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85), 0 0 0 3px rgba(255,153,51,0.10)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.85)';
                    e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
                {isLogin && (
                  <Link to="#" style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#FF9933', textDecoration: 'none' }}>
                    Forgot password?
                  </Link>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <span style={iconWrapStyle}><Lock className="w-4 h-4" /></span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(255,153,51,0.45)';
                    e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85), 0 0 0 3px rgba(255,153,51,0.10)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.85)';
                    e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)';
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-saffron"
              style={{ width: '100%', padding: '14px', fontSize: '0.9375rem', marginTop: '4px' }}
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                : <>{isLogin ? 'Sign In' : 'Get Started'} <ArrowRight className="w-4 h-4" /></>
              }
            </button>
          </form>

          {/* Toggle link */}
          <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.875rem', color: '#718096' }}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button
              onClick={() => toggleMode(isLogin ? 'signup' : 'login')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1A202C',
                cursor: 'pointer',
                padding: 0,
                fontFamily: "'Inter', sans-serif",
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FF9933'}
              onMouseLeave={e => e.currentTarget.style.color = '#1A202C'}
            >
              {isLogin ? 'Create one now' : 'Sign in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
