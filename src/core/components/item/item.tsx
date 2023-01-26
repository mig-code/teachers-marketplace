import React, { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { ProductStructure } from '../../models/product';

export default function Item({ item }: { item: ProductStructure }) {
    const { handleDeleteProduct, handleUpdateProduct } = useContext(AppContext);

    function handleAddToFavorites() {
        console.log('Añadir a favoritos');
        const newProduct = {
            ...item,
            isFavoritedBy: [...item.isFavoritedBy, 'user1'],
        };
        handleUpdateProduct(newProduct);
    }
    return (
        <div>
            <h2>{item.title}</h2>

            <p>{item.description}</p>
            <img src={item.imgUrl} alt={item.title} />
            <p>Precio : {item.price}</p>
            <p>Favorite by : {item.isFavoritedBy.map((user) => user + ' ')}</p>
            <button onClick={() => handleDeleteProduct(item.localId)}>
                Eliminar
            </button>
            <button onClick={handleAddToFavorites}>Añadir a Favoritos</button>
        </div>
    );
}
