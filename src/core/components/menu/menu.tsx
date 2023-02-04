import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/app.context';
import { RootState } from '../../store/store';

export function Menu() {
    const { handleLoginWithGoogle, handleLogout } = useContext(AppContext);

    const user = useSelector((state: RootState) => state.user);

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
