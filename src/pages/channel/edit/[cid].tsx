import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {GetServerSidePropsContext} from "next";

export default function EditChannelPage({ users }) {
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const { channel_id } = router.query;

    const onSubmit = (data) => {
        // Perform channel editing logic here with the submitted data
        console.log(`Channel ID: ${channel_id}`);
        console.log('Additional Users:', data.users);

        // Redirect to the channel page after editing
        router.push(`/channel/${channel_id}`);
    };

    return (
        <div>
            <h1>Edit Channel</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <button type="submit">Add Users</button>
            </form>
        </div>
    );
}

export function getServerSideProps({req}:GetServerSidePropsContext){

}
