export type ProductInfoStructure = {
    productInfo: {
        id: number;
        title: string;
        description: string;
        owner: string;
        imgUrl: string;
        available: boolean;
        price: number;
        publishedAt: Date;
    };
};
export type ProductLikedStructure = {
    isLikedBy: {
        users: Array<string>;
    };
};
export type ProductStructure = ProductInfoStructure &
    ProductLikedStructure & {
        firebaseId: string;
    };
