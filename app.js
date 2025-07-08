import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import UserRouter from "./src/routes/user.route.js";
import MealRouter from "./src/routes/meal.route.js";
import MealPlanRouter from "./src/routes/mealPlan.routes.js";
import RationRouter from "./src/routes/ration.route.js";
import SuggestionRouter from "./src/routes/suggestion.route.js";
import AdminRouter from "./src/routes/admin.routes.js"
import IngredientRouter from "./src/routes/ingredient.route.js";

dotenv.config( {} );

const app = express();

app.use(express.static("public"));
app.use( express.json() );
app.use( express.urlencoded( {extended: true}) );
app.use( cookieParser() );
app.use( cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.use( "/api/v1/user", UserRouter );
app.use( "/api/v1/meal", MealRouter );
app.use( "/api/v1/mealPlan", MealPlanRouter );
app.use( "/api/v1/ration", RationRouter );
app.use( "/api/v1/suggestion", SuggestionRouter );
app.use( "/api/v1/admin", AdminRouter)

export default app;
