import express from "express";
import { login, logOut, signUp, getUser, changeGoals } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/user.middleware.js";

const router = express.Router();

router.route( "/register" ).post( signUp );

router.route( "/login" ).post( login );

router.route( "/current" ).get( protectRoute, getUser );

router.route( "/updateGoals" ).post( protectRoute, changeGoals);

router.route( "/logout" ).post( protectRoute, logOut );

export default router;

