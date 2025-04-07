import React, { useState } from "react";
import AvailableDonations from "../components/AvailableDonations";
import Receiver from "../components/Receiver";
import Home from "../components/Home";
import Contributors from "../components/Contributors";
import TrackOrders from "../components/TrackOrders";

const ReceiverHome = () => {
    const [view, setView] = useState("home");

    const handleReceiveRequest = (formData) => {
        console.log("📤 Received Food Request:", formData);

        fetch("http://localhost:5000/receiver-request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Server Response:", data);
            alert("🎉 Your food request has been submitted successfully!");
        })
        .catch(error => {
            console.error("❌ Error submitting request:", error);
            alert("⚠️ Failed to submit your request. Please try again.");
        });
    };

    return (
        <div style={containerStyle}>
            <h2>Welcome, Receiver!</h2>

            {/* Content switches based on selected view */}
            <div style={contentStyle}>
                {view === "home" && <Home />}
                {view === "contributors" && <Contributors />}
                {view === "available-donations" && <AvailableDonations />}
                {view === "request-food" && <Receiver onReceive={handleReceiveRequest} />}
                {view === "track-orders" && <TrackOrders />}
            </div>
        </div>
    );
};

const containerStyle = { textAlign: "center", padding: "20px" };
const contentStyle = { marginTop: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" };

export default ReceiverHome;
