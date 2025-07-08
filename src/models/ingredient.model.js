import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String, 
        required: true,
        trim: true,
        enum: [  "protein",
        "vegetables",
        "fruits",
        "grains",
        "dairy",
        "fats_oils",
        "herbs_spices",
        "condiments",
        "beverages",
        "nuts_seeds",
        "legumes",
        "sweeteners",
        "other"]
    },
    baseUnit: {
        type: String,
        required: true,
        enum: ["g", "kg", "oz", "lb",
        "ml", "l", "fl_oz", "cup",
        "tsp", "tbsp",
        "piece", "slice", "clove", "bunch"]
    },
    nutrition: { //per 100 grams
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
    allergen: {
        type: String,
        enum: ["gluten",
          "dairy",
          "milk",
          "egg",
          "eggs",
          "nuts",
          "peanuts",
          "soy",
          "shellfish",
          "fish",
          "sesame", "none"],
    },
    substitute: [ {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ingredient"
        },
        portion: {
            type: Number
        }
    }],
    dietaryTags: [
        {
            type: String,
        }
    ],
}, {
    timestamps: true,
})

IngredientSchema.pre( 'save' , async function( next ) {
    this.name = this.name.toLowerCase();
    next();
})


const Ingredient = mongoose.model( "Ingredient", IngredientSchema );

export {Ingredient};