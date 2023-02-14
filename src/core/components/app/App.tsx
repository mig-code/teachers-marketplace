import React from 'react';
import { Layout } from '../layout/layout';
import { AppLazyRoutes } from '../routes/app.routes';

import './App.scss';

function App() {
    return (
        <div className="App">
            <Layout>
                <AppLazyRoutes></AppLazyRoutes>
            </Layout>
        </div>
    );
}

export default App;
