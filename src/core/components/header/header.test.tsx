import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { Header } from './header';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
describe('When render Header component', () => {
    test('It should render the title', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header></Header>
                </MemoryRouter>
            </Provider>
        );
        const headingElement = screen.getByRole('heading', {
            name: /Teachers Marketplace/i,
        });
        expect(headingElement).toBeInTheDocument();
    });
});
