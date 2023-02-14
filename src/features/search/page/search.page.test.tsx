/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import SearchPage from './search.page';
import {
    emptyMockSearchState,
    mockProduct1,
    mockProductsState,
    mockProductWithoutTitle,
} from '../../../mocks/store.mock';
import { searchReducer } from '../../../core/reducer/search.reducer/search.reducer';
import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../../../core/reducer/products.reducer/products.reducer';
import { useProducts } from '../../../core/hooks/use.products';
import { userReducer } from '../../../core/reducer/user.reducer/user.reducer';
import userEvent from '@testing-library/user-event';

jest.mock('../../../core/hooks/use.products');

describe('Given Search Page', () => {
    const emptyMockSearch = emptyMockSearchState;

    beforeEach(() => {
        (useProducts as jest.Mock).mockReturnValue({
            handleLoadProducts: jest.fn(),
        });
    });

    describe('When renders with products', () => {
        test('When renders with products and search a title', () => {
            const preloadedStateWithProducts = {
                search: emptyMockSearch,
                products: mockProductsState,
            };
            const mockStoreWithProducts = configureStore({
                reducer: {
                    search: searchReducer,
                    products: productsReducer,
                    user: userReducer,
                },
                preloadedState: preloadedStateWithProducts,
            });

            render(
                <Provider store={mockStoreWithProducts}>
                    <MemoryRouter>
                        <SearchPage></SearchPage>
                    </MemoryRouter>
                </Provider>
            );
            const headingElement = screen.getByText(/Búsqueda/i);
            expect(headingElement).toBeInTheDocument();

            const inputElement = screen.getByRole('textbox');
            expect(inputElement).toBeInTheDocument();

            const proudctElement = screen.getByText(/Test product 1/i);
            expect(proudctElement).toBeInTheDocument();
        });
    });
    describe('When renders with products and search a description', () => {
        test('When renders with products and search a description', () => {
            const preloadedStateWithProductsWithoutTitle = {
                search: emptyMockSearch,
                products: [mockProductWithoutTitle],
            };
            const mockStoreWithProductsWithoutTitle = configureStore({
                reducer: {
                    search: searchReducer,
                    products: productsReducer,
                    user: userReducer,
                },
                preloadedState: preloadedStateWithProductsWithoutTitle,
            });

            render(
                <Provider store={mockStoreWithProductsWithoutTitle}>
                    <MemoryRouter>
                        <SearchPage></SearchPage>
                    </MemoryRouter>
                </Provider>
            );

            const inputElement = screen.getByRole('textbox');
            expect(inputElement).toBeInTheDocument();

            userEvent.type(inputElement, 'Test description 3');

            const proudctElement = screen.getByText(/Test description 3/i);
            expect(proudctElement).toBeInTheDocument();
        });
    });

    describe('When renders without products', () => {
        const preloadedState = {
            search: emptyMockSearch,
            products: [],
        };
        const mockStore = configureStore({
            reducer: {
                search: searchReducer,
                products: productsReducer,
            },
            preloadedState: preloadedState,
        });
        const handleLoadProducts = jest.fn();
        handleLoadProducts.mockReturnValue([mockProduct1]);

        beforeEach(() => {
            (useProducts as jest.Mock).mockReturnValue({
                handleLoadProducts: handleLoadProducts,
            });
            render(
                <Provider store={mockStore}>
                    <MemoryRouter>
                        <SearchPage></SearchPage>
                    </MemoryRouter>
                </Provider>
            );
        });

        test('then, we should render that there are no results', () => {
            const proudctElement = screen.getByText(/No hay resultados/i);
            expect(proudctElement).toBeInTheDocument();
        });
    });
});
