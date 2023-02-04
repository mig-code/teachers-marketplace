import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/app.context';

export function Menu() {
    const { user, handleLoginWithGoogle, handleLogout } =
        useContext(AppContext);

    const handleLoginOnClick = () => {
        handleLoginWithGoogle();
    };
    const handleLogoutOnClick = () => {
        handleLogout();
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
                        <button onClick={handleLogoutOnClick}>Logout</button>
                    ) : (
                        <button onClick={handleLoginOnClick}>Login</button>
                    )}
                </li>
            </ul>
        </nav>
    );
}
