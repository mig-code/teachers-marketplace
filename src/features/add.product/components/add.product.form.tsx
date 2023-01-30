import React, {
    useContext,
    SyntheticEvent,
    useState,
    InputHTMLAttributes,
} from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { AppContext } from '../../../core/context/app.context';
import { generateProductWithOnlyInfo } from '../../../core/models/product';
import { AddProductFormStructure } from '../../../core/types/form.types';
import { storage } from '../../../core/firebase/config';

export function AddProductForm() {
    const { handleCreateProduct } = useContext(AppContext);

    const initialProductDetails: Partial<AddProductFormStructure> = {
        title: '',
        description: '',
        price: 0,
        imgUrl: '',
    };

    const [productFormData, setProductFormData] = useState(
        initialProductDetails
    );
    const [uploadValue, setUploadValue] = useState(0);
    const [uploadedImagerUrl, setuploadedImagerUrl] = useState('');
    const urlStoragePath = 'gs://teachers-marketplace.appspot.com/test/';

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
            'libros',
            'miguel',
            productFormData.imgUrl as string
        );

        handleCreateProduct(newProduct);

        setProductFormData(initialProductDetails);
        console.log(productFormData);
    };
    const handleonUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        const storageRef = ref(storage, 'test/' + file.name);
        const upload = uploadBytesResumable(storageRef, file);
        upload.on('state_changed', (snapshot) => {
            const percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadValue(percentage);
        });
        upload.then((snapshot) => {
            console.log(snapshot);

            const url = getDownloadURL(
                ref(storage, urlStoragePath + file.name)
            );
            url.then((url) => {
                setuploadedImagerUrl(url);
                setProductFormData({
                    ...productFormData,
                    imgUrl: url,
                });
                console.log(url);
            });
        });
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
                        min={0}
                        value={productFormData.price}
                        onInput={handleInput}
                        placeholder="Precio"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="uploadImage"> Subir Imagen</label>
                    <progress value={uploadValue} max="100"></progress>
                    <br />
                    <input
                        id="uploadImage"
                        name="uploadImage"
                        type="file"
                        onChange={handleonUpload}
                    />

                    <br />
                    {uploadedImagerUrl && (
                        <img src={uploadedImagerUrl} alt="user" />
                    )}
                </div>

                <div>
                    <button type="submit">Añadir</button>
                </div>
            </form>
        </section>
    );
}
