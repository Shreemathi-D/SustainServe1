import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/footer.css";

const Footer = () => {
    return (
        <footer className="footer-container fade-in-section">
            <div className="footer-grid">
                {/* Contact Info */}
                <div className="footer-column">
                    <h2>Get in Touch</h2>
                    <p>📍 <strong>Address:</strong> 123 Food Donation Street, City, Country</p>
                    <p>📞 <strong>Phone:</strong> +123 456 7890</p>
                    <p>✉️ <strong>Email:</strong> support@fooddonationapp.com</p>
                </div>

                {/* Quick Links */}
                <div className="footer-column">
                    <h2>Quick Links</h2>
                    <ul className="footer-links">
                        <li><Link to="/">🏠 Home</Link></li>
                        <li><Link to="/about-us">ℹ️ About Us</Link></li>
                        <li><Link to="/donate">🤝 Donate</Link></li>
                    </ul>
                </div>
            </div>
            <p className="footer-copy">&copy; 2025 Sustain Serve App. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
