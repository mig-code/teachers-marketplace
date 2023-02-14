import {
    mockProduct1,
    mockProduct1Updated,
    mockProduct2,
    mockProductWithIsLikedBy,
} from '../../mocks/store.mock';
import { ProductStructure } from '../types/products.types';
import { actionTypesProducts } from './action.types';

import { productsReducer, productstState } from './products.reducer';

describe('Given the function productReducer', () => {
    let action: { type: string; payload: unknown };
    let state: productstState;

    const mockResource: Array<ProductStructure> = [mockProductWithIsLikedBy];

    describe('When the action is load', () => {
        beforeEach(() => {
            action = {
                type: actionTypesProducts.load,
                payload: mockResource,
            };
            state = {
                products: [],
            };
        });
        test('Then the returned state should be the action payload', () => {
            const result = productsReducer(state.products, action);
            expect(result).toEqual(action.payload);
        });
    });

    describe('When the action is delete', () => {
        beforeEach(() => {
            action = {
                type: actionTypesProducts.delete,
                payload: mockResource[0].firebaseId,
            };
            state = {
                products: mockResource,
            };
        });
        test('Then the returned state should be an empty array', () => {
            const result = productsReducer(state.products, action);
            expect(result).toEqual([]);
        });
    });
    describe('When the action is Update', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        test('and there is a valid id, the retuned state should be updated', () => {
            action = {
                type: actionTypesProducts.update,
                payload: mockProduct1Updated,
            };
            state = {
                products: [mockProduct1],
            };
            const result = productsReducer(state.products, action);
            expect(result).toEqual([mockProduct1Updated]);
            console.log(result);
        });
        test('and there is not a valid id, the retuned state should be the same', () => {
            action = {
                type: actionTypesProducts.update,
                payload: mockProduct2,
            };
            state = {
                products: [mockProduct1],
            };
            const result = productsReducer(state.products, action);
            expect(result).toEqual([mockProduct1]);
            console.log(result);
        });
    });
    describe('When the action is create', () => {
        beforeEach(() => {
            action = {
                type: actionTypesProducts.create,
                payload: mockProduct1,
            };
            state = {
                products: [],
            };
        });
        test('Then the returned state should be the action payload', () => {
            const result = productsReducer(state.products, action);
            expect(result).toEqual([mockProduct1]);
        });
    });
});
