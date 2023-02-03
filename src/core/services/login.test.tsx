import { auth } from '../../firebase/config';
import { loginWithGoogle, logout } from './login';
import {
    getIdToken,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { act } from 'react-dom/test-utils';
import { wait } from '@testing-library/user-event/dist/utils';
import { waitFor } from '@testing-library/react';
import { UserStructure } from '../types/user.type';
import * as debug from '../../tools/debug';
// FIRST I MOCK THE MODULE
// THEN I PUT MY OWN VALUES
jest.mock('firebase/auth');
jest.mock('../../tools/debug');

describe('Given login function', () => {
    let spyConsole: jest.SpyInstance;
    test('Then it should login correct with correct credentials', async () => {
        const mockUserCredential = {
            user: {
                uid: '123',
                displayName: 'test',
                photoURL: 'test',
                getIdToken(): Promise<string> {
                    return Promise.resolve('123');
                },
            },
        };

        (signInWithPopup as jest.Mock).mockResolvedValue(mockUserCredential);

        const mockResponse: UserStructure = {
            info: {
                firebaseId: '123',
                name: 'test',
                photoUrl: 'test',
            },
            token: '123',
        };
        const result = await loginWithGoogle();
        expect(signInWithPopup).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });

    test('Then it should throw error without it', async () => {
        (signInWithPopup as jest.Mock).mockResolvedValue(null);
        spyConsole = jest.spyOn(debug, 'consoleDebug');
        await loginWithGoogle();

        expect(spyConsole).toHaveBeenCalled();
    });
});

describe('Given logout function', () => {
    test('Then it should logout correct', async () => {
        (signOut as jest.Mock).mockResolvedValue(null);
        await logout();
        expect(signOut).toHaveBeenCalled();
    });

    test('Then it should throw error without it', async () => {
        (signOut as jest.Mock).mockRejectedValue('error');
        const spyConsole = jest.spyOn(debug, 'consoleDebug');
        const result = await logout();
        console.log(result);
        expect(spyConsole).toHaveBeenCalled();
    });
});
