import { useState, useEffect } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { ShieldAlert, Users, Activity, BookOpen, Settings, LayoutDashboard, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';

const neuCard = {
  background: '#FFFFFF',
  borderRadius: '24px',
  boxShadow: '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.9)',
};

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Complaints', path: '/admin/complaints', icon: Activity },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Laws', path: '/admin/laws', icon: BookOpen },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

const AdminPanel = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: 0, complaints: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userStr = localStorage.getItem('citiserve_user');
        const token = userStr ? JSON.parse(userStr).token : null;
        const usersRes = await axios.get('http://localhost:5000/api/admin/users', { headers: { Authorization: `Bearer ${token}` }});
        const compRes = await axios.get('http://localhost:5000/api/admin/complaints', { headers: { Authorization: `Bearer ${token}` }});
        
        const complaints = compRes.data.data || [];
        setStats({
          users: usersRes.data.data?.length || 0,
          complaints: complaints.length,
          resolved: complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length
        });
      } catch (err) {
        console.error('Error fetching admin stats:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') fetchStats();
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...neuCard, padding: '48px', textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(229,62,62,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <ShieldAlert className="w-8 h-8 text-red-500" style={{ color: '#E53E3E' }} />
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.5rem', fontWeight: 600, color: '#1A202C', marginBottom: '12px' }}>Access Restricted</h2>
          <p style={{ fontSize: '0.875rem', color: '#718096', marginBottom: '24px' }}>You require administrative privileges to access this secure governmental area.</p>
          <Link to="/" className="btn-dark" style={{ textDecoration: 'none' }}>Return to Citizen Portal</Link>
        </div>
      </div>
    );
  }

  const isRoot = location.pathname === '/admin';

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '32px' }} className="animate-fade-up">

      {/* ── Page Header ─────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '4px', height: '36px', borderRadius: '99px', background: '#1A202C', flexShrink: 0 }} />
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.625rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>Command Center</h1>
            <p style={{ fontSize: '0.8125rem', color: '#A0AEC0', fontWeight: 400, marginTop: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Government Administration Portal</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(19,136,8,0.08)', padding: '10px 16px', borderRadius: '14px', border: '1px solid rgba(19,136,8,0.15)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#138808', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#138808' }}>Live System</span>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '32px' }} className="lg:grid-cols-12">
        
        {/* ── Sidebar Nav ───────────────────────────────── */}
        <div className="lg:col-span-3">
          <div style={{ ...neuCard, padding: '16px', position: 'sticky', top: '88px' }}>
            <div style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A0AEC0', padding: '12px 16px 8px' }}>Modules</div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map((item) => {
                const isActive = item.path === '/admin' ? isRoot : location.pathname.startsWith(item.path);
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                      borderRadius: '14px', textDecoration: 'none', fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#1A202C' : '#718096',
                      background: isActive ? '#F5F7FA' : 'transparent',
                      border: '1.5px solid',
                      borderColor: isActive ? 'rgba(0,0,0,0.05)' : 'transparent',
                      boxShadow: isActive ? 'inset 2px 2px 5px rgba(0,0,0,0.03), inset -2px -2px 5px rgba(255,255,255,0.8)' : 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      if (!isActive) { e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) { e.currentTarget.style.background = 'transparent'; }
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: isActive ? '#1A202C' : '#A0AEC0' }} />
                    {item.name}
                    {isActive && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#1A202C' }} />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ── Main Content Area ─────────────────────────── */}
        <div className="lg:col-span-9">
          {isRoot ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Quick Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                {[
                  { label: 'Total Citizens', value: loading ? '-' : stats.users, icon: Users, color: '#4299E1', bg: 'rgba(66,153,225,0.1)' },
                  { label: 'Active Complaints', value: loading ? '-' : stats.complaints, icon: Activity, color: '#E53E3E', bg: 'rgba(229,62,62,0.1)' },
                  { label: 'Resolved Issues', value: loading ? '-' : stats.resolved, icon: ShieldAlert, color: '#138808', bg: 'rgba(19,136,8,0.1)' }
                ].map((stat, i) => (
                  <div key={i} style={{ ...neuCard, padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '2rem', fontWeight: 700, color: '#1A202C', lineHeight: 1 }}>{stat.value}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#A0AEC0', marginTop: '8px' }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* System Alert Area */}
              <div style={{ ...neuCard, padding: '32px', borderLeft: '4px solid #FF9933' }}>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.125rem', fontWeight: 600, color: '#1A202C', marginBottom: '8px' }}>System Notice</h3>
                <p style={{ fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.6 }}>Ensure all priority complaints logged in the last 24 hours are reviewed. Please update law database regularly per official gazette releases.</p>
                <div style={{ marginTop: '20px' }}>
                  <button style={{ background: '#F5F7FA', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '10px', padding: '8px 16px', fontSize: '0.75rem', fontWeight: 600, color: '#1A202C', cursor: 'pointer' }}>View Audit Logs</button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ ...neuCard, padding: '40px', minHeight: '500px' }}>
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
