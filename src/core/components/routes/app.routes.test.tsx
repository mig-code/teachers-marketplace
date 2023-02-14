/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { AppLazyRoutes } from './app.routes';

const mockPageTitles = [
    'Test Subir Producto',
    'Test Mis Productos',
    'Test buscar',
    'Test producto',
];
const items = [
    { path: '/subir-producto' },
    { path: '/mis-productos' },
    { path: '/buscar' },
    { path: '/producto/:id' },
];
const testLazyRoute = (index: number) => {
    const title = new RegExp(mockPageTitles[index], 'i');
    const lazyElement = screen.getByText(title);
    expect(lazyElement).toBeInTheDocument();
};

jest.mock('../../../features/add.product/pages/add.product.page', () => {
    return () => {
        return <div>{mockPageTitles[0]}</div>;
    };
});
jest.mock('../../../features/user/pages/user.page', () => {
    return () => {
        return <div>{mockPageTitles[1]}</div>;
    };
});
jest.mock('../../../features/search/page/search.page', () => {
    return () => {
        return <div>{mockPageTitles[2]}</div>;
    };
});
jest.mock(
    '../../../features/details.product/pages/details.product.page',
    () => {
        return () => {
            return <div>{mockPageTitles[3]}</div>;
        };
    }
);
jest.mock('../../../features/home/pages/home.page', () => {
    return () => {
        return <div>{mockPageTitles[4]}</div>;
    };
});

describe('Given AppRoutes Lazy component', () => {
    let lazyPaths: Array<string>;
    beforeEach(() => {
        lazyPaths = items.map((item) => item.path);
    });
    describe(`When we render the component 
                And the lazy route  is Product Page`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={0}>
                        <AppLazyRoutes />
                    </Router>
                );
            });
        });
        test('Then it should display the Add product Page', () => {
            testLazyRoute(0);
        });
    });
    describe(`When we render the component 
                And the lazy route My products Page`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={1}>
                        <AppLazyRoutes />
                    </Router>
                );
            });
        });
        test('Then it should display My products Page', () => {
            testLazyRoute(1);
        });
    });
    describe(`When we render the component 
                And the lazy route is  Search Page`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={2}>
                        <AppLazyRoutes />
                    </Router>
                );
            });
        });
        test('Then it should display Search Page', () => {
            testLazyRoute(2);
        });
    });
    describe(`When we render the component 
                And the lazy route Product Detail Page`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={3}>
                        <AppLazyRoutes />
                    </Router>
                );
            });
        });
        test('Then it should display the Product Detail Page', () => {
            testLazyRoute(3);
        });
    });
});
