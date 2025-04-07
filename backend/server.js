const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

// Debugging environment variables
console.log("🔹 MONGODB_URI:", process.env.MONGODB_URI ? "Loaded ✅" : "Missing ❌");

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    console.error("❌ Error: Missing required environment variables in .env file");
    process.exit(1);
}

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });

// MODELS

const User = mongoose.model("User", new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

const FoodDonation = mongoose.model("FoodDonation", new mongoose.Schema({
    donorName: { type: String, required: true },
    foodName: { type: String, required: true },
    quantity: { type: Number, required: true },
    location: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    contact: { type: String, required: true },
    received: { type: Boolean, default: false }
}));

const ReceiverRequest = mongoose.model("ReceiverRequest", new mongoose.Schema({
    receiverName: { type: String, required: true },
    quantityNeeded: { type: Number, required: true },
    location: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    contact: { type: String, required: true },
    status: { type: String, default: "pending" }
}));

// ROUTES

// Signup
app.post("/signup", async (req, res) => {
    try {
        const { firstname, lastname, email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ error: "❌ Email, Username, and Password are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "❌ Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ firstname, lastname, email, username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: "✅ User registered successfully" });

    } catch (error) {
        res.status(500).json({ error: "❌ Internal Server Error", details: error.message });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "❌ Username and Password are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "❌ Invalid username" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "❌ Incorrect password" });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ success: true, message: "✅ Login successful", token });

    } catch (error) {
        res.status(500).json({ error: "❌ Internal Server Error", details: error.message });
    }
});

// Submit Donation
app.post("/donate", async (req, res) => {
    const { donorName, foodName, quantity, location, contact, latitude, longitude } = req.body;

    if (!donorName || !foodName || !quantity || !location || !contact || !latitude || !longitude) {
        return res.status(400).json({ success: false, message: "❌ Missing required fields" });
    }

    try {
        const donation = new FoodDonation({ donorName, foodName, quantity, location, latitude, longitude, contact });
        await donation.save();
        res.json({ success: true, message: "✅ Donation submitted successfully!" });
    } catch (error) {
        console.error("❌ Donation Error:", error.message);
        res.status(500).json({ success: false, message: "❌ Error submitting donation", details: error.message });
    }
});

// Get All Available Donations
app.get("/donations", async (req, res) => {
    try {
        const donations = await FoodDonation.find({ received: false });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ success: false, message: "❌ Error fetching donations", details: error.message });
    }
});




// Claim Donation
app.post("/claim-donation/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const donation = await FoodDonation.findByIdAndUpdate(id, { received: true }, { new: true });
        if (!donation) {
            return res.status(404).json({ success: false, message: "❌ Donation not found" });
        }
        res.json({ success: true, message: "✅ Donation claimed successfully" });
    } catch (error) {
        console.error("❌ Error claiming donation:", error.message);
        res.status(500).json({ success: false, message: "❌ Error claiming donation", details: error.message });
    }
});

// Submit a Receiver Request
app.post("/receiver-request", async (req, res) => {
    try {
        const { receiverName, quantityNeeded, location, latitude, longitude, contact } = req.body;

        if (!receiverName || !quantityNeeded || !location || !contact || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: "❌ All fields are required" });
        }

        const newRequest = new ReceiverRequest({ receiverName, quantityNeeded, location, latitude, longitude, contact });
        await newRequest.save();
        res.status(201).json({ success: true, message: "✅ Receiver request submitted successfully" });

    } catch (error) {
        console.error("❌ Error submitting request:", error.message);
        res.status(500).json({ error: "❌ Internal Server Error", details: error.message });
    }
});

// Accept a Donation (Receiver)
app.post("/accept-donation", async (req, res) => {
    const { donationId, receiverName, quantityNeeded, location, latitude, longitude, contact } = req.body;

    if (!donationId || !receiverName || !quantityNeeded || !location || !latitude || !longitude || !contact) {
        return res.status(400).json({ success: false, message: "❌ All fields are required" });
    }

    try {
        const donation = await FoodDonation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ success: false, message: "❌ Donation not found" });
        }

        if (donation.received) {
            return res.status(400).json({ success: false, message: "❌ Donation already claimed" });
        }

        donation.received = true;
        await donation.save();

        const receiverRequest = new ReceiverRequest({
            receiverName,
            quantityNeeded,
            location,
            latitude,
            longitude,
            contact,
            status: "accepted"
        });
        await receiverRequest.save();

        res.status(200).json({ success: true, message: "✅ Donation accepted and receiver request logged" });

    } catch (error) {
        console.error("❌ Error accepting donation:", error.message);
        res.status(500).json({ success: false, message: "❌ Internal Server Error", details: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
