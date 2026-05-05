const mongoose = require("mongoose");

const RentMachineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rent: { type: String, required: true }, // Price for buying (₹)
  location: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("RentMachine", RentMachineSchema);
