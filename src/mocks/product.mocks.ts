import { generateProductWithOnlyInfo } from '../core/models/product';
import { ProductStructure } from '../core/types/products.types';

export const productMock1 = generateProductWithOnlyInfo(
    'Product 1',
    'Description 1',
    100,
    'Category 1',
    'img1.jpg',
    'owner1Uid',
    'owner2Name'
);

export const productMock2 = generateProductWithOnlyInfo(
    'Product 2',
    'Description 2',
    200,
    'Category 2',
    'img2.jpg',
    'owner2Uid',
    'owner2Name'
);

export const productMock3 = generateProductWithOnlyInfo(
    'Product 3',
    'Description 3',
    300,
    'Category 3',
    'img3.jpg',
    'owner3Uid',
    'owner3Name'
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

export const productMockWithSameOwner: ProductStructure = {
    productInfo: {
        id: 1,
        title: 'Test product with same owner',
        description: 'Test description with same owner',
        price: 100,
        imgUrl: 'img4.jpg',
        category: 'libros',
        available: true,
        ownerName: 'sameOwner',
        ownerUid: 'sameOwnerUid',
        publishedAt: '2021-01-01',
    },
    firebaseId: '000001',
    isLikedBy: { users: ['sameOwnerUid'] },
};

export const productMockWithEmptyIsLikedBy: ProductStructure = {
    productInfo: {
        id: 1,
        title: 'Test product with empty isLikedBy',
        description: 'Test description with empty isLikedBy',
        price: 100,
        imgUrl: 'img1.jpg',
        category: 'libros',
        available: true,
        ownerName: 'sameOwner',
        ownerUid: 'sameOwnerUid',
        publishedAt: '2021-01-01',
    },
    firebaseId: '000001',
    isLikedBy: { users: [] },
};
