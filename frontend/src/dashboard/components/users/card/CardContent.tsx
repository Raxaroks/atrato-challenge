import { card } from 'creditcards';
import { parsePhoneNumber } from 'libphonenumber-js';
import { Card } from '../../../interfaces/card.interface';
import { formatDate } from '../../../../helpers/date-functions';


export interface CardContentProps {
  userInfo: {
    name: string;
    middleName?: string;
    fLastName: string;
    sLastName: string;
    email: string;
    birthday: Date;
    phone: string;
    assignedAnalyst: string;
  };
  cardInfo: Card;
}

export const CardContent = ({ cardInfo, userInfo }: CardContentProps) => {
  const { birthday, email, assignedAnalyst, fLastName, sLastName, name, middleName, phone } = userInfo;
  
  const buildFullName = () => {
    return `${name} ${middleName ? middleName : ''} ${ fLastName } ${ sLastName }`
  }

  const parsePhone = (phone: string) => {
    const object = parsePhoneNumber(phone);
    return object.formatInternational();
  }

  const parseCreditCardNumber = (number: string) => {
    return card.format(number, ' - ')
  }

  return (
    <div className="user-card__content">
        <div className="user-card__content--details">
          <div className='user-card__content--details__field'>
            <label>Email</label>
            { email }
          </div>
          <div className='user-card__content--details__field' >
            <label>Birthdate</label>
            { formatDate('DD/MMMM/YYYY', birthday) }
          </div>
          <div className='user-card__content--details__field'>
            <label>Phone number</label>
            { parsePhone(phone) }
          </div>
          <div className='user-card__content--details__field'>
            <label>Assigned Analyst</label>
            { assignedAnalyst }
          </div>
        </div>
        <div className="user-card__content--extra">
          <div>
            <div className="user-card__content--extra__field">
              <label>Full name</label>
              { buildFullName() }
            </div>
            <div className="user-card__content--extra__field">
              <label>Card number</label>
              { parseCreditCardNumber( cardInfo.number ) }
            </div>
          </div>   
          <div className='d-flex'>
            <div className="user-card__content--extra__field mr-0">
              <label>Cvv</label>
              { cardInfo.cvv }
            </div>  
            <div className="user-card__content--extra__field mr-0">
              <label>Pin</label>
              { cardInfo.pin }
            </div>  
            <div className="user-card__content--extra__field">
              <label>Exp</label>
              { formatDate('MM/YY', cardInfo.expiration) }
            </div>  
          </div>       
        </div>
      </div>
  )
}
