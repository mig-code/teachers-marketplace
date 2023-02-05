import { createReducer } from '@reduxjs/toolkit';
import { ProductStructure } from '../types/products.types';

import * as ac from './action.creator';

const initialState: Array<ProductStructure> = [];

export const productsReducer = createReducer(initialState, (builder) => {
    builder.addDefaultCase((state) => state);
});
