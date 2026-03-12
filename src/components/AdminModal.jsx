import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Upload, Save, Loader, Globe, Phone, AlertCircle, Image as ImageIcon, Eye, EyeOff, Shield, Wifi, Zap, Coffee, Trash, Smartphone, Moon, Sun, Waves, Wind, CheckCircle, Clock, Home, Utensils, Truck } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import API_BASE_URL from '../config';
import { useToast } from '../context/ToastContext';

const AdminModal = ({ type, isOpen, onClose, onSubmit, editingItem }) => {
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const [mediaFiles, setMediaFiles] = useState([]); // New state for multiple files
    const [uploading, setUploading] = useState(false);
    const { addToast } = useToast();

    const CLOUD_NAME = 'dpscc5zqw';
    const UPLOAD_PRESET = 'ml_default';

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
                displayOptions: { 
                    showRoomPrices: true,
                    showStars: true 
                },
                media: { backgroundId: '', heroId: '' },
                homeStats: { 
                    count: '231', 
                    label: 'Single Rooms', 
                    subCount: '62', 
                    subLabel: 'Sharing Rooms' 
                },
                resFull: false,
                transportSchedule: ''
            });
        } else if (editingItem) {
            setFormData({
                ...editingItem,
                detailedDesc: editingItem.detailedDesc || '',
                media: Array.isArray(editingItem.media) ? editingItem.media : [],
                homeStats: editingItem.homeStats || { count: '', label: '', subCount: '', subLabel: '' },
                resFull: editingItem.resFull || false
            });
        } else {
            // Defaults for new items
            setFormData(type === 'rooms' ? {
                title: '',
                price: 'R4,400 p/m',
                subtitle: '',
                description: '',
                category: 'Single Room',
                floor: 'Ground Floor',
                nsfas: true,
                available: true,
                inStock: true,
                media: []
            } : type === 'events' ? {
                title: '',
                description: '',
                category: 'General',
                date: new Date().toISOString().split('T')[0],
                time: '12:00',
                media: []
            } : type === 'cafeteria' ? {
                name: '',
                description: '',
                category: 'Lunch',
                inStock: true,
                media: []
            } : type === 'amenities' ? {
                title: '',
                description: '',
                icon: 'Wifi',
                media: []
            } : type === 'admins' ? {
                username: '',
                email: '',
                password: '',
                role: 'student',
                studentNumber: '',
                idNumber: ''
            } : {
                title: '',
                description: '',
                media: []
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
            const newData = JSON.parse(JSON.stringify(prev));
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = current[keys[i]] || {};
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
            uploadFormData.append('upload_preset', UPLOAD_PRESET);

            try {
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, uploadFormData);
                finalData.imageUrl = res.data.secure_url;
                if (finalData.imagePublicId !== undefined) {
                    finalData.imagePublicId = res.data.public_id;
                }
            } catch (err) {
                console.error('Upload error', err);
                addToast('Main image upload failed', 'error');
                setUploading(false);
                return;
            }
        }

        if (mediaFiles.length > 0) {
            const uploadedUrls = [];
            for (const f of mediaFiles) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', f);
                uploadFormData.append('upload_preset', UPLOAD_PRESET);
                try {
                    const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, uploadFormData);
                    uploadedUrls.push(res.data.secure_url);
                } catch (err) {
                    console.error('Gallery upload error', err);
                }
            }
            finalData.media = [...(finalData.media || []), ...uploadedUrls];
        }

        try {
            if (type === 'settings') {
                await onSubmit(finalData);
                window.dispatchEvent(new CustomEvent('settingsUpdated'));
            } else {
                let endpoint = type;
                let dataToSend = finalData;

                if (type === 'admins') {
                    endpoint = editingItem ? 'auth/users' : 'auth/register';
                    if (editingItem && !formData.password) {
                        const dataWithoutPassword = { ...finalData };
                        delete dataWithoutPassword.password;
                        dataToSend = dataWithoutPassword;
                    }
                }

                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
                };

                if (editingItem) {
                    await axios.patch(`${API_BASE_URL}/api/${endpoint}/${editingItem._id}`, dataToSend, config);
                    addToast('Update successful', 'success');
                } else {
                    await axios.post(`${API_BASE_URL}/api/${endpoint}`, dataToSend, config);
                    addToast('Creation successful', 'success');
                }
            }
            onClose();
        } catch (error) {
            console.error('Submission error', error);
            addToast(`Submission failed: ${error.response?.data?.message || error.message}`, 'error');
        } finally {
            setUploading(false);
        }
    };

    const renderSettingsFields = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
                <h3 style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={16} /> SOCIAL MEDIA LINKS
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                    {Object.entries(formData.socialLinks || {}).map(([platform, data]) => (
                        <div key={platform} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <div style={{ width: '100px', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{platform}</div>
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

            <section>
                <h3 style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={16} /> SUPPORT CONTACTS
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {['reception', 'security', 'emergency', 'email'].map(field => (
                        <div key={field}>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', textTransform: 'capitalize' }}>{field}</label>
                            <input
                                className="admin-input"
                                value={formData.emergencyContacts?.[field] || ''}
                                onChange={(e) => handleNestedChange(`emergencyContacts.${field}`, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sun size={16} /> DISPLAY OPTIONS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.85rem' }}>Show Room Prices</div>
                        <button
                            type="button"
                            onClick={() => handleNestedChange('displayOptions.showRoomPrices', !formData.displayOptions?.showRoomPrices)}
                            style={{ background: 'transparent', border: 'none', color: formData.displayOptions?.showRoomPrices ? 'var(--gold)' : '#444', cursor: 'pointer' }}
                        >
                            {formData.displayOptions?.showRoomPrices ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Fading Stars Effect (Dark Mode)</div>
                        <button
                            type="button"
                            onClick={() => handleNestedChange('displayOptions.showStars', !formData.displayOptions?.showStars)}
                            style={{ background: 'transparent', border: 'none', color: formData.displayOptions?.showStars ? 'var(--gold)' : '#444', cursor: 'pointer' }}
                        >
                            {formData.displayOptions?.showStars ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </section>

            <section>
                <h3 style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Home size={16} /> HERO STATS & AVAILABILITY
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                        <label style={{ fontSize: '0.7rem' }}>Count</label>
                        <input className="admin-input" value={formData.homeStats?.count || ''} onChange={(e) => handleNestedChange('homeStats.count', e.target.value)} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.7rem' }}>Label</label>
                        <input className="admin-input" value={formData.homeStats?.label || ''} onChange={(e) => handleNestedChange('homeStats.label', e.target.value)} />
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ fontSize: '0.7rem' }}>Sub Count</label>
                        <input className="admin-input" value={formData.homeStats?.subCount || ''} onChange={(e) => handleNestedChange('homeStats.subCount', e.target.value)} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.7rem' }}>Sub Label</label>
                        <input className="admin-input" value={formData.homeStats?.subLabel || ''} onChange={(e) => handleNestedChange('homeStats.subLabel', e.target.value)} />
                    </div>
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                    <h3 style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Truck size={16} /> TRANSPORT SCHEDULE
                    </h3>
                    <textarea 
                        className="admin-input" 
                        style={{ minHeight: '120px' }}
                        value={formData.transportSchedule || ''} 
                        onChange={(e) => handleNestedChange('transportSchedule', e.target.value)}
                        placeholder="e.g. Morning: 07:00 - 09:00, Afternoon: 14:00 - 17:00"
                    />
                </div>
            </section>
        </div>
    );

    const renderContentFields = () => (
        <>
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    {type === 'cafeteria' ? 'Name' : type === 'admins' ? 'Username' : 'Title'}
                </label>
                <input
                    name={type === 'cafeteria' ? 'name' : type === 'admins' ? 'username' : 'title'}
                    value={type === 'cafeteria' ? formData.name : type === 'admins' ? formData.username : formData.title}
                    onChange={handleChange}
                    className="admin-input"
                    required
                />
            </div>

            {type === 'admins' && (
                <>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
                        <input name="email" type="email" value={formData.email || ''} onChange={handleChange} className="admin-input" required />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Account Role</label>
                        <select 
                            name="role" 
                            value={formData.role || 'student'} 
                            onChange={handleChange} 
                            className="admin-input"
                            style={{ background: 'rgba(255,255,255,0.05)' }}
                        >
                            <option value="student">Student/Tenant</option>
                            <option value="staff">Staff/Staff Member</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>
                    {formData.role === 'student' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ fontSize: '0.7rem' }}>Student Number</label>
                                <input name="studentNumber" value={formData.studentNumber || ''} onChange={handleChange} className="admin-input" required={formData.role === 'student'} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.7rem' }}>ID Number (Password)</label>
                                <input name="idNumber" value={formData.idNumber || ''} onChange={handleChange} className="admin-input" required={formData.role === 'student'} />
                            </div>
                        </div>
                    )}
                    {formData.role !== 'student' && !editingItem && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
                            <input name="password" type="password" value={formData.password || ''} onChange={handleChange} className="admin-input" required />
                        </div>
                    )}
                </>
            )}

            {type === 'events' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ fontSize: '0.7rem' }}>Date</label>
                        <input name="date" type="date" value={formData.date || ''} onChange={handleChange} className="admin-input" required />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.7rem' }}>Time</label>
                        <input name="time" type="time" value={formData.time || ''} onChange={handleChange} className="admin-input" />
                    </div>
                </div>
            )}

            {type === 'amenities' && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select Icon</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '0.8rem' }}>
                        {['Wifi', 'Shield', 'Zap', 'Coffee', 'Trash', 'Smartphone', 'Moon', 'Sun', 'Waves', 'Wind', 'CheckCircle', 'AlertCircle', 'Clock', 'Home', 'Utensils', 'Gym', 'Parking', 'Access', 'Droplets', 'Truck', 'Tv'].map(icon => (
                            <button
                                key={icon}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, icon }))}
                                style={{
                                    padding: '0.8rem 0.5rem',
                                    background: formData.icon === icon ? 'var(--gold)' : 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    color: formData.icon === icon ? 'var(--navy)' : 'var(--text-primary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <span style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase' }}>{icon}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Description</label>
                <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    className="admin-input"
                    rows={3}
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Main Image</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {formData.imageUrl && (
                        <img src={formData.imageUrl} style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--glass-border)' }} alt="Preview" />
                    )}
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ color: 'var(--text-primary)', fontSize: '0.8rem' }} />
                </div>
            </div>

            {type !== 'admins' && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Gallery Images (Multi-upload)</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                        {(formData.media || []).map((url, idx) => (
                            <div key={idx} style={{ position: 'relative', width: '80px', height: '80px' }}>
                                <img src={url} style={{ width: '100%', height: '100%', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--glass-border)' }} alt={`Gallery ${idx}`} />
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, media: prev.media.filter((_, i) => i !== idx) }))}
                                    style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <input 
                        type="file" 
                        multiple 
                        onChange={(e) => setMediaFiles(Array.from(e.target.files))} 
                        style={{ color: 'var(--text-primary)', fontSize: '0.8rem' }} 
                    />
                    {mediaFiles.length > 0 && <div style={{ fontSize: '0.7rem', color: 'var(--gold)', marginTop: '0.5rem' }}>{mediaFiles.length} new files ready for upload</div>}
                </div>
            )}
        </>
    );

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem'
        }}>
            <div className="modal-content" style={{
                background: 'var(--navy)', width: '100%', maxWidth: '600px',
                maxHeight: '90vh', overflowY: 'auto', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)',
                padding: '2.5rem', position: 'relative'
            }}>
                <button onClick={onClose} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
                    <X size={24} />
                </button>
                <h2 style={{ color: 'var(--gold)', marginBottom: '2rem' }}>{editingItem ? 'Edit' : 'Add'} {type}</h2>
                <form onSubmit={handleSubmit}>
                    {type === 'settings' ? renderSettingsFields() : renderContentFields()}
                    <button type="submit" disabled={uploading} className="cta-button" style={{ width: '100%', marginTop: '1.5rem' }}>
                        {uploading ? <Loader className="spin" /> : <Save />} {editingItem ? 'Save Changes' : 'Create'}
                    </button>
                </form>
            </div>
            <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default AdminModal;
