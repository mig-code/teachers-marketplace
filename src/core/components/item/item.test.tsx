import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { productsMockWithFirebaseId } from '../../../mocks/product.mocks';
import { useProducts } from '../../hooks/use.products';
import { store } from '../../store/store';
import Item from './item';

jest.mock('../../hooks/use.products');

describe('Given Item component', () => {
    const mockHandleUpdateProduct = jest.fn();
    const mockHandleDeleteProduct = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useProducts as jest.Mock).mockReturnValue({
            handleUpdateProduct: mockHandleUpdateProduct,
            handleDeleteProduct: mockHandleDeleteProduct,
        });
    });

    describe('When it has been render', () => {
        const productMock = productsMockWithFirebaseId[0];

        test('Then Item info should have been render', () => {
            render(
                <Provider store={store}>
                    <Item item={productMock} />
                </Provider>
            );
            const textElement = screen.getByText(/Product 1/i);
            expect(textElement).toBeInTheDocument();
        });
        test('Then user could click on add to favorites button', () => {
            const productMock = productsMockWithFirebaseId[0];
            render(
                <Provider store={store}>
                    <Item item={productMock} />
                </Provider>
            );

            const buttonElement = screen.getByText(/Añadir a Favoritos/i);
            buttonElement.click();
            expect(mockHandleUpdateProduct).toHaveBeenCalled();
        });

        test('Then user could click on delete button', () => {
            const productMock = productsMockWithFirebaseId[0];
            render(
                <Provider store={store}>
                    <Item item={productMock} />
                </Provider>
            );

            const buttonElement = screen.getByText(/Eliminar/i);
            buttonElement.click();
            expect(mockHandleDeleteProduct).toHaveBeenCalled();
        });
    });
});
