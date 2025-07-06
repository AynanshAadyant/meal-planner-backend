import { RequiredIngredient } from "../models/requiredIngredient.model.js";

const createRequirement = async( req, res ) => {
    const { year, month, ingredient, quantity, unit } = req.body;
    if( !year || !month || !ingredient || !quantity || !unit ) {
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Fields are empty"
        })
    }

    //search for entry of ingredient on the same day, if it exists then update otherwise create new entry

    const existing = await RequiredIngredient.findOne( { year, month, ingredient } );
    if( !existing ) {
        const createRequirement = await RequiredIngredient.create( {
            year,
            month, 
            ingredient, 
            quantity,
            unit
        })

        return res.status( 200 ).json( {
            status: 200,
            success: true,
            message: "Ration requirement updated"
        })
    }
    else {
        existing.quantity += quantity;
        await existing.save();
        return res.status( 200 ).json( {
            status: 200,
            success: true,
            message: "Ration requirement created"
        })
    }
    
}

const getIngredients = async( req, res ) => {
    const { year, month } = req.body;

    if( !year || !month ){
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Fields are empty"
        })
    }

    const ration = await RequiredIngredient.find( { year: year, month : month } );
    if( !ration ) {
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Cannot fetch required ingrediets or the given date"
        })
    }
    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Ration list fetched successfully",
        body: ration
    })
}


export { createRequirement, getIngredients}