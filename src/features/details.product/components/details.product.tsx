import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useProducts } from '../../../core/hooks/use.products';
import { RootState } from '../../../core/store/store';
import { ProductStructure } from '../../../core/types/products.types';
import * as ac from '../../../core/reducer/action.creator';

export default function DetailsProduct() {
    const { handleUpdateProduct } = useProducts();

    const item: ProductStructure = useSelector(
        (state: RootState) => state.current.currentProduct
    );

    const dispatcher = useDispatch();

    const firebaseUser = useParams();
    const firebaseString = firebaseUser.id;
    console.log(firebaseString);
    const filterItem =
     useSelector((state: RootState) =>
        state.products.filter((item) => item.firebaseId === firebaseString)
    );
    console.log('filterItem', filterItem);

    function handleClickAddToFavorites() {
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

        handleUpdateProduct(AddUserLike);
    }

    useEffect(() => {
        dispatcher(ac.setCurrentActionCreatorProducts(filterItem[0]));
    }, [item, dispatcher,]);

    return (
        <div>
            {item ? (
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
