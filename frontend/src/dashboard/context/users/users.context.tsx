import { createContext } from 'react';
import { CreditUser } from '../../interfaces/user.interface';


export interface UsersCrudState {
  users: CreditUser[];
  selected: CreditUser[];
}

export interface UsersCrudContextProps {
  state: UsersCrudState,
  retrieve: (fetched: CreditUser[]) => void;
}

export const UsersCrudContext = createContext<UsersCrudContextProps>({} as UsersCrudContextProps);

