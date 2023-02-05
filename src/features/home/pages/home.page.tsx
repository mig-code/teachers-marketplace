import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Item from '../../../core/components/item/item';

import { useProducts } from '../../../core/hooks/use.products';
import { RootState } from '../../../core/store/store';

export function HomePage() {
    const { handleLoadProducts } = useProducts();
    const products = useSelector((state: RootState) => state.products);

    useEffect(() => {
        handleLoadProducts();
    }, [handleLoadProducts]);

    return (
        <section>
            <div>
                <h1>Dale una segunda vida al material escolar</h1>
                <p> Inicia sesión para poder cargar los productos</p>
                {<button onClick={handleLoadProducts}>Load products</button>}

                <h3>Adding Store</h3>

                {products.map((item) => (
                    <li key={item.firebaseId}>
                        <Item item={item} />
                    </li>
                ))}
            </div>
        </section>
    );
}
