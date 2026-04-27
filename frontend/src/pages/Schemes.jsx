import { useState, useEffect } from 'react';
import {
  FileText, Search, CheckCircle2, Filter, AlertCircle,
  ExternalLink, IndianRupee, MapPin, Users, Briefcase,
  Loader2, Languages, ArrowRight, X
} from 'lucide-react';
import { getSchemes } from '../services/schemeService';
import { useLanguage } from '../context/LanguageContext.jsx';

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const neuCard = {
  background: '#FFFFFF',
  borderRadius: '18px',
  boxShadow: '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.9)',
  transition: 'all 0.25s ease',
};

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  background: '#F5F7FA',
  border: '1.5px solid rgba(255,255,255,0.85)',
  borderRadius: '12px',
  boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)',
  fontSize: '0.875rem',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  color: '#1A202C',
  outline: 'none',
  appearance: 'none',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '0.6875rem',
  fontWeight: 600,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: '#A0AEC0',
  marginBottom: '10px',
};

const Schemes = () => {
  const { language, translateBatch, translating } = useLanguage();
  const [formData, setFormData] = useState({ age: '', gender: '', income: '', state: '', role: '' });
  const [schemes, setSchemes] = useState([]);
  const [translatedSchemes, setTranslatedSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const res = await getSchemes();
        setSchemes(res.data || []);
      } catch (err) {
        setError('Could not load schemes. Ensure database is seeded.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleReset = async () => {
    setFormData({ age: '', gender: '', income: '', state: '', role: '' });
    setHasSearched(false);
    try {
      const res = await getSchemes();
      setSchemes(res.data || []);
    } catch (err) { /* noop */ }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);
    try {
      const filters = {};
      if (formData.role)   filters.role   = formData.role;
      if (formData.income) filters.income = formData.income;
      if (formData.gender) filters.gender = formData.gender;
      if (formData.age)    filters.age    = formData.age;
      const res = await getSchemes(filters);
      setSchemes(res.data || []);
    } catch (err) { /* noop */ }
    finally { setLoading(false); }
  };

  useEffect(() => {
    const translateSchemeData = async () => {
      if (schemes.length === 0) { setTranslatedSchemes([]); return; }
      if (language === 'en') { setTranslatedSchemes(schemes); return; }
      const allTexts = [];
      schemes.forEach(s => allTexts.push(s.title, s.eligibility, s.benefits || ''));
      const translated = await translateBatch(allTexts);
      const result = schemes.map((s, i) => ({
        ...s,
        _title: translated[i * 3],
        _eligibility: translated[i * 3 + 1],
        _benefits: translated[i * 3 + 2],
      }));
      setTranslatedSchemes(result);
    };
    translateSchemeData();
  }, [language, schemes, translateBatch]);

  const displaySchemes = translatedSchemes.length > 0 ? translatedSchemes : schemes;

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '32px' }} className="animate-fade-up">

      {/* ── Page Header ─────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '4px', height: '36px', borderRadius: '99px', background: '#138808', flexShrink: 0 }} />
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.625rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>
              Government Schemes
            </h1>
            <p style={{ fontSize: '0.8125rem', color: '#A0AEC0', fontWeight: 400, marginTop: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Discover welfare programs you're eligible for
            </p>
          </div>
        </div>
        {translating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: '#138808', background: 'rgba(19,136,8,0.07)', padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(19,136,8,0.12)' }}>
            <Languages className="w-3.5 h-3.5 animate-pulse" /> Translating...
          </div>
        )}
      </div>

      {error && (
        <div style={{ background: 'rgba(229,62,62,0.05)', border: '1px solid rgba(229,62,62,0.15)', borderRadius: '14px', padding: '24px', textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ color: '#E53E3E', fontWeight: 600 }}>{error}</p>
          <p style={{ fontSize: '0.875rem', color: '#718096', marginTop: '6px' }}>Please seed the database to see available schemes.</p>
        </div>
      )}

      <div style={{ display: 'grid', gap: '28px' }} className="lg:grid-cols-12">

        {/* ── Filter Sidebar ─────────────────────────────── */}
        <div style={{ position: 'sticky', top: '88px' }} className="lg:col-span-4">
          <div style={{ ...neuCard, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ background: 'rgba(0,0,0,0.015)', padding: '18px 22px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter className="w-4 h-4" style={{ color: '#FF9933' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A202C' }}>
                  Eligibility Filter
                </span>
              </div>
              {hasSearched && (
                <button
                  onClick={handleReset}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, color: '#E53E3E', padding: 0, fontFamily: "'Inter', sans-serif" }}
                >
                  <X className="w-3.5 h-3.5" /> Reset
                </button>
              )}
            </div>

            <form onSubmit={handleSearch} style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Occupation */}
              <div>
                <div style={labelStyle}>
                  <Briefcase className="w-3.5 h-3.5" /> Occupation
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {['Student', 'Farmer', 'Worker', 'Other'].map(r => {
                    const sel = formData.role === r;
                    return (
                      <label
                        key={r}
                        style={{
                          cursor: 'pointer',
                          border: `1.5px solid ${sel ? 'rgba(255,153,51,0.35)' : 'rgba(0,0,0,0.06)'}`,
                          borderRadius: '10px',
                          padding: '9px 0',
                          textAlign: 'center',
                          fontSize: '0.8125rem',
                          fontWeight: sel ? 600 : 400,
                          color: sel ? '#FF9933' : '#718096',
                          background: sel ? 'rgba(255,153,51,0.07)' : '#F5F7FA',
                          boxShadow: sel
                            ? '0 0 0 3px rgba(255,153,51,0.10)'
                            : 'inset 2px 2px 5px rgba(0,0,0,0.04), inset -2px -2px 5px rgba(255,255,255,0.8)',
                          transition: 'all 0.2s ease',
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        <input type="radio" name="role" value={r} className="hidden" checked={formData.role === r} onChange={handleChange} />
                        {r}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Gender + Age Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <div style={labelStyle}><Users className="w-3.5 h-3.5" /> Gender</div>
                  <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyle}>
                    <option value="">Any</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <div style={labelStyle}>Age</div>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Years" style={inputStyle} />
                </div>
              </div>

              {/* Annual Income */}
              <div>
                <div style={labelStyle}><IndianRupee className="w-3.5 h-3.5" /> Annual Income</div>
                <input type="number" name="income" value={formData.income} onChange={handleChange} placeholder="Max Amount (₹)" style={inputStyle} />
              </div>

              {/* State */}
              <div>
                <div style={labelStyle}><MapPin className="w-3.5 h-3.5" /> State</div>
                <select name="state" value={formData.state} onChange={handleChange} style={inputStyle}>
                  <option value="">All India</option>
                  {states.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>

              <button
                type="submit"
                className="btn-saffron"
                style={{ width: '100%', padding: '12px' }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Find Schemes
              </button>
            </form>
          </div>
        </div>

        {/* ── Results ────────────────────────────────────── */}
        <div className="lg:col-span-8">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '22px' }}>
            <div>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.125rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>
                {hasSearched ? 'Available Opportunities' : 'National Welfare Portal'}
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#A0AEC0', fontWeight: 500, marginTop: '5px', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                {loading ? 'Consulting Official Records...' :
                  hasSearched
                    ? `${displaySchemes.length} programs matched`
                    : `Browsing ${displaySchemes.length} programs`}
              </p>
            </div>
          </div>

          {loading ? (
            <div style={{ ...neuCard, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px' }}>
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#138808', marginBottom: '16px' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A0AEC0' }}>
                Accessing Scheme Database...
              </span>
            </div>
          ) : displaySchemes.length === 0 ? (
            <div style={{ ...neuCard, padding: '64px', textAlign: 'center' }}>
              <AlertCircle className="w-10 h-10" style={{ color: '#E2E8F0', margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.0625rem', fontWeight: 600, color: '#1A202C', marginBottom: '8px' }}>No Matching Schemes</h3>
              <p style={{ fontSize: '0.875rem', color: '#718096' }}>Try broadening your filters to find more opportunities.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {displaySchemes.map(scheme => (
                <div
                  key={scheme._id}
                  style={{ ...neuCard, padding: '28px' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '8px 8px 20px rgba(0,0,0,0.09), -8px -8px 20px rgba(255,255,255,0.90)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = neuCard.boxShadow;
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      {/* Badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                        {(scheme.targetRoles || []).map(r => (
                          <span key={r} style={{ background: 'rgba(19,136,8,0.08)', color: '#138808', fontSize: '0.6875rem', fontWeight: 600, padding: '3px 10px', borderRadius: '99px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{r}</span>
                        ))}
                        {scheme.source && (
                          <span style={{ background: 'rgba(255,153,51,0.08)', color: '#FF9933', fontSize: '0.6875rem', fontWeight: 600, padding: '3px 10px', borderRadius: '99px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{scheme.source}</span>
                        )}
                      </div>

                      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.0625rem', fontWeight: 600, color: '#1A202C', marginBottom: '16px', lineHeight: 1.3 }}>
                        {scheme._title || scheme.title}
                      </h3>

                      <div style={{ display: 'grid', gap: '14px' }} className="md:grid-cols-2">
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#138808' }} />
                            <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#A0AEC0' }}>Eligibility</span>
                          </div>
                          <p style={{ fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.6, fontWeight: 400 }}>{scheme._eligibility || scheme.eligibility}</p>
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#FF9933' }} />
                            <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#A0AEC0' }}>Benefits</span>
                          </div>
                          <p style={{ fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.6, fontWeight: 400 }}>{scheme._benefits || scheme.benefits}</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <a
                        href={scheme.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '10px 20px',
                          background: '#1A202C',
                          color: '#FFFFFF',
                          borderRadius: '12px',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#0f1319'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#1A202C'; e.currentTarget.style.transform = 'none'; }}
                      >
                        Apply <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <span style={{ fontSize: '0.6875rem', color: '#CBD5E0', fontWeight: 500 }}>Direct Portal</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schemes;
