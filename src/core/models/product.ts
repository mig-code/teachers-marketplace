export type ProductStructure = {
    id: string;
    title: string;
    description: string;
    owner: string;
    price: number;
    available: boolean;
    isFavoritedBy: Array<string>;
};

export class Product {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        window.crypto?.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6);
    }
    id: string;
    isFavoritedBy: Array<string> = [];
    available = true;
    constructor(
        public title: string,
        public description: string,
        public price: number,
        public owner: string
    ) {
        this.id = Product.generateId();
    }
}