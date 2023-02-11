/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { mockProduct1 } from '../../mocks/store.mock';
import { userReducer } from '../reducer/user.reducer';
import { RootState, store } from '../store/store';
import { ProductStructure } from '../types/products.types';
import { UserStructure } from '../types/user.type';
import { useProducts } from './use.products';

import { useUserFavorites } from './use.user.favorites';

const mockHandleUpdateProduct = jest.fn();
jest.mock('./use.products');

describe(`Given useFavorites (custom hook)
            render with a virtual component`, () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    let TestComponent: () => JSX.Element;

    let buttons: Array<HTMLElement>;
    const mockProduct: ProductStructure = mockProduct1;
    const mockUser: UserStructure = {
        info: {
            firebaseId: 'validId',
            name: '',
            photoUrl: '',
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

    beforeEach(() => {
        TestComponent = () => {
            const { handleAddToFavorites, handleRemoveFromFavorites } =
                useUserFavorites(mockProduct);

            return (
                <>
                    <button onClick={handleAddToFavorites}>
                        Add to Favorites
                    </button>
                    <button onClick={handleRemoveFromFavorites}>
                        Remove from favorites
                    </button>
                    <div>{mockProduct.isLikedBy?.users}</div>
                </>
            );
        };
    });

    describe('When we click on the button Add to Favorites', () => {
        test.only('Then its function handleAddToFavorites should be called', async () => {
            (useProducts as jest.Mock).mockReturnValue({
                handleUpdateProduct: mockHandleUpdateProduct,
            });
            render(
                <Provider store={mockStore}>
                    <TestComponent />
                </Provider>
            );
            screen.debug();
            buttons = screen.getAllByRole('button');
            userEvent.click(buttons[0]);
            await waitFor(() => {
                expect(mockHandleUpdateProduct).toHaveBeenCalled();
            });
        });
    });
});
