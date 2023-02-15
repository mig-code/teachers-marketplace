import { createAction } from '@reduxjs/toolkit';
import { ProductStructure } from '../types/products.types';
import { UserStructure } from '../types/user.type';
import {
    actionTypesUser,
    actionTypesUploadImage,
    actionTypesProducts,
    actionTypesSearch,
    actionTypesModal,
} from './action.types';



// Upload image actions
export const setUploadImageUrlActionCreatorUploadImage = createAction<string>(
    actionTypesUploadImage.setUploadImageUrl
);

// User actions

export const loginActionCreatorUser = createAction<UserStructure>(
    actionTypesUser.login
);
export const logoutActionCreatorUser = createAction(actionTypesUser.logout);

// Products actions

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
    actionTypesProducts.loadCurrent
);

// Search actions

export const setQueryActionCreatorSearch = createAction<string>(
    actionTypesSearch.setQuery
);

export const setModeActionCreatorSearch = createAction<boolean>(
    actionTypesSearch.setMode
);

export const resetActionCreatorSearch = createAction(actionTypesSearch.reset);

//Modal actions

export const openActionCreatorModal = createAction(actionTypesModal.open);
export const closeActionCreatorModal = createAction(actionTypesModal.close);
