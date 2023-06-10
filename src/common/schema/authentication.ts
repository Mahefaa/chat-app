import {object, string} from "yup";

export const loginSchema = object({
    email: string().email().required(),
    password: string().min(8),
});

export const signUpSchema = loginSchema.shape({
    name: string().required(),
    bio: string(),
});