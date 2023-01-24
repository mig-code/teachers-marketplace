import { Link } from 'react-router-dom';

export function Menu() {
    return (
        <nav>
            <ul>
                <Link to={'/'}>
                    <li>Inicio </li>
                </Link>

                <li> Publicar</li>

                <li>Login</li>
            </ul>
        </nav>
    );
}
