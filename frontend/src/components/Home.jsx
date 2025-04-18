import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import foodDonationImage from '../assets/food-donation.jpg'; // Adjust path based on the file's location

const Home = () => {
    return (
        
        <div className="home-container">
                <header className="hero-section">
            <div className="overlay"></div>
            <div className="hero-inner">
                <div className="hero-text">
                    <h1><span className="highlight">Sustain Serve</span></h1>
                    <p className="text1">Together, we rescue food and serve hope. Join the movement to fight hunger and food. <br />
                    <span className="text2">By donating surplus food, you can help us provide nourishment to those in need and reduce the environmental impact of food waste. Together, we can make a lasting difference.</span></p>
                    <Link to="/donate-form" className="donate-btn">🍱 Donate Now</Link>
                </div>
                <div className="hero-img-wrap">
                    <img src={foodDonationImage} alt="Food Donation" className="home-image" />
                </div>
            </div>
        </header>

            {/* About Us Section */}
            <section className="about-us fade-in-section">
                <h2>Our Story</h2><br />
                <p>
                    Sustain Serve is a passionate initiative driven by the belief that no one should go to bed hungry while food goes to waste.
                    Our journey began with a simple idea — bridge the gap between surplus and scarcity. Today, we work with a wide network of restaurants,
                    grocery stores, individuals, and volunteers who care deeply about social impact and sustainability.
                    From organizing food drives to developing tech-powered solutions for logistics and tracking, we combine compassion with innovation to tackle hunger at its roots.
                    We’ve distributed over 100,000 meals and are committed to scaling our mission globally. Let’s make food equity a reality, together.
                </p>
                <section className="fade-in-section">
                <div className="btn-wrapper">
                    <Link to="/about-us" className="learn-more-btn1">Learn More</Link>
                </div>
            </section>
            </section>

            {/* What We Do Section */}
            <section className="what-we-do slide-in-section">
                <h2>What We Do</h2>
                <div className="cards">
                    <div className="card">
                        <h3>Connect</h3>
                        <p>We connect restaurants, households, and event organizers with surplus food to local communities in need.Through our app, donors can quickly schedule pickups and track contributions.</p>
                    </div>
                    <div className="card">
                        <h3>Deliver</h3>
                        <p>Our volunteers and partners ensure that food reaches the right hands quickly and safely.We follow hygienic practices and use smart routing to optimize delivery time.</p>
                    </div>
                    <div className="card">
                        <h3>Inspire</h3>
                        <p>We raise awareness about food sustainability and build a community of conscious contributors.Through workshops, campaigns, and student programs, we nurture changemakers of tomorrow.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
