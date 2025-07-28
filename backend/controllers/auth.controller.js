
import bcrypt from "bcryptjs"; // ✅ or "bcrypt" depending on what you installed


import genToken from "../config/token.js"
import User from "../models/user.model.js"

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Normalize email to lowercase and trim spaces
    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existEmail = await User.findOne({ email: normalizedEmail });
    if (existEmail) {
      return res.status(400).json({ message: "email already exists!" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 characters!" });
    }

    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create user with normalized email
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPass,
    });

    // Generate JWT token
    const token = await genToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "None",
      secure: true, // Set to true in production with HTTPS
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Sign up failed. Please try again." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "Email doesn't exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
       sameSite: "None",
      secure: true,// ✅ Only true in production
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed. Please try again." });
  }
};


export const logout=async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"logged out successfully"})
    } catch (error) {
         return res.status(500).json({message:`logout error ${logout}`})
    }
}
