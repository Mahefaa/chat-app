import {useRouter} from 'next/router';
import Cookies from 'js-cookie';

type logoutButtonProps = {
    hidden: boolean
}

export function LogoutButton({hidden}: logoutButtonProps) {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('token');
        router.push('/');
    };

    return (
        <button onClick={handleLogout} className={"logoutButton"} hidden={hidden}>Logout</button>
    );
}
