import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { 
    Plus, Edit, Trash, LogOut, Coffee, Home, Settings, Shield, 
    RefreshCw, Menu, Wrench, AlertCircle, User, Bell, Search, 
    Image as ImageIcon, Moon, Sun, ArrowRight, Download, Database, Zap 
} from 'lucide-react';
import AdminModal from '../components/AdminModal';
import SkeletonLoader from '../components/SkeletonLoader';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';

const AdminDashboard = ({ token, setToken }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
    const [searchQuery, setSearchQuery] = useState('');
    const userRole = localStorage.getItem('userRole') || 'student';

    const fetchData = React.useCallback(async () => {
        setLoading(true);
        try {
            let endpoint = activeTab;
            if (activeTab === 'settings') endpoint = 'settings';
            if (activeTab === 'admins') endpoint = 'auth/users';
            
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

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        window.dispatchEvent(new Event('themeChanged'));
    };

    useEffect(() => {
        const handleThemeUpdate = () => {
            setTheme(localStorage.getItem('theme') || 'system');
        };
        window.addEventListener('themeChanged', handleThemeUpdate);
        return () => window.removeEventListener('themeChanged', handleThemeUpdate);
    }, []);

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
                await axios.post(`${API_BASE_URL}/api/settings`, formData, config);
                addToast('Universal settings updated', 'success');
            } else if (editingItem) {
                await axios.patch(`${API_BASE_URL}/api/${activeTab}/${editingItem._id}`, formData, config);
                addToast('Updated successfully', 'success');
            } else {
                await axios.post(`${API_BASE_URL}/api/${activeTab}`, formData, config);
                addToast('Created successfully', 'success');
            }
            fetchData();
        } catch (error) {
            console.error('Update operation failed:', error);
            addToast('Operation failed', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            let endpoint = activeTab;
            if (activeTab === 'tickets') {
                addToast('Maintenance tickets cannot be deleted from here.', 'info');
                return;
            }
            if (activeTab === 'admins') endpoint = 'auth/users';
            
            await axios.delete(`${API_BASE_URL}/api/${endpoint}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            addToast('Deleted successfully', 'success');
            fetchData();
        } catch (error) {
            console.error('Delete operation failed:', error);
            addToast('Delete failed', 'error');
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
            addToast('Backup downloaded safely.', 'success');
        } catch (error) {
            console.error('Backup download failed:', error);
            addToast('Backup failed. Authentication required.', 'error');
        }
    };

    const handleExportCSV = () => {
        if (!filteredData || filteredData.length === 0) {
            addToast('No data to export', 'info');
            return;
        }
        const headers = Object.keys(filteredData[0]).filter(k => k !== '_id' && k !== '__v');
        const csvRows = [headers.join(',')];
        for (const row of filteredData) {
            const values = headers.map(header => {
                const escaped = ('' + (row[header] || '')).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${activeTab}_export_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        addToast('CSV exported safely.', 'success');
    };

    const handleFactoryReset = async () => {
        const confirm1 = window.confirm('WARNING: Irreversibly delete ALL operational data?');
        if (!confirm1) return;
        const confirm2 = window.prompt('Type "RESET" to confirm system wipe:');
        if (confirm2 !== 'RESET') {
            addToast('Factory reset aborted.', 'info');
            return;
        }
        try {
            await axios.delete(`${API_BASE_URL}/api/settings/factory-reset`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            addToast('SYSTEM WIPED SUCCESSFULLY', 'success');
            fetchData();
        } catch (error) {
            console.error('Factory reset failed:', error);
            addToast('Reset failed. Authorization error.', 'error');
        }
    };

    const tabs = [
        { id: 'home', name: 'Commander', icon: <Zap size={18} /> },
        { id: 'settings', name: 'Engine', icon: <Settings size={18} />, adminOnly: true },
        { id: 'admins', name: 'Personnel', icon: <User size={18} />, adminOnly: true },
        { id: 'rooms', name: 'Residences', icon: <Home size={18} /> },
        { id: 'amenities', name: 'Facilities', icon: <Shield size={18} /> },
        { id: 'cafeteria', name: 'Cafe', icon: <Coffee size={18} /> },
        { id: 'events', name: 'Protocol', icon: <Bell size={18} /> },
        { id: 'tickets', name: 'Work Orders', icon: <Wrench size={18} /> },
    ].filter(tab => !tab.adminOnly || userRole === 'admin');

    const filteredData = Array.isArray(data) ? data.filter(item => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            (item.name && item.name.toLowerCase().includes(q)) ||
            (item.title && item.title.toLowerCase().includes(q)) ||
            (item.username && item.username.toLowerCase().includes(q)) ||
            (item.email && item.email.toLowerCase().includes(q)) ||
            (item.studentNumber && item.studentNumber.toLowerCase().includes(q)) ||
            (item.roomNumber && item.roomNumber.toLowerCase().includes(q))
        );
    }) : [];

    return (
        <div className="admin-dashboard-root" style={{
            display: 'flex',
            minHeight: '100vh',
            background: 'var(--navy)',
            color: 'var(--text-primary)',
            position: 'relative'
        }}>
            {/* Sidebar Mobile Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1400, backdropFilter: 'blur(10px)' }}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Header */}
            <header className="admin-mobile-header" style={{
                display: 'none',
                position: 'fixed',
                top: 0, left: 0, right: 0,
                height: '80px',
                background: 'var(--nav-bg)',
                backdropFilter: 'blur(30px)',
                borderBottom: '1px solid var(--glass-border)',
                padding: '0 1.5rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 1300
            }}>
                <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'var(--gold)', padding: '0.8rem', borderRadius: '14px' }}>
                    <Menu size={24} />
                </button>
                <h2 style={{ fontSize: '1.2rem', color: 'var(--gold)', fontWeight: 900, letterSpacing: '2px' }}>COMMAND</h2>
            </header>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`} style={{
                width: '280px',
                background: 'var(--glass-deep)',
                backdropFilter: 'blur(60px)',
                borderRight: '1px solid var(--glass-border)',
                padding: '2.5rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                position: 'fixed',
                left: 0, top: 0,
                zIndex: 2000,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '30px 0 60px rgba(0,0,0,0.3)'
            }}>
                <div style={{ padding: '0 1rem', marginBottom: '4rem' }}>
                    <h2 style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '2px' }}>FIVE EIGHT 9</h2>
                    <p style={{ fontSize: '0.6rem', fontWeight: 800, opacity: 0.5, letterSpacing: '3px', marginTop: '0.5rem' }}>INTERNAL COMMAND</p>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                            style={{ 
                                width: '100%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '1.2rem', 
                                padding: '1.1rem 1.5rem', 
                                background: activeTab === tab.id ? 'var(--gold-glow)' : 'transparent', 
                                border: '1px solid',
                                borderColor: activeTab === tab.id ? 'rgba(197,160,89,0.2)' : 'transparent',
                                color: activeTab === tab.id ? 'var(--gold)' : 'var(--text-secondary)', 
                                borderRadius: '18px', 
                                cursor: 'pointer',
                                textAlign: 'left', 
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                                fontWeight: activeTab === tab.id ? 900 : 600,
                                fontSize: '0.9rem'
                            }}
                        >
                            {tab.icon} {tab.name.toUpperCase()}
                        </button>
                    ))}
                </nav>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                    <button onClick={toggleTheme} style={{
                        width: '100%', padding: '1rem', borderRadius: '14px', background: 'var(--glass)', border: '1px solid var(--glass-border)',
                        color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', fontWeight: 700
                    }}>
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        <span>{theme.toUpperCase()} MODE</span>
                    </button>
                    <button onClick={() => { setToken(null); localStorage.removeItem('adminToken'); }} style={{
                        width: '100%', padding: '1rem', color: '#ff4d4d', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 900, letterSpacing: '1px'
                    }}>
                        <LogOut size={18} style={{ marginRight: '1rem' }} /> TERMINATE SESSION
                    </button>
                </div>
            </aside>

            {/* Content Area */}
            <main style={{ 
                flex: 1, 
                padding: 'clamp(2rem, 6vw, 4rem)',
                paddingLeft: 'calc(280px + clamp(2rem, 6vw, 4rem))',
                width: '100%',
                transition: 'all 0.4s ease'
            }} className="admin-content-main">
                
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem', gap: '2rem', flexWrap: 'wrap' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--gold)', fontWeight: 900, fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '0.8rem' }}>
                            <div style={{ width: '8px', height: '8px', background: 'var(--gold)', borderRadius: '50%' }}></div>
                            AUTHENTICATED SESSION: {userRole.toUpperCase()}
                        </div>
                        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, letterSpacing: '-1px', textTransform: 'capitalize' }}>
                            {activeTab} <span className="gold-text">Interface</span>
                        </h1>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                         <button onClick={fetchData} style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', cursor: 'pointer' }}>
                            <RefreshCw size={20} className={loading ? 'spin' : ''} />
                        </button>
                        {activeTab !== 'settings' && activeTab !== 'tickets' && activeTab !== 'home' && (
                            <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="cta-button" style={{ height: '50px', padding: '0 2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Plus size={20} /> INITIALIZE NEW
                            </button>
                        )}
                    </div>
                </header>

                {loading ? (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <SkeletonLoader height="100px" borderRadius="24px" />
                        <SkeletonLoader height="100px" borderRadius="24px" />
                        <SkeletonLoader height="100px" borderRadius="24px" />
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {activeTab === 'home' ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                                    {[
                                        { title: 'Room Inventory', desc: 'Secureloft management and status control.', icon: <Home size={32} />, tab: 'rooms' },
                                        { title: 'Personnel', desc: 'Manage access levels and identity records.', icon: <User size={32} />, tab: 'admins' },
                                        { title: 'Maintenance', desc: 'Real-time work order fulfillment tracking.', icon: <Wrench size={32} />, tab: 'tickets' },
                                        { title: 'Site Engine', desc: 'Core infrastructure and media configuration.', icon: <Settings size={32} />, tab: 'settings' }
                                    ].map((card, i) => (
                                        <motion.div 
                                            key={i}
                                            whileHover={{ y: -10 }}
                                            style={{ background: 'var(--glass-deep)', padding: '3.5rem 2.5rem', borderRadius: '35px', border: '1px solid var(--glass-border)', textAlign: 'center' }}
                                        >
                                            <div style={{ color: 'var(--gold)', margin: '0 auto 2rem', background: 'rgba(197,160,89,0.1)', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px' }}>
                                                {card.icon}
                                            </div>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 900 }}>{card.title}</h3>
                                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>{card.desc}</p>
                                            <button onClick={() => setActiveTab(card.tab)} className="cta-button" style={{ width: '100%', padding: '1.2rem', borderRadius: '16px' }}>
                                                CONNECT <ArrowRight size={18} style={{ marginLeft: '1rem' }} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : activeTab === 'settings' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '1000px' }}>
                                    {[
                                        { title: 'Universal Configuration', desc: 'Manage global visibility, social nodes, and emergency triggers.', icon: <Settings />, action: () => { setEditingItem(data); setIsModalOpen(true); }, label: 'CONFIG INTERFACE' },
                                        { title: 'Visual Gallery', desc: 'Update building architecture and lifestyle media streams.', icon: <ImageIcon />, action: () => { setEditingItem({ ...data, isBuildingGallery: true }); setIsModalOpen(true); }, label: 'MEDIA MANAGER' },
                                        { title: 'Nexus Backup', desc: 'Download a complete encrypted snapshot of the system state.', icon: <Database />, action: handleDownloadBackup, label: 'EXPORT DATACORE', variant: 'success' },
                                        { title: 'Core Reset', desc: 'Terminate all operational data for system re-initialization.', icon: <AlertCircle />, action: handleFactoryReset, label: 'FACTORY PURGE', variant: 'danger' }
                                    ].map((item, i) => (
                                        <div key={i} style={{ 
                                            background: 'var(--glass-deep)', 
                                            padding: '3rem', 
                                            borderRadius: '35px', 
                                            border: '1px solid var(--glass-border)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: '3rem',
                                            flexWrap: 'wrap'
                                        }}>
                                            <div style={{ flex: 1, minWidth: '300px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                                                    <div style={{ color: item.variant === 'danger' ? '#ff4d4d' : item.variant === 'success' ? '#4ade80' : 'var(--gold)', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px' }}>
                                                        {React.cloneElement(item.icon, { size: 32 })}
                                                    </div>
                                                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900 }}>{item.title}</h3>
                                                </div>
                                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.1rem' }}>{item.desc}</p>
                                            </div>
                                            <button 
                                                onClick={item.action} 
                                                className={item.variant === 'danger' ? '' : 'cta-button'}
                                                style={{ 
                                                    padding: '1.2rem 2.5rem', 
                                                    borderRadius: '16px',
                                                    fontWeight: 900,
                                                    letterSpacing: '1px',
                                                    background: item.variant === 'danger' ? 'rgba(255, 77, 77, 0.1)' : undefined,
                                                    border: item.variant === 'danger' ? '1px solid #ff4d4d' : undefined,
                                                    color: item.variant === 'danger' ? '#ff4d4d' : undefined,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {item.label}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                                    {filteredData.length > 0 ? filteredData.map((item, i) => (
                                        <motion.div 
                                            key={item._id || i}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            style={{ background: 'var(--glass-deep)', padding: '2.5rem', borderRadius: '32px', border: '1px solid var(--glass-border)', position: 'relative' }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                                <div>
                                                    <h3 style={{ color: 'var(--gold)', fontSize: '1.2rem', fontWeight: 900 }}>{item.title || item.name || item.username}</h3>
                                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 700 }}>{item.category || item.email || item.studentNumber}</p>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.8rem' }}>
                                                    <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text-primary)', cursor: 'pointer' }}><Edit size={16} /></button>
                                                    <button onClick={() => handleDelete(item._id)} style={{ padding: '0.6rem', background: 'rgba(255, 77, 77, 0.1)', border: '1px solid rgba(255, 77, 77, 0.2)', borderRadius: '10px', color: '#ff4d4d', cursor: 'pointer' }}><Trash size={16} /></button>
                                                </div>
                                            </div>
                                            {(item.imageUrl || item.profilePictureUrl) && (
                                                <img 
                                                    src={item.profilePictureUrl || item.imageUrl} 
                                                    style={{ 
                                                        width: '100%', 
                                                        height: activeTab === 'admins' ? '250px' : '180px', 
                                                        objectFit: 'cover', 
                                                        borderRadius: '20px', 
                                                        marginBottom: '1.5rem', 
                                                        border: '1px solid var(--glass-border)',
                                                        filter: activeTab === 'admins' ? 'grayscale(0.2) contrast(1.1)' : 'none'
                                                    }} 
                                                    alt="" 
                                                />
                                            )}
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.description || item.subtitle || (item.text && item.text.substring(0, 100) + '...')}</p>
                                            {activeTab === 'admins' && (
                                                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', fontSize: '0.8rem', fontWeight: 800 }}>
                                                    <span style={{ color: 'var(--gold)' }}>ACCESS LEVEL:</span> {item.role.toUpperCase()}
                                                </div>
                                            )}
                                        </motion.div>
                                    )) : (
                                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '10rem 2rem', background: 'var(--glass-deep)', borderRadius: '40px', border: '1px dashed var(--glass-border)' }}>
                                            <Database size={64} style={{ color: 'var(--gold)', opacity: 0.1, marginBottom: '2rem', margin: '0 auto 2rem', display: 'block' }} />
                                            <h3 style={{ fontSize: '1.5rem', opacity: 0.5 }}>CORES EMPTY</h3>
                                            <p style={{ opacity: 0.3 }}>No records detected in this interface.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </main>

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
                
                @media (max-width: 1150px) {
                    .admin-sidebar { transform: translateX(-100%); width: 300px !important; }
                    .admin-sidebar.open { transform: translateX(0); }
                    .admin-content-main { padding-left: clamp(1rem, 5vw, 2rem) !important; padding-top: 120px !important; }
                    .admin-mobile-header { display: flex !important; }
                    .hide-on-mobile { display: none !important; }
                }

                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(197, 160, 89, 0.2); borderRadius: 10px; }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
