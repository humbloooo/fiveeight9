import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { Plus, Edit, Trash, LogOut, Coffee, Home, Settings, Shield, RefreshCw, Menu, Wrench } from 'lucide-react';
import AdminModal from '../components/AdminModal';

const AdminDashboard = ({ token, setToken }) => {
    const [activeTab, setActiveTab] = useState('rooms');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchData = React.useCallback(async () => {
        setLoading(true);
        try {
            const endpoint = (activeTab === 'tickets' || activeTab === 'settings') ? `settings` : activeTab;
            const res = await axios.get(`${API_BASE_URL}/api/${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(res.data);
        } catch (err) {
            console.error('Fetch error:', err);
            if (err.response?.status === 401) {
                setToken(null);
                localStorage.removeItem('adminToken');
            }
            setData([]);
        }
        setLoading(false);
    }, [activeTab, token, setToken]);

    useEffect(() => {
        let isMounted = true;
        
        const executeFetch = async () => {
            if (isMounted) await fetchData();
        };

        executeFetch();

        return () => { isMounted = false; };
    }, [fetchData]);

    const handleCreateOrUpdate = async (formData) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            if (activeTab === 'settings') {
                await axios.post(`${API_BASE_URL}/api/settings`, formData, {
                    headers: { 'x-auth-token': token }
                });
                setMessage({ type: 'success', text: 'Universal settings updated' });
            } else if (editingItem) {
                await axios.patch(`${API_BASE_URL}/api/${activeTab}/${editingItem._id}`, formData, config);
                setMessage({ type: 'success', text: 'Updated successfully' });
            } else {
                await axios.post(`${API_BASE_URL}/api/${activeTab}`, formData, config);
                setMessage({ type: 'success', text: 'Created successfully' });
            }
            fetchData();
        } catch (error) {
            console.error('Update operation failed:', error);
            setMessage({ type: 'error', text: 'Operation failed' });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`${API_BASE_URL}/api/${activeTab}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage({ type: 'success', text: 'Deleted successfully' });
            fetchData();
        } catch (error) {
            console.error('Delete operation failed:', error);
            setMessage({ type: 'error', text: 'Delete failed' });
        }
    };

    const handleDownloadBackup = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/backup`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `fiveeight9_backup_${Date.now()}.json`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setMessage({ type: 'success', text: 'Backup downloaded safely.' });
        } catch (error) {
            console.error('Backup download failed:', error);
            setMessage({ type: 'error', text: 'Backup failed. You must be authenticated.' });
        }
    };

    const tabs = [
        { id: 'rooms', name: 'Rooms', icon: <Home size={18} /> },
        { id: 'amenities', name: 'Amenities', icon: <Shield size={18} /> },
        { id: 'cafeteria', name: 'Nari\'s Cafe', icon: <Coffee size={18} /> },
        { id: 'tickets', name: 'Tickets', icon: <Wrench size={18} /> },
        { id: 'settings', name: 'Settings', icon: <Settings size={18} /> },
    ];

    return (
        <div className="admin-dashboard-root" style={{
            display: 'flex',
            minHeight: '100vh',
            background: 'var(--navy)',
            color: 'var(--text-primary)',
            position: 'relative'
        }}>
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 1400,
                        backdropFilter: 'blur(4px)'
                    }}
                />
            )}

            {/* Sidebar */}
            <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`} style={{
                width: '260px',
                background: 'var(--nav-bg)',
                borderRight: '1px solid var(--glass-border)',
                padding: '2rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                position: 'sticky',
                top: 0,
                zIndex: 1500,
                transition: 'transform 0.3s ease'
            }}>
                <h2 style={{ color: 'var(--gold)', marginBottom: '3rem', fontSize: '1.2rem', padding: '0 1rem', fontWeight: 900 }}>Admin Console</h2>
                <nav style={{ flex: 1 }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: activeTab === tab.id ? 'var(--gold-glow)' : 'transparent', border: 'none', color: activeTab === tab.id ? 'var(--gold)' : 'var(--text-secondary)', borderRadius: '8px', cursor: 'pointer', marginBottom: '0.5rem', textAlign: 'left', transition: 'all 0.3s ease', fontWeight: activeTab === tab.id ? 'bold' : 'normal' }}
                        >
                            {tab.icon} {tab.name}
                        </button>
                    ))}
                </nav>
                <button onClick={() => { setToken(null); localStorage.removeItem('adminToken'); }} style={{ marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}>
                    <LogOut size={18} /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: 'clamp(1rem, 5vw, 3rem)', overflowX: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="sidebar-toggle-btn"
                            onClick={() => setIsSidebarOpen(true)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', display: 'none', cursor: 'pointer' }}
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', textTransform: 'capitalize', marginBottom: '0.2rem' }}>{activeTab}</h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }} className="hide-on-mobile">Manage your website content dynamically.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={fetchData} style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.6rem', borderRadius: '8px', cursor: 'pointer' }}>
                            <RefreshCw size={18} className={loading ? 'spin' : ''} />
                        </button>
                        <button
                            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
                            className="cta-button"
                            style={{ fontSize: '0.8rem', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <Plus size={16} /> Add
                        </button>
                    </div>
                </div>

                {message && (
                    <div style={{ padding: '1rem', borderRadius: '8px', marginBottom: '2rem', background: message.type === 'success' ? 'rgba(72, 187, 120, 0.1)' : 'rgba(245, 101, 101, 0.1)', border: `1px solid ${message.type === 'success' ? '#48bb78' : '#f56565'}`, color: message.type === 'success' ? '#48bb78' : '#f56565', display: 'flex', justifyContent: 'space-between' }}>
                        {message.text}
                        <button onClick={() => setMessage(null)} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}>×</button>
                    </div>
                )}

                {loading ? (
                    <div style={{ color: 'var(--gold)' }}>Loading data...</div>
                ) : (
                    <div className="admin-list-grid" style={{ display: (activeTab === 'settings' || (Array.isArray(data) && data.length === 0)) ? 'block' : 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {activeTab === 'settings' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                                    <Settings size={48} style={{ color: 'var(--gold)', marginBottom: '1.5rem' }} />
                                    <h2 style={{ marginBottom: '1rem' }}>Universal Site Settings</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                                        Manage social links, emergency contacts, and global visibility toggles across the entire platform.
                                    </p>
                                    <button className="cta-button" onClick={() => { setEditingItem(data); setIsModalOpen(true); }}>
                                        CONFIGURE SYSTEM
                                    </button>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                                    <Shield size={48} style={{ color: '#48bb78', marginBottom: '1.5rem' }} />
                                    <h2 style={{ marginBottom: '1rem' }}>Core Data Backup</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                                        Export a complete JSON snapshot of the database (Rooms, Amenities, Settings) securely.
                                    </p>
                                    <button 
                                        onClick={handleDownloadBackup}
                                        style={{ background: 'rgba(72, 187, 120, 0.1)', border: '1px solid #48bb78', color: '#48bb78', padding: '1rem 2.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        DOWNLOAD DATABASE SNAPSHOT
                                    </button>
                                </div>
                            </div>
                        ) : data.length === 0 ? (
                            <div style={{ color: 'var(--text-secondary)' }}>No items found in this category.</div>
                        ) : (
                            data.map((item) => (
                                <div key={item._id} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <h3 style={{ color: 'var(--gold)', fontSize: '1rem' }}>{item.title || item.name || item.key}</h3>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><Edit size={16} /></button>
                                            <button onClick={() => handleDelete(item._id)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><Trash size={16} /></button>
                                        </div>
                                    </div>
                                    {item.imageUrl && <img src={item.imageUrl} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} alt="" />}
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{item.subtitle || item.description || (item.category && `Category: ${item.category}`)}</p>
                                    {item.price && <div style={{ fontWeight: 'bold', marginTop: '1rem', fontSize: '0.9rem' }}>{item.price}</div>}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <AdminModal
                isOpen={isModalOpen}
                type={activeTab}
                editingItem={editingItem}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateOrUpdate}
            />

            <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        
        @media (max-width: 900px) {
          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .sidebar-toggle-btn {
            display: block !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
        </div>
    );
};

export default AdminDashboard;
