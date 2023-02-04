import { render, screen } from '@testing-library/react';

import { Menu } from './menu';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RootStore, RootState } from '../../store/store';
import { configureStore } from '@reduxjs/toolkit';
import { uploadImageReducer } from '../../reducer/upload.image.reducer';
import { userReducer } from '../../reducer/user.reducer';
import { UserStructure } from '../../types/user.type';
import { useUserAuth } from '../../hooks/use.users.auth';
import { logout } from '../../services/login';
// import * as useUserAuthMock from '../../hooks/use.users.auth';
jest.mock('../../hooks/use.users.auth');

describe('Given Menu component', () => {
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
            (useUserAuth as jest.Mock).mockImplementation(() => {
                return {
                    handleLoginWithGoogle: mockhandleLoginWithGoogle,
                    logout: jest.fn(),
                };
            });

            render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <Menu />
                    </BrowserRouter>
                </Provider>
            );
            const buttonElement = screen.getAllByRole('button');
            userEvent.click(buttonElement[0]);
            expect(buttonElement[0]).toHaveTextContent('Login');

            expect(mockhandleLoginWithGoogle).toHaveBeenCalled();
        });
    });
    // describe('When it has been render with an user', () => {
    //     jest.mock('../../hooks/use.users.auth', () => {
    //         return {
    //             useUserAuth: jest.fn(),
    //         };
    //     });

    //     const mockUser: UserStructure = {
    //         info: {
    //             firebaseId: '',
    //             name: '',
    //             photoUrl: '',
    //         },
    //         token: '',
    //     };
    //     const preloadedState: Partial<RootState> = {
    //         user: mockUser,
    //     };

    //     const mockStore = configureStore({
    //         reducer: {
    //             uploadImage: uploadImageReducer,
    //             user: userReducer,
    //         },
    //         preloadedState,
    //     });
    //     test('Then we should click in login button', () => {
    //         render(
    //             <Provider store={mockStore}>
    //                 <BrowserRouter>
    //                     <Menu />
    //                 </BrowserRouter>
    //             </Provider>
    //         );
    //         const buttonElement = screen.getAllByRole('button');
    //         userEvent.click(buttonElement[0]);
    //         expect(useUserAuth).toHaveBeenCalled();
    //     });
    // });
});
