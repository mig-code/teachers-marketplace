import { createAction } from '@reduxjs/toolkit';
import { ProductStructure } from '../types/products.types';
import { UserStructure } from '../types/user.type';
import {
    actionTypesUser,
    actionTypesUploadImage,
    actionTypesProducts,
    actionTypesSearch,
} from './action.types';

/// createAction<number>  El tipo de dato que se espera en el payload

export const setUploadImageUrlActionCreatorUploadImage = createAction<string>(
    actionTypesUploadImage.setUploadImageUrl
);



export const loginActionCreatorUser = createAction<UserStructure>(
    actionTypesUser.login
);
export const logoutActionCreatorUser = createAction(actionTypesUser.logout);



export const loadActionCreatorProducts = createAction<Array<ProductStructure>>(
    actionTypesProducts.load
);
export const createActionCreatorProducts = createAction<ProductStructure>(
    actionTypesProducts.create
);

export const deleteActionCreatorProducts = createAction<
    ProductStructure['firebaseId']
>(actionTypesProducts.delete);
export const updateActionCreatorProducts = createAction<
    Partial<ProductStructure>
>(actionTypesProducts.update);


export const setCurrentActionCreatorProducts = createAction<ProductStructure>(
    actionTypesProducts.setCurrent
);

export const setQueryActionCreatorSearch = createAction<string>(
    actionTypesSearch.setQuery
);

export const setModeActionCreatorSearch = createAction<boolean>(
    actionTypesSearch.setMode
);

export const resetActionCreatorSearch = createAction(actionTypesSearch.reset);
