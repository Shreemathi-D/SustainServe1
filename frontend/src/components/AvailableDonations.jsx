import React, { useState, useEffect } from "react";
import axios from "axios";

const AvailableDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch available donations from the backend
  useEffect(() => {
    const fetchDonations = (latitude, longitude) => {
      console.log("📡 Fetching donations near:", latitude, longitude);
      axios.get("http://localhost:5000/donations", {
        params: {
          lat: latitude,
          lon: longitude,
        },
      })
        .then((response) => {
          console.log("✅ Donations fetched (sorted):", response.data);
          setDonations(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("❌ Error fetching donations:", error);
          setError("Failed to fetch donations.");
          setLoading(false);
        });
    };
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchDonations(latitude, longitude);
        },
        (error) => {
          console.warn("⚠️ Location access denied. Showing all donations.");
          fetchDonations(null, null); // fallback
        }
      );
    } else {
      console.warn("⚠️ Geolocation not supported. Showing all donations.");
      fetchDonations(null, null); // fallback
    }
  }, []);
  

  // Claim a donation
  const handleOrder = async (id) => {
    try {
      await axios.put(`http://localhost:5000/donations/${id}/status`, {
        status: "Accepted", // this sets `received = true` in the backend
      });
      setDonations((prevDonations) =>
        prevDonations.filter((donation) => donation._id !== id)
      );
      alert("🎉 Order placed successfully!");
    } catch (err) {
      console.error("Error claiming donation:", err.response?.data || err.message);
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
