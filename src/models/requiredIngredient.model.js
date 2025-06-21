import mongoose from "mongoose";
//stores the data for monthly ingredient demand

const RequiredIngredientsSchema = new mongoose.Schema( {
    year: {
        type: Number,
        min: 2025,
    },
    month: {
        type: Number,
        min: 1,
        max: 12
    },
    people: { //Number people this serves for a month
        type: Number,
        min: 1,
        default: 1
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