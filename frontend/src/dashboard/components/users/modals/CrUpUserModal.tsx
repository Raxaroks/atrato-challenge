import * as Yup from 'yup';
import { FormikConfig, useFormik } from 'formik';
import { ActionInModalButton, Modal } from '../../../../components/modal/Modal'
import { CreditUser, OnlyUser, UserStatus } from "../../../interfaces/user.interface";
import { CustomModalProps } from './DeleteUsersModal'
import { FormikErrors as FKE } from '../../../interfaces/form-errors.enum';
import { toast } from 'react-toastify';
import { usersAPI } from '../../../services/users.service';
import { formatDate } from '../../../../helpers/date-functions';


type Option = { label: string; value: string; }
type CrUpUserModalProps = CustomModalProps & {
  mode: 'create' | 'update';
  toUpdate?: OnlyUser,
  crudDependency: {
    dependency: number,
    setDependency: React.Dispatch<React.SetStateAction<number>>,
  }
}

export const CrUpUserModal = ({ setIsOpen, crudDependency, mode, toUpdate }: CrUpUserModalProps) => {
  const { dependency, setDependency } = crudDependency;
  const initialValues = (mode === 'create') 
                      ? { id: '', name: '', middleName: '', fLastName: '', 
                        sLastName: '',  email: '', phone: '', birthday: '', status: '',
                        assignedAnalyst: 'David'
                      } : {
                        ...toUpdate!,
                        birthday: formatDate('YYYY-MM-DD', toUpdate!.birthday)
                      };

  const fc: FormikConfig<OnlyUser> = {
    initialValues,
    validationSchema: Yup.object({
      id: Yup.string(),
      name: Yup.string().required(FKE.Required),
      middleName: Yup.string(),
      fLastName: Yup.string().required(FKE.Required),
      sLastName: Yup.string().required(FKE.Required),
      email: Yup.string().required(FKE.Required).email(FKE.Email),
      phone: Yup.string().required(FKE.Required).min(10),
      birthday: Yup.date().required(FKE.Required),
      status: Yup.string().required(FKE.Required),
      assignedAnalyst: Yup.string().required(FKE.Required),
    }),
    onSubmit: async (values) => {
      // prepare promise and success message based on the method that we want to execute on this modal (CREATE/UPDATE)
      const { id, ...rest } = values;
      const success: string = mode === 'create' ? 'User created' : 'User updated';
      const promise: Promise<string | CreditUser> = (mode === 'create')
                                                              ? usersAPI.create(rest)
                                                              : usersAPI.update(id!, rest);

      // execute promise and display toasts
      await toast.promise(promise, {
          pending: 'Trying to execute the operation...',
          success,
          error: 'There was a problem while contacting the app services...'
      });

      // close modal and update the card list on the section
      setIsOpen(false);
      setDependency(dependency+1);
    }
  };
  const { getFieldProps, handleSubmit, touched, errors, isValid } = useFormik<OnlyUser>(fc);

  const statusOptions: Option[] = [
    { label: '', value: ''},
    { label: 'Pending', value: UserStatus.pending },
    { label: 'In Progress', value: UserStatus.inProgress },
    { label: 'Completed', value: UserStatus.completed },
  ];

  const buildStatusOptions = () => {
    return statusOptions.map( ({ label, value }, index) => (<option key={index} value={ value }>{ label }</option>) );
  }

  const confirmButton: ActionInModalButton = {
    className: 'confirm-btn',
    text: 'Submit',
    onClick: () => handleSubmit(),
    disabled: !isValid
  };

  const title = () => {
    return (mode === 'create')
      ? 'Create new user'
      : 'Update an user';
  }

  return (
    <Modal setIsOpen={ setIsOpen }
      title={ title() }  
      continueButton={ confirmButton }>
      <form className='d-flex fd-column' noValidate>
        { (mode === 'update') && (
          <div className="modal__form--row">
            <div className="modal__form--col modal__form--field w-100">
              <label className='modal__form__label'>ID</label>
              <input className='modal__form__input disabled'
                type="text" placeholder="User's ID" 
                { ...getFieldProps('id') } disabled={ true }/>
            </div>
          </div>
        ) }
        <div className='modal__form--row'>
          <div className='modal__form--col modal__form--field'>
            <label className='modal__form__label'>Name</label>
            <input className='modal__form__input' 
              type="text" placeholder="User's name" 
              { ...getFieldProps('name') }/>
            { touched.name && errors.name && <span className='modal__form__error-msg'>{ errors.name }</span> }
          </div>
          <div className='modal__form--col modal__form--field'>
            <label className='modal__form__label'>Middlename</label>
            <input className='modal__form__input' 
              type="text" placeholder="User's middlename"
              { ...getFieldProps('middleName') } />
          </div>
        </div>
        <div className='modal__form--row'>
          <div className='modal__form--col modal__form--field'>
            <label className='modal__form__label'>First Lastname</label>
            <input className='modal__form__input' 
              type="text" placeholder="User's first lastname"
              { ...getFieldProps('fLastName') } />
            { touched.fLastName && errors.fLastName && <span className='modal__form__error-msg'>{ errors.fLastName }</span> }
          </div>
          <div className='modal__form--col modal__form--field'>
            <label className='modal__form__label'>Second Lastname</label>
            <input className='modal__form__input' 
              type="text" placeholder="User's second lastname"
              { ...getFieldProps('sLastName') } />
            { touched.sLastName && errors.sLastName && <span className='modal__form__error-msg'>{ errors.sLastName }</span> }
          </div>
        </div>
        <div className="modal__form--row">
          <div className='modal__form--col modal__form--field'>
          <label className='modal__form__label'>Email</label>
            <input className='modal__form__input' type="text" placeholder="User's email"
              { ...getFieldProps('email') } />
            { touched.email && errors.email && <span className='modal__form__error-msg'>{ errors.email }</span> }
          </div>
          <div className='modal__form--col modal__form--field'>
            <label className='modal__form__label'>Phone number</label>
            <input className='modal__form__input' type="text" placeholder="User's phone number" 
              { ...getFieldProps('phone') } />
            { touched.phone && errors.phone && <span className='modal__form__error-msg'>{ errors.phone }</span> }
          </div>
        </div>
        <div className="modal__form--row">
          <div className="modal__form--col modal__form--field">
            <label className='modal__form__label'>Birthdate</label>
            <input className='modal__form__datepicker' type='date' 
              { ...getFieldProps('birthday') } />
            { touched.birthday && errors.birthday && <span className='modal__form__error-msg'>{ errors.birthday }</span> }
          </div>
          <div className="modal__form--col modal__form--field">
            <label className='modal__form__label'>Status</label>
            <select className='modal__form__select'
              { ...getFieldProps('status') }>
              { buildStatusOptions() }
            </select>
            { touched.status && errors.status && <span className='modal__form__error-msg'>{ errors.status }</span> }
          </div>
        </div>
        <div className="modal__form--row">
          <div className="modal__form--col modal__form--field">
            <label className='modal__form__label'>Assigned Analyst</label>
            <input className='modal__form__input disabled' type="text" 
              { ...getFieldProps('assignedAnalyst') } disabled={true} />
          </div>
        </div>
      </form>
    </Modal>
  )
}

