import { useMemo } from 'react';

import { useProducts } from '../hooks/use.products';
import { useUserAuth } from '../hooks/use.users.auth';
import { AppContext } from './app.context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const {
        products,
        handleLoadProducts,
        handleDeleteProduct,
        handleUpdateProduct,
        handleCreateProduct,
    } = useProducts();

    const { user, handleLoginWithGoogle, handleLogout } = useUserAuth();

    const context = useMemo(
        () => ({
            products,
            handleLoadProducts,
            handleDeleteProduct,
            handleUpdateProduct,
            handleCreateProduct,
            user,
            handleLoginWithGoogle,
            handleLogout,
        }),
        [
            products,
            handleLoadProducts,
            handleDeleteProduct,
            handleUpdateProduct,
            handleCreateProduct,
            user,
            handleLoginWithGoogle,
            handleLogout,
        ]
    );

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}
