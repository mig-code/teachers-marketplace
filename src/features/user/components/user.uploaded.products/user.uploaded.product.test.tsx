import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import { UserUploadedProducts } from './user.uploaded.products';
import { store } from '../../../../core/store/store';

describe('When render User Uploaded Product Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('It should render the title', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserUploadedProducts></UserUploadedProducts>
                </MemoryRouter>
            </Provider>
        );
        const headingElement = screen.getByRole('heading', {
            name: /Mis productos subidos/i,
        });
        expect(headingElement).toBeInTheDocument();
    });
});
