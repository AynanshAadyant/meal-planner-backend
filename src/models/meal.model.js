import mongoose from "mongoose";

const MealSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },
    type: {
        type: String,
        enum: [
        "breakfast",
        "lunch",
        "dinner",
        "snack",
        "dessert",
        "appetizer",
        "beverage"
      ]
    },
    ingredients: [
        {
            items: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Ingredient"
            },
            amount: {
                type: Number,
                min: 0
            },
            unit: {
                type: String,
            }
        }
    ],
    nutrition: { //per serving
        macros: { //unit-> grams
            calories: {
                type: Number,
                min: 0,
                required: true,
            },
            carbohydrates: {
                type: Number,
                min:0,
            },
            protien: {
                type: Number,
                min: 0
            },
            fats: {
                type: Number,
                min: 0
            },
            fibre: {
                type: Number,
                min: 0
            },
            sugar: {
                type: Number,
                min: 0
            },
            sodium: {
                type: Number,
                min: 0
            },
        },
        micros: { //unit -> micrograms
            vitaminA: {
                type: Number,
                min: 0
            },
            vitaminB1: {
                type: Number,
                min: 0
            },
            vitaminB2: {
                type: Number,
                min: 0
            },
            vitaminB3: {
                type: Number,
                min: 0
            },
            vitaminB5: {
                type: Number,
                min: 0
            },
            vitaminB6: {
                type: Number,
                min: 0
            },
            vitaminB7: {
                type: Number,
                min: 0
            },
            vitaminB9: {
                type: Number,
                min: 0
            },
            vitaminB12: {
                type: Number,
                min: 0
            },
            vitaminC: {
                type: Number,
                min: 0
            },
            vitaminD: {
                type: Number,
                min: 0
            },
            vitaminE: {
                type: Number,
                min: 0
            },
            vitaminK: {
                type: Number,
                min: 0
            },
            iron: {
                type: Number,
                min: 0
            },
            magnesium: {
                type: Number,
                min: 0
            },
            zinc: {
                type: Number,
                min: 0
            },
            calcium: {
                type: Number,
                min: 0
            },
            potassium: {
                type: Number,
                min: 0
            },

        }
    },
    dietaryTags: [
        {
            type: String, 
            enum: [
                    "vegetarian",
                    "vegan",
                    "gluten_free",
                    "dairy_free",
                    "keto",
                    "low_carb",
                    "low_fat",
                    "high_protein"
            ]
        }
    ],
    allergens: [{
        items: {
            type: String,
            enum: [
                "gluten",
                "dairy",
                "eggs",
                "nuts",
                "peanuts",
                "soy",
                "shellfish",
                "fish",
                "sesame"
            ]
        }
    }],
    tags: [
        {
            type: String,
        }
    ],
}, {
    timestamps : true
})

const Meal = mongoose.model( "Meal", MealSchema );

export {Meal}