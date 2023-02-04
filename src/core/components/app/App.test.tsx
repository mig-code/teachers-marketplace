import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { consoleDebug } from '../../../tools/debug';

describe('When render App component', () => {
    test('It should render the layout Component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App></App>
                </MemoryRouter>
            </Provider>
        );
        const textElement = screen.getByText(
            /Dale una segunda vida al material escolar/i
        );
        expect(textElement).toBeInTheDocument();
    });
});
const handleError = (error: Error) => {
    consoleDebug(error.message);
};
