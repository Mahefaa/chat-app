import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import {GetServerSidePropsContext} from "next";
import {addMembersToChannel, getUsers, User} from "@/common/client";
import Cookies from "js-cookie";

type EditChannelProps = {
    users: User[]
}
type EditChannelSubmitType = {
    users: number[]
}
export default function EditChannelPage({users}: EditChannelProps) {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            users: []
        }
    });
    const router = useRouter();
    const {cid} = router.query;

    const onSubmit = (data: EditChannelSubmitType) => {
        // Perform channel editing logic here with the submitted data
        addMembersToChannel(Cookies.get('token')!.toString(), Number(cid), data.users)
            .then((data) => {
                router.push(`/channel/${cid}`);
            });
    };

    return (
        <div>
            <h1>Edit Channel ${cid}</h1>
            <form onSubmit={handleSubmit(onSubmit)} name={"editChannelForm"}>
                <select name="type">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                <div>
                    <label>Additional Users</label>
                    <select multiple {...register('users')}>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className={"editChannelButton"}>Edit Channel</button>
            </form>
        </div>
    );
}

export async function getServerSideProps({req}: GetServerSidePropsContext) {
    if (!req.cookies.token) {
        return {
            redirect: {
                destination: "/",
                permanent: true
            }
        }
    }
    const users = await getUsers(req.cookies.token)
        .then(res => res.users);
    return {
        props: {
            users
        }
    }
}
