import { useMemo } from 'react';

import { useProducts } from '../hooks/use.products';
import { AppContext } from './app.context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const {
        products,
        handleLoadProducts,
        handleDeleteProduct,
        handleUpdateProduct,
        handleCreateProduct,
    } = useProducts();

    const context = useMemo(
        () => ({
            products,
            handleLoadProducts,
            handleDeleteProduct,
            handleUpdateProduct,
            handleCreateProduct,
        }),
        [
            products,
            handleLoadProducts,
            handleDeleteProduct,
            handleUpdateProduct,
            handleCreateProduct,
        ]
    );

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}
