const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
const registerUser = async (req, res) => {
  const { UserName, Email, MobileNo, Npassword, Cpassword } = req.body;

  try {
    // Check if passwords match
    if (Npassword !== Cpassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Npassword, salt);

    // Create new user
    const newUser = new User({
      UserName,
      Email,
      MobileNo,
      Password: hashedPassword,
    });

    await newUser.save(); // Save user in DB

    res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send success response
    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        UserName: user.UserName,
        Email: user.Email,
        MobileNo: user.MobileNo,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };
