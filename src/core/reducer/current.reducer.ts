import { createReducer } from '@reduxjs/toolkit';
import { ProductStructure } from '../types/products.types';

import * as ac from './action.creator';

export type currentState = {
    currentProduct: ProductStructure;
};
const initialState: currentState = {
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
    builder.addCase(ac.setCurrentActionCreatorProducts, (state, action) => {
        return {
            ...state,
            currentProduct: action.payload,
        };
    });
    builder.addDefaultCase((state) => state);
});
