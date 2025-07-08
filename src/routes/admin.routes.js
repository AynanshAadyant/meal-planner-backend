import express from 'express'
import { getAdmin, getUsers, getMeals, getIngredients, bulkUploadMeals, testMeal } from '../controller/admin.controller.js'
import {protectRoute } from "../middleware/user.middleware.js"
import { protectAdmin } from "../middleware/admin.middleware.js"
import { Ingredient } from '../models/ingredient.model.js';

const router = express.Router();

router.route( '/getAdmin' ).get( protectRoute, protectAdmin, getAdmin );

router.route( '/getUsers' ).get( protectRoute, protectAdmin, getUsers );

router.route( '/getIngredients' ).get( protectRoute, protectAdmin, getIngredients );

router.route( '/getMeals' ).get( protectRoute, protectAdmin, getMeals );

router.route( '/uploadMeals' ).post( protectRoute, protectAdmin, bulkUploadMeals );

router.route( '/test' ).get( protectRoute, protectAdmin, testMeal, bulkUploadMeals )

router.route( '/lower' ).get( protectRoute, protectAdmin, async(req,res) => {
    try{
        const ingredients = await Ingredient.find();

    for( const ingredient of ingredients ) {
        ingredient.name = ingredient.name.toLowerCase();
        await ingredient.save();
    }
    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Modification successful"
    })
    }
    catch( err ) {
        console.log( "ERROR: ", err );
        return res.status( 500 ).json( 
            {
                success: false,
                status: 500,
                message: `Something went wrong\n${err}`
            }
        )
    }
})

export default router;