import { generateProductWithOnlyInfo } from '../models/product';
import { ProductStructure } from '../types/products.types';

export const productMock1 = generateProductWithOnlyInfo(
    'Product 1',
    'Description 1',
    100,
    'Category 1',
    'Owner 1',
    'default/img.jpg'
);

export const productMock2 = generateProductWithOnlyInfo(
    'Product 2',
    'Description 2',
    200,
    'Category 2',
    'Owner 2',
    'default/img.jpg'
);

export const productMock3 = generateProductWithOnlyInfo(
    'Product 3',
    'Description 3',
    300,
    'Category 3',
    'Owner 3',
    'default/img.jpg'
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
