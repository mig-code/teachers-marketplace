import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useProducts } from '../../../../core/hooks/use.products';
import { useUserFavorites } from '../../../../core/hooks/use.user.favorites';
import { userReducer } from '../../../../core/reducer/user.reducer';
import { RootState } from '../../../../core/store/store';
import { UserStructure } from '../../../../core/types/user.type';
import {
    productMockWithEmptyIsLikedBy,
    productMockWithSameOwner,
} from '../../../../mocks/product.mocks';
import { userMockSameOwner } from '../../../../mocks/user.mock';
import UserItem from './user.item';

jest.mock('../../../../core/hooks/use.products');
jest.mock('../../../../core/hooks/use.user.favorites');

describe('Given User Item component', () => {
    const mockHandleDeleteProduct = jest.fn();
    const mockHandleAddToFavorites = jest.fn();
    const mockHandleRemoveFromFavorites = jest.fn();
    const mockUser: UserStructure = userMockSameOwner;
    const preloadedState: Partial<RootState> = {
        user: mockUser,
    };

    const mockStore = configureStore({
        reducer: {
            user: userReducer,
        },
        preloadedState,
    });

    beforeEach(() => {
        jest.clearAllMocks();
        (useProducts as jest.Mock).mockReturnValue({
            handleDeleteProduct: mockHandleDeleteProduct,
        });
        (useUserFavorites as jest.Mock).mockReturnValue({
            handleAddToFavorites: mockHandleAddToFavorites,
            handleRemoveFromFavorites: mockHandleRemoveFromFavorites,
        });
    });

    describe('When it has been render with products and userProducts Tab', () => {
        const productMock = productMockWithSameOwner;
        const mockUserMenuTab = 'userProductsTab';
        test('Then we can remove it', () => {
            render(
                <Provider store={mockStore}>
                    <MemoryRouter>
                        <UserItem
                            item={productMock}
                            userMenuTab={mockUserMenuTab}
                        />
                    </MemoryRouter>
                </Provider>
            );
            const textElement = screen.getByText(
                /Test product with same owner/i
            );
            expect(textElement).toBeInTheDocument();
            const buttonElement = screen.getByText(/Eliminar/i);
            expect(buttonElement).toBeInTheDocument();
            userEvent.click(buttonElement);
            expect(mockHandleDeleteProduct).toHaveBeenCalled();
        });
    });
    describe('When it has been render with products and userFavoritesTab Tab', () => {
        const mockUserMenuTab = 'userFavoritesTab';

        test('Then if product is not favorite button add to favorites should be on screen', () => {
            const productMock = productMockWithEmptyIsLikedBy;
            render(
                <Provider store={mockStore}>
                    <MemoryRouter>
                        <UserItem
                            item={productMock}
                            userMenuTab={mockUserMenuTab}
                        />
                    </MemoryRouter>
                </Provider>
            );

            const buttonAddToFavoritesElement =
                screen.getByText(/Añadir a favoritos/i);
            expect(buttonAddToFavoritesElement).toBeInTheDocument();
            userEvent.click(buttonAddToFavoritesElement);
            expect(mockHandleAddToFavorites).toHaveBeenCalled();
        });
        test('Then if product is already favorite button remove from favorites should be on screen', () => {
            const productMock = productMockWithSameOwner;
            render(
                <Provider store={mockStore}>
                    <MemoryRouter>
                        <UserItem
                            item={productMock}
                            userMenuTab={mockUserMenuTab}
                        />
                    </MemoryRouter>
                </Provider>
            );

            const buttonRemoveFromFavoritesElement = screen.getByText(
                /Eliminar de favoritos/i
            );
            expect(buttonRemoveFromFavoritesElement).toBeInTheDocument();
            userEvent.click(buttonRemoveFromFavoritesElement);
            expect(mockHandleRemoveFromFavorites).toHaveBeenCalled();
        });
    });
});
