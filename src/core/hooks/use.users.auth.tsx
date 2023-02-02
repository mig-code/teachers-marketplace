import { useState } from 'react';

import { loginWithGoogle, logout } from '../services/login';

export type UseUserAuth = {
    user: UserStructure | null;
    handleLoginWithGoogle: () => Promise<void>;
    handleLogout: () => Promise<void>;
};
export type UserStructure = {
    info: {
        firebaseId: string;
        name: string | null;
        photoUrl: string | null;
    };
    token: string;
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
