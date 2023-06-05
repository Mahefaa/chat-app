import {Channel, getChannelById} from "@/client";

type channelPageProps = {
    channel: Channel
}
export default function ChannelPage({channel}: channelPageProps) {
    let {createdAt, id, name, owner, type, updatedAt} = channel;
    return (
        <>Welcome to {type} channel {name}</>
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

    return {props: {channel}}
}