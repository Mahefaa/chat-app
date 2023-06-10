import {useForm} from 'react-hook-form';
import {login, credentials} from "@/common/client/user";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {GetServerSidePropsContext} from "next";
import Link from "next/link";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "@/common/schema/authentication";

export default function LoginPage() {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: (yupResolver(loginSchema))
    });

    const onSubmit = (credentials: credentials) => {
        // Perform login logic here
        login(credentials)
            .then((data) => {
                Cookies.set('token', data.token)
                router.push("/profile")
            })
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit(onSubmit)} name={"loginForm"}>
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
                <button type="submit" className={"loginButton"}>Login</button>
                <Link href={"/sign-up"}>create account ?</Link>
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
