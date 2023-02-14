import { actionTypesSearch } from '../action.types';

import { searchReducer, SearchState } from './search.reducer';

describe('Given the function searchReducer', () => {
    let action: { type: string; payload: unknown };
    let state: { search: SearchState };
    const mockInitialSearch = {
        searchQuery: '',
        realTimeSearch: false,
    };

    describe('When the action is setQuery', () => {
        beforeEach(() => {
            action = {
                type: actionTypesSearch.setQuery,
                payload: 'test',
            };
            state = {
                search: mockInitialSearch,
            };
        });
        test('Then the returned state should be the action payload', () => {
            const result = searchReducer(state.search, action);
            expect(result).toEqual({
                searchQuery: action.payload,
                realTimeSearch: false,
            });
        });
    });
    describe('When the action is setMode', () => {
        beforeEach(() => {
            action = {
                type: actionTypesSearch.setMode,
                payload: true,
            };
            state = {
                search: mockInitialSearch,
            };
        });
        test('Then the returned state should be the action payload', () => {
            const result = searchReducer(state.search, action);
            expect(result).toEqual({
                searchQuery: '',
                realTimeSearch: action.payload,
            });
        });
    });

    describe('When the action is reset', () => {
        beforeEach(() => {
            action = {
                type: actionTypesSearch.reset,
                payload: null,
            };
            state = {
                search: mockInitialSearch,
            };
        });
        test('Then the returned state should be initialSearch', () => {
            const result = searchReducer(state.search, action);
            expect(result).toEqual(mockInitialSearch);
        });
    });
});
