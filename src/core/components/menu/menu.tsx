import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
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

    const activeClassName = 'active';
    return (
        <nav className="top-menu">
            <ul>
                <li>
                    <div className="wrapper-button">
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? activeClassName : undefined
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
                            isActive ? activeClassName : undefined
                        }
                        to={'/mis-productos'}
                    >
                        <button>Mis Productos</button>
                    </NavLink>
                </li>

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
