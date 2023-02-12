import { getIfUserHasLikedThisProduct } from '../../../helpers/getIfUserHasLikedThisProduct';
import { ProductStructure } from '../../types/products.types';
import { UserStructure } from '../../types/user.type';

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
        </>
    );
}
