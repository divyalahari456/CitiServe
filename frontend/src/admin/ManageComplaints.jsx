import { useState, useEffect } from 'react';
import { Activity, Clock, ShieldAlert, CheckCircle2, AlertCircle, FileText, Calendar, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['Submitted', 'Under Review', 'Assigned', 'Resolved', 'Closed', 'Rejected'];

const neuCard = {
  background: '#FFFFFF',
  borderRadius: '24px',
  boxShadow: '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.9)',
};

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const userStr = localStorage.getItem('citiserve_user');
      const token = userStr ? JSON.parse(userStr).token : null;
      const res = await axios.get('http://localhost:5000/api/admin/complaints', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setComplaints(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load system complaints.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const userStr = localStorage.getItem('citiserve_user');
      const token = userStr ? JSON.parse(userStr).token : null;
      const res = await axios.put(
        `http://localhost:5000/api/admin/complaints/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(`Complaint status updated to ${newStatus}`);
        setComplaints(complaints.map(c => c._id === id ? res.data.data : c));
      }
    } catch (err) {
      toast.error('Failed to update complaint status.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" style={{ color: '#667EEA' }} />
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '4px', height: '24px', borderRadius: '99px', background: '#E53E3E' }} />
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>System Complaints</h2>
        </div>
        <div style={{ background: 'rgba(229,62,62,0.1)', color: '#E53E3E', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          Total: {complaints.length}
        </div>
      </div>

      {complaints.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', background: '#F5F7FA', borderRadius: '20px', border: '2px dashed rgba(0,0,0,0.05)' }}>
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" style={{ color: '#138808' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1A202C' }}>All Caught Up</h3>
          <p style={{ color: '#718096', fontSize: '0.875rem' }}>There are no active complaints in the system right now.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {complaints.map(complaint => (
            <div key={complaint._id} style={{ ...neuCard, padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="md:flex-row md:items-start md:justify-between">
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', fontWeight: 600, color: '#4A5568', background: '#F5F7FA', padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.05)' }}>
                      {complaint.complaintId}
                    </span>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: complaint.priority === 'High' || complaint.priority === 'Urgent' ? '#E53E3E' : '#D69E2E', textTransform: 'uppercase' }}>
                      {complaint.priority} Priority
                    </span>
                  </div>
                  
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.125rem', fontWeight: 600, color: '#1A202C', marginBottom: '8px' }}>{complaint.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.6, marginBottom: '16px' }}>{complaint.description}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#718096', fontWeight: 500 }}>
                      <FileText className="w-3.5 h-3.5" /> {complaint.category}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#718096', fontWeight: 500 }}>
                      <Calendar className="w-3.5 h-3.5" /> {new Date(complaint.createdAt).toLocaleDateString()}
                    </div>
                    {complaint.user && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#718096', fontWeight: 500 }}>
                        <ShieldAlert className="w-3.5 h-3.5 text-blue-500" /> By: {complaint.user.name}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', minWidth: '200px' }} className="md:align-items-end">
                  <div style={{ width: '100%' }}>
                    <label style={{ display: 'block', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#A0AEC0', marginBottom: '4px' }}>Update Status</label>
                    <select 
                      value={complaint.status} 
                      onChange={(e) => updateStatus(complaint._id, e.target.value)}
                      disabled={updatingId === complaint._id}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#F5F7FA',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: '10px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#1A202C',
                        outline: 'none',
                        cursor: updatingId === complaint._id ? 'not-allowed' : 'pointer',
                        opacity: updatingId === complaint._id ? 0.7 : 1
                      }}
                    >
                      {STATUS_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  
                  {updatingId === complaint._id && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#667EEA' }}>
                      <Loader2 className="w-3 h-3 animate-spin" /> Saving...
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageComplaints;
