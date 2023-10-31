import { CreditUser } from '../../interfaces/user.interface';
import { UsersCrudState } from './users.context';


type ActionType = 'retrieve';
type Action = {
  type: ActionType;
  payload: CreditUser[]
};

export const  usersCrudReducer = (state: UsersCrudState, { type, payload }: Action): UsersCrudState => {
  switch(type) {
    case 'retrieve':
      return {
        ...state,
        users: payload
      }
    default:
      return state;
  }
}
