import { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { Plus, Edit, Trash2, X, Save, FileText } from 'lucide-react';

export default function ManageBlogs() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useBlog();
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    image: '',
    content: '',
    metaTitle: '',
    metaDescription: ''
  });

  const handleOpenNew = () => {
    setFormData({ title: '', slug: '', image: '', content: '', metaTitle: '', metaDescription: '' });
    setCurrentBlog(null);
    setIsEditing(true);
  };

  const handleOpenEdit = (blog) => {
    setFormData(blog);
    setCurrentBlog(blog.id);
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
      slug: currentBlog ? prev.slug : generateSlug(newTitle)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentBlog) {
      updateBlog(currentBlog, formData);
    } else {
      addBlog(formData);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e' }}>
            {currentBlog ? 'Edit Blog' : 'Add New Blog'}
          </h2>
          <button onClick={() => setIsEditing(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff', cursor: 'pointer' }}>
            <X size={18} /> Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>Blog Title</label>
              <input required type="text" value={formData.title} onChange={handleTitleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>URL Slug</label>
              <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', background: '#f9fafb' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>Image URL</label>
              <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://example.com/image.jpg" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
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
              <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', minHeight: '300px', fontFamily: 'monospace' }} placeholder="<p>Write your HTML content here</p>" />
            </div>
          </div>

          <button type="submit" style={{ marginTop: '2rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', background: '#A03333', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', transition: 'background 0.2s' }}>
            <Save size={20} /> Save Blog
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a1a2e' }}>Manage Blogs</h1>
          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Create and manage dynamic blog posts.</p>
        </div>
        <button onClick={handleOpenNew} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#A03333', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>
          <Plus size={20} /> Add Blog
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {blogs.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: '#fff', borderRadius: '1rem', border: '1px dashed #d1d5db' }}>
            <p style={{ color: '#6b7280' }}>No blogs found. Create your first blog post!</p>
          </div>
        ) : (
          blogs.map(blog => (
            <div key={blog.id} style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '80px', height: '60px', borderRadius: '0.5rem', overflow: 'hidden', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <FileText color="#9ca3af" size={24} />
                  )}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a2e' }}>{blog.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>/{blog.slug}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleOpenEdit(blog)} style={{ padding: '0.5rem', color: '#3b82f6', background: '#eff6ff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background 0.2s' }} title="Edit">
                  <Edit size={18} />
                </button>
                <button onClick={() => deleteBlog(blog.id)} style={{ padding: '0.5rem', color: '#ef4444', background: '#fef2f2', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background 0.2s' }} title="Delete">
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
