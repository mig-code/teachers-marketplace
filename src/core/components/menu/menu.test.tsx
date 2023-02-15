import { render, screen } from '@testing-library/react';

import { Menu } from './menu';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RootState } from '../../store/store';
import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from '../../reducer/user.reducer/user.reducer';
import { UserStructure } from '../../types/user.type';

import {
    modalReducer,
    ModalState,
} from '../../reducer/modal.reducer/modal.reducer';

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
        const mockModalState: ModalState = {
            loginModal: false,
        };
        const preloadedState: Partial<RootState> = {
            user: mockUser,
            modal: mockModalState,
        };

        const mockStore = configureStore({
            reducer: {
                user: userReducer,
                modal: modalReducer,
            },
            preloadedState,
        });

        test('Then we should click in login button', () => {
            render(
                <Provider store={mockStore}>
                    <MemoryRouter>
                        <Menu />
                    </MemoryRouter>
                </Provider>
            );
            const buttonElement = screen.getAllByText('Login');
            userEvent.click(buttonElement[0]);

            const modalStore = mockStore.getState().modal;
            expect(modalStore.loginModal).toBe(true);
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
                user: userReducer,
            },
            preloadedState,
        });

        test('Then we could click in "Mis Cuenta', () => {
            render(
                <Provider store={mockStore}>
                    <MemoryRouter>
                        <Menu />
                    </MemoryRouter>
                </Provider>
            );
            const buttonElement2 = screen.getAllByText('Mi cuenta');
            expect(buttonElement2[0]).toHaveAttribute('class', 'nav-button');
            userEvent.click(buttonElement2[0]);

            expect(buttonElement2[0]).toHaveAttribute(
                'class',
                'nav-button nav-button--active'
            );
        });
        test('Then we should in "Publicar"  check is active class', () => {
            render(
                <Provider store={mockStore}>
                    <MemoryRouter>
                        <Menu />
                    </MemoryRouter>
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
});
