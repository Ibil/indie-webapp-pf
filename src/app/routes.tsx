import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { GridTshirt } from './components/GridTShirt';
import { LoginIlx } from './components/LoginIlx';
import { PdfDoc } from './components/PdfDoc';
import { ProductForm } from './components/ProductForm';
import { RegisterIlx } from './components/RegisterIlx';
import { SaleList } from './components/SaleList';
import { TableProduct } from './components/TableProduct';
import { TableSales } from './components/TableSales';
import { useAuth } from './hooks/useAuth';

let routeFocusTimer: number;
export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path?: string;
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
    component: RegisterIlx,
    exact: true,
    label: 'Register',
    path: '/register/',
    title: 'Register',
  },
  {
    component: LoginIlx,
    exact: true,
    label: 'Login',
    path: '/login/',
    title: 'Login',
  },
  {
    component: GridTshirt,
    exact: true,
    label: 'T-shirts',
    path: '/',
    title: 'T-Shirts',
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

const protectedRoutes: AppRouteConfig[] = [
  {
    component: TableSales,
    exact: true,
    label: 'Sales table',
    path: '/viewSales/',
    title: 'Sales',
  },
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

  return <Route render={routeWithTitle} {...rest} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[]
);

const flattenedProtectedRoutes: IAppRoute[] = protectedRoutes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[]
);


function mapRoutes(routes: IAppRoute[]): string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined {
  return routes.map(({ path, exact, component, title, isAsync }, idx) => (
    <RouteWithTitleUpdates
      path={path}
      exact={exact}
      component={component}
      key={idx}
      title={title}
      isAsync={isAsync} />
  ));
}

function mapProtectedRoutes(routes: IAppRoute[], role?: string): string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined {
  return flattenedProtectedRoutes.map(({ path, exact, component, title, isAsync }, idx) => (
    <ProtectedRoute
      path={path}
      exact={exact}
      component={component}
      key={idx}
      isAuthenticated={role !== undefined} /> // FIXME
  ));
}

function concatRoutes() {
  const allRoutes: IAppRoute[] = flattenedRoutes.concat(flattenedProtectedRoutes);
  console.log()
  return mapRoutes(allRoutes);
}


const AppRoutes = (): React.ReactElement => {
  const { auth } = useAuth();
  return (
  <LastLocationProvider>

    <Switch>
      {mapRoutes(flattenedRoutes)}
      {mapProtectedRoutes(flattenedProtectedRoutes, auth.role)}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </LastLocationProvider>
)};

export { AppRoutes, routes };


