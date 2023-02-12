import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../core/hooks/use.user.auth';
import { RootState } from '../../../core/store/store';

import { UserList } from '../components/user.list/user.list';


export function UserPage() {
    const [userMenuTab, setUserMenuTab] = useState('userProductsTab');
    const user = useSelector((state: RootState) => state.user);
    const { handleLogout } = useUserAuth();
    const navigate = useNavigate();

    const handleUserMenu = (menu: string) => {
        setUserMenuTab(menu);
    };
    const handleLogoutOnClick = () => {
        handleLogout();
        navigate('/');
    };
    console.log(userMenuTab)

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
                    <button onClick={() => handleUserMenu('userProductsTab')}>
                        Mis productos
                    </button>
                    <button onClick={() => handleUserMenu('userFavoritesTab')}>
                        Mis favoritos
                    </button>
                </div>
                <UserList typeOfList={userMenuTab}></UserList>
            </div>
        </section>
    );
}
