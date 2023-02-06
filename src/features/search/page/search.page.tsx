import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Item from '../../../core/components/item/item';

import { useProducts } from '../../../core/hooks/use.products';
import { RootState } from '../../../core/store/store';
import { SearchBox } from '../components/search.box';
import * as ac from '../../../core/reducer/action.creator';

export function SearchPage() {
    const { handleLoadProducts } = useProducts();
    const { products } = useSelector((state: RootState) => state);
    const dispatcher = useDispatch();

    useEffect(() => {
        if (products.length === 0) {
            handleLoadProducts();
        }

        dispatcher(ac.setModeActionCreatorSearch(true));
    }, [handleLoadProducts, dispatcher, products]);

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
