import { useState } from "react";
import { Heart, User, Phone, MapPin, Droplets } from "lucide-react";
import InputField from "../InputField.jsx";
import Header from "../Header.jsx";
import DropdownField from "../DropdownField.jsx";
import ToastMessage from "../ToastMessage.jsx";

export default function BloodDonorForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: "", type: "" });

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        bloodType: "",
        weight: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        emergencyContact: "",
        emergencyPhone: "",
        agreeToTerms: false,
        agreeToContact: false,
    });

    const [errors, setErrors] = useState({});

    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

    // ✅ Age calculation
    const calculateAge = (dob) => {
        if (!dob) return "";
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // ✅ Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // ✅ Validation logic
    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.bloodType) newErrors.bloodType = "Blood type is required";
        if (!formData.weight) newErrors.weight = "Weight is required";
        if (parseFloat(formData.weight) < 40) newErrors.weight = "Minimum weight is 40 kg";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact is required";
        if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency phone is required";
        if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required";
        } else {
            const today = new Date();
            const birthDate = new Date(formData.dateOfBirth);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const actualAge =
                monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
                    ? age - 1
                    : age;
            if (actualAge < 18) newErrors.dateOfBirth = "You must be at least 18 years old to donate blood";
        }

        return {
            isValid: Object.keys(newErrors).length === 0,
            errors: newErrors,
        };
    };

    // ✅ Toast helper
    const showToast = (message, type = "success") => {
        setToast({ visible: true, message, type });
        setTimeout(() => {
            setToast({ visible: false, message: "", type: "" });
        }, 3000);
    };

    // ✅ Submit handler (fixed)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { isValid, errors: validationErrors } = validateForm();

        if (!isValid) {
            setErrors(validationErrors);
            showToast("⚠️ Please fill all required fields correctly.", "error");
            return;
        }

        setIsSubmitting(true);
        const age = calculateAge(formData.dateOfBirth);

        try {
            // 🔧 FIXED: changed res → response
            const response = await fetch("http://localhost:5000/api/donors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    bloodGroup: formData.bloodType,
                    gender: formData.gender,
                    age,
                    city: formData.city,
                    state: formData.state,
                    address: formData.address,
                })

            });

            // 🔧 FIXED: use response.json() not res.json()
            const data = await response.json();

            if (response.status === 409) {
                showToast(data.message || "Duplicate donor found!", "error");
                setIsSubmitting(false);
                return;
            }

            if (!response.ok) throw new Error(data.message || "Submission failed");

            showToast("✅ Donor registered successfully!", "success");
            setSubmitted(true);

            // ✅ Reset form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                dateOfBirth: "",
                gender: "",
                bloodType: "",
                weight: "",
                address: "",
                city: "",
                state: "",
                zipCode: "",
                emergencyContact: "",
                emergencyPhone: "",
                agreeToTerms: false,
                agreeToContact: false,
            });
            setErrors({});
        } catch (error) {
            console.error("❌ Error submitting form:", error);
            showToast(error.message || "Error submitting the form!", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ✅ Styles
    const containerStyle = { padding: "20px", backgroundColor: "#ffe5e5", minHeight: "100vh" };
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

    if (submitted) {
        return (
            <div style={containerStyle}>
                <div style={cardStyle}>
                    <div style={{ textAlign: "center", marginBottom: "15px" }}>
                        <Heart style={{ color: "red", width: "40px", height: "40px" }} />
                    </div>
                    <h2 style={{ textAlign: "center" }}>Thank You!</h2>
                    <p style={{ textAlign: "center" }}>
                        Your blood donor registration was submitted successfully.
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
                        Register Another Donor
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
                        Blood Donor Registration
                    </h1>

                    {/* ✅ FORM START */}
                    <form onSubmit={handleSubmit}>
                        {/* Personal Info */}
                        <div style={sectionStyle}>
                            <h2>
                                <User style={{ color: "#e53e3e", marginRight: "5px" }} /> Personal Information
                            </h2>
                            <div style={gridStyle}>
                                <InputField label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
                                <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                                <InputField label="Email *" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                                <InputField label="Phone *" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
                                <InputField label="Date of Birth *" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />
                                <DropdownField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} required />
                            </div>
                        </div>

                        {/* Medical Info */}
                        <div style={sectionStyle}>
                            <h2><Heart style={{ color: "#e53e3e", marginRight: "5px" }} /> Medical Information</h2>
                            <div style={gridStyle}>
                                <DropdownField label="Blood Type *" name="bloodType" value={formData.bloodType} onChange={handleChange} options={bloodTypes} required />
                                <InputField label="Weight (kg) *" type="number" name="weight" value={formData.weight} onChange={handleChange} error={errors.weight} />
                            </div>
                        </div>

                        {/* Address Info */}
                        <div style={sectionStyle}>
                            <h2><MapPin style={{ color: "#e53e3e", marginRight: "5px" }} /> Address Information</h2>
                            <InputField label="Street Address *" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
                            <div style={gridStyle}>
                                <InputField label="City *" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
                                <InputField label="State *" name="state" value={formData.state} onChange={handleChange} error={errors.state} />
                                <InputField label="ZIP Code *" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div style={sectionStyle}>
                            <h2><Phone style={{ color: "#e53e3e", marginRight: "5px" }} /> Emergency Contact</h2>
                            <div style={gridStyle}>
                                <InputField label="Contact Name *" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} error={errors.emergencyContact} />
                                <InputField label="Contact Phone *" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} error={errors.emergencyPhone} />
                            </div>
                        </div>

                        {/* Consent */}
                        <div style={sectionStyle}>
                            <h2>Consent & Terms</h2>
                            <label>
                                <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
                                <span> I agree to the terms and conditions *</span>
                            </label>
                            <br />
                            <label>
                                <input type="checkbox" name="agreeToContact" checked={formData.agreeToContact} onChange={handleChange} />
                                <span> I agree to be contacted for future donations</span>
                            </label>
                            {errors.agreeToTerms && <p style={{ color: "red" }}>{errors.agreeToTerms}</p>}
                        </div>

                        {/* Submit Button */}
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
                            {isSubmitting ? "Submitting..." : "Register as Blood Donor"}
                        </button>
                    </form>
                </div>

                <ToastMessage type={toast.type} message={toast.message} visible={toast.visible} />
            </div>
        </div>
    );
}
