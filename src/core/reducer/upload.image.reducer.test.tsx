import { actionTypesUploadImage } from './action.types';
import { uploadImageReducer } from './upload.image.reducer';

describe('Given the function uploadImageReducer', () => {
    let action: { type: string; payload: string };
    let state: { uploadImage: string };
    const mockResource = 'test';
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('When the action is setUploadImageUrl', () => {
        beforeEach(() => {
            action = {
                type: actionTypesUploadImage.setUploadImageUrl,
                payload: mockResource,
            };
            state = {
                uploadImage: '',
            };
        });
        test('Then the returned state should be the action payload', () => {
            const result = uploadImageReducer(state.uploadImage, action);
            expect(result).toEqual(action.payload);
        });
    });

    describe('When the action is defaultCase', () => {
        beforeEach(() => {
            action = {
                type: 'defaultCase',
                payload: '',
            };
            state = {
                uploadImage: '',
            };
        });
        test('Then the returned state should be the current state', () => {
            const result = uploadImageReducer(state.uploadImage, action);
            expect(result).toEqual('');
        });
    });
});
