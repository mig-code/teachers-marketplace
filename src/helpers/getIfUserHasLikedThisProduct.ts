import { ProductStructure } from "../core/types/products.types";
import { UserStructure } from "../core/types/user.type";

 export const getIfUserHasLikedThisProduct = (item:ProductStructure,user:UserStructure) => {
        if (item.isLikedBy) {
            return item.isLikedBy.users.includes(user.info.firebaseId);
        }
        return false;
    };
