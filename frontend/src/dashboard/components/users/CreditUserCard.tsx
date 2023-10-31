import { CreditUser } from "../../interfaces/user.interface";


interface CreditUserCardProps {
  creditUser: CreditUser
}

export const CreditUserCard = ({ creditUser }: CreditUserCardProps) => {
  const { id, name, middleName, fLastName, sLastName, status } = creditUser;

  const buildFullName = () => {
    return `${name} ${middleName ? middleName : ''} ${ fLastName } ${ sLastName }`
  }

  const convertStatus = (status: string) => {
    switch(status) {
      case 'IN_PROGRESS':
        return 'IN PROGRESS'
      default:
        return status;
    }
  }

  return (
    <div className='user-card'>
      <div className='user-card__header'>
        <div>
          <h2>{ buildFullName() }</h2>
          <h4>ID: { id } </h4>
        </div>
        <div className='user-card__header--status'>
          { convertStatus(status) }
        </div>
      </div>
      <div className="user-card__content"></div>
      <div className="user-card__footer"></div>
    </div>
  )
}

