/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { ProductStructure } from '../models/product';

export type AppContextStructure = {
    products: Array<ProductStructure>;
    handleLoadProducts: () => Promise<void>;
};

export const initialContext: AppContextStructure = {
    products: [],
    handleLoadProducts: async () => {},
};

export const AppContext = createContext(initialContext);
