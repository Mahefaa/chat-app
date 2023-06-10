import {Channel, getChannelById} from "@/common/client";
import {getMessagesByChannel, Message, sendMessageToChannel} from "@/common/client/message";
import {GetServerSidePropsContext} from "next";
import {useRouter} from "next/router";
import {MessageForm, FormData} from "@/component/message";
import Cookies from "js-cookie";

type channelPageProps = {
    channel: Channel,
    messages: Message[]
}
export default function ChannelPage({channel, messages}: channelPageProps) {
    const router = useRouter();
    let {createdAt, id, name, owner, type, updatedAt} = channel;
    const onSubmit = (data: FormData) => {
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

export async function getServerSideProps({req, query}: GetServerSidePropsContext) {
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