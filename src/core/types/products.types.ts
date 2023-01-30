export type ProductInfoStructure = {
    id: number;
    title: string;
    description: string;
    owner: string;
    imgUrl: string;
    available: boolean;
    price: number;
    category: string;
    publishedAt: Date;
};
export type ProductLikedStructure = {
    users: Array<string>;
};
export type ProductStructure = {
    productInfo: ProductInfoStructure;
    isLikedBy: ProductLikedStructure;

    firebaseId: string;
};
