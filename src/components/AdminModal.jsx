import React, { useState } from 'react';
import axios from 'axios';
import { X, Upload, Save, Loader } from 'lucide-react';

const AdminModal = ({ type, isOpen, onClose, onSubmit, editingItem }) => {
    const [formData, setFormData] = useState(editingItem || {
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
            uploadFormData.append('upload_preset', 'ml_default'); // You'll need to set this up in Cloudinary

            try {
                const cloudName = 'YOUR_CLOUD_NAME'; // Ideally from settings or env
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, uploadFormData);
                finalData.imageUrl = res.data.secure_url;
                finalData.imagePublicId = res.data.public_id;
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
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
        }}>
            <div className="modal-content" style={{
                background: '#0a1025',
                width: '90%',
                maxWidth: '600px',
                maxHeight: '80vh',
                overflowY: 'auto',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '2.5rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h2 style={{ color: 'var(--gold)' }}>{editingItem ? 'Edit' : 'Add New'} {type.slice(0, -1)}</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Universal title field */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Title/Name</label>
                        <input
                            name={type === 'cafeteria' ? 'name' : 'title'}
                            value={formData.title || formData.name || ''}
                            onChange={handleChange}
                            className="admin-input"
                            required
                        />
                    </div>

                    {type === 'rooms' && (
                        <>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Price</label>
                                <input name="price" value={formData.price} onChange={handleChange} className="admin-input" />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Floor</label>
                                <select name="floor" value={formData.floor} onChange={handleChange} className="admin-input">
                                    {['Basement', 'Ground Floor', '1st Floor', 'Second Floor', '3rd Floor'].map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                            </div>
                        </>
                    )}

                    {/* Image Upload */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Image Media</label>
                        <div style={{
                            border: '2px dashed rgba(255,255,255,0.1)',
                            padding: '2rem',
                            borderRadius: '12px',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }} onClick={() => document.getElementById('file-input').click()}>
                            <Upload size={32} style={{ color: 'var(--gold)', marginBottom: '1rem' }} />
                            <p style={{ color: '#a0aec0', fontSize: '0.9rem' }}>{file ? file.name : 'Click to upload from device'}</p>
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
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
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
        }
        .admin-input:focus {
          border-color: var(--gold);
        }
        option { background: #0a1025; }
      `}</style>
        </div>
    );
};

export default AdminModal;
