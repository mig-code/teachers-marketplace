import { useCallback, useMemo, useState } from 'react';

import { ProductStructure } from '../models/product';
import { ProductsRepository } from '../services/products.repository';

export type UseProducts = {
    products: Array<ProductStructure>;
    handleLoadProducts: () => Promise<void>;
    handleDeleteProduct: (id: string) => Promise<void>;
};

export function useProducts(): UseProducts {
    const repo = useMemo(() => new ProductsRepository(), []);

    console.log('Loading UseProducts hook');

    const initialProducts = Array<ProductStructure>;
    const [products, setProducts] = useState(initialProducts);

    const handleLoadProducts = useCallback(async () => {
        try {
            const products = await repo.load();
            setProducts(products);
        } catch (error) {
            console.error(error);
        }
    }, [repo]);

    const handleDeleteProduct = useCallback(
        async (id: string) => {
            try {
                await repo.delete(id);
                const products = await repo.load();
                setProducts(products);
            } catch (error) {
                console.error(error);
            }
        },
        [repo]
    );

    return {
        products,
        handleLoadProducts,
        handleDeleteProduct,
    };
}
