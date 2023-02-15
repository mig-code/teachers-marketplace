import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { currentReducer } from '../reducer/current.reducer/current.reducer';
import { modalReducer } from '../reducer/modal.reducer/modal.reducer';
import { productsReducer } from '../reducer/products.reducer/products.reducer';
import { searchReducer } from '../reducer/search.reducer/search.reducer';

import { uploadImageReducer } from '../reducer/upload.image.reducer/upload.image.reducer';
import { userReducer } from '../reducer/user.reducer/user.reducer';
export const store = configureStore({
    reducer: {
        uploadImage: uploadImageReducer,
        user: userReducer,
        products: productsReducer,
        search: searchReducer,
        current: currentReducer,
        modal: modalReducer
    },
});

export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
