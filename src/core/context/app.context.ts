/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { UserStructure } from '../hooks/use.users.auth';
import { ProductStructure } from '../types/products.types';

export type AppContextStructure = {
    products: Array<ProductStructure>;
    handleLoadProducts: () => Promise<void>;
    handleDeleteProduct: (id: ProductStructure['firebaseId']) => Promise<void>;
    handleUpdateProduct: (
        productPayload: Partial<ProductStructure>
    ) => Promise<void>;
    handleCreateProduct: (productPayload: ProductStructure) => Promise<void>;
    user: UserStructure | null;
    handleLoginWithGoogle: () => Promise<void>;
    handleLogout: () => Promise<void>;
};

export const initialContext: AppContextStructure = {
    products: [],
    handleLoadProducts: async () => {},
    handleDeleteProduct: async (id: ProductStructure['firebaseId']) => {},
    handleUpdateProduct: async (
        productPayload: Partial<ProductStructure>
    ) => {},
    handleCreateProduct: async (
        productPayload: Partial<ProductStructure>
    ) => {},
    user: null,
    handleLoginWithGoogle: async () => {},
    handleLogout: async () => {},
};

export const AppContext = createContext(initialContext);
