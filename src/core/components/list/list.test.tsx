import React from 'react';
import { render, screen } from '@testing-library/react';
import { List } from './list';
import { productsMockWithFirebaseId } from '../../../mocks/product.mocks';
import Item from '../item/item';
jest.mock('../item/item');

describe('When render List component with products', () => {
    const mockProducts = productsMockWithFirebaseId;
    test('It should render the products', () => {
        (Item as jest.Mock).mockReturnValue(<div>item</div>);
        render(<List products={mockProducts}></List>);

        const itemElement = screen.getAllByRole('article');
        expect(itemElement).toHaveLength(mockProducts.length);
    });
});
