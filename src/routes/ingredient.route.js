import express from 'express';
import { registerIngredient, getAllIngrediets, getIngredientById, updateIngredient, deleteIngredient } from '../controller/ingredient.controller.js';
import { protectRoute } from '../middleware/user.middleware.js';
import { protectAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();    

router.route( '/create' ).post( protectRoute, protectAdmin, registerIngredient );

router.route( '/get' ).get( protectRoute, getAllIngrediets );

router.route( '/get/:ingredientId').get( protectRoute, getIngredientById );

router.route( "/update/:ingredientId" ).post( protectRoute, protectAdmin, updateIngredient );

router.route( "/delete/:ingredientId" ).delete( protectRoute, protectAdmin, deleteIngredient );

export default router;