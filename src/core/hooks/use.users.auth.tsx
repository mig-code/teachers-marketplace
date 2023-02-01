import { sign } from 'crypto';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase/config';

export type UseUsersAuth = {
    user: UserStructure | null;

    loginWithGoogle: () => Promise<void>;
    logoutWithGoogle: () => Promise<void>;
};
export type UserStructure = {
    info: {
        firebaseId: string;
        name: string | null;
        photoUrl: string | null;
    };
    token: string;
};

export function useUsersAuth(): UseUsersAuth {
    const initialUser: UserStructure = {
        info: {
            firebaseId: '',
            name: '',
            photoUrl: '',
        },
        token: '',
    };
    const [user, setUser] = useState(initialUser);

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const userCredentials = await signInWithPopup(auth, provider);
        const loggedToken = await userCredentials.user.getIdToken();

        if (!userCredentials) throw new Error('No user logged in');

        const loggedUser = {
            info: {
                firebaseId: userCredentials.user.uid,
                name: userCredentials.user.displayName,
                photoUrl: userCredentials.user.photoURL,
            },
            token: loggedToken,
        };
        setUser(loggedUser);
        console.log(loggedUser);
    };
    const logoutWithGoogle = async () => {
        signOut(auth);
    };

    return {
        user,
        loginWithGoogle,
        logoutWithGoogle,
    };
}
