/* eslint-disable testing-library/no-await-sync-query */
import { productsMockWithFirebaseId } from '../../mocks/product.mocks';
import { generateProductWithOnlyInfo } from '../models/product';
import { DeepPartial, ProductStructure } from '../types/products.types';

import { ProductsRepository } from './products.repository';

describe('Given ProductsRepo', () => {
    const mockProducts = productsMockWithFirebaseId.map((product, index) => ({
        ...product,
        firebaseId: index.toString(),
    }));
    const repo = new ProductsRepository();

    beforeEach(() => {
        // mocks de fetch
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockProducts),
        });
    });

    test('Then we can instantiate it', () => {
        expect(repo).toBeInstanceOf(ProductsRepository);
    });

    describe('When we use load method', () => {
        test('Then we received the products contents in the repo', async () => {
            const data = await repo.load();
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toEqual(mockProducts);
        });
        test('Then if there are NO DATA, we received a rejected promise', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.load();
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
    describe('When we use delete method', () => {
        test(`Then if the ID are VALID, we received the firebaseId 
            of the product deleted in the repo`, async () => {
            const id = mockProducts[0].firebaseId;
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(id),
            });
            const data = await repo.delete(id, 'token');
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toBe(id);
        });
        test(`Then if there are NOT ID, we received a null`, async () => {
            await expect(async () => {
                await repo.delete('', 'token');
            }).rejects.toThrowError();
            expect(global.fetch).not.toHaveBeenCalled();
        });
        test(`Then if the ID are NOT VALID, we received a null`, async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.delete('bad', 'token');
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
    describe('When we use update method', () => {
        test(`Then if the ID are VALID, we received the product 
            update in the repo`, async () => {
            const updatePayload: DeepPartial<ProductStructure> = {
                firebaseId: '1',
                productInfo: {
                    title: 'Product Updated',
                },
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(updatePayload),
            });
            const data = await repo.update(updatePayload, 'token');
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toEqual(updatePayload);
        });
        test(`Then if there are NOT ID, we received a null`, async () => {
            await expect(async () => {
                await repo.update({}, 'token');
            }).rejects.toThrowError();
            expect(global.fetch).not.toHaveBeenCalled();
        });
        test(`Then if the ID are NOT VALID, we received a null`, async () => {
            const updatePayload: DeepPartial<ProductStructure> = {
                firebaseId: 'bad',
                productInfo: {
                    title: 'Product Updated',
                },
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.update(updatePayload, 'token');
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
    describe('When we use create method', () => {
        test(`Then if the data are VALID, we received the product 
            created in the repo with its own new id`, async () => {
            const mockNewProductPayload = generateProductWithOnlyInfo(
                'New Product',
                'New Product Description',
                10,
                'category',
                'image.jpg',
                'userUid',
                'userName'
            );

            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockNewProductPayload),
            });

            const data = await repo.create(mockNewProductPayload, 'token');
            expect(data).toHaveProperty(
                'productInfo.title',
                mockNewProductPayload.productInfo.title
            );
            expect(data).toHaveProperty(
                'productInfo.description',
                mockNewProductPayload.productInfo.description
            );
        });
        test(`Then if the data are NOT VALID, we received a rejected promise`, async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });

            await expect(async () => {
                await repo.create({} as ProductStructure, 'token');
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
    describe('When we use querybyId method', () => {
        test(`Then if the ID are VALID, we received the product
            with that ID`, async () => {
            const id = mockProducts[0].firebaseId;
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockProducts[0]),
            });

            const data = await repo.queryById(id);
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toEqual(mockProducts[0]);
        });

        test(`Then if the ID are NOT VALID, we received a null`, async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.queryById('bad');
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
        test(`Then if there are NOT ID, we received a null`, async () => {
            await expect(async () => {
                await repo.queryById('');
            }).rejects.toThrowError();
            expect(global.fetch).not.toHaveBeenCalled();
        });
    });
});
