import { Product, ProductStructure } from '../models/product';

export const productTemporalData: Array<ProductStructure> = [
    new Product('Product 1', 'Description 1', 100, 'Owner 1'),
    new Product('Product 2', 'Description 2', 200, 'Owner 2'),
    new Product('Product 3', 'Description 3', 300, 'Owner 3'),
    new Product('Product 4', 'Description 4', 400, 'Owner 4'),
];

export function getProductsData(): Array<ProductStructure> {
    return productTemporalData;
}
