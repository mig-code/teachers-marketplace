import React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('When render App component', () => {
    test('It should render the layout Component', () => {
        render(
            <BrowserRouter>
                <App></App>
            </BrowserRouter>
        );
        const textElement = screen.getByText(
            /Dale una segunda vida al material escolar/i
        );
        expect(textElement).toBeInTheDocument();
    });
});
