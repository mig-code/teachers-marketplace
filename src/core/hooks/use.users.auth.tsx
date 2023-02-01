import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase/config';

export type UseUserAuth = {
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

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCredentials = await signInWithPopup(auth, provider);
            const loggedToken = await userCredentials.user.getIdToken();
            if (!userCredentials) throw new Error('No user logged in');

            const loggedUser = {
                info: {
                    firebaseId: userCredentials.user.uid,
                    name: userCredentials.user.displayName as string,
                    photoUrl: userCredentials.user.photoURL as string,
                },
                token: loggedToken,
            };
            setUser(loggedUser);
            console.log(loggedUser);
        } catch (error) {
            console.log(error);
        }
    };
    const logoutWithGoogle = async () => {
        try {
            signOut(auth);
            setUser(initialUser);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        user,
        loginWithGoogle,
        logoutWithGoogle,
    };
}
