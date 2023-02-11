import React, { SyntheticEvent, useState } from 'react';

import { generateProductWithOnlyInfo } from '../../../core/models/product';
import { AddProductFormStructure } from '../../../core/types/form.types';

import {
    getUrlsFromStorage,
    saveImageInStorage,
} from '../../../core/services/storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../core/store/store';

import * as ac from '../../../core/reducer/action.creator';
import { consoleDebug } from '../../../tools/debug';
import { useProducts } from '../../../core/hooks/use.products';
import './add.product.form.scss';

export function AddProductForm() {
    const { handleCreateProduct } = useProducts();
    const user = useSelector((state: RootState) => state.user);

    const initialFormProductDetails: AddProductFormStructure = {
        title: '',
        description: '',
        price: 0,
        category: '',
        imgUrl: '',
    };

    const [productFormData, setProductFormData] = useState(
        initialFormProductDetails
    );

    const uploadedImagerUrl = useSelector(
        (state: RootState) => state.uploadImage
    );
    const dispatcher = useDispatch();

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
            productFormData.title,
            productFormData.description,
            productFormData.price,
            productFormData.category,
            productFormData.imgUrl,

            user?.info.firebaseId,
            user?.info.name as string
        );

        handleCreateProduct(newProduct);
        setProductFormData(initialFormProductDetails);
        dispatcher(ac.setUploadImageUrlActionCreatorUploadImage(''));
    };

    const handleUploadImage = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        let file: File | null = null;
        try {
            if (!event.target.files) return;
            file = event.target.files[0];

            await saveImageInStorage(file, 'test/', file.name);
            const url = await getUrlsFromStorage('test/', file.name);

            dispatcher(
                ac.setUploadImageUrlActionCreatorUploadImage(url as string)
            );

            setProductFormData({
                ...productFormData,
                imgUrl: url as string,
            });
        } catch (error) {
            handleError(error as Error);
        }
    };
    return (
        <div className="add-form">
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
                        <img
                            className="add-form__image"
                            src={uploadedImagerUrl}
                            alt="user"
                        />
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
        </div>
    );
}
const handleError = (error: Error) => {
    consoleDebug(error.message);
};
