import {object, string} from "yup";

export const createSchema = object({
    name: string().required(),
    type: string().equals(["private", "public"]),
});