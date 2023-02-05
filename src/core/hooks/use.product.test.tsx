/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductsRepository } from '../services/products.repository';
import { useProducts } from './use.products';
import {
    productMock1,
    productMock2,
    mockNoValidRepoResponse,
    productMockUpdate,
    productMockAdd,
} from './testing.mock';

import * as debug from '../../tools/debug';
import { Provider, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../reducer/products.reducer';

jest.mock('../services/products.repository');

ProductsRepository.prototype.load = jest.fn();
ProductsRepository.prototype.create = jest.fn();
ProductsRepository.prototype.update = jest.fn();
ProductsRepository.prototype.delete = jest.fn();

describe(`Given useProducts (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let spyConsole: jest.SpyInstance;

    const preloadedState: Partial<RootState> = {
        products: [],
    };

    const mockStore = configureStore({
        reducer: {
            products: productsReducer,
        },
        preloadedState,
    });

    beforeEach(() => {
        TestComponent = () => {
            const products = useSelector((state: RootState) => state.products);

            const {
                handleLoadProducts,
                handleDeleteProduct,
                handleUpdateProduct,
                handleCreateProduct,
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

                    {products?.length === 0 ? (
                        <p>Loading</p>
                    ) : (
                        <div>
                            <p>Loaded</p>
                            {products?.length}
                            <ul>
                                {products?.map((product) => (
                                    <li key={product.productInfo.id}>
                                        {product.productInfo.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            );
        };

        spyConsole = jest.spyOn(debug, 'consoleDebug');
    });

    describe('When products repository is working OK', () => {
        let buttons: Array<HTMLElement>;

        beforeEach(() => {
            (ProductsRepository.prototype.load as jest.Mock).mockResolvedValue([
                productMock1,
                productMock2,
            ]);
            render(
                <Provider store={mockStore}>
                    <TestComponent />
                </Provider>
            );
            buttons = screen.getAllByRole('button');
            jest.clearAllMocks();
        });

        test('Then its function handleLoadProducts should be add products to the store', async () => {
            const loadingText = await screen.findByText('Loading');
            expect(loadingText).toBeInTheDocument();

            await act(async () => {
                userEvent.click(buttons[0]);
            });

            expect(ProductsRepository.prototype.load).toHaveBeenCalled();

            const loadedText = await screen.findByText('Loaded');
            expect(loadedText).toBeInTheDocument();
            expect(
                await screen.findByText(productMock1.productInfo.title)
            ).toBeInTheDocument();
            expect(
                await screen.findByText(productMock2.productInfo.title)
            ).toBeInTheDocument();
        });
        test('Then its function handleDeleteProduct should be used', async () => {
            (
                ProductsRepository.prototype.delete as jest.Mock
            ).mockResolvedValue(productMock1.firebaseId);
            await act(async () => {
                userEvent.click(buttons[0]);
            });

            expect(ProductsRepository.prototype.load).toHaveBeenCalled();
            await act(async () => {
                userEvent.click(buttons[1]);
            });

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
            (
                ProductsRepository.prototype.update as jest.Mock
            ).mockResolvedValue(productMockUpdate);
            await act(async () => {
                userEvent.click(buttons[0]);
            });

            expect(ProductsRepository.prototype.load).toHaveBeenCalled();
            await act(async () => {
                userEvent.click(buttons[2]);
            });
            expect(ProductsRepository.prototype.update).toHaveBeenCalled();
            expect(
                await screen.findByText(productMockUpdate.productInfo.title)
            ).toBeInTheDocument();
        });
        test('Then its function handleCreateProduct should be used', async () => {
            (
                ProductsRepository.prototype.create as jest.Mock
            ).mockResolvedValue(productMockAdd);
            await act(async () => {
                userEvent.click(buttons[0]);
            });

            expect(ProductsRepository.prototype.load).toHaveBeenCalled();
            await act(async () => {
                userEvent.click(buttons[3]);
            });
            expect(ProductsRepository.prototype.create).toHaveBeenCalled();
            expect(
                await screen.findByText(productMock1.productInfo.title)
            ).toBeInTheDocument();
            expect(
                await screen.findByText(productMockAdd.productInfo.title)
            ).toBeInTheDocument();
        });
    });

    describe(`When the repo is NOT working OK`, () => {
        let buttons: Array<HTMLElement>;

        beforeEach(() => {
            (ProductsRepository.prototype.load as jest.Mock).mockResolvedValue([
                productMock1,
                productMock2,
            ]);
            render(
                <Provider store={mockStore}>
                    <TestComponent />
                </Provider>
            );
            buttons = screen.getAllByRole('button');
            jest.clearAllMocks();
        });
        beforeEach(mockNoValidRepoResponse);
        test('Then its function handleLoadProducts should be used', async () => {
            userEvent.click(buttons[0]);
            expect(ProductsRepository.prototype.load).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });

        test('Then its function handleDeleteProducts should be used', async () => {
            userEvent.click(buttons[1]);
            expect(ProductsRepository.prototype.delete).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleUpdated should be used', async () => {
            userEvent.click(buttons[2]);
            expect(ProductsRepository.prototype.update).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleCreateProduct should be used', async () => {
            userEvent.click(buttons[3]);
            expect(ProductsRepository.prototype.create).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
    });
});
