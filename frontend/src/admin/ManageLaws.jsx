import { useState, useEffect } from 'react';
import { BookOpen, FileText, Plus, Edit2, Trash2, Loader2, AlertCircle, X, Save } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const neuCard = {
  background: '#FFFFFF',
  borderRadius: '24px',
  boxShadow: '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.9)',
};

const inputStyle = {
  width: '100%', padding: '12px 16px', background: '#F5F7FA', border: '1px solid rgba(0,0,0,0.08)',
  borderRadius: '12px', fontSize: '0.875rem', outline: 'none'
};

const ManageLaws = () => {
  const [activeTab, setActiveTab] = useState('laws'); // 'laws' or 'schemes'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'laws' ? '/api/laws' : '/api/schemes';
      const res = await axios.get(`http://localhost:5000${endpoint}`);
      if (res.data.success) {
        setItems(res.data.data);
      }
    } catch (err) {
      toast.error(`Failed to load ${activeTab}.`);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormData(item);
    } else {
      setFormData(activeTab === 'laws' 
        ? { title: '', description: '', category: '', benefits: '', howToUse: '', officialLink: '', source: '' }
        : { title: '', description: '', eligibility: '', benefits: '', targetRoles: '', maxIncome: '', gender: '', maxAge: '', link: '', source: '' }
      );
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // For schemes, parse targetRoles if it's a string
    const submitData = { ...formData };
    if (activeTab === 'schemes' && typeof submitData.targetRoles === 'string') {
      submitData.targetRoles = submitData.targetRoles.split(',').map(r => r.trim()).filter(Boolean);
    }

    try {
      const userStr = localStorage.getItem('citiserve_user');
      const token = userStr ? JSON.parse(userStr).token : null;
      const headers = { Authorization: `Bearer ${token}` };
      const endpoint = activeTab === 'laws' ? '/api/laws' : '/api/schemes';

      if (editingItem) {
        await axios.put(`http://localhost:5000${endpoint}/${editingItem._id}`, submitData, { headers });
        toast.success(`${activeTab === 'laws' ? 'Law' : 'Scheme'} updated successfully!`);
      } else {
        await axios.post(`http://localhost:5000${endpoint}`, submitData, { headers });
        toast.success(`New ${activeTab === 'laws' ? 'law' : 'scheme'} added!`);
      }
      closeModal();
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to save ${activeTab}.`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${activeTab === 'laws' ? 'law' : 'scheme'}?`)) return;
    
    try {
      const userStr = localStorage.getItem('citiserve_user');
      const token = userStr ? JSON.parse(userStr).token : null;
      const endpoint = activeTab === 'laws' ? `/api/laws/${id}` : `/api/schemes/${id}`;
      
      await axios.delete(`http://localhost:5000${endpoint}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Deleted successfully.');
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      toast.error('Failed to delete item.');
    }
  };

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }} className="flex-col md:flex-row gap-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '4px', height: '24px', borderRadius: '99px', background: '#138808' }} />
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>Legal & Scheme Database</h2>
        </div>
        
        <button 
          onClick={() => openModal()}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#138808', color: 'white', padding: '10px 20px', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(19,136,8,0.2)' }}
        >
          <Plus className="w-4 h-4" /> Add New {activeTab === 'laws' ? 'Law' : 'Scheme'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
        <button 
          onClick={() => setActiveTab('laws')}
          style={{ background: 'none', border: 'none', padding: '8px 16px', fontSize: '0.9375rem', fontWeight: 600, color: activeTab === 'laws' ? '#138808' : '#A0AEC0', borderBottom: activeTab === 'laws' ? '2px solid #138808' : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <BookOpen className="w-4 h-4" /> Rights & Laws
        </button>
        <button 
          onClick={() => setActiveTab('schemes')}
          style={{ background: 'none', border: 'none', padding: '8px 16px', fontSize: '0.9375rem', fontWeight: 600, color: activeTab === 'schemes' ? '#138808' : '#A0AEC0', borderBottom: activeTab === 'schemes' ? '2px solid #138808' : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <FileText className="w-4 h-4" /> Govt Schemes
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '64px' }}>
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      ) : items.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', background: '#F5F7FA', borderRadius: '20px' }}>
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-4" />
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1A202C' }}>No {activeTab} found</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {items.map(item => (
            <div key={item._id} style={{ ...neuCard, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#138808', background: 'rgba(19,136,8,0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                    {activeTab === 'laws' ? item.category : 'Scheme'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#A0AEC0' }}>Added: {new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.125rem', fontWeight: 600, color: '#1A202C', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#4A5568', maxWidth: '800px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => openModal(item)} style={{ background: '#F5F7FA', border: '1px solid rgba(0,0,0,0.05)', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#4299E1' }}>
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item._id)} style={{ background: '#F5F7FA', border: '1px solid rgba(0,0,0,0.05)', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#E53E3E' }}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '24px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative' }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#A0AEC0' }}>
              <X className="w-6 h-6" />
            </button>
            
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.5rem', fontWeight: 600, color: '#1A202C', marginBottom: '24px' }}>
              {editingItem ? 'Update' : 'Add New'} {activeTab === 'laws' ? 'Law' : 'Scheme'}
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4A5568', marginBottom: '8px' }}>Title *</label>
                <input required name="title" value={formData.title || ''} onChange={handleInputChange} style={inputStyle} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4A5568', marginBottom: '8px' }}>Description *</label>
                <textarea required name="description" value={formData.description || ''} onChange={handleInputChange} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              {activeTab === 'laws' ? (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4A5568', marginBottom: '8px' }}>Category *</label>
                    <input required name="category" value={formData.category || ''} onChange={handleInputChange} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4A5568', marginBottom: '8px' }}>Benefits</label>
                    <textarea name="benefits" value={formData.benefits || ''} onChange={handleInputChange} rows={2} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4A5568', marginBottom: '8px' }}>How To Use</label>
                    <textarea name="howToUse" value={formData.howToUse || ''} onChange={handleInputChange} rows={2} style={inputStyle} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4A5568', marginBottom: '8px' }}>Eligibility *</label>
                    <textarea required name="eligibility" value={formData.eligibility || ''} onChange={handleInputChange} rows={2} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4A5568', marginBottom: '8px' }}>Benefits *</label>
                    <textarea required name="benefits" value={formData.benefits || ''} onChange={handleInputChange} rows={2} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4A5568', marginBottom: '8px' }}>Target Roles (Comma separated)</label>
                    <input name="targetRoles" value={Array.isArray(formData.targetRoles) ? formData.targetRoles.join(', ') : (formData.targetRoles || '')} onChange={handleInputChange} style={inputStyle} />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4A5568', marginBottom: '8px' }}>Official Link</label>
                  <input name={activeTab === 'laws' ? "officialLink" : "link"} value={(activeTab === 'laws' ? formData.officialLink : formData.link) || ''} onChange={handleInputChange} style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4A5568', marginBottom: '8px' }}>Source</label>
                  <input name="source" value={formData.source || ''} onChange={handleInputChange} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={closeModal} style={{ padding: '12px 24px', borderRadius: '12px', background: '#F5F7FA', color: '#4A5568', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={submitting} style={{ padding: '12px 24px', borderRadius: '12px', background: '#138808', color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {editingItem ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageLaws;
