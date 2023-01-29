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
        firebaseId?: string;
    };
};
export type ProductLikedStructure = {
    isLikedBy: {
        users: Array<string>;
    };
};
export type ProductStructure = ProductInfoStructure & ProductLikedStructure 

const testProduct: Partial<ProductStructure> = {
    productInfo: {
        id: 1,
        title: 'Pelota de fútbol',
        description: 'Pelota de fútbol de 32 cm de diámetro',
        owner: '1',
        imgUrl: 'assets/img/pelota_futbol.jpg',
        available: true,
        price: 10,
        publishedAt: new Date(),
        firebaseId: '1',
    },
    isLikedBy: {
        users: ['1', '2', '3'],
    },
   

};
