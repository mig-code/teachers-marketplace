import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useProducts } from '../../../core/hooks/use.products';
import { RootState } from '../../../core/store/store';
import { ProductStructure } from '../../../core/types/products.types';

export default function DetailsProduct() {
    const { handleUpdateProduct, handleQueryProduct } = useProducts();

    const firebaseString = useParams().id as string;
    const item: ProductStructure = useSelector(
        (state: RootState) => state.current.currentProduct
    );

    async function handleClickAddToFavorites () {
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
        <div>
            {item.productInfo ? (
                <>
                    <h2>{item.productInfo.title}</h2>

                    <p>{item.productInfo.description}</p>
                    <img
                        src={item.productInfo.imgUrl}
                        alt={item.productInfo.title}
                    />
                    <p>Precio : {item.productInfo.price}</p>
                    {item.productInfo.ownerName && (
                        <p>Subido por: {item.productInfo.ownerName}</p>
                    )}
                    <p>Categoria: {item.productInfo.category}</p>

                    <p>
                        Favorite by :
                        {item.isLikedBy
                            ? item.isLikedBy.users.map((user) => user + ' ')
                            : 'Nadie lo ha añadido a favoritos'}{' '}
                    </p>

                    <button onClick={handleClickAddToFavorites}>
                        Añadir a Favoritos
                    </button>
                </>
            ) : (
                <h2>Producto no encontrado</h2>
            )}
        </div>
    );
}
