import { useMemo } from 'react';

import { useProducts } from '../hooks/use.products';
import { AppContext } from './app.context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const { products, handleLoadProducts, handleDeleteProduct } = useProducts();
    console.log('Loading AppContextProvider with products: ', products);

    const context = useMemo(
        () => ({
            products,
            handleLoadProducts,
            handleDeleteProduct,
        }),
        [products, handleLoadProducts, handleDeleteProduct]
    );

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}
