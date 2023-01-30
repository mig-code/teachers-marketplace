import React, { useContext, SyntheticEvent, useState } from 'react';

import { AppContext } from '../../../core/context/app.context';
import { generateProduct } from '../../../core/models/product';
import { AddProductFormStructure } from '../../../core/types/form.types';

export function AddProductForm() {
    const { handleCreateProduct } = useContext(AppContext);

    const initialProductDetails: Partial<AddProductFormStructure> = {
        title: '',
        description: '',
        price: 0,
    };

    const [productFormData, setProductFormData] = useState(
        initialProductDetails
    );

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setProductFormData({
            ...productFormData,
            [element.name]: element.value,
        });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const newProduct = generateProduct(
            productFormData.title as string,
            productFormData.description as string,
            productFormData.price as number,

            'libros',
            'miguel'
        );

        handleCreateProduct(newProduct);

        setProductFormData(initialProductDetails);
        console.log(productFormData);
    };
    return (
        <section>
            <h3>Añadir Producto</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titulo del producto</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Titulo del producto"
                        value={productFormData.title}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">
                        Descripción del producto
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={productFormData.description}
                        onInput={handleInput}
                        placeholder="Descripcion del producto"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="price">Precio</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={productFormData.price}
                        onInput={handleInput}
                        placeholder="Precio"
                        required
                    />
                </div>

                <div>
                    <button type="submit">Añadir</button>
                </div>
            </form>
        </section>
    );
}
