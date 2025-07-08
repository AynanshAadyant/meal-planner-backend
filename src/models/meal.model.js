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
        required: true
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
      ],
      required: true,
      message: "Option not available in list"
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
            
        }
    ],
    allergens: [{
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
            ]}
        ],
    tags: [
        {
            type: String,
        }
    ],
}, {
    timestamps : true
})

MealSchema.pre("save", async function (next) {
  try {
    const Ingredient = mongoose.model("Ingredient");

    const totalMacros = {
      calories: 0,
      carbohydrates: 0,
      protien: 0,
      fats: 0,
      fibre: 0,
      sodium: 0,
    };

    const totalMicros = {
      vitaminA: 0, vitaminB1: 0, vitaminB2: 0, vitaminB3: 0, vitaminB5: 0,
      vitaminB6: 0, vitaminB7: 0, vitaminB9: 0, vitaminB12: 0, vitaminC: 0,
      vitaminD: 0, vitaminE: 0, vitaminK: 0, iron: 0, magnesium: 0, zinc: 0,
      calcium: 0, potassium: 0,
    };

    const missingIngredients = [];

    for (const ing of this.ingredients) {
      const ingredientDoc = await Ingredient.findById(ing.items);

      if (!ingredientDoc) {
        missingIngredients.push(ing.items);
        continue;
      }

      const factor = ing.amount / 100; // scale factor: nutrition is per 100g/ml

      const { macros = {}, micros = {} } = ingredientDoc.nutrition || {};

      for (const key in totalMacros) {
        totalMacros[key] += (macros[key] || 0) * factor;
      }

      for (const key in totalMicros) {
        totalMicros[key] += (micros[key] || 0) * factor;
      }
    }

    this.nutrition = {
      macros: totalMacros,
      micros: totalMicros,
    };

    if (missingIngredients.length > 0) {
      console.warn("⚠️ Missing ingredient(s) during meal save:", missingIngredients);
    }

    next();
  } catch (err) {
    console.error("❌ Error in Meal pre-save hook:", err);
    next(err);
  }
});


const Meal = mongoose.model( "Meal", MealSchema );

export {Meal}