import { useEffect, useState } from "react";
import Header from "../Header";

export default function DonorStock() {
    const [donors, setDonors] = useState([]);
    const [stock, setStock] = useState([]);

    // Fetch donors
    useEffect(() => {
        fetch("http://localhost:5000/api/donors")
            .then((res) => res.json())
            .then((data) => setDonors(data))
            .catch((err) => console.error("Error fetching donors:", err));
    }, []);

    // Fetch blood stock
    useEffect(() => {
        fetch("http://localhost:5000/api/donors/stock")
            .then((res) => res.json())
            .then((data) => setStock(data))
            .catch((err) => console.error("Error fetching stock:", err));
    }, []);

    // ⭐ Open Google Maps for selected city
    const openCityLocation = (city) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city)}`;
        window.open(url, "_blank");
    };

    return (
        <div>
            <Header />
            <div style={{ padding: "40px" }}>
                <h2
                    style={{
                        color: "#dc2626",
                        textAlign: "center",
                        fontSize: "28px",
                        marginBottom: "30px",
                    }}
                >
                    🩸 Blood Bank Dashboard
                </h2>

                {/* Blood Stock Table */}
                <h3
                    style={{
                        textAlign: "center",
                        color: "#b91c1c",
                        marginBottom: "10px",
                    }}
                >
                    Blood Stock Summary
                </h3>

                <table
                    style={{
                        width: "60%",
                        margin: "0 auto 40px auto",
                        borderCollapse: "collapse",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        overflow: "hidden",
                    }}
                >
                    <thead style={{ backgroundColor: "#ef4444", color: "white" }}>
                        <tr>
                            <th style={{ padding: "12px", fontSize: "18px" }}>Blood Group</th>
                            <th style={{ padding: "12px", fontSize: "18px" }}>Units Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stock.length > 0 ? (
                            stock.map((item, index) => (
                                <tr
                                    key={index}
                                    style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}
                                >
                                    <td style={{ padding: "12px", fontWeight: "bold", color: "#b91c1c" }}>
                                        {item._id}
                                    </td>
                                    <td style={{ padding: "12px" }}>{item.count}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" style={{ textAlign: "center", padding: "12px" }}>
                                    No stock data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Donor List Table */}
                <h3
                    style={{
                        textAlign: "center",
                        color: "#b91c1c",
                        marginBottom: "10px",
                    }}
                >
                    Registered Donors List
                </h3>

                <table
                    style={{
                        width: "90%",
                        margin: "0 auto",
                        borderCollapse: "collapse",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        overflow: "hidden",
                    }}
                >
                    <thead style={{ backgroundColor: "#ef4444", color: "white" }}>
                        <tr>
                            <th style={{ padding: "10px" }}>Name</th>
                            <th style={{ padding: "10px" }}>Blood Group</th>
                            <th style={{ padding: "10px" }}>City</th>
                            <th style={{ padding: "10px" }}>Phone</th>
                        </tr>
                    </thead>

                    <tbody>
                        {donors.length > 0 ? (
                            donors.map((donor, index) => (
                                <tr
                                    key={index}
                                    style={{
                                        textAlign: "center",
                                        borderBottom: "1px solid #ddd",
                                    }}
                                >
                                    <td style={{ padding: "10px" }}>{donor.name}</td>

                                    <td
                                        style={{
                                            padding: "10px",
                                            fontWeight: "bold",
                                            color: "#b91c1c",
                                        }}
                                    >
                                        {donor.bloodGroup}
                                    </td>

                                    {/* ⭐ Clickable city with hover color change */}
                                    <td
                                        onClick={() => openCityLocation(donor.city)}
                                        style={{
                                            padding: "10px",
                                            cursor: "pointer",
                                            color: "#1d4ed8",
                                            fontWeight: "500",
                                            transition: "0.2s",
                                        }}
                                        onMouseOver={(e) => (e.target.style.color = "#dc2626")}
                                        onMouseOut={(e) => (e.target.style.color = "#1d4ed8")}
                                    >
                                        {donor.city}
                                    </td>

                                    <td style={{ padding: "10px" }}>{donor.phone}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
                                    No donors available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
