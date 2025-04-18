// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ user, handleLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine if the current route is "/receiver-home"
    const isReceiverHome = location.pathname === '/receiver-home';

    return (
        <header className="navbar">
            <div className="navbar-logo" onClick={() => navigate("/")}>
                Sustain Serve
            </div>
            <input type="checkbox" id="menu-toggle" className="menu-toggle" />
            <label htmlFor="menu-toggle" className="menu-icon">☰</label>
            <nav className="nav-links">
                {user ? (
                    // Only show certain links if the user is on the receiver-home route
                    isReceiverHome ? (
                        <>
                            <Link to="/receiver-home">Home</Link>
                                <Link to="/contributors">Contributors</Link>
                                <Link to="/available-donations">Available Donations</Link>
                                <Link to="/track-orders">Track Orders</Link>
                                <Link to="/receiver">Request Food</Link>
                                <Link to="/" onClick={handleLogout}>Logout</Link>
                        </>
                    ) : (
                        // Default navigation for receivers
                        user.type === 'receiver' ? (
                            <>
                                <Link to="/receiver-home">Home</Link>
                                <Link to="/contributors">Contributors</Link>
                                <Link to="/available-donations">Available Donations</Link>
                                <Link to="/track-orders">Track Orders</Link>
                                <Link to="/receiver">Request Food</Link>
                                <Link to="/" onClick={handleLogout}>Logout</Link>
                            </>
                        ) : (
                            // Default navigation for donors
                            <>
                                <Link to="/donor-home">Home</Link>
                                <Link to="/contributors">Contributors</Link>
                                <Link to="/track-orders">Track Orders</Link>
                                <Link to="/donate-form">Donate</Link>
                                <Link to="/" onClick={handleLogout}>Logout</Link>
                            </>
                        )
                    )
                ) : (
                    // Links for unauthenticated users
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/about-us">About Us</Link>
                        <Link to="/contributors">Contributors</Link>
                        <Link to="/how-to-donate">How to Donate</Link>
                        <Link to="/where-donations-go">Where Do Our Donations Go?</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Navbar;