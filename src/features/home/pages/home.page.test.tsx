import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './home.page';
import { store } from '../../../core/store/store';
import { Provider } from 'react-redux';

test('renders Home Page', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <HomePage></HomePage>
            </MemoryRouter>
        </Provider>
    );
    const headingElement = screen.getByRole('heading', {
        name: /Dale una segunda vida al material escolar/i,
    });
    expect(headingElement).toBeInTheDocument();
});
