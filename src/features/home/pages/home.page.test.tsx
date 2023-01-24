import React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './home.page';

test('renders Home Page', () => {
    render(
        <BrowserRouter>
            <HomePage></HomePage>
        </BrowserRouter>
    );
    const headingElement = screen.getByRole('heading', {
        name: /Dale una segunda vida al material escolar/i,
    });
    expect(headingElement).toBeInTheDocument();
});
