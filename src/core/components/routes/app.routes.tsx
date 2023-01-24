import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../../../features/home/pages/home.page';

export function AppRoutes() {
    return (
        <Routes>
            <Route path={''} element={<HomePage></HomePage>}></Route>

            <Route
                path={'*'}
                element={<Navigate to="" replace></Navigate>}
            ></Route>
        </Routes>
    );
}
