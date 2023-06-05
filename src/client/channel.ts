import {Api, getHeaders} from "@/client/global/utils";
import {client} from "@/client/global";

export type Channel = {
    name: string;
    type: string;
    id: number;
    updatedAt: Date;
    createdAt: Date;
    owner: {
        id: number;
        name: string;
        email: string;
    };
};
export type CreateChannel = Pick<Channel, "name" | "type"> & {
    members: number[];
};

export const createChannel = async (token: string, toCreate: CreateChannel): Promise<Channel> => {
    return await client
        .post<Api<Channel, "channel">>("/channel", toCreate, getHeaders(token))
        .then(({data}) => data.channel);
};

export const getChannelById = async (token: string, id: number): Promise<Channel> => {
    return await client
        .get<Api<Channel, "channel">>(`/channel/${id}`, getHeaders(token))
        .then(({data}) => data.channel);
};