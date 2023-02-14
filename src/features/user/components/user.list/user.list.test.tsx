/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render, screen } from '@testing-library/react';

import UserItem from '../user.item/user.item';
import { UserList } from './user.list';
import { UserStructure } from '../../../../core/types/user.type';
import { userMockSameOwner } from '../../../../mocks/user.mock';
import { RootState } from '../../../../core/store/store';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../../../core/reducer/user.reducer/user.reducer';

import { productsReducer } from '../../../../core/reducer/products.reducer/products.reducer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { productMockWithIsLikedBySameOwner } from '../../../../mocks/product.mocks';
import userEvent from '@testing-library/user-event';
jest.mock('../user.item/user.item');

describe('When render UserList component wit products', () => {
    const mockUser: UserStructure = userMockSameOwner;
    const mockProducts = [productMockWithIsLikedBySameOwner];
    const preloadedState: Partial<RootState> = {
        user: mockUser,
        products: mockProducts,
    };

    const mockStore = configureStore({
        reducer: {
            user: userReducer,
            products: productsReducer,
        },
        preloadedState,
    });
    beforeEach(() => {
        jest.clearAllMocks();
        (UserItem as jest.Mock).mockReturnValue(<div>item</div>);
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <UserList />
                </MemoryRouter>
            </Provider>
        );
    });

    describe('When it has been render with products and userProducts Tab', () => {
        test('It should render the products uploaded by the owner', () => {
            const listTitleElement = screen.getByText('Mis productos subidos');
            expect(listTitleElement).toBeInTheDocument();

            const itemElement = screen.getAllByRole('article');
            expect(itemElement).toHaveLength(mockProducts.length);
        });
        test("then we can click on the tab 'Mis Favoritos'", () => {
            const myFavoritessTab = screen.getByRole('button', {
                name: /Mis favoritos/i,
            });
            userEvent.click(myFavoritessTab);
        });
    });
    describe('When we navigate to Favorites Tab', () => {
        test('It should render the products liked by the owner', () => {
            const myFavoritessTab = screen.getByRole('button', {
                name: /Mis favoritos/i,
            });
            userEvent.click(myFavoritessTab);

            const listTitleElement = screen.getByText(
                /Mis productos Favoritos/i
            );
            expect(listTitleElement).toBeInTheDocument();
            const itemElement = screen.getAllByRole('article');
            expect(itemElement).toHaveLength(mockProducts.length);
        });
        test("then we can click on the tab 'Mis Productos'", () => {
            const myFavoritessTab = screen.getByRole('button', {
                name: /Mis Productos/i,
            });
            userEvent.click(myFavoritessTab);
        });
    });
});
