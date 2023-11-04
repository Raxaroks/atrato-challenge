import { createContext } from 'react';
import { CreditUser } from '../../interfaces/user.interface';


export interface UsersCrudState {
  users: CreditUser[];
  selected: string[];
}

export interface UsersCrudContextProps {
  state: UsersCrudState;
  retrieve: (fetched: CreditUser[]) => void;
  remove: (id: string) => void
  select: (id: string) => void;
  deselect: (id: string) => void;
  resetSelected: () => void;
}

export const UsersCrudContext = createContext<UsersCrudContextProps>({} as UsersCrudContextProps);


