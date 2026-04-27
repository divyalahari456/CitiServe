import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, Globe, Loader2, ChevronDown, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const { language, setLanguage, translating, LANGUAGES } = useLanguage();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 20px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Saffron accent line at bottom of navbar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #FF9933 0%, #FF9933 33%, transparent 33%, transparent 66%, #138808 66%, #138808 100%)',
          opacity: 0.5,
        }}
      />

      <div className="w-full px-4 md:px-8 h-[68px] flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          style={{ textDecoration: 'none' }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #FF9933, #e8841a)',
              borderRadius: '10px',
              padding: '7px',
              boxShadow: '0 3px 12px rgba(255,153,51,0.30)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            className="group-hover:scale-105"
          >
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#1A202C',
              letterSpacing: '-0.02em',
            }}
          >
            Citi<span style={{ color: '#FF9933' }}>Serve</span>
          </span>
        </Link>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative group hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              {translating ? (
                <Loader2 className="h-3.5 w-3.5 text-saffron animate-spin" style={{ color: '#FF9933' }} />
              ) : (
                <Globe className="h-3.5 w-3.5 transition-colors" style={{ color: '#A0AEC0' }} />
              )}
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Select language"
              style={{
                appearance: 'none',
                background: '#F5F7FA',
                border: '1px solid rgba(255,255,255,0.8)',
                borderRadius: '10px',
                boxShadow: '3px 3px 8px rgba(0,0,0,0.06), -3px -3px 8px rgba(255,255,255,0.9)',
                paddingLeft: '28px',
                paddingRight: '28px',
                paddingTop: '7px',
                paddingBottom: '7px',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: '#4A5568',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.native}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <ChevronDown className="h-3.5 w-3.5" style={{ color: '#A0AEC0' }} />
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.08)' }} className="hidden sm:block" />

          {/* User Info / Sign In */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end">
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1A202C', lineHeight: 1 }}>
                  {user.name}
                </span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '2px 8px',
                    borderRadius: '99px',
                    marginTop: '4px',
                    background: user.role === 'admin' ? 'rgba(19,136,8,0.08)' : 'rgba(255,153,51,0.10)',
                    color: user.role === 'admin' ? '#138808' : '#FF9933',
                  }}
                >
                  {user.role}
                </span>
              </div>

              {/* Avatar circle */}
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: user.role === 'admin'
                    ? 'linear-gradient(135deg, rgba(19,136,8,0.15), rgba(19,136,8,0.05))'
                    : 'linear-gradient(135deg, rgba(255,153,51,0.15), rgba(255,153,51,0.05))',
                  border: `1.5px solid ${user.role === 'admin' ? 'rgba(19,136,8,0.2)' : 'rgba(255,153,51,0.25)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <User className="w-4 h-4" style={{ color: user.role === 'admin' ? '#138808' : '#FF9933' }} />
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                style={{
                  background: '#F5F7FA',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: '10px',
                  padding: '7px',
                  boxShadow: '3px 3px 8px rgba(0,0,0,0.06), -3px -3px 8px rgba(255,255,255,0.9)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#A0AEC0',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#FFF0F0';
                  e.currentTarget.style.color = '#E53E3E';
                  e.currentTarget.style.boxShadow = '0 3px 12px rgba(229,62,62,0.18)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#F5F7FA';
                  e.currentTarget.style.color = '#A0AEC0';
                  e.currentTarget.style.boxShadow = '3px 3px 8px rgba(0,0,0,0.06), -3px -3px 8px rgba(255,255,255,0.9)';
                }}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-saffron"
              style={{ padding: '8px 20px', fontSize: '0.8125rem' }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
