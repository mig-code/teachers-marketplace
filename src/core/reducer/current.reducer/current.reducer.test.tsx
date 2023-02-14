import { mockProduct1, mockProductEmpty } from '../../../mocks/store.mock';
import { ProductStructure } from '../../types/products.types';
import { actionTypesProducts } from '../action.types';

import { currentReducer, currentState } from './current.reducer';

describe('Given the function currentReducer', () => {
    let action: { type: string; payload: ProductStructure };
    let state: currentState;
    const mockResource: ProductStructure = mockProduct1;

    describe('When the action is loadCurrent', () => {
        beforeEach(() => {
            action = {
                type: actionTypesProducts.loadCurrent,
                payload: mockResource,
            };
            state = {
                currentProduct: mockProductEmpty,
            };
        });
        test('Then the returned state should be the action payload', () => {
            const result = currentReducer(state, action);
            expect(result).toEqual({ currentProduct: action.payload });
        });
    });
    describe('When the action is defaultCase', () => {
        beforeEach(() => {
            action = {
                type: 'defaultCase',
                payload: null as unknown as ProductStructure,
            };
            state = {
                currentProduct: mockProductEmpty,
            };
        });
        test('Then the returned state should be the current state', () => {
            const result = currentReducer(state, action);
            expect(result).toEqual({ currentProduct: mockProductEmpty });
        });
    });
});
