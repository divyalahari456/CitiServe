import { useState, useEffect } from 'react';
import { Activity, Clock, AlertCircle, FileText, Calendar, Loader2 } from 'lucide-react';
import axios from 'axios';

const STATUS_ORDER = ['Submitted', 'Under Review', 'Assigned', 'Resolved', 'Closed', 'Rejected'];

const neuCard = {
  background: '#FFFFFF',
  borderRadius: '24px',
  boxShadow: '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.9)',
};

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const userStr = localStorage.getItem('citiserve_user');
        const token = userStr ? JSON.parse(userStr).token : null;
        if (!token) {
          setError('Please log in to view your complaints.');
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:5000/api/complaints/my-complaints', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          setComplaints(res.data.data);
        }
      } catch (err) {
        setError('Failed to fetch complaints. Ensure you are logged in and backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" style={{ color: '#FF9933' }} />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '32px' }} className="animate-fade-up">

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '36px' }}>
        <div style={{ width: '4px', height: '36px', borderRadius: '99px', background: '#FF9933', flexShrink: 0 }} />
        <div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.625rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>My Complaints</h1>
          <p style={{ fontSize: '0.8125rem', color: '#A0AEC0', fontWeight: 400, marginTop: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Track your reported civic issues</p>
        </div>
      </div>

      {error && (
        <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(229,62,62,0.05)', border: '1px solid rgba(229,62,62,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px', color: '#E53E3E', fontSize: '0.875rem', fontWeight: 600 }}>
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      {!error && complaints.length === 0 ? (
        <div style={{ ...neuCard, padding: '48px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,153,51,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <FileText className="w-8 h-8" style={{ color: '#FF9933' }} />
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', fontWeight: 600, color: '#1A202C', marginBottom: '12px' }}>No Complaints Found</h2>
          <p style={{ fontSize: '0.875rem', color: '#718096' }}>You haven't reported any issues yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '24px' }}>
          {complaints.map(complaint => (
            <div key={complaint._id} style={{ ...neuCard, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }} className="md:flex-row md:items-center md:justify-between">
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0AEC0' }}>ID: {complaint.complaintId}</span>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#CBD5E0' }} />
                  <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: complaint.priority === 'High' || complaint.priority === 'Urgent' ? '#E53E3E' : '#D69E2E', textTransform: 'uppercase' }}>
                    {complaint.priority} Priority
                  </span>
                </div>
                
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.125rem', fontWeight: 600, color: '#1A202C', marginBottom: '8px' }}>{complaint.title}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#718096', fontWeight: 500 }}>
                    <FileText className="w-3.5 h-3.5" /> {complaint.category}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#718096', fontWeight: 500 }}>
                    <Calendar className="w-3.5 h-3.5" /> {new Date(complaint.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }} className="md:align-items-end">
                <div style={{
                  background: complaint.status === 'Resolved' || complaint.status === 'Closed' ? '#138808' : complaint.status === 'Rejected' ? '#E53E3E' : '#FFFFFF',
                  color: complaint.status === 'Resolved' || complaint.status === 'Closed' || complaint.status === 'Rejected' ? '#FFFFFF' : '#FF9933',
                  border: `1px solid ${complaint.status === 'Resolved' || complaint.status === 'Closed' ? '#138808' : complaint.status === 'Rejected' ? '#E53E3E' : 'rgba(255,153,51,0.3)'}`,
                  padding: '6px 16px',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {complaint.status}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#A0AEC0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock className="w-3 h-3" /> Last updated: {new Date(complaint.updatedAt).toLocaleDateString()}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MyComplaints;
