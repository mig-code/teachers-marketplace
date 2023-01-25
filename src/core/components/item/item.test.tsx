import { render, screen } from '@testing-library/react';
import { productMocks } from '../../mocks/product.mocks';
import Item from './item';

describe('Given Item component', () => {
    describe('When it has been render', () => {
        const productMock = productMocks[0];
        test('Then Item info should have been render', () => {
            render(<Item item={productMock} />);
            const textElement = screen.getByText(/Product 1/i);
            expect(textElement).toBeInTheDocument();
        });
    });
});
