import { ProductStructure } from '../models/product';

export interface Repository<T> {
    load: () => Promise<T[]>;
}
export class ProductsRepository implements Repository<ProductStructure> {
    constructor(
        private url = 'https://teachers-marketplace-default-rtdb.firebaseio.com//productos.json'
    ) {}

    async load(): Promise<Array<ProductStructure>> {
        console.log('loading from repo in firebase');
        const resp = await fetch(this.url);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);

        const result = await resp.json();
        return Object.keys(result).map((key) => ({
            ...result[key],
            localId: key,
        }));
    }
}
