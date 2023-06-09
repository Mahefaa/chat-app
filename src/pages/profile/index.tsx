import {GetServerSidePropsContext} from "next";
import {getCurrentUser, updateCurrentUser, updateUser, User} from "@/client/user";

import {useForm} from 'react-hook-form';
import {useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

type profileProps = {
    user: User
}

export default function ProfilePage(props: profileProps) {
    const router = useRouter();
    let {bio, email, googleId, id, image, name, password, status} = props.user;
    const {register, handleSubmit, formState: {errors}, watch, setValue} = useForm({
        defaultValues: {
            name: name || '',
            bio: bio || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });
    const onSubmit = (updatedUser: updateUser) => {
        // Perform update logic here with the submitted data
        updateCurrentUser(Cookies.get('token')!.toString(), updatedUser)
            .then(() => {
                router.reload()
            })
    };
    const watchPassword = watch('newPassword', '');

    return (
        <div>
            <h1>Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} name={"editProfileForm"}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        {...register('name')}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                    />
                </div>
                <div>
                    <label>Bio</label>
                    <textarea
                        {...register('bio')}
                    ></textarea>
                </div>
                <div>
                    <div>
                        <label>Current Password</label>
                        <input
                            type="password"
                            {...register('currentPassword',
                                {required: `Current password is required`})}
                        />
                        {errors.currentPassword && <span>{errors.currentPassword.message}</span>}
                    </div>
                    <div>
                        <label>New Password</label>
                        <input
                            type="password"
                            {...register('newPassword', {required: 'New password is required'})}
                        />
                        {errors.newPassword && <span>{errors.newPassword.message}</span>}
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
                </div>
                <button type="submit" className={"updateProfileButton"}>Update Profile</button>
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
    const user = await getCurrentUser(req.cookies.token)
        .then((data) => data)
    return {
        props: {
            user
        }
    }
}