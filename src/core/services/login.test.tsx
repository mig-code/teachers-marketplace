import { loginWithGoogle } from './login';

jest.mock('firebase/auth');

const mockSignInWithPopup = jest.fn();

jest.mock('firebase/auth', () => ({
    getAuth: () => ({
        signInWithPopup: async () => mockSignInWithPopup(),
    }),
    GoogleAuthProvider: jest.fn(),
}));

mockSignInWithPopup.mockResolvedValue({
    user: {
        uid: 'validId',
        displayName: 'user name test',
        photoURL: 'url photo test',
    },
});

// jest spy on firebase auth
describe('Given "loginWithGoogle"', () => {
    test('Then "loginWithGoogle" should return a user', async () => {
        const result = await loginWithGoogle();

        // Need to mock the firebase auth
        const resultmock = await mockSignInWithPopup();
        console.log(result);
        console.log(resultmock);
    });
});

// describe('Given logout function', () => {
//     test('Then it should logout', async () => {
//         const result = await logout();
//         expect(result).toEqual(undefined);
//     });
// });
