const User = require("../models/UserModel");
const BuyMachine = require("../models/buyMachines");

// 🛒 Add Item to Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { machineId } = req.body;

    // Validate Machine
    const machine = await BuyMachine.findById(machineId);
    if (!machine) {
      return res.status(404).json({ message: "Machine not found!" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if item already in cart
    const existingItem = user.cart.find((item) => item.machineId.toString() === machineId);

    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity
    } else {
      user.cart.push({ machineId, quantity: 1 }); // Add new item
    }

    await user.save(); // Save cart
    res.status(200).json({ message: "Item added to cart successfully!", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

// 📤 Remove Item from Cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { machineId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Remove item from cart
    user.cart = user.cart.filter((item) => item.machineId.toString() !== machineId);
    await user.save();

    res.status(200).json({ message: "Item removed from cart!", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

// 📋 Get User's Cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("cart.machineId");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = { addToCart, removeFromCart, getCart };
