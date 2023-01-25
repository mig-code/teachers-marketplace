import { getProductsData } from '../data/products';
import { ProductStructure } from '../models/product';

export interface Repository<T> {
    load: () => Promise<T[]>;
}
export class ProductsRepository implements Repository<ProductStructure> {
    async load(): Promise<Array<ProductStructure>> {
        console.log('loading from repo async');
        const resp = await getProductsData();
        return resp;
    }
}
