import { useReducer } from 'react'
import { usersCrudReducer } from './users-reducer';
import { UsersCrudContext, UsersCrudState } from './users.context';
import { CreditUser } from '../../interfaces/user.interface';

export interface ProviderProps { children: JSX.Element | JSX.Element[] }

const INITIAL_STATE: UsersCrudState = {
  users: [],
  selected: [],
};

export const UsersCrudProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(usersCrudReducer, INITIAL_STATE);

  const retrieve = (fetched: CreditUser[]) => {
    dispatch({
      type: 'retrieve',
      payload: fetched
    });
  };

  return (
    <>
      <UsersCrudContext.Provider value={{ state, retrieve }}>
        { children }
      </UsersCrudContext.Provider>
    </>
  )
}
