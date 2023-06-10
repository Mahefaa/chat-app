import {ChangeEvent, useState} from 'react';
import {useForm} from 'react-hook-form';
import {createChannel, getUsers, User} from "@/common/client";
import {GetServerSidePropsContext} from "next";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {yupResolver} from "@hookform/resolvers/yup";
import {createSchema} from "@/common/schema/channel";

type createChannelProps = {
    otherUsers: User[]
}
type formData = {
    channelName: string;
    type: string;
    members?: number[]
}
export default function CreateChannelPage({otherUsers}: createChannelProps) {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            channelName: '',
            type: 'public'
        },
        resolver: yupResolver(createSchema)
    });
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    const onSubmit = (data: formData) => {
        createChannel(Cookies.get("token")!.toString(), {
            name: data.channelName,
            type: data.type,
            members: selectedUsers
        })
            .then((data) => {
                    router.push(`/channel/${data.id}`)
                }
            );
    };

    const handleUserSelection = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;
        if (checked) {
            setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, Number(value)]);
        } else {
            setSelectedUsers((prevSelectedUsers) =>
                prevSelectedUsers.filter((user) => user !== Number(value))
            );
        }
    };

    return (
        <div>
            <h1>Create Channel</h1>
            <form onSubmit={handleSubmit(onSubmit)} name={"createChannelForm"}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        {...register('channelName', {required: 'Channel Name is required'})}
                    />
                    {errors.channelName && <span>{errors.channelName.message}</span>}
                </div>
                <div>
                    <label>Type</label>
                    <select {...register('type')}>
                        <option value={"public"} defaultChecked={true}>Public</option>
                        <option value={"private"}>Private</option>
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
                <button type="submit" className={"createChannelButton"}>Create Channel</button>
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
    const otherUsers = await getUsers(req.cookies.token)
        .then(res => res.users)
    return {
        props: {
            otherUsers
        }
    }
}