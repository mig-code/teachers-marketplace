export type ProductInfoStructure = {
    id: number;
    title: string;
    description: string;
    ownerUid: string;
    ownerName: string;
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
    isLikedBy?: ProductLikedStructure;

    firebaseId: string;
};

export type DeepPartial<T> = T extends object
    ? { [P in keyof T]?: DeepPartial<T[P]> }
    : T;
