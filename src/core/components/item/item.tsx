import React, { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { ProductStructure } from '../../models/product';

export default function Item({ item }: { item: ProductStructure }) {
    const { handleDeleteProduct } = useContext(AppContext);
    return (
        <div>
            <h2>{item.title}</h2>

            <p>{item.description}</p>
            <img src={item.imgUrl} alt={item.title} />
            <p>Precio : {item.price}</p>
            <button onClick={() => handleDeleteProduct(item.localId)}>
                Eliminar
            </button>
            <button>Añadir a Favoritos</button>
        </div>
    );
}
