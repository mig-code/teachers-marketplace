import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
    emptyPreloadedStateMock,
    mockSearchStateRealtimeWithQuery,
} from '../../../mocks/store.mock';
import { SearchBox } from './search.box';

import { searchReducer } from '../../../core/reducer/search.reducer';
import { RootState } from '../../../core/store/store';

describe('Given SearchBox component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('When it has been render with initial state', () => {
        test('Then we can click the button and update the store after submit', () => {
            const mockPreloadedState = emptyPreloadedStateMock;

            const mockStore = configureStore({
                reducer: {
                    search: searchReducer,
                },
                preloadedState: mockPreloadedState,
            });
            render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <SearchBox></SearchBox>
                    </BrowserRouter>
                </Provider>
            );

            const searchInputElement = screen.getByRole('textbox');

            userEvent.type(searchInputElement, 'test component');
            expect(searchInputElement).toHaveValue('test component');

            const buttonElement = screen.getAllByRole('button');

            userEvent.click(buttonElement[0]);
            expect(buttonElement[0]).toHaveTextContent('Buscar');

            expect(mockStore.getState().search.searchQuery).toBe(
                'test component'
            );
        });
    });
    describe('When it has been render with mockQuery and realtime', () => {
        test('Then we expect than input has value from store and modify it in realtime when an input', () => {
            const mockPreloadedState: Partial<RootState> = {
                search: mockSearchStateRealtimeWithQuery,
            };

            const mockStore = configureStore({
                reducer: {
                    search: searchReducer,
                },
                preloadedState: mockPreloadedState,
            });
            render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <SearchBox></SearchBox>
                    </BrowserRouter>
                </Provider>
            );

            const searchInputElement = screen.getByRole('textbox');

            expect(searchInputElement).toHaveValue('test');

            userEvent.type(searchInputElement, ' added text');

            expect(mockStore.getState().search.searchQuery).toBe(
                'test added text'
            );
        });
    });
});
