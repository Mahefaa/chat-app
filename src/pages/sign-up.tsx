import {useForm} from 'react-hook-form';
import {createUser} from "@/client/user";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}, setValue,watch} = useForm({
        defaultValues: {
            email: '',
            password: '',
            name: '',
            bio: '',
            confirmPassword: ''
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
    const watchPassword = watch('password', '');

    return (
        <div>
            <h1>Sign Up</h1>
            <form name={"registrationForm"} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name</label>
                    <input type="text" {...register('name', {required: 'Name is required'})} />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" {...register('email', {required: 'Email is required'})} />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register('password', {required: 'Password is required'})} />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirmPassword', {
                            required: 'Confirm password is required',
                            validate: (value) => value === watchPassword || 'Passwords do not match',
                        })}
                    />
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                </div>
                <div>
                    <label>Bio</label>
                    <textarea {...register('bio')} />
                    {errors.bio && <span>{errors.bio.message}</span>}
                </div>
                <button type="submit" className={"registerButton"}>Register</button>
                <Link href={"/login"}>Already have an account ?</Link>
            </form>
        </div>
    );
}

export function getServerSideProps({req}: GetServerSidePropsContext) {
    if (req.cookies.token) {
        return {
            redirect: {
                destination: "/",
                permanent: true
            }
        }
    }
    return {props: {}}
}