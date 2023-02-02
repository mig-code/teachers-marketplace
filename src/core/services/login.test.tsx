import { auth } from '../../firebase/config';
import { loginWithGoogle, logout } from './login';
import { signInWithPopup, signOut } from 'firebase/auth';
import { act } from 'react-dom/test-utils';
import { wait } from '@testing-library/user-event/dist/utils';
import { waitFor } from '@testing-library/react';

// FIRST I MOCK THE MODULE
// THEN I PUT MY OWN VALUES
jest.mock('firebase/auth');
const mockUserCredential = {
    user: {
        firebaseId: '123456789',
        geIdToken: () => {
            return '123456789';
        },
    },
};
const mockEmpytUserCredential = {
    user: null,
};
(signInWithPopup as jest.Mock).mockResolvedValue(mockUserCredential);
(signOut as jest.Mock).mockResolvedValue({ user: null });

describe('Given login function', () => {
    test('Then it should login', async () => {
        const result = await loginWithGoogle();

        // eslint-disable-next-line testing-library/await-async-utils
        waitFor(() => {
            expect(result).toEqual(mockUserCredential);
        });

        expect(signInWithPopup).toHaveBeenCalled();
    });
});

describe('Given "loginWithGoogle"', () => {
    test('Then "loginWithGoogle" should return a user', async () => {
        const result = await loginWithGoogle();
        // eslint-disable-next-line testing-library/await-async-utils
        waitFor(() => {
            expect(result).toEqual(mockEmpytUserCredential);
        });
        expect(signInWithPopup).toHaveBeenCalled();
    });
});
