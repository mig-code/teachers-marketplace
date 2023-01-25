/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { ProductStructure } from '../models/product';


export type AppContextStructure = {
    products:Array<ProductStructure>;
};

export const initialContext: AppContextStructure = {
    products: [],
};

export const AppContext = createContext(initialContext);
