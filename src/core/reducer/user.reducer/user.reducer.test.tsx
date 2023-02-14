import { emptyMockUser } from '../../../mocks/store.mock';
import { userMockSameOwner } from '../../../mocks/user.mock';
import { UserStructure } from '../../types/user.type';
import { actionTypesUser } from '../action.types';

import { userReducer } from './user.reducer';

describe('Given the function userReducer', () => {
    let action: { type: string; payload: UserStructure };
    let state: { user: UserStructure };
    const mockEmptyuser = emptyMockUser;
    const mockUser = userMockSameOwner;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('When the action is login', () => {
        beforeEach(() => {
            action = {
                type: actionTypesUser.login,
                payload: mockUser,
            };
            state = {
                user: mockEmptyuser,
            };
        });
        test('Then the returned state should be the action payload', () => {
            const result = userReducer(state.user, action);
            expect(result).toEqual(action.payload);
        });
    });

    describe('When the action is logout', () => {
        beforeEach(() => {
            action = {
                type: actionTypesUser.logout,
                payload: null as unknown as UserStructure,
            };
            state = {
                user: mockUser,
            };
        });
        test('Then the returned state should be empty User', () => {
            const result = userReducer(state.user, action);
            expect(result).toEqual(mockEmptyuser);
        });
    });
});
