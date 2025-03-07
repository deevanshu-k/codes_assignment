import { NextFunction, Request, Response } from "express";
import { UNAUTHORIZED_REQUEST } from "../utils/message.util";
import jwt from "jsonwebtoken";
import {
    AuthenticatedRequest,
    DecodedToken,
} from "../interfaces/request.interface";

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // Extract token
        const token = req.headers["authorization"];
        if (!token) {
            next({ code: 401, message: UNAUTHORIZED_REQUEST });
            return;
        }

        // Verify and decode token
        const decodedToken = jwt.verify(
            token,
            String(process.env.JWT_SECRET)
        ) as DecodedToken;
        req.user = decodedToken;

        next();
    } catch (error) {
        next({ code: 401, message: UNAUTHORIZED_REQUEST });
    }
};
