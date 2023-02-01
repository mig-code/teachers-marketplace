/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


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
    beforeEach(() => {
        TestComponent = () => {
            const { user, handleLoginWithGoogle, handleLogout } = useUserAuth();
            return (
                <>
                    <button onClick={handleLoginWithGoogle}>Login</button>
                    <button onClick={handleLogout}>Logout</button>
                    <div>{user?.info.name}</div>
                </>
            );
        };

        render(<TestComponent />);
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
        });
        test('Then its function handleLoginWithGoogle should be called', async () => {
            await act(async () => {
                userEvent.click(buttons[0]);
            });

            expect(mockLoginWithGoogle).toHaveBeenCalled();
            const name = screen.getByText('user name test');
            expect(name).toBeInTheDocument();
        });
        test('Then its function handleLogout should be called', async () => {
            await act(async () => {
                userEvent.click(buttons[0]);
            });
            await act(async () => {
                userEvent.click(buttons[1]);
            });
            expect(mockLogout).toHaveBeenCalled();
            const name = screen.queryByText('user name test');
            expect(name).not.toBeInTheDocument();
        });
    });
});
