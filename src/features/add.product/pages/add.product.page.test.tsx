import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { AddProductPage } from './add.product.page';
import { Provider } from 'react-redux';
import { store } from '../../../core/store/store';

describe('When render AddProduct Page', () => {
    test('It should render the title', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddProductPage></AddProductPage>
                </MemoryRouter>
            </Provider>
        );
        const headingElement = screen.getByRole('heading', {
            name: /Add Product PAGE/i,
        });
        expect(headingElement).toBeInTheDocument();
    });
});
