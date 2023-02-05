import React from 'react';
import { useProducts } from '../../hooks/use.products';

import { ProductStructure } from '../../types/products.types';

export default function Item({ item }: { item: ProductStructure }) {
    const { handleDeleteProduct, handleUpdateProduct } = useProducts();

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
    function handleClickDelete() {
        handleDeleteProduct(item.firebaseId);
    }
    return (
        <div>
            <h2>{item.productInfo.title}</h2>

            <p>{item.productInfo.description}</p>
            <img src={item.productInfo.imgUrl} alt={item.productInfo.title} />
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
            <button onClick={handleClickDelete}>Eliminar</button>
            <button onClick={handleClickAddToFavorites}>
                Añadir a Favoritos
            </button>
        </div>
    );
}
