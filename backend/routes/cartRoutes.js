const express = require("express");
const { addToCart, removeFromCart, getCart } = require("../controllers/CartController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addToCart); // Add item
router.post("/remove", authMiddleware, removeFromCart); // Remove item
router.get("/", authMiddleware, getCart); // Get user cart

module.exports = router;
