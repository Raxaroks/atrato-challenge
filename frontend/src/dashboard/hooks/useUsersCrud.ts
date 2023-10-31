import { useContext } from 'react';
import { UsersCrudContext, UsersCrudContextProps } from '../context/users/users.context';
import { CreditUser } from '../interfaces/user.interface';


type customHookProps = Omit<UsersCrudContextProps, 'state'> & {
  users: CreditUser[]
}

export const useUsersCrud = (): customHookProps => {
  const { state, retrieve } = useContext(UsersCrudContext);
  const { users } = state;

  return { users, retrieve }
}
