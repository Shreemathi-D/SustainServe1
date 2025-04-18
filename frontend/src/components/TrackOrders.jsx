import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Map from '../Map';

const TrackOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/track-orders');
                setOrders(response.data);
            } catch (err) {
                setError('❌ Error fetching orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleTrack = (order) => {
        setSelectedLocation({
            name: order.name,
            location: order.location,
            lat: order.latitude,
            lon: order.longitude
        });
    };

    return (
        <div style={containerStyle}>
            <motion.h2
                style={headingStyle}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                📦 Track Your Orders
            </motion.h2>

            {loading && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    Loading your orders...
                </motion.p>
            )}

            {error && <p style={errorStyle}>{error}</p>}

            {!loading && orders.length === 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={noOrdersStyle}
                >
                    No orders placed yet.
                </motion.p>
            )}

            <div style={listContainerStyle}>
                {orders.map((order, index) => (
                    <motion.div
                        key={order._id}
                        style={orderCardStyle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <h3 style={orderNameStyle}>{order.name}</h3>
                        <p><strong>🧺 Quantity:</strong> {order.quantity} portions</p>
                        <p><strong>📍 Location:</strong> {order.location}</p>
                        <p><strong>📞 Donor Contact:</strong> {order.contact}</p>
                        <p><strong>✅ Status:</strong> Received</p>
                        <button style={trackBtnStyle} onClick={() => handleTrack(order)}>Track</button>
                    </motion.div>
                ))}
            </div>

            {/* 📍 Show Map with selected location */}
            <div style={{ marginTop: "40px" }}>
                <Map selectedLocation={selectedLocation} />
            </div>
        </div>
    );
};
// Other styles unchanged (containerStyle, headingStyle, etc.)

// ------------------ Styles ------------------

const containerStyle = {
    padding: "40px 20px",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "'Arial', sans-serif",
    textAlign: "center"
};
const trackBtnStyle = {
    marginTop: "15px",
    padding: "8px 16px",
    backgroundColor: "#303481",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s"
};

const headingStyle = {
    fontSize: "30px",
    color: "#303481",
    marginBottom: "30px"
};

const listContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px"
};

const orderCardStyle = {
    backgroundColor: "#f9f9ff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    maxWidth: "300px",
    textAlign: "left"
};

const orderNameStyle = {
    marginBottom: "10px",
    fontSize: "20px",
    color: "#303481"
};

const errorStyle = {
    color: "red",
    fontWeight: "bold",
    marginTop: "20px"
};

const noOrdersStyle = {
    fontStyle: "italic",
    color: "#666"
};

export default TrackOrders;
