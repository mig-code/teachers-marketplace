import { createAction } from '@reduxjs/toolkit';
import { ProductStructure } from '../types/products.types';
import { UserStructure } from '../types/user.type';
import { actionTypesUser, actionTypesUploadImage, actionTypesProducts } from './action.types';

/// createAction<number>  El tipo de dato que se espera en el payload

export const setUploadImageUrlActionCreatorUploadImage = createAction<string>(
    actionTypesUploadImage.setUploadImageUrl
);



export const loginActionCreatorUser = createAction<UserStructure>(
    actionTypesUser.login
);
export const logoutActionCreatorUser = createAction(actionTypesUser.logout);


export const loadActionCreatorProducts =
    createAction < Array<ProductStructure>>(actionTypesProducts.load);
export const addActionCreatorProducts = createAction(actionTypesProducts.create);
export const removeActionCreatorProducts = createAction(actionTypesProducts.remove);
export const updateActionCreatorProducts = createAction(actionTypesProducts.update);
