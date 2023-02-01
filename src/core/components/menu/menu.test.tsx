import { render, screen } from '@testing-library/react';
import { AppContext, AppContextStructure } from '../../context/app.context';
import { Menu } from './menu';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

describe('Given Menu component', () => {
    describe('When it has been render with no user', () => {
        const user = null;

        const mockAppContext = {
            user,
            handleLoginWithGoogle: jest.fn(),
            handleLogout: jest.fn(),
        } as unknown as AppContextStructure;
        test('Then we should click in login button', () => {
            render(
                <BrowserRouter>
                    <AppContext.Provider value={mockAppContext}>
                        <Menu />
                    </AppContext.Provider>
                </BrowserRouter>
            );
            const buttonElement = screen.getAllByRole('button');
            userEvent.click(buttonElement[0]);
            expect(mockAppContext.handleLoginWithGoogle).toHaveBeenCalled();
        });
    });
    describe('When it has been render with an user', () => {
        const user = {
            info: {
                firebaseId: 'validId',
                email: '',
                name: 'test',
                photo: 'test',
            },
            token: 'validToken',
        };

        const mockAppContext = {
            user,
            handleLoginWithGoogle: jest.fn(),
            handleLogout: jest.fn(),
        } as unknown as AppContextStructure;
        test('Then we should click in login button', () => {
            render(
                <BrowserRouter>
                    <AppContext.Provider value={mockAppContext}>
                        <Menu />
                    </AppContext.Provider>
                </BrowserRouter>
            );
            const buttonElement = screen.getAllByRole('button');
            userEvent.click(buttonElement[0]);
            expect(mockAppContext.handleLogout).toHaveBeenCalled();
        });
    });
});
