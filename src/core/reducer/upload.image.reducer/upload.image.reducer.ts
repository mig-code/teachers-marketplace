import { createReducer } from '@reduxjs/toolkit';

import * as ac from '../action.creator';

const initialState = '';

export const uploadImageReducer = createReducer(initialState, (builder) => {
    builder.addCase(
        ac.setUploadImageUrlActionCreatorUploadImage,
        (state, action) => action.payload
    );

    builder.addDefaultCase((state) => state);
});
