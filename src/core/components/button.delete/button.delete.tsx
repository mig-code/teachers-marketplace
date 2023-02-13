import { ProductStructure } from '../../types/products.types';
import { UserStructure } from '../../types/user.type';

export function ButtonDelete({
    item,
    user,
    handleClickDelete,
}: {
    item: ProductStructure;
    user: UserStructure;
    handleClickDelete: () => void;
}) {
    return (
        <>
            {user.info.firebaseId === item.productInfo.ownerUid && (
                <button className="delete" onClick={handleClickDelete}>
                    Eliminar
                </button>
            )}
        </>
    );
}
