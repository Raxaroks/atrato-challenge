import { toast } from 'react-toastify';
import { ActionInModalButton, Modal } from '../../../../components/modal/Modal';
import { useUsersCrud } from '../../../hooks/useUsersCrud';
import { usersAPI } from '../../../services/users.service';

export interface CustomModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteUsersModal = ({ setIsOpen }: CustomModalProps) => {
  const { users, selected, resetSelected, remove } = useUsersCrud();

  const deleteUsers = async () => {
    const promises = selected.map( async id => {
      await usersAPI.delete(id);
      remove(id);
    } )
    await toast.promise(Promise.all(promises), {
      pending: 'Trying to execute the operation...',
      success: (selected.length > 1) ? `${selected.length} users deleted` : 'User deleted',
      error: 'There was a problem while contacting the app services...'
    });
    setIsOpen(false);
    resetSelected();
  }

  const confirmButton: ActionInModalButton = {
    className:'delete-btn',
    text: 'Confirm and delete',
    onClick: () => deleteUsers()
  };

  return (
    <Modal setIsOpen={ setIsOpen } 
      title='Delete Users'
      continueButton={ confirmButton }>
      <>
        <p className='mb-0'>Are you sure that you want to delete these users?</p>
        <ul>
          { selected.map( item => {
            const { id, name } = users.find( usr => usr.id! === item )!;
            return (<li key={ id } className='modal__content--list'>{name}</li>);
          } ) }
        </ul>        
      </>
    </Modal>
  )
}
