import React, { useState } from 'react';
import Header from './components/Header.jsx';
import { Heart, Droplets, Users, Clock, Info, CheckCircle, HeartCrack, ClipboardList, Thermometer, Droplet, Phone, Scale, FileText, Activity, ArrowRight, ArrowLeft } from 'lucide-react';

const HomePage = () => {
    const [selectedType] = useState("O+");
    const [activeTab, setActiveTab] = useState("compatibility");

    const heroStyles = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef2f2 0%, #fce7f3 100%)',
    };

    const heroSectionStyles = {
        background: 'linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1rem',
        overflow: 'hidden',
    };

    const containerStyles = {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex', // changed to flex
        alignItems: 'center',
        justifyContent: 'space-between', // left + right alignment
        flexWrap: 'wrap',
        gap: '2rem',
    };

    const leftSideStyles = {
        flex: '1 1 45%',
    };

    const rightSideStyles = {
        flex: '1 1 45%',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
    };

    const titleStyles = {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        lineHeight: '1.1',
    };

    const subtitleStyles = {
        fontSize: '1.25rem',
        marginBottom: '2rem',
        color: '#fecaca',
        lineHeight: '1.6',
    };

    const buttonContainerStyles = {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
    };

    const primaryButtonStyles = {
        backgroundColor: 'white',
        color: '#dc2626',
        padding: '0.75rem 2rem',
        borderRadius: '0.5rem',
        fontWeight: '600',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
        border: 'none',
        cursor: 'pointer',
    }

    const statCardStyles = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        textAlign: 'center',
    };

    const statIconStyles = {
        width: '3rem',
        height: '3rem',
        margin: '0 auto 0.75rem auto',
        color: '#fecaca',
    };

    const statTitleStyles = {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        marginBottom: '0.25rem',
    };

    const statDescStyles = {
        color: '#fecaca',
        fontSize: '0.875rem',
    };


    const sectionStyle = {
        padding: "1.5rem 2rem",
        textAlign: "center",
    };

    const headingStyle = {
        fontSize: "2.5rem",
        color: "#dc2626",
        marginBottom: "1rem",
    };

    const textStyle = {
        maxWidth: "800px",
        margin: "0 auto 2rem",
        lineHeight: "1.6",
        fontSize: "1.1rem",
    };

    const iconRow = {
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        flexWrap: "wrap",
        marginTop: "2rem",
    };

    const iconCard = {
        backgroundColor: "#f9f9f9",
        padding: "1.5rem",
        borderRadius: "10px",
        width: "250px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    };





    // 🔹 Blood Group Compatibility Data
    const bloodData = {
        "O+": {
            canDonate: ["O+", "A+", "B+", "AB+"],
            canReceive: ["O-", "O+"],
            type: "Common Donor",
            population: "37.4%",
            details: {
                antigens: "None",
                antibodies: "Anti-A, Anti-B",
                rh: "Positive",
                note: "Most common blood type",
            },
        },
        "O-": {
            canDonate: ["All Blood Types"],
            canReceive: ["O-"],
            type: "Universal Donor",
            population: "6.6%",
            details: {
                antigens: "None",
                antibodies: "Anti-A, Anti-B",
                rh: "Negative",
                note: "Universal donor for all blood types",
            },
        },
        "A-": {
            canDonate: ["A-", "A+", "AB-", "AB+"],
            canReceive: ["A-", "O-"],
            type: "Universal Plasma Donor",
            population: "6.3%",
            details: {
                antigens: "A",
                antibodies: "Anti-B",
                rh: "Negative",
                note: "Can donate to A and AB types",
            },
        },
        "A+": {
            canDonate: ["A+", "AB+"],
            canReceive: ["A+", "A-", "O+", "O-"],
            type: "Common Type",
            population: "32.3%",
            details: {
                antigens: "A",
                antibodies: "Anti-B",
                rh: "Positive",
                note: "Second most common blood type",
            },
        },
        "B-": {
            canDonate: ["B-", "B+", "AB-", "AB+"],
            canReceive: ["B-", "O-"],
            type: "Rare Type",
            population: "1.5%",
            details: {
                antigens: "B",
                antibodies: "Anti-A",
                rh: "Negative",
                note: "Can donate to B and AB types",
            },
        },
        "B+": {
            canDonate: ["B+", "AB+"],
            canReceive: ["B+", "B-", "O+", "O-"],
            type: "Common Type",
            population: "9.4%",
            details: {
                antigens: "B",
                antibodies: "Anti-A",
                rh: "Positive",
                note: "Compatible with B and AB positive",
            },
        },
        "AB-": {
            canDonate: ["AB-", "AB+"],
            canReceive: ["A-", "B-", "AB-", "O-"],
            type: "Universal Plasma Recipient",
            population: "0.6%",
            details: {
                antigens: "A and B",
                antibodies: "None",
                rh: "Negative",
                note: "Can receive from any negative blood type",
            },
        },
        "AB+": {
            canDonate: ["AB+"],
            canReceive: ["All Blood Types"],
            type: "Universal Recipient",
            population: "3.4%",
            details: {
                antigens: "A and B",
                antibodies: "None",
                rh: "Positive",
                note: "Can receive blood from any type",
            },
        },

        // You can add more blood types (A+, A-, B+, etc.) here
    };
    const bloodTypes = [
        {
            type: "O−",
            title: "Universal Donor",
            population: "6.6% of population",
            antigens: "None",
            antibodies: "Anti-A, Anti-B",
            rhFactor: "Negative",
            note: "Most needed type, can donate to everyone",
        },
        {
            type: "O+",
            title: "Common Donor",
            population: "37.4% of population",
            antigens: "None",
            antibodies: "Anti-A, Anti-B",
            rhFactor: "Positive",
            note: "Most common blood type",
        },
        {
            type: "A−",
            title: "Rare Donor",
            population: "6.3% of population",
            antigens: "A",
            antibodies: "Anti-B",
            rhFactor: "Negative",
            note: "Can donate to A and AB types",
        },
        {
            type: "A+",
            title: "Common Donor",
            population: "35.7% of population",
            antigens: "A",
            antibodies: "Anti-B",
            rhFactor: "Positive",
            note: "Second most common type",
        },
        {
            type: "B−",
            title: "Rare Donor",
            population: "1.5% of population",
            antigens: "B",
            antibodies: "Anti-A",
            rhFactor: "Negative",
            note: "Rare blood type, high demand",
        },
        {
            type: "B+",
            title: "Common Donor",
            population: "8.5% of population",
            antigens: "B",
            antibodies: "Anti-A",
            rhFactor: "Positive",
            note: "Can donate to B and AB positive",
        },
        {
            type: "AB−",
            title: "Rare Donor",
            population: "0.6% of population",
            antigens: "A, B",
            antibodies: "None",
            rhFactor: "Negative",
            note: "Rarest blood type",
        },
        {
            type: "AB+",
            title: "Universal Receiver",
            population: "3.4% of population",
            antigens: "A, B",
            antibodies: "None",
            rhFactor: "Positive",
            note: "Can receive from all blood types",
        },
    ];

    const current = bloodData[selectedType];


    const cardContainer = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        // backgroundColor: "red",
        gap: "1.5rem",
    };

    const card = {
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        padding: "1.5rem",
        textAlign: "left",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    };

    const cardHover = {
        transform: "translateY(-5px)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    };

    const iconBox = {
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        justifyContent: "center",
    };

    const iconStyle = (color) => ({
        color,
        width: "24px",
        height: "24px",
        marginRight: "0.5rem",
    });

    const listItem = {
        display: "flex",
        alignItems: "center",
        marginBottom: "0.5rem",
        color: "#374151",
        justifyContent: "center",
    };

    const checkIcon = {
        color: "#16a34a",
        width: "18px",
        height: "18px",
        marginRight: "0.5rem",
    };
    return (
        <div>
            <Header />
            <div style={heroStyles}>
                <section style={heroSectionStyles}>
                    <div style={containerStyles}>
                        {/* Left Side */}
                        <div style={leftSideStyles}>
                            <h1 style={titleStyles}>Complete Blood Donation Guide</h1>
                            <p style={subtitleStyles}>
                                Everything you need to know about blood donation – from compatibility matching to donation criteria.
                                Make an informed decision and save lives today.
                            </p>

                            <div style={buttonContainerStyles}>
                                <a href="/donor-registration" style={primaryButtonStyles}>
                                    <Heart style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                                    Register as Donor
                                </a>

                                <a href="/receiver-register" style={primaryButtonStyles}>
                                    <HeartCrack style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                                    Request donor
                                </a>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div style={rightSideStyles}>
                            <div style={statCardStyles}>
                                <Droplets style={statIconStyles} />
                                <h3 style={statTitleStyles}>Blood Types</h3>
                                <p style={statDescStyles}>8 Different Types</p>
                            </div>

                            <div style={statCardStyles}>
                                <Users style={statIconStyles} />
                                <h3 style={statTitleStyles}>Donors Needed</h3>
                                <p style={statDescStyles}>Every 2 Seconds</p>
                            </div>

                            <div style={statCardStyles}>
                                <Heart style={statIconStyles} />
                                <h3 style={statTitleStyles}>Lives Saved</h3>
                                <p style={statDescStyles}>3 Per Donation</p>
                            </div>

                            <div style={statCardStyles}>
                                <Clock style={statIconStyles} />
                                <h3 style={statTitleStyles}>Process Time</h3>
                                <p style={statDescStyles}>8-10 Minutes</p>
                            </div>
                        </div>
                    </div >
                </section >


                <section id="about" style={{ ...sectionStyle, backgroundColor: "white", }}>
                    <h2 style={headingStyle}>What is Blood Donation?</h2>
                    <p style={textStyle}>
                        Blood donation is the process of voluntarily giving blood, which can be separated into components like red cells, plasma, and platelets.
                        These are used in surgeries, accident cases, childbirth emergencies, and for patients suffering from anemia, cancer, and blood disorders.
                    </p>
                    <div style={iconRow}>
                        <div style={iconCard}>
                            <Heart size={40} color="#dc2626" />
                            <p>Each donation can save up to 3 lives</p>
                        </div>
                        <div style={iconCard}>
                            <Users size={40} color="#dc2626" />
                            <p>Be a part of the life-saving community</p>
                        </div>
                        <div style={iconCard}>
                            <Info size={40} color="#dc2626" />
                            <p>Safe, simple, and noble act</p>
                        </div>
                    </div>
                </section>

                {/* Eligibility Criteria */}
                <section id="criteria" style={{ ...sectionStyle, backgroundColor: "#fff5f5" }}>
                    <h2 style={headingStyle}>Eligibility Criteria</h2>
                    <p style={textStyle}> Complete eligibility requirements and health criteria for safe blood donation</p>

                    <div style={cardContainer}>
                        {/* Age Requirements */}
                        <div
                            style={card}
                            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
                            onMouseLeave={(e) =>
                                Object.assign(e.currentTarget.style, {
                                    transform: "translateY(0)",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                })
                            }
                        >
                            <div style={iconBox}>
                                <Users style={iconStyle("#dc2626")} />
                                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#111827", }}>
                                    Age Requirements
                                </h3>
                            </div>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Must be between 18-65 years old",
                                    "First-time donors: 18-60 years old",
                                    "Regular donors can donate until age 65",
                                    "Parental consent required for 16-17 year olds",
                                ].map((item, i) => (
                                    <li key={i} style={listItem}>
                                        <CheckCircle style={checkIcon} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Weight & Health */}
                        <div
                            style={card}
                            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
                            onMouseLeave={(e) =>
                                Object.assign(e.currentTarget.style, {
                                    transform: "translateY(0)",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                })
                            }
                        >
                            <div style={iconBox}>
                                <Scale style={iconStyle("#dc2626")} />
                                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#111827" }}>
                                    Weight & Health
                                </h3>
                            </div>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Minimum weight: 110 lbs (50 kg)",
                                    "Good general health condition",
                                    "Normal temperature (below 99.5°F)",
                                    "Blood pressure: 90/50 to 180/100 mmHg",
                                    "Pulse rate: 50-100 beats per minute",
                                ].map((item, i) => (
                                    <li key={i} style={listItem}>
                                        <CheckCircle style={checkIcon} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Medical History */}
                        <div
                            style={card}
                            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
                            onMouseLeave={(e) =>
                                Object.assign(e.currentTarget.style, {
                                    transform: "translateY(0)",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                })
                            }
                        >
                            <div style={iconBox}>
                                <FileText style={iconStyle("#dc2626")} />
                                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#111827" }}>
                                    Medical History
                                </h3>
                            </div>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "No major surgeries in last 6 months",
                                    "No blood transfusion in last 12 months",
                                    "No tattoos/piercings in last 3 months",
                                    "No recent vaccinations (varies by type)",
                                    "No history of hepatitis, HIV, or malaria",
                                ].map((item, i) => (
                                    <li key={i} style={listItem}>
                                        <CheckCircle style={checkIcon} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Lifestyle Factors */}
                        <div
                            style={card}
                            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
                            onMouseLeave={(e) =>
                                Object.assign(e.currentTarget.style, {
                                    transform: "translateY(0)",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                })
                            }
                        >
                            <div style={iconBox}>
                                <Activity style={iconStyle("#dc2626")} />
                                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#111827" }}>
                                    Lifestyle Factors
                                </h3>
                            </div>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "No alcohol consumption 24 hours before",
                                    "No smoking 1 hour before donation",
                                    "Good sleep (at least 6 hours)",
                                    "Proper meal 3 hours before donation",
                                    "No strenuous exercise for 24 hours",
                                ].map((item, i) => (
                                    <li key={i} style={listItem}>
                                        <CheckCircle style={checkIcon} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Blood Group Compatibility */}
                <section
                    style={{
                        padding: "60px 20px",
                        backgroundColor: "#f9fafb",
                        textAlign: "center",
                    }}
                >
                    <h2 style={headingStyle}>
                        Complete Blood Type Guide
                    </h2>
                    <p style={textStyle}>
                        Detailed information about blood types, compatibility, and characteristics
                    </p>

                    {/* Tabs */}
                    <div
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            marginTop: "40px",
                            padding: "20px",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            maxWidth: "1000px",
                            marginInline: "auto",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                borderBottom: "1px solid #e5e7eb",
                            }}
                        >
                            <button
                                onClick={() => setActiveTab("compatibility")}
                                style={{
                                    padding: "10px 20px",
                                    border: "none",
                                    borderBottom:
                                        activeTab === "compatibility" ? "3px solid #dc2626" : "none",
                                    color: activeTab === "compatibility" ? "#dc2626" : "#374151",
                                    background: "transparent",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Blood Compatibility
                            </button>
                            <button
                                onClick={() => setActiveTab("details")}
                                style={{
                                    padding: "10px 20px",
                                    border: "none",
                                    borderBottom:
                                        activeTab === "details" ? "3px solid #dc2626" : "none",
                                    color: activeTab === "details" ? "#dc2626" : "#374151",
                                    background: "transparent",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Blood Type Details
                            </button>
                        </div>

                        {/* Blood Type Details Section */}
                        {activeTab === "details" && (
                            <div
                                style={{
                                    width: "100%",
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4, 1fr)", // 👈 exactly 4 columns
                                    gap: "1.5rem",
                                    marginTop: "1.5rem",
                                }}
                            >
                                {bloodTypes.map((blood, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            backgroundColor: "#fff",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "12px",
                                            padding: "1rem",
                                            textAlign: "left",
                                            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                                            <div
                                                style={{
                                                    fontSize: "1.8rem",
                                                    fontWeight: "bold",
                                                    color: "#dc2626",
                                                }}
                                            >
                                                {blood.type}
                                            </div>
                                            <div style={{ fontWeight: "600", marginTop: "0.25rem" }}>
                                                {blood.title}
                                            </div>
                                            <div style={{ color: "#555", fontSize: "0.9rem" }}>
                                                {blood.population}
                                            </div>
                                        </div>

                                        <div style={{ fontSize: "0.95rem", color: "#333" }}>
                                            <p>
                                                <strong>Antigens:</strong> {blood.antigens}
                                            </p>
                                            <p>
                                                <strong>Antibodies:</strong> {blood.antibodies}
                                            </p>
                                            <p>
                                                <strong>Rh Factor:</strong> {blood.rhFactor}
                                            </p>
                                            <p
                                                style={{
                                                    marginTop: "0.5rem",
                                                    fontSize: "0.85rem",
                                                    color: "#6b7280",
                                                }}
                                            >
                                                {blood.note}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Compatibility Section */}
                        {activeTab === "compatibility" && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    flexWrap: "wrap",
                                    gap: "20px",
                                    marginTop: "30px",
                                }}
                            >
                                {/* Can Donate */}
                                <div
                                    style={{
                                        backgroundColor: "#ecfdf5",
                                        borderRadius: "10px",
                                        padding: "20px",
                                        flex: "1",
                                        minWidth: "250px",
                                        textAlign: "left",
                                    }}
                                >
                                    <p style={{ fontWeight: 600, color: "#047857" }}>
                                        <ArrowRight
                                            size={18}
                                            style={{ display: "inline", marginRight: "8px" }}
                                        />
                                        Can Donate To:
                                    </p>
                                    <div style={{ marginTop: "8px" }}>
                                        {current.canDonate.map((type) => (
                                            <span
                                                key={type}
                                                style={{
                                                    backgroundColor: "#d1fae5",
                                                    color: "#065f46",
                                                    padding: "5px 10px",
                                                    borderRadius: "6px",
                                                    margin: "4px",
                                                    display: "inline-block",
                                                }}
                                            >
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                    <p style={{ marginTop: "10px", color: "#065f46" }}>
                                        Type: <strong>{current.type}</strong>
                                    </p>
                                </div>

                                {/* Can Receive */}
                                <div
                                    style={{
                                        backgroundColor: "#eff6ff",
                                        borderRadius: "10px",
                                        padding: "20px",
                                        flex: "1",
                                        minWidth: "250px",
                                        textAlign: "left",
                                    }}
                                >
                                    <p style={{ fontWeight: 600, color: "#1d4ed8" }}>
                                        <ArrowLeft
                                            size={18}
                                            style={{ display: "inline", marginRight: "8px" }}
                                        />
                                        Can Receive From:
                                    </p>
                                    <div style={{ marginTop: "8px" }}>
                                        {current.canReceive.map((type) => (
                                            <span
                                                key={type}
                                                style={{
                                                    backgroundColor: "#dbeafe",
                                                    color: "#1e40af",
                                                    padding: "5px 10px",
                                                    borderRadius: "6px",
                                                    margin: "4px",
                                                    display: "inline-block",
                                                }}
                                            >
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                    <p style={{ marginTop: "10px", color: "#1e3a8a" }}>
                                        Population: {current.population}
                                    </p>
                                </div>

                                {/* Blood Details */}
                                <div
                                    style={{
                                        backgroundColor: "#f5f3ff",
                                        borderRadius: "10px",
                                        padding: "20px",
                                        flex: "1",
                                        minWidth: "250px",
                                        textAlign: "left",
                                    }}
                                >
                                    <p style={{ fontWeight: 600, color: "#7e22ce" }}>
                                        <Info
                                            size={18}
                                            style={{ display: "inline", marginRight: "8px" }}
                                        />
                                        Blood Details:
                                    </p>
                                    <p style={{ color: "#6b21a8", marginTop: "8px" }}>
                                        <strong>Antigens:</strong> {current.details.antigens}
                                        <br />
                                        <strong>Antibodies:</strong> {current.details.antibodies}
                                        <br />
                                        <strong>Rh Factor:</strong> {current.details.rh}
                                        <br />
                                        {current.details.note}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div >
            )

            {/* Process of Blood Donation */}
            <section style={{ ...sectionStyle, backgroundColor: "white" }}>
                <h2 style={headingStyle}>
                    Blood Donation Process
                </h2>
                <p style={textStyle}>
                    Step-by-step guide to the blood donation process from registration to recovery
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        gap: "20px",
                        maxWidth: "1300px",
                        // margin: "0 auto",
                    }}
                >
                    {/* Step 1 */}
                    <div style={{ textAlign: "center", maxWidth: "180px" }}>
                        <div style={{ backgroundColor: "#fee2e2", borderRadius: "50%", padding: "20px", display: "inline-block" }}>
                            <ClipboardList size={35} color="#dc2626" />
                        </div>
                        <h3 style={{ marginTop: "15px", fontWeight: "600" }}>Registration</h3>
                        <p style={{ color: "#6b7280", fontSize: "14px" }}>
                            Complete donor registration form and provide valid ID
                        </p>
                        <p style={{ color: "#dc2626", marginTop: "5px" }}>5 min</p>
                    </div>

                    {/* Step 2 */}
                    <div style={{ textAlign: "center", maxWidth: "180px" }}>
                        <div style={{ backgroundColor: "#fee2e2", borderRadius: "50%", padding: "20px", display: "inline-block" }}>
                            <Thermometer size={35} color="#dc2626" />
                        </div>
                        <h3 style={{ marginTop: "15px", fontWeight: "600" }}>Health Screening</h3>
                        <p style={{ color: "#6b7280", fontSize: "14px" }}>
                            Medical history review, temperature, blood pressure, and pulse check
                        </p>
                        <p style={{ color: "#dc2626", marginTop: "5px" }}>10 min</p>
                    </div>

                    {/* Step 3 */}
                    <div style={{ textAlign: "center", maxWidth: "180px" }}>
                        <div style={{ backgroundColor: "#fee2e2", borderRadius: "50%", padding: "20px", display: "inline-block" }}>
                            <Activity size={35} color="#dc2626" />
                        </div>
                        <h3 style={{ marginTop: "15px", fontWeight: "600" }}>Mini Physical</h3>
                        <p style={{ color: "#6b7280", fontSize: "14px" }}>
                            Hemoglobin test and basic health assessment
                        </p>
                        <p style={{ color: "#dc2626", marginTop: "5px" }}>5 min</p>
                    </div>

                    {/* Step 4 */}
                    <div style={{ textAlign: "center", maxWidth: "180px" }}>
                        <div style={{ backgroundColor: "#fee2e2", borderRadius: "50%", padding: "20px", display: "inline-block" }}>
                            <Droplet size={35} color="#dc2626" />
                        </div>
                        <h3 style={{ marginTop: "15px", fontWeight: "600" }}>Blood Donation</h3>
                        <p style={{ color: "#6b7280", fontSize: "14px" }}>
                            Actual blood collection process in sterile environment
                        </p>
                        <p style={{ color: "#dc2626", marginTop: "5px" }}>8–10 min</p>
                    </div>

                    {/* Step 5 */}
                    <div style={{ textAlign: "center", maxWidth: "180px" }}>
                        <div style={{ backgroundColor: "#fee2e2", borderRadius: "50%", padding: "20px", display: "inline-block" }}>
                            <Heart size={35} color="#dc2626" />
                        </div>
                        <h3 style={{ marginTop: "15px", fontWeight: "600" }}>Recovery</h3>
                        <p style={{ color: "#6b7280", fontSize: "14px" }}>
                            Rest and refreshments to recover before leaving
                        </p>
                        <p style={{ color: "#dc2626", marginTop: "5px" }}>10 min</p>
                    </div>
                </div>

                {/* Total Time Box */}
                <div
                    style={{
                        backgroundColor: "#fee2e2",
                        borderRadius: "10px",
                        padding: "10px",
                        marginTop: "20px",
                        maxWidth: "900px",
                        marginInline: "auto",
                    }}
                >
                    <h4 style={{ color: "#b91c1c", fontWeight: "700" }}>
                        Total Process Time: 35–40 minutes
                    </h4>
                    <p style={{ color: "#b91c1c", marginTop: "10px" }}>
                        The entire donation process is designed to be safe, comfortable, and efficient.
                        Our trained staff will guide you through each step and ensure your wellbeing throughout the process.
                    </p>
                </div>
            </section>


            {/* Contact */}
            <section id="contact" style={sectionStyle}>
                <h2 style={headingStyle}>Emergency Contact</h2>
                <p style={textStyle}>For urgent blood requirements, please call our helpline.</p>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Phone size={30} color="#dc2626" />
                    <span style={{ marginLeft: "10px", fontSize: "1.2rem" }}>+91 98765 43210</span>
                </div>
            </section>

            {/* Footer */}
            <footer
                style={{
                    backgroundColor: "#111",
                    color: "white",
                    textAlign: "center",
                    padding: "1rem",
                    marginTop: "2rem",
                }}
            >
                © 2025 BloodLife | All Rights Reserved
            </footer>
        </div >
    );
}

export default HomePage;
