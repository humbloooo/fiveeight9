import React, { useState } from 'react';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Calculator, Zap, Droplets, Wifi, Shield } from 'lucide-react';

const RentCalculator = () => {
    const [baseRent, setBaseRent] = useState(4400);
    const [isSharing, setIsSharing] = useState(false);
    const [addons, setAddons] = useState({
        parking: false,
        laundry: false,
        mealPlan: false
    });

    const totals = {
        rent: baseRent,
        addons: (addons.parking ? 250 : 0) + (addons.laundry ? 150 : 0) + (addons.mealPlan ? 1200 : 0),
    };

    const finalTotal = totals.rent + totals.addons;

    return (
        <div className="app-container">
            <Background />
            <Navigation />
            <main style={{ paddingTop: '120px' }}>
                <section className="section">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 className="section-title">Rent <span>Calculator</span></h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Estimate your monthly costs for self-funded students.</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '3rem',
                        width: '100%',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {/* Configuration */}
                        <div style={{ background: 'var(--glass)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                            <h3 style={{ color: 'var(--gold)', marginBottom: '2rem' }}>Your Stay</h3>

                            <div style={{ marginBottom: '2.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Room Type</label>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        onClick={() => { setIsSharing(false); setBaseRent(4400); }}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            background: !isSharing ? 'var(--gold-glow)' : 'transparent',
                                            border: `1px solid ${!isSharing ? 'var(--gold)' : 'var(--glass-border)'}`,
                                            color: !isSharing ? 'var(--gold)' : 'white',
                                            borderRadius: '8px',
                                            cursor: 'pointer'
                                        }}
                                    >Single</button>
                                    <button
                                        onClick={() => { setIsSharing(true); setBaseRent(4400); }}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            background: isSharing ? 'var(--gold-glow)' : 'transparent',
                                            border: `1px solid ${isSharing ? 'var(--gold)' : 'var(--glass-border)'}`,
                                            color: isSharing ? 'var(--gold)' : 'white',
                                            borderRadius: '8px',
                                            cursor: 'pointer'
                                        }}
                                    >Sharing</button>
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Monthly Add-ons</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={addons.parking} onChange={(e) => setAddons({ ...addons, parking: e.target.checked })} />
                                        Secure Parking (+R250)
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={addons.laundry} onChange={(e) => setAddons({ ...addons, laundry: e.target.checked })} />
                                        Unlimited Laundry (+R150)
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={addons.mealPlan} onChange={(e) => setAddons({ ...addons, mealPlan: e.target.checked })} />
                                        Cafeteria Meal Plan (+R1,200)
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Breakdown */}
                        <div style={{
                            background: 'var(--gold)',
                            color: 'var(--navy)',
                            padding: '2.5rem',
                            borderRadius: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                        }}>
                            <h3 style={{ fontWeight: 900, marginBottom: '2rem', borderBottom: '2px solid rgba(0,0,0,0.1)', paddingBottom: '1rem' }}>Cost Breakdown</h3>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span>Base Rent</span>
                                    <span style={{ fontWeight: 800 }}>R{totals.rent}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span>Electricity (Solar Included)</span>
                                    <span style={{ fontWeight: 800 }}>R0</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span>Uncapped Wi-Fi</span>
                                    <span style={{ fontWeight: 800 }}>R0</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span>Add-ons Total</span>
                                    <span style={{ fontWeight: 800 }}>R{totals.addons}</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '2px dashed rgba(0,0,0,0.2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>MONTHLY TOTAL</span>
                                    <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>R{finalTotal}</span>
                                </div>
                            </div>

                            <button className="cta-button" style={{ marginTop: '2rem', background: 'var(--text-primary)', color: 'var(--navy)', width: '100%' }}>SUBMIT APPLICATION</button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default RentCalculator;
