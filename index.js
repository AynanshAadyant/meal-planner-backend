import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/db/config.js";

dotenv.config();

const port = process.env.PORT || 3000;

connectDB();

app.listen( port, () => {
    console.log( "Listening on ", port );
} );