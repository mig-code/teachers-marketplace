import { saveImageInStorage, getUrlsFromStorage } from './storage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase/config';

jest.mock('firebase/storage');

describe('Given "saveImageInStorage"', () => {
    test('Then "saveImageInStorage" should be return a Upload task', async () => {
        const file = new File([''], 'testImage.png', {
            type: 'image/png',
        });
        const storageRef = ref(storage, 'images/1');
        const uploadTask = await uploadBytesResumable(storageRef, file);
        const result = await saveImageInStorage(file, 'test-url', 'images');
        expect(result).toEqual(uploadTask);
       
    });
});

describe('Given "getUrlsFromStorage"', () => {
    test('Then "getUrlsFromStorage" should be return a url', async () => {
        const storageRef = ref(storage, 'images/');
        const downloadUrl = await getDownloadURL(storageRef);
        const result = await getUrlsFromStorage('images', '2');
        expect(result).toEqual(downloadUrl);
    });
});
