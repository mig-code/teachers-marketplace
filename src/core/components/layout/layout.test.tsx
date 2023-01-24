import React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from './layout';
import { BrowserRouter } from 'react-router-dom';

describe('Given Layout component', () => {
    test('renders his children', () => {
        render(
            <BrowserRouter>
                <Layout>
                    <div>children Test</div>
                </Layout>
            </BrowserRouter>
        );

        const textElement = screen.getByText(/children Test/i);
        expect(textElement).toBeInTheDocument();
    });
});
