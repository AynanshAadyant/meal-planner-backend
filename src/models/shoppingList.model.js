import mongoose from "mongoose";

const ShoppingListSchema = new mongoose.Schema( {
    year: {
        type: Number,
        min: 2025
    },
    month: {
        type: Number,
        min: 1,
        max: 12
    },
    ration: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RequiredIngredient"
        }
    ]
}, {
    timestamps: true
});

const ShoppingList = mongoose.model( "ShoppingList", ShoppingListSchema );

export {ShoppingList}