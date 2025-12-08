// import React, { useEffect, useState } from "react";

// export default function AdminDashboard() {
//     const [activeTab, setActiveTab] = useState("donors");
//     const [donors, setDonors] = useState([]);
//     const [receivers, setReceivers] = useState([]);
//     const [hospitals, setHospitals] = useState([]);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const [donorRes, receiverRes, hospitalRes] = await Promise.all([
//                 fetch("http://localhost:5000/api/donors"),
//                 fetch("http://localhost:5000/api/receivers"),
//                 fetch("http://localhost:5000/api/hospitals"),
//             ]);
//             setDonors(await donorRes.json());
//             setReceivers(await receiverRes.json());
//             setHospitals(await hospitalRes.json());
//         } catch (err) {
//             console.error("Error fetching data:", err);
//         }
//     };

//     const toggleAvailability = async (id, currentAvailability) => {
//         try {
//             const res = await fetch(`http://localhost:5000/api/donors/${id}/availability`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ available: !currentAvailability }),
//             });

//             const data = await res.json();
//             if (!res.ok) throw new Error(data.message || "Failed to update");

//             // Update UI immediately without refresh
//             setDonors((prev) =>
//                 prev.map((donor) =>
//                     donor._id === id ? { ...donor, available: !currentAvailability } : donor
//                 )
//             );

//         } catch (err) {
//             console.error("Error updating donor:", err);
//         }
//     };



//     const deleteData = async (id, type) => {
//         try {
//             await fetch(`http://localhost:5000/api/${type}/${id}`, { method: "DELETE" });
//             fetchData();
//         } catch (err) {
//             console.error(`Error deleting ${type}:`, err);
//         }
//     };

//     const styles = {
//         container: {
//             display: "flex",
//             height: "100vh",
//             fontFamily: "Arial, sans-serif",
//             backgroundColor: "#f9fafb",
//         },
//         sidebar: {
//             width: "230px",
//             backgroundColor: "#1e293b",
//             color: "white",
//             padding: "20px",
//             display: "flex",
//             flexDirection: "column",
//         },
//         sidebarItem: (tab) => ({
//             padding: "12px 15px",
//             margin: "5px 0",
//             borderRadius: "6px",
//             backgroundColor: activeTab === tab ? "#3b82f6" : "transparent",
//             cursor: "pointer",
//         }),
//         main: {
//             flexGrow: 1,
//             padding: "30px",
//             overflowY: "auto",
//         },
//         header: {
//             fontSize: "24px",
//             fontWeight: "bold",
//             marginBottom: "20px",
//             color: "#111827",
//         },
//         table: {
//             width: "100%",
//             borderCollapse: "collapse",
//             backgroundColor: "white",
//             borderRadius: "8px",
//             boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
//         },
//         th: {
//             backgroundColor: "#e2e8f0",
//             padding: "12px",
//             textAlign: "left",
//             fontWeight: "bold",
//         },
//         td: {
//             padding: "10px",
//             borderBottom: "1px solid #ddd",
//             verticalAlign: "middle",
//         },
//         available: { color: "green", fontWeight: "bold" },
//         unavailable: { color: "red", fontWeight: "bold" },
//         buttonBlue: {
//             backgroundColor: "#3b82f6",
//             color: "white",
//             border: "none",
//             padding: "5px 10px",
//             borderRadius: "5px",
//             cursor: "pointer",
//             marginRight: "5px",
//         },
//         buttonRed: {
//             backgroundColor: "#ef4444",
//             color: "white",
//             border: "none",
//             padding: "5px 10px",
//             borderRadius: "5px",
//             cursor: "pointer",
//         },
//     };

//     return (
//         <div style={styles.container}>
//             {/* Sidebar */}
//             <div style={styles.sidebar}>
//                 <h2 style={{ marginBottom: "20px" }}>Admin Dashboard</h2>
//                 <div style={styles.sidebarItem("donors")} onClick={() => setActiveTab("donors")}>Donors</div>
//                 <div style={styles.sidebarItem("receivers")} onClick={() => setActiveTab("receivers")}>Receivers</div>
//                 <div style={styles.sidebarItem("hospitals")} onClick={() => setActiveTab("hospitals")}>Hospitals</div>
//             </div>

//             {/* Main Area */}
//             <div style={styles.main}>
//                 <div style={styles.header}>
//                     {activeTab === "donors"
//                         ? "Donor Management"
//                         : activeTab === "receivers"
//                             ? "Receiver Details"
//                             : "Hospital Records"}
//                 </div>

//                 {/* ---------- DONORS ---------- */}
//                 {activeTab === "donors" && (
//                     <table style={styles.table}>
//                         <thead>
//                             <tr>
//                                 <th style={styles.th}>Availability</th>
//                                 <th style={styles.th}>Name</th>
//                                 <th style={styles.th}>Blood Group</th>
//                                 <th style={styles.th}>Phone</th>
//                                 <th style={styles.th}>Email</th>
//                                 <th style={styles.th}>City</th>
//                                 <th style={styles.th}>Address</th>
//                                 <th style={styles.th}>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {donors.length ? (
//                                 donors.map((d) => (
//                                     <tr key={d._id}>
//                                         <td style={styles.td}>
//                                             <span style={d.available ? styles.available : styles.unavailable}>
//                                                 {d.available ? "Available" : "Not Available"}
//                                             </span>
//                                         </td>
//                                         <td style={styles.td}>{d.name}</td>
//                                         <td style={styles.td}>{d.bloodGroup}</td>
//                                         <td style={styles.td}>{d.phone}</td>
//                                         <td style={styles.td}>{d.email}</td>
//                                         <td style={styles.td}>{d.city}</td>
//                                         <td style={styles.td}>{d.address}</td>
//                                         <td style={styles.td}>
//                                             <button
//                                                 onClick={() => toggleAvailability(d._id, d.available)}
//                                                 style={{
//                                                     backgroundColor: d.available ? "#ef4444" : "#22c55e",
//                                                     color: "white",
//                                                     border: "none",
//                                                     padding: "5px 10px",
//                                                     borderRadius: "5px",
//                                                     cursor: "pointer",
//                                                     marginRight: "5px"
//                                                 }}
//                                             >
//                                                 {d.available ? "Mark Not Available" : "Mark Available"}
//                                             </button>



//                                             <button
//                                                 style={styles.buttonRed}
//                                                 onClick={() => deleteData(d._id, "donors")}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr><td colSpan="8" style={styles.td}>No donors found</td></tr>
//                             )}
//                         </tbody>
//                     </table>
//                 )}

//                 {/* ---------- RECEIVERS ---------- */}
//                 {activeTab === "receivers" && (
//                     <table style={styles.table}>
//                         <thead>
//                             <tr>
//                                 <th style={styles.th}>Name</th>
//                                 <th style={styles.th}>Blood Group</th>
//                                 <th style={styles.th}>Phone</th>
//                                 <th style={styles.th}>Email</th>
//                                 <th style={styles.th}>City</th>
//                                 <th style={styles.th}>Hospital</th>
//                                 <th style={styles.th}>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {receivers.length ? (
//                                 receivers.map((r) => (
//                                     <tr key={r._id}>
//                                         <td style={styles.td}>{r.name}</td>
//                                         <td style={styles.td}>{r.bloodGroup}</td>
//                                         <td style={styles.td}>{r.phone}</td>
//                                         <td style={styles.td}>{r.email}</td>
//                                         <td style={styles.td}>{r.city}</td>
//                                         <td style={styles.td}>{r.hospital}</td>
//                                         <td style={styles.td}>
//                                             <button
//                                                 style={styles.buttonRed}
//                                                 onClick={() => deleteData(r._id, "receivers")}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr><td colSpan="7" style={styles.td}>No receivers found</td></tr>
//                             )}
//                         </tbody>
//                     </table>
//                 )}

//                 {/* ---------- HOSPITALS ---------- */}
//                 {activeTab === "hospitals" && (
//                     <table style={styles.table}>
//                         <thead>
//                             <tr>
//                                 <th style={styles.th}>Hospital Name</th>
//                                 <th style={styles.th}>Email</th>
//                                 <th style={styles.th}>Phone</th>
//                                 <th style={styles.th}>City</th>
//                                 <th style={styles.th}>Address</th>
//                                 <th style={styles.th}>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {hospitals.length ? (
//                                 hospitals.map((h) => (
//                                     <tr key={h._id}>
//                                         <td style={styles.td}>{h.name}</td>
//                                         <td style={styles.td}>{h.email}</td>
//                                         <td style={styles.td}>{h.phone}</td>
//                                         <td style={styles.td}>{h.city}</td>
//                                         <td style={styles.td}>{h.address}</td>
//                                         <td style={styles.td}>
//                                             <button
//                                                 style={styles.buttonRed}
//                                                 onClick={() => deleteData(h._id, "hospitals")}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr><td colSpan="6" style={styles.td}>No hospitals found</td></tr>
//                             )}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// }
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("donors");
    const [donors, setDonors] = useState([]);
    const [receivers, setReceivers] = useState([]);
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [donorRes, receiverRes, hospitalRes] = await Promise.all([
                fetch("http://localhost:5000/api/donors"),
                fetch("http://localhost:5000/api/receivers"),
                fetch("http://localhost:5000/api/hospitals"),
            ]);

            setDonors(await donorRes.json());
            setReceivers(await receiverRes.json());
            setHospitals(await hospitalRes.json());
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    // ----------------------
    // TOGGLE AVAILABILITY
    // ----------------------
    const toggleAvailability = async (id) => {
        try {
            // Get the current donor
            const donor = donors.find(d => d._id === id);
            if (!donor) return;

            const newAvailability = donor.available;

            // Update backend
            const res = await fetch(`http://localhost:5000/api/donors/${id}/availability`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ available: newAvailability }),
            });

            // Handle non-JSON error pages
            if (!res.ok) {
                const text = await res.text(); // fallback if server returns HTML
                throw new Error(text || "Failed to update availability");
            }

            const data = await res.json();

            // Update frontend immediately
            setDonors(prev =>
                prev.map(d =>
                    d._id === id ? { ...d, available: newAvailability } : d
                )
            );

            alert(data.message || "Availability updated successfully");

        } catch (err) {
            console.error("Error updating donor:", err);
            alert(err.message);
        }
    };

    // ----------------------
    // DELETE FUNCTION
    // ----------------------
    const deleteData = async (id, type) => {
        try {
            const res = await fetch(`http://localhost:5000/api/${type}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const text = await res.text(); // fallback for HTML error
                throw new Error(text || `Failed to delete ${type}`);
            }

            const data = await res.json();

            // Remove deleted item from frontend state
            if (type === "donors") setDonors(prev => prev.filter(d => d._id !== id));
            else if (type === "receivers") setReceivers(prev => prev.filter(r => r._id !== id));
            else if (type === "hospitals") setHospitals(prev => prev.filter(h => h._id !== id));

            alert(data.message || `${type} deleted successfully`);

        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };





    const styles = {
        container: {
            display: "flex",
            height: "100vh",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9fafb",
        },
        sidebar: {
            width: "230px",
            backgroundColor: "#1e293b",
            color: "white",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
        },
        sidebarItem: (tab) => ({
            padding: "12px 15px",
            margin: "5px 0",
            borderRadius: "6px",
            backgroundColor: activeTab === tab ? "#3b82f6" : "transparent",
            cursor: "pointer",
        }),
        main: {
            flexGrow: 1,
            padding: "30px",
            overflowY: "auto",
        },
        header: {
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#111827",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
        },
        th: {
            backgroundColor: "#e2e8f0",
            padding: "12px",
            textAlign: "left",
            fontWeight: "bold",
        },
        td: {
            padding: "10px",
            borderBottom: "1px solid #ddd",
            verticalAlign: "middle",
        },
        available: { color: "green", fontWeight: "bold" },
        unavailable: { color: "red", fontWeight: "bold" },
        buttonBlue: {
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "5px",
        },
        buttonRed: {
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h2 style={{ marginBottom: "20px" }}>Admin Dashboard</h2>

                <div style={styles.sidebarItem("donors")} onClick={() => setActiveTab("donors")}>
                    Donors
                </div>
                <div style={styles.sidebarItem("receivers")} onClick={() => setActiveTab("receivers")}>
                    Receivers
                </div>
                <div style={styles.sidebarItem("hospitals")} onClick={() => setActiveTab("hospitals")}>
                    Hospitals
                </div>
            </div>

            <div style={styles.main}>
                <div style={styles.header}>
                    {activeTab === "donors"
                        ? "Donor Management"
                        : activeTab === "receivers"
                            ? "Receiver Details"
                            : "Hospital Records"}
                </div>

                {/* DONORS TABLE */}
                {activeTab === "donors" && (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Availability</th>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Blood Group</th>
                                <th style={styles.th}>Phone</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>City</th>
                                <th style={styles.th}>Address</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {donors.length ? (
                                donors.map((d) => (
                                    <tr key={d._id}>
                                        <td style={styles.td}>
                                            <span style={d.available ? styles.available : styles.unavailable}>
                                                {d.available ? "Available" : "Not Available"}
                                            </span>
                                        </td>
                                        <td style={styles.td}>{d.name}</td>
                                        <td style={styles.td}>{d.bloodGroup}</td>
                                        <td style={styles.td}>{d.phone}</td>
                                        <td style={styles.td}>{d.email}</td>
                                        <td style={styles.td}>{d.city}</td>
                                        <td style={styles.td}>{d.address}</td>
                                        <td style={styles.td}>
                                            <button
                                                onClick={() => toggleAvailability(d._id)}
                                                style={{
                                                    backgroundColor: d.available ? "#ef4444" : "#22c55e",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "5px 10px",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                    marginRight: "5px",
                                                }}
                                            >
                                                {d.available ? "Unavailable" : "Available"}
                                            </button>
                                            <button
                                                style={styles.buttonRed}
                                                onClick={() => deleteData(d._id, "donors")}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={styles.td}>No donors found</td>
                                </tr>
                            )}


                        </tbody>
                    </table>
                )}

                {/* RECEIVERS TABLE */}
                {activeTab === "receivers" && (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Blood Group</th>
                                <th style={styles.th}>Phone</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>City</th>
                                <th style={styles.th}>Hospital</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {receivers.length ? (
                                receivers.map((r) => (
                                    <tr key={r._id}>
                                        <td style={styles.td}>{r.name}</td>
                                        <td style={styles.td}>{r.bloodGroup}</td>
                                        <td style={styles.td}>{r.phone}</td>
                                        <td style={styles.td}>{r.email}</td>
                                        <td style={styles.td}>{r.city}</td>
                                        <td style={styles.td}>{r.hospital}</td>

                                        <td style={styles.td}>
                                            <button
                                                style={styles.buttonRed}
                                                onClick={() => deleteData(r._id, "receivers")}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="7" style={styles.td}>No receivers found</td></tr>
                            )}
                        </tbody>
                    </table>
                )}

                {/* HOSPITALS TABLE */}
                {activeTab === "hospitals" && (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Hospital Name</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Phone</th>
                                <th style={styles.th}>City</th>
                                <th style={styles.th}>Address</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {hospitals.length ? (
                                hospitals.map((h) => (
                                    <tr key={h._id}>
                                        <td style={styles.td}>{h.name}</td>
                                        <td style={styles.td}>{h.email}</td>
                                        <td style={styles.td}>{h.phone}</td>
                                        <td style={styles.td}>{h.city}</td>
                                        <td style={styles.td}>{h.address}</td>

                                        <td style={styles.td}>
                                            <button
                                                style={styles.buttonRed}
                                                onClick={() => deleteData(h._id, "hospitals")}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" style={styles.td}>No hospitals found</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
