import express from "express";
import { createRequirement, getIngredients } from "../controller/RationList.controller.js";
import { protectRoute } from "../middleware/user.middleware.js";

const router = express.Router();

router.route( "/create" ).post( createRequirement );

router.route("/get").post( getIngredients );

export default router;