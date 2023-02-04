import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { homeReducer } from '../reducer/home.reducer';
export const store = configureStore({
    reducer: {
        counter: homeReducer,
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
