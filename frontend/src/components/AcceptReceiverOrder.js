import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcceptReceiverOrder = () => {
    const [receiverRequests, setReceiverRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReceiverRequests = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/receiver-requests');
            setReceiverRequests(response.data);
            setError(null);
        } catch (error) {
            console.error('❌ Error fetching requests:', error);
            setError('Error fetching receiver requests.');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchReceiverRequests();
    }, []);

    return (
        <div>
            <h2>Receiver Requests</h2>
            {loading && <p>📦 Loading requests...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {receiverRequests.length === 0 && !loading ? <p>No requests found.</p> : null}

            {receiverRequests.map((request) => (
                <div key={request._id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                    <p><strong>Name:</strong> {request.receiverName}</p>
                    <p><strong>Quantity:</strong> {request.quantityNeeded}</p>
                    <p><strong>Location:</strong> {request.location}</p>
                    <p><strong>Contact:</strong> {request.contact}</p>
                </div>
            ))}
        </div>
    );
};

export default AcceptReceiverOrder;
