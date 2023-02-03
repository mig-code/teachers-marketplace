import { saveImageInStorage, getUrlsFromStorage } from './storage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import * as debug from '../../tools/debug';

jest.mock('firebase/storage');
jest.mock('../../tools/debug');

let spyConsole: jest.SpyInstance;

const mockFile = new File([''], 'testimage2.png', {
    type: 'image/png',
});
const mockStoragePath = 'images';
const mockFileName = '2';

describe('Given saveImageInStorage function', () => {
    describe('Given "saveImageInStorage with valid ID"', () => {
        beforeEach(() => {
            (uploadBytesResumable as jest.Mock).mockResolvedValue(
                mockStoragePath
            );
            ref as jest.Mock;
        });

        test('Then "saveImageInStorage" should return a Upload task', async () => {
            const result = await saveImageInStorage(
                mockFile,
                mockStoragePath,
                mockFileName
            );
            expect(ref).toHaveBeenCalled();
            expect(uploadBytesResumable).toHaveBeenCalled();

            await expect(result).toEqual(mockStoragePath);
        });
    });
    describe('Given "saveImageInStorage with NOT  ID"', () => {
        beforeEach(() => {
            (uploadBytesResumable as jest.Mock).mockRejectedValue('error');
            ref as jest.Mock;
            spyConsole = jest.spyOn(debug, 'consoleDebug');
        });
        test('Then "saveImageInStorage" if its NOT VALID should be return a Upload task', async () => {
            await saveImageInStorage(mockFile, mockStoragePath, mockFileName);

            await expect(spyConsole).toHaveBeenCalled();
        });
    });
});

describe('Given getUrlsFromStorage function', () => {
    describe('Given valid ref', () => {
        beforeEach(() => {
            (getDownloadURL as jest.Mock).mockResolvedValue('url');
            ref as jest.Mock;
        });

        test('Then "getUrlsFromStorage" should return a url', async () => {
            const result = await getUrlsFromStorage(
                mockStoragePath,
                mockFileName
            );
            expect(ref).toHaveBeenCalled();
            expect(getDownloadURL).toHaveBeenCalled();

            await expect(result).toEqual('url');
        });
    });
    describe('Given a not valid ref', () => {
        beforeEach(() => {
            (ref as jest.Mock).mockRejectedValue('error');
            spyConsole = jest.spyOn(debug, 'consoleDebug');
        });
        test('Then "getUrlsFromStorage" should throw error when rejected', async () => {
            await getUrlsFromStorage(mockStoragePath, mockFileName);

            await expect(spyConsole).toHaveBeenCalled();
        });
    });
});
