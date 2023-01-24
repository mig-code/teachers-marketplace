import Item from '../../../core/components/item/item';
import { productMocks } from '../../../core/mocks/product.mocks';

export function HomePage() {
    const mockItems = productMocks;
    return (
        <section>
            <h1>Dale una segunda vida al material escolar</h1>
            <div>
                {mockItems.map((item) => (
                    <li key={item.id}>
                        <Item item={item} />
                    </li>
                ))}
            </div>
        </section>
    );
}
