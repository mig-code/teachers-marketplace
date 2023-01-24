import { Product, ProductStructure } from "../models/product";

export const productMock1: ProductStructure = new Product(
    "Product 1",
    "Description 1",
    100,
    "Owner 1"
);

export const productMock2: ProductStructure = new Product(
    "Product 2",
    "Description 2",
    200,
    "Owner 2"
);

export const productMock3: ProductStructure = new Product(
    "Product 3",
    "Description 3",
    300,
    "Owner 3"
);

export const productMocks: Array<ProductStructure> = [
    productMock1,
    productMock2,
    productMock3,
];

    

