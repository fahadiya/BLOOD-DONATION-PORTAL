// 📁 src/components/ToastMessage.jsx
import React from "react";

export default function ToastMessage({ type, message, visible }) {
    const toastStyle = {
        position: "fixed",
        top: "90px",
        right: "20px",
        backgroundColor: type === "success" ? "#16a34a" : "#dc2626", // ✅ Green or Red
        color: "white",
        padding: "12px 20px",
        borderRadius: "8px",
        fontWeight: "500",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        transition: "opacity 0.4s ease-in-out",
        opacity: visible ? 1 : 0,
        zIndex: 9999,
    };

    return <div style={toastStyle}>{message}</div>;
}
