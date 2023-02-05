import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { uploadImageReducer } from '../reducer/upload.image.reducer';
import { userReducer } from '../reducer/user.reducer';
export const store = configureStore({
    reducer: {
        uploadImage: uploadImageReducer,
        user: userReducer,
        
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
