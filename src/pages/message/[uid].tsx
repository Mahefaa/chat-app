import {useRouter} from 'next/router';
import {MessageForm} from "@/component/message";
import {Message} from "postcss";
import {GetServerSidePropsContext} from "next";
import {getMessagesByUser, sendMessageToRecipient} from "@/client/message";
import Cookies from "js-cookie";

type DirectMessagePageProps = {
    messages: Message[]
}
export default function DirectMessagePage({messages}: DirectMessagePageProps) {
    const router = useRouter();
    const {uid} = router.query;

    const onSubmit = (data) => {
        sendMessageToRecipient(Cookies.get('token')!.toString(), Number(uid), data.message)
            .then((data) => {
                router.reload();
            })
    };

    return (
        <div>
            <h1>Direct Messages with {uid}</h1>
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
        </div>
    );
}

export async function getServerSideProps({req, query}: GetServerSidePropsContext) {
    if (!req.cookies.token) {
        return {
            redirect: {
                destination: "/",
                permanent: true
            }
        }
    }
    const messages = await getMessagesByUser(req.cookies.token, Number(query.uid))
        .then((data) => data)
    return {
        props: {
            messages
        }
    }
}