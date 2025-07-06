import { Meal } from "../models/meal.model.js";
import { Eaten } from "../models/Eaten.model.js";

const addEaten = async( req, res ) => {
    const { meal, mealType } = req.body;
    const { year, month, date } = req.params;

    if( !meal || !year || !month || !date ) {
        return res.status( 500 ).json( {
            status: 500,
            success: false,
            message: "Fields empty"
        })
    }  

    let EatenOnDay = await Eaten.findOne( {
        year: year,
        month: month,
        date: date
    }) 

    let eaten;
    if( !EatenOnDay ){
        eaten = await Eaten.create( {
            year, 
            month, 
            date,
            meal : [ { meal : meal, mealType : mealType } ]
        })
        return res.status( 200 ).json( {
            status: 200,
            message: "Eaten data registered as new entry",
            success: true
        })
    }
    else {
        EatenOnDay.meals.push( { meal: meal, mealType: mealType } );
        await EatenOnDay.save();

        return res.status( 200 ).json( {
            status: 200,
            success: true,
            message: "Eaten data registered in already existing entry"
        })
    }
    
}

