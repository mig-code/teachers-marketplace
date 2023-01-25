import { useMemo } from 'react';
import { productTemporalData } from '../data/products';
import { AppContext } from './app.context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const products = productTemporalData;
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
