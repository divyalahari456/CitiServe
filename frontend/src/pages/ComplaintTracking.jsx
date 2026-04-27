import { useState } from 'react';
import { Search, Activity, CheckCircle2, Circle, Clock, FileText, AlertCircle, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const STATUS_ORDER = ['Submitted', 'Under Review', 'Assigned', 'Resolved', 'Closed'];

const neuCard = {
  background: '#FFFFFF',
  borderRadius: '24px',
  boxShadow: '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.9)',
};

const ComplaintTracking = () => {
  const [searchId, setSearchId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    
    setLoading(true);
    setError('');
    setComplaint(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/complaints/${searchId.trim()}`);
      if (response.data.success) {
        setComplaint(response.data.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('No complaint found with this ID. Please check and try again.');
      } else {
        setError('Server error. Ensure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStepIndex = (timeline) => {
    if (!timeline || timeline.length === 0) return 0;
    const latestStatus = timeline[timeline.length - 1].status;
    return STATUS_ORDER.indexOf(latestStatus);
  };

  const getTimelineEvent = (timeline, statusName) => {
    return timeline?.find(event => event.status === statusName);
  };

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '32px', maxWidth: '880px', margin: '0 auto' }} className="animate-fade-up">

      {/* ── Page Header ─────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '36px' }}>
        <div style={{ width: '4px', height: '36px', borderRadius: '99px', background: '#FF9933', flexShrink: 0 }} />
        <div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.625rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>Track Progress</h1>
          <p style={{ fontSize: '0.8125rem', color: '#A0AEC0', fontWeight: 400, marginTop: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Real-time oversight of your civic reports</p>
        </div>
      </div>

      {/* ── Search Box ──────────────────────────────────── */}
      <div style={{ ...neuCard, overflow: 'hidden', marginBottom: '40px' }}>
        <form onSubmit={handleSearch} style={{ padding: '40px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0AEC0', marginBottom: '12px', marginLeft: '4px' }}>Official Complaint Identifier</label>
          <div style={{ display: 'flex', gap: '16px' }} className="flex-col sm:flex-row">
            
            <div style={{ position: 'relative', flex: 1 }}>
              <Search className="w-5 h-5" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#CBD5E0' }} />
              <input 
                type="text" 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g., CITI-2026-X7Y8Z"
                style={{
                  width: '100%',
                  padding: '18px 24px 18px 56px',
                  background: '#F5F7FA',
                  border: '1.5px solid rgba(255,255,255,0.85)',
                  borderRadius: '16px',
                  boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)',
                  fontSize: '1.125rem',
                  fontFamily: "'JetBrains Mono', monospace, sans-serif",
                  fontWeight: 600,
                  color: '#1A202C',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(255,153,51,0.4)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85), 0 0 0 3px rgba(255,153,51,0.1)' }} 
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.85)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-dark"
              style={{ padding: '18px 36px', fontSize: '0.875rem', borderRadius: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5" />}
              <span style={{ marginLeft: '8px' }}>Track Status</span>
            </button>
          </div>

          {error && (
            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(229,62,62,0.05)', border: '1px solid rgba(229,62,62,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px', color: '#E53E3E', fontSize: '0.875rem', fontWeight: 600 }} className="animate-fade-up">
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}
        </form>
      </div>

      {/* ── Tracking Result ───────────────────────────────── */}
      {complaint && (
        <div style={{ ...neuCard, overflow: 'hidden' }} className="animate-fade-up">
          {/* Header Info */}
          <div style={{ padding: '40px', background: 'rgba(0,0,0,0.015)', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '24px' }} className="md:flex-row md:justify-between md:items-start">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0AEC0' }}>Tracking ID</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.875rem', fontWeight: 700, color: '#FF9933', background: 'rgba(255,153,51,0.08)', padding: '4px 12px', borderRadius: '8px', border: '1px solid rgba(255,153,51,0.15)' }}>{complaint.complaintId}</span>
              </div>
              
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.75rem', fontWeight: 600, color: '#1A202C', marginBottom: '16px', lineHeight: 1.2 }}>{complaint.title}</h2>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '6px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600, color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <FileText className="w-4 h-4" style={{ color: '#138808' }} /> {complaint.category}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 600, color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <Calendar className="w-4 h-4" style={{ color: '#CBD5E0' }} /> {new Date(complaint.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div style={{
              background: complaint.status === 'Resolved' || complaint.status === 'Closed' ? '#138808' : complaint.status === 'Rejected' ? '#E53E3E' : '#FFFFFF',
              color: complaint.status === 'Resolved' || complaint.status === 'Closed' || complaint.status === 'Rejected' ? '#FFFFFF' : '#FF9933',
              border: `1px solid ${complaint.status === 'Resolved' || complaint.status === 'Closed' ? '#138808' : complaint.status === 'Rejected' ? '#E53E3E' : 'rgba(255,153,51,0.3)'}`,
              boxShadow: complaint.status === 'Resolved' || complaint.status === 'Closed' ? '0 4px 12px rgba(19,136,8,0.2)' : complaint.status === 'Rejected' ? '0 4px 12px rgba(229,62,62,0.2)' : '0 2px 8px rgba(0,0,0,0.03)',
              padding: '10px 24px',
              borderRadius: '14px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {complaint.status}
            </div>
          </div>

          {/* Timeline Section */}
          <div style={{ padding: '40px' }} className="md:p-[56px]">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
              <div style={{ width: '32px', height: '4px', borderRadius: '99px', background: '#138808' }} />
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A202C', margin: 0 }}>Resolution Timeline</h3>
            </div>
            
            <div style={{ position: 'relative' }}>
              {/* Vertical line connecting steps */}
              <div style={{ position: 'absolute', left: '23px', top: '24px', bottom: '24px', width: '2px', background: '#EDF2F7', zIndex: 0 }} className="md:left-[31px]" />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', position: 'relative', zIndex: 10 }}>
                {STATUS_ORDER.map((statusName, index) => {
                  const event = getTimelineEvent(complaint.timeline, statusName);
                  const isCompleted = !!event;
                  const isCurrent = getCurrentStepIndex(complaint.timeline) === index;
                  const isPending = !isCompleted;
                  
                  return (
                    <div key={statusName} style={{ display: 'flex', gap: '24px', opacity: isPending ? 0.4 : 1, transition: 'opacity 0.5s ease' }} className="md:gap-32px">
                      {/* Step Indicator */}
                      <div style={{ flexShrink: 0, marginTop: '4px' }}>
                        {isCompleted ? (
                          <div style={{
                            width: '48px', height: '48px', borderRadius: '16px',
                            background: isCurrent ? '#FF9933' : '#138808',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '4px solid #FFFFFF',
                            boxShadow: isCurrent ? '0 4px 16px rgba(255,153,51,0.3)' : '0 4px 12px rgba(19,136,8,0.15)',
                            transform: isCurrent ? 'scale(1.1)' : 'none',
                            transition: 'all 0.4s ease'
                          }} className="md:w-[64px] md:h-[64px] md:rounded-[20px]">
                            {isCurrent ? <Activity className="w-5 h-5 text-white animate-pulse" /> : <CheckCircle2 className="w-6 h-6 text-white" />}
                          </div>
                        ) : (
                          <div style={{
                            width: '48px', height: '48px', borderRadius: '16px',
                            background: '#FFFFFF', border: '2px solid #E2E8F0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }} className="md:w-[64px] md:h-[64px] md:rounded-[20px]">
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#CBD5E0' }} />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div style={{ flex: 1, paddingTop: '8px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }} className="md:flex-row md:items-center md:justify-between">
                          <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.125rem', fontWeight: 600, margin: 0, color: isCurrent ? '#FF9933' : isCompleted ? '#1A202C' : '#A0AEC0' }}>
                            {statusName}
                          </h4>
                          
                          {isCompleted && event.timestamp && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A0AEC0' }}>
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(event.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </div>
                          )}
                        </div>
                        
                        {isCompleted && event.remarks && (
                          <div style={{ background: '#F5F7FA', padding: '20px 24px', borderRadius: '16px', fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.6, border: '1px solid rgba(0,0,0,0.03)' }}>
                            {event.remarks}
                          </div>
                        )}
                        
                        {isPending && index === getCurrentStepIndex(complaint.timeline) + 1 && complaint.status !== 'Rejected' && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#CBD5E0', marginTop: '4px' }}>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Pending review
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintTracking;
