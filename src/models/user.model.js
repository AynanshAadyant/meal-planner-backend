import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    heightUnit: {
        type: String,
        enum: [ "ft", "inch", "cm", "m" ],
        default: "cm",
        requried: true
    },
    height: { //in cm
        type: Number,
        required: true,
        min: 90,
        max: 240
    },
    weightUnit: {
        type: String,
        enum: [ "kg", "lb" ],
        default: "kg",
        required: true,
    },
    weight: {
        type: Number,
        required: true,
        min: 30,
        max: 300
    },
    gender: {
        type: String,
        enum: [ "M", "F" ]
    },
    age: {
        type: String,
        min:0,
        default: 18
    },
    bmi: {
        type: Number,
        default: 25
    },
    activityLevel: {
        type: String,
        enum: [ "Sedentary", "Light", "Moderate", "Active", "Athlete" ],
        required: true,
        default: "Moderate"
    },
    goals: {
        type: String,
        enum: [ "Loss", "Gain", "Maintain" ],
        required: true,
        default: "Maintain"
    },
    nutrition :{ //required nutrition
        calories: {
            type: Number,
            min: 0,
            required: true,            
        },
        protien: {
            type: Number,
            min: 0,
            required: true, 
        },
        carbohydrates: {
            type: Number,
            min: 0,
            required: true, 
        },
        fats: {
            type: Number,
            min: 0,
            required: true, 
        }
    },
    role: {
        type: String,
        enum: [ "User", "Admin" ],
        default: "User"
    }
})


const User = mongoose.model( "User", userSchema );

export {User}