import Joi from "joi";
import joi from "joi";

export const signUpRequestValidation = joi.object<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}>({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const loginRequestValidation = joi.object<{
    email: string;
    password: string;
}>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
