import { useContext, useEffect } from 'react';

import Item from '../../../core/components/item/item';
import { AppContext } from '../../../core/context/app.context';

export function HomePage() {
    const { handleLoadProducts, products } = useContext(AppContext);

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
