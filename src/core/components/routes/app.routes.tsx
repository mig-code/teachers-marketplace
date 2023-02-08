import { Routes, Route, Navigate } from 'react-router-dom';
import { AddProductPage } from '../../../features/add.product/pages/add.product.page';
import { DetailsProductsPage } from '../../../features/details.product/pages/details.product.page';
import { HomePage } from '../../../features/home/pages/home.page';
import { SearchPage } from '../../../features/search/page/search.page';
import { UserPage } from '../../../features/user/pages/user.page';

export function AppRoutes() {
    return (
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

            <Route path={'buscar'} element={<SearchPage></SearchPage>}></Route>
            <Route
                path={'producto/:id'}
                element={<DetailsProductsPage></DetailsProductsPage>}
            ></Route>

            <Route
                path={'*'}
                element={<Navigate to="" replace></Navigate>}
            ></Route>
        </Routes>
    );
}
