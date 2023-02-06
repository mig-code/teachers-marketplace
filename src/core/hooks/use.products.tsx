import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { consoleDebug } from '../../tools/debug';

import { ProductsRepository } from '../services/products.repository';

import { ProductStructure } from '../types/products.types';

import * as ac from '../../core/reducer/action.creator';

export type UseProducts = {
    handleLoadProducts: () => Promise<void>;
    handleDeleteProduct: (id: string) => Promise<void>;
    handleUpdateProduct: (
        productPayload: Partial<ProductStructure>
    ) => Promise<void>;
    handleCreateProduct: (productPayload: ProductStructure) => Promise<void>;
};

export function useProducts(): UseProducts {
    const repo = useMemo(() => new ProductsRepository(), []);

    const dispatcher = useDispatch();

    const handleLoadProducts = useCallback(async () => {
        try {
            const products = await repo.load();
            // setProducts(products);
            dispatcher(ac.loadActionCreatorProducts(products));
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo, dispatcher]);

    const handleDeleteProduct = useCallback(
        async (id: ProductStructure['firebaseId']) => {
            try {
                const deletedId = await repo.delete(id);

                dispatcher(ac.deleteActionCreatorProducts(deletedId));
            } catch (error) {
                handleError(error as Error);
            }
        },
        [repo, dispatcher]
    );
    const handleUpdateProduct = useCallback(
        async (productPayload: Partial<ProductStructure>) => {
            try {
                await repo.update(productPayload);

                dispatcher(ac.updateActionCreatorProducts(productPayload));
            } catch (error) {
                handleError(error as Error);
            }
        },
        [repo, dispatcher]
    );
    const handleCreateProduct = useCallback(
        async (productPayload: ProductStructure) => {
            try {
                await repo.create(productPayload);

                dispatcher(ac.createActionCreatorProducts(productPayload));
            } catch (error) {
                handleError(error as Error);
            }
        },
        [repo, dispatcher]
    );

    const handleError = (error: Error) => {
        consoleDebug(error.message);
    };

    return {
        handleLoadProducts,
        handleDeleteProduct,
        handleUpdateProduct,
        handleCreateProduct,
    };
}
