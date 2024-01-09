import Joi from "joi";

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const signUpSchema = Joi.object({
    fullname: Joi.string().min(3).max(255).required().messages({
        "any.required": "Name is required.",
        "string.empty": "Name cannot be empty.",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email is required.",
        "string.empty": "Email cannot be empty.",
        "string.email": "Invalid email format.",
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).messages({
        "string.pattern.base":
            'Password must contain only letters, numbers, or "@" and be between 3 and 30 characters long.',
        "any.required": "Password is required.",
        "string.empty": "Password cannot be empty.",
    }),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "Email is required.",
        "string.empty": "Email cannot be empty.",
        "string.email": "Invalid email format.",
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).messages({
        "string.pattern.base":
            'Password must contain only letters, numbers, or "@" and be between 3 and 30 characters long.',
        "any.required": "Password is required.",
        "string.empty": "Password cannot be empty.",
    }),
});

export const ValidateRegister = validator(signUpSchema);
export const ValidateLogin = validator(loginSchema)
