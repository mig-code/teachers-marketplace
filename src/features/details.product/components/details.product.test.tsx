import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useProducts } from '../../../core/hooks/use.products';
import { useUserFavorites } from '../../../core/hooks/use.user.favorites';
import { currentReducer } from '../../../core/reducer/current.reducer';
import { userReducer } from '../../../core/reducer/user.reducer';
import { RootState } from '../../../core/store/store';
import { ProductStructure } from '../../../core/types/products.types';

import { productsMockWithFirebaseId } from '../../../mocks/product.mocks';
import {
    emptyMockUser,
    mockProduct1,
    mockProductWithIsLikedBy,
    mockProductWithOnlyFirebaseId,
} from '../../../mocks/store.mock';

import DetailsProduct from './details.product';

jest.mock('../../../core/hooks/use.products');
jest.mock('../../../core/hooks/use.user.favorites');

describe('Given Details Product component', () => {
    const mockHandleQueryProduct = jest.fn();

    const mockHandleAddToFavorites = jest.fn();
    const mockHandleRemoveFromFavorites = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('When it has been render', () => {
        test('If store has a current product Details Product info should have been render', () => {
            (useProducts as jest.Mock).mockReturnValue({
                handleQueryProduct: mockHandleQueryProduct,
            });
            (useUserFavorites as jest.Mock).mockReturnValue({
                handleAddToFavorites: mockHandleAddToFavorites,
                handleRemoveFromFavorites: mockHandleRemoveFromFavorites,
            });
            mockHandleQueryProduct.mockReturnValue(
                productsMockWithFirebaseId[0]
            );
            const mockPreloadedState: Partial<RootState> = {
                current: {
                    currentProduct: mockProduct1,
                },
            };

            const mockStore = configureStore({
                reducer: {
                    current: currentReducer,
                },
                preloadedState: mockPreloadedState,
            });

            render(
                <Provider store={mockStore}>
                    <MemoryRouter>
                        <DetailsProduct />
                    </MemoryRouter>
                </Provider>
            );
            const textElement = screen.getByText(/Product 1/i);
            expect(textElement).toBeInTheDocument();
        });
        test('Then user could click on add to favorites button', () => {
            // NECESITO CUADRAR QUE APAREZCAN LOS BOTONES DE FAVORITOS

            (useProducts as jest.Mock).mockReturnValue({
                handleQueryProduct: mockHandleQueryProduct,
            });
            (useUserFavorites as jest.Mock).mockReturnValue({
                handleAddToFavorites: mockHandleAddToFavorites,
                handleRemoveFromFavorites: mockHandleRemoveFromFavorites,
            });

            mockHandleAddToFavorites.mockReturnValue(
                productsMockWithFirebaseId[0]
            );
            const mockPreloadedState: Partial<RootState> = {
                user: emptyMockUser,
                current: {
                    currentProduct: mockProductWithIsLikedBy,
                },
            };

            const mockStore = configureStore({
                reducer: {
                    current: currentReducer,
                    user: userReducer,
                },
                preloadedState: mockPreloadedState,
            });

            render(
                <MemoryRouter>
                    <Provider store={mockStore}>
                        <DetailsProduct></DetailsProduct>
                    </Provider>
                </MemoryRouter>
            );

            const itemElement = screen.getByText(/Test product with isLiked/i);
            expect(itemElement).toBeInTheDocument();

            // const buttonElement = screen.getByText(/Añadir a Favoritos/i);
            // buttonElement.click();
            // expect(mockHandleAddToFavorites).toHaveBeenCalled();
        });
    });
    describe('When it has been render with empty currentproduct info in store', () => {
        test('Then we expect than Details Product info should not have been render', () => {
            (useProducts as jest.Mock).mockReturnValue({
                handleQueryProduct: mockHandleQueryProduct,
            });
            (useUserFavorites as jest.Mock).mockReturnValue({
                handleAddToFavorites: mockHandleAddToFavorites,
                handleRemoveFromFavorites: mockHandleRemoveFromFavorites,
            });

            const mockPreloadedState: Partial<RootState> = {
                current: {
                    currentProduct:
                        mockProductWithOnlyFirebaseId as ProductStructure,
                },
            };

            const mockStore = configureStore({
                reducer: {
                    current: currentReducer,
                },
                preloadedState: mockPreloadedState,
            });

            render(
                <MemoryRouter>
                    <Provider store={mockStore}>
                        <DetailsProduct></DetailsProduct>
                    </Provider>
                </MemoryRouter>
            );

            const textElement = screen.queryByText(/Producto no encontrado/i);
            expect(textElement).toBeInTheDocument();
        });
    });
});
