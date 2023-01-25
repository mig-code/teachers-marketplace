import React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { Footer } from './footer';


describe('When render Footer component', () => {
    test('It should render the title', () => {
        render(
            <BrowserRouter>
                <Footer></Footer>
            </BrowserRouter>
        );
        const footerElement = screen.getByText(/Miguel Pgomez | Isdi Coders Final Project/i);
        expect(footerElement).toBeInTheDocument();
    });
});
