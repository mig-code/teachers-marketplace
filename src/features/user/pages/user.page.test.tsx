import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserPage } from './user.page';
import { UserInfo } from '../components/user.info/user.info';
import { UserList } from '../components/user.list/user.list';

jest.mock('../components/user.info/user.info');
jest.mock('../components/user.list/user.list');

describe('When render User Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('It should render UserInfo omponent', () => {
        (UserInfo as jest.Mock).mockReturnValue(<div>UserInfo</div>);
        render(<UserPage></UserPage>);

        expect(UserInfo).toHaveBeenCalled();
        const userInfoElement = screen.getByText('UserInfo');
        expect(userInfoElement).toBeInTheDocument();
    });

    test('It should render UserList component', () => {
        (UserList as jest.Mock).mockReturnValue(<div>UserList</div>);
        render(<UserPage></UserPage>);

        expect(UserList).toHaveBeenCalled();
        const userListElement = screen.getByText('UserList');
        expect(userListElement).toBeInTheDocument();
    });

    // NOT NECESSARY RIGHT NOW

    // test('It should navigate to favorites', () => {
    //     render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <UserPage></UserPage>
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //     const favoritesButton = screen.getByRole('button', {
    //         name: /Mis favoritos/i,
    //     });
    //     expect(favoritesButton).toBeInTheDocument();
    //     userEvent.click(favoritesButton);

    //     const favoritesTitle = screen.getByRole('heading', {
    //         level: 1,
    //     });
    //     expect(favoritesTitle).toBeInTheDocument();
    // });

    // test('It should navigate to uploaded products', () => {
    //     render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <UserPage></UserPage>
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //     const uploadedProductsButton = screen.getByRole('button', {
    //         name: /Mis productos/i,
    //     });
    //     expect(uploadedProductsButton).toBeInTheDocument();
    //     userEvent.click(uploadedProductsButton);

    //     const uploadedProductsTitle = screen.getByRole('heading', {
    //         level: 1,
    //     });
    //     expect(uploadedProductsTitle).toBeInTheDocument();
    // });
});
