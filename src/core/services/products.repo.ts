import { ProductStructure } from '../models/product';

const invalidIdError = new Error('Invalid ID');
const urlId = '';
interface Repository<T> {
    load: () => Promise<T[]>;
    delete: (id: string) => Promise<string>;
}
export class ProductsRepository implements Repository<ProductStructure> {
    constructor(
        private url = 'https://teachers-marketplace-default-rtdb.firebaseio.com/productos/' +
            urlId +
            '.json'
    ) {}

    async load(): Promise<Array<ProductStructure>> {
        this.url =
            'https://teachers-marketplace-default-rtdb.firebaseio.com/productos.json';
        const resp = await fetch(this.url);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);

        const result = await resp.json();
        if (!result) return [];
        return Object.keys(result).map((key) => ({
            ...result[key],
            localId: key,
        }));
    }
    async delete(id: ProductStructure['localId']): Promise<ProductStructure['localId']> {
        console.log('delete', id)
        if (!id) return Promise.reject(invalidIdError);
        this.url =
            'https://teachers-marketplace-default-rtdb.firebaseio.com/productos/' +
            id +
            '.json';
        const resp = await fetch(this.url, {
            method: 'DELETE',
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return id;
    }
}
