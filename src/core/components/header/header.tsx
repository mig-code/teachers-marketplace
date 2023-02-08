import { Link } from 'react-router-dom';
import { Menu } from '../menu/menu';
import './header.scss';

export function Header() {
    return (
        <header>
            <Link to={'/'}>
                <h1 className="title">Teachers Marketplace</h1>
                <p className="icon"></p>
            </Link>

            <Menu></Menu>
        </header>
    );
}
