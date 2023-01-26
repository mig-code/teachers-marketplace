/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { ProductStructure } from '../models/product';

export type AppContextStructure = {
    products: Array<ProductStructure>;
    handleLoadProducts: () => Promise<void>;
    handleDeleteProduct: (id: ProductStructure['id']) => Promise<void>;
    handleUpdateProduct: (
        productPayload: Partial<ProductStructure>
    ) => Promise<void>;
};

export const initialContext: AppContextStructure = {
    products: [],
    handleLoadProducts: async () => {},
    handleDeleteProduct: async (id: ProductStructure['id']) => {},
    handleUpdateProduct: async (productPayload: Partial<ProductStructure>) => {},
};

export const AppContext = createContext(initialContext);
