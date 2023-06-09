import {Channel, getChannelById} from "@/client";
import {getMessagesByChannel, Message, sendMessageToChannel} from "@/client/message";

type channelPageProps = {
    channel: Channel,
    messages: Message[]
}
export default function ChannelPage({channel, messages}: channelPageProps) {
    const router = useRouter();
    let {createdAt, id, name, owner, type, updatedAt} = channel;
    const onSubmit = (data) => {
        sendMessageToChannel(Cookies.get('token')!.toString(), channel.id, data.message)
            .then(data => {
                router.reload();
            })
    };
    return (
        <>
            <h1>Welcome to {type} channel {name}</h1>
            <div>
                {messages.reverse().map((message) => {
                    return (
                        <div key={message.id}>
                            {`${message.sender.name} - ${message.content}`}
                        </div>
                    )
                })}
            </div>
            <MessageForm onSubmit={onSubmit}/>
        </>
    );
};

export async function getServerSideProps({req, query}) {
    if (!req.cookies.token) {
        return {
            redirect: {
                destination: "/",
                permanent: true
            }
        }
    }
    const cId = query.cid;
    const channel = await getChannelById(req.cookies.token, Number(cId))
        .then((data) => data)
    const messages = await getMessagesByChannel(req.cookies.token, Number(cId))
        .then((data) => data)
    return {props: {channel, messages}}
}

import {useForm} from 'react-hook-form';
import Cookies from "js-cookie";
import {useRouter} from "next/router";

type MessageFormProps = {
    onSubmit: (data) => void
}

function MessageForm({onSubmit}: MessageFormProps) {
    const {register, handleSubmit, reset} = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Message</label>
                <textarea
                    rows={4}
                    cols={50}
                    {...register('message', {required: true})}
                />
            </div>
            <button type="submit">Send Message</button>
        </form>
    );
}
