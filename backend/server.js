const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const rentMachinesRoute = require("./routes/rentMachines");
const buyMachinesRoute = require("./routes/buyMachines");
const machineRoutes = require("./routes/machineRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// ✅ Serve uploaded images locally
app.use("/uploads", express.static("uploads"));

app.use("/api/machines", machineRoutes);
app.use("/api/rent-machines", rentMachinesRoute);
app.use("/api/buy-machines", buyMachinesRoute);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
