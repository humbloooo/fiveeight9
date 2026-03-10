import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Upload, Save, Loader, Globe, Phone, AlertCircle, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';

const AdminModal = ({ type, isOpen, onClose, onSubmit, editingItem }) => {
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (type === 'settings') {
            setFormData(editingItem || {
                socialLinks: {
                    twitter: { link: '', visible: false },
                    instagram: { link: '', visible: false },
                    tiktok: { link: '', visible: false },
                    whatsapp: { link: '', visible: true },
                    facebook: { link: '', visible: false },
                    linkedin: { link: '', visible: false },
                },
                emergencyContacts: { reception: '', security: '', emergency: '', email: '' },
                displayOptions: { showRoomPrices: true },
                media: { backgroundId: '', heroId: '' }
            });
        } else if (editingItem) {
            setFormData(editingItem);
        } else {
            setFormData({
                title: '',
                name: '',
                price: 'R4,400 p/m',
                subtitle: '',
                description: '',
                category: 'Lunch',
                floor: 'Ground Floor',
                nsfas: true,
                available: true,
                inStock: true
            });
        }
    }, [editingItem, isOpen, type]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type: inputType, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: inputType === 'checkbox' ? checked : value
        }));
    };

    const handleNestedChange = (path, value) => {
        setFormData(prev => {
            const keys = path.split('.');
            const newData = { ...prev };
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        let finalData = { ...formData };

        if (file) {
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            uploadFormData.append('upload_preset', 'ml_default');

            try {
                const cloudName = 'dpscc5zqw'; // Using existing cloud name from .env
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, uploadFormData);
                finalData.imageUrl = res.data.secure_url;
                if (type === 'settings' && finalData.media) {
                    finalData.media.backgroundId = res.data.public_id;
                }
            } catch (err) {
                console.error('Upload error', err);
            }
        }

        await onSubmit(finalData);
        setUploading(false);
        onClose();
    };

    const renderSettingsFields = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Social Links */}
            <section>
                <h3 style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={16} /> SOCIAL MEDIA LINKS
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                    {Object.entries(formData.socialLinks || {}).map(([platform, data]) => (
                        <div key={platform} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <div style={{ width: '100px', fontSize: '0.8rem', color: '#a0aec0', textTransform: 'capitalize' }}>{platform}</div>
                            <input
                                className="admin-input"
                                style={{ flex: 1 }}
                                value={data.link}
                                onChange={(e) => handleNestedChange(`socialLinks.${platform}.link`, e.target.value)}
                                placeholder="https://..."
                            />
                            <button
                                type="button"
                                onClick={() => handleNestedChange(`socialLinks.${platform}.visible`, !data.visible)}
                                style={{ background: 'transparent', border: 'none', color: data.visible ? 'var(--gold)' : '#444', cursor: 'pointer' }}
                            >
                                {data.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Emergency Contacts */}
            <section>
                <h3 style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={16} /> SUPPORT CONTACTS
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {['reception', 'security', 'emergency', 'email'].map(field => (
                        <div key={field}>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#a0aec0', marginBottom: '0.3rem', textTransform: 'capitalize' }}>{field}</label>
                            <input
                                className="admin-input"
                                value={formData.emergencyContacts?.[field] || ''}
                                onChange={(e) => handleNestedChange(`emergencyContacts.${field}`, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Price Toggles */}
            <section>
                <h3 style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle size={16} /> DISPLAY OPTIONS
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.85rem' }}>Show Room Prices on Home Page</span>
                    <input
                        type="checkbox"
                        checked={formData.displayOptions?.showRoomPrices}
                        onChange={(e) => handleNestedChange('displayOptions.showRoomPrices', e.target.checked)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                </div>
            </section>

            {/* Imagery IDs */}
            <section>
                <h3 style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ImageIcon size={16} /> CLOUDINARY MEDIA IDS
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#a0aec0', marginBottom: '0.3rem' }}>Hero Image ID</label>
                        <input className="admin-input" value={formData.media?.heroId || ''} onChange={(e) => handleNestedChange('media.heroId', e.target.value)} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#a0aec0', marginBottom: '0.3rem' }}>Background ID</label>
                        <input className="admin-input" value={formData.media?.backgroundId || ''} onChange={(e) => handleNestedChange('media.backgroundId', e.target.value)} />
                    </div>
                </div>
            </section>
        </div>
    );

    const renderContentFields = () => (
        <>
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Title/Name</label>
                <input
                    name={type === 'cafeteria' ? 'name' : 'title'}
                    value={type === 'cafeteria' ? formData.name : formData.title}
                    onChange={handleChange}
                    className="admin-input"
                    required
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Description/Subtitle</label>
                <textarea
                    name={type === 'rooms' ? 'subtitle' : 'description'}
                    value={type === 'rooms' ? formData.subtitle : formData.description}
                    onChange={handleChange}
                    className="admin-input"
                    style={{ minHeight: '80px', resize: 'vertical' }}
                />
            </div>

            {type === 'rooms' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Price</label>
                        <input name="price" value={formData.price} onChange={handleChange} className="admin-input" />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Floor</label>
                        <select name="floor" value={formData.floor} onChange={handleChange} className="admin-input">
                            {['Basement', 'Ground Floor', '1st Floor', 'Second Floor', '3rd Floor'].map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                </div>
            )}

            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Media Asset</label>
                <div style={{
                    border: '2px dashed rgba(255,255,255,0.1)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.02)'
                }} onClick={() => document.getElementById('file-input').click()}>
                    <Upload size={24} style={{ color: 'var(--gold)', marginBottom: '0.5rem' }} />
                    <p style={{ color: '#a0aec0', fontSize: '0.8rem' }}>{file ? file.name : 'Upload from device'}</p>
                    <input id="file-input" type="file" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                </div>
            </div>
        </>
    );

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem'
        }}>
            <div className="modal-content" style={{
                background: '#0a1025', width: '100%', maxWidth: type === 'settings' ? '700px' : '550px',
                maxHeight: '90vh', overflowY: 'auto', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)',
                padding: 'clamp(1.5rem, 5vw, 2.5rem)', position: 'relative'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h2 style={{ color: 'var(--gold)', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', textTransform: 'uppercase' }}>
                        {type === 'settings' ? 'Site Configuration' : (editingItem ? 'Edit' : 'Add New') + ' ' + type.slice(0, -1)}
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    {type === 'settings' ? renderSettingsFields() : renderContentFields()}

                    <button
                        type="submit"
                        className="cta-button"
                        disabled={uploading}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', marginTop: '2rem' }}
                    >
                        {uploading ? <Loader size={18} className="spin" /> : <Save size={18} />}
                        {type === 'settings' ? 'Update Settings' : (editingItem ? 'Save Changes' : `Add ${type.slice(0, -1)}`)}
                    </button>
                </form>
            </div>
            <style>{`
                .admin-input { width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 8px; outline: none; transition: all 0.3s ease; }
                .admin-input:focus { border-color: var(--gold); background: rgba(255,255,255,0.08); }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .spin { animation: spin 1s linear infinite; }
            `}</style>
        </div>
    );
};

export default AdminModal;
