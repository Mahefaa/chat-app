import type {AppProps} from 'next/app'
import {LogoutButton} from "@/component/button";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <LogoutButton/>
            <Component {...pageProps} />
        </>
    )
}
