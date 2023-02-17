import Item from '../item/item';
import { ProductStructure } from '../../types/products.types';
import './list.scss';

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
