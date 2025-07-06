import { MealPlan } from "../models/mealPlan.model.js";

const createMealPlan = async (req, res) => {
  try {
    const { year, month, date, mealType, meal } = req.body;

    if (!year || !month || !date || !mealType || !meal) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Fields empty",
      });
    }

    // Check for existing plan
    const existingPlan = await MealPlan.findOne({ year, month, date });

    if (!existingPlan) {
      // Create new plan
      const newPlan = await MealPlan.create({
        year,
        month,
        date,
        meals: [{ mealType, meal }],
      });

      return res.status(201).json({
        success: true,
        status: 201,
        message: "Meal Plan created successfully",
        body: newPlan
      });
    } else {
      // Append to existing plan
      existingPlan.meals.push({ mealType, meal });
      await existingPlan.save();

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Meal added to existing Meal Plan",
        body: existingPlan
      });
    }
  } catch (err) {
    console.error("Error in createMealPlan:", err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
};


const getAllMealPlans = async( req, res ) => {
    const mealPlan = await MealPlan.find();

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "All meal plans fetched successfully",
        body: mealPlan
    })
}

const getMealPlanById = async( req, res ) => {
    const {MealPlanId } = req.params;
    if( !MealPlanId) { 
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Cannot access MealPlanId"
        })
    }

    const mealPlan = await MealPlan.findById( MealPlanId );
    if( !mealPlan ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            message: "No Meal Plan found"
        })
    }

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Meal Plan fetched successfully",
        body: mealPlan
    })
}

const getMealPlanByDate = async( req, res ) => {
    const { year, month, date} = req.params;
    if( !year || !month || !date ) {
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Fields are empty"
        })
    }

    const mealPlan = await MealPlan.findOne( {
        year : year,
        month : month,
        date : date
    } )

    if( !mealPlan ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            message: "Meal Plan on the given date no found"
        })
    }
    
    return res.status(200).json( {
        success: true,
        status: 200,
        message: "Meal plan successfully fetched",
        body: mealPlan
    })
}

const updateMealPlan = async( req, res ) => {
    const { year, month, date, meals } = req.body;
    const { MealPlanId } = req.params;
    if( !MealPlanId ) {
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Error in accessing Meal Plan Id"
        })
    }

    const mealPlan = await MealPlan.findById( mealPlanId );
    if( !mealPlan ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            message: "Meal Plan not found"
        })
    }

    mealPlan.year = year;
    mealPlan.month = month;
    mealPlan.date = date;   
    mealPlan.meals = meals;

    await mealPlan.save();

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Meal Plan updated successfully"
    })
}

const deleteMealPlan = async( req, res ) => {
    const { MealPlanId } = req.params;
    if( !MealPlanId) { 
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Cannot access MealPlanId"
        })
    }
}

export { createMealPlan, getMealPlanByDate, getAllMealPlans, getMealPlanById, deleteMealPlan, updateMealPlan }