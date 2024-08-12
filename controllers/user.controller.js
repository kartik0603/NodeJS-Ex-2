const User = require("../models/user.schema");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const LoggIn = async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
          return res.status(400).json({ message: "Invalid credentials" });
      }
      res.status(200).json({ message: "Login successful", user });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
};
    


  

module.exports = { createUser, LoggIn };
