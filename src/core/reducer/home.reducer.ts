import { createReducer } from '@reduxjs/toolkit';

import * as ac from './action.creator';

const initialState = {
    count: 0,
};

export const homeReducer = createReducer(initialState, (builder) => {
    builder.addCase(ac.incrementActionCreatorHome, (state) => {
        state.count += 1;
    });
    builder.addCase(ac.incrementByAmountActionCreatorHome, (state, action) => {
        console.log(action);
        state.count += action.payload;
    });
    builder.addDefaultCase((state) => state);
});
