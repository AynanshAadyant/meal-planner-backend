function calculateNutrition(ingredients, ingredientsList) {
  const macroKeys = [
    "calories", "carbohydrates", "protein", "fats", "fibre", "sugar", "sodium"
  ];

  const microKeys = [
    "vitaminA", "vitaminB1", "vitaminB2", "vitaminB3", "vitaminB5", "vitaminB6",
    "vitaminB7", "vitaminB9", "vitaminB12", "vitaminC", "vitaminD", "vitaminE",
    "vitaminK", "iron", "magnesium", "zinc", "calcium", "potassium"
  ];

  const nutrition = {
    macros: Object.fromEntries(macroKeys.map(k => [k, 0])),
    micros: Object.fromEntries(microKeys.map(k => [k, 0]))
  };

  ingredients.forEach(({ ingredient, amount }) => {
    const match = ingredientsList.find(i => i._id.toString() === ingredient.toString());
    if (!match || !match.nutrition) return;

    const factor = amount / 100;

    macroKeys.forEach(key => {
      nutrition.macros[key] += (match.nutrition.macros?.[key] || 0) * factor;
    });

    microKeys.forEach(key => {
      nutrition.micros[key] += (match.nutrition.micros?.[key] || 0) * factor;
    });
  });

  return nutrition;
}

export { calculateNutrition }