import { createReducer } from '@reduxjs/toolkit';
import { ProductStructure } from '../../types/products.types';

import * as ac from '../action.creator';

export type CurrentState = {
    currentProduct: ProductStructure;
};
const initialState: CurrentState = {
    currentProduct: {
        firebaseId: '',
        productInfo: {
            id: 0,
            title: '',
            description: '',
            ownerUid: '',
            ownerName: '',
            imgUrl: '',
            available: false,

            price: 0,
            category: ' ',
            publishedAt: '',
        },
    },
};
export const currentReducer = createReducer(initialState, (builder) => {
    builder.addCase(ac.loadCurrentActionCreatorProducts, (state, action) => {
        return {
            ...state,
            currentProduct: action.payload,
        };
    });
    builder.addCase(ac.resetCurrentActionCreatorProducts, (state) => {
        return {
            ...state,
            currentProduct: initialState.currentProduct,
        };
    });

    builder.addDefaultCase((state) => state);
});
