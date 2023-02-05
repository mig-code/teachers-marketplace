/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import { useUserAuth } from './use.users.auth';

jest.mock('../services/login');

const mockLoginWithGoogle = jest.fn();
const mockLogout = jest.fn();
jest.mock('../services/login', () => ({
    loginWithGoogle: () => mockLoginWithGoogle(),
    logout: () => mockLogout(),
}));

describe(`Given useUserAuth (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;

    let buttons: Array<HTMLElement>;
    const mockEmptyUser = {
        info: {
            firebaseId: '',
            name: '',
            photoUrl: '',
        },
        token: '',
    };
    beforeEach(() => {
        TestComponent = () => {
            const { handleLoginWithGoogle, handleLogout } = useUserAuth();
            const { user } = store.getState();

            return (
                <>
                    <button onClick={handleLoginWithGoogle}>Login</button>
                    <button onClick={handleLogout}>Logout</button>
                    <div>{user?.info.name}</div>
                </>
            );
        };

        render(
            <Provider store={store}>
                <TestComponent />
            </Provider>
        );
        buttons = screen.getAllByRole('button');
    });

    describe(`When the login is successful`, () => {
        beforeEach(() => {
            mockLoginWithGoogle.mockResolvedValue({
                info: {
                    firebaseId: 'validId',
                    name: 'user name test',
                    photoUrl: 'url photo test',
                },
                token: 'valid token',
            });
            mockLoginWithGoogle.mockClear();
            mockLogout.mockClear();
        });
        test('Then its function handleLoginWithGoogle should be called', async () => {
            await act(async () => {
                userEvent.click(buttons[0]);
            });

            expect(mockLoginWithGoogle).toHaveBeenCalled();

            await waitFor(() => {
                expect(store.getState().user?.info.name).toBe('user name test');
            });
        });
        test('Then the user should be logged in', async () => {
            const userStore = store.getState().user;
            expect(await userStore?.info.name).toBe('user name test');

            const name = screen.getByText('user name test');
            expect(name).toBeInTheDocument();
        });
        test('Then its function handleLogout should be called', async () => {
            await act(async () => {
                userEvent.click(buttons[1]);
            });

            expect(mockLogout).toHaveBeenCalled();
        });
        test('Then the user should be logged out', async () => {
            const userStore = store.getState().user;
            expect(await userStore).toEqual(mockEmptyUser);

            const name = screen.queryByText('user name test');
            expect(name).not.toBeInTheDocument();
        });
    });
});
