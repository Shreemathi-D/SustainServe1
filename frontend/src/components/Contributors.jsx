import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contributors = () => {
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/donations');
                setContributors(response.data);
            } catch (err) {
                setError('Error fetching contributors. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchContributors();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Contributors</h2>

            {loading && <p style={styles.message}>Loading contributors...</p>}
            {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}
            {!loading && contributors.length === 0 && (
                <p style={styles.message}>No contributions available yet.</p>
            )}

            {!loading && contributors.length > 0 && (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Donor Name</th>
                            <th style={styles.th}>Food Name</th>
                            <th style={styles.th}>Quantity</th>
                            <th style={styles.th}>Location</th>
                            <th style={styles.th}>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contributors.map((contributor) => (
                            <tr key={contributor._id} style={styles.tr}>
                                <td style={styles.td}>{contributor.donorName}</td>
                                <td style={styles.td}>{contributor.foodName}</td>
                                <td style={styles.td}>{contributor.quantity}</td>
                                <td style={styles.td}>{contributor.location}</td>
                                <td style={styles.td}>{contributor.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// Inline CSS styles with animations and hover effects
const styles = {
    container: {
        margin: '20px auto',
        padding: '20px',
        maxWidth: '800px',
        textAlign: 'center',
        backgroundColor: '#f7f7f7',
        borderRadius: '10px',
        transition: 'all 0.3s ease-in-out',
    },
    title: {
        fontSize: '28px',
        marginBottom: '20px',
        color: '#303481',
        animation: 'fadeIn 1s ease-out',
    },
    message: {
        color: '#666',
        fontSize: '18px',
        transition: 'opacity 0.5s ease-in-out',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '20px 0',
        animation: 'fadeIn 1s ease-out',
    },
    th: {
        padding: '12px',
        backgroundColor: '#B4B4B3',
        color: 'black',
        border: '1px solid #ddd',
        textAlign: 'left',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',  // Indicate the header is interactive
    },
    td: {
        padding: '12px',
        border: '1px solid #ddd',
        textAlign: 'left',
        color: '#333',
        transition: 'background-color 0.3s ease',
    },
    tr: {
        backgroundColor: '#f9f9f9',
        transition: 'background-color 0.3s ease, transform 0.3s ease-in-out',
    },
    trHover: {
        backgroundColor: '#e9f5ff',
        transform: 'scale(1.02)',
    },
};

// Global CSS for keyframes animation (This should be included in your global CSS file or in the head of your HTML)
const fadeIn = `
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`;

// Add keyframe to style
const stylesWithAnimation = { ...styles, fadeIn };

// Exporting the component
export default Contributors;
