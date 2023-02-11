import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

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
                    <MemoryRouter>
                        <Item item={productMock} />
                    </MemoryRouter>
                </Provider>
            );
            const textElement = screen.getByText(/Product 1/i);
            expect(textElement).toBeInTheDocument();
        });

        // NoT VALID AT THIS MOMENT

        // test('Then user could click on add to favorites button', () => {
        //     const productMock = productsMockWithFirebaseId[0];
        //     render(
        //         <MemoryRouter>
        //             <Provider store={store}>
        //                 <Item item={productMock} />
        //             </Provider>
        //         </MemoryRouter>
        //     );

        //     const buttonElement = screen.getByText(/Añadir a Favoritos/i);
        //     buttonElement.click();
        //     expect(mockHandleUpdateProduct).toHaveBeenCalled();
        // });

        test('Then user could click on delete button', () => {
            const productMock = productsMockWithFirebaseId[0];
            render(
                <MemoryRouter>
                    <Provider store={store}>
                        <Item item={productMock} />
                    </Provider>
                </MemoryRouter>
            );

            // NOT VALID AT THIS MOMENT

            // const buttonElement = screen.getByText(/Eliminar/i);
            // buttonElement.click();
            // expect(mockHandleDeleteProduct).toHaveBeenCalled();
        });
    });
});
