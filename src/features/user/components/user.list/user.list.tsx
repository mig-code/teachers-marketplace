import { useSelector } from 'react-redux';
import Item from '../../../../core/components/item/item';
import { RootState } from '../../../../core/store/store';
import { getIfUserHasLikedThisProduct } from '../../../../helpers/getIfUserHasLikedThisProduct';

export function UserList({ typeOfList }: { typeOfList: string }) {
    const { products } = useSelector((state: RootState) => state);
    const user = useSelector((state: RootState) => state.user);

    const filterByFavorites = products.filter((item) =>
        getIfUserHasLikedThisProduct(item, user)
    );
    const filterByUser = products.filter(
        (item) => item.productInfo.ownerUid === user.info.firebaseId
    );

    let filterByTypeOfList;
    if (typeOfList === 'userFavoritesTab') {
        filterByTypeOfList = filterByFavorites;
    } else {
        filterByTypeOfList = filterByUser;
    }
    const title =
        typeOfList === 'userFavoritesTab' ? 'Favoritos' : 'Mis productos';

    console.log(typeOfList);
    return (
        <section>
            {title}

            <div className="list">
                {filterByTypeOfList.map((item) => (
                    <article className="item" key={item.firebaseId}>
                        <Item item={item} />
                    </article>
                ))}
            </div>
        </section>
    );
}
