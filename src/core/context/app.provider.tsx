import { useMemo } from 'react';

import { useProducts } from '../hooks/useProducts';
import { AppContext } from './app.context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const {products,handleLoadProducts } = useProducts();
   
    const context = useMemo(
        () => ({
            products,
            handleLoadProducts,
        }),
        [products, handleLoadProducts]
    );

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}
