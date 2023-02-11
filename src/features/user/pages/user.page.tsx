import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../core/hooks/use.user.auth';
import { RootState } from '../../../core/store/store';
import { UserFavorites } from '../components/user.favorites/user.favorites';
import { UserUploadedProducts } from '../components/user.uploaded.products/user.uploaded.products';

export function UserPage() {
    const [userMenu, setUserMenu] = useState('uploadedProductsTab');
    const user = useSelector((state: RootState) => state.user);
    const { handleLogout } = useUserAuth();
    const navigate = useNavigate();

    const handleUserMenu = (menu: string) => {
        setUserMenu(menu);
    };
    const handleLogoutOnClick = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <section>
            <div>
                <h4>Página de Usuario</h4>
                <p>Nombre: {user.info?.name}</p>
                {user.info.photoUrl && user.info.name && (
                    <img src={user.info.photoUrl} alt={user.info.name}></img>
                )}

                {user?.info.firebaseId && (
                    <p className="nav-button" onClick={handleLogoutOnClick}>
                        Cerrar sesión
                    </p>
                )}
                <div>
                    <button
                        onClick={() => handleUserMenu('uploadedProductsTab')}
                    >
                        Mis productos
                    </button>
                    <button onClick={() => handleUserMenu('favoritesTab')}>
                        Mis favoritos
                    </button>
                </div>

                {userMenu === 'uploadedProductsTab' && (
                    <>
                        <UserUploadedProducts></UserUploadedProducts>
                    </>
                )}
                {userMenu === 'favoritesTab' && (
                    <>
                        <UserFavorites></UserFavorites>
                    </>
                )}
            </div>
        </section>
    );
}
