import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../../core/hooks/use.user.auth';
import { RootState } from '../../../../core/store/store';

export function UserInfo() {
    const user = useSelector((state: RootState) => state.user);
    const { handleLogout } = useUserAuth();
    const navigate = useNavigate();

    const handleLogoutOnClick = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <>
            <h4>Página de Usuario</h4>
            <p>Nombre: {user.info?.name}</p>
            {user.info.photoUrl && user.info.name && (
                <img src={user.info.photoUrl} alt={user.info.name}></img>
            )}

            {user?.info.firebaseId && (
                <p className="nav-button" onClick={handleLogoutOnClick}>
                    Cerrar sesión
                </p>
            )}
        </>
    );
}
