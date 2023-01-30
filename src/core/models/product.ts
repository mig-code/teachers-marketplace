import { generateId } from '../helpers/generateId';
import { ProductStructure } from '../types/products.types';

export function generateProduct(
    title: string,
    description: string,
    price: number,
    category: string,
    owner: string,
    imgUrl = 'assets/img/pelota_fantasia.jpg'
): Partial<ProductStructure> {
    return {
        productInfo: {
            title,
            description,
            price,
            owner,
            imgUrl,
            category,
            id: generateId(),
            available: true,
            publishedAt: new Date(),
        },
    };
}

// OLD WAY WITH CLASS

// export class ProductInfo {
//     static generateId() {
//         const aNumbers = new Uint32Array(1);
//         window.crypto?.getRandomValues(aNumbers);
//         return parseInt(('000000' + aNumbers[0]).slice(-6));
//     }
//     public id: number;
//     public available = true;
//     public publishedDate = new Date();

//     constructor(
//         public title: string,
//         public description: string,
//         public price: number,
//         public owner: string,
//         public imgUrl: string = 'assets/img/pelota_fantasia.jpg'
//     ) {
//         this.id = ProductInfo.generateId();
//     }
// }
