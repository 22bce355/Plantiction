const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    UserName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    MobileNo: { type: String, required: true },
    Password: { type: String, required: true },
    cart: [
      {
        machineId: { type: mongoose.Schema.Types.ObjectId, ref: "BuyMachine" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
