import React, { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { ProductStructure } from '../../models/product';

export default function Item({ item }: { item: ProductStructure }) {
    
    const { handleDeleteProduct } = useContext(AppContext);
    return (
        <div>
            <img src={item.imgUrl} alt={item.title} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Precio : {item.price}</p>
            <button onClick={() => handleDeleteProduct(item.id)}>Eliminar</button>
            <button>Añadir a Favoritos</button>
        </div>
    );
}
