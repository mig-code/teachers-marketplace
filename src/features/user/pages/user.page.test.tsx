import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../../../core/store/store';
import { UserPage } from './user.page';
import userEvent from '@testing-library/user-event';

describe('When render User Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('It should render the title', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserPage></UserPage>
                </MemoryRouter>
            </Provider>
        );
        const headingElement = screen.getByRole('heading', {
            level: 4,
        });
        expect(headingElement).toBeInTheDocument();
    });

    test('It should navigate to favorites', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserPage></UserPage>
                </MemoryRouter>
            </Provider>
        );
        const favoritesButton = screen.getByRole('button', {
            name: /Mis favoritos/i,
        });
        expect(favoritesButton).toBeInTheDocument();
        userEvent.click(favoritesButton);

        const favoritesTitle = screen.getByRole('heading', {
            level: 1,
        });
        expect(favoritesTitle).toBeInTheDocument();
    });

    test('It should navigate to uploaded products', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserPage></UserPage>
                </MemoryRouter>
            </Provider>
        );
        const uploadedProductsButton = screen.getByRole('button', {
            name: /Mis productos/i,
        });
        expect(uploadedProductsButton).toBeInTheDocument();
        userEvent.click(uploadedProductsButton);

        const uploadedProductsTitle = screen.getByRole('heading', {
            level: 1,
        });
        expect(uploadedProductsTitle).toBeInTheDocument();
    });
});
