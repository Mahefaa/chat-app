import {Api, getHeaders} from "@/common/client/global/utils";
import {User} from "@/common/client/user";
import {client} from "@/common/client/global";

export type Message = {
    id: number;
    content: string;
    recipientId: number;
    channelId: number;
    updatedAt: Date;
    createdAt: Date;
    senderId: number;
    sender: Pick<User, "id" | "name" | "email" | "image">;
};

type MessagePayload = {
    content: string;
} & Partial<Pick<Message, "channelId" | "recipientId">>;
export const getMessagesByChannel = async (
    token: string,
    channelId: number
): Promise<Message[]> => {
    return await client
        .get<Api<Message[], "messages">>(`/messages/channel/${channelId}`, getHeaders(token))
        .then(({data}) => data.messages);
};
const sendMessage = async (token: string, payload: MessagePayload): Promise<Message> => {
    return await client
        .post<Api<Message, "message">>(`/message`, payload, getHeaders(token))
        .then(({data}) => data.message);
};
export const sendMessageToChannel = async (token: string, channelId: number, content: string) => {
    return await sendMessage(token, {
        channelId,
        content,
    });
};

export const sendMessageToRecipient = async (
    token: string,
    recipientId: number,
    content: string
) => {
    return await sendMessage(token, {
        recipientId,
        content,
    });
};
export const getMessagesByUser = async (token: string, uid: number) => {
    return await client
        .get<Api<Message[], "messages">>(`/messages/${uid}`, getHeaders(token))
        .then(({data}) => data.messages);
};
