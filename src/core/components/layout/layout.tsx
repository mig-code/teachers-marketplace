import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import './layout.scss';

export function Layout({ children }: { children: JSX.Element }) {
    const pathname = useLocation();
    useEffect(() => {
        document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [pathname]);
    return (
        <div className="layout-container">
            <Header></Header>

            <section className="layout-children">{children}</section>

            <Footer></Footer>
        </div>
    );
}
