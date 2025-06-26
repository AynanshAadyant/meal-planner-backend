import { MealPlan, MealPlan } from "../models/mealPlan.model";

const createMealPlan = async( req, res ) => {

    const { year, month, date, meals } = req.body;

    if( !year || !month || !date || !meals ) {
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Fields empty"
        })
    }

    const checkDuplicate = await MealPlan.find( { year: year, month: month, date: date } );
    if( checkDuplicate ) {
        return res.status( 500 ).json( {
            success:  false,
            status: 500,
            message: "Plan already present for date "
        })
    }
    
    const mealPlan = await MealPlan.create( {
        month, year, date, meals
    })

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Meal Plan created successfully"
    })
}

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

export { createMealPlan, getAllMealPlans, getMealPlanById, deleteMealPlan, updateMealPlan }