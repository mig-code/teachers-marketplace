import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Item from '../../../core/components/item/item';

import { useProducts } from '../../../core/hooks/use.products';
import { RootState } from '../../../core/store/store';
import { SearchBox } from '../components/search.box';
import * as ac from '../../../core/reducer/action.creator';

export function SearchPage() {
    const { handleLoadProducts } = useProducts();
    const { products, search } = useSelector((state: RootState) => state);
    const dispatcher = useDispatch();

    useEffect(() => {
        if (products.length === 0) {
            handleLoadProducts();
        }

        dispatcher(ac.setModeActionCreatorSearch(true));
    }, [handleLoadProducts, dispatcher, products]);

    return (
        <>
            <h1>Búsqueda</h1>
            <SearchBox></SearchBox>
            <div className="list">
                {products
                    .filter(
                        (item) =>
                            item.productInfo.title
                                .toLowerCase()
                                .includes(search.searchQuery.toLowerCase()) ||
                            item.productInfo.description
                                .toLowerCase()
                                .includes(search.searchQuery.toLowerCase())
                    )
                    .map((item) => (
                        <article className="item" key={item.firebaseId}>
                            <Item item={item} />
                        </article>
                    ))}
            </div>
        </>
    );
}
