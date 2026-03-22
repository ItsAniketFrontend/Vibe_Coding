import { Mail, Phone, Calendar, Check, Trash2 } from 'lucide-react';
import { useEnquiries } from '../../context/EnquiryContext';

export default function ManageEnquiries() {
  const { enquiries, markAsRead, deleteEnquiry } = useEnquiries();

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.25rem' }}>User Enquiries</h1>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Manage messages and property requests</p>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        {enquiries.length === 0 ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#6b7280' }}>
            <Mail size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
            <p>No enquiries received yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
                  <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                  <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                  <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Details</th>
                  <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inquiry / Message</th>
                  <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map(enq => (
                  <tr key={enq.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: enq.status === 'Unread' ? '#fdfcfc' : '#ffffff' }}>
                    <td style={{ padding: '1.25rem' }}>
                      <span style={{ 
                        display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600,
                        backgroundColor: enq.status === 'Unread' ? '#fee2e2' : '#f3f4f6',
                        color: enq.status === 'Unread' ? '#dc2626' : '#6b7280'
                      }}>
                        {enq.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem', color: '#6b7280', fontSize: '0.875rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={14} /> {new Date(enq.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem' }}>
                      <p style={{ fontWeight: 600, color: '#1a1a2e', fontSize: '0.95rem' }}>{enq.name}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.4rem', fontSize: '0.85rem', color: '#4b5563' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={12} /> {enq.email}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={12} /> {enq.phone}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem' }}>
                      {enq.type && <span style={{ display: 'inline-block', marginBottom: '0.5rem', padding: '0.15rem 0.5rem', backgroundColor: '#e0e7ff', color: '#4338ca', fontSize: '0.7rem', fontWeight: 600, borderRadius: '4px' }}>{enq.type}</span>}
                      {enq.property && <span style={{ display: 'inline-block', marginBottom: '0.5rem', marginLeft: '0.5rem', padding: '0.15rem 0.5rem', backgroundColor: '#dcfce7', color: '#15803d', fontSize: '0.7rem', fontWeight: 600, borderRadius: '4px' }}>Property ID: {enq.property}</span>}
                      <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.5, maxWidth: '300px' }}>{enq.message}</p>
                    </td>
                    <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        {enq.status === 'Unread' && (
                          <button onClick={() => markAsRead(enq.id)} title="Mark as Read" style={{ width: '2rem', height: '2rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', backgroundColor: '#f3f4f6', color: '#4b5563', transition: 'all 0.2s', border: 'none', cursor: 'pointer' }}>
                            <Check size={16} />
                          </button>
                        )}
                        <button onClick={() => deleteEnquiry(enq.id)} title="Delete Enquiry" style={{ width: '2rem', height: '2rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', backgroundColor: '#fee2e2', color: '#ef4444', transition: 'all 0.2s', border: 'none', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
