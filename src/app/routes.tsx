import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
import { GridItems } from './components/common/GridItems';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { GridBag } from './components/grids/GridBag';
import { GridBook } from './components/grids/GridBook';
import { GridTshirt } from './components/grids/GridTShirt';
import { LoginIlx } from './components/common/LoginIlx';
import { LogoutIlx } from './components/common/LogoutIlx';
import { PdfDoc } from './components/common/PdfDoc';
import { ProductForm } from './components/ProductForm';
import { RegisterIlx } from './components/common/RegisterIlx';
import { SaleList } from './components/SaleList';
import { TableProduct } from './components/tables/TableProduct';
import { TableSales } from './components/tables/TableSales';
import { useAuth } from './hooks/useAuth';
import { UserRole } from './model/User';
import { TableUsers } from './components/tables/TableUsers';
import { TableLocations } from './components/tables/TableLocations';
import { LocationForm } from './components/LocationForm';
import { UserForm } from './components/UserForm';
import { ProductFormWithTable } from './components/ProductFormWithTable';
import { TableLocationStock } from './components/tables/TableLocationStock';
import { ViewProduct } from './components/ViewProduct';

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
  allowedRoles?: UserRole[];
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
  sidebarHide?: boolean;
  allowedRoles?: UserRole[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    component: GridItems,
    exact: true,
    label: 'Products',
    path: '/',
    title: 'Products',
  },
  {
    component: GridTshirt,
    exact: true,
    label: 'T-shirts',
    path: '/tshirts',
    title: 'T-Shirts',
  },
  {
    component: GridBag,
    exact: true,
    label: 'Bags',
    path: '/bags',
    title: 'Bags',
  },
  {
    component: GridBook,
    exact: true,
    label: 'Books',
    path: '/Books',
    title: 'Books',
  },
  {
    component: ViewProduct,
    exact: true,
    label: 'Product',
    path: '/viewProduct/:id',
    title: 'Product',
    sidebarHide: true,
  },
  {
    component: RegisterIlx,
    exact: true,
    label: 'Register',
    path: '/register/',
    title: 'Register',
    sidebarHide: true,
  },
  {
    component: LoginIlx,
    exact: true,
    label: 'Login',
    path: '/login/',
    title: 'Login',
    allowedRoles: [],
  },
  {
    component: LogoutIlx,
    exact: true,
    label: 'Logout',
    path: '/logout/',
    title: 'Logout',
    allowedRoles: [UserRole.basic, UserRole.seller, UserRole.manager, UserRole.admin],
  }
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
    component: TableProduct,
    exact: true,
    label: 'Products table',
    path: '/listProducts/',
    title: 'Products',
    allowedRoles: [UserRole.manager, UserRole.admin],
  },
  {
    component: ProductFormWithTable,
    exact: true,
    label: 'Create Product',
    path: '/listProducts/create',
    title: 'Create Product',
    sidebarHide: true,
    allowedRoles: [UserRole.manager, UserRole.admin],
  },
  {
    component: ProductFormWithTable,
    exact: true,
    label: 'Edit Product',
    path: '/listProducts/:id',
    title: 'Edit Product',
    sidebarHide: true,
    allowedRoles: [UserRole.seller, UserRole.manager, UserRole.admin],
  },
  {
    component: TableLocations,
    exact: true,
    label: 'Locations table',
    path: '/listLocations/',
    title: 'Locations',
    allowedRoles: [UserRole.seller, UserRole.manager, UserRole.admin],
  },
  {
    component: TableLocationStock,
    label: 'Location Stock',
    path: '/listLocations/viewStock/:id',
    title: 'Location Stock',
    allowedRoles: [UserRole.seller, UserRole.manager, UserRole.admin],
    sidebarHide: true
  },
  {
    component: LocationForm,
    /* exact: true, */
    label: 'Create Location',
    path: '/listLocations/create',
    title: 'Create Location',
    sidebarHide: true,
    allowedRoles: [UserRole.manager, UserRole.admin],
  },
  {
    component: TableUsers,
    exact: true,
    label: 'Users table',
    path: '/listUsers/',
    title: 'Users',
    allowedRoles: [UserRole.admin],
  },
  {
    component: UserForm,
    label: 'User',
    path: '/listUsers/:id',
    title: 'User',
    sidebarHide: true,
    allowedRoles: [UserRole.admin],
  },
  {
    component: TableSales,
    exact: true,
    label: 'Sales table',
    path: '/viewSales/',
    title: 'Sales',
    allowedRoles: [UserRole.seller, UserRole.manager, UserRole.admin],
  },
  {
    component: SaleList,
    exact: true,
    label: 'Sale list',
    path: '/viewSales/:id',
    title: 'Sale',
    allowedRoles: [UserRole.seller, UserRole.manager, UserRole.admin],
  },
  {
    component: PdfDoc,
    exact: true,
    label: 'print sale',
    path: '/printSale/',
    title: ' Print sale',
    sidebarHide: true,
    allowedRoles: [UserRole.seller, UserRole.manager, UserRole.admin],
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
  return routes.map(({ path, exact, component, allowedRoles }, idx) => (
    <ProtectedRoute
      path={path}
      exact={exact}
      component={component}
      key={idx}
      userRole={role}
      allowedRoles={allowedRoles} />
  ));
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

export { AppRoutes, routes, protectedRoutes };


