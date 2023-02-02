import React, { useContext, SyntheticEvent, useState } from 'react';

import { AppContext } from '../../../core/context/app.context';
import { generateProductWithOnlyInfo } from '../../../core/models/product';
import { AddProductFormStructure } from '../../../core/types/form.types';

import {
    getUrlsFromStorage,
    saveImageInStorage,
} from '../../../core/services/storage';

export function AddProductForm() {
    const { handleCreateProduct, user } = useContext(AppContext);

    const initialProductDetails: AddProductFormStructure = {
        title: '',
        description: '',
        price: 0,
        category: '',
        imgUrl: '',
    };

    const [productFormData, setProductFormData] = useState(
        initialProductDetails
    );

    const [uploadedImagerUrl, setuploadedImagerUrl] = useState('');

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setProductFormData({
            ...productFormData,
            [element.name]: element.value,
        });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const newProduct = generateProductWithOnlyInfo(
            productFormData.title as string,
            productFormData.description as string,
            productFormData.price as number,
            productFormData.category as string,
            productFormData.imgUrl as string,

            user?.info.firebaseId as string,
            user?.info.name as string,
            user?.token as string
        );

        handleCreateProduct(newProduct);

        setProductFormData(initialProductDetails);
        setuploadedImagerUrl('');
        console.log(productFormData);
    };

    const handleUploadImage = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        let file: File | null = null;
        try {
            if (!event.target.files) return;
            file = event.target.files[0];
            await saveImageInStorage(file, 'test/', file.name);
            const url = getUrlsFromStorage('test/', file.name);

            url.then((url) => {
                setuploadedImagerUrl(url);
                setProductFormData({
                    ...productFormData,
                    imgUrl: url as string,
                });
            });
        } catch (error) {
            console.log(error);
        }
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
                    <label htmlFor="uploadImage"> Subir Imagen</label>

                    <br />
                    <input
                        id="uploadImage"
                        name="uploadImage"
                        type="file"
                        onChange={handleUploadImage}
                        required
                    />

                    <br />
                    {uploadedImagerUrl && (
                        <img src={uploadedImagerUrl} alt="user" />
                    )}
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
                        min={0}
                        value={productFormData.price}
                        onInput={handleInput}
                        placeholder="Precio"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category">Categoría</label>
                    <select
                        name="category"
                        id="category"
                        value={productFormData.category}
                        onInput={handleInput}
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        <option value="Juguetes">Juguetes</option>
                        <option value="Libros">Libros</option>
                        <option value="material escolar">
                            Material Escolar
                        </option>
                    </select>
                </div>

                <div>
                    <button type="submit">Añadir</button>
                </div>
            </form>
        </section>
    );
}
