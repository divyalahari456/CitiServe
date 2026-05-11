import { useState } from 'react';
import { Settings, Shield, Bell, Database, Server, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const neuCard = {
  background: '#FFFFFF',
  borderRadius: '24px',
  boxShadow: '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.9)',
  padding: '32px'
};

const Toggle = ({ label, description, checked, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
    <div>
      <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1A202C' }}>{label}</div>
      <div style={{ fontSize: '0.8125rem', color: '#718096', marginTop: '4px' }}>{description}</div>
    </div>
    <div 
      onClick={() => onChange(!checked)}
      style={{
        width: '44px', height: '24px', borderRadius: '12px',
        background: checked ? '#FF9933' : '#E2E8F0',
        position: 'relative', cursor: 'pointer', transition: 'background 0.2s'
      }}
    >
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%', background: 'white',
        position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
        transition: 'left 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} />
    </div>
  </div>
);

const ManageSettings = () => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    allowRegistrations: true,
    emailNotifications: true,
    autoAssignComplaints: true,
    publicDataAccess: false
  });

  const [saving, setSaving] = useState(false);

  const handleToggle = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    // Simulate API call since there's no backend settings model yet
    setTimeout(() => {
      setSaving(false);
      toast.success('System settings updated successfully!');
    }, 800);
  };

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '4px', height: '24px', borderRadius: '99px', background: '#4A5568' }} />
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>System Settings</h2>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1A202C', color: 'white', padding: '10px 20px', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
        >
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: '24px' }} className="lg:grid-cols-2">
        {/* Core System */}
        <div style={neuCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Server className="w-5 h-5 text-indigo-500" />
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.125rem', fontWeight: 600, color: '#1A202C' }}>Core System</h3>
          </div>
          <Toggle 
            label="Maintenance Mode" 
            description="Take the entire portal offline for scheduled upgrades."
            checked={settings.maintenanceMode}
            onChange={(v) => handleToggle('maintenanceMode', v)}
          />
          <Toggle 
            label="Allow New Registrations" 
            description="Enable or disable new citizen signups."
            checked={settings.allowRegistrations}
            onChange={(v) => handleToggle('allowRegistrations', v)}
          />
        </div>

        {/* Security & Access */}
        <div style={neuCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Shield className="w-5 h-5 text-red-500" />
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.125rem', fontWeight: 600, color: '#1A202C' }}>Security & Access</h3>
          </div>
          <Toggle 
            label="Public Data Access" 
            description="Allow anonymous users to view public civic data."
            checked={settings.publicDataAccess}
            onChange={(v) => handleToggle('publicDataAccess', v)}
          />
          <div style={{ marginTop: '24px' }}>
            <button style={{ width: '100%', padding: '12px', background: 'rgba(229,62,62,0.1)', color: '#E53E3E', border: '1px solid rgba(229,62,62,0.2)', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
              Force Logout All Active Sessions
            </button>
          </div>
        </div>

        {/* Complaints Config */}
        <div style={neuCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Database className="w-5 h-5 text-orange-500" />
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.125rem', fontWeight: 600, color: '#1A202C' }}>Complaints Engine</h3>
          </div>
          <Toggle 
            label="Auto-Assign Complaints" 
            description="Automatically assign urgent complaints to available admins."
            checked={settings.autoAssignComplaints}
            onChange={(v) => handleToggle('autoAssignComplaints', v)}
          />
        </div>

        {/* Notifications */}
        <div style={neuCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Bell className="w-5 h-5 text-blue-500" />
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.125rem', fontWeight: 600, color: '#1A202C' }}>Notifications</h3>
          </div>
          <Toggle 
            label="Email Notifications" 
            description="Send system emails to citizens on status updates."
            checked={settings.emailNotifications}
            onChange={(v) => handleToggle('emailNotifications', v)}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageSettings;
