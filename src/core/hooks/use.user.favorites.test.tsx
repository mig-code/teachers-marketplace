/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import {
    mockProductWithIsLikedBy,
    mockProductWithIsLikedByDeleted,
    mockProductWithIsLikedByDeletedEmpty,
    mockProductWithIsLikedByOneUser,
    mockProductWithIsLikedByUpdated,
} from '../../mocks/store.mock';

import { userReducer } from '../reducer/user.reducer';
import { RootState } from '../store/store';
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

    let buttons: Array<HTMLElement>;
    const mockProductWithIslike: ProductStructure = mockProductWithIsLikedBy;

    const TestComponentWithProducts = () => {
        const { handleAddToFavorites, handleRemoveFromFavorites } =
            useUserFavorites(mockProductWithIslike);

        return (
            <>
                <button onClick={handleAddToFavorites}>Add to Favorites</button>
                <button onClick={handleRemoveFromFavorites}>
                    Remove from favorites
                </button>
            </>
        );
    };
    const TestComponetsWithoutProducts = () => {
        const { handleAddToFavorites, handleRemoveFromFavorites } =
            useUserFavorites({} as ProductStructure);

        return (
            <>
                <button onClick={handleAddToFavorites}>Add to Favorites</button>
                <button onClick={handleRemoveFromFavorites}>
                    Remove from favorites
                </button>
            </>
        );
    };
    const TestComponentWithOneProduct = () => {
        const { handleRemoveFromFavorites } = useUserFavorites(
            mockProductWithIsLikedByOneUser
        );

        return (
            <>
                <button onClick={handleRemoveFromFavorites}>
                    Remove from favorites
                </button>
            </>
        );
    };
    describe('When we use TesTComponentWithProducts', () => {
        test('then its function handleAddToFavorites should be called and update a Fav', async () => {
            (useProducts as jest.Mock).mockReturnValue({
                handleUpdateProduct: mockHandleUpdateProduct,
            });
            const mockUser: UserStructure = {
                info: {
                    firebaseId: 'UpdatedFav',
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

            render(
                <Provider store={mockStore}>
                    <TestComponentWithProducts />
                </Provider>
            );
            await act(async () => {
                buttons = screen.getAllByRole('button');
                userEvent.click(buttons[0]);
            });

            await waitFor(() => {
                expect(mockHandleUpdateProduct).toHaveBeenCalled();
            });

            expect(mockHandleUpdateProduct).toHaveBeenCalledWith(
                mockProductWithIsLikedByUpdated
            );
        });

        test('then its function handleRemoveFromFavorites should be called and delete a Fav', async () => {
            (useProducts as jest.Mock).mockReturnValue({
                handleUpdateProduct: mockHandleUpdateProduct,
            });
            const mockUser: UserStructure = {
                info: {
                    firebaseId: 'userUid3',
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

            render(
                <Provider store={mockStore}>
                    <TestComponentWithProducts />
                </Provider>
            );

            buttons = screen.getAllByRole('button');
            userEvent.click(buttons[1]);
            await waitFor(() => {
                expect(mockHandleUpdateProduct).toHaveBeenCalled();
            });

            expect(mockHandleUpdateProduct).toHaveBeenCalledWith(
                mockProductWithIsLikedByDeleted
            );
        });
    });
    describe('When we use TestComponentWithOneProduct', () => {
        test('When we click on the button Remove to Favorites and there is only one Fav , then its function handleAddToFavorites should be add a fav', async () => {
            (useProducts as jest.Mock).mockReturnValue({
                handleUpdateProduct: mockHandleUpdateProduct,
            });
            const mockUser: UserStructure = {
                info: {
                    firebaseId: 'userUid1',
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

            render(
                <Provider store={mockStore}>
                    <TestComponentWithOneProduct />
                </Provider>
            );
            await act(async () => {
                buttons = screen.getAllByRole('button');
                userEvent.click(buttons[0]);
            });

            expect(mockHandleUpdateProduct).toHaveBeenCalledWith(
                mockProductWithIsLikedByDeletedEmpty
            );
        });
    });
    describe('When we use TestComponetsWithoutProducts', () => {
        const mockUser: UserStructure = {
            info: {
                firebaseId: 'UpdatedFav',
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
        test('Then its function handleAddToFavorites should be add a fav', async () => {
            (useProducts as jest.Mock).mockReturnValue({
                handleUpdateProduct: mockHandleUpdateProduct,
            });

            render(
                <Provider store={mockStore}>
                    <TestComponetsWithoutProducts />
                </Provider>
            );
            await act(async () => {
                buttons = screen.getAllByRole('button');
                userEvent.click(buttons[0]);
            });

            await waitFor(() => {
                expect(mockHandleUpdateProduct).toHaveBeenCalled();
            });
            const expectedProduct = {
                isLikedBy: {
                    users: [mockUser.info.firebaseId],
                },
            };
            expect(mockHandleUpdateProduct).toHaveBeenCalledWith(
                expectedProduct
            );
        });
        test('Then when click in remove button, shouldn call handleUpdate', async () => {
            (useProducts as jest.Mock).mockReturnValue({
                handleUpdateProduct: mockHandleUpdateProduct,
            });

            render(
                <Provider store={mockStore}>
                    <TestComponetsWithoutProducts />
                </Provider>
            );
            await act(async () => {
                buttons = screen.getAllByRole('button');
                userEvent.click(buttons[1]);
            });

            await waitFor(() => {
                expect(mockHandleUpdateProduct).not.toHaveBeenCalled();
            });
        });
    });
});
