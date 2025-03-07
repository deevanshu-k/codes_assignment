import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, SOMETHING_WENT_WRONG } from "../utils/message.util";
import jwt from "jsonwebtoken";

export const updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token } = req.query;
        if (!token) {
            next({ code: 400, message: BAD_REQUEST });
            return;
        }
        res.render("updatepassword", {
            url: `http://${process.env.HOST}:${process.env.PORT}/v1/api/auth/resetpassword?token=${token}`,
        });
    } catch (error) {
        next({ code: 500, message: SOMETHING_WENT_WRONG });
    }
};
