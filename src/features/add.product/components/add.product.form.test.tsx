import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { AddProductForm } from './add.product.form';

describe('When render AddProductForm component', () => {
    test('It should render the title', () => {
        render(
            <BrowserRouter>
                <AddProductForm></AddProductForm>
            </BrowserRouter>
        );
        const headingElement = screen.getByRole('heading', {
            name: /Añadir Producto/i,
        });
        expect(headingElement).toBeInTheDocument();
    });
});
