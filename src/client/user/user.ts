import {client} from "@/client/global";

export type credentials = Pick<User, "email" | "password">;
export type User = {
    id: number;
    email: string;
    password: string;
    name: string;
    googleId: string | null;
    status: UserStatus;
    bio?: string;
    image?: string;
};

export type AuthenticatedUser = User & {
    token: string;
};

export enum UserStatus {
    Away,
    Connected,
    Busy,
}

export async function login(credentials: credentials) {
    return await client.post<Api<AuthenticatedUser, "user">>("/users/login", credentials)
        .then((data) => data.data.user)
}

export type Api<T, key extends string> = {
    status: boolean;
} & {
    [P in key]: T;
};
export type createUser = credentials & Pick<User, "name" | "bio">;

export const createUser = async (user: createUser) => {
    return await client
        .post<Api<AuthenticatedUser, "user">>("/users", user)
        .then(({data}) => data.user);
};