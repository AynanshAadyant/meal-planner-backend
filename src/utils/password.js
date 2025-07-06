import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config( {} );

const hashPassword = async( password ) => {
    const hash = await bcrypt.hash( password, 12 );
    
    return hash;

}

const comparePasswords = async( password, comparePassword ) => {
    return await bcrypt.compare( password, comparePassword );
}

export { hashPassword, comparePasswords };