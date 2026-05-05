const mongoose = require("mongoose");

const BuyMachineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true }, // Price for buying (₹)
  description: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model("BuyMachine", BuyMachineSchema);
