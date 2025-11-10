import React, { useState } from 'react';
import Header from './components/Header.jsx';
import { Heart, Droplets, Users, Clock, Info, CheckCircle, Zap, Shield, HeartCrack, ClipboardList, Thermometer, Droplet, Phone, Scale, FileText, Activity, ArrowRight, ArrowLeft } from 'lucide-react';

const HomePage = () => {
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
    const [activeTab, setActiveTab] = useState("compatibility");
    const [selectedType, setSelectedType] = useState("O+");

    // All blood group data
    const bloodData = {
        "O-": {
            donateTo: ["O-", "A-", "B-", "AB-"],
            receiveFrom: ["O-"],
            population: "6.6%",
            type: "Universal Donor",
            antigens: "None",
            antibodies: "Anti-A, Anti-B",
            rhFactor: "Negative",
            note: "Universal donor for all negative blood types",
        },
        "O+": {
            donateTo: ["O+", "A+", "B+", "AB+"],
            receiveFrom: ["O-", "O+"],
            population: "37.4%",
            type: "Common Donor",
            antigens: "None",
            antibodies: "Anti-A, Anti-B",
            rhFactor: "Positive",
            note: "Most common blood type",
        },
        "A-": {
            donateTo: ["A-", "A+", "AB-", "AB+"],
            receiveFrom: ["A-", "O-"],
            population: "6.3%",
            type: "Type A Negative",
            antigens: "A",
            antibodies: "Anti-B",
            rhFactor: "Negative",
            note: "Can donate to all A and AB types",
        },
        "A+": {
            donateTo: ["A+", "AB+"],
            receiveFrom: ["A-", "A+", "O-", "O+"],
            population: "32.3%",
            type: "Type A Positive",
            antigens: "A",
            antibodies: "Anti-B",
            rhFactor: "Positive",
            note: "Second most common blood type",
        },
        "B-": {
            donateTo: ["B-", "B+", "AB-", "AB+"],
            receiveFrom: ["B-", "O-"],
            population: "1.5%",
            type: "Type B Negative",
            antigens: "B",
            antibodies: "Anti-A",
            rhFactor: "Negative",
            note: "Can donate to all B and AB types",
        },
        "B+": {
            donateTo: ["B+", "AB+"],
            receiveFrom: ["B-", "B+", "O-", "O+"],
            population: "10%",
            type: "Type B Positive",
            antigens: "B",
            antibodies: "Anti-A",
            rhFactor: "Positive",
            note: "Common in certain regions",
        },
        "AB-": {
            donateTo: ["AB-", "AB+"],
            receiveFrom: ["A-", "B-", "AB-", "O-"],
            population: "0.6%",
            type: "Type AB Negative",
            antigens: "A, B",
            antibodies: "None",
            rhFactor: "Negative",
            note: "Universal plasma donor",
        },
        "AB+": {
            donateTo: ["AB+"],
            receiveFrom: ["Everyone"],
            population: "3.4%",
            type: "Universal Receiver",
            antigens: "A, B",
            antibodies: "None",
            rhFactor: "Positive",
            note: "Can receive all blood types",
        },
    };

    //  const [activeTab, setActiveTab] = useState("compatibility");
    //   const [selectedType, setSelectedType] = useState("O+");

    const blood = bloodData[selectedType];
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
            </div >
            <section
                style={{
                    padding: "60px 20px",
                    backgroundColor: "#f9fafb",
                    textAlign: "center",
                    fontFamily: "Poppins, sans-serif",
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
                        display: "flex",
                        justifyContent: "center",
                        background: "#fff",
                        borderRadius: "12px 12px 0 0",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        overflow: "hidden",
                        width: "80%",
                        margin: "0 auto",
                    }}
                >
                    <button
                        onClick={() => setActiveTab("compatibility")}
                        style={{
                            flex: 1,
                            padding: "12px 0",
                            border: "none",
                            backgroundColor: activeTab === "compatibility" ? "#dc2626" : "#fff",
                            color: activeTab === "compatibility" ? "#fff" : "#374151",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Blood Compatibility
                    </button>
                    <button
                        onClick={() => setActiveTab("details")}
                        style={{
                            flex: 1,
                            padding: "12px 0",
                            border: "none",
                            backgroundColor: activeTab === "details" ? "#dc2626" : "#fff",
                            color: activeTab === "details" ? "#fff" : "#374151",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Blood Type Details
                    </button>
                </div>

                {/* Content */}
                <div
                    style={{
                        background: "#fff",
                        borderRadius: " 12px 12px",
                        width: "80%",
                        margin: "0 auto",
                        padding: "30px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    {activeTab === "compatibility" ? (
                        <>
                            {/* Blood Type Buttons */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "12px",
                                    marginBottom: "30px",
                                    flexWrap: "wrap",
                                }}
                            >
                                {Object.keys(bloodData).map((bt) => (
                                    <button
                                        key={bt}
                                        onClick={() => setSelectedType(bt)}
                                        style={{
                                            backgroundColor: selectedType === bt ? "#dc2626" : "#f3f4f6",
                                            color: selectedType === bt ? "#fff" : "#111827",
                                            border: "none",
                                            padding: "8px 16px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {bt}
                                    </button>
                                ))}
                            </div>

                            {/* Information Boxes */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                                    gap: "20px",
                                }}
                            >
                                {/* Donate Box */}
                                <div
                                    style={{
                                        backgroundColor: "#ecfdf5",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        textAlign: "left",
                                    }}
                                >
                                    <h3
                                        style={{
                                            color: "#065f46",
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        <ArrowRight /> Can Donate To:
                                    </h3>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            flexWrap: "wrap",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        {blood.donateTo.map((type) => (
                                            <span
                                                key={type}
                                                style={{
                                                    backgroundColor: "#d1fae5",
                                                    color: "#065f46",
                                                    padding: "5px 10px",
                                                    borderRadius: "20px",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                    <p>
                                        <strong>Type:</strong> {blood.type}
                                    </p>
                                </div>

                                {/* Receive Box */}
                                <div
                                    style={{
                                        backgroundColor: "#eff6ff",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        textAlign: "left",
                                    }}
                                >
                                    <h3
                                        style={{
                                            color: "#1e3a8a",
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        <ArrowLeft /> Can Receive From:
                                    </h3>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            flexWrap: "wrap",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        {blood.receiveFrom.map((type) => (
                                            <span
                                                key={type}
                                                style={{
                                                    backgroundColor: "#dbeafe",
                                                    color: "#1e3a8a",
                                                    padding: "5px 10px",
                                                    borderRadius: "20px",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                    <p>
                                        <strong>Population:</strong> {blood.population}
                                    </p>
                                </div>

                                {/* Details Box */}
                                <div
                                    style={{
                                        backgroundColor: "#f5f3ff",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        textAlign: "left",
                                    }}
                                >
                                    <h3
                                        style={{
                                            color: "#6d28d9",
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        🩸 Blood Details:
                                    </h3>
                                    <p>
                                        <strong>Antigens:</strong> {blood.antigens}
                                    </p>
                                    <p>
                                        <strong>Antibodies:</strong> {blood.antibodies}
                                    </p>
                                    <p>
                                        <strong>Rh Factor:</strong> {blood.rhFactor}
                                    </p>
                                    <p style={{ color: "#6d28d9", marginTop: "8px" }}>{blood.note}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)", // ✅ 4 buttons per row
                                gap: "12px",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: "30px",
                                width: "fit-content",
                                marginInline: "auto",
                            }}
                        >
                            {Object.entries(bloodData).map(([type, details]) => (
                                <div
                                    key={type}
                                    style={{
                                        background: "#fff",
                                        borderRadius: "12px",
                                        padding: "25px",
                                        textAlign: "center",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                        border:
                                            selectedType === type
                                                ? "2px solid #dc2626"
                                                : "1px solid #f3f4f6",
                                    }}
                                    onClick={() => setSelectedType(type)}
                                >
                                    <div
                                        style={{
                                            backgroundColor: "#fee2e2",
                                            width: "60px",
                                            height: "60px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            margin: "0 auto 10px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "20px",
                                                color: "#dc2626",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {type}
                                        </span>
                                    </div>
                                    <h3 style={{ marginBottom: "5px", fontWeight: "600" }}>
                                        {details.type}
                                    </h3>
                                    <p style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
                                        {details.population} of population
                                    </p>
                                    <p><strong>Antigens:</strong> {details.antigens}</p>
                                    <p><strong>Antibodies:</strong> {details.antibodies}</p>
                                    <p><strong>Rh Factor:</strong> {details.rhFactor}</p>
                                    <p
                                        style={{
                                            fontStyle: "italic",
                                            color: "#777",
                                            fontSize: "13px",
                                            marginTop: "5px",
                                        }}
                                    >
                                        {details.note}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <section
                style={{
                    padding: "60px 20px",
                    backgroundColor: "#f9fafb",
                    textAlign: "center",
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                <h2 style={headingStyle}>
                    Blood Components & Uses
                </h2>
                <p style={textStyle}>
                    Your single donation can be separated into multiple life-saving components
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "30px",
                        justifyContent: "center",
                        width: "90%",
                        margin: "0 auto",
                    }}
                >
                    {/* Red Blood Cells */}
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "16px",
                            padding: "30px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#fee2e2",
                                color: "#dc2626",
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "26px",
                                margin: "0 auto 16px",
                            }}
                        >
                            <Droplet size={30} />
                        </div>
                        <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Red Blood Cells</h3>
                        <p style={{ color: "#6b7280", marginBottom: "10px" }}>
                            Carry oxygen throughout the body
                        </p>
                        <span
                            style={{
                                backgroundColor: "#fee2e2",
                                color: "#b91c1c",
                                padding: "4px 12px",
                                borderRadius: "12px",
                                fontSize: "14px",
                                display: "inline-block",
                                marginBottom: "16px",
                            }}
                        >
                            Storage: 42 days
                        </span>
                        <div style={{ textAlign: "left" }}>
                            <p style={{ fontWeight: "600", marginBottom: "8px" }}>Used for:</p>
                            <ul style={{ color: "#059669", listStyle: "none", padding: 0 }}>
                                <li>✔ Trauma patients</li>
                                <li>✔ Surgery patients</li>
                                <li>✔ Cancer treatment</li>
                                <li>✔ Chronic anemia</li>
                            </ul>
                        </div>
                    </div>

                    {/* Platelets */}
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "16px",
                            padding: "30px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#fef3c7",
                                color: "#b45309",
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "26px",
                                margin: "0 auto 16px",
                            }}
                        >
                            <Zap size={30} />
                        </div>
                        <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Platelets</h3>
                        <p style={{ color: "#6b7280", marginBottom: "10px" }}>
                            Help blood clot and stop bleeding
                        </p>
                        <span
                            style={{
                                backgroundColor: "#fef3c7",
                                color: "#b45309",
                                padding: "4px 12px",
                                borderRadius: "12px",
                                fontSize: "14px",
                                display: "inline-block",
                                marginBottom: "16px",
                            }}
                        >
                            Storage: 5 days
                        </span>
                        <div style={{ textAlign: "left" }}>
                            <p style={{ fontWeight: "600", marginBottom: "8px" }}>Used for:</p>
                            <ul style={{ color: "#059669", listStyle: "none", padding: 0 }}>
                                <li>✔ Cancer patients</li>
                                <li>✔ Organ transplants</li>
                                <li>✔ Heart surgery</li>
                                <li>✔ Bleeding disorders</li>
                            </ul>
                        </div>
                    </div>

                    {/* Plasma */}
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "16px",
                            padding: "30px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#e0e7ff",
                                color: "#3730a3",
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "26px",
                                margin: "0 auto 16px",
                            }}
                        >
                            <Shield size={30} />
                        </div>
                        <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Plasma</h3>
                        <p style={{ color: "#6b7280", marginBottom: "10px" }}>
                            Contains proteins and antibodies
                        </p>
                        <span
                            style={{
                                backgroundColor: "#e0e7ff",
                                color: "#3730a3",
                                padding: "4px 12px",
                                borderRadius: "12px",
                                fontSize: "14px",
                                display: "inline-block",
                                marginBottom: "16px",
                            }}
                        >
                            Storage: 1 year frozen
                        </span>
                        <div style={{ textAlign: "left" }}>
                            <p style={{ fontWeight: "600", marginBottom: "8px" }}>Used for:</p>
                            <ul style={{ color: "#059669", listStyle: "none", padding: 0 }}>
                                <li>✔ Burn victims</li>
                                <li>✔ Shock patients</li>
                                <li>✔ Immune disorders</li>
                                <li>✔ Clotting factor disorders</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

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
