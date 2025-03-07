import { NextFunction, Request, Response } from "express";
import {
    BAD_REQUEST,
    LOGIN_SUCCESS,
    MAIL_SENT_FOR_PASSWORD_CHANGE,
    SOMETHING_WENT_WRONG,
    UNAUTHORIZED_REQUEST,
    USER_ALREADY_EXIST,
    USER_SIGNUP_SUCCESS,
    WRONG_EMAIL_OR_PASSWORD,
} from "../utils/message.util";
import db from "../services/db.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {
    loginRequestValidation,
    signUpRequestValidation,
} from "../validations/auth.validation";
import { AuthenticatedRequest } from "../interfaces/request.interface";
import { sendMail } from "../services/mail.service";

export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error, value } = signUpRequestValidation.validate(req.body);
        if (error) {
            next({
                code: 400,
                message: BAD_REQUEST,
                info: error,
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
            next({
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
        next({
            code: 500,
            message: SOMETHING_WENT_WRONG,
            info: error,
        });
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error, value } = loginRequestValidation.validate(req.body);
        if (error) {
            next({
                code: 400,
                message: BAD_REQUEST,
                info: error,
            });
            return;
        }

        const { email, password } = value;

        // Get user
        const user = await db.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!user) {
            next({ code: 401, message: WRONG_EMAIL_OR_PASSWORD });
            return;
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            next({ code: 401, message: WRONG_EMAIL_OR_PASSWORD });
            return;
        }

        // Generate token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                first_name: user.firstname,
                last_name: user.lastname,
            },
            String(process.env.JWT_SECRET),
            { expiresIn: "1h" }
        );

        res.status(200).json({
            code: 200,
            message: LOGIN_SUCCESS,
            token: token,
        });
    } catch (error) {
        next({
            code: 500,
            message: SOMETHING_WENT_WRONG,
            info: error,
        });
    }
};

export const forgotPassword = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            next({ code: 401, message: UNAUTHORIZED_REQUEST });
            return;
        }

        // Generate reset password token
        const token = jwt.sign(
            { id: req.user.id, email: req.user.email },
            String(process.env.JWT_SECRET_FOR_PASSWORD_RESET),
            { expiresIn: "5m" }
        );

        // Send mail
        await sendMail(
            req.user.email,
            "Reset password",
            `reset-password-url: http://${process.env.HOST}:${process.env.PORT}/updatepassword?token=${token}`
        );

        res.status(200).json({
            code: 200,
            message: MAIL_SENT_FOR_PASSWORD_CHANGE,
        });
    } catch (error) {
        next({ code: 500, message: SOMETHING_WENT_WRONG });
    }
};
