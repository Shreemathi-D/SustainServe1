import React from "react";
import "../styles/aboutus.css";

const AboutUs = () => {
    return (
        <div className="about-container">
            <section id="about-intro" className="about-card fade-in">
                <h3>About Us</h3>
                <p>
                    We are a dedicated non-profit organization working to minimize food waste and provide meals to 
                    those in need. Our mission is to connect food donors with communities facing food insecurity.
                </p>
            </section>

            <section id="about-mission" className="about-card fade-in">
                <h3>Our Mission</h3>
                <p>
                    To create a world where no food is wasted and everyone has access to nutritious meals. 
                    We achieve this by building a network of donors, volunteers, and distribution centers.
                </p>
            </section>

            <section id="about-how" className="about-card fade-in">
            <h3>How We Work</h3>
            <div className="how-we-work-container">
                <div className="work-card">
                    <p>💚 We partner with restaurants, grocery stores, and individuals to collect surplus food.</p>
                </div>
                <div className="work-card">
                    <p>🚚 Our volunteers distribute food to shelters, orphanages, and needy families.</p>
                </div>
                <div className="work-card">
                    <p>🌍 We promote sustainability and food security through community programs.</p>
                </div>
            </div>
            </section>

            <section id="about-join" className="about-card fade-in">
                <h3>Join Us</h3>
                <p>
                    Want to make a difference? Become a donor, volunteer, or supporter today. Together, we can 
                    reduce hunger and food waste!
                </p>
            </section>
        </div>
    );
};

export default AboutUs;
