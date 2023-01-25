import { getProductsData } from '../data/products';
import { ProductStructure } from '../models/product';

export type UseProducts = {
    getProducts: () => Array<ProductStructure>;
};

export function useProducts(): UseProducts {
    const initialProducts = getProductsData();

    return {
        getProducts: () => initialProducts,
    };
}
