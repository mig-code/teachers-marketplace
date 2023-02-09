import React from 'react';
import { Layout } from '../layout/layout';
import { AppRoutes } from '../routes/app.routes';

import './App.scss';

function App() {
    return (
        <div className="App">
            <Layout>
                <AppRoutes></AppRoutes>
            </Layout>
        </div>
    );
}

export default App;
