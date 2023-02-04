import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { homeReducer } from '../reducer/home.reducer';
import { uploadImageReducer } from '../reducer/upload.image.reducer';
export const store = configureStore({
    reducer: {
        counter: homeReducer,
        uploadImage: uploadImageReducer,
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
