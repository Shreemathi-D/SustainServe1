import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AvailableDonations from "../components/AvailableDonations";
import Receiver from "../components/Receiver";
import Home from "../components/Home";
import Contributors from "../components/Contributors";
import TrackOrders from "../components/TrackOrders";

const ReceiverHome = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [view, setView] = useState(queryParams.get("view") || "home");

  useEffect(() => {
    const currentView = new URLSearchParams(location.search).get("view");
    setView(currentView || "home");
  }, [location.search]);

  const handleReceiveRequest = (formData) => {
    fetch("http://localhost:5000/receiver-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => alert("Request submitted successfully!"))
      .catch((err) => alert("Failed to submit request"));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Welcome, Receiver!</h2>
      <div style={{ marginTop: "20px" }}>
        {view === "home" && <Home />}
        {view === "contributors" && <Contributors />}
        {view === "available-donations" && <AvailableDonations />}
        {view === "track-orders" && <TrackOrders />}
        {view === "receiver" && <Receiver onReceive={handleReceiveRequest} />}
      </div>
    </div>
  );
};

export default ReceiverHome;