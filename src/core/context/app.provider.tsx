import { useMemo } from 'react';

import { useProducts } from '../hooks/use.products';
import { useUsersAuth } from '../hooks/use.users.auth';
import { AppContext } from './app.context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const {
        products,
        handleLoadProducts,
        handleDeleteProduct,
        handleUpdateProduct,
        handleCreateProduct,
    } = useProducts();

    const { user, loginWithGoogle, logoutWithGoogle } = useUsersAuth();

    console.log('Loading AppContextProvider with products: ', products);

    const context = useMemo(
        () => ({
            products,
            handleLoadProducts,
            handleDeleteProduct,
            handleUpdateProduct,
            handleCreateProduct,
            user,
            loginWithGoogle,
            logoutWithGoogle,
        }),
        [
            products,
            handleLoadProducts,
            handleDeleteProduct,
            handleUpdateProduct,
            handleCreateProduct,
            user,
            loginWithGoogle,
            logoutWithGoogle,
        ]
    );

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}
