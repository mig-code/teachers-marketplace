import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Item from '../../../core/components/item/item';

import { useProducts } from '../../../core/hooks/use.products';
import { RootState } from '../../../core/store/store';
import { SearchBox } from '../../search/components/search.box';

import * as ac from '../../../core/reducer/action.creator';
import './home.page.scss';

export function HomePage() {
    const { handleLoadProducts } = useProducts();
    const { products } = useSelector((state: RootState) => state);
    const dispatcher = useDispatch();

    useEffect(() => {
        handleLoadProducts();
    }, [handleLoadProducts, dispatcher]);

    useEffect(() => {
        dispatcher(ac.resetActionCreatorSearch());
    }, [dispatcher]);

    return (
        <>
            <h1 className="home-title">
                Dale una segunda vida al material escolar
            </h1>
            <SearchBox></SearchBox>
            <div className="list">
                {products
                    .slice(0)
                    .reverse()
                    .map((item) => (
                        <article className="item" key={item.firebaseId}>
                            <Item item={item} />
                        </article>
                    ))}
            </div>
        </>
    );
}
