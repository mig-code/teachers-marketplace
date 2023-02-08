import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Item from '../../../core/components/item/item';

import { useProducts } from '../../../core/hooks/use.products';
import { RootState } from '../../../core/store/store';
import { SearchBox } from '../../search/components/search.box';

import * as ac from '../../../core/reducer/action.creator';

export function HomePage() {
    const { handleLoadProducts } = useProducts();
    const { products } = useSelector((state: RootState) => state);
    const dispatcher = useDispatch();

    useEffect(() => {
        if (products.length === 0) {
            handleLoadProducts();
        }
    }, [handleLoadProducts, products]);

    useEffect(() => {
        dispatcher(ac.resetActionCreatorSearch());
    }, [dispatcher]);

    return (
        <section>
            <div>
                <h1>Dale una segunda vida al material escolar</h1>
                <SearchBox></SearchBox>
                <div className="list">
                    {products.map((item) => (
                        <article key={item.firebaseId}>
                            <Item item={item} />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
