import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { consoleDebug } from '../../tools/debug';

export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        const userCredentials = await signInWithPopup(auth, provider);
        const loggedToken = await userCredentials.user.getIdToken();
      

        const loggedUser = {
            info: {
                firebaseId: userCredentials.user.uid,
                name: userCredentials.user.displayName as string,
                photoUrl: userCredentials.user.photoURL as string,
            },
            token: loggedToken,
        };
        return loggedUser;
    } catch (error) {
        handleError(error as Error);
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        handleError(error as Error);
    }
}
const handleError = (error: Error) => {
    consoleDebug(error.message);
};
