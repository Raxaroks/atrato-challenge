import { useContext } from 'react';
import { UsersCrudContext, UsersCrudContextProps } from '../context/users/users.context';
import { CreditUser } from '../interfaces/user.interface';


type customHookProps = Omit<UsersCrudContextProps, 'state'> & {
  users: CreditUser[];
  selected: string[];
}

export const useUsersCrud = (): customHookProps => {
  const { state, retrieve, remove, select, deselect, resetSelected } = useContext(UsersCrudContext);
  const { users, selected } = state;

  return { users, selected, retrieve, remove, select, deselect, resetSelected }
}
