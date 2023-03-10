import { configureStore } from '@reduxjs/toolkit';
import { CurrentState } from '../core/reducer/current.reducer/current.reducer';
import { productsReducer } from '../core/reducer/products.reducer/products.reducer';
import {
    searchReducer,
    SearchState,
} from '../core/reducer/search.reducer/search.reducer';

import { userReducer } from '../core/reducer/user.reducer/user.reducer';
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
export const mockProduct1Updated: ProductStructure = {
    productInfo: {
        id: 1,
        title: 'Test product 1 updated',
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
export const mockProductWithoutTitle: ProductStructure = {
    productInfo: {
        id: 3,
        title: '',
        description: 'Test description 3',
        price: 300,
        imgUrl: 'img3.jpg',
        category: 'libros',
        available: true,
        ownerName: 'ownerName3',
        ownerUid: 'userUid3',
        publishedAt: '2021-01-01',
    },
    firebaseId: '000003',
};

export const mockProductWithIsLikedBy: ProductStructure = {
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
export const mockProductWithIsLikedByOneUser: ProductStructure = {
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
    isLikedBy: { users: ['userUid1'] },
};

export const mockProductWithIsLikedByUpdated: ProductStructure = {
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
    isLikedBy: { users: ['userUid1', 'userUid2', 'userUid3', 'UpdatedFav'] },
};
export const mockProductWithIsLikedByDeleted: ProductStructure = {
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
    isLikedBy: { users: ['userUid1', 'userUid2'] },
};
export const mockProductWithIsLikedByDeletedEmpty: ProductStructure = {
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
    isLikedBy: { users: [] },
};
export const mockProductsStateWithIsLikedBy: Array<ProductStructure> = [
    mockProductWithIsLikedBy,
];

export const mockProductWithOnlyFirebaseId: Partial<ProductStructure> = {
    firebaseId: 'invalidFirebaseId',
};

export const emptyMockProducts = [];

export const mockCurrentStateWithProduct: CurrentState = {
    currentProduct: mockProduct1,
};
export const mockInitialCurrentState = {
    firebaseId: '',
    productInfo: {
        id: 0,
        title: '',
        description: '',
        ownerUid: '',
        ownerName: '',
        imgUrl: '',
        available: false,

        price: 0,
        category: ' ',
        publishedAt: '',
    },
};

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
