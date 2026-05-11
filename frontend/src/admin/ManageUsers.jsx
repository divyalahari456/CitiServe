import { useState, useEffect } from 'react';
import { Users, User, Clock, Loader2, Mail, Activity, ShieldAlert } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const neuCard = {
  background: '#FFFFFF',
  borderRadius: '24px',
  boxShadow: '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.9)',
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userStr = localStorage.getItem('citiserve_user');
        const token = userStr ? JSON.parse(userStr).token : null;
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          setUsers(res.data.data);
        }
      } catch (err) {
        toast.error('Failed to load system users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" style={{ color: '#4299E1' }} />
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '4px', height: '24px', borderRadius: '99px', background: '#4299E1' }} />
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>Registered Citizens</h2>
        </div>
        <div style={{ background: 'rgba(66,153,225,0.1)', color: '#4299E1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          Total: {users.length}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {users.map(u => (
          <div key={u._id} style={{ ...neuCard, padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '14px', 
                background: u.role === 'admin' ? 'rgba(19,136,8,0.1)' : 'rgba(66,153,225,0.1)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                {u.role === 'admin' ? <ShieldAlert className="w-5 h-5 text-green-600" style={{ color: '#138808' }} /> : <User className="w-5 h-5 text-blue-500" style={{ color: '#4299E1' }} />}
              </div>
              <div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.125rem', fontWeight: 600, color: '#1A202C', marginBottom: '4px' }}>{u.name}</h3>
                <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: u.role === 'admin' ? '#138808' : '#A0AEC0' }}>
                  {u.role}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8125rem', color: '#4A5568' }}>
                <Mail className="w-4 h-4 text-slate-400" /> {u.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8125rem', color: '#4A5568' }}>
                <Clock className="w-4 h-4 text-slate-400" /> Joined {new Date(u.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interaction Stats</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(237,137,54,0.1)', color: '#D69E2E', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600 }}>
                <Activity className="w-3.5 h-3.5" /> {u.complaintCount || 0} Complaints
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
