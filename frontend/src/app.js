import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Importing Pages (Main Views)
import DonorHome from "./pages/DonorHome";
import ReceiverHome from "./pages/ReceiverHome";

// Importing Components (Public Views)
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Contributors from "./components/Contributors";
import HowToDonate from "./components/HowToDonate";
import WhereDonationsGo from "./components/WhereDonationsGo";
import Donate from "./components/Donate";
import FoodOrder from "./components/FoodOrder";
import TrackOrders from "./components/TrackOrders";
import Receiver from "./components/Receiver";
import AcceptReceiverOrder from "./components/AcceptReceiverOrder";
import AvailableDonations from "./components/AvailableDonations";
import "./app.css";

const App = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // ✅ Logout Handler
    const handleLogout = () => {
        setUser(null);
        alert("Logged out successfully!");
        navigate("/");
    };

    return (
        <div>
            <h1>Sustain Serve</h1>

            {/* ✅ Conditional Navigation Bar */}
            {user ? (
                user.type === 'receiver' ? (
                    <nav>
                        <Link to="/receiver-home">Home</Link> |
                        <Link to="/contributors">Contributors</Link> |
                        <Link to="/available-donations">Available Donations</Link> |
                        <Link to="/track-orders">Track Orders</Link> |
                        <Link to="/request-food">Request Food</Link> |
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </nav>
                ) : (
                    <nav>
                        <Link to="/donor-home">Home</Link> |
                        <Link to="/contributors">Contributors</Link> |
                        <Link to="/track-orders">Track Orders</Link> |
                        <Link to="/donate-form">Donate</Link> |
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </nav>
                )
            ) : (
                <nav>
                    <Link to="/">Home</Link> |
                    <Link to="/about-us">About Us</Link> |
                    <Link to="/contributors">Contributors</Link> |
                    <Link to="/how-to-donate">How to Donate</Link> |
                    <Link to="/where-donations-go">Where Do Our Donations Go?</Link> |
                    <Link to="/login">Login</Link> |
                    <Link to="/signup">Signup</Link>
                </nav>
            )}

            {/* ✅ Routes */}
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contributors" element={<Contributors />} />
                <Route path="/how-to-donate" element={<HowToDonate />} />
                <Route path="/where-donations-go" element={<WhereDonationsGo />} />

                {/* Donor and Receiver Pages */}
                <Route path="/donor-home" element={<DonorHome />} />
                <Route path="/receiver-home" element={<ReceiverHome />} />
                <Route path="/donate-form" element={<Donate />} />
                <Route path="/food-order" element={<FoodOrder />} />
                <Route path="/track-orders" element={<TrackOrders />} />
                <Route path="/receiver" element={<Receiver />} />
                <Route path="/accept-receiver-order" element={<AcceptReceiverOrder />} />
                <Route path="/available-donations" element={<AvailableDonations />} />
                <Route path="/request-food" element={<FoodOrder />} />

                {/* Authentication Routes */}
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
            </Routes>
        </div>
    );
};

// ✅ Login Component
const Login = ({ setUser }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("donor"); // Added user type selection

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", { 
                username, 
                password,
                type: userType 
            });
            if (response.data.success) {
                alert("Login successful!");
                setUser({ ...response.data.user, type: userType });
                navigate(userType === 'donor' ? "/donor-home" : "/receiver-home");
            } else {
                alert("Invalid username or password");
            }
        } catch (error) {
            alert(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="userType"
                            value="donor"
                            checked={userType === 'donor'}
                            onChange={() => setUserType('donor')}
                        /> Donor
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="userType"
                            value="receiver"
                            checked={userType === 'receiver'}
                            onChange={() => setUserType('receiver')}
                        /> Receiver
                    </label>
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

// ✅ Signup Component
const Signup = ({ setUser }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        type: "donor"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/signup", formData);
            if (response.data.success) {
                alert("Signup Successful!");
                setUser({ ...response.data.user, type: formData.type });
                navigate(formData.type === 'donor' ? "/donor-home" : "/receiver-home");
            }
        } catch (error) {
            alert(error.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="donor"
                            checked={formData.type === 'donor'}
                            onChange={handleChange}
                        /> Donor
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="receiver"
                            checked={formData.type === 'receiver'}
                            onChange={handleChange}
                        /> Receiver
                    </label>
                </div>
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default App;
