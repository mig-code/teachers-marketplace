import { createAction } from '@reduxjs/toolkit';
import { homeActionTypes } from './action.types';

/// createAction<number>  El tipo de dato que se espera en el payload

export const incrementActionCreatorHome = createAction<number>(
    homeActionTypes.increment
);
export const incrementByAmountActionCreatorHome = createAction<number>(
    homeActionTypes.incrementByAmount
);
