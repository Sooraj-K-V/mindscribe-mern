import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import generateJwt from "./generateJwt.js";
dotenv.config()

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
 
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    if (password.length < 8) {
      return res
        .status(500)
        .json({ error: "Password length should be at least 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    const newUser = new User({
      name: formattedName,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log(newUser);

    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "No user found" });
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      console.log("Incorrect password");
      return res.status(401).json({ error: "Incorrect password" });
    }
    const token = generateJwt(user)
    console.log("Login successful");
    res.json({
      message: `${user.name} logged in successfully!`,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
