import { createReducer } from '@reduxjs/toolkit';
import { UserStructure } from '../types/user.type';

import * as ac from './action.creator';

const initialState: UserStructure = {
    info: {
        firebaseId: '',
        name: '',
        photoUrl: '',
    },
    token: '',
};

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(
        ac.loginActionCreatorUser,
        (state, action) => action.payload
    );
    builder.addCase(ac.logoutActionCreatorUser, (state) => initialState);

    builder.addDefaultCase((state) => state);
});
