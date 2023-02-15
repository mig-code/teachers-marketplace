/* eslint-disable testing-library/await-async-utils */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import { store } from '../../../core/store/store';
import { AddProductForm } from './add.product.form';
import { useProducts } from '../../../core/hooks/use.products';
import { useNavigate } from 'react-router-dom';

jest.mock('../../../core/hooks/use.products');
jest.mock('../../../core/services/storage');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Given render AddProductForm component', () => {
    const handleCreateProduct = jest.fn();
    const handleLoadProducts = jest.fn();

    const inputMockData = {
        title: 'Titulo del producto',
        description: 'Descripcion del producto',
        price: 10,
        category: 'Libros',
    };

    beforeEach(() => {
        (useProducts as jest.Mock).mockReturnValue({
            handleCreateProduct,
            handleLoadProducts,
        });
        (useNavigate as jest.Mock).mockReturnValue(jest.fn());
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddProductForm></AddProductForm>
                </MemoryRouter>
            </Provider>
        );
    });

    describe('When it is rendered', () => {
        test('Then we should write in inputs', async () => {
            const titleInput = screen.getByPlaceholderText(
                /Título para tu producto/i
            );
            expect(titleInput).toBeInTheDocument();

            const descriptionInput = screen.getByPlaceholderText(
                /Describe en unas líneas el producto que quieres vender/i
            );
            expect(descriptionInput).toBeInTheDocument();

            const priceInput = screen.getByPlaceholderText(/Precio/i);
            expect(priceInput).toBeInTheDocument();

            const submitButton = screen.getByRole('button', {
                name: /Publicar/i,
            });
            expect(submitButton).toBeInTheDocument();
            const categoryInputSelectElement =
                screen.getByPlaceholderText(/Categoría/i);

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
        });
    });
    describe('When it is rendered with Context and upload a correct file', () => {
        test('Then we should upload an image', async () => {
            const uploadImageInput =
                screen.getByPlaceholderText(/Subir Imagen/i);
            expect(uploadImageInput).toBeInTheDocument();

            const file = new File([''], 'testImage.png', {
                type: 'image/png',
            });

            const saveImageInStorageMock = jest.fn();
            const getUrlsFromStorageMock = jest.fn();
            saveImageInStorageMock.mockResolvedValue('testImage.png');
            getUrlsFromStorageMock.mockResolvedValue('testIResmage.png');
            jest.spyOn(
                require('../../../core/services/storage'),
                'saveImageInStorage'
            ).mockImplementation(saveImageInStorageMock);
            jest.spyOn(
                require('../../../core/services/storage'),
                'getUrlsFromStorage'
            ).mockImplementation(getUrlsFromStorageMock);

            await act(async () => {
                userEvent.upload(uploadImageInput, file);
            });
            expect(saveImageInStorageMock).toHaveBeenCalled();

            waitFor(async () => {
                await expect(getUrlsFromStorageMock).toHaveBeenCalled();
            });

            waitFor(() => {
                expect(uploadImageInput).toHaveValue('testImage.png');
            });
            const inputTitle = screen.getByPlaceholderText(
                /Título para tu producto/i
            );
            const inputDescription = screen.getByPlaceholderText(
                /Describe en unas líneas el producto que quieres vender/i
            );
            const inputPrice = screen.getByPlaceholderText(/Precio/i);
            const inputCategory = screen.getByPlaceholderText(/Categoría/i);
            const submitButton = screen.getByRole('button', {
                name: /Publicar/i,
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
    describe('When it is rendered and upload a wrong file', () => {
        test('Then we upload file and dont wait to get loaded', () => {
            const submitButton = screen.getByRole('button', {
                name: /Publicar/i,
            });

            const uploadImageInput =
                screen.getByPlaceholderText(/Subir Imagen/i);
            expect(uploadImageInput).toBeInTheDocument();

            const file = null as unknown as File;

            act(() => {
                userEvent.upload(uploadImageInput, file);
            });
            userEvent.click(submitButton);
        });
    });
});
