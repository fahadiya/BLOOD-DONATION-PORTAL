import React, { useEffect, useState } from "react";
import { Phone, MapPin, Droplets, Mail, Calendar } from "lucide-react";
import Header from "../Header.jsx";
import InputField from "../InputField.jsx";
import DropDownField from "../DropdownField.jsx";

export default function DonorList() {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bloodGroup, setBloodGroup] = useState("");
    const [city, setCity] = useState("");
    const [searched, setSearched] = useState(false); // ✅ track if search is performed

    const fetchDonors = async (filters = {}) => {
        try {
            setLoading(true);

            // build base url
            const base = "http://localhost:5000/api/donors";
            const params = new URLSearchParams();

            if (filters.bloodGroup) params.append("bloodGroup", filters.bloodGroup);
            if (filters.city) params.append("city", filters.city);

            const url = params.toString() ? `${base}?${params.toString()}` : base;

            const res = await fetch(url);
            // if server returned HTML/404 page, guard against JSON.parse errors:
            const text = await res.text();
            // try parse JSON
            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                console.warn("Unexpected response from server:", text);
                data = [];
            }

            if (Array.isArray(data)) {
                setDonors(data);
            } else {
                setDonors([]);
            }
        } catch (err) {
            console.error("❌ Error fetching donors:", err);
            setDonors([]);
        } finally {
            setLoading(false);
        }
    };

    // initial load -> show all
    useEffect(() => {
        fetchDonors();
    }, []);

    // Called when clicking Search - will only search when both present (you can change)
    const handleSearch = () => {
        setSearched(true);
        if (!bloodGroup || !city) {
            alert("Please select blood group and enter city to search.");
            return;
        }
        fetchDonors({ bloodGroup, city });
    };

    return (
        <>
            <Header />
            <div style={{ padding: "50px 20px", backgroundColor: "#fff" }}>
                <h2
                    style={{
                        textAlign: "center",
                        color: "#dc2626",
                        fontSize: "2.2rem",
                        fontWeight: "700",
                        marginBottom: "2.5rem",
                    }}
                >
                    Registered Donors
                </h2>

                {/* 🔍 Filter Section */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        gap: "1.5rem",
                        marginBottom: "2rem",
                        backgroundColor: "#fff5f5",
                        padding: "1.5rem",
                        borderRadius: "12px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                        maxWidth: "800px",
                        marginInline: "auto",
                    }}
                >
                    <div style={{ flex: "1 1 250px", minWidth: "200px" }}>
                        <DropDownField
                            label="Blood Group"
                            name="bloodGroup"
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
                        />
                    </div>

                    <div style={{ flex: "1 1 250px", minWidth: "200px" }}>
                        <InputField
                            label="City"
                            type="text"
                            name="city"
                            placeholder="Enter City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div style={{ flex: "0 0 auto", alignSelf: "center" }}>
                        <button
                            onClick={handleSearch}
                            style={{
                                backgroundColor: "#dc2626",
                                color: "#fff",
                                padding: "12px 28px",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "1rem",
                                height: "44px",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "#b91c1c")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "#dc2626")
                            }
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* 🩸 Donor Cards */}
                {loading ? (
                    <p style={{ textAlign: "center", color: "#555" }}>Loading donors...</p>
                ) : donors.length === 0 && searched ? (
                    <p style={{ textAlign: "center", color: "#777" }}>
                        ❌ No donors found for <b>{bloodGroup || "any group"}</b> in{" "}
                        <b>{city || "your city"}</b>.
                    </p>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                            gap: "1.5rem",
                            width: "100%",
                            maxWidth: "1200px",
                            margin: "0 auto",
                        }}
                    >
                        {donors.map((donor, index) => (
                            <div
                                key={index}
                                style={{
                                    border: "1px solid #f1f1f1",
                                    borderRadius: "14px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    padding: "25px 25px",
                                    backgroundColor: "#fafafa",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow =
                                        "0 8px 16px rgba(0,0,0,0.12)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                        "0 4px 12px rgba(0,0,0,0.08)";
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <Droplets color="#dc2626" size={26} />
                                    <h3
                                        style={{
                                            color: "#111",
                                            fontSize: "1.2rem",
                                            fontWeight: "600",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        {donor.name}
                                    </h3>
                                </div>

                                <p
                                    style={{
                                        color: "#dc2626",
                                        fontWeight: "600",
                                        fontSize: "1.1rem",
                                        marginBottom: "15px",
                                    }}
                                >
                                    Blood Group: {donor.bloodGroup}
                                </p>

                                <div style={{ lineHeight: "1.7", width: "100%" }}>
                                    {donor.age && (
                                        <p style={{ color: "#444", margin: "4px 0" }}>
                                            <Calendar size={17} style={{ marginRight: "8px" }} />
                                            <strong>Age:</strong>&nbsp;{donor.age} years
                                        </p>
                                    )}
                                    {donor.email && (
                                        <p style={{ color: "#444", margin: "4px 0" }}>
                                            <Mail size={17} style={{ marginRight: "8px" }} />
                                            <strong>Email:</strong>&nbsp;
                                            <a
                                                href={`mailto:${donor.email}`}
                                                style={{
                                                    color: "#2563eb",
                                                    textDecoration: "none",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {donor.email}
                                            </a>
                                        </p>
                                    )}
                                    {donor.city && (
                                        <p style={{ color: "#444", margin: "4px 0" }}>
                                            <MapPin size={17} style={{ marginRight: "8px" }} />
                                            <strong>City:</strong>&nbsp;{donor.city}
                                        </p>
                                    )}
                                    {donor.phone && (
                                        <p style={{ color: "#444", margin: "4px 0" }}>
                                            <Phone size={17} style={{ marginRight: "8px" }} />
                                            <strong>Phone:</strong>&nbsp;{donor.phone}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
