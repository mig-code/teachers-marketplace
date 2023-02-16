import React from 'react';
import { useNavigate } from 'react-router-dom';

import './item.scss';

import { ProductStructure } from '../../types/products.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useUserFavorites } from '../../hooks/use.user.favorites';
import { ButtonFavorite } from '../button.favorite/button.favorite';
import * as ac from '../../reducer/action.creator';

export default function Item({ item }: { item: ProductStructure }) {
    const { handleAddToFavorites, handleRemoveFromFavorites } =
        useUserFavorites(item);

    const user = useSelector((state: RootState) => state.user);

    const dispatcher = useDispatch();
    const navigate = useNavigate();

    async function handleClickAddToFavorites() {
        await handleAddToFavorites();
    }
    async function handleClickDeleteFromFavorites() {
        await handleRemoveFromFavorites();
    }
    function setCurrentProduct() {
        dispatcher(ac.resetCurrentActionCreatorProducts());
        navigate(`/producto/${item.firebaseId}`);
    }

    return (
        <>
            <div
                className="item__clickable-container"
                data-testid="item__clickable-container"
                onClick={setCurrentProduct}
            >
                <h2 className="item__title">{item.productInfo.title}</h2>
                <div className="item__favorites">
                    {item.isLikedBy
                        ? '¡Le gusta a ' +
                          item.isLikedBy.users.length +
                          ' personas!'
                        : 'A nadie le gusta todavía'}{' '}
                </div>

                <div className="item__price"> {item.productInfo.price} €</div>

                <img
                    className="item__image"
                    src={item.productInfo.imgUrl}
                    alt={item.productInfo.title}
                    loading="lazy"
                />

                <div className="item__description">
                    {item.productInfo.description}
                </div>
                <div className="item__category">
                    {item.productInfo.category}
                </div>
            </div>
            <ButtonFavorite
                item={item}
                user={user}
                handleClickAddToFavorites={handleClickAddToFavorites}
                handleClickDeleteFromFavorites={handleClickDeleteFromFavorites}
            />
        </>
    );
}
