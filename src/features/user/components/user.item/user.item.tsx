import React from 'react';
import { useSelector } from 'react-redux';
import { ButtonDelete } from '../../../../core/components/button.delete/button.delete';
import { ButtonFavorite } from '../../../../core/components/button.favorite/button.favorite';
import { useProducts } from '../../../../core/hooks/use.products';
import { useUserFavorites } from '../../../../core/hooks/use.user.favorites';
import { RootState } from '../../../../core/store/store';
import { ProductStructure } from '../../../../core/types/products.types';

import './user.item.scss';

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
                className="user-item__image"
                src={item.productInfo.imgUrl}
                alt={item.productInfo.title}
            />
            <div className="user-item__container">
                <h2 className="user-item__title">{item.productInfo.title}</h2>
                <div className="user-item__price">
                    {' '}
                    {item.productInfo.price} €
                </div>
                <div className="user-item__description">
                    {item.productInfo.description}
                </div>
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
