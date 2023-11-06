import { useEffect, useMemo, useState } from "react";
import { LoadingSection } from '../../components/LoadingSection';
import { usersAPI } from '../services/users.service';
import { useUsersCrud } from '../hooks/useUsersCrud';
import { CreditUserCard } from '../components/users/card/CreditUserCard';
import { toast } from 'react-toastify';
import { DeleteUsersModal } from '../components/users/modals/DeleteUsersModal';
import { CrUpUserModal } from '../components/users/modals/CrUpUserModal';

export const UserSection = () => {
  const { users, selected, retrieve } = useUsersCrud();
  const [dependency, setDependency] = useState(0);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useMemo( () => async () => {
    try {
      setLoading(true);
      const usrs = await toast.promise( usersAPI.findAll(), {
        pending: 'Fetching credit users...',
        success: 'Users retrieved',
        error: 'There was an error while requesting for the source'
      } );
      retrieve(usrs);
      setLoading(false);
    } catch (error) {
      const { message } = error as Error;
      setError(message);
      setLoading(false);
    }
  }, [dependency] );

  const disableButtons = (): boolean => {
    return (error) ? true : false;
  }
  
  const disabledCss = (): string => {
    return disableButtons() ? `disabled`: '';
  }

  useEffect(() => {
    document.title = 'Dashboard | Users';
    fetchUsers();
  }, [fetchUsers]);

  return (loading)
    ? (<LoadingSection type='bubbles' color='#648EFB' width='128px' height='128px' />)
    : (
      <div className='section-content'>
        {/* toolbar */}
        <div className='section-toolbar'>
          <button className={`toolbar__btn toolbar__btn--create animate__animated animate__fadeInRight ${ disabledCss() }`}
            onClick={ () => setOpenCreateModal(true) }
            disabled={ disableButtons() }>
            Create
          </button>
          {( selected.length > 0 ) && (
              <button className={ `toolbar__btn toolbar__btn--delete animate__animated animate__fadeInRight ${ disabledCss() }` }
                onClick={ () => setOpenDeleteModal(true) }>
                Delete ({ selected.length })
              </button>
            )}
        </div>

        {/* card list */}
        { (users.length > 0) 
            ? <ul>{ users.map( (item) => (<CreditUserCard key={ item.id } creditUser={ item } crudDependency={{ dependency, setDependency }} />) ) }</ul>  
            : (<span className='no-data'><i className="fa-regular fa-face-frown fs-30 mb-0"></i> No data to display</span>)  
        }
           
        {/* modals */}
        { openCreateModal && (<CrUpUserModal mode='create' setIsOpen={ setOpenCreateModal } crudDependency={{ dependency, setDependency }} />) }
        { openDeleteModal && (<DeleteUsersModal setIsOpen={ setOpenDeleteModal } />) }
      </div>
    );
}
