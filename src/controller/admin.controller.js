import { Ingredient } from "../models/ingredient.model.js";
import { Meal } from "../models/meal.model.js";
import { User } from "../models/user.model.js";

const getAdmin = async( req, res ) => {
    

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Admin authorised",
        body: req.user
    })
}

const getUsers = async( req, res ) => {
  const users = await User.find();
  return res.status( 200 ).json( {
    success: true,
    status: 200,
    message: "Fetched all users successfully",
    body: users
  })
}

const getIngredients = async( req, res ) => {
  const ingredients = await Ingredient.find();

  return res.status( 200 ).json( {
    success: true,
    status: 200,
    message: "Ingredients fetched successfully",
    body: ingredients
  })
}

const getMeals = async( req, res ) => {
  const meals = await Meal.find();

  return res.status( 200 ).json( {
    success: true,
    status: 200,
    message: "Meals fetched successfully",
    body: meals
  })
}

const bulkUploadMeals = async (req, res) => {
  const { meals } = req.body;

  if (!Array.isArray(meals) || meals.length === 0) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "No meal data provided",
    });
  }

  let missingIngredients = new Set();
  let uploadedMeals = [];

  for (const meal of meals) {
    const { name, description, type, ingredients, dietaryTags = [], allergens = [], tags = [] } = meal;

    if (!name || !description || !type || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: `Meal "${meal.name || "unknown"}" has missing required fields.`,
      });
    }

    let mealIngredients = [];
    let allergenList = [];

    for (const ing of ingredients) {
      ing.name = ing.name.toLowerCase();
      const ingredient = await Ingredient.findOne({ name: ing.name });

      if (!ingredient) {
        missingIngredients.add(ing.name);
      } else {
        mealIngredients.push({
          items: ingredient._id,
          amount: ing.amount,
          unit: ing.unit,
        });
        allergenList.push( ingredient.allergen );
      }
    }

    // Skip saving this meal if any ingredient is missing
    if (mealIngredients.length !== ingredients.length) continue;

    const mealDoc = new Meal({
      name,
      description,
      type,
      ingredients: mealIngredients,
      dietaryTags,
      allergens,
      tags,
    });

    await mealDoc.save();
    uploadedMeals.push(mealDoc);
  }

  if (missingIngredients.size > 0) {
    return res.status(207).json({
      success: false,
      status: 207,
      message: "Some ingredients were not found in DB.",
      body : {
        missingIngredients: Array.from(missingIngredients),
        uploadedMeals: uploadedMeals.map((m) => m.name),
      }
    });
  }

  return res.status(200).json({
    success: true,
    status: 200,
    message: `${uploadedMeals.length} meals uploaded successfully.`,
    uploadedMeals: uploadedMeals.map((m) => m.name),
  });
};

const testMeal = async( req, res, next ) => {
  req.meal = [
    {
    "name": "Chicken Biryani",
    "description": "Aromatic and spicy rice dish cooked with marinated chicken and traditional Indian spices.",
    "type": "lunch",
    "ingredients": [
      { "name": "Chicken", "amount": 150, "unit": "g" },
      { "name": "Rice", "amount": 100, "unit": "g" },
      { "name": "Onion", "amount": 50, "unit": "g" },
      { "name": "Tomato", "amount": 40, "unit": "g" },
      { "name": "Ginger Garlic Paste", "amount": 10, "unit": "g" },
      { "name": "Biryani Masala", "amount": 5, "unit": "g" },
      { "name": "Soyabean Oil", "amount": 15, "unit": "ml" },
      { "name": "Coriander", "amount": 5, "unit": "g" }
    ],
    "dietaryTags": ["high_protein"],
    "tags": ["spicy", "traditional", "indian"]
  },

  ]

  next();
}

export { getAdmin, getUsers, getIngredients, getMeals, bulkUploadMeals, testMeal}