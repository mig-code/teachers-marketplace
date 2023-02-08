import React, { useState } from 'react';
import { UserFavorites } from '../components/user.favorites/user.favorites';
import { UserUploadedProducts } from '../components/user.uploaded.products/user.uploaded.products';

export function UserPage() {
    const [userMenu, setUserMenu] = useState('uploadedProducts');

    const handleUserMenu = (menu: string) => {
        setUserMenu(menu);
    };

    return (
        <section>
            <div>
                <h4>Página de Usuario</h4>
                <div>
                    <button onClick={() => handleUserMenu('uploadedProducts')}>
                        Mis productos
                    </button>
                    <button onClick={() => handleUserMenu('favorites')}>
                        Mis favoritos
                    </button>
                </div>

                {userMenu === 'uploadedProducts' && (
                    <>
                        <UserUploadedProducts></UserUploadedProducts>
                    </>
                )}
                {userMenu === 'favorites' && (
                    <>
                        <UserFavorites></UserFavorites>
                    </>
                )}
            </div>
        </section>
    );
}
