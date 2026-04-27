import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, AlertTriangle, FileText, User, Activity, ShieldAlert, Settings } from 'lucide-react';

const Sidebar = ({ role = 'citizen' }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const citizenLinks = [
    { name: 'Dashboard',       path: '/',                    icon: <Home className="w-[18px] h-[18px]" /> },
    { name: 'Rights & Laws',   path: '/laws',                icon: <BookOpen className="w-[18px] h-[18px]" /> },
    { name: 'Govt Schemes',    path: '/schemes',             icon: <FileText className="w-[18px] h-[18px]" /> },
    { name: 'File Complaint',  path: '/complaint-form',      icon: <AlertTriangle className="w-[18px] h-[18px]" /> },
    { name: 'Track Status',    path: '/complaint-tracking',  icon: <Activity className="w-[18px] h-[18px]" /> },
    { name: 'Profile',         path: '/profile',             icon: <User className="w-[18px] h-[18px]" /> },
  ];

  const adminLinks = [
    { name: 'Admin Panel',        path: '/admin',            icon: <ShieldAlert className="w-[18px] h-[18px]" /> },
    { name: 'Manage Users',       path: '/admin/users',      icon: <User className="w-[18px] h-[18px]" /> },
    { name: 'Manage Complaints',  path: '/admin/complaints', icon: <Activity className="w-[18px] h-[18px]" /> },
    { name: 'Manage Laws',        path: '/admin/laws',       icon: <BookOpen className="w-[18px] h-[18px]" /> },
    { name: 'Settings',           path: '/admin/settings',   icon: <Settings className="w-[18px] h-[18px]" /> },
  ];

  const links = role === 'admin' ? adminLinks : citizenLinks;

  return (
    <aside
      style={{
        width: '240px',
        background: '#FFFFFF',
        borderRight: '1px solid rgba(0,0,0,0.05)',
        flexShrink: 0,
        display: 'none',
        flexDirection: 'column',
        height: 'calc(100vh - 68px)',
        position: 'sticky',
        top: '68px',
        zIndex: 10,
        boxShadow: '2px 0 16px rgba(0,0,0,0.03)',
      }}
      className="md:flex"
    >
      {/* Nav Section */}
      <div style={{ padding: '24px 16px', flexGrow: 1, overflowY: 'auto' }} className="no-scrollbar">
        {/* Section Label */}
        <div
          style={{
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#A0AEC0',
            padding: '0 12px',
            marginBottom: '12px',
          }}
        >
          {role === 'admin' ? 'Administration' : 'Main Menu'}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {links.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path !== '/' && currentPath.startsWith(link.path));

            return (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#FF9933' : '#4A5568',
                  background: isActive
                    ? 'rgba(255,153,51,0.07)'
                    : 'transparent',
                  boxShadow: isActive
                    ? 'inset 0 0 0 1px rgba(255,153,51,0.12)'
                    : 'none',
                  borderLeft: isActive
                    ? '3px solid #FF9933'
                    : '3px solid transparent',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
                    e.currentTarget.style.color = '#1A202C';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#4A5568';
                  }
                }}
              >
                {/* Icon */}
                <span style={{ color: isActive ? '#FF9933' : '#A0AEC0', flexShrink: 0, transition: 'color 0.2s' }}>
                  {link.icon}
                </span>
                <span>{link.name}</span>

                {/* Active dot */}
                {isActive && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#FF9933',
                      boxShadow: '0 0 6px rgba(255,153,51,0.5)',
                      flexShrink: 0,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Status */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div
          style={{
            background: '#F5F7FA',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '3px 3px 8px rgba(0,0,0,0.05), -3px -3px 8px rgba(255,255,255,0.9)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#138808',
              boxShadow: '0 0 8px rgba(19,136,8,0.5)',
              flexShrink: 0,
              animation: 'pulse 2s infinite',
            }}
          />
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#1A202C' }}>Live & Secure</div>
            <div style={{ fontSize: '0.625rem', color: '#A0AEC0', marginTop: '1px' }}>All systems operational</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
