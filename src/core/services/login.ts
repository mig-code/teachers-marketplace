import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

    
export async function loginWithGoogle() {
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
        return loggedUser;
    } catch (error) {
        console.log(error);
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
}
