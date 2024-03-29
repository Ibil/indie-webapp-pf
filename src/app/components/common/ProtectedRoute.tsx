import { UserRole } from '@app/model/User';
import * as React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';


export interface ProtectedRouteProps extends RouteProps {
    userRole?: string;
    allowedRoles?: UserRole[]
}

export const isRouteAllowedForUser = (userRoleAsString?: string, allowedRoles?: UserRole[]): boolean => {
    return (allowedRoles == undefined) ||
        (userRoleAsString == undefined && allowedRoles.length == 0) ||
        (
            userRoleAsString !== undefined &&
            (
                undefined != allowedRoles.find(roleEnum => {
                    return roleEnum == UserRole[userRoleAsString as keyof typeof UserRole];
                })
            )
        );
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props: ProtectedRouteProps) => {
    const currentLocation = useLocation();

    const isRoleAllowedForUser = isRouteAllowedForUser(props.userRole, props.allowedRoles);
    if (!isRoleAllowedForUser) {
        const renderComponent = () => <Redirect to={{ pathname: "/login", state: { from: currentLocation.pathname } }} />;
        return <Route {...props} component={renderComponent} render={undefined} />
    } else {
        return <Route {...props} />;
    }
};