import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Upload, Save, Loader } from 'lucide-react';

const AdminModal = ({ type, isOpen, onClose, onSubmit, editingItem }) => {
    const [formData, setFormData] = useState({
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
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (editingItem) {
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
    }, [editingItem, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
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
                const cloudName = 'YOUR_CLOUD_NAME';
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, uploadFormData);
                finalData.imageUrl = res.data.secure_url;
            } catch (err) {
                console.error('Upload error', err);
            }
        }

        await onSubmit(finalData);
        setUploading(false);
        onClose();
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '1rem'
        }}>
            <div className="modal-content" style={{
                background: '#0a1025',
                width: '100%',
                maxWidth: '550px',
                maxHeight: '90vh',
                overflowY: 'auto',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                position: 'relative'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', sticky: 'top', background: '#0a1025' }}>
                    <h2 style={{ color: 'var(--gold)', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>{editingItem ? 'Edit' : 'Add New'} {type.slice(0, -1)}</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit}>
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
                            <input
                                id="file-input"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="cta-button"
                        disabled={uploading}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem' }}
                    >
                        {uploading ? <Loader size={18} className="spin" /> : <Save size={18} />}
                        {editingItem ? 'Save Changes' : `Add ${type.slice(0, -1)}`}
                    </button>
                </form>
            </div>
            <style>{`
        .admin-input {
          width: 100%;
          padding: 0.8rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          border-radius: 8px;
          outline: none;
          font-size: 0.9rem;
        }
        .admin-input:focus {
          border-color: var(--gold);
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
        </div>
    );
};

export default AdminModal;
