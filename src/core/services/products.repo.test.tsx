import { productMocks } from '../mocks/product.mocks';
import { ProductsRepository } from './products.repo';

describe('Given ProductsRepo', () => {
    const mockProducts = productMocks.map((product,index) => ({
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
    });
});
