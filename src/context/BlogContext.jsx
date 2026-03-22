import { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();

const STORAGE_KEY = 'Acenst_blog_data';

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    } catch { /* ignore */ }
  }, [blogs]);

  const addBlog = (blog) => {
    setBlogs(prev => [{ ...blog, id: Date.now().toString(), date: new Date().toISOString() }, ...prev]);
  };

  const updateBlog = (id, updates) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBlog = (id) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  const getBlogBySlug = (slug) => {
    return blogs.find(b => b.slug === slug);
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog, getBlogBySlug }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error('useBlog must be used within BlogProvider');
  return ctx;
}
