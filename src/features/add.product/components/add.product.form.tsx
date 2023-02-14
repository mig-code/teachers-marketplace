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
        try {
            const file = event.target.files?.[0] as File;

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
            <form onSubmit={handleSubmit}>
                <div className="add-form__product-title">
                    <label htmlFor="title">Titulo del producto</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Elige un titulo para tu producto"
                        value={productFormData.title}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div className="add-form__upload-image">
                    <label htmlFor="uploadImage"> Subir Imagen</label>

                    <br />
                    <input
                        className="add-form__upload-image-input"
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

                <div className="add-form__product-description">
                    <textarea
                        name="description"
                        id="description"
                        value={productFormData.description}
                        onInput={handleInput}
                        placeholder="Describe en unas líneas el producto que quieres vender."
                        required
                    ></textarea>
                </div>
                <div className="add-form__product-price">
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
                <div className="add-form__product-category">
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
                        <option value="Otros">Otros</option>
                    </select>
                </div>

                <div>
                    <button className="add-form__submit-button" type="submit">
                        Añadir
                    </button>
                </div>
            </form>
        </div>
    );
}
const handleError = (error: Error) => {
    consoleDebug(error.message);
};
