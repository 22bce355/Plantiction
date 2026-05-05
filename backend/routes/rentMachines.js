const express = require("express");
const router = express.Router();
const RentMachine = require("../models/rentMachines");

// Fetch all machines available for purchase
router.get("/", async (req, res) => {
    try {
        const machines = await RentMachine.find();
        res.json(machines);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rentable machines" });
    }
});

module.exports = router;
