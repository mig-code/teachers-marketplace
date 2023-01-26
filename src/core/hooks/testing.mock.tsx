import { Product } from '../models/product';
import { ProductsRepository } from '../services/products.repository';

export const productMock1 = new Product(
    'Test product 1',
    'Test description 2',
    100,
    'user',
    'assets/img/pelota_fantasia.jpg'
);
productMock1.id = '000001';
export const productMock2 = new Product(
    'Test product 2',
    'Test description 2',
    200,
    'user',
    'assets/img/pelota_fantasia.jpg'
);
productMock2.id = '000002';
export const productsMock = [productMock1, productMock2];
export const productMockAdd = new Product(
    'Added product',
    'Added description',
    300,
    'user',
    'assets/img/pelota_fantasia.jpg'
);
productMockAdd.id = '000003';
export const productMockUpdate = { ...productMock2, title: 'Updated product' };

export const mockValidRepoResponse = () => {
    (ProductsRepository.prototype.load as jest.Mock).mockResolvedValue(
        productsMock
    );
    // (ProductsRepository.prototype.create as jest.Mock).mockResolvedValue(
    //     productMockAdd
    // );
    // (ProductsRepository.prototype.update as jest.Mock).mockResolvedValue(
    //     productMockUpdate
    // );
    (ProductsRepository.prototype.delete as jest.Mock).mockResolvedValue(
        productMock1.id
    );
};

const error = new Error('Testing errors');
export const mockNoValidRepoResponse = () => {
    (ProductsRepository.prototype.load as jest.Mock).mockRejectedValue(error);
    // (ProductsRepository.prototype.create as jest.Mock).mockRejectedValue(error);
    // (ProductsRepository.prototype.update as jest.Mock).mockRejectedValue(error);
    (ProductsRepository.prototype.delete as jest.Mock).mockRejectedValue(error);
};
