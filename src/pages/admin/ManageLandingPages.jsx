import { useState } from 'react';
import { useDynamicPages } from '../../context/DynamicPageContext';
import { Plus, Edit, Trash2, X, Save, FileText } from 'lucide-react';

export default function ManageLandingPages() {
  const { dynamicPages, addPage, updatePage, deletePage } = useDynamicPages();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);

  const [formData, setFormData] = useState({
    city: '',
    slug: '',
    navLabel: '',
    title: '',
    content: '',
    metaTitle: '',
    metaDescription: ''
  });

  const handleOpenNew = () => {
    setFormData({ city: '', slug: '', navLabel: '', title: '', content: '', metaTitle: '', metaDescription: '' });
    setCurrentPage(null);
    setIsEditing(true);
  };

  const handleOpenEdit = (page) => {
    setFormData(page);
    setCurrentPage(page.id);
    setIsEditing(true);
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData(prev => ({
      ...prev, 
      title: newTitle,
      slug: currentPage ? prev.slug : generateSlug(newTitle),
      navLabel: currentPage ? prev.navLabel : newTitle
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPage) {
      updatePage(currentPage, formData);
    } else {
      addPage(formData);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e' }}>
            {currentPage ? 'Edit Landing Page' : 'Add New Landing Page'}
          </h2>
          <button onClick={() => setIsEditing(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff', cursor: 'pointer' }}>
            <X size={18} /> Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>Page Title (H1)</label>
              <input required type="text" value={formData.title} onChange={handleTitleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>City (e.g. jaipur)</label>
                <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value.toLowerCase()})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>URL Slug</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', background: '#f9fafb' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>Nav Label (Footer Link Text)</label>
              <input type="text" value={formData.navLabel} onChange={e => setFormData({...formData, navLabel: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>Meta Title (SEO)</label>
              <input type="text" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>Meta Description (SEO)</label>
              <textarea value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', minHeight: '80px' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>Content (HTML/Text)</label>
              <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', minHeight: '200px', fontFamily: 'monospace' }} placeholder="<p>Write your HTML content here</p>" />
            </div>
          </div>

          <button type="submit" style={{ marginTop: '2rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', background: '#A03333', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', transition: 'background 0.2s' }}>
            <Save size={20} /> Save Landing Page
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a1a2e' }}>Dynamic SEO Pages</h1>
          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Create and manage SEO landing pages for specific locations.</p>
        </div>
        <button onClick={handleOpenNew} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#A03333', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>
          <Plus size={20} /> Add SEO Page
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {dynamicPages.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: '#fff', borderRadius: '1rem', border: '1px dashed #d1d5db' }}>
            <p style={{ color: '#6b7280' }}>No landing pages found. Create your first dynamic SEO page!</p>
          </div>
        ) : (
          dynamicPages.map(page => (
            <div key={page.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '0.5rem', background: '#f9e8e8', color: '#A03333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a2e' }}>{page.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>/{page.city}/{page.slug}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleOpenEdit(page)} style={{ padding: '0.5rem', color: '#3b82f6', background: '#eff6ff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background 0.2s' }} title="Edit">
                  <Edit size={18} />
                </button>
                <button onClick={() => deletePage(page.id)} style={{ padding: '0.5rem', color: '#ef4444', background: '#fef2f2', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background 0.2s' }} title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
