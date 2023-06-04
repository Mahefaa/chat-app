import {useForm} from 'react-hook-form';
import {createUser} from "@/client/user";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

export default function SignUpPage() {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        defaultValues: {
            email: '',
            password: '',
            name: '',
            bio: ''
        }
    });

    const onSubmit = (toCreate: createUser) => {
        // Perform sign-up logic here
        createUser(toCreate)
            .then((created) => {
                Cookies.set("token", created.token)
                router.push("/")
            })
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email</label>
                    <input type="text" {...register('email', {required: 'Email is required'})} />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register('password', {required: 'Password is required'})} />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <div>
                    <label>Name</label>
                    <input type="text" {...register('name', {required: 'Name is required'})} />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Bio</label>
                    <textarea {...register('bio')} />
                    {errors.bio && <span>{errors.bio.message}</span>}
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
