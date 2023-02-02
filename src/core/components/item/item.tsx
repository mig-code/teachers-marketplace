import React, { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { ProductStructure } from '../../types/products.types';

export default function Item({ item }: { item: ProductStructure }) {
    const { handleDeleteProduct, handleUpdateProduct } = useContext(AppContext);

    function handleClickAddToFavorites() {
        console.log('Añadir a favoritos');
        if (!item.isLikedBy) {
            item.isLikedBy = {
                users: [],
            };
        }
        const AddUserLike: Partial<ProductStructure> = {
            ...item,
            isLikedBy: {
                ...item.isLikedBy,
                users: [...item.isLikedBy.users, 'user1'],
            },
        };
        console.log(AddUserLike);
        handleUpdateProduct(AddUserLike);
    }
    function handleClickDelete() {
        console.log('Eliminar item');
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
