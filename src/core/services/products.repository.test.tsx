import { productMocks } from '../mocks/product.mocks';
import { ProductsRepository } from './products.repository';

describe('Given ProductsRepo', () => {
    const mockProducts = productMocks.map((product, index) => ({
        ...product,
        localId: index.toString(),
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
        describe('When we use delete method', () => {
            test(`Then if the ID are VALID, we received the localId 
            of the task delete in the repo`, async () => {
                const id = mockProducts[0].localId;
                global.fetch = jest.fn().mockResolvedValue({
                    ok: true,
                    json: jest.fn().mockResolvedValue(id),
                });
                const data = await repo.delete(id);
                expect(global.fetch).toHaveBeenCalled();
                expect(data).toBe(id);
            });
            test(`Then if there are NOT ID, we received a null`, async () => {
                await expect(async () => {
                    await repo.delete('');
                }).rejects.toThrowError();
                expect(global.fetch).not.toHaveBeenCalled();
            });
            test(`Then if the ID are NOT VALID, we received a null`, async () => {
                global.fetch = jest.fn().mockResolvedValue({
                    ok: false,
                });
                await expect(async () => {
                    await repo.delete('bad');
                }).rejects.toThrowError();
                expect(global.fetch).toHaveBeenCalled();
            });
        });
    });
});
