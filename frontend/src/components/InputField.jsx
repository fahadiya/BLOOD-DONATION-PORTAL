import React from "react";

const InputField = ({ label, type, name, value, onChange, placeholder, required }) => {
    const styles = {
        container: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            marginBottom: "1rem",
        },
        label: {
            fontWeight: "500",
            marginBottom: "0.3rem",
            color: "#333",
        },
        input: {
            width: "95%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "5px",
            fontSize: "1rem",
            transition: "border-color 0.3s ease",
        },
    };

    return (
        <div style={styles.container}>
            {label && <label htmlFor={name} style={styles.label}>{label}</label>}
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = "#dc2626")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
        </div>
    );
};

export default InputField;
