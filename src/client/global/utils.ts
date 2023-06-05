export type Api<T, key extends string> = {
    status: boolean;
} & {
    [P in key]: T;
};

export function getHeaders(token: string) {
    if (!token) {
        throw new Error("no token")
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}