import { Route } from '../../routes/app.routes';
import { UserSection } from '../sections/Users';
import userGroupIcon from '../../assets/icons/user-group.png';
import { UsersCrudProvider, ProviderProps } from '../context/users/users.provider';

type CustomRoute = Route & {
  iconUrl?: string;
  Provider?: ({ children }: ProviderProps) => JSX.Element
}


export const dashboardRoutes: CustomRoute[] = [
  {
    to: 'users',
    path: '/dashboard/users',
    name: 'Users',
    iconUrl: userGroupIcon,
    Component: UserSection,
    Provider: UsersCrudProvider
  },
];
