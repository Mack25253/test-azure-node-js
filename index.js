const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend requests
app.use(cors());

// Default route (API status check)
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Dice Roller API!" });
});

// Dice rolling endpoint
app.get("/roll-dice", (req, res) => {
    const sides = req.query.sides ? parseInt(req.query.sides) : 6;  // Default to a 6-sided die
    if (isNaN(sides) || sides < 1) {
        return res.status(400).json({ error: "Invalid number of sides. Must be a positive integer." });
    }
    const roll = Math.floor(Math.random() * sides) + 1;
    res.json({ diceRoll: roll });
});

// Endpoint to "wake up" the server
app.get("/wake-up", (req, res) => {
    res.json({ message: "Server is awake and running!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Dice Roller API is running on port ${PORT}`);
});
