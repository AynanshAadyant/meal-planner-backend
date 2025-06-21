import { User } from "../models/user.model.js";
import { calculateBMI, calculateBMR } from "../utils/bmi.js";
import { hashPassword } from "../utils/password.js"

const signUp = async (req, res) => {
  try {
    const { name, email, password, height, weight, heightUnit, weightUnit, gender, age, activityLevel, goals } = req.body;

    // Validation
    if (!name || !email || !password || !height || !weight || !heightUnit || !weightUnit || !gender || !age || !activityLevel || !goals) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword( password );

    // Create new user

    const bmi = calculateBMI( height, heightUnit, weight, weightUnit );

    const { calories, protien, cards, fats } = calculateBMR( height, weight, heightUnit, weightUnit, gender, activityLevel, goals, age);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      height,
      weight,
      heightUnit,
      weightUnit,
      gender, 
      age,
      bmi,
      activityLevel,
      goals,
      nutrition: {
        calories, 
        protien,
        carbohydrates: cards,
        fats
      }

    });

    await newUser.save();

    // Success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } 
  catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};


export {signUp}