import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../firebase/config';

export type UseUploadFile = {
    uploadProgressValue: number;
    uploadedImagerUrl: string;
    handleUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function useUploadFile() {
    const urlStoragePath = process.env.REACT_APP_DB_STORAGE_URL;
    const [uploadProgressValue, setUploadValue] = useState(0);
    const [uploadedImagerUrl, setuploadedImagerUrl] = useState('');

    const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                // setProductFormData({
                //     ...productFormData,
                //     imgUrl: url,
                // });
                console.log(url);
            });
        });
    };

    return {
        uploadProgressValue,
        uploadedImagerUrl,
        handleUploadFile,
    } as UseUploadFile;
}
