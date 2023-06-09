import {Inter} from 'next/font/google'
import {GetServerSidePropsContext} from "next";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
        </>
    )
}

export function getServerSideProps({req}: GetServerSidePropsContext) {
    if (!req.cookies.token) {
        return {
            redirect: {
                destination: "/login",
                permanent: true
            }
        }
    }
    return {
        redirect: {
            destination: "/profile",
            permanent: true
        }
    }
}
