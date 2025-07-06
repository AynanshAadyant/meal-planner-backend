import mongoose from "mongoose";
//stores the data for monthly ingredient consumption

const RequiredIngredientsSchema = new mongoose.Schema( {
    user : {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    year: {
        type: Number,
        min: 2025,
    },
    month: {
        type: Number,
        min: 1,
        max: 12
    },
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient"
    },
    quantity: {
        type: Number,
        min: 0,
    },
    unit: {
        type: String,
        enum: [ "kg", "g", "lbs", "oz" ],
    }
}, {
    timestamps : true
});

const RequiredIngredient = mongoose.model( "RequiredIngredient", RequiredIngredientsSchema );

export {RequiredIngredient};