import React from 'react';
import { ProductStructure } from '../../models/product';

export default function Item({ item }: { item: ProductStructure }) {
    return (
        <div>
            <img src={item.imgUrl} alt={item.title} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Precio : {item.price}</p>
        </div>
    );
}
