import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { ChevronLeft, Calendar } from 'lucide-react';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { getBlogBySlug } = useBlog();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getBlogBySlug(slug);
    setBlog(data);
    setLoading(false);

    if (data) {
      document.title = data.metaTitle || `${data.title} - Acenst`;
      
      const updateMetaTag = (identifier, attrName, attrValue) => {
        let tag = document.querySelector(`meta[${identifier}]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute(identifier.split('=')[0], identifier.split('=')[1].replace(/'/g, ''));
          document.head.appendChild(tag);
        }
        tag.setAttribute(attrName, attrValue);
      };

      if (data.metaDescription) {
        updateMetaTag("name='description'", "content", data.metaDescription);
      }
    }
  }, [slug, getBlogBySlug]);

  if (loading) return null;
  if (!blog) return <Navigate to="/404" replace />;

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Hero Image */}
      {blog.image && (
        <div style={{ width: '100%', height: '40vh', minHeight: '300px', position: 'relative', overflow: 'hidden' }}>
          <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}></div>
        </div>
      )}

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1rem 6rem' }}>
        <Link to="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.95rem', marginBottom: '2rem', transition: 'color 0.2s' }} className="hover:text-[#A03333]">
          <ChevronLeft size={16} /> Back to Blogs
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>
          <Calendar size={16} />
          <span>{new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '2.5rem', lineHeight: '1.3' }}>
          {blog.title}
        </h1>

        <div 
          className="blog-content"
          style={{ 
            fontSize: '1.1rem', 
            color: '#374151', 
            lineHeight: '1.8',
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
      </div>
      
      {/* Some CSS for injected HTML content */}
      <style>{`
        .blog-content h2 { font-size: 1.8rem; font-weight: 700; color: #1a1a2e; margin: 2.5rem 0 1rem; }
        .blog-content h3 { font-size: 1.4rem; font-weight: 600; color: #1a1a2e; margin: 2rem 0 1rem; }
        .blog-content p { margin-bottom: 1.5rem; }
        .blog-content img { max-width: 100%; border-radius: 0.5rem; margin: 2rem 0; }
        .blog-content ul { padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .blog-content li { margin-bottom: 0.5rem; }
        .blog-content blockquote { border-left: 4px solid #A03333; padding-left: 1rem; margin: 1.5rem 0; font-style: italic; color: #4b5563; background: #f9fafb; padding: 1rem; border-radius: 0 0.5rem 0.5rem 0; }
      `}</style>
    </div>
  );
}
