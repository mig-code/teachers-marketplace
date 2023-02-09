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
            <ul>
                <li>
                    <div className="wrapper-button">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ?  activeClassName
                                    : 'nav-button'
                            }
                            to={'/subir-producto'}
                        >
                            Subir
                        </NavLink>
                    </div>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ?  activeClassName
                                : 'nav-button'
                        }
                        to={'/mis-productos'}
                    >
                        Mis Productos
                    </NavLink>
                </li>

                <li>
                    {user?.info.firebaseId ? (
                        <p className="nav-button nav-button--logout" onClick={handleLogoutOnClick}>
                            Logout
                        </p>
                    ) : (
                        <p className="nav-button" onClick={handleLoginOnClick}>
                            Login
                        </p>
                    )}
                </li>
            </ul>
        </nav>
    );
}
