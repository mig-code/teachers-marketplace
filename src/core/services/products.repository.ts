import { DeepPartial, ProductStructure } from '../types/products.types';

const invalidIdError = new Error('Invalid ID');
const urlId = '';

interface Repository<T> {
    load: () => Promise<T[]>;
    delete: (id: string, token: string) => Promise<string>;
    update: (payload: DeepPartial<T>, token: string) => Promise<T>;
    create: (payload: Partial<T>, token: string) => Promise<string>;
    queryById: (id: string) => Promise<T>;
}
export class ProductsRepository implements Repository<ProductStructure> {
    constructor(
        private url = 'https://teachers-marketplace-default-rtdb.firebaseio.com/products/' +
            urlId +
            '.json'
    ) {}

    async load(): Promise<Array<ProductStructure>> {
        this.url =
            'https://teachers-marketplace-default-rtdb.firebaseio.com/products.json';
        const resp = await fetch(this.url);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);

        const result = await resp.json();

        return Object.keys(result).map((key) => ({
            ...result[key],
            firebaseId: key,
        }));
    }
    async delete(
        id: ProductStructure['firebaseId'],
        token: string
    ): Promise<ProductStructure['firebaseId']> {
        if (!id) return Promise.reject(invalidIdError);
        this.url =
            'https://teachers-marketplace-default-rtdb.firebaseio.com/products/' +
            id +
            '.json?auth=' +
            token;
        const resp = await fetch(this.url, {
            method: 'DELETE',
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return id;
    }
    async update(
        payload: DeepPartial<ProductStructure>,
        token: string
    ): Promise<ProductStructure> {
        if (!payload.firebaseId) {
            return Promise.reject(invalidIdError);
        }

        this.url =
            'https://teachers-marketplace-default-rtdb.firebaseio.com/products/' +
            payload.firebaseId +
            '.json?auth=' +
            token;
        const resp = await fetch(this.url, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async create(
        payload: Partial<ProductStructure>,
        token: string
    ): Promise<ProductStructure['firebaseId']> {
        this.url =
            'https://teachers-marketplace-default-rtdb.firebaseio.com/products.json?auth=' +
            token;
        const resp = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async queryById(
        id: ProductStructure['firebaseId']
    ): Promise<ProductStructure> {
        if (!id) return Promise.reject(invalidIdError);
        this.url =
            'https://teachers-marketplace-default-rtdb.firebaseio.com/products/' +
            id +
            '.json';
        const resp = await fetch(this.url);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        const result = await resp.json();

        return {
            ...result,
            firebaseId: id,
        };
    }
}
