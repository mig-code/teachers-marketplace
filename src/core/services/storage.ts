import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase/config';

export function saveImageInStorage(
    file: File,
    storagePath: string,
    fileName: string
) {
    const storageRef = ref(storage, storagePath + fileName);
    const upload = uploadBytesResumable(storageRef, file);
    return upload;
}

export function getUrlsFromStorage(storagePath: string, fileName: string) {
    const storageRef = ref(storage, storagePath + fileName);
    return getDownloadURL(storageRef);
}
