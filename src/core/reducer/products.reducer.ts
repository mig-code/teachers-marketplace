import { createReducer } from '@reduxjs/toolkit';
import { ProductStructure } from '../types/products.types';

import * as ac from './action.creator';

const initialState: Array<ProductStructure> = [];

export const productsReducer = createReducer(initialState, (builder) => {
    builder.addCase(ac.loadActionCreatorProducts, (state, action) => {
        return action.payload;
    });
    builder.addCase(ac.deleteActionCreatorProducts, (state, action) => {
        return state.filter((product) => product.firebaseId !== action.payload);
    });
    builder.addCase(ac.updateActionCreatorProducts, (state, action) => {
        return state.map((product) => {
            if (product.firebaseId === action.payload.firebaseId) {
                return {
                    ...product,
                    ...action.payload,
                };
            }
            return product;
        });
    });
    builder.addCase(ac.createActionCreatorProducts, (state, action) => {
        return [...state, action.payload];

    });

    builder.addDefaultCase((state) => state);
});
