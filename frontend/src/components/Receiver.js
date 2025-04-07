import React, { useState, useEffect } from "react";

const Receiver = ({ onReceive }) => {
    const [receiverType, setReceiverType] = useState("individual"); // ✅ Receiver Type Toggle

    const [formData, setFormData] = useState({
        receiverName: "",
        foodName: "",
        quantityNeeded: "",
        location: "",
        contact: "",
        latitude: null,
        longitude: null,
        organizationName: "",
    });

    const [error, setError] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(true);

    // ✅ Get User's Location (Latitude & Longitude)
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData((prevData) => ({
                        ...prevData,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }));
                    setLoadingLocation(false);
                },
                (error) => {
                    console.error("Geolocation Error:", error);
                    setError("❌ Location access is required to submit a request.");
                    setLoadingLocation(false);
                }
            );
        } else {
            setError("❌ Geolocation is not supported by your browser.");
            setLoadingLocation(false);
        }
    }, []);

    // ✅ Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.foodName ||
            !formData.quantityNeeded ||
            !formData.location ||
            !formData.contact ||
            !formData.latitude ||
            !formData.longitude ||
            (receiverType === "individual" && !formData.receiverName) ||
            (receiverType === "organization" && !formData.organizationName)
        ) {
            setError("❌ All fields are required.");
            return;
        }

        setError(null);

        // ✅ Ensure `receiverType` is included
        const submissionData = {
            ...formData,
            receiverType,
        };

        console.log("📤 Submitting Form Data:", submissionData);

        onReceive(submissionData); // Pass data to parent function

        // ✅ Reset form but keep latitude & longitude
        setFormData((prevData) => ({
            receiverName: "",
            foodName: "",
            quantityNeeded: "",
            location: "",
            contact: "",
            latitude: prevData.latitude,
            longitude: prevData.longitude,
            organizationName: "",
        }));
    };

    return (
        <div style={containerStyle}>
            <h2>Food Request</h2>

            {/* ✅ Receiver Type Selection */}
            <div>
                <label>Select Receiver Type: </label>
                <select value={receiverType} onChange={(e) => setReceiverType(e.target.value)}>
                    <option value="individual">Individual</option>
                    <option value="organization">Organization</option>
                </select>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* ✅ Request Form */}
            <form onSubmit={handleSubmit} style={formStyle}>
                {/* ✅ Conditional Input Fields */}
                {receiverType === "individual" && (
                    <input
                        type="text"
                        name="receiverName"
                        placeholder="Receiver Name"
                        value={formData.receiverName}
                        onChange={handleChange}
                        required
                    />
                )}

                {receiverType === "organization" && (
                    <input
                        type="text"
                        name="organizationName"
                        placeholder="Organization Name"
                        value={formData.organizationName}
                        onChange={handleChange}
                        required
                    />
                )}

                <input type="text" name="foodName" placeholder="Food Name" value={formData.foodName} onChange={handleChange} required />
                <input type="number" name="quantityNeeded" placeholder="Quantity Needed" value={formData.quantityNeeded} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleChange} required />

                <button type="submit" disabled={loadingLocation} style={buttonStyle}>
                    Submit Request
                </button>
            </form>
        </div>
    );
};

/* ✅ Styles */
const containerStyle = { textAlign: "center", padding: "20px" };
const formStyle = { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "auto" };
const buttonStyle = { padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" };

export default Receiver;