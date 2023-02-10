import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useUserAuth } from '../../hooks/use.users.auth';
import { RootState } from '../../store/store';
import './menu.scss';

export function Menu() {
    const { handleLoginWithGoogle, handleLogout } = useUserAuth();
    const user = useSelector((state: RootState) => state.user);

    const handleLoginOnClick = () => {
        handleLoginWithGoogle();
    };
    const handleLogoutOnClick = () => {
        handleLogout();
    };

    const activeClassName = 'nav-button nav-button--active';
    return (
        <nav className="top-menu">
            <NavLink
                className={({ isActive }) =>
                    isActive ? activeClassName : 'nav-button'
                }
                to={'/subir-producto'}
            >
                Publicar
            </NavLink>

            {user.info?.firebaseId && (
                <NavLink
                    className={({ isActive }) =>
                        isActive ? activeClassName : 'nav-button'
                    }
                    to={'/mis-productos'}
                >
                    Mis Productos
                </NavLink>
            )}

            {!user?.info.firebaseId && (
                <p className="nav-button" onClick={handleLoginOnClick}>
                    Login
                </p>
            )}
        </nav>
    );
}
