import { render, screen } from '@testing-library/react';
import { Product } from '../../models/product';
import Item from './item';

describe('Given Item component', () => {
    describe('When it has been render', () => {
        const productMock = new Product(
            'Product 1 test',
            'Description 1 test',
            100,
            'Owner 1 test'
        );
        test('Then Item info should have been render', () => {
            render(<Item item={productMock} />);
            const textElement = screen.getByText(/Product 1 test/i);
            expect(textElement).toBeInTheDocument();
        });
    });
});
