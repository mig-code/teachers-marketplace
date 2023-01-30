import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';
import {
    AppContext,
    AppContextStructure,
} from '../../../core/context/app.context';
import { AddProductForm } from './add.product.form';
import * as useUploadFile from '../../../core/hooks/use.upload.file';

describe('Given render AddProductForm component', () => {
    const handleCreateProduct = jest.fn();
    const inputMockData = {
        title: 'Titulo del producto',
        description: 'Descripcion del producto',
        price: 10,
    };

    const mockAppContext = {
        handleCreateProduct,
    } as unknown as AppContextStructure;
    describe('When it is rendered', () => {
        render(<AddProductForm></AddProductForm>);
        test('It should render the title', () => {
            const headingElement = screen.getByRole('heading', {
                name: /Añadir Producto/i,
            });
            expect(headingElement).toBeInTheDocument();
        });
        test('Then we should write in inputs and submit', () => {
            render(
                <AppContext.Provider value={mockAppContext}>
                    <BrowserRouter>
                        <AddProductForm></AddProductForm>
                    </BrowserRouter>
                </AppContext.Provider>
            );

            const titleInput = screen.getByLabelText(/Titulo del producto/i);
            expect(titleInput).toBeInTheDocument();

            const descriptionInput = screen.getByLabelText(
                /Descripción del producto/i
            );
            expect(descriptionInput).toBeInTheDocument();

            const priceInput = screen.getByLabelText(/Precio/i);
            expect(priceInput).toBeInTheDocument();

            const submitButton = screen.getByRole('button', {
                name: /Añadir/i,
            });
            expect(submitButton).toBeInTheDocument();

            userEvent.type(titleInput, inputMockData.title);
            userEvent.type(descriptionInput, inputMockData.description);
            userEvent.type(priceInput, inputMockData.price.toString());

            expect(titleInput).toHaveValue(inputMockData.title);
            expect(descriptionInput).toHaveValue(inputMockData.description);
            expect(priceInput).toHaveValue(inputMockData.price);

            userEvent.click(submitButton);
            expect(handleCreateProduct).toHaveBeenCalled();
        });
        test('Then we should Upload a file and call handlUploadFile', () => {
            const mockAppContext = {
                handleCreateProduct,
            } as unknown as AppContextStructure;

            jest.spyOn(useUploadFile, 'useUploadFile').mockImplementation(
                () => ({
                    handleUploadFile,
                    uploadedImagerUrl: '/testImage.png',
                    uploadProgressValue: 0,
                })
            );
            const handleUploadFile = jest.fn();

            render(
                <AppContext.Provider value={mockAppContext}>
                    <BrowserRouter>
                        <AddProductForm></AddProductForm>
                    </BrowserRouter>
                </AppContext.Provider>
            );

            const file = new File([''], 'testImage.png', {
                type: 'image/png',
            });
            const fileInput = screen.getByLabelText(/Subir Imagen/i);
            expect(fileInput).toBeInTheDocument();

            userEvent.upload(fileInput, file);
            expect(handleUploadFile).toHaveBeenCalled();
        });
    });
});
