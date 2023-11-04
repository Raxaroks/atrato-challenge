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

  const resetSelected = () => {
    dispatch({ type: 'reset-selected' });
  };

  const retrieve = (fetched: CreditUser[]) => {
    dispatch({
      type: 'retrieve',
      payload: fetched
    });
  };

  const remove = (id: string) => {
    dispatch({
      type: 'remove',
      payload: id
    });
  }

  const select = (id: string) => {
    dispatch({ type: 'select', payload: id });
  };

  const deselect = (id: string) => {
    dispatch({ type: 'deselect', payload: id });
  };

  return (
    <>
      <UsersCrudContext.Provider value={{ state, retrieve, remove, select, deselect, resetSelected }}>
        { children }
      </UsersCrudContext.Provider>
    </>
  )
}
