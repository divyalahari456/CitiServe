import { useState } from 'react';
import { AlertTriangle, UploadCloud, CheckCircle2, Shield, MapPin, AlertCircle, FileText, Loader2, ArrowRight } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

/* ── Common Styles ──────────────────────────────────────── */
const neuCard = {
  background: '#FFFFFF',
  borderRadius: '24px',
  boxShadow: '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.9)',
};

const neuInputBase = {
  width: '100%',
  padding: '16px 20px',
  background: '#F5F7FA',
  border: '1.5px solid rgba(255,255,255,0.85)',
  borderRadius: '14px',
  boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)',
  fontSize: '0.9375rem',
  fontFamily: "'Inter', sans-serif",
  color: '#1A202C',
  outline: 'none',
  transition: 'all 0.25s ease',
  appearance: 'none',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#A0AEC0',
  marginBottom: '10px',
  marginLeft: '4px',
};

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    category: '', title: '', description: '', state: '', city: '', priority: 'Medium'
  });
  const [proofFile, setProofFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => { if (e.target.files[0]) setProofFile(e.target.files[0]); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const submitData = new FormData();
    submitData.append('category', formData.category);
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('state', formData.state);
    submitData.append('city', formData.city);
    submitData.append('priority', formData.priority);
    if (proofFile) submitData.append('proofFile', proofFile);

    try {
      const response = await axios.post('http://localhost:5000/api/complaints', submitData, { headers: { 'Content-Type': 'multipart/form-data' }});
      if (response.data.success) {
        setSubmittedData(response.data.data);
        toast.success('Complaint submitted successfully!');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit complaint. Ensure backend is running.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success State ─────────────────────────────────────── */
  if (submittedData) {
    return (
      <div style={{ padding: '64px 24px', display: 'flex', justifyContent: 'center' }} className="animate-fade-up">
        <div style={{ ...neuCard, maxWidth: '560px', width: '100%', padding: '48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Top accent bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #138808, #38A169)' }} />
          
          <div style={{ width: '96px', height: '96px', borderRadius: '24px', background: 'rgba(19,136,8,0.08)', margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.04), inset -2px -2px 5px rgba(255,255,255,0.8)' }}>
            <CheckCircle2 className="w-12 h-12" style={{ color: '#138808' }} />
          </div>

          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.875rem', fontWeight: 600, color: '#1A202C', marginBottom: '12px' }}>Complaint Registered!</h2>
          <p style={{ fontSize: '0.9375rem', color: '#718096', marginBottom: '32px' }}>Your civic issue has been officially logged with the authorities.</p>

          <div style={{ background: '#F5F7FA', borderRadius: '20px', padding: '32px', marginBottom: '40px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.85)', boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.04), inset -3px -3px 7px rgba(255,255,255,0.85)' }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0AEC0', marginBottom: '12px' }}>Official Tracking ID</div>
            <div style={{ background: '#FFFFFF', padding: '16px 24px', borderRadius: '14px', fontSize: '1.5rem', fontFamily: "'JetBrains Mono', monospace, sans-serif", fontWeight: 700, color: '#1A202C', letterSpacing: '0.05em', textAlign: 'center', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
              {submittedData.complaintId}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A0AEC0', marginBottom: '4px' }}>Category</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4A5568' }}>{submittedData.category}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A0AEC0', marginBottom: '4px' }}>Priority</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: submittedData.priority === 'High' || submittedData.priority === 'Urgent' ? '#E53E3E' : '#D69E2E' }}>{submittedData.priority}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }} className="flex-col sm:flex-row">
            <button onClick={() => { setSubmittedData(null); setFormData({ category: '', title: '', description: '', state: '', city: '', priority: 'Medium' }); setProofFile(null); }} style={{ flex: 1, padding: '16px', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '14px', fontSize: '0.8125rem', fontWeight: 600, color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }} onMouseEnter={e => e.currentTarget.style.background = '#F5F7FA'} onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}>
              File Another
            </button>
            <button className="btn-dark" style={{ flex: 1, padding: '16px', borderRadius: '14px', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Track Status
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Form View ─────────────────────────────────────────── */
  return (
    <div style={{ paddingTop: '32px', paddingBottom: '32px', maxWidth: '880px', margin: '0 auto' }} className="animate-fade-up">

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '36px' }}>
        <div style={{ width: '4px', height: '36px', borderRadius: '99px', background: '#E53E3E', flexShrink: 0 }} />
        <div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.625rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>Register a Complaint</h1>
          <p style={{ fontSize: '0.8125rem', color: '#A0AEC0', fontWeight: 400, marginTop: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Report civic issues to your local authorities securely</p>
        </div>
      </div>

      <div style={{ ...neuCard, overflow: 'hidden' }}>
        {/* Info Banner */}
        <div style={{ background: 'rgba(255,153,51,0.04)', padding: '24px 32px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,153,51,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.03), inset -2px -2px 4px rgba(255,255,255,0.7)' }}>
            <Shield className="w-5 h-5" style={{ color: '#FF9933' }} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1A202C', marginBottom: '4px' }}>Secure Transmission Protocol</h4>
            <p style={{ fontSize: '0.8125rem', color: '#718096', lineHeight: 1.6 }}>All data is encrypted. Upon submission, a unique Tracking ID will be assigned for direct oversight of resolution progress.</p>
          </div>
        </div>

        {error && (
          <div style={{ margin: '32px 32px 0', padding: '20px', background: 'rgba(229,62,62,0.05)', border: '1px solid rgba(229,62,62,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px', color: '#E53E3E', fontSize: '0.875rem', fontWeight: 600 }}>
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ padding: '40px' }}>
          <div style={{ display: 'grid', gap: '32px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              <div>
                <label style={labelStyle}>Service Category <span style={{ color: '#E53E3E' }}>*</span></label>
                <select name="category" value={formData.category} onChange={handleChange} required style={neuInputBase} onFocus={e => { e.target.style.borderColor = 'rgba(255,153,51,0.4)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85), 0 0 0 3px rgba(255,153,51,0.1)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.85)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)' }}>
                  <option value="">Select Category</option>
                  <option value="Roads & Infrastructure">Roads & Infrastructure</option>
                  <option value="Water Supply & Sanitation">Water Supply & Sanitation</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Public Transport">Public Transport</option>
                  <option value="Waste Management">Waste Management</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Priority Level <span style={{ color: '#E53E3E' }}>*</span></label>
                <select name="priority" value={formData.priority} onChange={handleChange} required style={neuInputBase} onFocus={e => { e.target.style.borderColor = 'rgba(255,153,51,0.4)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85), 0 0 0 3px rgba(255,153,51,0.1)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.85)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)' }}>
                  <option value="Low">Low (Non-urgent)</option>
                  <option value="Medium">Medium (Standard)</option>
                  <option value="High">High (Immediate attention)</option>
                  <option value="Urgent">Urgent (Safety hazard)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Subject / Title <span style={{ color: '#E53E3E' }}>*</span></label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Brief summary of the issue" required style={neuInputBase} onFocus={e => { e.target.style.borderColor = 'rgba(255,153,51,0.4)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85), 0 0 0 3px rgba(255,153,51,0.1)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.85)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)' }} />
            </div>

            <div>
              <label style={labelStyle}>Detailed Description <span style={{ color: '#E53E3E' }}>*</span></label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Describe the issue, location details, and duration..." required style={{ ...neuInputBase, resize: 'none' }} onFocus={e => { e.target.style.borderColor = 'rgba(255,153,51,0.4)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85), 0 0 0 3px rgba(255,153,51,0.1)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.85)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)' }}></textarea>
            </div>

            {/* Location block */}
            <div style={{ background: 'rgba(0,0,0,0.015)', border: '1px solid rgba(0,0,0,0.03)', borderRadius: '20px', padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
              <div>
                <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin className="w-4 h-4" style={{ color: '#CBD5E0' }}/> State <span style={{ color: '#E53E3E' }}>*</span></label>
                <select name="state" value={formData.state} onChange={handleChange} required style={{ ...neuInputBase, background: '#FFFFFF' }} onFocus={e => { e.target.style.borderColor = 'rgba(255,153,51,0.4)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85), 0 0 0 3px rgba(255,153,51,0.1)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.85)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)' }}>
                  <option value="">Select State</option>
                  {states.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>
              <div>
                <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin className="w-4 h-4" style={{ color: '#CBD5E0' }}/> City / District <span style={{ color: '#E53E3E' }}>*</span></label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Name of local area" required style={{ ...neuInputBase, background: '#FFFFFF' }} onFocus={e => { e.target.style.borderColor = 'rgba(255,153,51,0.4)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85), 0 0 0 3px rgba(255,153,51,0.1)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.85)'; e.target.style.boxShadow = 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)' }} />
              </div>
            </div>

            {/* File Upload (Neumorphic drop zone) */}
            <div>
              <label style={labelStyle}>Documentation (Optional)</label>
              <div
                style={{
                  position: 'relative',
                  border: '2px dashed rgba(0,0,0,0.06)',
                  borderRadius: '20px',
                  padding: '48px 24px',
                  textAlign: 'center',
                  background: 'rgba(0,0,0,0.01)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,153,51,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.01)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; }}
              >
                <input type="file" onChange={handleFileChange} accept="image/*,.pdf" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.04), inset 0 -2px 0 rgba(0,0,0,0.02)' }}>
                  <UploadCloud className="w-8 h-8" style={{ color: '#CBD5E0' }} />
                </div>
                
                <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#4A5568', marginBottom: '4px' }}>Attach Photographic Proof or PDF</p>
                <p style={{ fontSize: '0.6875rem', color: '#A0AEC0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Max file size: 5MB</p>
                
                {proofFile && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(19,136,8,0.08)', color: '#138808', padding: '8px 16px', borderRadius: '10px', fontSize: '0.8125rem', fontWeight: 600, marginTop: '24px', border: '1px solid rgba(19,136,8,0.15)' }}>
                    <CheckCircle2 className="w-4 h-4" /> {proofFile.name}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-saffron"
                style={{ padding: '16px 36px', fontSize: '0.875rem', opacity: isSubmitting ? 0.7 : 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Transmitting...</> : <><FileText className="w-4 h-4" /> Submit Official Complaint <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
