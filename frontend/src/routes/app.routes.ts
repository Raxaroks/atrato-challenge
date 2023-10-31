import { LazyExoticComponent, lazy } from 'react';
import { HomePage } from '../pages/Home';


export type JSXFunctionalComponent = () => JSX.Element;

export interface Route {
  to: string;
  path: string;
  name: string;
  Component: LazyExoticComponent<JSXFunctionalComponent> | JSXFunctionalComponent;
}

export const appRoutes: Route[] = [
  {
    to: '/welcome',
    path: 'welcome',
    name: 'Home Page',
    Component: HomePage
  },
  {
    to: "/dashboard/",
    path: "/dashboard/*",
    name: "Dashboard Page",
    Component: lazy( () => import(/* webpackChunkName: "Dashboard" */ '../dashboard/Dashboard') )
  },
];

