import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All the fields are required (name, email, password)",
      });
      return;
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      res.status(400).json({
        success: false,
        message: "Email is alredy registered",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    const registeredUser = await newUser.save();
    res.status(200).json({
      success: true,
      messagge: "User has been created",
      data: {
        _id: registeredUser._id,
        name: registeredUser.name,
        email: registeredUser.email,
        role: registeredUser.role,
      },
    });
  } catch (error: any) {}
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    dotenv.config();

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: `Email and password are required`,
      });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(403).json({
        success: false,
        message: "Email or Password are wrong",
      });
      return;
    }

    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!isValid) {
      res.status(400).json({
        success: false,
        message: `Credentials invalids (Email or Password is wrong)`,
      });
      return;
    }

    const secretKey = process.env.JWT_SERVER_SECRET_KEY;

    const payload = {
      id: existingUser._id,
      role: existingUser.role,
    };

    const token = jwt.sign(payload, secretKey as string, {
      expiresIn: "24h",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        user: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error in login",
      error: error.message || error,
    });
  }
};
