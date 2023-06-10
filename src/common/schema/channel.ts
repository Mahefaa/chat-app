import {object, string} from "yup";

export const createSchema = object({
    channelName: string().required(),
    type: string().equals(["private", "public"]),
});