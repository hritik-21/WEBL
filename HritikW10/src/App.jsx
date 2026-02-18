import React, { useState, useEffect } from 'react';
import {
    Pill,
    Thermometer,
    Wind,
    Activity,
    ShieldAlert,
    AlertTriangle,
    Clock,
    Utensils,
    Droplets,
    HelpCircle,
    CheckCircle2,
    XCircle,
    MessageSquare,
    ChevronRight,
    Info
} from 'lucide-react';
import './App.css';

const SCENARIOS = {
    fever: {
        id: 'fever',
        label: 'Fever & Headaches',
        icon: <Thermometer size={24} />,
        color: '#ef4444',
        medicine: 'Paracetamol / Acetaminophen',
        timing: 'Every 4-6 hours as needed.',
        food: 'Can be taken with or without food. If stomach is sensitive, take with a light snack.',
        frequency: 'Max 4,000mg per 24 hours (usually 8 tablets of 500mg).',
        hydration: 'Drink plenty of water. Fever causes fluid loss through sweating.',
        missedDose: 'Take it as soon as you remember. If it’s almost time for the next dose, skip the missed one. Never double up.',
        interactions: 'Avoid Alcohol. It significantly increases risk of liver damage when combined with Paracetamol.',
        sideEffects: {
            common: ['Nausea', 'Stomach pain', 'Headache'],
            rare: ['Skin rash', 'Swelling'],
            emergency: ['Yellowing of skin/eyes (jaundice)', 'Severe allergic reaction']
        }
    },
    cold: {
        id: 'cold',
        label: 'Cold & Cough',
        icon: <Wind size={24} />,
        color: '#3b82f6',
        medicine: 'Anti-histamines / Decongestants',
        timing: 'Specific to medicine. Daytime vs Nighttime formulas vary.',
        food: 'Best taken after food to prevent mild gastrointestinal upset.',
        frequency: 'Follow label strictly. Often once every 12-24 hours for non-drowsy meds.',
        hydration: 'Warm liquids help thin mucus and soothe the throat.',
        missedDose: 'Take if remembered within 4 hours. Otherwise, wait for next scheduled dose.',
        interactions: 'Milk/Dairy can interfere with certain cough syrups. Wait 30 mins after consuming dairy.',
        sideEffects: {
            common: ['Drowsiness (Night formula)', 'Dry mouth', 'Dizziness'],
            rare: ['Rapid heartbeat', 'Insomnia'],
            emergency: ['Hallucinations', 'Seizures']
        }
    },
    antibiotics: {
        id: 'antibiotics',
        label: 'Antibiotics',
        icon: <ShieldAlert size={24} />,
        color: '#10b981',
        medicine: 'Amoxicillin / Azithromycin',
        timing: 'Strict intervals (e.g., every 8 or 12 hours).',
        food: 'Depends on type. Some need empty stomach (1h before/2h after food), others need food to avoid upset.',
        frequency: 'MUST complete the full course even if symptoms disappear.',
        hydration: 'High hydration required to help kidneys process the medication.',
        missedDose: 'Crucial: Take immediately unless it’s very close to next dose. Missing doses leads to antibiotic resistance.',
        interactions: 'NO DAIRY within 2 hours of taking Ciprofloxacin or Tetracycline. No Alcohol with Metronidazole.',
        sideEffects: {
            common: ['Diarrhea', 'Mild stomach cramps'],
            rare: ['Yeast infections', 'Fungal growth'],
            emergency: ['Severe watery diarrhea', 'Extreme skin blistering']
        }
    },
    vitamins: {
        id: 'vitamins',
        label: 'Vitamin Supplements',
        icon: <Activity size={24} />,
        color: '#f59e0b',
        medicine: 'Multivitamins / Vitamin D / Iron',
        timing: 'Usually mornings. Vitamin D is best with the largest meal.',
        food: 'Fat-soluble vitamins (A, D, E, K) MUST be taken with food containing fat for absorption.',
        frequency: 'Once daily is typical.',
        hydration: 'Iron supplements should be taken with Vitamin C (Orange juice) for 3x better absorption.',
        missedDose: 'If you miss a day, just continue the next day. No rush, vitamins are for long-term support.',
        interactions: 'Coffee/Tea prevents Iron absorption. Wait at least 1 hour after caffeine.',
        sideEffects: {
            common: ['Metallic taste', 'Bright yellow urine (B-vitamins)'],
            rare: ['Constipation (Iron)', 'Nausea'],
            emergency: ['Vomiting blood', 'Extreme abdominal pain']
        }
    },
    painkillers: {
        id: 'painkillers',
        label: 'Pain Management',
        icon: <Pill size={24} />,
        color: '#8b5cf6',
        medicine: 'NSAIDs (Ibuprofen / Naproxen)',
        timing: 'Every 8-12 hours.',
        food: 'MANDATORY: Always take after a full meal to protect the stomach lining.',
        frequency: 'Short term use only (under 10 days) unless prescribed.',
        hydration: 'Moderate hydration. Avoid dehydration as it stresses the kidneys on NSAIDs.',
        missedDose: 'If pain persists, take when remembered. If it’s gone, do not take the missed dose.',
        interactions: 'Aspirin or other blood thinners. Taking multiple NSAIDs increases bleeding risk significantly.',
        sideEffects: {
            common: ['Stomach burning', 'Indigestion'],
            rare: ['Ringing in ears', 'Blurred vision'],
            emergency: ['Black/tarry stools', 'Chest pain', 'Shortness of breath']
        }
    }
};

function App() {
    const [currentScenario, setCurrentScenario] = useState('fever');
    const [activeTab, setActiveTab] = useState('dosage'); // dosage, interactions, sideeffects

    const data = SCENARIOS[currentScenario];



    return (
        <div className="dose-app">
            {/* Hero Section */}
            <header className="hero">
                <div className="container">
                    <div className="hero-content animate-fade">
                        <div className="badge">
                            <Pill size={16} /> Digital Pharmacist Assistant
                        </div>
                        <h1>Medicines work best <br /><span>when taken right.</span></h1>
                        <p className="hero-sub">DoseWise helps you navigate the "how" and "why" of your medication with smart, behavior-focused guidance.</p>
                        <div className="hero-cta">
                            <a href="#scenarios" className="btn-primary">Identify Your Scenario <ChevronRight size={18} /></a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Section 1: Scenarios */}
            <section id="scenarios" className="scenarios-section">
                <div className="container">
                    <div className="section-title">
                        <span>Step 1</span>
                        <h2>Select Your Current Situation</h2>
                        <p>Tell us what you're managing today for tailored safety logic.</p>
                    </div>

                    <div className="scenario-grid">
                        {Object.values(SCENARIOS).map((scenario) => (
                            <button
                                key={scenario.id}
                                className={`scenario-card glass ${currentScenario === scenario.id ? 'active' : ''}`}
                                onClick={() => {
                                    setCurrentScenario(scenario.id);
                                }}
                                style={{ '--accent-color': scenario.color }}
                            >
                                <div className="scenario-icon" style={{ background: `${scenario.color}15`, color: scenario.color }}>
                                    {scenario.icon}
                                </div>
                                <h3>{scenario.label}</h3>
                                <p>Logic for {scenario.medicine.split(' ')[0]}...</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dynamic Content Section */}
            <section className="dynamic-info bg-white">
                <div className="container">
                    <div className="layout-grid">
                        {/* Left Column: Smart Dosage & Simulation */}
                        <div className="info-main">
                            <div className="tab-navigation">
                                <button className={activeTab === 'dosage' ? 'active' : ''} onClick={() => setActiveTab('dosage')}>Usage Logic</button>
                                <button className={activeTab === 'interactions' ? 'active' : ''} onClick={() => setActiveTab('interactions')}>Interactions</button>
                                <button className={activeTab === 'sideeffects' ? 'active' : ''} onClick={() => setActiveTab('sideeffects')}>Side Effects</button>
                            </div>

                            <div className="tab-content glass">
                                {activeTab === 'dosage' && (
                                    <div className="dosage-guide animate-fade">
                                        <div className="guide-item">
                                            <Clock className="guide-icon" />
                                            <div>
                                                <h4>When to Take</h4>
                                                <p>{data.timing}</p>
                                            </div>
                                        </div>
                                        <div className="guide-item">
                                            <Utensils className="guide-icon" />
                                            <div>
                                                <h4>Food Requirement</h4>
                                                <p>{data.food}</p>
                                            </div>
                                        </div>
                                        <div className="guide-item">
                                            <Droplets className="guide-icon" />
                                            <div>
                                                <h4>Optimal Hydration</h4>
                                                <p>{data.hydration}</p>
                                            </div>
                                        </div>
                                        <div className="guide-item highlight">
                                            <HelpCircle className="guide-icon" />
                                            <div>
                                                <h4>Frequency Check</h4>
                                                <p>{data.frequency}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'interactions' && (
                                    <div className="interactions-panel animate-fade">
                                        <div className="alert-card danger">
                                            <AlertTriangle size={32} />
                                            <div>
                                                <h4>Critical Awareness</h4>
                                                <p>{data.interactions}</p>
                                            </div>
                                        </div>
                                        <p className="interaction-disclaimer">Pharmacist Note: Always check with your doctor before combining new supplements with chronic medications like blood pressure or diabetic meds.</p>
                                    </div>
                                )}

                                {activeTab === 'sideeffects' && (
                                    <div className="side-effects-radar animate-fade">
                                        <div className="radar-grid">
                                            <div className="radar-item common">
                                                <div className="radar-dot"></div>
                                                <h5>Common</h5>
                                                <ul>
                                                    {data.sideEffects.common.map((eff, i) => <li key={i}>{eff}</li>)}
                                                </ul>
                                            </div>
                                            <div className="radar-item rare">
                                                <div className="radar-dot"></div>
                                                <h5>Rare</h5>
                                                <ul>
                                                    {data.sideEffects.rare.map((eff, i) => <li key={i}>{eff}</li>)}
                                                </ul>
                                            </div>
                                            <div className="radar-item emergency">
                                                <div className="radar-dot"></div>
                                                <h5>Emergency</h5>
                                                <ul>
                                                    {data.sideEffects.emergency.map((eff, i) => <li key={i}>{eff}</li>)}
                                                </ul>
                                                <span className="call-hint">Seek help immediately</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>


                        </div>

                        {/* Right Column: Visual Aids / Summary */}
                        <div className="info-sidebar">
                            <div className="summary-card glass" style={{ borderColor: data.color }}>
                                <div className="card-top" style={{ color: data.color }}>
                                    <Info size={32} />
                                    <h3>Pharmacist Summary</h3>
                                </div>
                                <div className="summary-list">
                                    <div className="sum-item">
                                        <strong>Primary Medicine</strong>
                                        <span>{data.medicine}</span>
                                    </div>
                                    <div className="sum-item">
                                        <strong>Food Interaction</strong>
                                        <span className="warning-text">{data.interactions.split('.')[0]}</span>
                                    </div>
                                    <div className="sum-item">
                                        <strong>Compliance</strong>
                                        <span>{data.frequency.split('.')[0]}</span>
                                    </div>
                                </div>
                                <div className="summary-footer">
                                    <p>Remember: DoseWise is a guide, not a prescription provider. Always follow the label.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
                <div className="container">
                    <div className="contact-card glass">
                        <div className="contact-header">
                            <MessageSquare size={32} />
                            <div>
                                <h2>Need more clarity?</h2>
                                <p>Our licensed pharmacists are online for quick behavioral questions.</p>
                            </div>
                        </div>
                        <form className="contact-form" onSubmit={(e) => {
                            e.preventDefault();
                            alert("Message sent! A pharmacist will get back to you within 15 minutes.");
                        }}>
                            <div className="form-row">
                                <input type="text" placeholder="Your Name" required />
                                <input type="text" placeholder="Medicine Name" required />
                            </div>
                            <textarea placeholder="Describe your concern (e.g. I took my dose with coffee, should I be worried?)" required></textarea>
                            <button type="submit" className="btn-primary">Ask a Pharmacist Now</button>
                        </form>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <p>&copy; 2026 DoseWise Digital Health. Built for Safe Medication Usage.</p>
                    <div className="footer-links">
                        <a href="#">Privacy</a>
                        <a href="#">Safety Guidelines</a>
                        <a href="#">Terms of Use</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
