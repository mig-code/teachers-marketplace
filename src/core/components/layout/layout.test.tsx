import React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from './layout';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Given Layout component', () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    test('renders his children', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Layout>
                        <div>children Test</div>
                    </Layout>
                </MemoryRouter>
            </Provider>
        );

        const textElement = screen.getByText(/children Test/i);
        expect(textElement).toBeInTheDocument();
    });
});
