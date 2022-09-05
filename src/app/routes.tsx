import { GridItems } from '@app/components/GridItems';
import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
import { PdfDoc } from './components/pdfDoc';
import { ProductForm } from './components/ProductForm';
import { SaleList } from './components/SaleList';
import { TableIlx } from './components/TableIlx';
import { TableProduct } from './components/TableProduct';
import { TableSales } from './components/TableSales';

let routeFocusTimer: number;
export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
  routes?: undefined;
  sidebarHide?: boolean;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
  sidebarHide?: boolean;
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    component: GridItems,
    exact: true,
    label: 'Produtos',
    path: '/',
    title: 'Produtos',
  },
  {
    component: ProductForm,
    exact: true,
    label: 'Produto',
    path: '/viewProduct/:id',
    title: 'Product',
    sidebarHide: true,
  },
  {
    component: TableProduct,
    exact: true,
    label: 'Products table',
    path: '/editProduct/',
    title: 'Products',
  },
  {
    component: ProductForm,
    exact: true,
    label: 'Produto',
    path: '/editProduct/:id',
    title: 'Product',
    sidebarHide: true,
  },
  {
    component: TableSales,
    exact: true,
    label: 'Sales table',
    path: '/viewSales/',
    title: 'Sales',
  },
  {
    component: SaleList,
    exact: true,
    label: 'Sale list',
    path: '/viewSales/:id',
    title: 'Sale',
  },
  {
    component: PdfDoc,
    exact: true,
    label: 'print sale',
    path: '/printSale/',
    title: ' Print sale',
    sidebarHide: true,
  },
/*   {
    component: Support,
    exact: true,
    isAsync: true,
    label: 'Support',
    path: '/support',
    title: 'PatternFly Seed | Support Page',
  },
  {
    label: 'Settings',
    routes: [
      {
        component: GeneralSettings,
        exact: true,
        label: 'General',
        path: '/settings/general',
        title: 'PatternFly Seed | General Settings',
      },
      {
        component: ProfileSettings,
        exact: true,
        label: 'Profile',
        path: '/settings/profile',
        title: 'PatternFly Seed | Profile Settings',
      },
    ],
  }, */
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
const useA11yRouteChange = (isAsync: boolean) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
};

const RouteWithTitleUpdates = ({ component: Component, isAsync = false, title, ...rest }: IAppRoute) => {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} {...rest}/>;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[]
);

const AppRoutes = (): React.ReactElement => (
  <LastLocationProvider>
    <Switch>
      {flattenedRoutes.map(({ path, exact, component, title, isAsync }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          title={title}
          isAsync={isAsync}
        />
      ))}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };
