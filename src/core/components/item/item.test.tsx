import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import {
    productMockWithIsLikedBySameOwner,
    productWithoutIsLikedBy,
} from '../../../mocks/product.mocks';

import { RootState } from '../../store/store';
import Item from './item';
import { useUserFavorites } from '../../hooks/use.user.favorites';
import { userMockSameOwner } from '../../../mocks/user.mock';
import { UserStructure } from '../../types/user.type';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../reducer/user.reducer';
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/use.products');
jest.mock('../../hooks/use.user.favorites');

describe('Given Item component', () => {
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
        (useUserFavorites as jest.Mock).mockReturnValue({
            handleAddToFavorites: mockHandleAddToFavorites,
            handleRemoveFromFavorites: mockHandleRemoveFromFavorites,
        });
    });

    describe('When it has been render with product with no favorite', () => {
        const productMock = productWithoutIsLikedBy;

        test('Then render item info an we can add to favorites', () => {
            render(
                <Provider store={mockStore}>
                    <MemoryRouter>
                        <Item item={productMock} />
                    </MemoryRouter>
                </Provider>
            );
            const textElement = screen.getByText(
                /Test product with empty isLikedBy/i
            );
            expect(textElement).toBeInTheDocument();

            const buttonElement = screen.getByText(/Añadir a Favoritos/i);
            expect(buttonElement).toBeInTheDocument();

            userEvent.click(buttonElement);
            expect(mockHandleAddToFavorites).toHaveBeenCalled();
        });
    });
    describe('When it has been render with a favourite product', () => {
        const productMock = productMockWithIsLikedBySameOwner;

        test('Then Item info should have been render', () => {
            render(
                <Provider store={mockStore}>
                    <MemoryRouter>
                        <Item item={productMock} />
                    </MemoryRouter>
                </Provider>
            );
            const textElement = screen.getByText(
                /Test product with same owner/i
            );
            expect(textElement).toBeInTheDocument();

            const buttonElement = screen.getByText(/Eliminar de Favoritos/i);
            expect(buttonElement).toBeInTheDocument();

            userEvent.click(buttonElement);
            expect(mockHandleRemoveFromFavorites).toHaveBeenCalled();
        });
    });
});
