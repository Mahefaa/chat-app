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

export const getCurrentUser = async (token: string) => {
    return await client
        .get<Api<User, "user">>(`/user`, getHeaders(token))
        .then(({data}) => data.user);
};
export type updateUser = Omit<User, "email" | "id" | "googleId" | "image" | "status" | "password"> & {
    oldPassword?: string
}
export const updateCurrentUser = async (token: string, data: updateUser) => {
    return await client
        .put<Api<User, "user">>(`user`, data, getHeaders(token))
}

function getHeaders(token: string) {
    if (!token) {
        throw new Error("no token")
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}