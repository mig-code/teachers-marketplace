// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = () => {
    let initialFirebaseConfig = {};
    if (process.env.NODE_ENV === 'test') {
        initialFirebaseConfig = {
            apiKey: 'test-api-key',
            authDomain: 'test-auth-domain',
            projectId: 'test-project-id',
            storageBucket: 'test-storage-bucket',
            messagingSenderId: 'test-messaging-sender-id',
            appId: 'test-app-id',
            measurementId: 'test-measurement-id',
        };
        return initialFirebaseConfig;
    }

    initialFirebaseConfig = {
        apiKey: process.env.REACT_APP_APIKEY,
        authDomain: process.env.REACT_APP_AUTHDOMAIN,
        projectId: process.env.REACT_APP_PROJECTID,
        storageBucket: process.env.REACT_APP_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGINSENDERID,
        appId: process.env.REACT_APP_APPID,
        measurementId: process.env.REACT_APP_MEASUREMENTID,
    };
    return initialFirebaseConfig;
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig());
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
