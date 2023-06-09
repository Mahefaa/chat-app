import {useRouter} from 'next/router';
import Cookies from 'js-cookie';

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('token');
        router.push('/');
    };

    return (
        <button onClick={handleLogout} className={"logoutButton"}>Logout</button>
    );
}
