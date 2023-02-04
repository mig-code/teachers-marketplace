import { useContext, useEffect } from 'react';

import Item from '../../../core/components/item/item';
import { AppContext } from '../../../core/context/app.context';

import * as ac from '../../../core/reducer/action.creator';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../core/store/store';

export function HomePage() {
    const { handleLoadProducts, products } = useContext(AppContext);

    const counter = useSelector((state: RootState) => state.counter);
    const dispatcher = useDispatch();

    function handleIncrement() {
        console.log('Incrementing counter ');

        dispatcher(ac.incrementActionCreatorHome(counter.count));
        console.log(counter);
    }
    function handleIncrementByAmount() {
        // increment by payload
        dispatcher(ac.incrementByAmountActionCreatorHome(2));
    }

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
                <button onClick={handleIncrement}>Increment</button>
                <button onClick={handleIncrementByAmount}>Decrement</button>
                <p>Counter: {counter.count}</p>
                {products.map((item) => (
                    <li key={item.firebaseId}>
                        <Item item={item} />
                    </li>
                ))}
            </div>
        </section>
    );
}
