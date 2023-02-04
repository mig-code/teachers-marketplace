import { createReducer } from '@reduxjs/toolkit';

import * as ac from './action.creator';

const initialState = 4;

export const homeReducer = createReducer(initialState, (builder) => {
    builder.addCase(ac.incrementActionCreatorHome, (state) => (state += 1));
    builder.addCase(ac.incrementByAmountActionCreatorHome, (state, action) => {
        console.log(action);
        return (state += action.payload);
    });
    builder.addDefaultCase((state) => state);
});
