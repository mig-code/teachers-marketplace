import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { useUserAuth } from '../../hooks/use.user.auth';
import { RootState } from '../../store/store';
import * as ac from '../../reducer/action.creator';

import './menu.scss';

export function Menu() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const activeClassName = 'nav-button nav-button--active';

    const handleOpenModalClick = () => {
        dispatch(ac.openActionCreatorModal());
    };

    return (
        <nav className="top-menu">
            {user.info?.firebaseId ? (
                <NavLink
                    className={({ isActive }) =>
                        isActive ? activeClassName : 'nav-button'
                    }
                    to={'/subir-producto'}
                >
                    Publicar
                </NavLink>
            ) : (
                <p className="nav-button" onClick={handleOpenModalClick}>
                    Publicar
                </p>
            )}

            {user.info?.firebaseId && (
                <NavLink
                    className={({ isActive }) =>
                        isActive ? activeClassName : 'nav-button'
                    }
                    to={'/mis-productos'}
                >
                    Mi cuenta
                </NavLink>
            )}

            {!user?.info.firebaseId && (
                <p className="nav-button" onClick={handleOpenModalClick}>
                    Login
                </p>
            )}
        </nav>
    );
}
