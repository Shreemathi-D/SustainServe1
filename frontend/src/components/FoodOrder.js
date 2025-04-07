import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodOrder = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(null);

    // Fetch available food donations
    useEffect(() => {
        const fetchDonations = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/donations'); // ✅ API call
                setDonations(response.data);
                setError(null);
            } catch (err) {
                setError('❌ Error fetching donations. Try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    // Function to handle ordering food
    const placeOrder = async (id, action) => {
        try {
            if (action === "accept") {
                await axios.put(`http://localhost:5000/receive/${id}`); // ✅ API call for accepting
                setOrderSuccess(`✅ Order placed successfully for donation ID: ${id}`);
            } else {
                setOrderSuccess(`❌ Order declined for donation ID: ${id}`);
            }
            setError(null);

            // Remove the ordered item from the list
            setDonations((prevDonations) => prevDonations.filter((donation) => donation._id !== id));
        } catch (err) {
            setError('❌ Error processing order. Try again.');
        }
    };

    return (
        <div className="food-order-container">
            <h2>Available Donations</h2>
            
            {/* ✅ Show success or error messages */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {orderSuccess && <p style={{ color: 'green' }}>{orderSuccess}</p>}

            {/* ✅ Show loading state */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="donation-list">
                    {donations.length > 0 ? (
                        donations.map((donation) => (
                            <li key={donation._id} className="donation-item">
                                <strong>{donation.name}</strong> - {donation.quantity} portions <br />
                                <em>📍 Location:</em> {donation.location} <br />
                                <em>📞 Donor Contact:</em> {donation.contact} <br />

                                {/* 🔥 Wrap buttons in a flex container */}
                                <div className="button-container">
                                    <button className="order-btn accept" onClick={() => placeOrder(donation._id, "accept")}>Accept</button>
                                    <button className="order-btn decline" onClick={() => placeOrder(donation._id, "decline")}>Decline</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No food donations available at the moment.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default FoodOrder;
