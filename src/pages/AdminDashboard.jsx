import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash, LogOut, Coffee, Home, Settings, Shield, RefreshCw } from 'lucide-react';
import AdminModal from '../components/AdminModal';

const AdminDashboard = ({ token, setToken }) => {
    const [activeTab, setActiveTab] = useState('rooms');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/${activeTab}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(res.data);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) handleLogout();
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleCreateOrUpdate = async (formData) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            if (editingItem) {
                await axios.patch(`http://localhost:5000/api/${activeTab}/${editingItem._id}`, formData, config);
                setMessage({ type: 'success', text: 'Updated successfully' });
            } else {
                await axios.post(`http://localhost:5000/api/${activeTab}`, formData, config);
                setMessage({ type: 'success', text: 'Created successfully' });
            }
            fetchData();
        } catch (err) {
            setMessage({ type: 'error', text: 'Operation failed' });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/${activeTab}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage({ type: 'success', text: 'Deleted successfully' });
            fetchData();
        } catch (err) {
            setMessage({ type: 'error', text: 'Delete failed' });
        }
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('adminToken');
    };

    const tabs = [
        { id: 'rooms', name: 'Rooms', icon: <Home size={18} /> },
        { id: 'amenities', name: 'Amenities', icon: <Shield size={18} /> },
        { id: 'cafeteria', name: 'Nari\'s Cafe', icon: <Coffee size={18} /> },
        { id: 'settings', name: 'Settings', icon: <Settings size={18} /> },
    ];

    return (
        <div className="admin-dashboard" style={{ display: 'flex', minHeight: '100vh', background: '#050a1a', color: 'white' }}>
            {/* Sidebar - Same as before */}
            <div style={{ width: '260px', background: 'rgba(5, 10, 26, 0.95)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ color: '#C5A059', marginBottom: '3rem', fontSize: '1.2rem', padding: '0 1rem', fontWeight: 900 }}>Admin Console</h2>
                <nav style={{ flex: 1 }}>
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: activeTab === tab.id ? 'rgba(197, 160, 89, 0.1)' : 'transparent', border: 'none', color: activeTab === tab.id ? '#C5A059' : '#a0aec0', borderRadius: '8px', cursor: 'pointer', marginBottom: '0.5rem', textAlign: 'left', transition: 'all 0.3s ease', fontWeight: activeTab === tab.id ? 'bold' : 'normal' }}>
                            {tab.icon} {tab.name}
                        </button>
                    ))}
                </nav>
                <button onClick={handleLogout} style={{ marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}>
                    <LogOut size={18} /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', textTransform: 'capitalize', marginBottom: '0.5rem' }}>{activeTab}</h1>
                        <p style={{ color: '#a0aec0' }}>Manage your website content dynamically.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={fetchData} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.6rem', borderRadius: '8px', cursor: 'pointer' }}>
                            <RefreshCw size={18} className={loading ? 'spin' : ''} />
                        </button>
                        <button
                            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
                            className="cta-button"
                            style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <Plus size={16} /> Add New
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
                    <div style={{ color: '#C5A059' }}>Loading data...</div>
                ) : (
                    <div className="admin-list-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {data.map((item) => (
                            <div key={item._id} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h3 style={{ color: '#C5A059' }}>{item.title || item.name || item.key}</h3>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} style={{ background: 'transparent', border: 'none', color: '#a0aec0', cursor: 'pointer' }}><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(item._id)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><Trash size size={16} /></button>
                                    </div>
                                </div>
                                {item.imageUrl && <img src={item.imageUrl} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} alt="" />}
                                <p style={{ color: '#a0aec0', fontSize: '0.85rem' }}>{item.subtitle || item.description || (item.category && `Category: ${item.category}`)}</p>
                                {item.price && <div style={{ fontWeight: 'bold', marginTop: '1rem' }}>{item.price}</div>}
                            </div>
                        ))}
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
      `}</style>
        </div>
    );
};

export default AdminDashboard;
