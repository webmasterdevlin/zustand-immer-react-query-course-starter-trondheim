import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router';
import type { ElementType } from 'react';
import type { RouteObject } from 'react-router';

const Loadable = (Component: ElementType) => {
  const LazyComponents = (props: any) => {
    return (
      <Suspense fallback={<h1>Loading</h1>}>
        <Component {...props} />
      </Suspense>
    );
  };

  return LazyComponents;
};

const HomePage = Loadable(
  lazy(() => {
    return import('./pages/HomePage');
  }),
);

const TablePage = Loadable(
  lazy(() => {
    return import('./pages/TablePage');
  }),
);

export const pathNames = {
  home: '/',
  table: '/table',
} as const;

const lazyRoutes: RouteObject[] = [
  {
    path: pathNames.home,
    element: <HomePage />,
  },
  {
    path: pathNames.table,
    element: <TablePage />,
  },
  {
    path: '*',
    element: <HomePage />,
  },
];

const LazyRoutes = () => {
  const contents = useRoutes(lazyRoutes);
  return <>{contents}</>;
};

export default LazyRoutes;
