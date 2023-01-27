import { useCallback, useMemo, useState } from 'react';
import { consoleDebug } from '../../tools/debug';
import { ProductStructure } from '../models/product';
import { ProductsRepository } from '../services/products.repository';

export type UseProducts = {
    products: Array<ProductStructure>;
    handleLoadProducts: () => Promise<void>;
    handleDeleteProduct: (id: string) => Promise<void>;
    handleUpdateProduct: (
        productPayload: Partial<ProductStructure>
    ) => Promise<void>;
    handleCreateProduct: (productPayload: ProductStructure) => Promise<void>;
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
            handleError(error as Error);
        }
    }, [repo]);

    const handleDeleteProduct = useCallback(
        async (id: string) => {
            try {
                const deletedId = await repo.delete(id);
                setProducts((prev) =>
                    prev.filter((product) => product.localId !== deletedId)
                );
            } catch (error) {
                handleError(error as Error);
            }
        },
        [repo]
    );
    const handleUpdateProduct = useCallback(
        async (productPayload: Partial<ProductStructure>) => {
            try {
                console.log('UPDATE PRODUCT');
                await repo.update(productPayload);

                setProducts((prev) =>
                    prev.map((product) => {
                        if (product.localId === productPayload.localId) {
                            return {
                                ...product,
                                ...productPayload,
                            };
                        }
                        return product;
                    })
                );
            } catch (error) {
                handleError(error as Error);
            }
        },
        [repo]
    );
    const handleCreateProduct = useCallback(
        async (productPayload: ProductStructure) => {
            try {
                console.log('CREATE PRODUCT');
                await repo.create(productPayload);
            } catch (error) {
                handleError(error as Error);
            }
        },
        [repo]
    );

    const handleError = (error: Error) => {
        consoleDebug(error.message);
    };

    return {
        products,
        handleLoadProducts,
        handleDeleteProduct,
        handleUpdateProduct,
        handleCreateProduct,
    };
}
