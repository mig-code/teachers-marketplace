import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { UserStructure } from '../../../../core/types/user.type';
import { RootState } from '../../../../core/store/store';
import { UserInfo } from './user.info';
import { userReducer } from '../../../../core/reducer/user.reducer/user.reducer';
import { useUserAuth } from '../../../../core/hooks/use.user.auth';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../../core/hooks/use.user.auth');

describe('Given User Info component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockUser: UserStructure = {
        info: {
            firebaseId: 'valid-id',
            name: 'valid-name',
            photoUrl: 'photo-url',
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

    test('Then user image and name should be on screen', () => {
        const mockhandleLogout = jest.fn();
        (useUserAuth as jest.Mock).mockReturnValue({
            handleLogout: mockhandleLogout,
        });
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <UserInfo></UserInfo>
                </MemoryRouter>
            </Provider>
        );
        const nameElement = screen.getByText('valid-name');
        expect(nameElement).toBeInTheDocument();

        const imageElement = screen.getByAltText('valid-name');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', 'photo-url');
    });
    test('Then we should click in logout button', () => {
        const mockhandleLogout = jest.fn();
        (useUserAuth as jest.Mock).mockReturnValue({
            handleLogout: mockhandleLogout,
        });
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <UserInfo></UserInfo>
                </MemoryRouter>
            </Provider>
        );
        const buttonElement = screen.getByText('Cerrar sesión');
        userEvent.click(buttonElement);

        expect(mockhandleLogout).toHaveBeenCalled();
    });
});
