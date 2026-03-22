import { useState } from 'react';
import { Globe, FileText, Code, Save, RotateCcw, ChevronDown, ChevronRight, Check, AlertTriangle, Search as SearchIcon, Eye, EyeOff, HelpCircle, Plus, Trash2 } from 'lucide-react';
import { useSEO } from '../../context/SEOContext';

const inputStyle = { width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', fontSize: '0.85rem', border: '1px solid #e5e7eb', outline: 'none', transition: 'border-color 0.2s' };
const labelStyle = { display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.03em' };
const textareaStyle = { ...inputStyle, minHeight: '80px', resize: 'vertical', lineHeight: 1.6, fontFamily: 'inherit' };
const codeTextareaStyle = { ...inputStyle, minHeight: '180px', resize: 'vertical', lineHeight: 1.5, fontFamily: "'Consolas', 'Monaco', monospace", fontSize: '0.8rem', backgroundColor: '#fafafa' };

const tabStyle = (isActive) => ({
  display: 'flex', alignItems: 'center', gap: '0.5rem',
  padding: '0.65rem 1rem', borderRadius: '0.6rem',
  fontSize: '0.8rem', fontWeight: isActive ? 600 : 400,
  color: isActive ? '#A03333' : '#6b7280',
  backgroundColor: isActive ? '#f9e8e8' : 'transparent',
  border: isActive ? '1px solid rgba(160,51,51,0.15)' : '1px solid transparent',
  cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
});

export default function ManageSEO() {
  const { seoPages, updateSEO, resetSEO, resetAllSEO } = useSEO();
  const [activePageId, setActivePageId] = useState(seoPages[0]?.id || 'home');
  const [activeTab, setActiveTab] = useState('meta');
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(null); // null, 'page', or 'all'
  const [schemaError, setSchemaError] = useState('');

  const activePage = seoPages.find(p => p.id === activePageId) || seoPages[0];

  const handleChange = (field, value) => {
    updateSEO(activePageId, { [field]: value });
    setSaved(false);

    // Validate schema JSON if it's the schema field
    if (field === 'schemaJson') {
      try {
        JSON.parse(value);
        setSchemaError('');
      } catch (e) {
        setSchemaError('Invalid JSON: ' + e.message);
      }
    }
  };

  const handleSave = () => {
    // Validate schema
    try {
      JSON.parse(activePage.schemaJson);
    } catch {
      setSchemaError('Fix JSON errors before saving');
      setActiveTab('schema');
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (resetConfirm === 'page') {
      resetSEO(activePageId);
    } else if (resetConfirm === 'all') {
      resetAllSEO();
    }
    setResetConfirm(null);
    setSaved(false);
  };

  const tabs = [
    { id: 'meta', label: 'Meta Tags', icon: Globe },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'schema', label: 'Schema / JSON-LD', icon: Code },
  ];

  /* Google Search Preview */
  const googlePreview = (
    <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SearchIcon size={16} color="#4285f4" /> Google Search Preview
        </h3>
        <button onClick={() => setShowPreview(!showPreview)} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#6b7280', fontSize: '0.75rem' }}>
          {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
          {showPreview ? 'Hide' : 'Show'}
        </button>
      </div>
      {showPreview && (
        <div style={{ backgroundColor: '#fafafa', borderRadius: '0.5rem', padding: '1rem', border: '1px solid #f3f4f6' }}>
          <div style={{ fontSize: '0.75rem', color: '#202124', fontFamily: 'Arial, sans-serif', marginBottom: '0.15rem' }}>
            Acenst.com{activePage.path}
          </div>
          <div style={{ fontSize: '1.1rem', color: '#1a0dab', fontFamily: 'Arial, sans-serif', cursor: 'pointer', marginBottom: '0.25rem', lineHeight: 1.3 }}>
            {activePage.metaTitle || 'Untitled Page'}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#4d5156', fontFamily: 'Arial, sans-serif', lineHeight: 1.5, maxWidth: '42rem' }}>
            {activePage.metaDescription || 'No description provided.'}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 700, color: '#1a1a2e' }}>SEO & Content Manager</h1>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.2rem' }}>Manage meta tags, page content, and structured data for every page.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setResetConfirm('page')} className="btn" style={{ border: '1px solid #e5e7eb', color: '#6b7280', padding: '0.5rem 1rem', borderRadius: '0.6rem', fontSize: '0.8rem' }}>
            <RotateCcw size={14} /> Reset Page
          </button>
          <button onClick={handleSave} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>
            {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
          </button>
        </div>
      </div>

      {/* Page Selector */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '0.85rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap' }}>
          {seoPages.map(page => (
            <button key={page.id} onClick={() => { setActivePageId(page.id); setSaved(false); setSchemaError(''); }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.15rem',
                padding: '0.6rem 1rem', borderRadius: '0.6rem', cursor: 'pointer', transition: 'all 0.2s',
                minWidth: '140px', flexShrink: 0,
                backgroundColor: activePageId === page.id ? '#f9e8e8' : '#f9fafb',
                border: activePageId === page.id ? '1px solid rgba(160,51,51,0.2)' : '1px solid #e5e7eb',
              }}>
              <span style={{ fontSize: '0.82rem', fontWeight: activePageId === page.id ? 600 : 500, color: activePageId === page.id ? '#A03333' : '#374151' }}>
                {page.pageName}
              </span>
              <span style={{ fontSize: '0.68rem', color: '#9ca3af' }}>{page.path}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Google Preview */}
      {googlePreview}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={tabStyle(activeTab === tab.id)}>
            <tab.icon size={15} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem' }}>
        {/* ── META TAB ── */}
        {activeTab === 'meta' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Meta Title
                  <span style={{ color: '#9ca3af', fontWeight: 400, textTransform: 'none', marginLeft: '0.5rem' }}>
                    ({activePage.metaTitle?.length || 0}/60 chars — {(activePage.metaTitle?.length || 0) <= 60 ? '✓ good' : '⚠ too long'})
                  </span>
                </label>
                <input type="text" value={activePage.metaTitle} onChange={(e) => handleChange('metaTitle', e.target.value)}
                  placeholder="Page Title — Brand Name" style={inputStyle} />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Meta Description
                  <span style={{ color: '#9ca3af', fontWeight: 400, textTransform: 'none', marginLeft: '0.5rem' }}>
                    ({activePage.metaDescription?.length || 0}/160 chars — {(activePage.metaDescription?.length || 0) <= 160 ? '✓ good' : '⚠ too long'})
                  </span>
                </label>
                <textarea value={activePage.metaDescription} onChange={(e) => handleChange('metaDescription', e.target.value)}
                  placeholder="Describe this page in 150-160 characters..." style={textareaStyle} />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Meta Keywords <span style={{ color: '#9ca3af', fontWeight: 400, textTransform: 'none' }}>(comma separated)</span></label>
                <input type="text" value={activePage.metaKeywords} onChange={(e) => handleChange('metaKeywords', e.target.value)}
                  placeholder="keyword1, keyword2, keyword3" style={inputStyle} />
              </div>
            </div>

            {/* Open Graph */}
            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.25rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Globe size={16} color="#A03333" /> Open Graph Tags
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>OG Title</label>
                  <input type="text" value={activePage.ogTitle} onChange={(e) => handleChange('ogTitle', e.target.value)}
                    placeholder="Open Graph Title" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>OG Image URL</label>
                  <input type="url" value={activePage.ogImage} onChange={(e) => handleChange('ogImage', e.target.value)}
                    placeholder="https://..." style={inputStyle} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>OG Description</label>
                  <textarea value={activePage.ogDescription} onChange={(e) => handleChange('ogDescription', e.target.value)}
                    placeholder="Description for social media sharing..." style={{ ...textareaStyle, minHeight: '60px' }} />
                </div>
                <div>
                  <label style={labelStyle}>Canonical URL</label>
                  <input type="url" value={activePage.canonicalUrl} onChange={(e) => handleChange('canonicalUrl', e.target.value)}
                    placeholder="https://Acenst.com/..." style={inputStyle} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONTENT TAB ── */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label style={labelStyle}>Page Heading (H1)</label>
                <input type="text" value={activePage.heroHeading} onChange={(e) => handleChange('heroHeading', e.target.value)}
                  placeholder="Main page heading" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Page Subheading / Tagline</label>
                <input type="text" value={activePage.heroSubheading} onChange={(e) => handleChange('heroSubheading', e.target.value)}
                  placeholder="Supporting text below the heading" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Additional Page Content (HTML / Markdown)</label>
                <textarea value={activePage.contentSection} onChange={(e) => handleChange('contentSection', e.target.value)}
                  placeholder="Add additional content for this page. You can use HTML or plain text..."
                  style={{ ...codeTextareaStyle, minHeight: '220px' }} />
                <span style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.25rem', display: 'block' }}>
                  This content will be rendered below the main section of the page. For SEO-rich landing pages with city/location descriptions.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── FAQS TAB ── */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Frequently Asked Questions</label>
              <button onClick={() => handleChange('faqs', [...(activePage.faqs || []), { question: '', answer: '' }])} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#A03333', fontSize: '0.8rem', fontWeight: 600, backgroundColor: '#f9e8e8', padding: '0.4rem 0.8rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                <Plus size={14} /> Add FAQ
              </button>
            </div>
            {(!activePage.faqs || activePage.faqs.length === 0) ? (
              <div style={{ textAlign: 'center', padding: '2rem', border: '1px dashed #e5e7eb', borderRadius: '0.75rem', color: '#9ca3af', fontSize: '0.9rem' }}>
                No FAQs added for this page.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activePage.faqs.map((faq, index) => (
                  <div key={index} style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1rem', position: 'relative' }}>
                    <button onClick={() => handleChange('faqs', activePage.faqs.filter((_, i) => i !== index))} style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ef4444', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
                      <Trash2 size={16} />
                    </button>
                    <div style={{ marginBottom: '0.75rem', paddingRight: '2rem' }}>
                      <label style={labelStyle}>Question {index + 1}</label>
                      <input type="text" value={faq.question} onChange={e => {
                        const newFaqs = [...activePage.faqs];
                        newFaqs[index].question = e.target.value;
                        handleChange('faqs', newFaqs);
                      }} placeholder="What is the question?" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Answer {index + 1}</label>
                      <textarea value={faq.answer} onChange={e => {
                        const newFaqs = [...activePage.faqs];
                        newFaqs[index].answer = e.target.value;
                        handleChange('faqs', newFaqs);
                      }} placeholder="The answer..." style={{ ...textareaStyle, minHeight: '60px' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SCHEMA TAB ── */}
        {activeTab === 'schema' && (
          <div className="space-y-6">
            <div>
              <label style={labelStyle}>Schema Type</label>
              <div style={{ position: 'relative' }}>
                <ChevronDown size={13} style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
                <select value={activePage.schemaType} onChange={(e) => handleChange('schemaType', e.target.value)}
                  style={{ ...inputStyle, appearance: 'none', paddingRight: '2rem', cursor: 'pointer' }}>
                  {['RealEstateAgent', 'Organization', 'LocalBusiness', 'ItemList', 'Product', 'WebPage', 'FAQPage', 'BreadcrumbList', 'Custom'].map(t =>
                    <option key={t} value={t}>{t}</option>
                  )}
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>
                JSON-LD Structured Data
                {schemaError && (
                  <span style={{ color: '#ef4444', fontWeight: 400, textTransform: 'none', marginLeft: '0.75rem' }}>
                    ⚠ {schemaError}
                  </span>
                )}
              </label>
              <textarea value={activePage.schemaJson} onChange={(e) => handleChange('schemaJson', e.target.value)}
                style={{ ...codeTextareaStyle, minHeight: '300px', borderColor: schemaError ? '#ef4444' : '#e5e7eb' }}
                placeholder='{"@context": "https://schema.org", "@type": "..."}' />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                  This JSON-LD schema is injected into the {'<head>'} of the page for search engine structured data. 
                </span>
                <button onClick={() => {
                  try {
                    const formatted = JSON.stringify(JSON.parse(activePage.schemaJson), null, 2);
                    handleChange('schemaJson', formatted);
                    setSchemaError('');
                  } catch (e) {
                    setSchemaError('Cannot format: ' + e.message);
                  }
                }} style={{ fontSize: '0.72rem', color: '#A03333', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Code size={12} /> Format JSON
                </button>
              </div>
            </div>

            {/* Schema Quick Templates */}
            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
              <h3 style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '0.75rem' }}>Quick Templates</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {[
                  {
                    label: 'Real Estate Agent',
                    json: {
                      "@context": "https://schema.org", "@type": "RealEstateAgent",
                      "name": "Acenst", "description": "", "url": "",
                      "address": { "@type": "PostalAddress", "addressRegion": "Rajasthan", "addressCountry": "IN" }
                    }
                  },
                  {
                    label: 'Local Business',
                    json: {
                      "@context": "https://schema.org", "@type": "LocalBusiness",
                      "name": "Acenst", "telephone": "", "email": "",
                      "address": { "@type": "PostalAddress", "addressRegion": "Rajasthan", "addressCountry": "IN" },
                      "openingHours": "Mo-Sa 09:00-18:00"
                    }
                  },
                  {
                    label: 'FAQ Page',
                    json: {
                      "@context": "https://schema.org", "@type": "FAQPage",
                      "mainEntity": [
                        { "@type": "Question", "name": "Question 1?", "acceptedAnswer": { "@type": "Answer", "text": "Answer 1" } },
                        { "@type": "Question", "name": "Question 2?", "acceptedAnswer": { "@type": "Answer", "text": "Answer 2" } }
                      ]
                    }
                  },
                  {
                    label: 'Breadcrumb',
                    json: {
                      "@context": "https://schema.org", "@type": "BreadcrumbList",
                      "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "" },
                        { "@type": "ListItem", "position": 2, "name": "Properties", "item": "" }
                      ]
                    }
                  },
                ].map((tpl, idx) => (
                  <button key={idx} onClick={() => {
                    handleChange('schemaJson', JSON.stringify(tpl.json, null, 2));
                    handleChange('schemaType', tpl.json['@type'] || 'Custom');
                    setSchemaError('');
                  }}
                    className="btn" style={{ border: '1px solid #e5e7eb', color: '#6b7280', padding: '0.35rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.72rem' }}>
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ══════════ Reset Confirmation ══════════ */}
      {resetConfirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setResetConfirm(null)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }} />
          <div style={{
            position: 'relative', backgroundColor: '#fff', borderRadius: '1rem', width: '100%', maxWidth: '400px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)', padding: '2rem', textAlign: 'center', animation: 'fadeIn 0.2s ease-out',
          }}>
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: '#fef9c3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <AlertTriangle size={28} color="#ca8a04" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
              Reset {resetConfirm === 'all' ? 'All Pages' : `"${activePage.pageName}"`}
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              This will restore {resetConfirm === 'all' ? 'all pages' : 'this page'} to the default values. Unsaved changes will be lost.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => setResetConfirm(null)} className="btn" style={{ border: '1px solid #e5e7eb', color: '#6b7280', padding: '0.55rem 1.5rem', borderRadius: '0.6rem', fontSize: '0.85rem' }}>
                Cancel
              </button>
              <button onClick={handleReset} className="btn" style={{ backgroundColor: '#ca8a04', color: '#fff', padding: '0.55rem 1.5rem', borderRadius: '0.6rem', fontSize: '0.85rem' }}>
                <RotateCcw size={15} /> Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
