import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Item from '../../../core/components/item/item';

import { useProducts } from '../../../core/hooks/use.products';
import { RootState } from '../../../core/store/store';
import { SearchBox } from '../components/search.box';

export function SearchPage() {
    const { handleLoadProducts } = useProducts();
    const products = useSelector((state: RootState) => state.products);

    useEffect(() => {
        handleLoadProducts();
    }, [handleLoadProducts]);

    return (
        <section>
            <div>
                <h1>Búsqueda</h1>
                <SearchBox></SearchBox>

                {products.map((item) => (
                    <li key={item.firebaseId}>
                        <Item item={item} />
                    </li>
                ))}
            </div>
        </section>
    );
}
