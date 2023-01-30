/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
    fireEvent,
    render,
    screen,
    waitFor,
    act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductsRepository } from '../services/products.repository';
import { useProducts } from './use.products';
import {
    productMock1,
    productMock2,
    mockValidRepoResponse,
    mockNoValidRepoResponse,
    productMockUpdate,
    productMockAdd,
} from './testing.mock';

import * as debug from '../../tools/debug';

jest.mock('../services/products.repository');

ProductsRepository.prototype.load = jest.fn();
ProductsRepository.prototype.create = jest.fn();
ProductsRepository.prototype.update = jest.fn();
ProductsRepository.prototype.delete = jest.fn();

describe(`Given useProducts (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let spyConsole: jest.SpyInstance;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponent = () => {
            const {
                handleLoadProducts,
                handleDeleteProduct,
                handleUpdateProduct,
                handleCreateProduct,
                products,
            } = useProducts();
            return (
                <>
                    <button onClick={handleLoadProducts}>Load</button>

                    <button
                        onClick={() =>
                            handleDeleteProduct(productMock1.firebaseId)
                        }
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => handleUpdateProduct(productMockUpdate)}
                    >
                        Update
                    </button>
                    <button onClick={() => handleCreateProduct(productMockAdd)}>
                        Create
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
                                        <li key={product.productInfo.id}>
                                            {product.productInfo.title}
                                        </li>
                                    </>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            );
        };

        render(<TestComponent />);
        buttons = screen.getAllByRole('button');
        spyConsole = jest.spyOn(debug, 'consoleDebug');
    });
    describe(`When the repo is working OK`, () => {
        beforeEach(mockValidRepoResponse);

        test('Then its function handleLoadProducts should be add products to the state', async () => {
            expect(await screen.findByText(/loading/i)).toBeInTheDocument();
            act(() => {
                fireEvent.click(buttons[0]);
            });
            expect(ProductsRepository.prototype.load).toHaveBeenCalled();
            expect(
                await screen.findByText(productMock1.productInfo.title)
            ).toBeInTheDocument();
            expect(
                await screen.findByText(productMock2.productInfo.title)
            ).toBeInTheDocument();
        });

        test('Then its function handleDeleteProduct should be used', async () => {
            fireEvent.click(buttons[0]);
            expect(ProductsRepository.prototype.load).toHaveBeenCalled();
            fireEvent.click(buttons[1]);
            expect(ProductsRepository.prototype.delete).toHaveBeenCalled();
            expect(
                await screen.findByText(productMock2.productInfo.title)
            ).toBeInTheDocument();

            await expect(
                async () =>
                    await screen.findByText(productMock1.productInfo.title)
            ).rejects.toThrowError();

            await waitFor(() => {
                expect(
                    screen.queryByText(productMock1.productInfo.title)
                ).toBeNull();
            });
        });
        test('Then its function handleUpdateProduct should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[2]);
            expect(ProductsRepository.prototype.update).toHaveBeenCalled();
            expect(
                await screen.findByText(productMockUpdate.productInfo.title)
            ).toBeInTheDocument();
        });
        test('Then its function handleCreateProduct should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[3]);
            expect(ProductsRepository.prototype.create).toHaveBeenCalled();
            expect(
                await screen.findByText(productMock1.productInfo.title)
            ).toBeInTheDocument();
            expect(
                await screen.findByText(productMock2.productInfo.title)
            ).toBeInTheDocument();
        });

        describe(`When the repo is NOT working OK`, () => {
            beforeEach(mockNoValidRepoResponse);
            test('Then its function handleLoadProducts should be used', async () => {
                userEvent.click(buttons[0]);
                expect(ProductsRepository.prototype.load).toHaveBeenCalled();
                await waitFor(() => {
                    expect(spyConsole).toHaveBeenLastCalledWith(
                        'Testing errors'
                    );
                });
            });

            test('Then its function handleDeleteProducts should be used', async () => {
                userEvent.click(buttons[1]);
                expect(ProductsRepository.prototype.delete).toHaveBeenCalled();
                await waitFor(() => {
                    expect(spyConsole).toHaveBeenLastCalledWith(
                        'Testing errors'
                    );
                });
            });
            test('Then its function handleUpdated should be used', async () => {
                userEvent.click(buttons[2]);
                expect(ProductsRepository.prototype.update).toHaveBeenCalled();
                await waitFor(() => {
                    expect(spyConsole).toHaveBeenLastCalledWith(
                        'Testing errors'
                    );
                });
            });
            test('Then its function handleCreateProduct should be used', async () => {
                userEvent.click(buttons[3]);
                expect(ProductsRepository.prototype.create).toHaveBeenCalled();
                await waitFor(() => {
                    expect(spyConsole).toHaveBeenLastCalledWith(
                        'Testing errors'
                    );
                });
            });
        });
    });
});
