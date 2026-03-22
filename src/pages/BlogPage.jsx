import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { Calendar, ChevronRight } from 'lucide-react';

export default function BlogPage() {
  const { blogs } = useBlog();

  useEffect(() => {
    document.title = 'Our Blog — Acenst';
  }, []);

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '4rem 1rem' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '1rem' }}>Our Blog</h1>
          <p style={{ fontSize: '1.1rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            Latest news, insights, and updates from the world of real estate.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>No blogs available yet. Check back later!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {blogs.map(blog => (
              <div key={blog.id} style={{ backgroundColor: '#fff', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', width: '100%', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
                  {blog.image && (
                    <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} className="hover:scale-105" />
                  )}
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <Calendar size={14} />
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem', lineHeight: '1.4' }}>
                    {blog.title}
                  </h2>
                  <p style={{ color: '#4b5563', fontSize: '0.95rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {blog.metaDescription || blog.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}
                  </p>
                  
                  <div style={{ marginTop: 'auto' }}>
                    <Link to={`/blog/${blog.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#A03333', fontWeight: 600, fontSize: '0.95rem', transition: 'gap 0.2s', padding: '0.5rem 0' }}>
                      Read More <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
