import { useContext } from 'react';
import Item from '../../../core/components/item/item';
import { AppContext } from '../../../core/context/app.context';

export function HomePage() {
    const { handleLoadProducts, products, user, loginWithGoogle } =
        useContext(AppContext);

    console.log('Loading home page with products: ', products);
    console.log('Loading home page with user: ', user);

    return (
        <section>
            <h1>Dale una segunda vida al material escolar</h1>
            <p> Inicia sesión para poder cargar los productos</p>
            {user?.info.firebaseId ? (
                <button onClick={handleLoadProducts}>Load products</button>
            ) : (
                <button onClick={loginWithGoogle}>Login</button>
            )}

            <div>
                {user?.info.firebaseId &&
                    products.map((item) => (
                        <li key={item.firebaseId}>
                            <Item item={item} />
                        </li>
                    ))}
            </div>
        </section>
    );
}
