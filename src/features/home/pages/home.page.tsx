import { useContext } from 'react';
import Item from '../../../core/components/item/item';
import { AppContext } from '../../../core/context/app.context';

export function HomePage() {
    const { handleLoadProducts, products } = useContext(AppContext);

    console.log('Loading home page with products: ', products);

    return (
        <section>
            <h1>Dale una segunda vida al material escolar</h1>
            <button onClick={handleLoadProducts}>Load products</button>
            <div>
                {products.map((item) => (
                    <li key={item.id}>
                        <Item item={item} />
                    </li>
                ))}
            </div>
        </section>
    );
}
