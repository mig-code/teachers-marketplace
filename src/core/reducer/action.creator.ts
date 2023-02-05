import { createAction } from '@reduxjs/toolkit';
import { UserStructure } from '../types/user.type';
import { actionTypesUser, actionTypesUploadImage } from './action.types';

/// createAction<number>  El tipo de dato que se espera en el payload

export const setUploadImageUrlActionCreatorUploadImage = createAction<string>(
    actionTypesUploadImage.setUploadImageUrl
);

export const loginActionCreatorUser = createAction<UserStructure>(
    actionTypesUser.login
);
export const logoutActionCreatorUser = createAction(actionTypesUser.logout);
