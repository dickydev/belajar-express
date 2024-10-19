import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        msg: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, //Payload
      process.env.JWT_SECRET || "SECRETBEBAS", //JWT SECRET
      {
        expiresIn: "1h", //Expired date
      }
    );

    return res.status(200).json({
      msg: "Login successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Login Failed",
      error: error.message,
    });
  }
};

// Register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      msg: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Registration Failed",
      error: error.message,
    });
  }
};
