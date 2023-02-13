import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useProducts } from '../../../core/hooks/use.products';
import { RootState } from '../../../core/store/store';
import { SearchBox } from '../components/search.box';
import * as ac from '../../../core/reducer/action.creator';
import { List } from '../../../core/components/list/list';

export function SearchPage() {
    const { handleLoadProducts } = useProducts();
    const { products, search } = useSelector((state: RootState) => state);
    const filteredProducts = products.filter(
        (item) =>
            item.productInfo.title
                .toLowerCase()
                .includes(search.searchQuery.toLowerCase()) ||
            item.productInfo.description
                .toLowerCase()
                .includes(search.searchQuery.toLowerCase())
    );

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
            <h2>Resultados</h2>

            {filteredProducts.length === 0 && <p>No hay resultados</p>}
            {filteredProducts.length > 0 && (
                <List products={filteredProducts}></List>
            )}
        </>
    );
}
