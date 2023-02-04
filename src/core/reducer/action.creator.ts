import { createAction } from '@reduxjs/toolkit';
import { uploadImageActionTypes } from './action.types';

/// createAction<number>  El tipo de dato que se espera en el payload

export const setUploadImageUrlActionCreatorUploadImage = createAction<string>(
    uploadImageActionTypes.setUploadImageUrl
);
