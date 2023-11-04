

export type ActionInModalButton = {
  text: string;
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};
export interface ModalProps {
  children: JSX.Element | JSX.Element[];
  title: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  continueButton?: ActionInModalButton
}

export const Modal = ({ title, children, setIsOpen, continueButton }: ModalProps) => {
  return (
    <>
      <div className='dark-background'>
        <div className="centered">
          <div className="modal animate__animated animate__fadeIn">
            <div className="modal__header">
              <h5 className='modal__header--heading'>{ title }</h5>
            </div>
            <button className='modal__close-btn' onClick={ () => setIsOpen(false) }>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="modal__content mt-1 mb-1">
              { children }
            </div>
            <div className="modal__actions">
              <div className="modal__actions--container">
                { 
                  (continueButton) 
                    ? (
                      <>
                        <button type='button' 
                          className={ `${ continueButton.className } ${ (continueButton.disabled) ? 'disabled': '' }` }
                          onClick={ continueButton.onClick } disabled={ continueButton.disabled }>
                          { continueButton.text }
                        </button>
                        <button type='button' className='cancel-btn' onClick={ () => setIsOpen(false) }>Cancel</button>
                      </>
                    ) 
                    : (<button type='button' className='cancel-btn' onClick={ () => setIsOpen(false) }>Close</button>)
                }                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
