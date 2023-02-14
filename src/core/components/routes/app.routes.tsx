import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../../../features/home/pages/home.page'));
const AddProductPage = lazy(
    () => import('../../../features/add.product/pages/add.product.page')
);
const DetailsProductsPage = lazy(
    () => import('../../../features/details.product/pages/details.product.page')
);
const SearchPage = lazy(
    () => import('../../../features/search/page/search.page')
);
const UserPage = lazy(() => import('../../../features/user/pages/user.page'));

export function AppLazyRoutes() {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Routes>
                <Route path={''} element={<HomePage></HomePage>}></Route>
                <Route
                    path={'subir-producto'}
                    element={<AddProductPage></AddProductPage>}
                ></Route>
                <Route
                    path={'mis-productos'}
                    element={<UserPage></UserPage>}
                ></Route>

                <Route
                    path={'buscar'}
                    element={<SearchPage></SearchPage>}
                ></Route>
                <Route
                    path={'producto/:id'}
                    element={<DetailsProductsPage></DetailsProductsPage>}
                ></Route>

                <Route
                    path={'*'}
                    element={<Navigate to="" replace></Navigate>}
                ></Route>
            </Routes>
        </Suspense>
    );
}
