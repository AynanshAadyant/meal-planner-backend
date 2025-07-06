import mongoose from "mongoose";
import { Meal } from "./meal.model.js";

const MealPlanSchema = new mongoose.Schema({
  user : {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  month: {
    type: Number,
    min: 1,
    max: 12,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  date: {
    type: Number,
    min: 1,
    max: 31,
    required: true
  },
  meals: [{
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
      required: true
    },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack"],
      required: true
    }
  }],
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
    }
}, {
  timestamps: true
});

MealPlanSchema.pre("save", async function (next) {
  const mealDocs = await Meal.find({
    _id: { $in: this.meals.map(m => m.meal) }
  });

  const totalMacros = {
    calories: 0, carbohydrates: 0, protien: 0, fats: 0, fibre: 0, sugar: 0, sodium: 0
  };
  const totalMicros = {
    vitaminA: 0, vitaminB1: 0, vitaminB2: 0, vitaminB3: 0, vitaminB5: 0, vitaminB6: 0, vitaminB7: 0, vitaminB9: 0,
    vitaminB12: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0,
    iron: 0, magnesium: 0, zinc: 0, calcium: 0, potassium: 0
  };

  for (const meal of mealDocs) {
    const { macros = {}, micros = {} } = meal.nutrition || {};
    
    for (const key in totalMacros) {
      totalMacros[key] += macros[key] || 0;
    }

    for (const key in totalMicros) {
      totalMicros[key] += micros[key] || 0;
    }
  }

  this.nutrition = {
    macros: totalMacros,
    micros: totalMicros
  };

  next();
});

const MealPlan = mongoose.model("MealPlan", MealPlanSchema);

export { MealPlan };
