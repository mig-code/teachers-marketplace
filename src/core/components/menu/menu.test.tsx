import { render, screen } from '@testing-library/react';

import { Menu } from './menu';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RootState } from '../../store/store';
import { configureStore } from '@reduxjs/toolkit';
import { uploadImageReducer } from '../../reducer/upload.image.reducer';
import { userReducer } from '../../reducer/user.reducer';
import { UserStructure } from '../../types/user.type';
import { useUserAuth } from '../../hooks/use.user.auth';

jest.mock('../../hooks/use.user.auth');

describe('Given Menu component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('When it has been render with no user', () => {
        const mockUser: UserStructure = {
            info: {
                firebaseId: '',
                name: '',
                photoUrl: '',
            },
            token: '',
        };
        const preloadedState: Partial<RootState> = {
            user: mockUser,
        };

        const mockStore = configureStore({
            reducer: {
                uploadImage: uploadImageReducer,
                user: userReducer,
            },
            preloadedState,
        });

        test('Then we should click in login button', () => {
            const mockhandleLoginWithGoogle = jest.fn();
            (useUserAuth as jest.Mock).mockReturnValue({
                handleLoginWithGoogle: mockhandleLoginWithGoogle,
                handleLogout: jest.fn(),
            });

            render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <Menu />
                    </BrowserRouter>
                </Provider>
            );
            const buttonElement = screen.getAllByText('Login');
            userEvent.click(buttonElement[0]);

            expect(mockhandleLoginWithGoogle).toHaveBeenCalled();
        });
        test('Then we should  check is active class', () => {
            const mockhandleLogout = jest.fn();
            (useUserAuth as jest.Mock).mockReturnValue({
                handleLoginWithGoogle: jest.fn(),
                handleLogout: mockhandleLogout,
            });

            render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <Menu />
                    </BrowserRouter>
                </Provider>
            );
            const buttonElement = screen.getAllByText('Publicar');
            expect(buttonElement[0]).toHaveAttribute('class', 'nav-button');
            userEvent.click(buttonElement[0]);

            expect(buttonElement[0]).toHaveAttribute(
                'class',
                'nav-button nav-button--active'
            );
        });
    });
    describe('When it has been render with user', () => {
        const mockUser: UserStructure = {
            info: {
                firebaseId: 'validid',
                name: '',
                photoUrl: '',
            },
            token: '',
        };
        const preloadedState: Partial<RootState> = {
            user: mockUser,
        };

        const mockStore = configureStore({
            reducer: {
                uploadImage: uploadImageReducer,
                user: userReducer,
            },
            preloadedState,
        });

        test('Then we could click in "Mis productos', () => {
            const mockhandleLogout = jest.fn();
            (useUserAuth as jest.Mock).mockReturnValue({
                handleLoginWithGoogle: jest.fn(),
                handleLogout: mockhandleLogout,
            });

            render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <Menu />
                    </BrowserRouter>
                </Provider>
            );
            const buttonElement2 = screen.getAllByText('Mis Productos');
            expect(buttonElement2[0]).toHaveAttribute('class', 'nav-button');
            userEvent.click(buttonElement2[0]);

            expect(buttonElement2[0]).toHaveAttribute(
                'class',
                'nav-button nav-button--active'
            );
        });
    });
});
