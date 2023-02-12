import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../core/store/store';
import { ProductStructure } from '../../../../core/types/products.types';
import { getIfUserHasLikedThisProduct } from '../../../../helpers/getIfUserHasLikedThisProduct';
import UserItem from '../user.item/user.item';

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
        userMenuTab === 'userFavoritesTab' ? 'Favoritos' : 'Mis productos';

    return (
        <section>
            {title}
            <div>
                <button onClick={() => handleUserMenu('userProductsTab')}>
                    Mis productos
                </button>
                <button onClick={() => handleUserMenu('userFavoritesTab')}>
                    Mis favoritos
                </button>
            </div>

            <div className="list">
                {filterByTypeOfList.map((item) => (
                    <article className="item" key={item.firebaseId}>
                        <UserItem item={item} userMenuTab={userMenuTab} />
                    </article>
                ))}
            </div>
        </section>
    );
}
