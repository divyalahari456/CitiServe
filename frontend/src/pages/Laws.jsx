import { useState, useEffect } from 'react';
import {
  Search, BookOpen, HeartPulse, ShieldAlert, HardHat,
  ShoppingBag, Home, TreePine, ArrowLeft, ExternalLink,
  ChevronDown, Loader2, Languages, Info, Activity
} from 'lucide-react';
import { getAllLaws, getCategories, getLawsByCategory } from '../services/lawService';
import { useLanguage } from '../context/LanguageContext.jsx';

const categoryIcons = {
  'Education':       { icon: <BookOpen    className="w-6 h-6" style={{ color: '#FF9933' }} />, bg: 'rgba(255,153,51,0.10)' },
  'Health':          { icon: <HeartPulse  className="w-6 h-6" style={{ color: '#138808' }} />, bg: 'rgba(19,136,8,0.09)' },
  'Women Safety':    { icon: <ShieldAlert className="w-6 h-6" style={{ color: '#E53E3E' }} />, bg: 'rgba(229,62,62,0.09)' },
  'Labour Rights':   { icon: <HardHat     className="w-6 h-6" style={{ color: '#D69E2E' }} />, bg: 'rgba(214,158,46,0.10)' },
  'Consumer Rights': { icon: <ShoppingBag className="w-6 h-6" style={{ color: '#38A169' }} />, bg: 'rgba(56,161,105,0.09)' },
  'Housing':         { icon: <Home        className="w-6 h-6" style={{ color: '#667EEA' }} />, bg: 'rgba(102,126,234,0.10)' },
  'Environment':     { icon: <TreePine    className="w-6 h-6" style={{ color: '#319795' }} />, bg: 'rgba(49,151,149,0.09)' },
};

const defaultIcon = { icon: <BookOpen className="w-6 h-6" style={{ color: '#718096' }} />, bg: 'rgba(0,0,0,0.04)' };

/* ── Common Styles ──────────────────────────────────────── */
const neuCard = {
  background: '#FFFFFF',
  borderRadius: '18px',
  boxShadow: '6px 6px 18px rgba(0,0,0,0.07), -6px -6px 18px rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.9)',
  transition: 'all 0.25s ease',
};

const Laws = () => {
  const { language, translateBatch, translating } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedLaw, setExpandedLaw] = useState(null);
  const [categories, setCategories] = useState([]);
  const [translatedCategories, setTranslatedCategories] = useState([]);
  const [categoryLaws, setCategoryLaws] = useState([]);
  const [translatedLaws, setTranslatedLaws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lawsLoading, setLawsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getCategories();
        setCategories(res.data || []);
      } catch (err) {
        setError('Could not load categories. Ensure database is seeded.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const translateCats = async () => {
      if (categories.length === 0) return;
      if (language === 'en') { setTranslatedCategories(categories); return; }
      const translated = await translateBatch(categories);
      setTranslatedCategories(translated);
    };
    translateCats();
  }, [language, categories, translateBatch]);

  useEffect(() => {
    const translateLawData = async () => {
      if (categoryLaws.length === 0) { setTranslatedLaws([]); return; }
      if (language === 'en') { setTranslatedLaws(categoryLaws); return; }
      const allTexts = [];
      categoryLaws.forEach(law => allTexts.push(law.title, law.description, law.benefits || '', law.howToUse || ''));
      const translated = await translateBatch(allTexts);
      const result = categoryLaws.map((law, i) => ({
        ...law,
        _title: translated[i * 4],
        _description: translated[i * 4 + 1],
        _benefits: translated[i * 4 + 2],
        _howToUse: translated[i * 4 + 3],
      }));
      setTranslatedLaws(result);
    };
    translateLawData();
  }, [language, categoryLaws, translateBatch]);

  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    setExpandedLaw(null);
    setLawsLoading(true);
    try {
      const res = await getLawsByCategory(categoryName);
      setCategoryLaws(res.data || []);
    } catch (err) {
      setCategoryLaws([]);
    } finally {
      setLawsLoading(false);
    }
  };

  const toggleLaw = (id) => setExpandedLaw(expandedLaw === id ? null : id);

  const displayCategories = translatedCategories.length > 0 ? translatedCategories : categories;
  const filteredCategories = categories
    .map((cat, i) => ({ original: cat, display: displayCategories[i] || cat }))
    .filter(c => c.original.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.display && c.display.toLowerCase().includes(searchQuery.toLowerCase())));
  const displayLaws = translatedLaws.length > 0 ? translatedLaws : categoryLaws;

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '32px' }} className="animate-fade-up">

      {/* ── Page Header ─────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }} className="md:flex-row md:items-center md:justify-between">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '4px', height: '36px', borderRadius: '99px', background: '#FF9933', flexShrink: 0 }} />
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.625rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>
              Rights &amp; Laws
            </h1>
            <p style={{ fontSize: '0.8125rem', color: '#A0AEC0', fontWeight: 400, marginTop: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Know your legal rights and civic duties
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Search */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search className="w-4 h-4" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#CBD5E0', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '42px',
                paddingRight: '16px',
                paddingTop: '10px',
                paddingBottom: '10px',
                background: '#F5F7FA',
                border: '1.5px solid rgba(255,255,255,0.85)',
                borderRadius: '12px',
                boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.06), inset -3px -3px 7px rgba(255,255,255,0.85)',
                fontSize: '0.875rem',
                fontFamily: "'Inter', sans-serif",
                color: '#1A202C',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Translating indicator */}
          {translating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: '#FF9933', background: 'rgba(255,153,51,0.08)', padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(255,153,51,0.15)' }}>
              <Languages className="w-3.5 h-3.5 animate-pulse" /> Translating...
            </div>
          )}
        </div>
      </div>

      {/* ── Loading ──────────────────────────────────────── */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px', background: '#FFFFFF', borderRadius: '20px', ...neuCard }}>
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#FF9933', marginBottom: '16px' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A0AEC0' }}>
            Accessing Official Records...
          </span>
        </div>
      )}

      {/* ── Error ────────────────────────────────────────── */}
      {error && !loading && (
        <div style={{ background: 'rgba(229,62,62,0.05)', border: '1px solid rgba(229,62,62,0.15)', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
          <p style={{ color: '#E53E3E', fontWeight: 600, marginBottom: '8px' }}>{error}</p>
          <p style={{ fontSize: '0.875rem', color: '#718096' }}>Please check your database connection or seed the data.</p>
        </div>
      )}

      {/* ── Categories Grid ──────────────────────────────── */}
      {!loading && !error && !selectedCategory && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '18px' }}>
          {filteredCategories.map(({ original, display }) => {
            const cat = categoryIcons[original] || defaultIcon;
            return (
              <div
                key={original}
                onClick={() => handleCategoryClick(original)}
                style={{ ...neuCard, padding: '28px 20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '8px 8px 20px rgba(0,0,0,0.09), -8px -8px 20px rgba(255,255,255,0.90)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = neuCard.boxShadow;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.04), inset -2px -2px 5px rgba(255,255,255,0.8)' }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9375rem', fontWeight: 600, color: '#1A202C', marginBottom: '6px' }}>{display}</h3>
                <div style={{ fontSize: '0.6875rem', color: '#A0AEC0', fontWeight: 500, letterSpacing: '0.05em' }}>{original}</div>
              </div>
            );
          })}
          {filteredCategories.length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', background: '#FFFFFF', borderRadius: '18px', ...neuCard }}>
              <p style={{ color: '#CBD5E0', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.875rem' }}>No Results Found</p>
            </div>
          )}
        </div>
      )}

      {/* ── Category Detail View ─────────────────────────── */}
      {!loading && !error && selectedCategory && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-up">
          <button
            onClick={() => { setSelectedCategory(null); setCategoryLaws([]); setTranslatedLaws([]); }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 500, color: '#A0AEC0', padding: 0, transition: 'color 0.2s', fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={e => e.currentTarget.style.color = '#1A202C'}
            onMouseLeave={e => e.currentTarget.style.color = '#A0AEC0'}
          >
            <ArrowLeft className="w-4 h-4" /> Return to Categories
          </button>

          <div style={{ ...neuCard, overflow: 'hidden' }}>
            {/* Category header */}
            <div style={{ padding: '32px 36px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: (categoryIcons[selectedCategory] || defaultIcon).bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.04), inset -2px -2px 5px rgba(255,255,255,0.8)' }}>
                {(categoryIcons[selectedCategory] || defaultIcon).icon}
              </div>
              <div>
                <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.5rem', fontWeight: 600, color: '#1A202C', margin: 0 }}>{selectedCategory}</h2>
                <p style={{ fontSize: '0.75rem', color: '#A0AEC0', fontWeight: 500, marginTop: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Comprehensive Legal Database</p>
              </div>
            </div>

            <div style={{ padding: '28px 36px' }}>
              {lawsLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
                  <Loader2 className="w-7 h-7 animate-spin" style={{ color: '#FF9933' }} />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {displayLaws.map((law) => (
                    <div
                      key={law._id}
                      style={{
                        borderRadius: '14px',
                        border: '1px solid rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                        background: expandedLaw === law._id ? 'rgba(255,153,51,0.02)' : '#FFFFFF',
                        boxShadow: expandedLaw === law._id
                          ? 'inset 3px 3px 7px rgba(0,0,0,0.04), 0 2px 8px rgba(255,153,51,0.08)'
                          : '2px 2px 8px rgba(0,0,0,0.04), -2px -2px 8px rgba(255,255,255,0.8)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {/* Law title row */}
                      <button
                        onClick={() => toggleLaw(law._id)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '18px 22px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          gap: '16px',
                        }}
                      >
                        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9375rem', fontWeight: 600, color: '#1A202C', margin: 0, flex: 1 }}>
                          {law._title || law.title}
                        </h3>
                        <div
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '8px',
                            background: expandedLaw === law._id ? '#FF9933' : '#F5F7FA',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transform: expandedLaw === law._id ? 'rotate(180deg)' : 'none',
                            transition: 'all 0.25s ease',
                            boxShadow: expandedLaw === law._id ? '0 2px 8px rgba(255,153,51,0.30)' : 'none',
                          }}
                        >
                          <ChevronDown className="w-4 h-4" style={{ color: expandedLaw === law._id ? '#FFFFFF' : '#A0AEC0' }} />
                        </div>
                      </button>

                      {/* Expanded content */}
                      {expandedLaw === law._id && (
                        <div style={{ padding: '4px 22px 22px', borderTop: '1px solid rgba(0,0,0,0.04)' }} className="animate-fade-in">
                          <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', marginTop: '16px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,153,51,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Info className="w-4 h-4" style={{ color: '#FF9933' }} />
                            </div>
                            <div>
                              <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0AEC0', marginBottom: '8px' }}>Simple Explanation</div>
                              <p style={{ fontSize: '0.9rem', color: '#4A5568', lineHeight: 1.7, fontWeight: 400 }}>{law._description || law.description}</p>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gap: '16px' }} className="md:grid-cols-2">
                            {(law._benefits || law.benefits) && (
                              <div style={{ display: 'flex', gap: '14px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(19,136,8,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <ShieldAlert className="w-4 h-4" style={{ color: '#138808' }} />
                                </div>
                                <div>
                                  <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0AEC0', marginBottom: '8px' }}>Benefits</div>
                                  <p style={{ fontSize: '0.875rem', color: '#718096', lineHeight: 1.65, fontWeight: 400 }}>{law._benefits || law.benefits}</p>
                                </div>
                              </div>
                            )}
                            {(law._howToUse || law.howToUse) && (
                              <div style={{ display: 'flex', gap: '14px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(214,158,46,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <Activity className="w-4 h-4" style={{ color: '#D69E2E' }} />
                                </div>
                                <div>
                                  <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0AEC0', marginBottom: '8px' }}>How to Use</div>
                                  <p style={{ fontSize: '0.875rem', color: '#718096', lineHeight: 1.65, fontWeight: 400 }}>{law._howToUse || law.howToUse}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {(law.source || law.officialLink) && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                              {law.source && <span style={{ fontSize: '0.75rem', color: '#CBD5E0', fontWeight: 500 }}>Source: {law.source}</span>}
                              {law.officialLink && (
                                <a
                                  href={law.officialLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 18px',
                                    background: '#1A202C',
                                    color: '#FFFFFF',
                                    borderRadius: '10px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.06em',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    transition: 'all 0.2s',
                                  }}
                                >
                                  Official Gazette <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Laws;
