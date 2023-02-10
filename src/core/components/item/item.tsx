import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/use.products';
import './item.scss';

import { ProductStructure } from '../../types/products.types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Item({ item }: { item: ProductStructure }) {
    const { handleDeleteProduct, handleUpdateProduct } = useProducts();
    const user = useSelector((state: RootState) => state.user);

    function handleClickAddToFavorites() {
        let AddUserLike: Partial<ProductStructure>;

        if (!item.isLikedBy) {
            AddUserLike = {
                ...item,
                isLikedBy: {
                    users: [user.info.firebaseId],
                },
            };
        } else {
            AddUserLike = {
                ...item,
                isLikedBy: {
                    ...item.isLikedBy,
                    users: [...item.isLikedBy.users, user.info.firebaseId],
                },
            };
        }

        handleUpdateProduct(AddUserLike);
    }
    function handleClickDeleteFromFavorites() {
        console.log('handleClickDeleteFromFavorites');
        if (!item.isLikedBy) return;
        const index = item.isLikedBy.users.indexOf(
            user.info.firebaseId
        ) as number;
        console.log('index', index);

        console.log('item.isLikedBy.users', item.isLikedBy.users);
        let retunedArray: string[] = [];
        if (item.isLikedBy.users.length === 1) {
            retunedArray = [];
        } else {
            retunedArray = item.isLikedBy.users.filter(
                (item, i) => i !== index
            ) as string[];
        }

        console.log('retunedArray', retunedArray);
        const deleteUserLike: Partial<ProductStructure> = {
            ...item,
            isLikedBy: {
                ...item.isLikedBy,
                users: retunedArray,
            },
        };
        console.log('deleteUserLike', deleteUserLike);

        handleUpdateProduct(deleteUserLike);
    }

    function handleClickDelete() {
        handleDeleteProduct(item.firebaseId);
    }
    const getIfUserLiked = () => {
        if (item.isLikedBy) {
            return item.isLikedBy.users.includes(user.info.firebaseId);
        }
        return false;
    };

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

            {user.info.firebaseId === item.productInfo.ownerUid && (
                <button className="delete" onClick={handleClickDelete}>
                    Eliminar
                </button>
            )}

            {getIfUserLiked() && user?.info.firebaseId && (
                <button
                    className="favorite"
                    onClick={handleClickDeleteFromFavorites}
                >
                    Eliminar de Favoritos
                </button>
            )}
            {!getIfUserLiked() && user?.info.firebaseId && (
                <button
                    className="favorite"
                    onClick={handleClickAddToFavorites}
                >
                    Añadir a Favoritos
                </button>
            )}

            {/* Not necesarry right now */}
            {/* {item.productInfo.ownerName && (
                <div className="item__uploaded-by">
                    Subido por: {item.productInfo.ownerName.split(' ')[0]}
                </div>
            )} */}
        </>
    );
}
