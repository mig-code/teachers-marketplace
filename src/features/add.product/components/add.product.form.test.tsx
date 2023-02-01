import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { BrowserRouter } from 'react-router-dom';
import {
    AppContext,
    AppContextStructure,
} from '../../../core/context/app.context';
import { AddProductForm } from './add.product.form';

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
    });
});

describe('Given render AddProductForm component to upload File', () => {
    const handleCreateProduct = jest.fn();
    const mockAppContext = {
        handleCreateProduct,
    } as unknown as AppContextStructure;

    test('Then we should upload an image', () => {
        render(
            <AppContext.Provider value={mockAppContext}>
                <BrowserRouter>
                    <AddProductForm></AddProductForm>
                </BrowserRouter>
            </AppContext.Provider>
        );

        const uploadImageInput = screen.getByLabelText(/Subir Imagen/i);
        expect(uploadImageInput).toBeInTheDocument();

        const file = new File([''], 'testImage.png', {
            type: 'image/png',
        });
        // eslint-disable-next-line testing-library/no-unnecessary-act
        const saveImageInStorageMock = jest.fn();
        const getUrlsFromStorageMock = jest.fn();
        saveImageInStorageMock.mockResolvedValue('testImage.png');
        getUrlsFromStorageMock.mockResolvedValue('testImage.png');
        jest.spyOn(
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('../../../core/services/storage'),
            'saveImageInStorage'
        ).mockImplementation(saveImageInStorageMock);
        jest.spyOn(
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('../../../core/services/storage'),
            'getUrlsFromStorage'
        ).mockImplementation(getUrlsFromStorageMock);

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            userEvent.upload(uploadImageInput, file);
        });
        expect(saveImageInStorageMock).toHaveBeenCalled();

        // eslint-disable-next-line testing-library/await-async-utils
        waitFor(async () => {
            await expect(getUrlsFromStorageMock).toHaveBeenCalled();
        });
    });
});
