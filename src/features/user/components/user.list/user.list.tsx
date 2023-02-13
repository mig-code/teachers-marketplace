import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../core/store/store';
import { ProductStructure } from '../../../../core/types/products.types';
import { getIfUserHasLikedThisProduct } from '../../../../helpers/getIfUserHasLikedThisProduct';
import UserItem from '../user.item/user.item';
import './user.list.scss';

export function UserList() {
    const { products } = useSelector((state: RootState) => state);
    const user = useSelector((state: RootState) => state.user);
    const [userMenuTab, setUserMenuTab] = useState('userProductsTab');

    const handleUserMenu = (menu: string) => {
        setUserMenuTab(menu);
    };

    let filterByTypeOfList = [] as Array<ProductStructure>;

    if (userMenuTab === 'userFavoritesTab') {
        filterByTypeOfList = products.filter((item) =>
            getIfUserHasLikedThisProduct(item, user)
        );
    }
    if (userMenuTab === 'userProductsTab') {
        filterByTypeOfList = products.filter(
            (item) => item.productInfo.ownerUid === user.info.firebaseId
        );
    }
    const title =
        userMenuTab === 'userFavoritesTab'
            ? 'Mis productos Favoritos'
            : 'Mis productos subidos';

    return (
        <div className="user-list">
            <div className="user-list__title"> {title}</div>

            <div className="user-list__options">
                <button
                    className="user-list__button"
                    onClick={() => handleUserMenu('userProductsTab')}
                >
                    Mis productos
                </button>
                <button
                    className="user-list__button"
                    onClick={() => handleUserMenu('userFavoritesTab')}
                >
                    Mis favoritos
                </button>
            </div>

            <div className="item-list__list">
                {filterByTypeOfList.map((item) => (
                    <article className="user-item" key={item.firebaseId}>
                        <UserItem item={item} userMenuTab={userMenuTab} />
                    </article>
                ))}
            </div>
        </div>
    );
}
