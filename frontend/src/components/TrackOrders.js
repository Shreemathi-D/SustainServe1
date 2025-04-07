import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';

const TrackOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user orders (donations marked as 'Received')
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/donations'); // ✅ API call
                const receivedOrders = response.data.filter(order => order.status === 'Received'); // ✅ Show only received orders
                setOrders(receivedOrders);
            } catch (err) {
                setError('❌ Error fetching orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="track-orders-container">
            <h2>📦 Track Your Orders</h2>

            {loading && <p>Loading your orders...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && orders.length === 0 && <p>No orders placed yet.</p>}

            <ul className="order-list">
                {orders.map((order) => (
                    <li key={order._id} className="order-item">
                        <strong>{order.name}</strong> - {order.quantity} portions <br />
                        <em>📍 Location:</em> {order.location} <br />
                        <em>📞 Donor Contact:</em> {order.contact} <br />
                        <em>✅ Status:</em> Order Received
                    </li>
                ))}
            </ul>

            {/* ✅ Keeping the Map integration untouched */}
            <Map />
        </div>
    );
};

export default TrackOrders;
