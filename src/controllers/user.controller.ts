import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/request.interface";
import {
    SOMETHING_WENT_WRONG,
    SUCCESS,
    UNAUTHORIZED_REQUEST,
    USER_NOT_FOUND,
} from "../utils/message.util";
import db from "../services/db.service";

export const getUser = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            next({ code: 401, message: UNAUTHORIZED_REQUEST });
            return;
        }

        // Find user
        const user = await db.user.findFirst({
            where: { id: req.user.id, email: req.user.email },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
            },
        });
        if (!user) {
            next({ code: 404, message: USER_NOT_FOUND });
            return;
        }

        res.status(200).json({
            code: 200,
            message: SUCCESS,
            data: {
                id: user.id,
                email: user.email,
                first_name: user.firstname,
                last_name: user.lastname,
            },
        });
    } catch (error) {
        next({ code: 500, message: SOMETHING_WENT_WRONG });
    }
};
