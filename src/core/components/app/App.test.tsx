import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('When render App component', () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    test('It should render the layout Component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App></App>
                </MemoryRouter>
            </Provider>
        );
        const textElement = screen.getByText(/Loading/i);
        expect(textElement).toBeInTheDocument();
    });
});
