import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useProducts } from '../../../core/hooks/use.products';
import { RootState } from '../../../core/store/store';
import { ProductStructure } from '../../../core/types/products.types';
import './details.product.scss';

export default function DetailsProduct() {
    const { handleUpdateProduct, handleQueryProduct } = useProducts();

    const firebaseString = useParams().id as string;
    const item: ProductStructure = useSelector(
        (state: RootState) => state.current.currentProduct
    );

    async function handleClickAddToFavorites() {
        let AddUserLike: Partial<ProductStructure>;

        if (!item.isLikedBy) {
            AddUserLike = {
                ...item,
                isLikedBy: {
                    users: ['user1'],
                },
            };
        } else {
            AddUserLike = {
                ...item,
                isLikedBy: {
                    ...item.isLikedBy,
                    users: [...item.isLikedBy.users, 'user1'],
                },
            };
        }

        await handleUpdateProduct(AddUserLike);
        handleQueryProduct(firebaseString);
    }

    useEffect(() => {
        handleQueryProduct(firebaseString);
    }, [handleQueryProduct, firebaseString]);

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
                            Subido por: {item.productInfo.ownerName}
                        </div>
                    )}

                    <div className="details__favorites">
                        {item.isLikedBy
                            ? '¡Le gusta a  ' +
                            item.isLikedBy.users.length +
                            ' personas !'
                            : 'A nadie le gusta todavía'}{' '}
                    </div>

                    <button onClick={handleClickAddToFavorites}>
                        Añadir a Favoritos
                    </button>
                </>
            ) : (
                <h2>Producto no encontrado</h2>
            )}
        </article>
    );
}
