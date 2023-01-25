import { useCallback, useMemo, useState } from 'react';

import { ProductStructure } from '../models/product';
import { ProductsRepository } from '../services/products.repo';

export type UseProducts = {
    products: Array<ProductStructure>;
    handleLoadProducts: () => Promise<void>;
};

export function useProducts(): UseProducts {
    const repo = useMemo(() => new ProductsRepository(), []);

    const initialProducts = Array<ProductStructure>;
    const [products, setProducts] = useState(initialProducts);

    const handleLoadProducts = useCallback(async () => {
        const products = await repo.load();
        setProducts(products);
    }, [repo]);

    return {
        products,
        handleLoadProducts,
    };
}
