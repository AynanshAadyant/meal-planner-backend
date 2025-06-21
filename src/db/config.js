import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({});

const connectDB = async () => {
    try{
        const db = mongoose.connect( `${process.env.MONGO_URL}/meal-planner`);
        console.log( "Connected to DB" );
    }
    catch( e ) {
        console.log( "Error in connecting to DB : ", e );
    }
}

export {connectDB}; 