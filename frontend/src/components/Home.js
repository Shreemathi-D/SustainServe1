import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <header className="hero-section">
                <h1>Welcome to the Food Donation App</h1>
                <p>Donate food, save lives! Help us fight hunger by contributing today.</p>
                <img src="/assets/food-donation.jpg" alt="Food Donation" className="home-image" />
            </header>

            {/* About Us Section */}
            <section className="about-us">
                <h2>About Us</h2>
                <p>
                    We are a non-profit organization dedicated to reducing food waste and fighting hunger. 
                    Our mission is to connect food donors with those in need, ensuring no food goes to waste.
                </p>
                <Link to="/about-us" className="learn-more-btn">Learn More</Link> {/* ✅ Fixed Link */}
            </section>

            {/* What We Do Section */}
            <section className="what-we-do">
                <h2>What We Do</h2>
                <p>
                    Our platform bridges the gap between food donors and individuals in need. We collect surplus 
                    food from donors and distribute it to shelters, orphanages, and needy communities.
                </p>
            </section>

            {/* Contact Us Section */}
            <section className="contact-us">
                <h2>Get in Touch</h2>
                <p>📍 Location: 123 Food Donation Street, City, Country</p>
                <p>📞 Phone: +123 456 7890</p>
                <p>✉️ Email: support@fooddonationapp.com</p>
                <Link to="/contact" className="contact-btn">Contact Us</Link>
            </section>
        </div>
    );
};

export default Home;
