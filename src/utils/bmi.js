const calculateBMI = ( height, heightUnit, weight, weightUnit ) => {
    let heightInMeters = 0, weightInKg = 0;

    if (heightUnit === "cm") heightInMeters = height / 100;
    else if (heightUnit === "m") heightInMeters = height;
    else if (heightUnit === "inch") heightInMeters = height * 0.0254;
    else if (heightUnit === "ft") heightInMeters = height * 0.3048;

    weightInKg = weightUnit === "lb" ? weight * 0.453592 : weight;

    const bmi = weightInKg / (heightInMeters ** 2);

    return bmi;

}

const calculateBMR = ( height ,weight, heightUnit, weightUnit, gender, activityLevel, goal, age ) => {
    let weightInKg = weightUnit === "lb" ? weight * 0.453592 : weight;

    let heightInCm;
    if( heightUnit === "m") heightInCm = height * 100;
    else if (heightUnit === "cm") heightInCm = height;
    else if (heightUnit === "inch") heightInCm = height * 0.0254;
    else if (heightUnit === "ft") heightInCm = height * 0.3048;

    let bmr = ( gender === "M" ) ? 10 * weightInKg  + 6.25 * heightInCm  - 5 * age + 5 : 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161 ;

    let activityFactor;

    if( activityLevel === "Sedentary" ) activityFactor = 1.2;
    else if( activityLevel === "Light" ) activityFactor = 1.375;
    else if( activityLevel === "Moderate" ) activityFactor = 1.55;
    else if( activityLevel === "Active" ) activityFactor = 1.725;
    else if( activityLevel === "Athlete" ) activityFactor = 1.9;

    let goalFactor;

    if( goal === "Loss" ) goalFactor = -500;
    else if( goal === "Maintain" ) goalFactor = 0;
    else if( goal === "Gain" ) goalFactor = 500;

    const tdee = ( bmr * activityFactor ) + goalFactor;

    const calories = tdee;
    const protien = ( 0.2 * calories ) / 4;
    const cards = ( 0.6 * calories ) / 4;
    const fats = ( 0.2 * calories ) / 9;

    return { calories, protien, cards, fats };
}

export {calculateBMI, calculateBMR };