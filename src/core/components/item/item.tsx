import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/use.products';
import './item.scss';

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
        <>
            <Link to={`/producto/${item.firebaseId}`}>
                <h2 className="item__title">{item.productInfo.title}</h2>
                <div className="item__favorites">
                    {item.isLikedBy
                        ? '¡Le gusta a  ' +
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

            <button onClick={handleClickAddToFavorites}>
                Añadir a Favoritos
            </button>
            <button onClick={handleClickDelete}>Eliminar</button>
            {/* Not necesarry right now */}
            {/* {item.productInfo.ownerName && (
                <div className="item__uploaded-by">
                    Subido por: {item.productInfo.ownerName.split(' ')[0]}
                </div>
            )} */}
        </>
    );
}
