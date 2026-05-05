const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const MachineModel = require("../models/rentMachines");
const BuyMachineModel = require("../models/buyMachines");

// 🔹 Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const sellMachine = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log("Received File:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded." });
    }

    const { type, machineName, description, price, location } = req.body;
    const localImagePath = req.file.path; // ✅ Local file path

    console.log("Uploading image to Cloudinary...");

    // 🔹 Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localImagePath, {
      folder: "machines",
      resource_type: "image",
    });

    if (!result.secure_url) {
      return res.status(500).json({ error: "Cloudinary upload failed." });
    }

    console.log("Uploaded Image URL:", result.secure_url);

    // 🔹 Delete Local Image
    fs.unlink(localImagePath, (err) => {
      if (err) console.error("Error deleting local image:", err);
      else console.log("Local image deleted successfully.");
    });

    let formattedPrice = type === "rent" ? `₹${price}/day` : `₹${price}`;
    const MachineSchema = type === "sell" ? BuyMachineModel : MachineModel;

    console.log(`Saving machine details to MongoDB (${type})...`);
    const newMachine = new MachineSchema({
      name: machineName,
      description,
      [type === "rent" ? "rent" : "price"]: formattedPrice,
      location,
      image: result.secure_url, // ✅ Save Cloudinary URL in DB
    });

    await newMachine.save();
    console.log("Machine saved successfully!");

    res.status(201).json({ message: "Machine listed successfully!", imageUrl: result.secure_url });
  } catch (error) {
    console.error("Error in sellMachine:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { sellMachine };
