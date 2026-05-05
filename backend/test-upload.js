require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });
  

// Connect to MongoDB
mongoose.connect("mongodb+srv://22bce355:Kwinsithakkar-27@plantiction.ztbgh.mongodb.net/'")
// Define Image Schema
const ImageSchema = new mongoose.Schema({
  imageUrl: String,
});
const Image = mongoose.model("Image", ImageSchema);

// Set up Multer for file uploads (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload image
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      async (error, result) => {
        if (error) return res.status(500).json({ error: error.message });

        // Save image URL to MongoDB
        const newImage = new Image({ imageUrl: result.secure_url });
        await newImage.save();

        res.json({ message: "Image uploaded successfully", url: result.secure_url });
      }
    ).end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get all images
app.get("/images", async (req, res) => {
  try {
    const images = await Image.find({}, { _id: 0, imageUrl: 1 }); // Exclude _id
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port ${PORT})"));