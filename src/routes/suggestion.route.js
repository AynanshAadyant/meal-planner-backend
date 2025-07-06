import express from "express";
import { suggestion } from "../controller/suggestion.controller.js";

const router = express.Router();

router.route( "/" ).post( suggestion );

export default router;