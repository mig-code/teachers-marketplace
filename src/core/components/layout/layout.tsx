import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import './layout.scss';

export function Layout({ children }: { children: JSX.Element }) {
    return (
        <div className="layout-container">
            <Header></Header>
            <div className="layout-children">{children}</div>

            <Footer></Footer>
        </div>
    );
}
