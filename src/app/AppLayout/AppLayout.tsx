import * as React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import {
  Nav,
  NavList,
  NavItem,
  NavExpandable,
  Page,
  PageHeader,
  PageSidebar,
  SkipToContent
} from '@patternfly/react-core';
import { routes, IAppRoute, IAppRouteGroup, protectedRoutes } from '@app/routes';
import logo from '@app/bgimages/indie-logo-r.svg';
import { useAuth } from '@app/hooks/useAuth';
import { isRouteAllowedForUser } from '@app/components/common/ProtectedRoute';
import { useEffect } from 'react';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {

  const { auth } = useAuth();

  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);
  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };

  function LogoImg() {
    const history = useHistory();
    function handleClick() {
      history.push('/');
    }
    return (
      <img src={logo} onClick={handleClick} alt="PatternFly Logo" />
    );
  }

  const Header = (
    <PageHeader
      logo={<LogoImg />}
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
    />
  );

  const location = useLocation();

  const renderNavItem = (route: IAppRoute, index: number) => (
    <NavItem key={`${route.label}-${index}`} id={`${route.label}-${index}`} isActive={route.path === location.pathname}>
      <NavLink exact={route.exact} to={route.path}>
        {route.label}
      </NavLink>
    </NavItem>
  );

  const renderNavGroup = (group: IAppRouteGroup, groupIndex: number) => (
    <NavExpandable
      key={`${group.label}-${groupIndex}`}
      id={`${group.label}-${groupIndex}`}
      title={group.label}
      isActive={group.routes.some((route) => route.path === location.pathname)}
    >
      {group.routes.map((route, idx) => route.label && renderNavItem(route, idx))}
    </NavExpandable>
  );

  const mapRoutes = () => {

    console.log(auth.role);
    
    return routes.concat(protectedRoutes)
            .filter(route => !route.sidebarHide && isRouteAllowedForUser(auth.role, route.allowedRoles))
            .map((route, idx) => route.label && (!route.routes ? renderNavItem(route, idx) : renderNavGroup(route, idx)));
  }

  const generateSideBarNavigation = () => (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">
        {
          mapRoutes()
        }
      </NavList>
    </Nav>
  );

  const generateSideBar = () => (
    <PageSidebar
      theme="dark"
      nav={generateSideBarNavigation()}
      isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen} />
  );

  const pageId = 'primary-app-container';

  const PageSkipToContent = (
    <SkipToContent onClick={(event) => {
      event.preventDefault();
      const primaryContentContainer = document.getElementById(pageId);
      primaryContentContainer && primaryContentContainer.focus();
    }} href={`#${pageId}`}>
      Skip to Content
    </SkipToContent>
  );

  useEffect(() => {
    console.log(auth.role)
  }, [auth]);

  return (
    <Page
      mainContainerId={pageId}
      header={Header}
      sidebar={generateSideBar()}
      onPageResize={onPageResize}
      skipToContent={PageSkipToContent}>
      {children}
    </Page>
  );
};

export { AppLayout };
