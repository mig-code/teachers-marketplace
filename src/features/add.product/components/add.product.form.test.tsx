import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import {
    AppContext,
    AppContextStructure,
} from '../../../core/context/app.context';
import { store } from '../../../core/store/store';
import { AddProductForm } from './add.product.form';
jest.mock('../../../core/services/storage');

describe('Given render AddProductForm component', () => {
    const handleCreateProduct = jest.fn();
    const mockAppContext = {
        handleCreateProduct,
    } as unknown as AppContextStructure;
    const inputMockData = {
        title: 'Titulo del producto',
        description: 'Descripcion del producto',
        price: 10,
        category: 'Libros',
    };

    // Object.defineProperty(window, 'File', {
    //     value: class File {
    //         constructor() {
    //             return {
    //                 name: 'image.png',
    //                 size: 100,
    //                 type: 'image/png',
    //             };
    //         }
    //     },
    // });
    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Provider store={store}>
            <AppContext.Provider value={mockAppContext}>
                <MemoryRouter>
                    <AddProductForm></AddProductForm>
                </MemoryRouter>
            </AppContext.Provider>
            </Provider>
        );
    });

    describe('When it is rendered with Context', () => {
        test('Then we should write in inputs and submit', () => {
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
            const categoryInputSelectElement =
                screen.getByLabelText(/Categoría/i);

            userEvent.type(titleInput, inputMockData.title);
            userEvent.type(descriptionInput, inputMockData.description);
            userEvent.type(priceInput, inputMockData.price.toString());
            userEvent.selectOptions(
                categoryInputSelectElement,
                inputMockData.category
            );

            expect(titleInput).toHaveValue(inputMockData.title);
            expect(descriptionInput).toHaveValue(inputMockData.description);
            expect(priceInput).toHaveValue(inputMockData.price);
            expect(categoryInputSelectElement).toHaveValue(
                inputMockData.category
            );

            userEvent.click(submitButton);
            expect(handleCreateProduct).toHaveBeenCalled();
        });
    });
    describe('When it is rendered with Context and upload a correct file', () => {
        test('Then we should upload an image', async () => {
            const uploadImageInput = screen.getByLabelText(/Subir Imagen/i);
            expect(uploadImageInput).toBeInTheDocument();

            const file = new File([''], 'testImage.png', {
                type: 'image/png',
            });

            // eslint-disable-next-line testing-library/no-unnecessary-act
            const saveImageInStorageMock = jest.fn();
            const getUrlsFromStorageMock = jest.fn();
            saveImageInStorageMock.mockResolvedValue('testImage.png');
            getUrlsFromStorageMock.mockResolvedValue('testIResmage.png');
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
            await act(async () => {
                userEvent.upload(uploadImageInput, file);
            });
            expect(saveImageInStorageMock).toHaveBeenCalled();

            // eslint-disable-next-line testing-library/await-async-utils
            waitFor(async () => {
                await expect(getUrlsFromStorageMock).toHaveBeenCalled();
            });
            // eslint-disable-next-line testing-library/await-async-utils
            waitFor(() => {
                expect(uploadImageInput).toHaveValue('testImage.png');
            });
            const inputTitle = screen.getByLabelText(/Titulo del producto/i);
            const inputDescription = screen.getByLabelText(
                /Descripción del producto/i
            );
            const inputPrice = screen.getByLabelText(/Precio/i);
            const inputCategory = screen.getByLabelText(/Categoría/i);
            const submitButton = screen.getByRole('button', {
                name: /Añadir/i,
            });
            userEvent.type(inputTitle, inputMockData.title);
            expect(inputTitle).toHaveValue(inputMockData.title);
            userEvent.type(inputDescription, inputMockData.description);
            expect(inputDescription).toHaveValue(inputMockData.description);
            userEvent.type(inputPrice, inputMockData.price.toString());
            expect(inputPrice).toHaveValue(inputMockData.price);
            userEvent.selectOptions(inputCategory, inputMockData.category);
            expect(inputCategory).toHaveValue(inputMockData.category);

            userEvent.click(submitButton);
            expect(handleCreateProduct).toHaveBeenCalled();
            expect(inputTitle).toHaveValue('');
        });
    });
    describe('When it is rendered with Context and upload a wrong file', () => {
        test('Then we upload file and dont wait to get loaded', () => {
            const submitButton = screen.getByRole('button', {
                name: /Añadir/i,
            });

            const uploadImageInput = screen.getByLabelText(/Subir Imagen/i);
            expect(uploadImageInput).toBeInTheDocument();

            const file = new File([''], 'testImage.png', {
                type: 'image/png',
            });
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                userEvent.upload(uploadImageInput, file);
            });
            userEvent.click(submitButton);
        });
    });
});
