import { Link } from 'react-router-dom';

export function Menu() {
    return (
        <nav>
            <ul>
                <Link to={'/'}>
                    <li>Inicio </li>
                </Link>
                <Link to={'/subir-producto'}>
                    <li> Publicar</li>
                </Link>

                <li>Login</li>
            </ul>
        </nav>
    );
}
