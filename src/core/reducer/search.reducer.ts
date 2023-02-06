import { createReducer } from '@reduxjs/toolkit';

import * as ac from './action.creator';

const initialState = {
    searchQuery: 'ou mama',
    realTimeSearch: false,
};

export const searchReducer = createReducer(initialState, (builder) => {
    builder.addCase(ac.setQueryActionCreatorSearch, (state, action) => {
        state.searchQuery = action.payload;
    });
    builder.addCase(ac.setModeActionCreatorSearch, (state, action) => {
        state.realTimeSearch = action.payload;
    });

    builder.addDefaultCase((state) => state);
});
