import { useEffect, useMemo, useState } from "react";
import { LoadingSection } from '../../components/LoadingSection';
import { usersAPI } from '../services/users.service';
import { CreditUserCardList } from '../components/users/CreditUserCardList';
import { useUsersCrud } from '../hooks/useUsersCrud';


export const UserSection = () => {
  const { retrieve } = useUsersCrud();

  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const fetchUsers = useMemo( () => async () => {
    try {
      setLoading(true);
      const usrs = await usersAPI.findAll();
      retrieve(usrs);
      setLoading(false);
    } catch (error) {
      const { message } = error as Error;
      setError(message);
      setLoading(false);
    }
  }, [retrieve] );

  useEffect(() => {
    document.title = 'Dashboard | Users';
    fetchUsers();
  }, [fetchUsers]);

  return (loading)
    ? (<LoadingSection type='bubbles' color='#648EFB' width='128px' height='128px' />)
    : (
      <div className='section-content'>
        <div className='section-toolbar'>
          <button className='toolbar__btn'>Create</button>
        </div>

        <CreditUserCardList />                
      </div>
    );
}
