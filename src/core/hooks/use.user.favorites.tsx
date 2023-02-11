import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ProductStructure } from '../types/products.types';
import { useProducts } from './use.products';

export function useUserFavorites(item: ProductStructure) {
    const user = useSelector((state: RootState) => state.user);

    const { handleUpdateProduct } = useProducts();

    const handleAddToFavorites = useCallback(async () => {
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

        await handleUpdateProduct(AddUserLike);
    }, [handleUpdateProduct, item, user.info.firebaseId]);

    const handleRemoveFromFavorites = useCallback(async () => {
        if (!item.isLikedBy) return;
        const index = item.isLikedBy.users.indexOf(user.info.firebaseId);

        let retunedArray: string[] = [];
        if (item.isLikedBy.users.length === 1) {
            retunedArray = [];
        } else {
            retunedArray = item.isLikedBy.users.filter(
                (item, i) => i !== index
            );
        }

        const RemoveUserLike: Partial<ProductStructure> = {
            ...item,
            isLikedBy: {
                users: retunedArray,
            },
        };

        await handleUpdateProduct(RemoveUserLike);
    }, [handleUpdateProduct, item, user.info.firebaseId]);

    return {
        handleAddToFavorites,
        handleRemoveFromFavorites,
    };
}
