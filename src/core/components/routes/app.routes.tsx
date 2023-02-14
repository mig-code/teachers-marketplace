import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('../../../features/home/pages/home.page'));
const AddProduct = lazy(
    () => import('../../../features/add.product/pages/add.product.page')
);
const DetailsProducts = lazy(
    () => import('../../../features/details.product/pages/details.product.page')
);
const Search = lazy(() => import('../../../features/search/page/search.page'));
const User = lazy(() => import('../../../features/user/pages/user.page'));

export function AppLazyRoutes() {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Routes>
                <Route path={''} element={<Home></Home>}></Route>
                <Route
                    path={'subir-producto'}
                    element={<AddProduct></AddProduct>}
                ></Route>
                <Route path={'mis-productos'} element={<User></User>}></Route>

                <Route path={'buscar'} element={<Search></Search>}></Route>
                <Route
                    path={'producto/:id'}
                    element={<DetailsProducts></DetailsProducts>}
                ></Route>

                <Route
                    path={'*'}
                    element={<Navigate to="" replace></Navigate>}
                ></Route>
            </Routes>
        </Suspense>
    );
}
