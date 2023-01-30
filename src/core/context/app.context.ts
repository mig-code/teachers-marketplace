/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { ProductInfoStructure, ProductStructure } from '../types/products.types';


export type AppContextStructure = {
    products: Array<ProductStructure>;
    handleLoadProducts: () => Promise<void>;
    handleDeleteProduct: (id: ProductStructure["firebaseId"]) => Promise<void>;
    handleUpdateProduct: (
        productPayload: Partial<ProductStructure>
    ) => Promise<void>;
    handleCreateProduct: (productPayload: ProductInfoStructure) => Promise<void>;
};

export const initialContext: AppContextStructure = {
    products: [],
    handleLoadProducts: async () => {},
    handleDeleteProduct: async (id: ProductStructure["firebaseId"]) => {},
    handleUpdateProduct: async (
        productPayload: Partial<ProductStructure>
    ) => {},
    handleCreateProduct: async (productPayload: ProductInfoStructure) => {},
};

export const AppContext = createContext(initialContext);
