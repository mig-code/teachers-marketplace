import { Header } from '../header/header';


export function Layout({ children }: { children: JSX.Element }) {
    return (
        <div className="container">
            <Header></Header>

            {children}
        </div>
    );
}
