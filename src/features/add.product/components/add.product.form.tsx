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
import { useNavigate } from 'react-router-dom';

export function AddProductForm() {
    const navigate = useNavigate();
    const { handleCreateProduct, handleLoadProducts } = useProducts();
    const user = useSelector((state: RootState) => state.user);

    const initialFormProductDetails: AddProductFormStructure = {
        title: '',
        description: '',
        price: '' as unknown as number,
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

    const handleSubmit = async (ev: SyntheticEvent) => {
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
        await handleLoadProducts();

        navigate('/');
    };

    const handleUploadImage = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            const file = event.target.files?.[0] as File;

            await saveImageInStorage(file, 'test/', file.name);
            const url = await getUrlsFromStorage('test/', file.name);

            await dispatcher(
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
                <h3 className="add-form__title">
                    ¡Rellena los campos y sube tu producto!
                </h3>
                <div className="add-form__product-title">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Título para tu producto"
                        value={productFormData.title}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div className="add-form__upload-image">
                    <label
                        className="add-form__upload-image-input"
                        htmlFor="uploadImage"
                    >
                        Haz click para subir una imagen
                    </label>

                    <input
                        className="add-form__upload-image-input"
                        id="uploadImage"
                        name="uploadImage"
                        type="file"
                        onChange={handleUploadImage}
                        placeholder="Subir Imagen"
                        accept="image/*"
                        required
                    />

                    <div className="add-form__upload-image-image">
                        {uploadedImagerUrl && (
                            <img
                                className="add-form__image"
                                src={uploadedImagerUrl}
                                alt="user"
                            />
                        )}
                    </div>
                </div>

                <div className="add-form__product-description">
                    <textarea
                        name="description"
                        id="description"
                        value={productFormData.description}
                        onInput={handleInput}
                        placeholder="Describe en unas líneas el producto que quieres vender"
                        required
                    ></textarea>
                </div>
                <div className="add-form__product-price">
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
                        placeholder="Categoría"
                        required
                    >
                        <option value="">Categoría</option>
                        <option value="Juguetes">Juguetes</option>
                        <option value="Libros">Libros</option>
                        <option value="material escolar">
                            Material Escolar
                        </option>
                        <option value="Otros">Otros</option>
                    </select>
                </div>

                <div>
                    <button
                        className="add-form__submit-button"
                        type="submit"
                        disabled={
                            productFormData.title === '' ||
                            productFormData.description === '' ||
                            productFormData.price ===
                                ('' as unknown as number) ||
                            productFormData.category === '' ||
                            productFormData.imgUrl === ''
                        }
                    >
                        Publicar
                    </button>
                </div>
            </form>
        </div>
    );
}
const handleError = (error: Error) => {
    consoleDebug(error.message);
};
