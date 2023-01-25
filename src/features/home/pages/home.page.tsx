import { useContext } from 'react';
import Item from '../../../core/components/item/item';
import { AppContext } from '../../../core/context/app.context';


export function HomePage() {
    const {products} = useContext(AppContext)
    console.log(products)
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
