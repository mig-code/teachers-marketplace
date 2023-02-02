import { useContext, useEffect } from 'react';
import Item from '../../../core/components/item/item';
import { AppContext } from '../../../core/context/app.context';

export function HomePage() {
    const { handleLoadProducts, products, user } = useContext(AppContext);

    console.log('Loading home page with products: ', products);
    console.log('Loading home page with user: ', user);

    useEffect(() => {
        handleLoadProducts();
    }, [handleLoadProducts]);

    return (
        <section>
            <h1>Dale una segunda vida al material escolar</h1>
            <p> Inicia sesión para poder cargar los productos</p>
            {<button onClick={handleLoadProducts}>Load products</button>}

            <div>
                {products.map((item) => (
                    <li key={item.firebaseId}>
                        <Item item={item} />
                    </li>
                ))}
            </div>
        </section>
    );
}
