import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddlewares.js";
import  User  from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";

export const register = catchAsyncErrors(async (req, res, next) => {

    try{
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
          return next(new ErrorHandler("Please provide all required fields", 400));
        }

        const existingUser = await User.findOne({ where: { email,accountVerified: true } });
        if (existingUser) {
          return next(new ErrorHandler("User already exists", 400));
        }

        const registrationAttemptsByUser = await User.find({
            email,
            accountVerified: false,
        })
        if (registrationAttemptsByUser.length >= 5) {
            return next(new ErrorHandler("Too many registration attempts. Please try again later.", 429));
        }   

        if(password.length < 8 || password.length > 16){
            return next(new ErrorHandler("Password must be between 8 and 16 characters", 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
 
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
        });

        const verificationCode = await user.generateVerificationCode();
        await user.save();
        
        sendVerificationCode(verificationCode,email,res);  


    } catch(err){
        console.log(err);
    }

});
