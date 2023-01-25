import { useContext, useEffect } from 'react';
import Item from '../../../core/components/item/item';
import { AppContext } from '../../../core/context/app.context';

export function HomePage() {
    const { products, handleLoadProducts } = useContext(AppContext);
    console.log(products);
    useEffect(() => {
        handleLoadProducts();
    }, [handleLoadProducts]);
    return (
        <section>
            <h1>Dale una segunda vida al material escolar</h1>
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
