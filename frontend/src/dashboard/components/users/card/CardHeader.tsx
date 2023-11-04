import { FormikConfig, useFormik } from 'formik';
import { useUsersCrud } from '../../../hooks/useUsersCrud';


export type ICheckboxValue = { selected: boolean };
export interface CardHeaderProps {
  id: string;
  status: string;
  userInfo: {
    name: string;
    middleName?: string;
    fLastName: string;
    sLastName: string;
  }
}

export const CardHeader = ({ id, status, userInfo }: CardHeaderProps) => {
  const { select, deselect } = useUsersCrud();
  const fc: FormikConfig<ICheckboxValue> = {
    initialValues: { selected: false },    
    onSubmit: () => {}
  };
  const { handleChange, getFieldProps } = useFormik<ICheckboxValue>(fc);
  const { name, middleName, fLastName, sLastName } = userInfo;

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(evt);
    const checked = evt.target.checked as boolean
    (checked) ? select(id) : deselect(id);
  }

  const buildFullName = () => {
    return `${name} ${middleName ? middleName : ''} ${ fLastName } ${ sLastName }`
  }

  const convertStatus = (status: string) => {
    switch(status) {
      case 'IN_PROGRESS':
        return 'IN PROGRESS';
      default:
        return status;
    }
  }

	return (
		<div className='user-card__header'>
			<div>
				<h2>{buildFullName()}</h2>
				<h4>ID: {id} </h4>
			</div>
			<div className='d-flex'>
        <div className='user-card__header--status'>
          { convertStatus(status) }
        </div>
        <input className='ml-1' 
          { ...getFieldProps('selected') }
          onChange={ changeHandler }
          type="checkbox" />
      </div>
		</div>
	);
};
