import express from "express";
import {
  bulkUploadIngredients,
  bulkUploadMeals,
  getAdmin
} from "../controller/admin.controller.js";
import { protectRoute } from "../middleware/user.middleware.js";
import { protectAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.route( "/admin" ).get( protectRoute, protectAdmin, getAdmin )

router.post("/ingredients/bulk-upload", protectRoute, protectAdmin, bulkUploadIngredients);
router.post("/meals/bulk-upload", protectRoute, protectAdmin, bulkUploadMeals);

export default router;
