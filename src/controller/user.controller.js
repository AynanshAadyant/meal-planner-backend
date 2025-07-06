import { User } from "../models/user.model.js";
import { calculateBMI, calculateBMR } from "../utils/bmi.js";
import { comparePasswords, hashPassword } from "../utils/password.js"
import { generateAccessToken } from "../utils/tokens.js";

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

    const user = await User.findById( newUser._id ).select("-password" );

    const accessToken = await generateAccessToken( user );
    // Success response
    return res.status(201)
    .cookie( "ACCESS_TOKEN", accessToken,  {
      httpOnly: true, 
      secure: false,
      sameSite: 'lax'
    })
    .json({
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

const login = async( req, res ) => {
  try{
    const { email, password } = req.body;

    if( !email || !password ) {
      return res.status( 500 ).json( {
        success: false, 
        status: 500,
        message: "Fields empty"
      })
    }

    const user = await User.findOne( { email: email } );
    if( !user ) {
      return res.status( 404 ).json( {
        success: false,
        status: 400,
        message: "User not found"
      })
    }  

    if( !comparePasswords( user.password, password ) ) {
      return res.status( 400 ).json( {
        success: false,
        status: 400,
        message: "Wrong password"
      })
    }

    const accessToken = await generateAccessToken( {_id: user._id} );

    return res.cookie( "ACCESS_TOKEN", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
    .status( 200 )
    .json( {
      success: true,
      status: 200,
      message: "User login successful"
    })

  }
  catch( err ) {
    console.error( "ERROR while logging in", err );
    return res.status( 500 ).json( {
      success: false,
      status: 500,
      message: "Internal server error"
    })
  }
}

const getUser = async( req, res ) => {
  const user = req.user;
  if( !user ) {
    return res.status( 500 ).json( {
      success: false,
      status: 500,
      message: "Internal server error while accessing user passed on by user.middleware.js"
    })
  }

  return res.status( 200 ).json( {
      success: true,
      status: 200,
      message: "User fetched successfully",
      body: user
  })
}

const changeGoals = async( req, res ) => {
  const { activityLevel, dietaryGoal } = req.body;

  if( !activityLevel || !dietaryGoal ) {
    return res.status( 500 ).json( {
      status: 500,
      success: false,
      message: "Fields are empty"
    })
  }

  const bmi = calculateBMI( req.user.height, req.user.heightUnit, req.user.weight, req.user.weightUnit );

  const { calories, protien, cards, fats } = calculateBMR( req.user.height, req.user.weight, req.user.heightUnit, req.user.weightUnit, req.user.gender, activityLevel, dietaryGoal, req.user.age);


  await User.findByIdAndUpdate( req.user._id, 
    { 
      activityLevel : activityLevel, 
      goals: dietaryGoal,
      bmi: bmi,
      nutrition: {
        calories, 
        protien,
        carbohydrates: cards,
        fats
      }
    } );

  return res.status( 200 ).json( {
    success: true,
    status: 200,
    message: "Activity Levels and Goals updated" 
  })
  
}

const logOut = async( req, res ) => {
  return res
  .cookie( accessToken )
  .status( 200 ).json( {
    success: true,
    status: 200,
    message: "Log out successful"
  })
}

export {signUp, login, getUser, changeGoals, logOut }