
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

export const CardHeader = ({ id, status, userInfo  }: CardHeaderProps) => {
  const { name, middleName, fLastName, sLastName } = userInfo;
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
			<div className='user-card__header--status'>
				{convertStatus(status)}
			</div>
		</div>
	);
};
