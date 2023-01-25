import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { productMocks } from '../mocks/product.mocks';
import { ProductsRepository } from '../services/products.repo';
import { useProducts } from './use.products';

jest.mock('../services/products.repo');

ProductsRepository.prototype.load = jest.fn().mockReturnValue(
    productMocks
);

describe(`Given useProducts (custom hook)
            render with a virtual component`, () => {
    const TestComponent = () => {
        const { handleLoadProducts } = useProducts();
        return (
            <>
                <button onClick={handleLoadProducts}>
                    Load Products
                </button>

                {/* <div>
                    <ul>
                        {products.map((item) => (
                            <li key={item.id}>{item.title}</li>
                        ))}
                    </ul>
                </div> */}
            </>
        );
    };

    describe(`When component is loaded`, () => {
        render(<TestComponent />);
        const buttons = screen.getAllByRole('button');
        
        test('Then its should call handleLoadProducts', async () => {
            await act(async () => await fireEvent.click(buttons[0]));
            expect(ProductsRepository.prototype.load).toHaveBeenCalled();
            
        });
    });
});
