import { Plus, Search, Edit, Trash2, X, MapPin, Building2, Trees, ChevronDown, Save, Image, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useProperties } from '../../context/PropertyContext';

/* ━━━━  Reusable Styles  ━━━━ */
const selectStyle = {
  width: '100%', backgroundColor: '#fff', border: '1px solid #e5e7eb',
  borderRadius: '0.6rem', padding: '0.65rem 2.2rem 0.65rem 2.5rem',
  fontSize: '0.85rem', color: '#1a1a2e', outline: 'none',
  appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
};
const selectStyleDisabled = { ...selectStyle, opacity: 0.4, cursor: 'not-allowed', backgroundColor: '#f9fafb' };
const iconLeft = { position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' };
const iconRight = { position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' };
const inputStyle = { width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', fontSize: '0.85rem', border: '1px solid #e5e7eb', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.03em' };

const getStatusStyle = (status) => {
  switch (status) {
    case 'For Sale': return { backgroundColor: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0' };
    case 'Sold': return { backgroundColor: '#f9e8e8', color: '#A03333', border: '1px solid #f5c6c6' };
    case 'Pending': return { backgroundColor: '#fef9c3', color: '#ca8a04', border: '1px solid #fde68a' };
    default: return { backgroundColor: '#f3f4f6', color: '#6b7280', border: '1px solid #e5e7eb' };
  }
};

const emptyProperty = {
  title: '', city: '', location: '', type: '', price: '',
  beds: 0, baths: 0, sqft: '', image: '', status: 'For Sale',
};

export default function ManageProperties() {
  const { properties, cityLocations, plotTypes, addProperty, updateProperty, deleteProperty } = useProperties();

  /* ── Filter state ── */
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterType, setFilterType] = useState('');

  /* ── Modal state ── */
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProp, setEditingProp] = useState(null);     // null = adding, object = editing
  const [formData, setFormData] = useState(emptyProperty);
  const [formErrors, setFormErrors] = useState({});

  /* ── Delete confirm state ── */
  const [deleteConfirm, setDeleteConfirm] = useState(null);  // property id or null

  /* ── Derived ── */
  const cities = Object.keys(cityLocations);
  const filterLocations = filterCity ? cityLocations[filterCity] || [] : [];
  const formLocations = formData.city ? cityLocations[formData.city] || [] : [];

  /* ── Filter logic ── */
  const filteredProperties = properties.filter(p => {
    const matchSearch = !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCity = !filterCity || p.city === filterCity;
    const matchLocation = !filterLocation || p.location === filterLocation;
    const matchType = !filterType || p.type === filterType;
    return matchSearch && matchCity && matchLocation && matchType;
  });

  const hasFilters = searchTerm || filterCity || filterLocation || filterType;

  const clearFilters = () => {
    setSearchTerm(''); setFilterCity(''); setFilterLocation(''); setFilterType('');
  };

  /* ── Modal helpers ── */
  const openAdd = () => {
    setEditingProp(null);
    setFormData(emptyProperty);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEdit = (prop) => {
    setEditingProp(prop);
    setFormData({ ...prop });
    setFormErrors({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProp(null);
    setFormData(emptyProperty);
    setFormErrors({});
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      // Reset location when city changes
      if (field === 'city') next.location = '';
      return next;
    });
    // Clear error for this field
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.type) errors.type = 'Plot type is required';
    if (!formData.price.trim()) errors.price = 'Price is required';
    if (!formData.sqft.trim()) errors.sqft = 'Area is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editingProp) {
      updateProperty(editingProp.id, formData);
    } else {
      addProperty(formData);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    deleteProperty(id);
    setDeleteConfirm(null);
  };

  /* ── Status counts ── */
  const counts = properties.reduce((acc, p) => { acc[p.status] = (acc[p.status] || 0) + 1; return acc; }, {});

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      {/* ── Page Header ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 700, color: '#1a1a2e' }}>Manage Properties</h1>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.2rem' }}>Add, edit, and remove property listings.</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
          <Plus size={18} /> Add New Property
        </button>
      </div>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ marginBottom: '1.5rem' }}>
        {[
          { label: 'Total', value: properties.length, color: '#6b7280', bg: '#f3f4f6' },
          { label: 'For Sale', value: counts['For Sale'] || 0, color: '#16a34a', bg: '#dcfce7' },
          { label: 'Pending', value: counts['Pending'] || 0, color: '#ca8a04', bg: '#fef9c3' },
          { label: 'Sold', value: counts['Sold'] || 0, color: '#A03333', bg: '#f9e8e8' },
        ].map((s, i) => (
          <div key={i} style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 700, color: s.color }}>{s.value}</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#9ca3af' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Filter Bar ── */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3" style={{ marginBottom: '0.75rem' }}>
          {/* Search */}
          <div style={{ position: 'relative', gridColumn: 'span 1' }} className="md:col-span-2 lg:col-span-1">
            <Search size={16} style={{ ...iconLeft, left: '0.75rem' }} />
            <input type="text" placeholder="Search title, city, location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '2.25rem' }} />
          </div>
          {/* City */}
          <div style={{ position: 'relative' }}>
            <Building2 size={16} style={iconLeft} /> <ChevronDown size={14} style={iconRight} />
            <select style={selectStyle} value={filterCity} onChange={(e) => { setFilterCity(e.target.value); setFilterLocation(''); }}>
              <option value="">All Cities</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {/* Location */}
          <div style={{ position: 'relative' }}>
            <MapPin size={16} style={iconLeft} /> <ChevronDown size={14} style={iconRight} />
            <select style={filterCity ? selectStyle : selectStyleDisabled} value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} disabled={!filterCity}>
              <option value="">{filterCity ? 'All Locations' : '— Select City —'}</option>
              {filterLocations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          {/* Type */}
          <div style={{ position: 'relative' }}>
            <Trees size={16} style={iconLeft} /> <ChevronDown size={14} style={iconRight} />
            <select style={selectStyle} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="">All Types</option>
              {plotTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        {hasFilters && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #f3f4f6' }}>
            <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 500 }}>Showing {filteredProperties.length} of {properties.length}</span>
            {filterCity && <span style={{ color: '#A03333', background: '#f9e8e8', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 500 }}>{filterCity}</span>}
            {filterLocation && <span style={{ color: '#A03333', background: '#f9e8e8', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 500 }}>{filterLocation}</span>}
            {filterType && <span style={{ color: '#A03333', background: '#f9e8e8', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 500 }}>{filterType}</span>}
            <button onClick={clearFilters} style={{ color: '#A03333', fontSize: '0.75rem', fontWeight: 500, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <X size={12} /> Clear All
            </button>
          </div>
        )}
      </div>

      {/* ── Table ── */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.75rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Property', 'City / Location', 'Type', 'Price', 'Area', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#9ca3af' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length > 0 ? filteredProperties.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.15s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {p.image ? (
                      <img src={p.image} alt={p.title} style={{ width: '3rem', height: '2.25rem', objectFit: 'cover', borderRadius: '0.35rem', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: '3rem', height: '2.25rem', flexShrink: 0, backgroundColor: '#f3f4f6', borderRadius: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image size={14} color="#9ca3af" />
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a2e' }}>{p.title}</div>
                      <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>ID: {p.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>{p.city}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{p.location || '—'}</div>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#6b7280' }}>{p.type}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', fontWeight: 600, color: '#A03333' }}>{p.price}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#6b7280' }}>{p.sqft} sq.ft</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ ...getStatusStyle(p.status), padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600 }}>{p.status}</span>
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button onClick={() => openEdit(p)} title="Edit"
                      style={{ padding: '0.4rem', borderRadius: '0.35rem', color: '#6b7280', transition: 'all 0.15s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#A03333'; e.currentTarget.style.backgroundColor = '#f9e8e8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                      <Edit size={15} />
                    </button>
                    <button onClick={() => setDeleteConfirm(p.id)} title="Delete"
                      style={{ padding: '0.4rem', borderRadius: '0.35rem', color: '#6b7280', transition: 'all 0.15s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.backgroundColor = '#fef2f2'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                  <p style={{ marginBottom: '0.5rem' }}>No properties found.</p>
                  {hasFilters && <button onClick={clearFilters} style={{ color: '#A03333', textDecoration: 'underline', fontSize: '0.85rem' }}>Clear filters</button>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#9ca3af' }}>
        Showing {filteredProperties.length} of {properties.length} properties
      </div>

      {/* ══════════ Add / Edit Modal ══════════ */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          {/* Backdrop */}
          <div onClick={closeModal} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
          {/* Modal */}
          <div style={{
            position: 'relative', backgroundColor: '#fff', borderRadius: '1rem',
            width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto',
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)', animation: 'fadeIn 0.25s ease-out',
          }}>
            {/* Modal Header */}
            <div style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1.25rem 1.5rem', borderRadius: '1rem 1rem 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1a1a2e' }}>
                {editingProp ? 'Edit Property' : 'Add New Property'}
              </h2>
              <button onClick={closeModal} style={{ padding: '0.4rem', borderRadius: '0.5rem', color: '#6b7280' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title — full width */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Property Title *</label>
                  <input type="text" value={formData.title} onChange={(e) => handleFormChange('title', e.target.value)}
                    placeholder="e.g. Premium Residential Plot" style={{ ...inputStyle, borderColor: formErrors.title ? '#ef4444' : '#e5e7eb' }} />
                  {formErrors.title && <span style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '0.2rem', display: 'block' }}>{formErrors.title}</span>}
                </div>

                {/* City */}
                <div>
                  <label style={labelStyle}>City *</label>
                  <div style={{ position: 'relative' }}>
                    <Building2 size={15} style={iconLeft} /> <ChevronDown size={13} style={iconRight} />
                    <select value={formData.city} onChange={(e) => handleFormChange('city', e.target.value)}
                      style={{ ...selectStyle, borderColor: formErrors.city ? '#ef4444' : '#e5e7eb' }}>
                      <option value="">Select City</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  {formErrors.city && <span style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '0.2rem', display: 'block' }}>{formErrors.city}</span>}
                </div>

                {/* Location */}
                <div>
                  <label style={labelStyle}>Location</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={15} style={iconLeft} /> <ChevronDown size={13} style={iconRight} />
                    <select value={formData.location}
                      onChange={(e) => handleFormChange('location', e.target.value)}
                      disabled={!formData.city}
                      style={formData.city ? selectStyle : selectStyleDisabled}>
                      <option value="">{formData.city ? 'Select Location' : '— Select City First —'}</option>
                      {formLocations.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                {/* Type */}
                <div>
                  <label style={labelStyle}>Plot Type *</label>
                  <div style={{ position: 'relative' }}>
                    <Trees size={15} style={iconLeft} /> <ChevronDown size={13} style={iconRight} />
                    <select value={formData.type} onChange={(e) => handleFormChange('type', e.target.value)}
                      style={{ ...selectStyle, borderColor: formErrors.type ? '#ef4444' : '#e5e7eb' }}>
                      <option value="">Select Type</option>
                      {plotTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  {formErrors.type && <span style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '0.2rem', display: 'block' }}>{formErrors.type}</span>}
                </div>

                {/* Status */}
                <div>
                  <label style={labelStyle}>Status</label>
                  <div style={{ position: 'relative' }}>
                    <ChevronDown size={13} style={iconRight} />
                    <select value={formData.status} onChange={(e) => handleFormChange('status', e.target.value)}
                      style={{ ...selectStyle, paddingLeft: '0.85rem' }}>
                      <option value="For Sale">For Sale</option>
                      <option value="Pending">Pending</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label style={labelStyle}>Price *</label>
                  <input type="text" value={formData.price} onChange={(e) => handleFormChange('price', e.target.value)}
                    placeholder="e.g. ₹45,00,000" style={{ ...inputStyle, borderColor: formErrors.price ? '#ef4444' : '#e5e7eb' }} />
                  {formErrors.price && <span style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '0.2rem', display: 'block' }}>{formErrors.price}</span>}
                </div>

                {/* Area */}
                <div>
                  <label style={labelStyle}>Area (sq.ft) *</label>
                  <input type="text" value={formData.sqft} onChange={(e) => handleFormChange('sqft', e.target.value)}
                    placeholder="e.g. 2,400" style={{ ...inputStyle, borderColor: formErrors.sqft ? '#ef4444' : '#e5e7eb' }} />
                  {formErrors.sqft && <span style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '0.2rem', display: 'block' }}>{formErrors.sqft}</span>}
                </div>

                {/* Beds */}
                <div>
                  <label style={labelStyle}>Bedrooms</label>
                  <input type="number" min="0" value={formData.beds} onChange={(e) => handleFormChange('beds', parseInt(e.target.value) || 0)}
                    style={inputStyle} />
                </div>

                {/* Baths */}
                <div>
                  <label style={labelStyle}>Bathrooms</label>
                  <input type="number" min="0" value={formData.baths} onChange={(e) => handleFormChange('baths', parseInt(e.target.value) || 0)}
                    style={inputStyle} />
                </div>

                {/* Image URL — full width */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Image URL</label>
                  <input type="url" value={formData.image} onChange={(e) => handleFormChange('image', e.target.value)}
                    placeholder="https://images.unsplash.com/..." style={inputStyle} />
                  {formData.image && (
                    <div style={{ marginTop: '0.5rem', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #e5e7eb', maxHeight: '120px' }}>
                      <img src={formData.image} alt="Preview" style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                        onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ borderTop: '1px solid #e5e7eb', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', position: 'sticky', bottom: 0, background: '#fff', borderRadius: '0 0 1rem 1rem' }}>
              <button onClick={closeModal} className="btn" style={{ border: '1px solid #e5e7eb', color: '#6b7280', padding: '0.55rem 1.25rem', borderRadius: '0.6rem', fontSize: '0.85rem' }}>
                Cancel
              </button>
              <button onClick={handleSubmit} className="btn btn-primary" style={{ padding: '0.55rem 1.5rem', fontSize: '0.85rem' }}>
                <Save size={16} /> {editingProp ? 'Save Changes' : 'Add Property'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ Delete Confirmation ══════════ */}
      {deleteConfirm !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setDeleteConfirm(null)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }} />
          <div style={{
            position: 'relative', backgroundColor: '#fff', borderRadius: '1rem', width: '100%', maxWidth: '400px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)', padding: '2rem', textAlign: 'center', animation: 'fadeIn 0.2s ease-out',
          }}>
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <AlertTriangle size={28} color="#ef4444" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>Delete Property</h3>
            <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Are you sure you want to delete this property? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} className="btn" style={{ border: '1px solid #e5e7eb', color: '#6b7280', padding: '0.55rem 1.5rem', borderRadius: '0.6rem', fontSize: '0.85rem' }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="btn" style={{ backgroundColor: '#ef4444', color: '#fff', padding: '0.55rem 1.5rem', borderRadius: '0.6rem', fontSize: '0.85rem' }}>
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
