import React from 'react';
import { useSelector } from 'react-redux';
import { ButtonDelete } from '../../../../core/components/button.delete/button.delete';
import { ButtonFavorite } from '../../../../core/components/button.favorite/button.favorite';
import { useProducts } from '../../../../core/hooks/use.products';
import { useUserFavorites } from '../../../../core/hooks/use.user.favorites';
import { RootState } from '../../../../core/store/store';
import { ProductStructure } from '../../../../core/types/products.types';

export default function UserItem({
    item,
    userMenuTab,
}: {
    item: ProductStructure;
    userMenuTab: string;
}) {
    const { handleDeleteProduct } = useProducts();
    const { handleAddToFavorites, handleRemoveFromFavorites } =
        useUserFavorites(item);

    const user = useSelector((state: RootState) => state.user);

    async function handleClickAddToFavorites() {
        await handleAddToFavorites();
    }
    async function handleClickDeleteFromFavorites() {
        await handleRemoveFromFavorites();
    }

    async function handleClickDelete() {
        await handleDeleteProduct(item.firebaseId);
    }

    return (
        <>
            <img
                className="item__image"
                src={item.productInfo.imgUrl}
                alt={item.productInfo.title}
            />
            <h2 className="item__title">{item.productInfo.title}</h2>
            <div className="item__price"> {item.productInfo.price} €</div>
            <div className="item__description">
                {item.productInfo.description}
            </div>

            {userMenuTab === 'userProductsTab' && (
                <ButtonDelete
                    item={item}
                    user={user}
                    handleClickDelete={handleClickDelete}
                />
            )}
            {userMenuTab === 'userFavoritesTab' && (
                <ButtonFavorite
                    item={item}
                    user={user}
                    handleClickAddToFavorites={handleClickAddToFavorites}
                    handleClickDeleteFromFavorites={
                        handleClickDeleteFromFavorites
                    }
                />
            )}
        </>
    );
}
