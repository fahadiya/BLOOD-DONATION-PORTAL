import React, { useState, useRef, useEffect } from "react";

const DropDownField = ({ label, name, value, onChange, options, required }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const styles = {
        container: {
            position: "relative",
            width: "100%",
            marginBottom: "1rem",
        },
        label: {
            fontWeight: "500",
            fontSize: "1rem",
            marginBottom: "0.3rem",
            color: "#333",
            textAlign: "left",
            display: "block",
        },
        dropdown: {
            width: "95%",
            padding: "8px",
            borderRadius: "6px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#ccc", // ✅ use longhand instead of border shorthand
            marginBottom: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "all 0.3s ease",
        },
        dropdownActive: {
            borderColor: "#dc2626", // ✅ no conflict now
            boxShadow: "0 0 5px rgba(220,38,38,0.3)",
        },
        menu: {
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#ccc",
            borderRadius: "6px",
            marginTop: "0.3rem",
            zIndex: 100,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            maxHeight: "200px",
            overflowY: "auto",
        },
        option: {
            padding: "0.8rem",
            cursor: "pointer",
            transition: "0.2s",
        },
    };

    const handleSelect = (opt) => {
        onChange({ target: { name, value: opt } });
        setOpen(false);
    };

    return (
        <div style={styles.container} ref={dropdownRef}>
            {label && (
                <label htmlFor={name} style={styles.label}>
                    {label}
                </label>
            )}

            <div
                style={{
                    ...styles.dropdown,
                    ...(open ? styles.dropdownActive : {}),
                }}
                onClick={() => setOpen(!open)}
            >
                <span>{value || `Select ${label}`}</span>
                <span style={{ color: "#dc2626", fontWeight: "bold" }}>
                    {open ? "▲" : "▼"}
                </span>
            </div>

            {open && (
                <div style={styles.menu}>
                    {options.map((opt, index) => (
                        <div
                            key={index}
                            style={styles.option}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#fee2e2";
                                e.currentTarget.style.color = "#b91c1c";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "white";
                                e.currentTarget.style.color = "black";
                            }}
                            onClick={() => handleSelect(opt)}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDownField;
