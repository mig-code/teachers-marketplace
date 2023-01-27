import React, { useContext } from 'react';
import { SyntheticEvent, useState } from 'react';
import { AppContext } from '../../../core/context/app.context';
import { Product, ProductStructure } from '../../../core/models/product';

export function AddProductForm() {
    const { handleCreateProduct } = useContext(AppContext);

    const initialProductDetails: Partial<ProductStructure> = {
        title: '',
        description: '',
        price: '' as unknown as number,
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

        handleCreateProduct(
            new Product(
                productFormData.title as string,
                productFormData.description as string,
                productFormData.price as number,
                'user1',
                ' https://firebasestorage.googleapis.com/v0/b/isdi-clase.appspot.com/o/images%2Fpelota_fantasia.jpg?alt=media&token=3d08b069-90ad-4bd0-93df-6dd7a9291b25'
            )
        );

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
