import { UserStructure } from '../types/user.type';
import { loginWithGoogle, logout } from '../services/login';
import { useDispatch } from 'react-redux';
import * as ac from '../../core/reducer/action.creator';

export type UseUserAuth = {
    handleLoginWithGoogle: () => Promise<void>;
    handleLogout: () => Promise<void>;
};

export function useUserAuth(): UseUserAuth {
    // Old way with useState

    const dispatcher = useDispatch();

    const handleLoginWithGoogle = async () => {
        const userLogged = (await loginWithGoogle()) as UserStructure;
        dispatcher(ac.loginActionCreatorUser(userLogged));
    };
    const handleLogout = async () => {
        logout();
        dispatcher(ac.logoutActionCreatorUser());
    };

    return {
        handleLoginWithGoogle,
        handleLogout,
    };
}
