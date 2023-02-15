import { createReducer } from '@reduxjs/toolkit';

import * as ac from '../action.creator';

export type ModalState = {
    loginModal: boolean;
};
const initialState = {
    loginModal: true,
};

export const modalReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ac.openActionCreatorModal, (state) => {
            state.loginModal = true;
        })
        .addCase(ac.closeActionCreatorModal, (state) => {
            state.loginModal = false;
        });

    builder.addDefaultCase((state) => state);
});
