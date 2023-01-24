import React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import { Header } from './header';
describe('When render Header component', () => {
    test('It should render the title', () => {
        render(
            <BrowserRouter>
                <Header></Header>
            </BrowserRouter>
        );
        const headingElement = screen.getByRole('heading', {
            name: /Teachers Marketplace/i,
        });
        expect(headingElement).toBeInTheDocument();
    });
});
