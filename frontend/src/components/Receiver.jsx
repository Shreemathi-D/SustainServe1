import React, { useState, useEffect } from "react";

const Receiver = ({ onReceive }) => {
    const [receiverType, setReceiverType] = useState("individual");
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Validate form fields
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
      
        const submissionData = { ...formData, receiverType };
      
        try {
          const response = await fetch("http://localhost:5000/receiver", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionData),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Server error");
          }
      
          const result = await response.json();
          console.log("📤 Submission successful:", result);
          alert("📤 Submission successful");
      
          if (typeof onReceive === "function") {
            onReceive(submissionData);
          }
      
          resetForm();
        } catch (err) {
          console.error("❌ Submission error:", err.message);
          setError("❌ Failed to submit request. Please try again later.");
        }
      };
      
    
    const resetForm = () => {
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
            <h2 style={headingStyle}>Food Request</h2>

            <div>
                <label style={labelStyle}>Select Receiver Type:</label>
                <select value={receiverType} onChange={(e) => setReceiverType(e.target.value)} style={selectStyle}>
                    <option value="individual">Individual</option>
                    <option value="organization">Organization</option>
                </select>
            </div>

            {error && <p style={errorStyle}>{error}</p>}

            <form onSubmit={handleSubmit} style={formStyle}>
                {receiverType === "individual" && (
                    <input
                        type="text"
                        name="receiverName"
                        placeholder="Receiver Name"
                        value={formData.receiverName}
                        onChange={handleChange}
                        required
                        style={inputStyle}
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
                        style={inputStyle}
                    />
                )}

                <input type="text" name="foodName" placeholder="Food Name" value={formData.foodName} onChange={handleChange} required style={inputStyle} />
                <input type="number" name="quantityNeeded" placeholder="Quantity Needed" value={formData.quantityNeeded} onChange={handleChange} required style={inputStyle} />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required style={inputStyle} />
                <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleChange} required style={inputStyle} />

                <button type="submit" disabled={loadingLocation} style={buttonStyle}>
                    Submit Request
                </button>
            </form>
        </div>
    );
};

/* Enhanced Styles */
const containerStyle = { 
    textAlign: "center", 
    padding: "20px", 
    backgroundColor: "#f9f9f9", 
    borderRadius: "10px", 
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", 
    maxWidth: "500px", 
    margin: "20px auto"
};

const headingStyle = {
    color: "#303481",
    marginBottom: "20px",
};

const labelStyle = {
    display: "block",
    margin: "10px 0",
    fontWeight: "bold",
};

const selectStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #D1D1D1",
};

const formStyle = { 
    display: "flex", 
    flexDirection: "column", 
    gap: "15px", 
};

const inputStyle = { 
    padding: "10px", 
    borderRadius: "5px", 
    border: "1px solid #D1D1D1",
    fontSize: "16px",
};

const buttonStyle = { 
    padding: "10px", 
    backgroundColor: "#303481", 
    color: "white", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer",
    fontWeight: "bold",
};

const errorStyle = {
    color: "red",
    margin: "10px 0",
};

export default Receiver;