import { useState } from 'react';

import { loginWithGoogle, logout } from '../services/login';
import { UserStructure } from '../types/user.type';

export type UseUserAuth = {
    user: UserStructure | null;
    handleLoginWithGoogle: () => Promise<void>;
    handleLogout: () => Promise<void>;
};

export function useUserAuth(): UseUserAuth {
    const initialUser: UserStructure = {
        info: {
            firebaseId: '',
            name: '',
            photoUrl: '',
        },
        token: '',
    };

    const [user, setUser] = useState(initialUser);

    const handleLoginWithGoogle = async () => {
        const userLogged = (await loginWithGoogle()) as UserStructure;
        setUser(userLogged);
    };
    const handleLogout = async () => {
        logout();
        setUser(initialUser);
    };

    return {
        user,
        handleLoginWithGoogle,
        handleLogout,
    };
}
