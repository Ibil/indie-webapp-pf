import * as React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';


export interface ProtectedRouteProps extends RouteProps {
  authenticationPath?: string;
  isAuthenticated: boolean;
}

const differentRoute = (path1: string, path2: string) : boolean => path1 !== path2; 

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
  const currentLocation = useLocation();
  const authenticationPathValue = props.authenticationPath ? props.authenticationPath : "/login";
  let redirectPath = currentLocation.pathname;

  if (!props.isAuthenticated) {
    const suffix = currentLocation.pathname === "/" ? "" : "/" + encodeURIComponent(currentLocation.pathname);
    redirectPath = authenticationPathValue + suffix;
  }

  if (differentRoute(redirectPath, currentLocation.pathname)) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};