import { useMemo } from 'react';

import { useProducts } from '../hooks/useProducts';
import { AppContext } from './app.context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const { getProducts } = useProducts();
    const products = getProducts();
    const context = useMemo(
        () => ({
            products,
        }),
        [products]
    );

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}
