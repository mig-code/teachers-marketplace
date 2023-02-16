import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useProducts } from '../../../core/hooks/use.products';
import { useUserFavorites } from '../../../core/hooks/use.user.favorites';
import { RootState } from '../../../core/store/store';
import { ProductStructure } from '../../../core/types/products.types';
import './details.product.scss';
import * as ac from '../../../core/reducer/action.creator';

import { ButtonFavorite } from '../../../core/components/button.favorite/button.favorite';

export default function DetailsProduct() {
    const firebaseString = useParams().id as string;

    const item: ProductStructure = useSelector(
        (state: RootState) => state.current.currentProduct
    );
    const user = useSelector((state: RootState) => state.user);

    const { handleQueryProduct } = useProducts();
    const { handleAddToFavorites, handleRemoveFromFavorites } =
        useUserFavorites(item);

    const dispatcher = useDispatch();

    async function handleClickAddToFavorites() {
        await handleAddToFavorites();
        dispatcher(ac.loadCurrentActionCreatorProducts(item));
        handleQueryProduct(firebaseString);
    }
    async function handleClickDeleteFromFavorites() {
        await handleRemoveFromFavorites();
        dispatcher(ac.loadCurrentActionCreatorProducts(item));
        handleQueryProduct(firebaseString);
    }

    useEffect(() => {
        handleQueryProduct(firebaseString);
    }, [firebaseString, handleQueryProduct]);

    return (
        <article className="details">
            {item.productInfo ? (
                <>
                    <h2 className="details__title">{item.productInfo.title}</h2>
                    <div className="details__category">
                        {item.productInfo.category}
                    </div>

                    <img
                        className="details__image"
                        src={item.productInfo.imgUrl}
                        alt={item.productInfo.title}
                    />
                    <div className="details__price">
                        {item.productInfo.price} €
                    </div>
                    <div className="details__description">
                        {item.productInfo.description}
                    </div>
                    {item.productInfo.ownerName && (
                        <div className="details__uploaded-by">
                            Subido por:{' '}
                            {item.productInfo.ownerName.split(' ')[0]}
                        </div>
                    )}

                    <div className="details__button-coninter">
                        <div className="details__favorites">
                            {item.isLikedBy
                                ? '¡Le gusta a  ' +
                                  item.isLikedBy.users.length +
                                  ' personas!'
                                : 'A nadie le gusta todavía'}{' '}
                        </div>
                        <ButtonFavorite
                            item={item}
                            user={user}
                            handleClickAddToFavorites={
                                handleClickAddToFavorites
                            }
                            handleClickDeleteFromFavorites={
                                handleClickDeleteFromFavorites
                            }
                        />
                    </div>
                </>
            ) : (
                <h2 className="details">Producto no encontrado</h2>
            )}
        </article>
    );
}
