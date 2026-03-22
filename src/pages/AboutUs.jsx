import { useSEO } from '../context/SEOContext';
import SEOHead from '../components/SEOHead';
import { Building2, Users, Target, ShieldCheck } from 'lucide-react';

export default function AboutUs() {
  const { getSEO } = useSEO();
  const seoData = getSEO('about') || {};

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#f8f9fb', minHeight: '100vh', paddingBottom: '5rem' }}>
      <SEOHead
        title={seoData.metaTitle}
        description={seoData.metaDescription}
        keywords={seoData.metaKeywords}
        ogTitle={seoData.ogTitle}
        ogDescription={seoData.ogDescription}
        ogImage={seoData.ogImage}
        canonical={seoData.canonicalUrl}
        schema={seoData.schemaJson ? JSON.parse(seoData.schemaJson) : null}
      />
      
      {/* Hero */}
      <section style={{ backgroundColor: '#1a1a2e', color: '#fff', padding: '5rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '1rem' }}>
            {seoData.heroHeading || 'About Acenst'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '42rem', margin: '0 auto', lineHeight: 1.6 }}>
            {seoData.heroSubheading || "Rajasthan's most trusted real estate partner. Redefining luxury living since 2016."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '4rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1.5rem' }}>Our Story</h2>
            {seoData.contentSection ? (
              <div style={{ color: '#4b5563', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: seoData.contentSection }}></div>
            ) : (
              <div style={{ color: '#4b5563', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1rem' }}>
                  Founded in 2016, Acenst started with a simple mission: to provide transparent, premium, and stress-free real estate services in Rajasthan. 
                  Over the years, we have grown into a trusted partner for hundreds of families and investors.
                </p>
                <p>
                  Our portfolio includes hand-picked luxury villas, high-return commercial plots, and serene agricultural land in top cities like Jaipur, Jodhpur, and Udaipur.
                  We believe in building long-term relationships through integrity and excellence.
                </p>
              </div>
            )}
          </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#A03333', marginBottom: '0.25rem' }}>10+</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Years Expeience</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#A03333', marginBottom: '0.25rem' }}>₹2.5B</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Property Sold</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#A03333', marginBottom: '0.25rem' }}>850+</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Happy Clients</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#A03333', marginBottom: '0.25rem' }}>45</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Industry Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="container" style={{ marginTop: '5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', textAlign: 'center', marginBottom: '3rem' }}>Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: 'Integrity', text: 'We operate with absolute transparency and honesty in every transaction.' },
            { icon: Target, title: 'Excellence', text: 'We strive to exceed expectations and deliver premium properties.' },
            { icon: Users, title: 'Client-Centric', text: 'Your needs and satisfaction are at the heart of everything we do.' },
          ].map((v, i) => (
            <div key={i} style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '1rem', border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', backgroundColor: '#f9e8e8', borderRadius: '50%', color: '#A03333', marginBottom: '1.5rem' }}>
                <v.icon size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.75rem' }}>{v.title}</h3>
              <p style={{ color: '#6b7280', lineHeight: 1.6 }}>{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQs ── */}
      {seoData?.faqs && seoData.faqs.length > 0 && (
        <section style={{ marginTop: '5rem', paddingTop: '5rem', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.75rem' }}>Frequently Asked Questions</h2>
            </div>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {seoData.faqs.map((faq, i) => (
                <div key={i} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '0.5rem' }}>{faq.question}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6 }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
