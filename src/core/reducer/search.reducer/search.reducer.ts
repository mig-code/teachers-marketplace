import { createReducer } from '@reduxjs/toolkit';

import * as ac from '../action.creator';

export type SearchState = {
    searchQuery: string;
    realTimeSearch: boolean;
};

const initialState: SearchState = {
    searchQuery: '',
    realTimeSearch: false,
};

export const searchReducer = createReducer(initialState, (builder) => {
    builder.addCase(ac.setQueryActionCreatorSearch, (state, action) => {
        state.searchQuery = action.payload;
    });
    builder.addCase(ac.setModeActionCreatorSearch, (state, action) => {
        state.realTimeSearch = action.payload;
    });
    builder.addCase(ac.resetActionCreatorSearch, () => {
        return initialState;
    });

    builder.addDefaultCase((state) => state);
});
