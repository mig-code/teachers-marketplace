import React from 'react';
import { Link } from 'react-router-dom';

import './item.scss';

import { ProductStructure } from '../../types/products.types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useUserFavorites } from '../../hooks/use.user.favorites';
import { ButtonFavorite } from '../button.favorite/button.favorite';

export default function Item({ item }: { item: ProductStructure }) {
    const { handleAddToFavorites, handleRemoveFromFavorites } =
        useUserFavorites(item);

    const user = useSelector((state: RootState) => state.user);

    async function handleClickAddToFavorites() {
        await handleAddToFavorites();
    }
    async function handleClickDeleteFromFavorites() {
        await handleRemoveFromFavorites();
    }

    return (
        <>
            <Link to={`/producto/${item.firebaseId}`}>
                <h2 className="item__title">{item.productInfo.title}</h2>
                <div className="item__favorites">
                    {item.isLikedBy
                        ? '¡Le gusta a ' +
                          item.isLikedBy.users.length +
                          ' personas !'
                        : 'A nadie le gusta todavía'}{' '}
                </div>

                <div className="item__price"> {item.productInfo.price} €</div>

                <img
                    className="item__image"
                    src={item.productInfo.imgUrl}
                    alt={item.productInfo.title}
                />
            </Link>
            <div className="item__description">
                {item.productInfo.description}
            </div>
            <div className="item__category">{item.productInfo.category}</div>

            <ButtonFavorite
                item={item}
                user={user}
                handleClickAddToFavorites={handleClickAddToFavorites}
                handleClickDeleteFromFavorites={handleClickDeleteFromFavorites}
            />
        </>
    );
}
