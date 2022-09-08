import * as React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';


export interface ProtectedRouteProps extends RouteProps {
  authenticationPath?: string;
  isAuthenticated: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
  const currentLocation = useLocation();

  if (!props.isAuthenticated) {
    const renderComponent = () => <Redirect to={{ pathname: "/login", state: { from: currentLocation.pathname } }} />;
    return <Route {...props} component={renderComponent} render={undefined} />
  }else {
    return <Route {...props} />;
  }
};