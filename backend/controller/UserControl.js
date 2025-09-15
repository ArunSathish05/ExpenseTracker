const userModel = require("../model/userModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const NewUser = async (req, res) => {
  try {
    const pass = req.body.password;
    const hashingPass = await bcrypt.hash(pass, saltRounds);
    const data = new userModel({
      email: req.body.email,
      password: hashingPass,
    });

    await data.save();
    res.json({ message: "Saved successfully!", user: true });
  } catch (err) {
    console.log("Backend Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const userData = {
        email: user.email,
        role: user.role,
        Id: user._id,
        ispremium:user.ispremium
      };
      console.log(userData);
      
      const token = jwt.sign(userData, process.env.secretOrPrivateKey);

      return res.json({
        success: true,
        message: "Login successful",
        token,
        userData,
      });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const User = require("../model/userModel");

const buypremium = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ispremium: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "Premium purchased successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Buy premium error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { NewUser, Login ,buypremium};
