const express = require("express");
const { detectIntent } = require("../services/dialogflowService");

const router = express.Router();

router.post("/chat", async (req, res) => {
    try {
        const response = await detectIntent(req.body.query, req.body.sessionId);
        res.json({ response });
    } catch (error) {
        console.error("Dialogflow Error:", error);
        res.status(500).json({ error: "Failed to process query" });
    }
});

module.exports = router;
