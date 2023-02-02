import { generateProductWithOnlyInfo } from '../core/models/product';
import { ProductStructure } from '../core/types/products.types';

export const productMock1 = generateProductWithOnlyInfo(
    'Product 1',
    'Description 1',
    100,
    'Category 1',
    'img1.jpg',
    'owner1Uid',
    'owner2Name',
    'token'
);

export const productMock2 = generateProductWithOnlyInfo(
    'Product 2',
    'Description 2',
    200,
    'Category 2',
    'img2.jpg',
    'owner2Uid',
    'owner2Name',
    'token'
);

export const productMock3 = generateProductWithOnlyInfo(
    'Product 3',
    'Description 3',
    300,
    'Category 3',
    'img3.jpg',
    'owner3Uid',
    'owner3Name',
    'token'
);

export const productsMockWithFirebaseId: Array<ProductStructure> = [
    {
        ...productMock1,
        firebaseId: '1',
    },
    {
        ...productMock2,
        firebaseId: '2',
    },
    {
        ...productMock3,
        firebaseId: '3',
    },
];
