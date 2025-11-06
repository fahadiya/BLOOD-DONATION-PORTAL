import { useState, useEffect } from "react";
import Header from "../Header";
import InputField from "../InputField";
import DropDownField from "../DropdownField";

export default function HospitalStock() {
    const [stocks, setStocks] = useState([]);
    const [form, setForm] = useState({
        hospitalName: "",
        bloodGroup: "",
        units: "",
        location: "",
    });

    // ✅ Fetch hospital stock data from backend
    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/hospitals");
            const data = await res.json();

            if (Array.isArray(data)) {
                setStocks(data);
            } else {
                console.error("Unexpected response format:", data);
                setStocks([]);
            }
        } catch (err) {
            console.error("Error fetching stocks:", err);
        }
    };

    // ✅ Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/hospitals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Failed to add hospital stock");

            setForm({ hospitalName: "", bloodGroup: "", units: "", location: "" });
            fetchStocks();
        } catch (err) {
            console.error("Error adding stock:", err);
        }
    };

    // ✅ Delete hospital stock
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/hospitals/${id}`, {
                method: "DELETE",
            });
            fetchStocks();
        } catch (err) {
            console.error("Error deleting stock:", err);
        }
    };

    // ✅ View map using BOTH hospital name + location
    const handleViewLocation = (hospital) => {
        if (!hospital.hospitalName || !hospital.location) {
            alert("Hospital name or location missing.");
            return;
        }

        // Combine both for precise search
        const query = encodeURIComponent(`${hospital.hospitalName}, ${hospital.location}`);

        // Try to use user's location if allowed
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    // Show direction from current location to hospital
                    const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${query}`;
                    window.open(mapUrl, "_blank");
                },
                () => {
                    // If permission denied, just show map location
                    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
                    window.open(mapUrl, "_blank");
                }
            );
        } else {
            alert("Geolocation not supported by your browser.");
        }
    };

    const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

    return (
        <div>
            <Header />

            <div
                style={{
                    padding: "40px",
                    backgroundColor: "#f9fafb",
                    minHeight: "100vh",
                }}
            >
                <h2
                    style={{
                        color: "#dc2626",
                        textAlign: "center",
                        fontSize: "28px",
                        marginBottom: "30px",
                    }}
                >
                    🏥 Hospital Blood Stock Management
                </h2>

                {/* ✅ Add Hospital Form */}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: "90%",
                        margin: "0 auto",
                        background: "white",
                        padding: "22px 24px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    <div style={{ flex: "1 1 25%", minWidth: 200 }}>
                        <InputField
                            label="Hospital Name"
                            type="text"
                            name="hospitalName"
                            value={form.hospitalName}
                            onChange={handleChange}
                            placeholder="Enter hospital name"
                            required
                        />
                    </div>

                    <div style={{ flex: "1 1 25%", minWidth: 200 }}>
                        <InputField
                            label="Location"
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Enter hospital address or location"
                            required
                        />
                    </div>

                    <div style={{ flex: "1 1 15%", minWidth: 160 }}>
                        <DropDownField
                            label="Blood Group"
                            name="bloodGroup"
                            value={form.bloodGroup}
                            onChange={handleChange}
                            options={bloodGroups}
                            required
                        />
                    </div>

                    <div style={{ flex: "1 1 10%", minWidth: 120 }}>
                        <InputField
                            label="Units"
                            type="number"
                            name="units"
                            value={form.units}
                            onChange={handleChange}
                            placeholder="Units"
                            required
                        />
                    </div>

                    <div
                        style={{
                            flex: "0 1 14%",
                            minWidth: 120,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            type="submit"
                            style={{
                                backgroundColor: "#dc2626",
                                color: "white",
                                padding: "10px 18px",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: 500,
                                cursor: "pointer",
                                height: 46,
                                alignSelf: "center",
                                minWidth: 120,
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#b91c1c")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#dc2626")
                            }
                        >
                            ➕ Add
                        </button>
                    </div>
                </form>

                {/* ✅ Hospital Stock Table */}
                <div style={{ marginTop: "36px" }}>
                    <table
                        style={{
                            width: "90%",
                            margin: "0 auto",
                            borderCollapse: "collapse",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                            overflow: "hidden",
                        }}
                    >
                        <thead style={{ backgroundColor: "#ef4444", color: "white" }}>
                            <tr>
                                <th style={{ padding: "12px" }}>Hospital</th>
                                <th style={{ padding: "12px" }}>Location</th>
                                <th style={{ padding: "12px" }}>Blood Group</th>
                                <th style={{ padding: "12px" }}>Units</th>
                                <th style={{ padding: "12px" }}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {stocks.length > 0 ? (
                                stocks.map((item) => (
                                    <tr
                                        key={item._id}
                                        style={{
                                            textAlign: "center",
                                            borderBottom: "1px solid #eee",
                                        }}
                                    >
                                        <td style={{ padding: "12px" }}>{item.hospitalName}</td>
                                        <td style={{ padding: "12px" }}>{item.location}</td>
                                        <td style={{ padding: "12px" }}>{item.bloodGroup}</td>
                                        <td style={{ padding: "12px" }}>{item.units}</td>
                                        <td
                                            style={{
                                                padding: "12px",
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: "10px",
                                            }}
                                        >
                                            <button
                                                onClick={() => handleViewLocation(item)}
                                                style={{
                                                    backgroundColor: "#2563eb",
                                                    color: "white",
                                                    padding: "6px 12px",
                                                    border: "none",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                📍 View Map
                                            </button>

                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                style={{
                                                    backgroundColor: "#b91c1c",
                                                    color: "white",
                                                    padding: "6px 12px",
                                                    border: "none",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                🗑 Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        style={{ textAlign: "center", padding: "16px" }}
                                    >
                                        No stock records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
