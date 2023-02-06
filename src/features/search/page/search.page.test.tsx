import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { SearchPage } from './search.page';
import {
    emptyMockSearchState,
    mockProduct1,
    mockProductsState,
} from '../../../mocks/store.mock';
import { searchReducer } from '../../../core/reducer/search.reducer';
import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../../../core/reducer/products.reducer';
import { useProducts } from '../../../core/hooks/use.products';
jest.mock('../../../core/hooks/use.products');

describe('Given Search Page', () => {
    test('When renders withs products', () => {
        const emptyMockSearch = emptyMockSearchState;

        const preloadedState = {
            search: emptyMockSearch,
            products: mockProductsState,
        };
        const mockStore = configureStore({
            reducer: {
                search: searchReducer,
                products: productsReducer,
            },
            preloadedState: preloadedState,
        });
        (useProducts as jest.Mock).mockReturnValue({
            handleLoadProducts: jest.fn(),
        });
        render(
            <Provider store={mockStore}>
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
    test('When renders without products', () => {
        jest.clearAllMocks();

        const emptyMockSearch = emptyMockSearchState;

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
        const headingElement = screen.getByText(/Búsqueda/i);
        expect(headingElement).toBeInTheDocument();

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
    });
});
