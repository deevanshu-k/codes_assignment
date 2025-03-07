import { NextFunction, Request, Response } from "express";
import {
    BAD_REQUEST,
    SOMETHING_WENT_WRONG,
    USER_ALREADY_EXIST,
    USER_SIGNUP_SUCCESS,
} from "../utils/message.util";
import db from "../services/db.service";
import * as bcrypt from "bcrypt";
import { signUpRequestValidation } from "../validations/auth.validation";

export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error, value } = signUpRequestValidation.validate(req.body);
        if (error) {
            res.status(400).json({
                code: 400,
                message: BAD_REQUEST,
            });
            return;
        }
        
        const { first_name, last_name, email, password } = value;

        // Ckeck if user already exist
        const user = await db.user.findFirst({
            where: {
                email: String(email),
            },
        });
        if (user) {
            res.status(400).json({
                code: 400,
                message: USER_ALREADY_EXIST,
            });
            return;
        }

        // Create password hash
        const salt_rounds = 10;
        const salt = await bcrypt.genSalt(salt_rounds);
        const hashed_password = await bcrypt.hash(password, salt);

        // Save user
        await db.user.create({
            data: {
                firstname: first_name,
                lastname: last_name,
                email: email,
                password_hash: hashed_password,
            },
        });

        res.status(200).json({
            code: 200,
            message: USER_SIGNUP_SUCCESS,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: SOMETHING_WENT_WRONG,
        });
    }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
    res.send("Login");
};
