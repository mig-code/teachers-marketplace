import { useDispatch } from 'react-redux';
import { getIfUserHasLikedThisProduct } from '../../../helpers/getIfUserHasLikedThisProduct';
import { ProductStructure } from '../../types/products.types';
import { UserStructure } from '../../types/user.type';
import * as ac from '../../reducer/action.creator';

export function ButtonFavorite({
    item,
    user,
    handleClickAddToFavorites,
    handleClickDeleteFromFavorites,
}: {
    item: ProductStructure;
    user: UserStructure;
    handleClickAddToFavorites: () => void;
    handleClickDeleteFromFavorites: () => void;
}) {
    const showAddToFavorite = getIfUserHasLikedThisProduct(item, user);

    const dispatch = useDispatch();

    const handleOpenModalClick = () => {
        dispatch(ac.openActionCreatorModal());
    };
    return (
        <>
            {' '}
            {showAddToFavorite && user?.info.firebaseId && (
                <button
                    className="favorite"
                    onClick={handleClickDeleteFromFavorites}
                >
                    Eliminar de Favoritos
                </button>
            )}
            {!showAddToFavorite && user?.info.firebaseId && (
                <button
                    className="favorite"
                    onClick={handleClickAddToFavorites}
                >
                    Añadir a Favoritos
                </button>
            )}
            {user?.info.firebaseId === '' && (
                <button onClick={handleOpenModalClick} className="favorite">
                    Añadir a Favoritos
                </button>
            )}
        </>
    );
}
