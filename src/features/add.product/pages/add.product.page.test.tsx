import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { AddProductPage } from './add.product.page';
import { Provider } from 'react-redux';
import { store } from '../../../core/store/store';

jest.mock('../components/add.product.form', () => ({
    AddProductForm: () => <div>Mocked AddProductForm</div>,
}));

describe('When render AddProduct Page', () => {
    test('It should render the title and mocked AddProductForm', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddProductPage></AddProductPage>
                </MemoryRouter>
            </Provider>
        );
        const title = screen.getByText(/¿Qué quieres subir?/i);
        expect(title).toBeInTheDocument();

        const mockedAddProductForm = screen.getByText(/Mocked AddProductForm/i);
        expect(mockedAddProductForm).toBeInTheDocument();
    });
});
