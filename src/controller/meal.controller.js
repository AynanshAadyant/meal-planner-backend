import { Meal } from "../models/meal.model";
import { Ingredient } from "../models/ingredient.model.js";
import { calculateNutrition } from "../utils/nutrition.js";

const createMeal = async( req, res, next ) => {

    const { name, description, type, ingredients, tags=[], dietaryTags=[] } = req.body;

    if( !name || !ingredients ) {
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Required Fields empty"
        })
    }

    const mealExists = await Meal.findOne( { name: name } );

    if( mealExists ) {
        return res.status( 401 ).json( {
            success: false,
            status: 401,
            message: "Meal already exists"
        })
    }

    let nutrition = {
        macros: {
            calories : 0,
            carbohydrates: 0,
            protien: 0,
            fats: 0,
            fibre: 0,
            sugar: 0,
            sodium: 0
        },
        micros: {
            vitaminA: 0,
            vitaminB1: 0,
            vitaminB2: 0,
            vitaminB3: 0,
            vitaminB5: 0,
            vitaminB6: 0,
            vitaminB7: 0,
            vitaminB9: 0,
            vitaminB12: 0,
            vitaminC: 0,
            vitaminD: 0,
            vitaminE: 0,
            vitaminK: 0,
            iron: 0,
            magnesium: 0,
            zinc: 0,
            calcium: 0,
            potassium: 0,
        }
    }

    const ingredientsList = await Ingredient.find();

    req.ingredients = ingredientsList;

    nutrition = calculateNutrition( ingredients, ingredientsList );

    const meal = await Meal.create( {
        name,
        description,
        ingredients,
        nutrition,
        dietaryTags,
        tags
    })

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Meal created successfully"
    })
}

const getAllMeals = async( req, res ) => {
    const meals = await Meal.find();

    if( !meals ) {
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Server error while fetching all meals"
        })
    }

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        body: meals,
        message: "Meal fetched successfully"
    })
}

const getMealById = async( req, res ) => {
    const { mealId } = req.params;

    if( !mealId ) {
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message:"Error in fetching Meal id"
        })
    }

    const meal = await Meal.findById( mealId );

    if( !meal ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            message: "Meal not found"
        })
    }

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Meal fetched successfully",
        body: meal
    })
}

const updateMeal = async( req, res ) => {
    const { name, description, type, ingredients, dietaryTags=[], allergens=[], tags=[] } = req.body;

    const {mealId} = req.params;

    const meal = await Meal.findById( mealId );
    if( !meal ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            message: "Meal not found"
        })
    }

    if( !name || !description || !type || !ingredients ) {
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Fields empty"
        })
    }
    
    const ingredientList = await Ingredient.find();

    let nutrition = calculateNutrition( ingredients, ingredientList );

    meal.name = name;
    meal.description = description;
    meal.type = type;   
    meal.tags = tags;
    meal.allergens = allergens;
    meal.ingredients = ingredients;
    meal.dietaryTags = dietaryTags;
    meal.nutrition = nutrition;

    await meal.save();

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Meal updated successfully"
    })



}

const deleteMeal = async( req, res ) => {
    const {mealId} = req.params;

    if( !mealId ) {
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Error in accessing Meal id"
        })
    }

    const meal = await Meal.findByIdAndDelete( mealId );

    if( !meal ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            message: "Meal not found"
        })
    }

    return res.status( 200 ).json( {
        success: false, 
        status: 200,
        message: "Meal deleted successfully"
    })
}

export { createMeal, getAllMeals, getMealById, updateMeal, deleteMeal }