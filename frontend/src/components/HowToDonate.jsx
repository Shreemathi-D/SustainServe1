import React from "react";
import { Link } from "react-router-dom";
import "../styles/howtodonate.css"

const HowToDonate = () => {
    return (
        <div className="donate-container1">
            <h2>🍽️ How to Donate Food</h2>
            <p className="donate-intro">
                Donating food is simple and impactful. Follow these easy steps to make a difference:
            </p>

            <div className="donate-step">
                <span className="emoji">🌿</span>
                <h3>Step 1: Sign Up</h3>
                <p>
                    Create an account on our platform to start donating. This helps us keep track of donations and ensure proper distribution.
                </p>
            </div>

            <div className="donate-step">
                <span className="emoji">📍</span>
                <h3>Step 2: Choose a Pickup or Drop-off Option</h3>
                <p>
                    You can either schedule a <strong>pickup</strong> from your location or find a nearby drop-off center where you can deliver the food.
                </p>
            </div>

            <div className="donate-step">
                <span className="emoji">🍏</span>
                <h3>Step 3: Select the Food Items</h3>
                <p>
                    We accept non-perishable food, fresh fruits, vegetables, dairy, and cooked meals. Ensure all food items are fresh and safe to consume.
                </p>
            </div>

            <div className="donate-step">
                <span className="emoji">🚚</span>
                <h3>Step 4: Confirm and Track Your Donation</h3>
                <p>
                    Once you've selected your items and scheduled a pickup/drop-off, our team will ensure they reach those in need. Track your donation in real-time.
                </p>
            </div>

            <div className="donate-step">
                <span className="emoji">❤️</span>
                <h3>Step 5: Make a Difference!</h3>
                <p>Your contribution helps feed hungry individuals and families. Thank you for making a positive impact! 😊</p>
            </div>

            {/* ✅ Continue to Donate Button */}
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link to="/donate-form" style={linkStyle}>
                👉 Continue to Donate
            </Link>
            </div>
        </div>
    );
};

// ✅ Styling for the button
const linkStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
};

export default HowToDonate;
