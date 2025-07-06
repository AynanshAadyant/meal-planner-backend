import { Ingredient } from "../models/ingredient.model.js";
import { Meal } from "../models/meal.model.js";

// Upload Ingredients
export const getAdmin = async( req, res ) => {
    const admin = req.admin;
    if( !admin ) {
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Unauthorised"
        })
    }

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Admin authorised",
        body: req.user
    })
}


export const bulkUploadIngredients = async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!Array.isArray(ingredients)) {
      return res.status(400).json({ success: false, message: "Invalid ingredient format" });
    }

    const inserted = await Ingredient.insertMany(ingredients);
    return res.status(201).json({ success: true, body: inserted });
  } catch (err) {
    console.error("Ingredient bulk upload error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Upload Meals
export const bulkUploadMeals = async (req, res) => {
  try {
    const { meals } = req.body;
    if (!Array.isArray(meals)) {
      return res.status(400).json({ success: false, message: "Invalid meal format" });
    }

    const inserted = await Meal.insertMany(meals);
    return res.status(201).json({ success: true, body: inserted });
  } catch (err) {
    console.error("Meal bulk upload error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
