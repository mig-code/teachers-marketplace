import { render } from '@testing-library/react';

import * as useProducts from '../hooks/use.products';
import { AppContextProvider } from './app.provider';

describe('Given AppContextProvider', () => {
    describe('When we use it', () => {
        test('Then it should call the  getCharactersData()', () => {
            const handleLoadProductsSpy = jest.spyOn(
                useProducts,
                'useProducts'
            );
            render(
                <AppContextProvider>
                    <></>
                </AppContextProvider>
            );
            expect(handleLoadProductsSpy).toHaveBeenCalled();
        });
    });
});
