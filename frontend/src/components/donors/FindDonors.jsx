import React, { useState } from "react";
import InputField from "../InputField";
import Header from "../Header";
import DropdownField from "../DropdownField";
import { Droplets, MapPin, Phone } from "lucide-react";

const FindDonors = () => {
    const [formData, setFormData] = useState({
        bloodType: "",
        city: "",
        state: "",
    });

    const [donors, setDonors] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearched(true);

        try {
            const res = await fetch("http://localhost:5000/api/find-donors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),

            });

            const data = await res.json();
            setDonors(data);
        } catch (error) {
            console.error("Error fetching donors:", error);
        }
    };

    return (
        <div>
            <Header />
            <div style={{ padding: "2rem", textAlign: "center", backgroundColor: "#fff" }}>
                <h2
                    style={{
                        color: "#dc2626",
                        fontSize: "2rem",
                        fontWeight: "700",
                        marginBottom: "1.5rem",
                    }}
                >
                    Find Blood Donors
                </h2>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                        maxWidth: "400px",
                        margin: "0 auto",
                        background: "#fff",
                        padding: "2rem",
                        borderRadius: "1rem",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                >
                    <DropdownField
                        label="Blood Type"
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
                        required
                    />

                    <InputField
                        label="City"
                        type="text"
                        name="city"
                        placeholder="Enter City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />

                    <InputField
                        label="State"
                        type="text"
                        name="state"
                        placeholder="Enter State"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#dc2626",
                            color: "white",
                            border: "none",
                            padding: "0.8rem 1.5rem",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "1rem",
                        }}
                    >
                        Search Donors
                    </button>
                </form>

                {searched && (
                    <div style={{ marginTop: "2rem" }}>
                        {donors.length > 0 ? (
                            <>
                                <h3
                                    style={{
                                        color: "#dc2626",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    Available Donors
                                </h3>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fit, minmax(260px, 1fr))",
                                        gap: "1.5rem",
                                        maxWidth: "1000px",
                                        margin: "0 auto",
                                    }}
                                >
                                    {donors.map((donor, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                background: "#fff",
                                                padding: "1.5rem",
                                                borderRadius: "1rem",
                                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                                textAlign: "left",
                                            }}
                                        >
                                            <h4
                                                style={{
                                                    color: "#111",
                                                    fontSize: "1.2rem",
                                                    marginBottom: "0.5rem",
                                                }}
                                            >
                                                {donor.name}
                                            </h4>
                                            <p style={{ color: "#dc2626", marginBottom: "0.3rem" }}>
                                                <Droplets size={16} /> {donor.bloodType}
                                            </p>
                                            <p style={{ color: "#444", marginBottom: "0.3rem" }}>
                                                <MapPin size={16} /> {donor.city}, {donor.state}
                                            </p>
                                            <p style={{ color: "#444", marginBottom: "0.3rem" }}>
                                                <Phone size={16} /> {donor.phone}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p style={{ color: "#555" }}>No donors found for your search.</p>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};

export default FindDonors;
