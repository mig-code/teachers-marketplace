import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProductStructure } from '../../types/products.types';
import { UserStructure } from '../../types/user.type';
import {
    productMockWithEmptyIsLikedBy,
    productMockWithIsLikedBySameOwner,
} from '../../../mocks/product.mocks';
import { userMockSameOwner } from '../../../mocks/user.mock';
import userEvent from '@testing-library/user-event';
import { ButtonFavorite } from './button.favorite';
import {
    modalReducer,
    ModalState,
} from '../../reducer/modal.reducer/modal.reducer';
import { RootState } from '../../store/store';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { emptyMockUser } from '../../../mocks/store.mock';

describe('Given Button Favorite component', () => {
    const mockHandleClickAddToFavorites = jest.fn();
    const mockHandleClickDeleteFromFavorites = jest.fn();
    const mockUser: UserStructure = userMockSameOwner;
    const mockModalState: ModalState = {
        loginModal: false,
    };
    const preloadedState: Partial<RootState> = {
        modal: mockModalState,
    };

    const mockStore = configureStore({
        reducer: {
            modal: modalReducer,
        },
        preloadedState,
    });
    describe('When render Button Favorite component with valid user and product', () => {
        describe('When product its not favorite', () => {
            const mockProduct: ProductStructure = productMockWithEmptyIsLikedBy;

            test('It should be on the screen Add to Favorites', () => {
                render(
                    <Provider store={mockStore}>
                        <ButtonFavorite
                            item={mockProduct}
                            user={mockUser}
                            handleClickAddToFavorites={
                                mockHandleClickAddToFavorites
                            }
                            handleClickDeleteFromFavorites={
                                mockHandleClickDeleteFromFavorites
                            }
                        ></ButtonFavorite>
                    </Provider>
                );
                const buttonAdd = screen.getByText('Añadir a Favoritos');
                expect(buttonAdd).toBeInTheDocument();

                userEvent.click(buttonAdd);
                expect(mockHandleClickAddToFavorites).toHaveBeenCalled();
            });
        });
        describe('When product its already favorite', () => {
            const mockProduct: ProductStructure =
                productMockWithIsLikedBySameOwner;

            test('It should be on the screen Delete from Favorites', () => {
                render(
                    <Provider store={mockStore}>
                        <ButtonFavorite
                            item={mockProduct}
                            user={mockUser}
                            handleClickAddToFavorites={
                                mockHandleClickAddToFavorites
                            }
                            handleClickDeleteFromFavorites={
                                mockHandleClickDeleteFromFavorites
                            }
                        ></ButtonFavorite>
                    </Provider>
                );
                const buttonDelete = screen.getByText('Eliminar de Favoritos');
                expect(buttonDelete).toBeInTheDocument();

                userEvent.click(buttonDelete);
                expect(mockHandleClickDeleteFromFavorites).toHaveBeenCalled();
            });
        });
    });

    describe('When render Button Favorite component with no user', () => {
        test('It should be click openModal', () => {
            const mockProduct: ProductStructure = productMockWithEmptyIsLikedBy;
            const mockUser: UserStructure = emptyMockUser;

            render(
                <Provider store={mockStore}>
                    <ButtonFavorite
                        item={mockProduct}
                        user={mockUser}
                        handleClickAddToFavorites={
                            mockHandleClickAddToFavorites
                        }
                        handleClickDeleteFromFavorites={
                            mockHandleClickDeleteFromFavorites
                        }
                    ></ButtonFavorite>
                </Provider>
            );
            const buttonAdd = screen.getByText('Añadir a Favoritos');
            expect(buttonAdd).toBeInTheDocument();

            userEvent.click(buttonAdd);
            const modalStore = mockStore.getState().modal;
            expect(modalStore.loginModal).toBe(true);
        });
    });
});
