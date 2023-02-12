import Item from '../item/item';
import { ProductStructure } from '../../types/products.types';

export function List({ products }: { products: ProductStructure[] }) {
    return (
        <div className="list">
            {products.map((item) => (
                <article className="item" key={item.firebaseId}>
                    <Item item={item} />
                </article>
            ))}
        </div>
    );
}
