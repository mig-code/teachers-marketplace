/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { LoginModal } from './login.modal';
import {
    modalReducer,
    ModalState,
} from '../../reducer/modal.reducer/modal.reducer';
import { useUserAuth } from '../../hooks/use.user.auth';
import { RootStore } from '../../store/store';
import { searchReducer } from '../../reducer/search.reducer/search.reducer';
import { userReducer } from '../../reducer/user.reducer/user.reducer';
import { currentReducer } from '../../reducer/current.reducer/current.reducer';
import { productsReducer } from '../../reducer/products.reducer/products.reducer';
import { uploadImageReducer } from '../../reducer/upload.image.reducer/upload.image.reducer';

jest.mock('../../hooks/use.user.auth');

describe('Given LoginModal component', () => {
    let mockStore: RootStore;

    const mockhandleLoginWithGoogle = jest.fn();
    beforeEach(() => {
        const mockPreloadedState = {
            modal: {
                loginModal: true,
            },
        };

        mockStore = configureStore({
            reducer: {
                modal: modalReducer,
                user: userReducer,
                search: searchReducer,
                current: currentReducer,
                products: productsReducer,
                uploadImage: uploadImageReducer,
            },
            preloadedState: mockPreloadedState,
        });
        jest.clearAllMocks();
    });

    describe('When it has been render with true', () => {
        test('Then we can click  and login with google', () => {
            (useUserAuth as jest.Mock).mockReturnValue({
                handleLoginWithGoogle: mockhandleLoginWithGoogle,
            });

            render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <LoginModal></LoginModal>
                    </BrowserRouter>
                </Provider>
            );

            const buttonElement = screen.getByRole('button', {
                name: 'Iniciar sesión con Google',
            });

            userEvent.click(buttonElement);
            expect(mockhandleLoginWithGoogle).toHaveBeenCalled();

            waitFor(() => {
                const modalStore = mockStore.getState().modal;
                expect(modalStore.loginModal).toBe(false);
            });
        });
        test('Then we can click and close modal', () => {
            (useUserAuth as jest.Mock).mockReturnValue({
                handleLoginWithGoogle: mockhandleLoginWithGoogle,
            });

            render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <LoginModal></LoginModal>
                    </BrowserRouter>
                </Provider>
            );
            const closeButtonElement = screen.getAllByRole('button');

            userEvent.click(closeButtonElement[0]);
            waitFor(() => {
                const modalStore = mockStore.getState().modal as ModalState;

                expect(modalStore.loginModal).toBe(false);
            });
        });
    });
});
