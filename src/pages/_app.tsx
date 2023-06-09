import type {AppProps} from 'next/app'
import {LogoutButton} from "@/component/button";
import {instanceOf} from "prop-types";
import LoginPage from "@/pages/login";
import SignUpPage from "@/pages/sign-up";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <LogoutButton hidden={Component === LoginPage || Component === SignUpPage}/>
            <Component {...pageProps} />
        </>
    )
}
