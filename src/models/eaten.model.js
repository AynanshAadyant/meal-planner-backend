import mongoose from "mongoose";

const EatenSchema = new mongoose.Schema({
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
  }]
}, {
  timestamps: true
});

const Eaten = mongoose.model("Eaten", EatenSchema);

export { Eaten };
