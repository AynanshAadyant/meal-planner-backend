import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js"

dotenv.config({});

const protectRoute = async( req, res, next ) => {
    
    try{ 
        const token = req.cookies.ACCESS_TOKEN;

        if( !token ) {
            return res.status( 401 ).json( {
                success: false,
                status: 401,
                message: "Token missing"
            })
        }

        const decode = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET );

        if( !decode ) {
            return res.status( 500 ).json( {
                success: false, 
                status: 500,
                message: "Cookie cannot be verified"
            })
        }

        const verifyUser = await User.findById( decode._id).select( "-password -accountStatus" );
        if( !verifyUser ) {
            return res.status( 500 ).json( {
                success : false,
                status : 500,
                message: "Token invalid"
            })
        }

        req.user = verifyUser;

        next();
    }
    catch( err ) {
        console.log("Something went wrong while checking ACCESS TOKEN" );
        return res.status( 500 ).json( {
            success: false, 
            status: 500,
            message: "Something went wrong while processing ACCESS_TOKEN"
        })
    }
}

export {protectRoute}