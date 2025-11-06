import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Droplets, Heart, ChevronDown, ChevronUp } from "lucide-react";

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const donorsRef = useRef(null);

    const [showBloodstockDropdown, setShowBloodstockDropdown] = useState(false);
    const bloodstockRef = useRef(null);

    const location = useLocation();
    const [activeLink, setActiveLink] = useState("");

    // ✅ Detect active link based on route
    useEffect(() => {
        const path = location.pathname;

        if (path === "/") setActiveLink("Home");
        else if (path.startsWith("/donor-registration") || path.startsWith("/donor-list"))
            setActiveLink("Donors");
        else if (path.startsWith("/receiver-register"))
            setActiveLink("Receiver");
        else if (path.startsWith("/donor-stock") || path.startsWith("/hospital-stock"))
            setActiveLink("LifeLine Stock");
        else if (path.startsWith("/contact")) setActiveLink("Contact");
        else setActiveLink("");
    }, [location]);

    // ✅ Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (donorsRef.current && !donorsRef.current.contains(e.target)) setShowDropdown(false);
            if (bloodstockRef.current && !bloodstockRef.current.contains(e.target)) setShowBloodstockDropdown(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const styles = {
        navLink: (isActive) => ({
            textDecoration: "none",
            color: isActive ? "#d90429" : "#333",
            fontSize: "16px",
            fontWeight: 500,
            padding: "8px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.2s ease",
        }),
        dropdownMenu: {
            position: "absolute",
            top: "110%",
            left: 0,
            background: "#fff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            padding: "8px 0",
            width: "200px",
            zIndex: 200,
        },
        dropdownItem: {
            padding: "10px 16px",
            display: "block",
            color: "#333",
            textDecoration: "none",
            transition: "background 0.2s ease",
        },
    };

    return (
        <header
            style={{
                background: "#fff",
                borderBottom: "1px solid #ddd",
                position: "sticky",
                top: 0,
                zIndex: 100,
                height: 90,
            }}
        >
            <div
                style={{
                    maxWidth: 1250,
                    margin: "0 auto",
                    padding: "0 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 90,
                }}
            >
                {/* Logo Section */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                        style={{
                            width: 50,
                            height: 50,
                            background: "#d90429",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Droplets style={{ color: "#fff", width: 25, height: 25 }} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 800 }}>LifeShare</div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            Blood Donation Network
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <Link to="/" style={styles.navLink(activeLink === "Home")}>
                        Home
                    </Link>

                    {/* Donors Dropdown */}
                    <div ref={donorsRef} style={{ position: "relative" }}>
                        <div
                            onClick={() => setShowDropdown((prev) => !prev)}
                            style={styles.navLink(activeLink === "Donors")}
                        >
                            Donors {showDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>

                        {showDropdown && (
                            <div style={styles.dropdownMenu}>
                                <Link
                                    to="/donor-registration"
                                    style={styles.dropdownItem}
                                    onClick={() => setShowDropdown(false)}
                                >
                                    Register Donor
                                </Link>
                                <Link
                                    to="/donor-list"
                                    style={styles.dropdownItem}
                                    onClick={() => setShowDropdown(false)}
                                >
                                    Donor List
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Receiver button (direct link) */}
                    <Link
                        to="/receiver-register"
                        style={styles.navLink(activeLink === "Receiver")}
                    >
                        Receiver
                    </Link>

                    {/* LifeLine Stock Dropdown */}
                    <div ref={bloodstockRef} style={{ position: "relative" }}>
                        <div
                            onClick={() => setShowBloodstockDropdown((prev) => !prev)}
                            style={styles.navLink(activeLink === "LifeLine Stock")}
                        >
                            LifeLine Stock{" "}
                            {showBloodstockDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>

                        {showBloodstockDropdown && (
                            <div style={styles.dropdownMenu}>
                                <Link
                                    to="/donor-stock"
                                    style={styles.dropdownItem}
                                    onClick={() => setShowBloodstockDropdown(false)}
                                >
                                    Donors Stock
                                </Link>
                                <Link
                                    to="/hospital-stock"
                                    style={styles.dropdownItem}
                                    onClick={() => setShowBloodstockDropdown(false)}
                                >
                                    Hospital Stock
                                </Link>
                            </div>
                        )}
                    </div>


                    {/* Donate Button */}
                    <Link to="/donor-registration" style={{ textDecoration: "none" }}>
                        <button
                            style={{
                                background: "#d90429",
                                color: "#fff",
                                padding: "8px 14px",
                                borderRadius: 8,
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                            }}
                        >
                            <Heart style={{ width: 16, height: 16 }} /> Donate Now
                        </button>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
