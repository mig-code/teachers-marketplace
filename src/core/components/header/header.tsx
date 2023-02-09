import { Link } from 'react-router-dom';
import { Menu } from '../menu/menu';
import './header.scss';

export function Header() {
    return (
        <header>
            <Link to={'/'}>
                <div className="left-container">
                    <div className="left-container__icon-container">
                        <img
                            className="left-container__icon"
                            src="/assets/tm_icon.png"
                            alt="logo-small"
                        />
                    </div>
                    <img
                        className="left-container__logo"
                        src="/assets/tm_logo.png"
                        alt="logo"
                    />
                </div>
            </Link>

            <Menu></Menu>
        </header>
    );
}
