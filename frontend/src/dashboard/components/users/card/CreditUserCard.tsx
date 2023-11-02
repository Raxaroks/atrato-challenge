import { CreditUser } from "../../../interfaces/user.interface";
import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

interface CreditUserCardProps {
  creditUser: CreditUser
}

export const CreditUserCard = ({ creditUser }: CreditUserCardProps) => {
  const { id, email, name, middleName, fLastName, sLastName, 
    phone, assignedAnalyst, status, birthday, cardInfo } = creditUser;

  return (
    <div className='user-card'>
      <CardHeader id={ id! } status={ status } 
        userInfo={{ name, middleName, fLastName, sLastName }} />

      <CardContent cardInfo={ cardInfo }
        userInfo={{
          assignedAnalyst, birthday, email, fLastName, middleName, name, phone, sLastName,
        }} />

      <div className="user-card__footer mt-0 d-flex">
        <button className='user-card__footer--btn'>
          Edit
          <i className="fa-solid fa-pen"></i>
        </button>
      </div>
    </div>
  )
}

