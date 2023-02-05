import { ProductsRepository } from '../services/products.repository';
import { ProductStructure } from '../types/products.types';

export const productMock1: ProductStructure = {
    productInfo: {
        id: 1,
        title: 'Test product 1',
        description: 'Test description 1',
        price: 100,
        imgUrl: 'img1.jpg',
        category: 'libros',
        available: true,
        ownerName: 'ownerName1',
        ownerUid: 'userUid1',
        publishedAt: '2021-01-01',
    },
    firebaseId: '000001',
};
productMock1.productInfo.id = 1;
productMock1.firebaseId = '000001';
export const productMock2: ProductStructure = {
    productInfo: {
        id: 2,
        title: 'Test product 2',
        description: 'Test description 2',
        price: 200,
        imgUrl: 'img2.jpg',
        category: 'libros',
        available: true,
        ownerName: 'ownerName2',
        ownerUid: 'userUid2',
        publishedAt: '2021-01-01',
    },
    firebaseId: '000002',
};
productMock1.productInfo.id = 2;
productMock2.firebaseId = '000002';
export const productsMock: Array<ProductStructure> = [
    productMock1,
    productMock2,
];

export const productMockAdd: ProductStructure = {
    productInfo: {
        id: 3,
        title: 'Test product 3',
        description: 'Test description 3',
        price: 300,
        imgUrl: 'img3.jpg',
        category: 'libros',
        available: true,
        ownerName: 'ownerName3',
        ownerUid: 'userUid3',
        publishedAt: '2021-01-01',
    },
    firebaseId: '000003',
};

export const productMockUpdate = { ...productMock2, title: 'Updated product' };

export const mockValidRepoResponse = () => {
    (ProductsRepository.prototype.load as jest.Mock).mockResolvedValue([
        productsMock,
    ]);
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
