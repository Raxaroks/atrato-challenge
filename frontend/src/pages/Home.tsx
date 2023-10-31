import * as Yup from 'yup';
import { FormikConfig, useFormik } from 'formik'
import { useEffect } from 'react'
import { auth } from '../routes/AppRouter';
import { useNavigate } from 'react-router-dom';


type AdminUser = { username: string; }

export const HomePage = () => {
  const navigate = useNavigate();

  const fc: FormikConfig<AdminUser> = {
    initialValues: { username: '' },
    validationSchema: Yup.object({ username: Yup.string().required() }),
    onSubmit: ({ username }) => {
      auth.login(username);
      navigate('/dashboard');
    },
  };
  const { handleSubmit, isValid, getFieldProps } = useFormik<AdminUser>(fc)

  useEffect(() => {
    document.title = 'Dashboard | Welcome!';
    if (auth.username) navigate('/dashboard');
  }, []);
  
  return (
    <div className='welcome'>
      <h1 className='welcome__title'>Welcome to your dashboard!</h1>
      <p className='welcome__paragraph'>In order to start using it, please enter a username</p>

      <form onSubmit={ handleSubmit }
        style={ { display: 'inline-block' } } noValidate>
        <input className='input'
          type="text" placeholder='Your username' 
          { ...getFieldProps('username') } />
        <button className='btn'
          type='submit'
          disabled={ !isValid }>
            Access
          </button>
      </form>
    </div>
  );
}
