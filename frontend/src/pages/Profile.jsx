import { useAuth } from '../context/AuthContext';
import { User, Mail, ShieldCheck, LogOut, Settings, Bell, Lock, UserCircle, MapPin, ChevronRight, Zap } from 'lucide-react';

const neuCard = {
  background: '#FFFFFF',
  borderRadius: '24px',
  boxShadow: '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.9)',
};

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '32px' }} className="animate-fade-up">

      {/* ── Page Header ─────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '36px' }}>
        <div style={{ width: '4px', height: '36px', borderRadius: '99px', background: '#1A202C', flexShrink: 0 }} />
        <div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.625rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>Citizen Profile</h1>
          <p style={{ fontSize: '0.8125rem', color: '#A0AEC0', fontWeight: 400, marginTop: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Manage your identity and preferences</p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '40px' }} className="lg:grid-cols-12">
        
        {/* ── Left Column: User Identity Card ─────────────── */}
        <div className="lg:col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ ...neuCard, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            
            {/* Neumorphic Avatar */}
            <div style={{
              width: '128px', height: '128px', borderRadius: '32px',
              background: 'linear-gradient(135deg, rgba(255,153,51,0.1), rgba(19,136,8,0.1))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '24px',
              boxShadow: 'inset 3px 3px 8px rgba(0,0,0,0.04), inset -3px -3px 8px rgba(255,255,255,0.8), 0 4px 20px rgba(0,0,0,0.05)',
              border: '2px solid rgba(255,255,255,0.8)',
              transform: 'rotate(4deg)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'rotate(4deg)'}
            >
              <UserCircle className="w-16 h-16 text-slate-400" style={{ color: '#CBD5E0' }} />
            </div>
            
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.5rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>{user.name}</h2>
            <div style={{
              background: user.role === 'admin' ? 'rgba(19,136,8,0.08)' : 'rgba(255,153,51,0.08)',
              color: user.role === 'admin' ? '#138808' : '#FF9933',
              fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '6px 16px', borderRadius: '12px', marginTop: '12px',
              border: `1px solid ${user.role === 'admin' ? 'rgba(19,136,8,0.15)' : 'rgba(255,153,51,0.15)'}`
            }}>
              {user.role}
            </div>
            
            <div style={{ width: '100%', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F5F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.02)' }}>
                  <Mail className="w-4 h-4" style={{ color: '#A0AEC0' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0AEC0', marginBottom: '2px' }}>Email Address</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4A5568' }}>{user.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(19,136,8,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(19,136,8,0.1)' }}>
                  <ShieldCheck className="w-4 h-4" style={{ color: '#138808' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0AEC0', marginBottom: '2px' }}>Account Status</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#138808' }}>Verified Citizen</div>
                </div>
              </div>
            </div>

            <button 
              onClick={logout}
              style={{
                width: '100%', marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: '#FFFFFF', color: '#E53E3E', border: '1px solid rgba(229,62,62,0.2)', borderRadius: '14px',
                padding: '16px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 2px 8px rgba(229,62,62,0.05)'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(229,62,62,0.05)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.transform = 'none'; }}
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* ── Right Column: Settings & Activities ─────────── */}
        <div className="lg:col-span-8" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div style={{ ...neuCard, overflow: 'hidden' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.01)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,153,51,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Settings className="w-4 h-4" style={{ color: '#FF9933' }} />
                </div>
                <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1A202C', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Portal Settings</h3>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#FF9933', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>Edit All</button>
            </div>
            
            <div style={{ padding: '32px', display: 'grid', gap: '24px' }} className="md:grid-cols-2">
              
              {/* Setting Tiles */}
              {[
                { icon: Bell, title: 'Notifications', desc: 'Updates on laws & schemes', color: '#FF9933', active: true },
                { icon: Lock, title: 'Security', desc: 'Password & 2FA controls', color: '#4A5568' },
                { icon: MapPin, title: 'Location', desc: 'Filter content by state', color: '#138808' },
                { icon: UserCircle, title: 'Verification', desc: 'Official ID integration', color: '#1A202C' }
              ].map((setting, idx) => (
                <div key={idx} style={{
                  padding: '24px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.04)',
                  background: '#F5F7FA', cursor: 'pointer', transition: 'all 0.25s ease',
                  boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.01), inset -2px -2px 4px rgba(255,255,255,0.8)'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F5F7FA'; e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0,0,0,0.01), inset -2px -2px 4px rgba(255,255,255,0.8)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <setting.icon className="w-5 h-5" style={{ color: setting.color }} />
                    {setting.active ? (
                      <div style={{ width: '32px', height: '16px', background: '#138808', borderRadius: '99px', position: 'relative' }}>
                        <div style={{ position: 'absolute', right: '4px', top: '4px', width: '8px', height: '8px', background: '#FFFFFF', borderRadius: '50%' }} />
                      </div>
                    ) : (
                      <ChevronRight className="w-4 h-4" style={{ color: '#CBD5E0' }} />
                    )}
                  </div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1A202C', marginBottom: '4px' }}>{setting.title}</h4>
                  <p style={{ fontSize: '0.8125rem', color: '#A0AEC0' }}>{setting.desc}</p>
                </div>
              ))}

            </div>
          </div>

          {/* Premium Upgrade Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #1A202C 0%, #0d1117 100%)',
            borderRadius: '24px', padding: '40px', color: '#FFFFFF',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
          }}>
            {/* Glow effects */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '280px', height: '280px', background: 'rgba(255,153,51,0.15)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />
            
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Zap className="w-5 h-5" style={{ color: '#FF9933' }} />
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.375rem', fontWeight: 600, margin: 0 }}>Citi-Serve Gold</h3>
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', maxWidth: '360px', lineHeight: 1.6 }}>Premium access to legal consultancy and expedited scheme application processing.</p>
              <button style={{
                background: '#FFFFFF', color: '#1A202C', border: 'none', borderRadius: '12px',
                padding: '14px 28px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FF9933'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = '#1A202C'; e.currentTarget.style.transform = 'none'; }}
              >
                Upgrade Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
