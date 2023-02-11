/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { mockProduct1 } from '../../mocks/store.mock';
import { store } from '../store/store';
import { ProductStructure } from '../types/products.types';
import { useUserFavorites } from './use.user.favorites';

jest.mock('./use.products');

const mockHandleUpdateProduct = jest.fn();

jest.mock('./use.products', () => ({
    handleUpdateProduct: () => mockHandleUpdateProduct(),
}));

describe(`Given useFavorites (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;

    let buttons: Array<HTMLElement>;
    const mockProduct: ProductStructure = mockProduct1;

    beforeEach(() => {
        TestComponent = () => {
            const { handleAddToFavorites, handleRemoveFromFavorites } =
                useUserFavorites(mockProduct);

            return (
                <>
                    <button onClick={handleAddToFavorites}>
                        Add to Favorites
                    </button>
                    <button onClick={handleRemoveFromFavorites}>Logout</button>
                    <div>{mockProduct.isLikedBy?.users}</div>
                </>
            );
        };

        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Provider store={store}>
                <TestComponent />
            </Provider>
        );
        buttons = screen.getAllByRole('button');
    });

    describe('When we click on the button Add to Favorites', () => {
        beforeEach(() => {
            mockHandleUpdateProduct.mockResolvedValue({
                ...mockProduct,
                isLikedBy: {},
            });
            mockHandleUpdateProduct.mockClear();
        });
        test('Then its function handleAddToFavorites should be called', async () => {
            await act(async () => {
                userEvent.click(buttons[0]);
            });

            expect(mockHandleUpdateProduct).toHaveBeenCalled();

            await waitFor(() => {
                expect(store.getState().products[0].isLikedBy?.users).toBe(
                    'validId'
                );
            });
        });
    });
});
