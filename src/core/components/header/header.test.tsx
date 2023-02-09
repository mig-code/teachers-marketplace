import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { Header } from './header';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
describe('When render Header component', () => {
    test('It should render the logo images', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header></Header>
                </MemoryRouter>
            </Provider>
        );
        const logoImage = screen.getAllByRole('img');
        expect(logoImage).toHaveLength(2);
        expect(logoImage[0]).toHaveAttribute('alt', 'logo-icon');
        expect(logoImage[1]).toHaveAttribute('alt', 'logo-text');
    });
});
