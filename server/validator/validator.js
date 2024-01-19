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

const blogSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Title is required.",
        "string.empty": "Title cannot be empty.",
    }),
    des: Joi.when('draft', {
        is: false,
        then: Joi.string().min(3).max(200).required().messages({
            "any.required": "Description is required.",
            "string.empty": "Description cannot be empty.",
            "string.max": "Description must be at most 200 characters long.",
        }),
        otherwise: Joi.string().default(''), // Default to an empty string if draft is true
    }),
    banner: Joi.string().required().messages({
        "any.required": "Banner is required.",
        "string.empty": "Banner cannot be empty.",
    }),
    content: Joi.object({
        blocks: Joi.array().min(1).required().messages({
            "any.required": "Content blocks are required.",
            "array.min": "Content must have at least one block.",
        }),
    }).unknown(true),
    tags: Joi.when('draft', {
        is: false,
        then: Joi.array().min(1).max(10).required().messages({
            "any.required": "Tags are required.",
            "array.min": "Tags must have at least one block.",
            "array.max": "Max 10 tags are only.",
        }),
        otherwise: Joi.array().default([]), // Default to an empty array if draft is true
    }),
}).unknown(true);

export const ValidateRegister = validator(signUpSchema);
export const ValidateLogin = validator(loginSchema)
export const ValidateBlog = validator(blogSchema)
