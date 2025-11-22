import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({message: "Email already exists"});

        const hashedpassword = await bcrypt.hash(password, 10);

        // Check if this is the first user - make them admin automatically
        const userCount = await User.countDocuments();
        // NOTE: The role must match the enum in User.js ('admin', 'viewer').
        const assignedRole = userCount === 0 ? "admin" : (role || "viewer"); 

        const user = await User.create({
            name,
            email,
            passwordHash: hashedpassword,
            role: assignedRole,
        });

        res.json({
            message: userCount === 0 
                ? "First user registered as admin" 
                : "User registered",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    // The JWT payload includes ID and role for easy access in middleware
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Standard JWT logout: client discards the token
    res.json({
      message: "Logout successful. Please remove token on frontend.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// New function: Allow admins to promote users to admin
export const promoteToAdmin = async (req, res) => {
  try {
    // The userId to be promoted is taken from the URL parameter
    const { userId } = req.params;
    
    // Check if the authenticated user (from authMiddleware) is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Only admins can promote users" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Role check must match the enum in User.js ('admin')
    if (user.role === 'admin') {
      return res.status(400).json({ message: "User is already an admin" });
    }

    // Set the new role
    user.role = 'admin';
    await user.save();

    res.json({
      message: "User promoted to admin successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    // Handle mongoose or other errors
    res.status(500).json({ error: err.message });
  }
};