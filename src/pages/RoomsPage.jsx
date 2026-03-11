import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import RoomCard from '../components/RoomCard';
import { LayoutGrid, Layers, MapPin, Search } from 'lucide-react';

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/rooms`);
                setRooms(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching rooms:', err);
                setLoading(false);
            }
        };
        fetchRooms();
        window.scrollTo(0, 0);
    }, []);

    const categories = ['All', ...new Set(rooms.map(room => room.category || 'Single Room'))];

    const filteredRooms = rooms.filter(room => {
        const matchesFilter = filter === 'All' || (room.category || 'Single Room') === filter;
        const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (room.subtitle || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <motion.div 
            className="rooms-page-container" style={{ minHeight: '100vh', background: 'var(--navy)', color: 'var(--text-primary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <Background />
            <Navigation />

            <div style={{ paddingTop: '140px', paddingBottom: '8rem', maxWidth: '1400px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <header className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
                        Explore Our <span className="gold-text">Lofts</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
                        Find the perfect space for your academic journey. From private singles to social sharing lofts.
                    </p>
                </header>

                <div className="filter-bar reveal" style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                    gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap',
                    background: 'var(--glass)', padding: '1.5rem', borderRadius: '24px',
                    border: '1px solid var(--glass-border)'
                }}>
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setFilter(cat)}
                                style={{
                                    padding: '0.6rem 1.5rem',
                                    borderRadius: '12px',
                                    border: filter === cat ? '1px solid var(--gold)' : '1px solid var(--glass-border)',
                                    background: filter === cat ? 'rgba(197, 160, 89, 0.1)' : 'transparent',
                                    color: filter === cat ? 'var(--gold)' : 'var(--text-secondary)',
                                    fontWeight: 800,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div style={{ position: 'relative', flex: 1, maxWidth: '350px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                        <input 
                            type="text" 
                            placeholder="Search rooms..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem 1rem 0.8rem 3rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <div className="rooms-grid">
                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                            {Array(4).fill(0).map((_, i) => (
                                <div key={i} style={{ height: '400px', background: 'var(--glass)', borderRadius: '24px' }}></div>
                            ))}
                        </div>
                    ) : filteredRooms.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                            {filteredRooms.map((room, i) => (
                                <motion.div 
                                    key={room._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <RoomCard {...room} image={room.imageUrl} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>
                            <LayoutGrid size={48} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
                            <h3>No lofts matching your criteria.</h3>
                            <button onClick={() => { setFilter('All'); setSearchTerm(''); }} style={{ color: 'var(--gold)', background: 'transparent', border: 'none', cursor: 'pointer', marginTop: '1rem', fontWeight: 'bold' }}>Clear Filters</button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            <style>{`
                .rooms-grid {
                    perspective: 1000px;
                }
                .gold-text {
                    background: var(--gold-gradient);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </motion.div>
    );
};

export default RoomsPage;
