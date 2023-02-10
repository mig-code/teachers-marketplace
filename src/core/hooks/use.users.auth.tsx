import { UserStructure } from '../types/user.type';
import { loginWithGoogle, logout } from '../services/login';
import { useDispatch } from 'react-redux';
import * as ac from '../../core/reducer/action.creator';
import { useCallback } from 'react';

export type UseUserAuth = {
    handleLoginWithGoogle: () => Promise<void>;
    handleLogout: () => Promise<void>;
};

export function useUserAuth(): UseUserAuth {
    const dispatcher = useDispatch();

    const handleLoginWithGoogle = useCallback(async () => {
        const userLogged = (await loginWithGoogle()) as UserStructure;
        dispatcher(ac.loginActionCreatorUser(userLogged));
    }, [dispatcher]);
    const handleLogout = useCallback(async () => {
        logout();
        dispatcher(ac.logoutActionCreatorUser());
    }, [dispatcher]);

    return {
        handleLoginWithGoogle,
        handleLogout,
    };
}
