import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard.jsx";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState("");

    // Read admin credentials from .env (CRA format)
    const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

    const handleLogin = (e) => {
        e.preventDefault();

        console.log("Loaded Email:", ADMIN_EMAIL);
        console.log("Loaded Password:", ADMIN_PASSWORD);

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setLoggedIn(true);
            setError("");
        } else {
            setError("Invalid email or password");
        }
    };

    if (loggedIn) {
        return <AdminDashboard />;
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(135deg, #3b82f6, #1e293b)",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    color: "#111827",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                    width: "350px",
                    textAlign: "center",
                }}
            >
                <h2 style={{ marginBottom: "20px", color: "#1e293b" }}>
                    Admin Login
                </h2>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                        }}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                        }}
                        required
                    />

                    {error && (
                        <p style={{ color: "red", marginBottom: "10px", fontSize: "13px" }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            border: "none",
                            padding: "10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "15px",
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
