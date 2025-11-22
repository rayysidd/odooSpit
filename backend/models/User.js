/*import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "viewer"],
      default: "viewer",
    },
    // --- NEW FIELDS FOR OTP ---
    resetPasswordOtp: {
      type: String,
      required: false
    },
    resetPasswordExpires: {
      type: Date,
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);*/
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    // Security Best Practice: Mark passwordHash as select: false
    // This ensures it is NOT returned in standard queries like User.findOne()
    // unless explicitly requested with .select('+passwordHash') in authController.js
    passwordHash: {
      type: String,
      required: true,
      select: false, // <-- ADDED THIS LINE
    },
    role: {
      type: String,
      enum: ["admin", "viewer"],
      default: "viewer",
    },
    // --- NEW FIELDS FOR OTP ---
    resetPasswordOtp: {
      type: String,
      required: false
    },
    resetPasswordExpires: {
      type: Date,
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);