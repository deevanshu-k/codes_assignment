import { NextFunction, Request, Response } from "express";

export const signUp = (req: Request, res: Response, next: NextFunction) => {
    res.send("Sign Up");
};
export const login = (req: Request, res: Response, next: NextFunction) => {
    res.send("Login");
};
