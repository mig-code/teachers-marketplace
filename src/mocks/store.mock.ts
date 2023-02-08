import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../core/reducer/products.reducer';
import { searchReducer, SearchState } from '../core/reducer/search.reducer';

import { userReducer } from '../core/reducer/user.reducer';
import { RootState } from '../core/store/store';
import { ProductStructure } from '../core/types/products.types';
import { UserStructure } from '../core/types/user.type';

export const emptyMockUser: UserStructure = {
    info: {
        firebaseId: '',
        name: '',
        photoUrl: '',
    },
    token: '',
};

export const mockProductEmpty: ProductStructure = {
    productInfo: {
        id: 0,
        title: '',
        description: '',
        price: 0,
        imgUrl: '',
        category: '',
        available: false,
        ownerName: '',
        ownerUid: '',
        publishedAt: '',
    },
    firebaseId: '',
};
export const mockProduct1: ProductStructure = {
    productInfo: {
        id: 1,
        title: 'Test product 1',
        description: 'Test description 1',
        price: 100,
        imgUrl: 'img1.jpg',
        category: 'libros',
        available: true,
        ownerName: 'ownerName1',
        ownerUid: 'userUid1',
        publishedAt: '2021-01-01',
    },
    firebaseId: '000001',
};
export const mockProduct2: ProductStructure = {
    productInfo: {
        id: 2,
        title: 'Test product 2',
        description: 'Test description 2',
        price: 200,
        imgUrl: 'img2.jpg',
        category: 'libros',
        available: true,
        ownerName: 'ownerName2',
        ownerUid: 'userUid2',
        publishedAt: '2021-01-01',
    },
    firebaseId: '000002',
};

export const mockProductWithisLiked: ProductStructure = {
    productInfo: {
        id: 4,
        title: 'Test product with isLiked',
        description: 'Test description with isLiked',
        price: 400,
        imgUrl: 'img4.jpg',
        category: 'libros',
        available: true,
        ownerName: 'ownerName4',
        ownerUid: 'userUid4',
        publishedAt: '2021-01-01',
    },
    firebaseId: '000004',
    isLikedBy: { users: ['userUid1', 'userUid2', 'userUid3'] },
};

export const mockProductWithOnlyFirebaseId: Partial<ProductStructure> = {
    firebaseId: 'invalidFirebaseId',
};

export const emptyMockProducts = [];
export const mockProductsState: Array<ProductStructure> = [
    mockProduct1,
    mockProduct2,
];
export const emptyMockSearchState: SearchState = {
    searchQuery: '',
    realTimeSearch: false,
};
export const mockSearchStateRealtimeWithQuery: SearchState = {
    searchQuery: 'test',
    realTimeSearch: true,
};

export const emptyPreloadedStateMock: Partial<RootState> = {
    user: emptyMockUser,
    search: emptyMockSearchState,
    products: [],
    current: {
        currentProduct: mockProductEmpty,
    },
};

export const mockStore = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        products: productsReducer,
    },
    preloadedState: emptyPreloadedStateMock,
});
