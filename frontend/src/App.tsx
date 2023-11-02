import { AppRouter } from './routes/AppRouter';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AppRouter/>
      <ToastContainer className='fs-12' />
    </>
  )
}

export default App
