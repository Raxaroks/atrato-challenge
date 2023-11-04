import { useState } from 'react';
import { CreditUser, OnlyUser } from "../../../interfaces/user.interface";
import { CrUpUserModal } from '../modals/CrUpUserModal';
import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';
import { checkForNullValues } from '../../../../helpers/object-functions';

interface CreditUserCardProps {
  creditUser: CreditUser;
  crudDependency?: {
    dependency: number,
    setDependency: React.Dispatch<React.SetStateAction<number>>,
  }
}

export const CreditUserCard = ({ creditUser, crudDependency }: CreditUserCardProps) => {
  const { id, status, cardInfo } = creditUser;
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='user-card'>
      <CardHeader id={ id! } status={ status } 
        userInfo={creditUser} />

      <CardContent cardInfo={ cardInfo }
        userInfo={creditUser} />

      <div className="user-card__footer mt-0 d-flex">
        <button type='button' className='user-card__footer--btn'
          onClick={ () => setOpenModal(true) }>
          Edit
          <i className="fa-solid fa-pen"></i>
        </button>
      </div>

      { (openModal && crudDependency) && <CrUpUserModal mode='update' crudDependency={ crudDependency }
                            setIsOpen={ setOpenModal } toUpdate={ checkForNullValues<OnlyUser>(creditUser) }/> }
    </div>
  )
}

