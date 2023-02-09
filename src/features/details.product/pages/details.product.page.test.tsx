import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../../../core/store/store';
import { DetailsProductsPage } from './details.product.page';
import DetailsProduct from '../components/details.product';

jest.mock('../components/details.product');

describe('When render DetailsProduct Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('It should render the DetailsProduct component', () => {
        (DetailsProduct as jest.Mock).mockReturnValue(
            <div>DetailsProduct</div>
        );
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DetailsProductsPage></DetailsProductsPage>
                </MemoryRouter>
            </Provider>
        );

        expect(DetailsProduct).toHaveBeenCalled();
        const detailsProductElement = screen.getByText('DetailsProduct');
        expect(detailsProductElement).toBeInTheDocument();
    });
});
