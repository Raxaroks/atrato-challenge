import { CreditUser } from '../../interfaces/user.interface';
import { UsersCrudState } from './users.context';


type ActionType = 'reset-selected' |  'select' | 'deselect' | 'retrieve' | 'remove';
type Action = {
  type: ActionType;
  payload?: string | CreditUser[]
};

export const  usersCrudReducer = (state: UsersCrudState, { type, payload }: Action): UsersCrudState => {
  let id: string;
  let users: CreditUser[];

  switch(type) {
    case 'reset-selected':
      return { ...state, selected: [] }
    case 'select':
      id = payload as string;
      return {
        ...state,
        selected: [...state.selected, id]
      }
    case 'deselect':
      id = payload as string;
      return {
        ...state,
        selected: state.selected.filter( item => item !== id )
      }
    case 'retrieve':
      users = payload as CreditUser[];
      return { ...state, users }
    case 'remove':
      id = payload as string;
      return {
        ...state,
        users: state.users.filter( usr => usr.id !== id )
      }
    default:
      return state;
  }
}
