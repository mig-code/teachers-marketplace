import { useMemo } from 'react';

import { useProducts } from '../hooks/use.products';
import { AppContext } from './app.context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const {
        products,
        handleLoadProducts,
        handleDeleteProduct,
        handleUpdateProduct,
    } = useProducts();
    console.log('Loading AppContextProvider with products: ', products);

    const context = useMemo(
        () => ({
            products,
            handleLoadProducts,
            handleDeleteProduct,
            handleUpdateProduct,
        }),
        [products, handleLoadProducts, handleDeleteProduct, handleUpdateProduct]
    );

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}
