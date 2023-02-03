import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase/config';
import { consoleDebug } from '../../tools/debug';

export async function saveImageInStorage(
    file: File,
    storagePath: string,
    fileName: string
) {
    try {
        const storageRef = await ref(storage, storagePath + fileName);
        console.log(storageRef);
        const upload = await uploadBytesResumable(storageRef, file);
        console.log(upload);
        return upload;
    } catch (error) {
        handleError(error as Error);
    }
}

export async function getUrlsFromStorage(
    storagePath: string,
    fileName: string
) {
    try {
        const storageRef = await ref(storage, storagePath + fileName);
        return getDownloadURL(storageRef);
    } catch (error) {
        handleError(error as Error);
    }
}
const handleError = (error: Error) => {
    consoleDebug(error.message);
};
