import { generateProductWithOnlyInfo } from '../models/product';

import { ProductsRepository } from '../services/products.repository';

export const productMock1 = generateProductWithOnlyInfo(
    'Test product 1',
    'Test description 1',
    100,
    'img1.jpg',
    'coches',
    'userUid1',
    'ownerName1',
    'token1'
);

productMock1.firebaseId = '000001';
export const productMock2 = generateProductWithOnlyInfo(
    'Test product 2',
    'Test description 2',
    200,
    'img2.jpg',
    'libros',
    'userUid2',
    'ownerName2',
    'token2'
);

productMock2.firebaseId = '000002';
export const productsMock = [productMock1, productMock2];

export const productMockAdd = generateProductWithOnlyInfo(
    'Test product 3',
    'Test description 3',
    300,
    'img3.jpg',
    'libros',
    'userUid3',
    'ownerName3',
    'token3'
);

export const productMockUpdate = { ...productMock2, title: 'Updated product' };

export const mockValidRepoResponse = () => {
    (ProductsRepository.prototype.load as jest.Mock).mockResolvedValue(
        productsMock
    );
    (ProductsRepository.prototype.create as jest.Mock).mockResolvedValue(
        productMockAdd
    );
    (ProductsRepository.prototype.update as jest.Mock).mockResolvedValue(
        productMockUpdate
    );
    (ProductsRepository.prototype.delete as jest.Mock).mockResolvedValue(
        productMock1.firebaseId
    );
};

const error = new Error('Testing errors');
export const mockNoValidRepoResponse = () => {
    (ProductsRepository.prototype.load as jest.Mock).mockRejectedValue(error);
    (ProductsRepository.prototype.create as jest.Mock).mockRejectedValue(error);
    (ProductsRepository.prototype.update as jest.Mock).mockRejectedValue(error);
    (ProductsRepository.prototype.delete as jest.Mock).mockRejectedValue(error);
};
