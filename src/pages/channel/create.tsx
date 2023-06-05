import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {CreateChannel, createChannel, getUsers, User} from "@/client";
import {GetServerSideProps} from "next";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

type createChannelProps = {
    otherUsers: User[]
}
export default function CreateChannelPage({otherUsers}: createChannelProps) {
    const router = useRouter();
    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: '',
            type: 'public'
        }
    });
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    const onSubmit = (data: CreateChannel) => {
        data.members = selectedUsers;
        createChannel(Cookies.get("token")!.toString(), data)
            .then((data) => {
                    router.push(`/channel/${data.id}`)
                }
            );
    };

    const handleUserSelection = (event) => {
        const {value, checked} = event.target;
        if (checked) {
            setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, value]);
        } else {
            setSelectedUsers((prevSelectedUsers) =>
                prevSelectedUsers.filter((user) => user !== value)
            );
        }
    };

    return (
        <div>
            <h1>Create Channel</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        {...register('name')}
                    />
                </div>
                <div>
                    <label>Type</label>
                    <select {...register('type')}>
                        <option value={"public"} defaultChecked={true}>public</option>
                        <option value={"private"}>private</option>
                    </select>
                </div>
                <div>
                    <label>Other Users</label>
                    {otherUsers.map((user) => (
                        <div key={user.id}>
                            <input
                                type="checkbox"
                                name="users"
                                value={user.id}
                                onChange={handleUserSelection}
                            />
                            <label>{user.name}</label>
                        </div>
                    ))}
                </div>
                <button type="submit">Create Channel</button>
            </form>
        </div>
    );
}

export async function getServerSideProps({req}: GetServerSideProps) {
    if (!req.cookies.token) {
        return {
            redirect: {
                destination: "/",
                permanent: true
            }
        }
    }
    const otherUsers = await getUsers(req.cookies.token)
        .then(res => res.users)
    return {
        props: {
            otherUsers
        }
    }
}