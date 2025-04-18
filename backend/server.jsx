const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log("🔹 MONGODB_URI:", process.env.MONGODB_URI ? "Loaded ✅" : "Missing ❌");

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    console.error("❌ Error: Missing required environment variables in .env file");
    process.exit(1);
}

app.use(cors({ origin: "*" }));
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });

// Models
const User = mongoose.model("User", new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

const FoodDonation = mongoose.model("FoodDonation", new mongoose.Schema({
    donorName: String,
    foodName: String,
    quantity: Number,
    location: String,
    latitude: Number,
    longitude: Number,
    contact: String,
    received: { type: Boolean, default: false }
}));

const FoodOrder = mongoose.model("FoodOrder", new mongoose.Schema({
    receiverName: String,
    quantityNeeded: Number,
    location: String,
    latitude: Number,
    longitude: Number,
    contact: String,
    status: { type: String, default: "pending" }
}));

const ReceiverRequest = mongoose.model("ReceiverRequest", new mongoose.Schema({
    receiverName: String,
    organizationName: String,
    foodName: String,
    quantityNeeded: Number,
    location: String,
    latitude: Number,
    longitude: Number,
    contact: String,
    receiverType: String,
    status: { type: String, default: "pending" }
}));

// Signup
app.post("/signup", async (req, res) => {
    try {
        const { firstname, lastname, email, username, password } = req.body;

        // Log incoming request body
        console.log("Signup request body:", req.body);

        if (!email || !username || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstname, lastname, email, username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (err) {
        console.error("Error during signup:", err); // Specific logging for this endpoint
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: "Invalid username" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ success: true, message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
});

// Food Donation
app.post("/donate", async (req, res) => {
    const { donorName, foodName, quantity, location, contact, latitude, longitude } = req.body;
    if (!donorName || !foodName || !quantity || !location || !contact || latitude === undefined || longitude === undefined)
        return res.status(400).json({ message: "Missing required fields" });

    try {
        const donation = new FoodDonation({ donorName, foodName, quantity, location, latitude, longitude, contact });
        await donation.save();
        res.json({ success: true, message: "Donation submitted" });
    } catch (err) {
        res.status(500).json({ message: "Error submitting donation", details: err.message });
    }
});

// Get Available Donations
app.get("/donations", async (req, res) => {
    try {
        const donations = await FoodDonation.find({ received: false });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ message: "Error fetching donations", details: err.message });
    }
});
// Sample Express endpoint
app.get("/donations", async (req, res) => {
    try {
      const { lat, lon } = req.query;
  
      if (lat && lon) {
        const donations = await Donation.aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [parseFloat(lon), parseFloat(lat)],
              },
              distanceField: "distance",
              spherical: true,
            },
          },
        ]);
        res.json(donations);
      } else {
        const donations = await Donation.find(); // fallback
        res.json(donations);
      }
    } catch (error) {
      console.error("❌ Error in geo query:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
// Claim Food Donation (Updated method to PUT)
app.put("/donations/:id/status", async (req, res) => {
    const { status } = req.body;

    try {
        const donation = await FoodDonation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        // Update the donation status
        donation.received = status === "Accepted";
        await donation.save();

        // ✅ Create a FoodOrder entry if accepted
        if (status === "Accepted") {
            const newOrder = new FoodOrder({
                receiverName: "Receiver", // optional: replace with logged-in user's name
                quantityNeeded: donation.quantity,
                location: donation.location,
                latitude: donation.latitude,
                longitude: donation.longitude,
                contact: donation.contact,
                status: "Accepted"
            });

            await newOrder.save();
            console.log("📦 Food order saved:", newOrder);
        }

        res.status(200).json(donation);
    } catch (err) {
        console.error("Error processing order:", err);
        res.status(500).json({ message: 'Failed to process order', details: err.message });
    }
});

// Accept Food Order Request
app.put("/food-orders/:id/accept", async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await FoodOrder.findByIdAndUpdate(
            orderId,
            { status: "Accepted" },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: "Food order not found" });
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: "Server error while accepting order", details: err.message });
    }
});

// Show Accepted Food Orders
app.get("/food-orders/accepted", async (req, res) => {
    try {
        const acceptedOrders = await FoodOrder.find({ status: "Accepted" });
        res.json(acceptedOrders);
    } catch (err) {
        res.status(500).json({ message: "Server error while fetching accepted orders", details: err.message });
    }
});

// Track accepted donations
app.get("/track-orders", async (req, res) => {
    try {
        const acceptedDonations = await FoodDonation.find({ received: true });
        res.json(acceptedDonations);
    } catch (err) {
        res.status(500).json({ message: "Error fetching accepted donations", details: err.message });
    }
});
const handleTrack = (order) => {
    alert(`Tracking order from ${order.location}`);
    // Future: Navigate to /track/:orderId or show map popup etc.
};

// Receiver Request (Submit a new request for food)
app.post("/receiver", async (req, res) => {
    try {
      console.log("📦 Incoming data:", req.body); // log full body
  
      const { receiverName, quantityNeeded, location, latitude, longitude, contact } = req.body;
  
      if (!receiverName || !quantityNeeded || !location || latitude == null || longitude == null || !contact) {
        console.log("⚠️ Missing field(s)");
        return res.status(400).json({ error: "Missing fields" });
      }
  
      const newRequest = new ReceiverRequest({
        receiverName,
        quantityNeeded,
        location,
        latitude,
        longitude,
        contact,
      });
  
      const saved = await newRequest.save();
      console.log("✅ Saved:", saved);
  
      res.status(201).json({ success: true, message: "Request submitted" });
    } catch (err) {
      console.error("❌ Server error:", err.message);
      res.status(500).json({ error: "Internal server error", details: err.message });
    }
  });
  
  

// Get all accepted receiver requests
app.get("/receiver-requests/accepted", async (req, res) => {
    try {
        const acceptedRequests = await ReceiverRequest.find({ status: "Accepted" });
        res.json(acceptedRequests);
    } catch (err) {
        res.status(500).json({ message: "Error fetching accepted requests", details: err.message });
    }
});

// Update status of a receiver request (Accept or Decline)
app.put("/receiver-requests/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Accepted', 'Declined'].includes(status)) {
        return res.status(400).json({ error: "❌ Invalid status" });
    }

    try {
        const updatedRequest = await ReceiverRequest.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedRequest) {
            return res.status(404).json({ error: "❌ Receiver request not found" });
        }

        res.json({ success: true, message: `✅ Status updated to ${status}`, request: updatedRequest });
    } catch (error) {
        console.error("❌ Error updating request status:", error.message);
        res.status(500).json({ error: "❌ Server error", details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🔹 Server is running on port ${PORT}`);
});


