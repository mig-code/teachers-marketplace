import { render, screen } from '@testing-library/react';
import { AppContext, AppContextStructure } from '../../context/app.context';
import { productsMockWithFirebaseId } from '../../../mocks/product.mocks';
import Item from './item';

describe('Given Item component', () => {
    const handleDeleteProduct = jest.fn();
    const handleUpdateProduct = jest.fn();

    const mockAppContext = {
        handleDeleteProduct,
        handleUpdateProduct,
    } as unknown as AppContextStructure;
    describe('When it has been render', () => {
        const productMock = productsMockWithFirebaseId[0];
        test('Then Item info should have been render', () => {
            render(<Item item={productMock} />);
            const textElement = screen.getByText(/Product 1/i);
            expect(textElement).toBeInTheDocument();
        });
        test('Then user could click on add to favorites button', () => {
            const productMock = productsMockWithFirebaseId[0];
            render(
                <AppContext.Provider value={mockAppContext}>
                    <Item item={productMock} />
                </AppContext.Provider>
            );
            const buttonElement = screen.getByText(/Añadir a Favoritos/i);
            buttonElement.click();
            expect(handleUpdateProduct).toHaveBeenCalled();
        });
        test('Then user could click on delete button', () => {
            render(
                <AppContext.Provider value={mockAppContext}>
                    <Item item={productMock} />
                </AppContext.Provider>
            );
            const buttonElement = screen.getByText(/Eliminar/i);
            buttonElement.click();
            expect(handleDeleteProduct).toHaveBeenCalled();
        });
    });
});
