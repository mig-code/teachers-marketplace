import React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { AddProductPage } from './add.product.page';


describe('When render AddProduct Page', () => {
    test('It should render the title', () => {
        render(
            <BrowserRouter>
                <AddProductPage></AddProductPage>
            </BrowserRouter>
        );
        const headingElement = screen.getByRole('heading', {
            name: /Add Product PAGE/i,
        });
        expect(headingElement).toBeInTheDocument();
    });
});
