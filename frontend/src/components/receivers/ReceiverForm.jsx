import { useState } from "react";
import { Heart, User, Phone, Droplets, Hospital } from "lucide-react";
import InputField from "../InputField.jsx";
import Header from "../Header.jsx";
import DropdownField from "../DropdownField.jsx";
import ToastMessage from "../ToastMessage.jsx";

export default function BloodReceiverForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: "", type: "" });

    // 🧾 Receiver form data
    const [formData, setFormData] = useState({
        patientName: "",
        age: "",
        gender: "",
        bloodType: "",
        unitsRequired: "",
        urgency: "",
        reason: "",
        hospitalName: "",
        hospitalAddress: "",
        city: "",
        state: "",
        doctorName: "",
        contactPerson: "",
        contactPhone: "",
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState({});

    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const urgencyLevels = ["Immediate (Within 24 hrs)", "Within 2 Days", "Planned (Later)"];
    const genders = ["Male", "Female", "Other"];

    // 🧠 Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // 🧾 Form validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required";
        if (!formData.age.trim()) newErrors.age = "Age is required";
        if (parseInt(formData.age) < 1) newErrors.age = "Invalid age";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.bloodType) newErrors.bloodType = "Blood type is required";
        if (!formData.unitsRequired.trim()) newErrors.unitsRequired = "Units required is mandatory";
        if (!formData.urgency) newErrors.urgency = "Urgency level is required";
        if (!formData.reason.trim()) newErrors.reason = "Reason for transfusion is required";
        if (!formData.hospitalName.trim()) newErrors.hospitalName = "Hospital name is required";
        if (!formData.hospitalAddress.trim()) newErrors.hospitalAddress = "Hospital address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person name is required";
        if (!formData.contactPhone.trim()) newErrors.contactPhone = "Contact phone is required";
        if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";

        return {
            isValid: Object.keys(newErrors).length === 0,
            errors: newErrors,
        };
    };

    // Toast helper
    const showToast = (message, type = "success") => {
        setToast({ visible: true, message, type });
        setTimeout(() => {
            setToast({ visible: false, message: "", type: "" });
        }, 3000);
    };

    // ✅ Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { isValid, errors: validationErrors } = validateForm();
        if (!isValid) {
            setErrors(validationErrors);
            showToast("⚠️ Please fill all required fields correctly.", "error");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("http://localhost:5000/api/receivers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.patientName,
                    age: formData.age,
                    gender: formData.gender,
                    bloodGroup: formData.bloodType,
                    unitsRequired: formData.unitsRequired,
                    hospitalName: formData.hospitalName,
                    hospitalAddress: formData.hospitalAddress,
                    city: formData.city,
                    state: formData.state,
                    phone: formData.contactPhone,
                    email: formData.doctorName || "N/A",
                }),
            });

            if (!res.ok) {
                const errData = await res.text();
                throw new Error(`Server error: ${errData}`);
            }

            // const data = await res.json();

            showToast("✅ Blood request submitted successfully!", "success");
            setSubmitted(true);

            // Reset form
            setFormData({
                patientName: "",
                age: "",
                gender: "",
                bloodType: "",
                unitsRequired: "",
                urgency: "",
                reason: "",
                hospitalName: "",
                hospitalAddress: "",
                city: "",
                state: "",
                doctorName: "",
                contactPerson: "",
                contactPhone: "",
                agreeToTerms: false,
            });
            setErrors({});
        } catch (error) {
            console.error("❌ Error submitting receiver form:", error);
            showToast(error.message || "Error submitting the form!", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 💅 Styles
    const containerStyle = { padding: "20px", backgroundColor: "#fff5f5", minHeight: "100vh" };
    const cardStyle = {
        backgroundColor: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "750px",
        margin: "0 auto",
    };
    const sectionStyle = { marginBottom: "20px" };
    const gridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" };

    // ✅ Success screen
    if (submitted) {
        return (
            <div style={containerStyle}>
                <div style={cardStyle}>
                    <div style={{ textAlign: "center", marginBottom: "15px" }}>
                        <Heart style={{ color: "red", width: "40px", height: "40px" }} />
                    </div>
                    <h2 style={{ textAlign: "center" }}>Thank You!</h2>
                    <p style={{ textAlign: "center" }}>
                        Your blood request has been submitted successfully.
                    </p>
                    <button
                        style={{
                            backgroundColor: "#e53e3e",
                            color: "#fff",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            width: "100%",
                        }}
                        onClick={() => setSubmitted(false)}
                    >
                        Register Another Request
                    </button>
                </div>
                <ToastMessage type={toast.type} message={toast.message} visible={toast.visible} />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div style={containerStyle}>
                <div style={cardStyle}>
                    <h1
                        style={{
                            textAlign: "center",
                            marginBottom: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "red",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                marginRight: "10px",
                            }}
                        >
                            <Droplets style={{ color: "white", width: "20px", height: "20px" }} />
                        </span>
                        Blood Receiver Registration
                    </h1>

                    <form onSubmit={handleSubmit}>
                        {/* Patient Info */}
                        <div style={sectionStyle}>
                            <h2><User style={{ color: "#e53e3e", marginRight: "5px" }} /> Patient Details</h2>
                            <div style={gridStyle}>
                                <InputField label="Patient Name *" name="patientName" value={formData.patientName} onChange={handleChange} error={errors.patientName} />
                                <InputField label="Age *" type="number" name="age" value={formData.age} onChange={handleChange} error={errors.age} />
                                <DropdownField label="Gender *" name="gender" value={formData.gender} onChange={handleChange} options={genders} required />
                                <DropdownField label="Blood Type *" name="bloodType" value={formData.bloodType} onChange={handleChange} options={bloodTypes} required />
                            </div>
                        </div>

                        {/* Request Info */}
                        <div style={sectionStyle}>
                            <h2><Heart style={{ color: "#e53e3e", marginRight: "5px" }} /> Blood Requirement</h2>
                            <div style={gridStyle}>
                                <InputField label="Units Required *" type="number" name="unitsRequired" value={formData.unitsRequired} onChange={handleChange} error={errors.unitsRequired} />
                                <DropdownField label="Urgency *" name="urgency" value={formData.urgency} onChange={handleChange} options={urgencyLevels} required />
                            </div>
                            <InputField label="Reason for Transfusion *" name="reason" value={formData.reason} onChange={handleChange} error={errors.reason} />
                        </div>

                        {/* Hospital Info */}
                        <div style={sectionStyle}>
                            <h2><Hospital style={{ color: "#e53e3e", marginRight: "5px" }} /> Hospital Information</h2>
                            <InputField label="Hospital Name *" name="hospitalName" value={formData.hospitalName} onChange={handleChange} error={errors.hospitalName} />
                            <InputField label="Hospital Address *" name="hospitalAddress" value={formData.hospitalAddress} onChange={handleChange} error={errors.hospitalAddress} />
                            <div style={gridStyle}>
                                <InputField label="City *" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
                                <InputField label="State *" name="state" value={formData.state} onChange={handleChange} error={errors.state} />
                            </div>
                            <InputField label="Doctor Name" name="doctorName" value={formData.doctorName} onChange={handleChange} />
                        </div>

                        {/* Contact Info */}
                        <div style={sectionStyle}>
                            <h2><Phone style={{ color: "#e53e3e", marginRight: "5px" }} /> Contact Information</h2>
                            <div style={gridStyle}>
                                <InputField label="Contact Person *" name="contactPerson" value={formData.contactPerson} onChange={handleChange} error={errors.contactPerson} />
                                <InputField label="Contact Phone *" name="contactPhone" value={formData.contactPhone} onChange={handleChange} error={errors.contactPhone} />
                            </div>
                        </div>

                        {/* Consent */}
                        <div style={sectionStyle}>
                            <h2>Consent</h2>
                            <label>
                                <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
                                <span> I confirm that the information provided is true and accurate *</span>
                            </label>
                            {errors.agreeToTerms && <p style={{ color: "red" }}>{errors.agreeToTerms}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                backgroundColor: "#e53e3e",
                                color: "#fff",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Blood Request"}
                        </button>
                    </form>
                </div>

                <ToastMessage type={toast.type} message={toast.message} visible={toast.visible} />
            </div>
        </div>
    );
}
