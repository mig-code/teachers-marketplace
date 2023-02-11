import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ProductStructure } from '../types/products.types';
import { useProducts } from './use.products';

export function useUserFavorites(item: ProductStructure) {
    const user = useSelector((state: RootState) => state.user);
  
    const { handleUpdateProduct } = useProducts();

    const handleAddToFavorites = useCallback(async () => {
        console.log('item', item);
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
        console.log('AddUserLike from Hook', AddUserLike);
        await handleUpdateProduct(AddUserLike);
    }, [handleUpdateProduct, item, user.info.firebaseId]);

    const handleRemoveFromFavorites = useCallback(async () => {
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
        const RemoveUserLike: Partial<ProductStructure> = {
            ...item,
            isLikedBy: {
                users: retunedArray,
            },
        };

        await handleUpdateProduct(RemoveUserLike);
    }, [handleUpdateProduct, item, user.info.firebaseId]);

    //     let AddUserLike: Partial<ProductStructure>;

    //     if (!item.isLikedBy) {
    //         AddUserLike = {
    //             ...item,
    //             isLikedBy: {
    //                 users: [user.info.firebaseId],
    //             },
    //         };
    //     } else {
    //         AddUserLike = {
    //             ...item,
    //             isLikedBy: {
    //                 ...item.isLikedBy,
    //                 users: [...item.isLikedBy.users, user.info.firebaseId],
    //             },
    //         };
    //     }
    //     console.log('AddUserLike from Hook', AddUserLike);
    //     handleUpdateProduct(AddUserLike);
    // }
    // function handleRemoveFromFavorites_() {
    //     console.log('handleClickDeleteFromFavorites');
    //     if (!item.isLikedBy) return;
    //     const index = item.isLikedBy.users.indexOf(
    //         user.info.firebaseId
    //     ) as number;
    //     console.log('index', index);

    //     console.log('item.isLikedBy.users', item.isLikedBy.users);
    //     let retunedArray: string[] = [];
    //     if (item.isLikedBy.users.length === 1) {
    //         retunedArray = [];
    //     } else {
    //         retunedArray = item.isLikedBy.users.filter(
    //             (item, i) => i !== index
    //         ) as string[];
    //     }

    //     console.log('retunedArray', retunedArray);
    //     const deleteUserLike: Partial<ProductStructure> = {
    //         ...item,
    //         isLikedBy: {
    //             ...item.isLikedBy,
    //             users: retunedArray,
    //         },
    //     };
    //     console.log('deleteUserLike', deleteUserLike);

    //     handleUpdateProduct(deleteUserLike);
    // }
    // const getIfProductIsLikedByCurrentUser = () => {
    //     if (item.isLikedBy) {
    //         return item.isLikedBy.users.includes(user.info.firebaseId);
    //     }
    //     return false;
    // };

    return {
        handleAddToFavorites,
        handleRemoveFromFavorites,
    };
}
