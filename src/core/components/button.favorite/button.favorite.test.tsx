import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProductStructure } from '../../types/products.types';
import { UserStructure } from '../../types/user.type';
import {
    productMockWithEmptyIsLikedBy,
    productMockWithSameOwner,
} from '../../../mocks/product.mocks';
import { userMockSameOwner } from '../../../mocks/user.mock';
import userEvent from '@testing-library/user-event';
import { ButtonFavorite } from './button.favorite';

describe('When render Button Favorite component with valid user and product', () => {
    const mockHandleClickAddToFavorites = jest.fn();
    const mockHandleClickDeleteFromFavorites = jest.fn();
    const mockUser: UserStructure = userMockSameOwner;

    describe('When product its not favorite', () => {
        const mockProduct: ProductStructure = productMockWithEmptyIsLikedBy;

        test('It should be on the screen Add to Favorites', () => {
            render(
                <ButtonFavorite
                    item={mockProduct}
                    user={mockUser}
                    handleClickAddToFavorites={mockHandleClickAddToFavorites}
                    handleClickDeleteFromFavorites={
                        mockHandleClickDeleteFromFavorites
                    }
                ></ButtonFavorite>
            );
            const buttonAdd = screen.getByText('Añadir a Favoritos');
            expect(buttonAdd).toBeInTheDocument();

            userEvent.click(buttonAdd);
            expect(mockHandleClickAddToFavorites).toHaveBeenCalled();
        });
    });
    describe('When product its already favorite', () => {
        const mockProduct: ProductStructure = productMockWithSameOwner;

        test('It should be on the screen Delete from Favorites', () => {
            render(
                <ButtonFavorite
                    item={mockProduct}
                    user={mockUser}
                    handleClickAddToFavorites={mockHandleClickAddToFavorites}
                    handleClickDeleteFromFavorites={
                        mockHandleClickDeleteFromFavorites
                    }
                ></ButtonFavorite>
            );
            const buttonDelete = screen.getByText('Eliminar de Favoritos');
            expect(buttonDelete).toBeInTheDocument();

            userEvent.click(buttonDelete);
            expect(mockHandleClickDeleteFromFavorites).toHaveBeenCalled();
        });
    });
});
