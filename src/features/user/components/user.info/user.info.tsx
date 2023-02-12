import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../../core/hooks/use.user.auth';
import { RootState } from '../../../../core/store/store';
import './user.info.scss';

export function UserInfo() {
    const user = useSelector((state: RootState) => state.user);
    const { handleLogout } = useUserAuth();
    const navigate = useNavigate();

    const handleLogoutOnClick = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <div className="user-info">
            {user.info.photoUrl && user.info.name && (
                <img
                    className="user-info__img"
                    src={user.info.photoUrl}
                    alt={user.info.name}
                ></img>
            )}
            <p className="user-info__name"> {user.info?.name}</p>

            {user?.info.firebaseId && (
                <button
                    className="user-info__botton"
                    onClick={handleLogoutOnClick}
                >
                    Cerrar sesión
                </button>
            )}
        </div>
    );
}
