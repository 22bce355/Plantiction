const express = require("express");
const router = express.Router();
const BuyMachine = require("../models/buyMachines");

// Fetch all machines available for purchase
router.get("/", async (req, res) => {
    try {
        const machines = await BuyMachine.find();
        res.json(machines);
    } catch (error) {
        res.status(500).json({ message: "Error fetching buyable machines" });
    }
});

module.exports = router;
