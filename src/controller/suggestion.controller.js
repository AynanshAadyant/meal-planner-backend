import { Meal } from "../models/meal.model.js";

// Gives top 3 suggestions based on the nutrition required
const suggestion = async (req, res) => {
  const { nutrition } = req.body;

  if (!nutrition) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Nutrition fields are required",
    });
  }

  try {
    const allMeals = await Meal.find();

    // Compute the score (distance) for each meal based on difference in nutrition
    const scoredMeals = allMeals.map((meal) => {
      const diff =
        Math.abs(meal.calories - nutrition.calories || 0) +
        Math.abs(meal.protein - nutrition.protein || 0) +
        Math.abs(meal.carbohydrates - nutrition.carbohydrates || 0);
      return { ...meal._doc, score: diff };
    });

    // Sort meals by how close they are to the required nutrition
    scoredMeals.sort((a, b) => a.score - b.score);

    // Take top 3
    const topSuggestions = scoredMeals.slice(0, 3);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Top meal suggestions fetched successfully",
      body: topSuggestions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to fetch meal suggestions",
      error: err.message,
    });
  }
};

export { suggestion };
