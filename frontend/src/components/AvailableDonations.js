import React, { useState, useEffect } from "react";
import axios from "axios";

const AvailableDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch available donations from the backend
  useEffect(() => {
    console.log("📡 Fetching donations...");
    axios.get("http://localhost:5000/donations")
      .then((response) => {
        console.log("✅ Donations fetched (frontend):", response.data);
        setDonations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching donations:", error);
        setError("Failed to fetch donations.");
        setLoading(false);
      });
  }, []);

  // Claim a donation
  const handleOrder = async (id) => {
    try {
      await axios.post(`http://localhost:5000/claim-donation/${id}`);
      setDonations((prevDonations) =>
        prevDonations.filter((donation) => donation._id !== id)
      );
      alert("🎉 Order placed successfully!");
    } catch (err) {
      console.error("Error claiming donation:", err);
      alert("⚠️ Failed to place order. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>🍱 Available Donations</h2>
      {loading ? (
        <p>Loading donations...</p>
      ) : error ? (
        <p>{error}</p>
      ) : donations.length === 0 ? (
        <p>No donations available at the moment.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Food</th>
              <th style={thTdStyle}>Donor</th>
              <th style={thTdStyle}>Quantity</th>
              <th style={thTdStyle}>Location</th>
              <th style={thTdStyle}>Contact</th>
              <th style={thTdStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td style={thTdStyle}>{donation.foodName}</td>
                <td style={thTdStyle}>{donation.donorName}</td>
                <td style={thTdStyle}>{donation.quantity}</td>
                <td style={thTdStyle}>{donation.location}</td>
                <td style={thTdStyle}>{donation.contact}</td>
                <td style={thTdStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => handleOrder(donation._id)}
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Inline Styles
const containerStyle = {
  padding: "20px",
  maxWidth: "900px",
  margin: "0 auto",
  textAlign: "center",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const thTdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

const buttonStyle = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default AvailableDonations;
