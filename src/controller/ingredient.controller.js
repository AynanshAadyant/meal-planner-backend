import { Ingredient } from "../models/ingredient.model.js";

const registerIngredient = async ( req, res) => {
    const { name, category, baseUnit, nutrition, allergen, dietaryTags } = req.body;

    if( !name || !category || !baseUnit || !nutrition || !dietaryTags ) {
        return res.status( 500 ).json( {
            status: 500,
            success: false,
            message: "Fields missing"
        })
    }

    const ingredientAlreadyExists = await Ingredient.findOne( { name: name } );

    if( ingredientAlreadyExists ) {
        return res.status( 401 ).json( {
            success: false,
            status: 401,
            message: "Ingredient already exists"
        })
    }

    const ingredient = await Ingredient.create( {
        name, 
        category,
        baseUnit,
        nutrition,
        allergen,
        dietaryTags
    })

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Ingredient listed successfully"
    })

    
}

const getAllIngrediets = async( req, res ) => {
    const ingredients = await Ingredient.find();

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        body: ingredients,
        length: ingredients.length
    })
}

const getIngredientById = async( req, res ) => {
    const { ingredientId } = req.params;

    const ingredient = await Ingredient.findById( ingredientId );

    if( !ingredient ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            body: ingredient
        })
    }

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        body: ingredient
    })
}

const updateIngredient = async( req, res ) => {
    const { name, category, baseUnit, nutrition, allergen, dietaryTags } = req.body;

    const { ingredientId } = req.params;

    const ingredient = await Ingredient.findById( ingredientId ); 
    
    if( !ingredient ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            message: "Ingredient not found"
        })
    }

    ingredient.name = name;
    ingredient.category = category;
    ingredient.baseUnit = baseUnit;
    ingredient.nutrition = nutrition;
    ingredient.allergen = allergen;
    ingredient.dietaryTags = dietaryTags;

    await ingredient.save();

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Ingredient data updated"
    } )
}

const deleteIngredient = async( req, res ) => {
    const { ingredientId } = req.params;

    if( !ingredientId ) {
        return res.status( 404 ).json({ 
            success: false,
            status: 404,
            message: "Ingredient not found"
        })
    }

    const ingredient = await Ingredient.findByIdAndDelete( ingredientId );

    if( !ingredient ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            message: "Ingredient not found"
        })
    }

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Ingredient deleted successfully"
    })

}

export { registerIngredient, getAllIngrediets, getIngredientById, updateIngredient, deleteIngredient }