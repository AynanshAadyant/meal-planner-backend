import express from "express";
import { protectRoute } from "../middleware/user.middleware.js";
import { protectAdmin } from "../middleware/admin.middleware.js"
import { createMeal, deleteMeal, getAllMeals, getMealById, getMealSuggestion, updateMeal } from "../controller/meal.controller.js";

const router = express.Router();

router.route("/create").post( protectRoute, protectAdmin, createMeal );

router.route( "/get" ).get( protectRoute, getAllMeals );

router.route( "/get/:mealId").get( protectRoute, getMealById );

router.route( "/suggestions" ).get( protectRoute, getMealSuggestion );

router.route( "/update" ).post( protectRoute, updateMeal );

router.route("/delete/:mealId" ).delete( protectRoute, protectAdmin, deleteMeal );

export default router;

