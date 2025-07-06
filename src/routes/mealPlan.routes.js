import express from "express";
import { protectRoute } from "../middleware/user.middleware.js";
import { createMealPlan, deleteMealPlan, getAllMealPlans, getMealPlanByDate, getMealPlanById, updateMealPlan } from "../controller/mealPlan.controller.js";

const router = express.Router();

router.route('/create' ).post( protectRoute, createMealPlan );

router.route( '/get' ).get( protectRoute, getAllMealPlans );

router.route( '/get/:MealPlanId' ).get( protectRoute, getMealPlanById );

router.route( '/update/:MealPlanId' ).post( protectRoute, updateMealPlan );

router.route( '/get/:year/:month/:date' ).get( protectRoute, getMealPlanByDate );

router.route( '/delete/:MealPlanId').delete( protectRoute, deleteMealPlan );

export default router;

