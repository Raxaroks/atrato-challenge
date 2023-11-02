import { card } from 'creditcards';
import { parsePhoneNumber } from 'libphonenumber-js';
import { Card } from '../../../interfaces/card.interface';


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

  const formatFullDate = (birthday: Date): string => {
    const date = new Date(birthday);
    const day = date.getUTCDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${month} / ${day} / ${year}`;
  }

  const formatExpDate = (expiration: string): string => {
    const date = new Date(expiration);
    const month = date.getUTCDate().toString();
    const year = date.getUTCFullYear().toString().substring(-2);
    return `${year} / ${month}`;
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
            { formatFullDate(birthday) }
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
              { formatExpDate(cardInfo.expiration) }
            </div>  
          </div>       
        </div>
      </div>
  )
}
