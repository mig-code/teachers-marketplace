import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/app.context';

export function Menu() {
    const { user, loginWithGoogle, logoutWithGoogle } = useContext(AppContext);
    console.log(user);

    const handleLogin = () => {
        loginWithGoogle();
        console.log(user);
    };
    const handleLogout = () => {
        logoutWithGoogle();
        console.log(user);
    };
    return (
        <nav>
            <ul>
                <Link to={'/'}>
                    <li>Inicio </li>
                </Link>
                <Link to={'/subir-producto'}>
                    <li> Publicar</li>
                </Link>

                <li>
                    {user?.info.firebaseId ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <button onClick={handleLogin}>Login</button>
                    )}
                </li>
            </ul>
        </nav>
    );
}
