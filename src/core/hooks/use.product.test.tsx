import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductsRepository } from '../services/products.repository';
import { useProducts } from './use.products';
import {
    productMock1,
    productMock2,
    mockValidRepoResponse,
    mockNoValidRepoResponse,
} from './testing.mock';

import * as debug from '../../tools/debug';

jest.mock('../services/products.repository');

useProducts.prototype.load = jest.fn();
// useProducts.prototype.create = jest.fn();
// useProducts.prototype.update = jest.fn();
useProducts.prototype.delete = jest.fn();

describe(`Given useProducts (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let spyConsole: jest.SpyInstance;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponent = () => {
            const { handleLoadProducts, handleDeleteProduct, products } =
                useProducts();
            return (
                <>
                    <button onClick={handleLoadProducts}>Load</button>

                    <button
                        onClick={() => handleDeleteProduct(productMock1.id)}
                    >
                        Delete
                    </button>
                    {products.length === 0 ? (
                        <p>Loading</p>
                    ) : (
                        <div>
                            <p>Loaded</p>
                            {products.length}
                            <ul>
                                {products.map((product) => (
                                    <>
                                        <li key={product.id}>
                                            {product.title}
                                        </li>
                                        <li>{product.id}</li>
                                        <li>{product.localId}</li>
                                    </>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            );
        };
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<TestComponent />);
        buttons = screen.getAllByRole('button');
        spyConsole = jest.spyOn(debug, 'consoleDebug');
    });
    describe(`When the repo is working OK`, () => {
        beforeEach(mockValidRepoResponse);

        test('Then its function handleLoadProducts should be add products to the state', async () => {
            expect(await screen.findByText(/loading/i)).toBeInTheDocument();
            userEvent.click(buttons[0]);
            expect(ProductsRepository.prototype.load).toHaveBeenCalled();
            expect(
                await screen.findByText(productMock1.title)
            ).toBeInTheDocument();
            expect(
                await screen.findByText(productMock2.title)
            ).toBeInTheDocument();
        });

        test('Then its function handleDeleteProduct should be used', async () => {
            userEvent.click(buttons[0]);
            expect(ProductsRepository.prototype.load).toHaveBeenCalled();
            userEvent.click(buttons[1]);
            expect(ProductsRepository.prototype.delete).toHaveBeenCalled();
            expect(
                await screen.findByText(productMock2.title)
            ).toBeInTheDocument();
            // await expect(
            //     async () => await screen.findByText(productMock1.title)
            // ).rejects.toThrowError();

            // await waitFor(() => {
            //     expect(screen.queryByText(productMock1.title)).toBeNull();
            // });
        });
        describe(`When the repo is NOT working OK`, () => {
            beforeEach(mockNoValidRepoResponse);
            test('Then its function handleLoadProducts should be used', async () => {
                userEvent.click(buttons[0]);
                expect(ProductsRepository.prototype.load).toHaveBeenCalled();
                // await waitFor(() => {
                //     expect(spyConsole).toHaveBeenLastCalledWith(
                //         'Testing errors'
                //     );
                // });
            });

            test('Then its function handleDeleteProducts should be used', async () => {
                userEvent.click(buttons[1]);
                expect(ProductsRepository.prototype.delete).toHaveBeenCalled();
                // await waitFor(() => {
                //     expect(spyConsole).toHaveBeenLastCalledWith(
                //         'Testing errors'
                //     );
                // });
            });
        });
    });
});
