import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import { store } from '../../../../core/store/store';
import { UserFavorites } from './user.favorites';

describe('When render UserFavorites Product Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('It should render the title', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserFavorites></UserFavorites>
                </MemoryRouter>
            </Provider>
        );
        const headingElement = screen.getByRole('heading', {
            name: /Mis productos favoritos/i,
        });
        expect(headingElement).toBeInTheDocument();
    });
});
